/* Training Habit Tracker - app.js */

// ==========================================
// 1. 静的マスタデータ定義
// ==========================================

const WARMUP_MENU = {
  id: 'warmup',
  name: 'ウォームアップ',
  category: 'support',
  estimatedMinutes: 3,
  description: '毎回共通のウォームアップ（3分間）',
  roundsDefault: 1,
  roundsMax: 1,
  notes: ['各種目30秒ずつ行います。体に無理のない範囲で動かしましょう。'],
  exercises: [
    { id: 'wu1', name: 'その場足踏み', durationSec: 30, repsMin: 0, repsMax: 0, sideRequired: false, equipment: '', alternative: '', memo: 'リラックスして膝を適度に上げます。' },
    { id: 'wu2', name: '腕回し', durationSec: 30, repsMin: 0, repsMax: 0, sideRequired: false, equipment: '', alternative: '', memo: '肩甲骨から大きく回す意識で行います。' },
    { id: 'wu3', name: '股関節回し', durationSec: 30, repsMin: 0, repsMax: 0, sideRequired: false, equipment: '', alternative: '', memo: '外側から内側、内側から外側へ回します。' },
    { id: 'wu4', name: '浅いスクワット', durationSec: 30, repsMin: 0, repsMax: 0, sideRequired: false, equipment: '', alternative: '', memo: '股関節と膝を軽く曲げ伸ばしします。' },
    { id: 'wu5', name: '肩甲骨を寄せる動き', durationSec: 30, repsMin: 0, repsMax: 0, sideRequired: false, equipment: '', alternative: '', memo: '肘を後ろに引き、肩甲骨同士を引き寄せます。' },
    { id: 'wu6', name: '体幹ひねり', durationSec: 30, repsMin: 0, repsMax: 0, sideRequired: false, equipment: '', alternative: '', memo: '骨盤を正面に残したまま、上半身を左右にひねります。' }
  ]
};

const WORKOUT_MENUS = {
  'workout-a': {
    id: 'workout-a',
    name: '筋トレA',
    category: 'strength',
    estimatedMinutes: 20,
    description: '下半身 + 押す動き中心のメニュー',
    roundsDefault: 2,
    roundsMax: 3,
    notes: ['各種目間休憩: 15〜30秒', '1周後休憩: 60秒', '強度調整：回数 → セット → 難易度の順で増加'],
    exercises: [
      { id: 'wa1', name: 'スクワット', repsMin: 12, repsMax: 20, durationSec: 0, sideRequired: false, equipment: '', alternative: '浅いハーフスクワット', memo: '下半身・臀部。太ももが床と平行になるまで腰を落とします。' },
      { id: 'wa2', name: '膝つき腕立て伏せ または 通常の腕立て伏せ', repsMin: 8, repsMax: 15, durationSec: 0, sideRequired: false, equipment: '', alternative: '膝つき腕立て伏せ', memo: '胸・肩・上腕三頭筋。体を一直線に保ち、深く下ろします。' },
      { id: 'wa3', name: 'ヒップリフト（グルートブリッジ）', repsMin: 15, repsMax: 20, durationSec: 0, sideRequired: false, equipment: '', alternative: '足幅を狭くする（負荷減）', memo: '臀部・ハムストリングス。お尻を締めながら腰を高く浮かせます。' },
      { id: 'wa4', name: '椅子に手をついたディップス', repsMin: 8, repsMax: 12, durationSec: 0, sideRequired: false, equipment: '椅子', alternative: '膝を曲げて行う（負荷減）', memo: '上腕三頭筋・肩。肘を直角まで曲げ、二の腕の力で押し上げます。' },
      { id: 'wa5', name: 'プランク', repsMin: 0, repsMax: 0, durationSec: 30, durationSecMax: 45, sideRequired: false, equipment: '', alternative: '膝つきプランク', memo: '体幹。肘を肩の真下につき、頭からかかとまでを一直線に保ちます。' }
    ]
  },
  'workout-b': {
    id: 'workout-b',
    name: '筋トレB',
    category: 'strength',
    estimatedMinutes: 20,
    description: '下半身片脚 + 引く動き代替 + 体幹メニュー',
    roundsDefault: 2,
    roundsMax: 3,
    notes: ['各種目間休憩: 15〜30秒', '1周後休憩: 60秒', '負荷追加のヒント：動作テンポをスローにする'],
    exercises: [
      { id: 'wb1', name: 'ブルガリアンスクワット', repsMin: 8, repsMax: 12, durationSec: 0, sideRequired: true, equipment: '椅子', alternative: 'ランジ（椅子なし）', memo: '下半身片脚。後ろ足を椅子に乗せ、前脚の股関節を引くように落とします。' },
      { id: 'wb2', name: 'リュック・ローイング', repsMin: 10, repsMax: 15, durationSec: 0, sideRequired: false, equipment: 'リュック（重り入り）', alternative: '軽めのリュック', memo: '背中代替。上体を前傾させ、肘を引くようにリュックを引き上げます。' },
      { id: 'wb3', name: 'ルーマニアンデッドリフト風ヒップヒンジ', repsMin: 12, repsMax: 15, durationSec: 0, sideRequired: false, equipment: '', alternative: '壁にお尻をつけるイメージで行う', memo: 'お尻・もも裏。膝を軽く曲げたまま、お尻を後ろへ引いて上体を倒します。' },
      { id: 'wb4', name: 'ショルダータップ', repsMin: 10, repsMax: 20, durationSec: 0, sideRequired: true, equipment: '', alternative: '膝つきショルダータップ', memo: '体幹・肩。腕立て伏せの姿勢から、片手で交互に反対の肩をタップします。' },
      { id: 'wb5', name: 'サイドプランク', repsMin: 0, repsMax: 0, durationSec: 20, durationSecMax: 30, sideRequired: true, equipment: '', alternative: '膝つきサイドプランク', memo: '体幹・腹斜筋。肘を肩の真下につき、体を横向きにして一直線に保ちます。' }
    ]
  },
  'workout-c': {
    id: 'workout-c',
    name: '筋トレC',
    category: 'strength',
    estimatedMinutes: 20,
    description: '全身のサーキット強化（心拍数を上げる脂肪燃焼寄りメニュー）',
    roundsDefault: 2,
    roundsMax: 3,
    notes: ['各種目間休憩: 15秒（短め）', '1周後休憩: 45秒', '心拍数を上げて脂肪燃焼を狙います。休憩は短めに行いましょう。'],
    exercises: [
      { id: 'wc1', name: 'ジャンプしないスクワット to カーフレイズ', repsMin: 15, repsMax: 15, durationSec: 0, sideRequired: false, equipment: '', alternative: '通常のスクワット', memo: '下半身・ふくらはぎ。スクワットから立ち上がる勢いでかかとを高く上げます。' },
      { id: 'wc2', name: '腕立て伏せ', repsMin: 8, repsMax: 15, durationSec: 0, sideRequired: false, equipment: '', alternative: '膝つき腕立て伏せ', memo: '胸・二の腕。姿勢を崩さずにリズミカルに行います。' },
      { id: 'wc3', name: 'マウンテンクライマー', repsMin: 0, repsMax: 0, durationSec: 30, sideRequired: false, equipment: '', alternative: 'ゆっくり交互に膝を引き寄せる', memo: '全身・心肺。腕立て姿勢から交互に素早く膝を胸へ引き寄せます。' },
      { id: 'wc4', name: 'ヒップリフト', repsMin: 15, repsMax: 20, durationSec: 0, sideRequired: false, equipment: '', alternative: '足裏を床にしっかりつける', memo: 'お尻・腰。トップポジションで一瞬静止させ、お尻を締め込みます。' },
      { id: 'wc5', name: 'デッドバグ', repsMin: 10, repsMax: 10, durationSec: 0, sideRequired: true, equipment: '', alternative: '膝を90度に曲げたまま手足を動かす', memo: '体幹。仰向けで交互に対角の手足を床スレスレまで伸ばし戻します。' }
    ]
  },
  'hiit': {
    id: 'hiit',
    name: 'HIIT（自宅12分）',
    category: 'cardio',
    estimatedMinutes: 12,
    description: '20秒全力 → 40秒休息を12セット繰り返す心肺強化メニュー',
    roundsDefault: 1,
    roundsMax: 1,
    notes: ['20秒全力動作 ＋ 40秒ゆっくり動作 / 休息 ＝ 1セット。これを12セット繰り返します。', '種目候補はもも上げ、バーピー、マウンテンクライマー、ジャンピングジャック等。'],
    exercises: [
      { id: 'ht1', name: 'HIIT種目選択（もも上げ / バーピー / マウンテンクライマー / ジャンピングジャック 等）', repsMin: 0, repsMax: 0, durationSec: 720, sideRequired: false, equipment: '', alternative: 'ステップジャック（ジャンプなし）', memo: '合計12分間（20秒運動＋40秒休憩×12セット）を好みの種目で行います。' }
    ]
  },
  'briskwalk': {
    id: 'briskwalk',
    name: '速歩き（20分）',
    category: 'cardio',
    estimatedMinutes: 20,
    description: '週末の代替有酸素運動メニュー（20分固定）',
    roundsDefault: 1,
    roundsMax: 1,
    notes: ['息が少し弾む程度のスピードで20分間歩きます。腕をしっかり振りましょう。'],
    exercises: [
      { id: 'bw1', name: '速歩きウォーキング', repsMin: 0, repsMax: 0, durationSec: 1200, sideRequired: false, equipment: '', alternative: '通常の散歩', memo: '姿勢を正し、大股で歩きます。' }
    ]
  },
  'minimal': {
    id: 'minimal',
    name: '最低限メニュー',
    category: 'strength',
    estimatedMinutes: 10,
    description: '時間がない日・忙しい日用の時短全身トレーニング（10分間）',
    roundsDefault: 2,
    roundsMax: 2,
    isMinimalOption: true,
    notes: ['時間がない日でも、継続を途切れさせないための救済用ショートプログラムです。', '2周行います。'],
    exercises: [
      { id: 'mn1', name: 'スクワット', repsMin: 15, repsMax: 15, durationSec: 0, sideRequired: false, equipment: '', alternative: '', memo: '下半身。15回行います。' },
      { id: 'mn2', name: '腕立て伏せ', repsMin: 10, repsMax: 10, durationSec: 0, sideRequired: false, equipment: '', alternative: '膝つき腕立て伏せ', memo: '胸・二の腕。10回行います。' },
      { id: 'mn3', name: 'ヒップリフト', repsMin: 15, repsMax: 15, durationSec: 0, sideRequired: false, equipment: '', alternative: '', memo: 'お尻。15回行います。' },
      { id: 'mn4', name: 'リュック・ローイング', repsMin: 12, repsMax: 12, durationSec: 0, sideRequired: false, equipment: 'リュック', alternative: '', memo: '背中。12回行います。' },
      { id: 'mn5', name: 'プランク', repsMin: 0, repsMax: 0, durationSec: 30, sideRequired: false, equipment: '', alternative: '', memo: '体幹。30秒間耐えます。' }
    ]
  }
};

const EIGHT_WEEK_GUIDE = [
  { weeks: '1〜2週目', goal: 'フォーム優先・基本定着期', detail: '各筋トレメニューを 2周 実施。下限回数からスタートし、フォームを正確に行うことを意識します。', active: false },
  { weeks: '3〜4週目', goal: 'ボリューム向上・有酸素追加期', detail: '各筋トレメニューを 3周 に増加。余裕のある種目は回数を上限まで増やしましょう。HIITを週1回追加することも可能です。', active: false },
  { weeks: '5〜6週目', goal: '強度増加・フォーム進化期', detail: '腕立て伏せを膝つきから通常版へ移行。スクワットはスローテンポ（下ろすのに3秒かける）で行い、ブルガリアンスクワットの可動域を広げます。', active: false },
  { weeks: '7〜8週目', goal: '限界挑戦・仕上げ期', detail: 'リュックに重り（本など）を追加して負荷を高めます。各種目間の休憩を少し短くし、1種目だけ追加のボーナスセット（4周目）を行います。', active: false }
];

// ==========================================
// 2. 状態管理（State）と環境設定
// ==========================================

const NOTIFICATION_CONFIG = {
  // ※ユーザーの環境に合わせて設定してください。
  SUPABASE_URL: '', // 例: 'https://xxxxxx.supabase.co'
  SUPABASE_ANON_KEY: '', // Supabase の anon キー
  VAPID_PUBLIC_KEY: 'BFFN5L5I1HV-w0uCaz0ER27UkMkkG85neJvDAM3ITtgf0jnh3AoC3KZws2bf6M2Ht-Ov2lkUObNmEqX3FuwCqSc'
};


let state = {
  records: [],
  settings: {
    trainingStartDate: '', // YYYY-MM-DD
    currentWeekIndex: 1,
    defaultWeekendMenu: 'hiit', // 'hiit' | 'briskwalk'
    notificationPreset: '18:00',
    firstDayOfWeek: 1, // 1: Monday, 0: Sunday
    includeWarmup: true, // ウォームアップをタイマーに含めるか
    notificationEnabled: false, // 通知機能の有効/無効
    notificationTime: '18:00'  // 通知する時刻 (HH:MM)
  },
  sessionState: {
    date: '', // YYYY-MM-DD
    selectedDisplayMenuId: null, // 当日選択中の表示メニューID
    plannedMenuId: null,         // 本来の当日予定メニューID
    isMinimalSelected: false,    // 最低限メニュー切り替え状態フラグ
    lastUpdatedAt: 0
  }
};

let activeTab = 'today';
let activeDetailMenuId = null;
let runnerState = null; // ワークアウト実行タイマーのステート

// Sound Synthesis (Web Audio API)
const SoundSynth = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playBeep(frequency, duration, type = 'sine') {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      // フェードアウトさせてプチプチ音を防ぐ
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio Synthesis failed:', e);
    }
  },

  playTick() {
    this.playBeep(800, 0.08);
  },

  playStart() {
    this.playBeep(1200, 0.15);
    setTimeout(() => this.playBeep(1500, 0.25), 100);
  },

  playComplete() {
    this.playBeep(1000, 0.15);
    setTimeout(() => this.playBeep(1200, 0.15), 150);
    setTimeout(() => this.playBeep(1600, 0.35), 300);
  }
};

// ==========================================
// 3. データ入出力・ヘルパー
// ==========================================

function getTodayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// 曜日インデックス取得 (0:日, 1:月, 2:火, 3:水, 4:木, 5:金, 6:土)
function getTodayDayOfWeek() {
  return new Date().getDay();
}

function formatDateJp(dateStr) {
  const d = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getMonth() + 1}月${d.getDate()}日 (${days[d.getDay()]})`;
}

function normalizeStepDuration(value) {
  const duration = Number(value);
  return Number.isFinite(duration) && duration > 0 ? duration : 0;
}

// localStorage 同期
function loadState() {
  // 1. レコード
  const storedRecords = localStorage.getItem('workout_records');
  if (storedRecords) {
    try {
      state.records = JSON.parse(storedRecords);
    } catch(e) {
      state.records = [];
    }
  }

  // 2. 設定
  const storedSettings = localStorage.getItem('app_settings');
  if (storedSettings) {
    try {
      state.settings = { ...state.settings, ...JSON.parse(storedSettings) };
    } catch(e) {}
  } else {
    // デフォルトの設定値を初期設定
    state.settings.trainingStartDate = getTodayString();
    saveSettings();
  }

  // 3. セッション状態（日を跨いでいたらリセット）
  const storedSession = localStorage.getItem('session_state');
  const today = getTodayString();
  if (storedSession) {
    try {
      const parsed = JSON.parse(storedSession);
      if (parsed.date === today) {
        state.sessionState = parsed;
      } else {
        resetSessionState(today);
      }
    } catch(e) {
      resetSessionState(today);
    }
  } else {
    resetSessionState(today);
  }
}

function resetSessionState(today) {
  const plannedId = getPlannedMenuIdForDate(today);
  state.sessionState = {
    date: today,
    selectedDisplayMenuId: plannedId,
    plannedMenuId: plannedId,
    isMinimalSelected: false,
    lastUpdatedAt: Date.now()
  };
  saveSessionState();
}

function saveRecords() {
  localStorage.setItem('workout_records', JSON.stringify(state.records));
}

function saveSettings() {
  localStorage.setItem('app_settings', JSON.stringify(state.settings));
}

function saveSessionState() {
  localStorage.setItem('session_state', JSON.stringify(state.sessionState));
}

// ==========================================
// 4. 通知システム (Notification System)
// ==========================================

/**
 * トレーニング通知の許可を要求し、有効化する
 */
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast('このブラウザは通知に対応していません');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    showToast('通知がブロックされています。ブラウザ設定から許可してください。');
    return false;
  }

  // 許可ダイアログを表示
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// Web Push 鍵変換用ヘルパー
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Supabaseへの保存処理 (Fetch APIを使用した直接Upsert)
async function saveSubscriptionToSupabase(subscription, notifTime) {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = NOTIFICATION_CONFIG;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("Supabase credentials are not set. Web Push registration is skipped locally.");
    return true; // ローカル動作のみを許容する場合は true にし、エラー時は後続で無効化
  }

  // キーの抽出 (Base64url形式にする)
  const p256dh = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh'))))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const auth = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth'))))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const payload = {
    id: subscription.endpoint, // エンドポイントをIDとして利用
    endpoint: subscription.endpoint,
    p256dh: p256dh,
    auth: auth,
    notification_time: notifTime,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Tokyo'
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/subscriptions`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errText}`);
    }
    console.log('Successfully saved subscription to Supabase.');
    return true;
  } catch (e) {
    console.error('Failed to save subscription to Supabase:', e);
    showToast('DBへの通知登録に失敗しました。認証情報を確認してください。');
    return false;
  }
}

// Supabaseからの削除処理
async function deleteSubscriptionFromSupabase(endpoint) {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = NOTIFICATION_CONFIG;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/subscriptions?endpoint=eq.${encodeURIComponent(endpoint)}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    console.log('Successfully deleted subscription from Supabase.');
  } catch (e) {
    console.error('Failed to delete subscription from Supabase:', e);
  }
}

/**
 * 通知の有効化処理（設定ボタン押下時）
 */
async function enableNotifications() {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  const timeEl = document.getElementById('settings-notification-time');
  const notifTime = (timeEl ? timeEl.value : '') || '18:00';

  // Web Push 購読の有効化
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      if (!NOTIFICATION_CONFIG.VAPID_PUBLIC_KEY) {
        throw new Error('VAPID public key is missing in config.');
      }
      
      const applicationServerKey = urlBase64ToUint8Array(NOTIFICATION_CONFIG.VAPID_PUBLIC_KEY);
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });

      console.log('Web Push subscribed:', subscription);
      
      // Supabase に保存
      const saved = await saveSubscriptionToSupabase(subscription, notifTime);
      if (!saved) {
        // 保存失敗時は購読をロールバック解除
        await subscription.unsubscribe();
        return;
      }

    } catch (e) {
      console.error('Failed to subscribe Web Push:', e);
      showToast('バックグラウンド通知の登録に失敗しました');
      return;
    }
  } else {
    showToast('このブラウザはバックグラウンド通知に対応していません');
    return;
  }

  state.settings.notificationEnabled = true;
  state.settings.notificationTime = notifTime;
  saveSettings();
  renderSettings();
  showToast('通知を有効にしました 🔔');

  // すぐにテスト通知を表示
  showTrainingNotification('通知設定が完了しました', '本日のトレーニング日には、この時刻にお知らせします 💪');
}

/**
 * 通知の無効化処理
 */
async function disableNotifications() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        const endpoint = subscription.endpoint;
        await subscription.unsubscribe();
        await deleteSubscriptionFromSupabase(endpoint);
      }
    } catch (e) {
      console.error('Failed to unsubscribe Web Push:', e);
    }
  }

  state.settings.notificationEnabled = false;
  saveSettings();
  renderSettings();
  showToast('通知を無効にしました');
}

/**
 * OS通知を表示する
 */
function showTrainingNotification(title, body) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const menuId = getPlannedMenuIdForDate(getTodayString());
  const menu = WORKOUT_MENUS[menuId];
  const icon = './icons/icon-192.png';

  try {
    const notification = new Notification(title, {
      body,
      icon,
      badge: icon,
      tag: 'training-reminder', // 同じtagは重複せず上書き
      renotify: false,
      vibrate: [200, 100, 200]
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (e) {
    console.warn('Notification failed:', e);
  }
}

/**
 * アプリ起動時・復帰時に「今日通知すべきか」チェックし、必要なら通知を表示する
 */
function checkAndShowTodayNotification() {
  if (!state.settings.notificationEnabled) return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const today = getTodayString();
  const menuId = getPlannedMenuIdForDate(today);

  // 休養日は通知しない
  if (menuId === 'rest') return;

  // 今日すでに完了記録がある場合は通知しない
  const todayDone = state.records.some(r =>
    r.date === today && (r.status === 'completed' || r.status === 'minimal' || r.status === 'partial')
  );
  if (todayDone) return;

  // 設定した時刻を過ぎているか確認
  const now = new Date();
  const [notifHour, notifMin] = (state.settings.notificationTime || '18:00').split(':').map(Number);
  const notifMinuteOfDay = notifHour * 60 + notifMin;
  const nowMinuteOfDay = now.getHours() * 60 + now.getMinutes();

  if (nowMinuteOfDay < notifMinuteOfDay) return; // まだ通知時刻前

  // 今日すでに通知済みか確認（localStorageに記録）
  const lastNotifDate = localStorage.getItem('last_notification_date');
  if (lastNotifDate === today) return;

  // 通知を表示
  const menu = WORKOUT_MENUS[menuId];
  const menuName = menu ? menu.name : 'トレーニング';
  const menuTime = menu ? `${menu.estimatedMinutes}分` : '';

  showTrainingNotification(
    `💪 今日はトレーニングの日です！`,
    `${menuName}（${menuTime}）を実施しましょう。\n忙しい場合は最低限メニュー（10分）でもOK！`
  );

  localStorage.setItem('last_notification_date', today);
}


// ==========================================
// 5. トレーニング計画・ルールロジック
// ==========================================

// 特定の日付の本来の予定メニューIDを取得する
function getPlannedMenuIdForDate(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay(); // 0: 日, 1: 月, ..., 6: 土
  
  if (day === 1) return 'workout-a'; // 月
  if (day === 3) return 'workout-b'; // 水
  if (day === 5) return 'workout-c'; // 金
  
  if (day === 6 || day === 0) {
    // 週末ルール:
    // 土曜日なら、設定のデフォルト週末メニュー (hiit or briskwalk)
    if (day === 6) {
      return state.settings.defaultWeekendMenu;
    }
    
    // 日曜日なら:
    // 土曜日に完了記録（status=completed, partial, minimal）があるかチェック
    const satDateStr = getDateOffsetStr(dateStr, -1);
    const completedSat = state.records.some(r => r.date === satDateStr && r.status !== 'skipped');
    
    if (completedSat) {
      return 'rest'; // 土曜に実施していれば日曜は休養日
    } else {
      return state.settings.defaultWeekendMenu; // 土曜にやってなければ日曜にも表示
    }
  }
  
  return 'rest'; // 火・木は休養日
}

// 日付を加減算した文字列を取得
function getDateOffsetStr(baseDateStr, offsetDays) {
  const d = new Date(baseDateStr);
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dateVal = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dateVal}`;
}

// 経過週数の算出 (1〜8)
function getCalculatedWeekIndex() {
  if (!state.settings.trainingStartDate) return 1;
  const start = new Date(state.settings.trainingStartDate);
  const today = new Date(getTodayString());
  const diffTime = today - start;
  if (diffTime < 0) return 1;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;
  return Math.min(Math.max(week, 1), 8); // 1〜8週の範囲に収める
}

// 週次進捗の計算
function getWeeklyProgressStats() {
  const today = new Date();
  // 今週の開始日（月曜日 or 日曜日）を算出
  const firstDaySetting = state.settings.firstDayOfWeek; // 1: 月, 0: 日
  const currentDay = today.getDay();
  let diffToStart = currentDay - firstDaySetting;
  if (diffToStart < 0) diffToStart += 7;
  
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diffToStart);
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dateVal = String(d.getDate()).padStart(2, '0');
    weekDates.push(`${y}-${m}-${dateVal}`);
  }

  // 各曜日のステータスと計画を収集
  const weekDaysInfo = weekDates.map(dStr => {
    const d = new Date(dStr);
    const dayOfWeek = d.getDay();
    // 表示用曜日ラベル
    const daysLabel = ['日', '月', '火', '水', '木', '金', '土'];
    
    // この日の記録
    const dayRecords = state.records.filter(r => r.date === dStr);
    let status = null;
    let record = null;
    if (dayRecords.length > 0) {
      // 完了優先
      record = dayRecords.find(r => r.status === 'completed') || 
               dayRecords.find(r => r.status === 'minimal') || 
               dayRecords.find(r => r.status === 'partial') || 
               dayRecords[0];
      status = record.status;
    }

    // 予定メニュー
    const plannedMenuId = getPlannedMenuIdForDate(dStr);
    const isPlanned = plannedMenuId !== 'rest';

    return {
      date: dStr,
      dayLabel: daysLabel[dayOfWeek],
      isPlanned,
      plannedMenuId,
      status,
      record
    };
  });

  // 進捗集計
  // 予定日＝月、水、金、土日（有酸素は土日にまたがることがあるが、今週トータルで有酸素1回＋筋トレ3回＝計4回が基本）
  // 予定日のうち、実際実施した回数
  const completedCount = weekDaysInfo.filter(d => d.status && d.status !== 'skipped').length;
  // 予定のある最大枠数（筋トレ3日＋週末有酸素1日＝週4回目標とする）
  const totalTargetCount = 4;
  
  // 直近7日間の実施数
  const last7DaysDates = [];
  for (let i = 6; i >= 0; i--) {
    last7DaysDates.push(getDateOffsetStr(getTodayString(), -i));
  }
  const last7DaysCount = state.records.filter(r => last7DaysDates.includes(r.date) && r.status !== 'skipped').length;

  // 今月の総実施数
  const currentMonthPrefix = getTodayString().substring(0, 7); // YYYY-MM
  const currentMonthCount = state.records.filter(r => r.date.startsWith(currentMonthPrefix) && r.status !== 'skipped').length;

  return {
    weekDaysInfo,
    completedCount,
    totalTargetCount,
    last7DaysCount,
    currentMonthCount
  };
}

// 継続日数（Streak）の計算
function getActiveStreak() {
  let streak = 0;
  let checkDate = new Date();
  
  // 今日の記録があるか
  const todayStr = getTodayString();
  const todayRecords = state.records.filter(r => r.date === todayStr && r.status !== 'skipped');
  
  if (todayRecords.length > 0) {
    streak = 1;
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    // 今日がまだ未実施の場合、昨日から遡る
    // 今日が休養日または本来の予定日だがまだ終わってない場合、昨日完了していれば継続中とする
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    const records = state.records.filter(r => r.date === dateStr && r.status !== 'skipped');
    
    if (records.length > 0) {
      streak++;
    } else {
      // 記録がない場合、その日が本来の休養日（予定なし）だったかチェック
      const plannedMenuId = getPlannedMenuIdForDate(dateStr);
      if (plannedMenuId === 'rest') {
        // 休養日はカウントを維持して遡る（streakは増えないが途切れない）
      } else {
        // 予定があるのに実施しなかった日はストリーク途切れ
        break;
      }
    }
    
    // 安全ブレーキ (過去1年分まで)
    if (streak > 365) break;
    checkDate.setDate(checkDate.getDate() - 1);
  }
  return streak;
}

// ==========================================
// 5. ビューレンダリング（今日 / メニュー / 履歴 / 設定）
// ==========================================

// トースト表示
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// 画面切り替え
function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.toggle('active', screen.id === `screen-${tabId}`);
  });
  
  if (tabId === 'today') renderToday();
  if (tabId === 'menus') renderMenus();
  if (tabId === 'history') renderHistory();
  if (tabId === 'settings') renderSettings();
}

// --- 「今日」画面 ---
function renderToday() {
  const container = document.getElementById('today-workout-container');
  const todayStr = getTodayString();
  
  // 今日の本来の予定
  const plannedId = state.sessionState.plannedMenuId;
  const currentDisplayId = state.sessionState.selectedDisplayMenuId;
  const isMinimal = state.sessionState.isMinimalSelected;

  // ヘッダーの週バッジを更新
  const weekBadgeEl = document.getElementById('header-week-badge');
  if (weekBadgeEl) weekBadgeEl.innerText = `Week ${getCalculatedWeekIndex()}`;

  // 今日の進捗・継続状況
  const stats = getWeeklyProgressStats();
  const streak = getActiveStreak();

  // 進捗バーの更新
  const percent = Math.min(Math.round((stats.completedCount / stats.totalTargetCount) * 100), 100);
  document.getElementById('weekly-progress-bar-fill').style.width = `${percent}%`;
  document.getElementById('weekly-progress-text').innerText = `今週 ${stats.completedCount} / ${stats.totalTargetCount} 回 (${percent}%)`;
  document.getElementById('streak-count-text').innerText = `${streak} 日連続`;

  // 週のドットスケジュール表示
  const dotContainer = document.getElementById('weekly-schedule-dots');
  dotContainer.innerHTML = '';
  stats.weekDaysInfo.forEach(d => {
    const dotCol = document.createElement('div');
    dotCol.className = 'schedule-dot-col';
    
    const dot = document.createElement('div');
    dot.className = 'schedule-dot';
    dot.innerText = d.dayLabel;
    
    if (d.status) {
      dot.classList.add(d.status); // completed, partial, minimal, skipped
    } else if (d.isPlanned) {
      dot.classList.add('planned');
    }
    
    const label = document.createElement('span');
    label.className = 'schedule-dot-label';
    if (d.status === 'completed') label.innerText = '完了';
    else if (d.status === 'minimal') label.innerText = '代替';
    else if (d.status === 'partial') label.innerText = '一部';
    else if (d.status === 'skipped') label.innerText = 'スキップ';
    else if (d.plannedMenuId !== 'rest') {
      const nameMap = { 'workout-a': 'A', 'workout-b': 'B', 'workout-c': 'C', 'hiit': 'HIIT', 'briskwalk': '歩き' };
      label.innerText = nameMap[d.plannedMenuId] || '予定';
    } else {
      label.innerText = '休養';
    }
    
    dotCol.appendChild(dot);
    dotCol.appendChild(label);
    dotContainer.appendChild(dotCol);
  });

  // 本日のメニュー表示カード
  container.innerHTML = '';

  // 休養日判定（表示メニューが rest、かつ最低限メニューの選択もない場合）
  if (currentDisplayId === 'rest' && !isMinimal) {
    container.innerHTML = `
      <div class="card card-workout" style="--workout-color: var(--rgb-rest)">
        <div class="card-category" style="color: rgb(var(--rgb-rest))">
          <svg style="width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          Rest Day
        </div>
        <h3 class="card-title">今日は休養日です</h3>
        <p class="card-desc" style="font-size:13px; color:var(--text-secondary); margin-bottom:16px;">
          筋肉をしっかり休ませることもトレーニングの一部です。忙しくて消化できなかったメニューを代わりに実施することもできます。
        </p>
        <button class="btn btn-minimal" id="today-select-minimal-btn">
          忙しいので最低限メニューを行う
        </button>
      </div>
    `;
    
    document.getElementById('today-select-minimal-btn').addEventListener('click', selectMinimalMenu);
    return;
  }

  // 表示対象メニュー
  const menu = WORKOUT_MENUS[currentDisplayId];
  if (!menu) return;

  const isWeekendMenu = menu.id === 'hiit' || menu.id === 'briskwalk';
  const colorVar = menu.id === 'minimal' ? 'var(--rgb-minimal)' : (menu.id === 'workout-a' ? 'var(--rgb-workout-a)' : (menu.id === 'workout-b' ? 'var(--rgb-workout-b)' : (menu.id === 'workout-c' ? 'var(--rgb-workout-c)' : 'var(--rgb-hiit)')));

  const cardHtml = `
    <div class="card card-workout" style="--workout-color: ${colorVar}">
      ${isMinimal ? `
        <div class="alt-banner">
          <div class="alt-banner-text">
            <span class="alt-banner-badge">代替実施中</span>
            <span>本来の予定: ${WORKOUT_MENUS[plannedId] ? WORKOUT_MENUS[plannedId].name : '休養日'}</span>
          </div>
          <button class="btn btn-secondary btn-sm" id="today-restore-planned-btn" style="width:auto; padding:4px 8px; border-radius:6px; font-size:11px;">戻す</button>
        </div>
      ` : ''}
      
      <div class="card-category">
        <svg style="width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        Today's Program
      </div>
      <h3 class="card-title">${menu.name}</h3>
      <div class="card-meta">
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          約 ${menu.estimatedMinutes} 分
        </span>
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          ${menu.exercises.length} 種目
        </span>
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          推奨 ${menu.roundsDefault} 周
        </span>
      </div>

      ${isWeekendMenu ? `
        <div class="form-group" style="margin-bottom: 14px;">
          <label class="form-label" style="font-size:11px;">週末メニュー選択</label>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-sm ${menu.id === 'hiit' ? 'btn-primary' : 'btn-secondary'}" id="select-weekend-hiit" style="flex:1; --workout-color: var(--rgb-hiit)">HIIT (12分)</button>
            <button class="btn btn-sm ${menu.id === 'briskwalk' ? 'btn-primary' : 'btn-secondary'}" id="select-weekend-walk" style="flex:1; --workout-color: var(--rgb-walk)">速歩き (20分)</button>
          </div>
        </div>
      ` : ''}

      <div class="exercise-preview-list">
        ${menu.exercises.map(ex => {
          let qtyText = '';
          if (ex.durationSec > 0) {
            qtyText = `${ex.durationSec} 秒`;
          } else if (ex.repsMin > 0) {
            qtyText = ex.sideRequired ? `左右各${ex.repsMin}〜${ex.repsMax}回` : `${ex.repsMin}〜${ex.repsMax}回`;
          }
          return `
            <div class="exercise-preview-item">
              <span class="exercise-preview-name">${ex.name}</span>
              <span class="exercise-preview-qty">${qtyText}</span>
            </div>
          `;
        }).join('')}
      </div>

      <button class="btn btn-primary" id="today-start-workout-btn" style="margin-bottom: 12px;">
        <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        トレーニングを開始
      </button>

      <div class="btn-group-row">
        <button class="btn btn-secondary btn-sm" id="today-quick-complete-btn">完了記録</button>
        <button class="btn btn-secondary btn-sm" id="today-log-modal-btn">手動入力...</button>
      </div>

      ${!isMinimal ? `
        <button class="btn btn-minimal btn-sm" id="today-select-minimal-btn" style="margin-top:12px;">
          忙しいので最低限メニューに切り替え
        </button>
      ` : ''}
    </div>
  `;

  container.innerHTML = cardHtml;

  // イベント登録
  document.getElementById('today-start-workout-btn').addEventListener('click', () => startWorkout(menu));
  document.getElementById('today-quick-complete-btn').addEventListener('click', () => quickCompleteWorkout(menu));
  document.getElementById('today-log-modal-btn').addEventListener('click', () => openRecordModal(menu));
  
  if (!isMinimal) {
    document.getElementById('today-select-minimal-btn').addEventListener('click', selectMinimalMenu);
  } else {
    document.getElementById('today-restore-planned-btn').addEventListener('click', restorePlannedMenu);
  }

  if (isWeekendMenu) {
    document.getElementById('select-weekend-hiit').addEventListener('click', () => changeWeekendMenu('hiit'));
    document.getElementById('select-weekend-walk').addEventListener('click', () => changeWeekendMenu('briskwalk'));
  }
}

function selectMinimalMenu() {
  state.sessionState.selectedDisplayMenuId = 'minimal';
  state.sessionState.isMinimalSelected = true;
  state.sessionState.lastUpdatedAt = Date.now();
  saveSessionState();
  renderToday();
  showToast('最低限メニュー（代替実施モード）に切り替えました');
}

function restorePlannedMenu() {
  const plannedId = state.sessionState.plannedMenuId;
  state.sessionState.selectedDisplayMenuId = plannedId;
  state.sessionState.isMinimalSelected = false;
  state.sessionState.lastUpdatedAt = Date.now();
  saveSessionState();
  renderToday();
  showToast('本来の予定メニューに戻しました');
}

function changeWeekendMenu(menuId) {
  state.sessionState.selectedDisplayMenuId = menuId;
  state.sessionState.lastUpdatedAt = Date.now();
  saveSessionState();
  renderToday();
}

// --- 「メニュー一覧」画面 ---
function renderMenus() {
  const listContainer = document.getElementById('menu-list-container');
  listContainer.innerHTML = '';

  const allMenus = [
    WORKOUT_MENUS['workout-a'],
    WORKOUT_MENUS['workout-b'],
    WORKOUT_MENUS['workout-c'],
    WORKOUT_MENUS['hiit'],
    WORKOUT_MENUS['briskwalk'],
    WORKOUT_MENUS['minimal'],
    WARMUP_MENU
  ];

  allMenus.forEach(menu => {
    let categoryText = '';
    let colorVar = 'var(--rgb-rest)';
    if (menu.id === 'workout-a') { categoryText = '筋トレA (下半身/押す)'; colorVar = 'var(--rgb-workout-a)'; }
    else if (menu.id === 'workout-b') { categoryText = '筋トレB (片脚/引く/体幹)'; colorVar = 'var(--rgb-workout-b)'; }
    else if (menu.id === 'workout-c') { categoryText = '筋トレC (全身サーキット)'; colorVar = 'var(--rgb-workout-c)'; }
    else if (menu.id === 'hiit') { categoryText = '有酸素 (HIIT)'; colorVar = 'var(--rgb-hiit)'; }
    else if (menu.id === 'briskwalk') { categoryText = '有酸素 (ウォーキング)'; colorVar = 'var(--rgb-walk)'; }
    else if (menu.id === 'minimal') { categoryText = '代替救済 (時短)'; colorVar = 'var(--rgb-minimal)'; }
    else if (menu.id === 'warmup') { categoryText = '補助 (準備体操)'; colorVar = 'var(--rgb-warmup)'; }

    const item = document.createElement('div');
    item.className = 'menu-list-item';
    item.style.setProperty('--workout-color', colorVar);
    item.innerHTML = `
      <div class="menu-list-info">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="menu-list-title">${menu.name}</span>
          <span class="badge-tag">${menu.estimatedMinutes}分</span>
        </div>
        <div class="menu-list-meta">
          <span>${categoryText}</span>
          <span>${menu.exercises.length}種目</span>
        </div>
      </div>
      <svg class="arrow-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
    `;
    item.addEventListener('click', () => openMenuDetails(menu.id));
    listContainer.appendChild(item);
  });
}

// メニュー詳細表示
function openMenuDetails(menuId) {
  activeDetailMenuId = menuId;
  const menu = menuId === 'warmup' ? WARMUP_MENU : WORKOUT_MENUS[menuId];
  if (!menu) return;

  const overlay = document.getElementById('detail-view');
  
  let colorVar = 'var(--rgb-rest)';
  if (menu.id === 'workout-a') colorVar = 'var(--rgb-workout-a)';
  else if (menu.id === 'workout-b') colorVar = 'var(--rgb-workout-b)';
  else if (menu.id === 'workout-c') colorVar = 'var(--rgb-workout-c)';
  else if (menu.id === 'hiit') colorVar = 'var(--rgb-hiit)';
  else if (menu.id === 'briskwalk') colorVar = 'var(--rgb-walk)';
  else if (menu.id === 'minimal') colorVar = 'var(--rgb-minimal)';
  else if (menu.id === 'warmup') colorVar = 'var(--rgb-warmup)';

  overlay.style.setProperty('--workout-color', colorVar);

  // 代替実施中の表示用ヘッダー
  const today = getTodayString();
  const isCurrentlyMinimal = state.sessionState.date === today && state.sessionState.isMinimalSelected && menu.id === 'minimal';

  const detailContent = document.getElementById('detail-view-content');
  detailContent.innerHTML = `
    <div class="detail-header">
      <button class="detail-back-btn" id="detail-back-btn">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        戻る
      </button>
      <span class="detail-card-badge">${isCurrentlyMinimal ? '代替実施中' : menu.category === 'strength' ? '筋力トレーニング' : menu.category === 'cardio' ? '有酸素運動' : '補助メニュー'}</span>
    </div>

    <h2 class="detail-title">${menu.name}</h2>
    <p class="detail-desc">${menu.description}</p>

    <div class="detail-info-grid">
      <div class="detail-info-box">
        <div class="detail-info-label">想定時間</div>
        <div class="detail-info-value">${menu.estimatedMinutes}分</div>
      </div>
      <div class="detail-info-box">
        <div class="detail-info-label">種目数</div>
        <div class="detail-info-value">${menu.exercises.length}種目</div>
      </div>
      <div class="detail-info-box">
        <div class="detail-info-label">基本周回</div>
        <div class="detail-info-value">${menu.roundsDefault}周</div>
      </div>
    </div>

    <!-- アクションボタンエリア -->
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
      ${menu.id !== 'warmup' ? `
        <button class="btn btn-primary" id="detail-start-btn">
          <svg style="width:16px;height:16px;fill:currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          このトレーニングを開始
        </button>
        <button class="btn btn-secondary" id="detail-log-btn">今日このメニューを記録</button>
        
        <!-- 代替関連アクション -->
        ${menu.id === 'minimal' ? `
          <button class="btn btn-minimal" id="detail-set-as-today-alt-btn">今日の代替メニューとして選択</button>
        ` : `
          <button class="btn btn-minimal" id="detail-switch-to-minimal-btn">最低限メニューに切り替える</button>
        `}
      ` : ''}
    </div>

    <!-- 進行ガイド補足 -->
    ${menu.category === 'strength' && menu.id !== 'minimal' ? `
      <div class="help-box" style="margin-bottom: 20px;">
        <strong>【進行目安】</strong><br>
        1〜2週目：2周 / 下限回数 / フォーム優先<br>
        3〜4週目：3周 / 上限回数チャレンジ<br>
        5〜6週目：動作をスローに / 可動域拡大<br>
        7〜8週目：重り追加 / 休憩短縮
      </div>
    ` : ''}

    <!-- 種目リスト -->
    <h3 style="font-size:16px; font-weight:700; margin-bottom:12px;">構成種目</h3>
    <div class="exercise-list">
      ${menu.exercises.map((ex, index) => {
        let qtyText = '';
        if (ex.durationSec > 0) {
          qtyText = `${ex.durationSec} 秒`;
        } else if (ex.repsMin > 0) {
          qtyText = ex.sideRequired ? `左右各${ex.repsMin}〜${ex.repsMax}回` : `${ex.repsMin}〜${ex.repsMax}回`;
        }
        return `
          <div class="exercise-detail-card">
            <div class="exercise-header">
              <span class="exercise-name">${index + 1}. ${ex.name}</span>
              <span class="exercise-qty">${qtyText}</span>
            </div>
            <div class="exercise-meta-row">
              ${ex.equipment ? `<span class="exercise-tag">器具: ${ex.equipment}</span>` : ''}
              ${ex.sideRequired ? `<span class="exercise-tag">左右個別</span>` : ''}
            </div>
            <p class="exercise-memo">${ex.memo}</p>
            ${ex.alternative ? `<div class="exercise-alt">💡 初心者向け代替: ${ex.alternative}</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>

    <!-- メモ/ルール -->
    <div class="help-box" style="margin-top:20px;">
      <strong>■ ルール・注意事項</strong>
      <ol>
        ${menu.notes.map(note => `<li>${note}</li>`).join('')}
      </ol>
    </div>
  `;

  overlay.style.display = 'block';

  // バックボタン
  document.getElementById('detail-back-btn').addEventListener('click', () => {
    overlay.style.display = 'none';
    activeDetailMenuId = null;
  });

  if (menu.id !== 'warmup') {
    document.getElementById('detail-start-btn').addEventListener('click', () => {
      overlay.style.display = 'none';
      startWorkout(menu);
    });
    document.getElementById('detail-log-btn').addEventListener('click', () => {
      openRecordModal(menu);
    });
    
    if (menu.id === 'minimal') {
      document.getElementById('detail-set-as-today-alt-btn').addEventListener('click', () => {
        overlay.style.display = 'none';
        selectMinimalMenu();
        switchTab('today');
      });
    } else {
      document.getElementById('detail-switch-to-minimal-btn').addEventListener('click', () => {
        overlay.style.display = 'none';
        selectMinimalMenu();
        switchTab('today');
      });
    }
  }
}

// --- 「履歴」画面 ---
let activeHistoryFilter = 'all';

function renderHistory() {
  const container = document.getElementById('history-logs-container');
  
  // 各集計値の表示
  const stats = getWeeklyProgressStats();
  const streak = getActiveStreak();
  document.getElementById('history-weekly-count').innerText = `${stats.completedCount} 回`;
  document.getElementById('history-streak-count').innerText = `${streak} 日`;
  document.getElementById('history-monthly-count').innerText = `${stats.currentMonthCount} 回`;

  // フィルター行のレンダリング
  const filterRow = document.getElementById('history-filter-row');
  filterRow.innerHTML = `
    <button class="filter-btn ${activeHistoryFilter === 'all' ? 'active' : ''}" data-filter="all">すべて</button>
    <button class="filter-btn ${activeHistoryFilter === 'strength' ? 'active' : ''}" data-filter="strength">筋トレ</button>
    <button class="filter-btn ${activeHistoryFilter === 'cardio' ? 'active' : ''}" data-filter="cardio">有酸素</button>
    <button class="filter-btn ${activeHistoryFilter === 'minimal' ? 'active' : ''}" data-filter="minimal">最低限のみ</button>
  `;

  // フィルタークリックイベント
  filterRow.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeHistoryFilter = e.target.dataset.filter;
      renderHistory();
    });
  });

  // レコードのフィルタリング
  let filtered = [...state.records].sort((a, b) => b.date.localeCompare(a.date)); // 降順

  if (activeHistoryFilter === 'strength') {
    filtered = filtered.filter(r => {
      const menu = WORKOUT_MENUS[r.actualMenuId];
      return menu && menu.category === 'strength';
    });
  } else if (activeHistoryFilter === 'cardio') {
    filtered = filtered.filter(r => {
      const menu = WORKOUT_MENUS[r.actualMenuId];
      return menu && menu.category === 'cardio';
    });
  } else if (activeHistoryFilter === 'minimal') {
    filtered = filtered.filter(r => r.status === 'minimal');
  }

  container.innerHTML = '';
  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:40px; color:var(--text-tertiary); font-size:14px;">記録がありません</div>`;
    return;
  }

  filtered.forEach(rec => {
    const item = document.createElement('div');
    item.className = 'log-item';
    
    // 表示用ステータスバッジ
    let statusClass = 'completed';
    let statusText = '完了';
    if (rec.status === 'minimal') { statusClass = 'minimal'; statusText = '最低限で代替'; }
    else if (rec.status === 'partial') { statusClass = 'partial'; statusText = '一部実施'; }
    else if (rec.status === 'skipped') { statusClass = 'skipped'; statusText = 'スキップ'; }

    // 本来の予定と実施内容が異なる場合 (最低限代替など) の表記
    let menuName = '';
    const plannedMenu = WORKOUT_MENUS[rec.plannedMenuId];
    const actualMenu = WORKOUT_MENUS[rec.actualMenuId];
    
    if (rec.status === 'minimal' && plannedMenu && rec.plannedMenuId !== rec.actualMenuId) {
      menuName = `${plannedMenu.name} （${actualMenu.name}で代替）`;
    } else {
      menuName = actualMenu ? actualMenu.name : (plannedMenu ? plannedMenu.name : '不明なメニュー');
    }

    item.innerHTML = `
      <div class="log-header">
        <span class="log-date">${formatDateJp(rec.date)}</span>
        <span class="log-status-badge ${statusClass}">${statusText}</span>
      </div>
      <h4 class="log-title">${menuName}</h4>
      <div class="log-meta">
        ${rec.durationMinutes ? `<span>⏱ ${rec.durationMinutes} 分</span>` : ''}
        ${rec.roundsCompleted ? `<span>🔄 ${rec.roundsCompleted} 周</span>` : ''}
      </div>
      ${rec.note ? `<div class="log-note">${rec.note}</div>` : ''}
      <div class="log-actions">
        <button class="log-action-btn edit" data-id="${rec.id}">
          <svg style="width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          編集
        </button>
        <button class="log-action-btn delete" data-id="${rec.id}">
          <svg style="width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          削除
        </button>
      </div>
    `;

    // 削除・編集イベント
    item.querySelector('.log-action-btn.delete').addEventListener('click', () => deleteRecord(rec.id));
    item.querySelector('.log-action-btn.edit').addEventListener('click', () => openEditRecordModal(rec));

    container.appendChild(item);
  });
}

// 記録の削除
function deleteRecord(recordId) {
  if (confirm('この記録を削除してもよろしいですか？')) {
    state.records = state.records.filter(r => r.id !== recordId);
    saveRecords();
    
    // 今日の記録を削除した場合、週末ルール等を反映するためsessionStateを同期
    const today = getTodayString();
    const plannedId = getPlannedMenuIdForDate(today);
    if (state.sessionState.date === today) {
      state.sessionState.plannedMenuId = plannedId;
      if (!state.sessionState.isMinimalSelected) {
        state.sessionState.selectedDisplayMenuId = plannedId;
      }
      saveSessionState();
    }
    
    renderHistory();
    renderToday();
    showToast('記録を削除しました');
  }
}

// --- 「設定」画面 ---
function renderSettings() {
  // 設定フォームの初期値を反映
  document.getElementById('settings-start-date').value = state.settings.trainingStartDate || getTodayString();
  document.getElementById('settings-weekend-menu').value = state.settings.defaultWeekendMenu;
  document.getElementById('settings-week-idx-override').value = getCalculatedWeekIndex();
  document.getElementById('settings-warmup-enabled').checked = state.settings.includeWarmup;

  // 通知設定のUIを反映
  const notifTimeEl = document.getElementById('settings-notification-time');
  if (notifTimeEl) notifTimeEl.value = state.settings.notificationTime || '18:00';

  const notifStatus = document.getElementById('notification-status-text');
  const enableBtn = document.getElementById('notification-enable-btn');
  const disableBtn = document.getElementById('notification-disable-btn');

  if (notifStatus && enableBtn && disableBtn) {
    const permission = ('Notification' in window) ? Notification.permission : 'unsupported';
    const isEnabled = state.settings.notificationEnabled && permission === 'granted';

    if (permission === 'unsupported') {
      notifStatus.innerText = '⚠️ このブラウザは通知に非対応です';
      notifStatus.style.color = '#f87171';
      enableBtn.style.display = 'none';
      disableBtn.style.display = 'none';
    } else if (permission === 'denied') {
      notifStatus.innerText = '🚫 通知がブロックされています。Safari設定 → Webサイト → 通知 → 許可してください。';
      notifStatus.style.color = '#f87171';
      enableBtn.style.display = 'none';
      disableBtn.style.display = 'none';
    } else if (isEnabled) {
      notifStatus.innerText = `🔔 通知有効 — トレーニング日の ${state.settings.notificationTime} にお知らせします`;
      notifStatus.style.color = '#34d399';
      enableBtn.style.display = 'none';
      disableBtn.style.display = 'inline-flex';
    } else {
      notifStatus.innerText = '🔕 通知は無効です';
      notifStatus.style.color = 'var(--text-secondary)';
      enableBtn.style.display = 'inline-flex';
      disableBtn.style.display = 'none';
    }
  }

  // ヘッダーの週バッジを更新
  const weekBadge = document.getElementById('header-week-badge');
  if (weekBadge) weekBadge.innerText = `Week ${getCalculatedWeekIndex()}`;

  // 8週間ガイドの進捗ハイライト表示
  const currentWeek = getCalculatedWeekIndex();
  const guideContainer = document.getElementById('settings-guide-container');
  guideContainer.innerHTML = '';

  EIGHT_WEEK_GUIDE.forEach((g, idx) => {
    let isActive = false;
    if (currentWeek >= 1 && currentWeek <= 2 && idx === 0) isActive = true;
    else if (currentWeek >= 3 && currentWeek <= 4 && idx === 1) isActive = true;
    else if (currentWeek >= 5 && currentWeek <= 6 && idx === 2) isActive = true;
    else if (currentWeek >= 7 && currentWeek <= 8 && idx === 3) isActive = true;

    const item = document.createElement('div');
    item.className = `guide-item ${isActive ? 'active' : ''}`;
    item.innerHTML = `
      <div class="guide-week-title">
        <span>${g.weeks} : ${g.goal}</span>
        ${isActive ? '<span class="guide-week-badge">現在進行中</span>' : ''}
      </div>
      <div class="guide-content">${g.detail}</div>
    `;
    guideContainer.appendChild(item);
  });
}

// 設定変更保存
function saveAppSettingsFromUI() {
  const oldStartDate = state.settings.trainingStartDate;
  const newStartDate = document.getElementById('settings-start-date').value;
  const weekendMenu = document.getElementById('settings-weekend-menu').value;
  const includeWarmup = document.getElementById('settings-warmup-enabled').checked;
  const notifTime = document.getElementById('settings-notification-time')?.value || '18:00';

  state.settings.trainingStartDate = newStartDate;
  state.settings.defaultWeekendMenu = weekendMenu;
  state.settings.includeWarmup = includeWarmup;
  state.settings.notificationTime = notifTime;
  
  // もし開始日が変更されたら、今週の予定メニューも再計算
  if (oldStartDate !== newStartDate) {
    const today = getTodayString();
    const plannedId = getPlannedMenuIdForDate(today);
    state.sessionState.plannedMenuId = plannedId;
    if (!state.sessionState.isMinimalSelected) {
      state.sessionState.selectedDisplayMenuId = plannedId;
    }
    saveSessionState();
  }

  saveSettings();
  renderSettings();
  renderToday();
  showToast('設定を保存しました');
}

// 経過週数の手動変更時：開始日を逆算して設定
function overrideWeekIndex() {
  const selectVal = parseInt(document.getElementById('settings-week-idx-override').value);
  const today = new Date();
  // 選択週の開始日に合わせる (例: 3週目なら、今日から 14日前を開始日に設定)
  const offsetDays = (selectVal - 1) * 7;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() - offsetDays);
  
  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, '0');
  const d = String(targetDate.getDate()).padStart(2, '0');
  
  state.settings.trainingStartDate = `${y}-${m}-${d}`;
  saveSettings();

  // sessionState の更新
  const todayStr = getTodayString();
  const plannedId = getPlannedMenuIdForDate(todayStr);
  state.sessionState.plannedMenuId = plannedId;
  if (!state.sessionState.isMinimalSelected) {
    state.sessionState.selectedDisplayMenuId = plannedId;
  }
  saveSessionState();

  renderSettings();
  renderToday();
  showToast(`第 ${selectVal} 週目に設定しました`);
}

// ==========================================
// 6. 手動記録モーダル (WorkoutRecord Modal)
// ==========================================

let editingRecordId = null;

function openRecordModal(menu, isAlternative = false) {
  editingRecordId = null;
  document.getElementById('modal-title').innerText = 'トレーニング記録';
  
  const today = getTodayString();
  document.getElementById('record-date').value = today;
  document.getElementById('record-menu-id').value = menu.id;
  document.getElementById('record-rounds').value = menu.roundsDefault;
  document.getElementById('record-duration').value = menu.estimatedMinutes;
  document.getElementById('record-note').value = '';

  // ステータスピル初期化 (completed)
  let initialStatus = 'completed';
  if (menu.id === 'minimal') {
    initialStatus = 'minimal';
  }
  setActiveStatusPill(initialStatus);

  document.getElementById('record-modal').style.display = 'flex';
}

function openEditRecordModal(record) {
  editingRecordId = record.id;
  document.getElementById('modal-title').innerText = '記録の編集';
  
  document.getElementById('record-date').value = record.date;
  document.getElementById('record-menu-id').value = record.actualMenuId;
  document.getElementById('record-rounds').value = record.roundsCompleted || '';
  document.getElementById('record-duration').value = record.durationMinutes || '';
  document.getElementById('record-note').value = record.note || '';

  setActiveStatusPill(record.status);

  document.getElementById('record-modal').style.display = 'flex';
}

function closeRecordModal() {
  document.getElementById('record-modal').style.display = 'none';
  editingRecordId = null;
}

function setActiveStatusPill(status) {
  document.querySelectorAll('.status-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.status === status);
  });
  // 選択ステータスを隠し項目に保持
  document.getElementById('record-status-hidden').value = status;
}

// モーダル保存処理
function saveRecordFromModal(e) {
  e.preventDefault();
  
  const date = document.getElementById('record-date').value;
  const actualMenuId = document.getElementById('record-menu-id').value;
  const status = document.getElementById('record-status-hidden').value;
  const rounds = parseInt(document.getElementById('record-rounds').value) || 0;
  const duration = parseInt(document.getElementById('record-duration').value) || 0;
  const note = document.getElementById('record-note').value;

  const plannedMenuId = getPlannedMenuIdForDate(date);

  if (editingRecordId) {
    // 編集
    const idx = state.records.findIndex(r => r.id === editingRecordId);
    if (idx !== -1) {
      state.records[idx] = {
        ...state.records[idx],
        date,
        actualMenuId,
        status,
        roundsCompleted: rounds,
        durationMinutes: duration,
        note
      };
    }
  } else {
    // 新規追加
    const newRecord = {
      id: 'rec-' + Date.now(),
      date,
      plannedMenuId,
      actualMenuId,
      status,
      roundsCompleted: rounds,
      durationMinutes: duration,
      note,
      isAlternativeExecution: (plannedMenuId !== actualMenuId)
    };
    state.records.push(newRecord);
  }

  saveRecords();
  closeRecordModal();
  
  // 今日の記録なら、週末の有酸素判定などを即時反映するためsessionStateを同期
  const today = getTodayString();
  if (date === today) {
    const nextPlannedId = getPlannedMenuIdForDate(today);
    state.sessionState.plannedMenuId = nextPlannedId;
    if (!state.sessionState.isMinimalSelected) {
      state.sessionState.selectedDisplayMenuId = nextPlannedId;
    }
    saveSessionState();
  }

  renderToday();
  renderHistory();
  showToast(editingRecordId ? '記録を更新しました' : '記録を保存しました');
}

// クイック完了記録 (今日カード用)
function quickCompleteWorkout(menu) {
  const today = getTodayString();
  const plannedId = state.sessionState.plannedMenuId;
  const isMinimal = state.sessionState.isMinimalSelected;
  
  const record = {
    id: 'rec-' + Date.now(),
    date: today,
    plannedMenuId: plannedId,
    actualMenuId: menu.id,
    status: isMinimal ? 'minimal' : 'completed',
    roundsCompleted: menu.roundsDefault,
    durationMinutes: menu.estimatedMinutes,
    note: isMinimal ? '最低限メニューで代替実施' : '',
    isAlternativeExecution: isMinimal
  };

  state.records.push(record);
  saveRecords();

  // sessionState の再同期
  const nextPlannedId = getPlannedMenuIdForDate(today);
  state.sessionState.plannedMenuId = nextPlannedId;
  if (!state.sessionState.isMinimalSelected) {
    state.sessionState.selectedDisplayMenuId = nextPlannedId;
  }
  saveSessionState();

  renderToday();
  renderHistory();
  showToast(`${menu.name}の実施を記録しました！🎉`);
}

// ==========================================
// 7. ワークアウト実行タイマー (Workout Runner Engine)
// ==========================================

function startWorkout(menu) {
  // Web Audioの初期化解放
  SoundSynth.init();

  // ワークアウトステップを構築する
  const steps = [];
  
  // 1. ウォームアップ（ステートの設定を参照）
  const warmupToggle = document.getElementById('settings-warmup-enabled');
  // トグルが DOMにある場合はトグルの値を優先、なければステートから読む
  const includeWarmup = warmupToggle ? warmupToggle.checked : state.settings.includeWarmup;
  if (includeWarmup) {
    WARMUP_MENU.exercises.forEach(ex => {
      steps.push({
        type: 'warmup',
        title: '準備運動',
        name: ex.name,
        duration: normalizeStepDuration(ex.durationSec),
        memo: ex.memo,
        menuId: 'warmup'
      });
    });
  }

  // 2. 本編トレーニング（周回分ループ）
  const totalRounds = menu.roundsDefault;
  for (let r = 1; r <= totalRounds; r++) {
    menu.exercises.forEach((ex, idx) => {
      // 種目ステップ
      const stepDuration = normalizeStepDuration(ex.durationSec);
      
      steps.push({
        type: 'exercise',
        title: `${menu.name} (周回 ${r}/${totalRounds})`,
        name: ex.name,
        duration: stepDuration,
        repsMin: ex.repsMin,
        repsMax: ex.repsMax,
        sideRequired: ex.sideRequired,
        equipment: ex.equipment,
        alternative: ex.alternative,
        memo: ex.memo,
        menuId: menu.id
      });

      // 種目間休憩 (最後の種目の後は除く)
      if (idx < menu.exercises.length - 1) {
        steps.push({
          type: 'rest',
          title: `休憩 (周回 ${r}/${totalRounds})`,
          name: '次の種目への準備',
          duration: menu.id === 'workout-c' ? 15 : 20, // 筋トレCは15秒、その他は20秒
          memo: '息を整えて、次の姿勢を準備します。'
        });
      }
    });

    // 周回間休憩 (最後の周の後は除く)
    if (r < totalRounds) {
      steps.push({
        type: 'rest',
        title: '周回間休憩',
        name: '水分補給 ＆ リラックス',
        duration: menu.id === 'workout-c' ? 45 : 60, // 筋トレCは45秒、その他は60秒
        memo: '軽く歩き回るか深呼吸をして、次のセットに備えます。'
      });
    }
  }

  if (steps.length === 0) return;

  // タイマー状態初期化
  runnerState = {
    menu: menu,
    steps: steps,
    currentStepIdx: 0,
    secondsLeft: Number.isFinite(steps[0].duration) && steps[0].duration > 0 ? steps[0].duration : 0,
    isPaused: false,
    intervalId: null
  };

  // ビューの切り替え
  document.getElementById('runner-view').classList.add('active');
  // スクロールを上部に戻す
  document.getElementById('runner-view').scrollTop = 0;
  
  // テーマカラー設定
  let colorVar = 'var(--rgb-workout-a)';
  if (menu.id === 'workout-b') colorVar = 'var(--rgb-workout-b)';
  else if (menu.id === 'workout-c') colorVar = 'var(--rgb-workout-c)';
  else if (menu.id === 'hiit') colorVar = 'var(--rgb-hiit)';
  else if (menu.id === 'briskwalk') colorVar = 'var(--rgb-walk)';
  else if (menu.id === 'minimal') colorVar = 'var(--rgb-minimal)';
  document.getElementById('runner-view').style.setProperty('--workout-color', colorVar);

  SoundSynth.playStart();
  updateRunnerUI();
  startRunnerTimer();
}

function startRunnerTimer() {
  if (runnerState.intervalId) {
    clearInterval(runnerState.intervalId);
    runnerState.intervalId = null;
  }

  const currentStep = runnerState.steps[runnerState.currentStepIdx];
  if (!currentStep) return;

  // duration が 0 以下・NaN・null などの場合はタイマーを起動しない
  // 回数系種目（exercise で duration=0）はユーザーが「✓ 完了！次へ進む」を押すまで待機
  const duration = currentStep.duration;
  console.log('[Runner] startRunnerTimer:', { type: currentStep.type, name: currentStep.name, duration, secondsLeft: runnerState.secondsLeft });
  if (!(duration > 0)) {
    console.log('[Runner] → タイマー起動スキップ（回数系種目）');
    return;
  }
  console.log('[Runner] → タイマー起動 duration=' + duration + '秒');

  runnerState.intervalId = setInterval(() => {
    // runnerState が null になっていたら（終了後など）即座に停止
    if (!runnerState) return;
    if (runnerState.isPaused) return;

    if (runnerState.secondsLeft > 0) {
      runnerState.secondsLeft--;

      // ラスト3秒カウント音
      if (runnerState.secondsLeft >= 1 && runnerState.secondsLeft <= 3) {
        SoundSynth.playTick();
      }

      updateRunnerUI();
    } else {
      // 時間系ステップが完了 → 自動で次へ
      nextRunnerStep();
    }
  }, 1000);
}

function updateRunnerUI() {
  const step = runnerState.steps[runnerState.currentStepIdx];
  const totalSteps = runnerState.steps.length;
  
  // 進捗テキスト
  document.getElementById('runner-progress-text').innerText = `ステップ ${runnerState.currentStepIdx + 1} / ${totalSteps}`;
  
  // 種目分類
  const typeBadge = document.getElementById('runner-step-type');
  typeBadge.innerText = step.type === 'warmup' ? '準備運動' : (step.type === 'rest' ? '休憩' : '本編');
  typeBadge.className = `runner-step-type ${step.type}`;

  // ヘッダータイトル
  document.getElementById('runner-workout-title').innerText = step.title;

  // 種目名
  document.getElementById('runner-exercise-name').innerText = step.name;

  // 残り時間表示 (秒数がない種目は reps 数を表示)
  const timerDisplay = document.getElementById('runner-timer-display');
  const qtyDisplay = document.getElementById('runner-qty-display');
  
  if (step.duration > 0) {
    const mins = Math.floor(runnerState.secondsLeft / 60);
    const secs = runnerState.secondsLeft % 60;
    timerDisplay.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timerDisplay.style.display = 'block';
    qtyDisplay.style.display = 'none';
  } else {
    // 回数系種目
    timerDisplay.style.display = 'none';
    let text = step.repsMin === step.repsMax ? `${step.repsMin}回` : `${step.repsMin}〜${exLimitText(step.repsMax)}回`;
    if (step.sideRequired) text = `左右各 ${text}`;
    qtyDisplay.innerText = text;
    qtyDisplay.style.display = 'block';
  }

  // メモ・アドバイス
  document.getElementById('runner-tip-text').innerText = step.memo || '';

  // 次のステッププレビュー
  const nextNameEl = document.getElementById('runner-next-name');
  if (runnerState.currentStepIdx + 1 < totalSteps) {
    const nextStep = runnerState.steps[runnerState.currentStepIdx + 1];
    const prefix = nextStep.type === 'rest' ? '【休憩】' : '';
    nextNameEl.innerText = `${prefix}${nextStep.name}`;
  } else {
    nextNameEl.innerText = '終了！お疲れ様でした';
  }

  // 再生/一時停止ボタンと「次へ」ボタンの表示切り替え
  const playPauseBtn = document.getElementById('runner-pause-btn');
  const skipBtn = document.getElementById('runner-skip-btn');
  
  if (step.duration === 0 && step.type !== 'rest') {
    // 回数系種目：一時停止は不要、「次へ」ボタンを強調
    playPauseBtn.style.display = 'none';
    skipBtn.innerText = '✓ 完了！次へ進む';
    skipBtn.style.flex = '1';
  } else {
    // 時間系・休憩：通常ボタン
    playPauseBtn.style.display = 'flex';
    skipBtn.innerText = '次へ進む';
    skipBtn.style.flex = '1.5';
    playPauseBtn.innerText = runnerState.isPaused ? '再開' : '一時停止';
  }
}

function exLimitText(maxVal) {
  return maxVal === 0 ? '' : maxVal;
}

function nextRunnerStep() {
  // 現在のインターバルをクリアしてから次へ進む
  if (runnerState.intervalId) {
    clearInterval(runnerState.intervalId);
    runnerState.intervalId = null;
  }

  SoundSynth.playStart();
  runnerState.currentStepIdx++;
  
  if (runnerState.currentStepIdx < runnerState.steps.length) {
    const nextStep = runnerState.steps[runnerState.currentStepIdx];
    runnerState.secondsLeft = nextStep.duration > 0 ? nextStep.duration : 0;
    runnerState.isPaused = false;
    updateRunnerUI();
    // 次のステップに合わせてタイマーを再起動（回数系なら起動しない）
    startRunnerTimer();
  } else {
    // 全ステップ完了
    finishWorkout();
  }
}

function finishWorkout() {
  clearInterval(runnerState.intervalId);
  document.getElementById('runner-view').classList.remove('active');
  SoundSynth.playComplete();

  // 実績の自動記録
  const menu = runnerState.menu;
  quickCompleteWorkout(menu);
  
  runnerState = null;
}

function pauseWorkout() {
  runnerState.isPaused = !runnerState.isPaused;
  updateRunnerUI();
}

function skipWorkoutStep() {
  // nextRunnerStep内でインターバルのクリアとタイマー再起動を行うため、ここでは呼ぶだけ
  nextRunnerStep();
}

function quitWorkout() {
  if (confirm('トレーニングを終了しますか？（現在の進捗は保存されません）')) {
    clearInterval(runnerState.intervalId);
    document.getElementById('runner-view').classList.remove('active');
    runnerState = null;
    showToast('トレーニングを中止しました');
  }
}

// ==========================================
// 8. データ書き出し（JSON）/ インポート / 初期化
// ==========================================

function exportBackupData() {
  const data = {
    records: state.records,
    settings: state.settings
  };
  const jsonStr = JSON.stringify(data, null, 2);
  
  // テキストエリアに挿入
  const textarea = document.getElementById('settings-backup-area');
  textarea.value = jsonStr;
  textarea.select();
  
  // クリップボードにコピー
  try {
    navigator.clipboard.writeText(jsonStr);
    showToast('バックアップJSONをクリップボードにコピーしました！');
  } catch(e) {
    showToast('JSON枠を選択しました。コピーしてください。');
  }
}

function importBackupData() {
  const jsonStr = document.getElementById('settings-backup-area').value.trim();
  if (!jsonStr) {
    alert('JSONを入力枠に貼り付けてください。');
    return;
  }
  
  if (confirm('現在のデータが上書きされます。インポートを実行しますか？')) {
    try {
      const data = JSON.parse(jsonStr);
      if (data.records && Array.isArray(data.records) && data.settings) {
        state.records = data.records;
        state.settings = { ...state.settings, ...data.settings };
        
        saveRecords();
        saveSettings();
        
        // セッションリセット
        resetSessionState(getTodayString());
        
        renderToday();
        renderHistory();
        renderSettings();
        showToast('データを正常に復元しました！');
      } else {
        alert('無効なバックアップデータ形式です。必要な項目がありません。');
      }
    } catch(e) {
      alert('JSONの解析に失敗しました。データが正しいか確認してください。');
    }
  }
}

function factoryResetApp() {
  if (confirm('【警告】すべてのデータ（トレーニング記録、日付設定）が完全に消去されます。本当によろしいですか？')) {
    localStorage.clear();
    
    // 状態初期化
    state.records = [];
    state.settings = {
      trainingStartDate: getTodayString(),
      currentWeekIndex: 1,
      defaultWeekendMenu: 'hiit',
      notificationPreset: '18:00',
      firstDayOfWeek: 1,
      includeWarmup: true,
      notificationEnabled: false,
      notificationTime: '18:00'
    };
    
    resetSessionState(getTodayString());
    
    saveRecords();
    saveSettings();
    
    renderToday();
    renderHistory();
    renderSettings();
    showToast('アプリデータを完全に初期化しました');
  }
}

// ==========================================
// 9. アプリケーション初期化
// ==========================================

function initApp() {
  // 1. 状態ロード
  loadState();

  // 2. 曜日・日付変更の案内テキストをセット (設定画面)
  const currentWeek = getCalculatedWeekIndex();
  document.getElementById('settings-week-idx-override').value = currentWeek;

  // 3. ナビゲーションタブのバインド
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // 4. 設定変更イベントバインド
  document.getElementById('settings-save-btn').addEventListener('click', saveAppSettingsFromUI);
  document.getElementById('settings-week-idx-override').addEventListener('change', overrideWeekIndex);
  document.getElementById('settings-export-btn').addEventListener('click', exportBackupData);
  document.getElementById('settings-import-btn').addEventListener('click', importBackupData);
  document.getElementById('settings-reset-btn').addEventListener('click', factoryResetApp);

  // 4b. 通知ボタンバインド
  const notifEnableBtn = document.getElementById('notification-enable-btn');
  const notifDisableBtn = document.getElementById('notification-disable-btn');
  if (notifEnableBtn) notifEnableBtn.addEventListener('click', enableNotifications);
  if (notifDisableBtn) notifDisableBtn.addEventListener('click', disableNotifications);

  // 5. 記録フォームイベントバインド
  document.getElementById('record-form').addEventListener('submit', saveRecordFromModal);
  document.getElementById('modal-close-btn').addEventListener('click', closeRecordModal);
  document.querySelectorAll('.status-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      setActiveStatusPill(pill.dataset.status);
    });
  });

  // 6. タイマーランナー操作ボタンバインド
  document.getElementById('runner-pause-btn').addEventListener('click', pauseWorkout);
  document.getElementById('runner-skip-btn').addEventListener('click', skipWorkoutStep);
  document.getElementById('runner-quit-btn').addEventListener('click', quitWorkout);

  // サウンド有効化切り替え
  const soundBtn = document.getElementById('runner-sound-toggle');
  soundBtn.addEventListener('click', () => {
    SoundSynth.enabled = !SoundSynth.enabled;
    const soundOnPath = document.getElementById('sound-on-svg');
    const soundOffPath = document.getElementById('sound-off-svg');
    
    if (SoundSynth.enabled) {
      soundOnPath.style.display = 'block';
      soundOffPath.style.display = 'none';
      showToast('音声案内をONにしました');
    } else {
      soundOnPath.style.display = 'none';
      soundOffPath.style.display = 'block';
      showToast('音声案内をOFFにしました');
    }
  });

  // 7. サービスワーカー登録
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('ServiceWorker registered:', reg.scope))
        .catch(err => console.warn('ServiceWorker registration failed:', err));
    });
  }

  // 8. 初期表示
  switchTab('today');

  // 9. 起動時の通知チェック（通知時刻を過ぎているときのみ表示）
  // 少し遅らせて実行（ソート完了待ち）
  setTimeout(checkAndShowTodayNotification, 1500);
}

// 起動開始
window.addEventListener('DOMContentLoaded', initApp);
