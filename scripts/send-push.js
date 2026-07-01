const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

// 必要な環境変数のチェック
const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  console.error('Error: Missing required environment variables.');
  process.exit(1);
}

// VAPID設定
webpush.setVapidDetails(
  'mailto:example@example.com', // ダミーまたは任意の連絡先メール
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// Supabaseクライアント初期化（特権キーである service_role を使用してデータを操作・削除）
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ローカルの日付文字列 (YYYY-MM-DD) を取得するヘルパー
function getLocalDateString(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

async function run() {
  console.log('Fetching subscriptions from Supabase...');
  
  // 1. サブスクリプション一覧を取得
  const { data: subscriptions, error } = await supabase
    .from('subscriptions')
    .select('*');

  if (error) {
    console.error('Failed to fetch subscriptions:', error);
    process.exit(1);
  }

  console.log(`Found ${subscriptions.length} subscription(s).`);

  const nowUTC = new Date();

  for (const sub of subscriptions) {
    try {
      // ユーザーのタイムゾーン基準の現在時刻を取得
      const userLocalTime = new Date(nowUTC.toLocaleString('en-US', { timeZone: sub.timezone }));
      const todayStr = getLocalDateString(userLocalTime);

      // すでに今日通知済みならスキップ
      if (sub.last_notified_date === todayStr) {
        console.log(`Subscription ${sub.id}: Already notified today (${todayStr}). Skipping.`);
        continue;
      }

      // 通知時間 ("18:00" など) をパース
      const [notifHour, notifMin] = sub.notification_time.split(':').map(Number);
      const userHour = userLocalTime.getHours();
      const userMin = userLocalTime.getMinutes();

      const nowMinutes = userHour * 60 + userMin;
      const notifMinutes = notifHour * 60 + notifMin;

      // 設定時刻を過ぎており、かつ設定時刻から4時間以内である場合に通知
      // (Cronの実行タイミングのズレや遅延を許容するため)
      if (nowMinutes >= notifMinutes && nowMinutes < notifMinutes + 240) {
        console.log(`Subscription ${sub.id}: Triggering notification for ${sub.notification_time} (Local time: ${userHour}:${userMin}).`);

        // プッシュペイロードの作成
        const payload = JSON.stringify({
          title: '💪 トレーニングの時間です！',
          body: '今日のメニューを確認して、継続を積み重ねましょう！'
        });

        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        };

        // Web Push 送信
        await webpush.sendNotification(pushSubscription, payload);
        console.log(`Subscription ${sub.id}: Notification sent successfully.`);

        // DBの最終通知日を本日に更新
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({ last_notified_date: todayStr })
          .eq('id', sub.id);

        if (updateError) {
          console.error(`Subscription ${sub.id}: Failed to update last_notified_date:`, updateError);
        }
      } else {
        console.log(`Subscription ${sub.id}: Not yet time (Configured: ${sub.notification_time}, Local time: ${userHour}:${userMin}). Skipping.`);
      }
    } catch (pushError) {
      // エラーハンドリング (無効な Subscription の削除)
      if (pushError.statusCode === 410 || pushError.statusCode === 404) {
        console.warn(`Subscription ${sub.id}: Subscription has expired or is invalid (Status: ${pushError.statusCode}). Deleting from DB.`);
        const { error: deleteError } = await supabase
          .from('subscriptions')
          .delete()
          .eq('id', sub.id);

        if (deleteError) {
          console.error(`Subscription ${sub.id}: Failed to delete expired subscription:`, deleteError);
        }
      } else {
        console.error(`Subscription ${sub.id}: Failed to send notification:`, pushError);
      }
    }
  }

  console.log('Execution finished.');
}

run();
