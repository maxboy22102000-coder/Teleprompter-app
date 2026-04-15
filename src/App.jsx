import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2, Circle, MessageSquare,
  Upload, Settings, CheckSquare,
  MousePointerClick, Info, X, Send, ShieldCheck,
  Share2, FolderOpen, ArrowLeft, Eye,
  FileImage, Plus, Minus, LogOut, Columns, Copy, Calendar, Mail, Lock, Square, LayoutTemplate, Link, Download, Ruler
} from 'lucide-react';

import localforage from 'localforage';
import { initFirebase, saveProjectsToDB, loadProjectsFromDB, subscribeToProjects, uploadFileToStorage } from './firebase';
import emailjs from '@emailjs/browser';

const { pdfjsLib } = globalThis;

// --- i18n Translations ---
const translations = {
  zh: {
    auth_title: "DesignSync 專業校稿系統",
    auth_subtitle: "請選擇您的身分進入系統，不同身分將擁有不同權限。",
    display_name: "顯示名稱：",
    name_placeholder: "例: 王經理",
    contact_email: "聯絡 Email：",
    role_designer: "我是設計師",
    role_designer_desc: "可上傳檔案、建立專案、管理 SOP 檢核表。",
    role_client: "我是客戶/決策者",
    role_client_desc: "審核圖面、框選或圖釘留言。",
    role_observer: "我是觀察者 (老闆)",
    role_observer_desc: "僅瀏覽權限，無法修改留言。",
    role_name_designer: "設計師",
    role_name_client: "客戶",
    role_name_observer: "觀察者",

    dashboard_title: "專案總覽 (Dashboard)",
    current_role: "目前身分:",
    my_projects: "我的專案",
    new_project: "新增專案",
    running_days: "已執行 {{days}} 天",
    stage_x_of_3: "階段 {{stage}}/3",
    version_x: "版本: V{{v}}",
    status_approved: "已核准",
    status_reviewing: "校稿中",
    status_waiting_designer: "等待 設計師",
    status_waiting_client: "等待 客戶審核",
    status_waiting_supervisor: "等待 主管審核",
    status_fully_approved: "🎉 專案已全部核准",
    upload_new_file: "新增圖面或PDF",

    version_v_uploader: "V{{v}} - {{uploader}}",
    version_uploader_unknown: "未知",
    compare_versions: "版本比較",
    diff_compare: "Diff 比對",
    computing_diff: "比對中...",
    exit_compare: "退出比對",
    update_design: "更新設計版",
    share_link: "分享連結",
    send_review_notice: "送出審核通知",
    approve_design: "完成校稿 (Approve)",
    processing: "處理中...",

    current_view: "V{{v}} ({{uploader}})",
    version_v: "V{{v}}",
    version_tag: "V{{v}}",

    tab_comments: "討論與留言",
    tab_sop: "SOP 檢核",

    marker_box: "框選",
    marker_pin: "圖釘",
    mark_resolved: "標示解決",
    mark_unresolved: "撤銷",
    adding_marker: "正在新增標註...",
    comment_placeholder_marker: "針對標註點發表建議...",
    comment_placeholder_general: "一般留言...",
    send: "送出",

    s1_action_discuss: "1. 有意見 (轉送簽客戶)",
    s1_action_advance: "2. 無意見 (送簽給客戶, 進入 Stage 2)",
    s2_action_discuss: "1. 有意見 (回送設計師討論)",
    s2_action_advance: "2. 無意見 (完稿確認, 進入 Stage 3)",
    s3_action_discuss: "1. 有意見 (返還客戶詢問)",
    s3_action_advance: "2. 無意見 (結案, 執行製作)",

    sop_stage1: "Stage 1: 確認規格、檔案預檢與版本控制",
    sop_s1_desc: "設計師上傳，確認規格、檔案預檢與版本控制。",
    sop_s1_basic: "規格：提供名稱/SKU、數量與材質結構",
    sop_s1_size: "尺寸：提供確切的公制尺寸(mm)",
    sop_s1_technique: "工法：確認特殊印刷效果的類型與區域",
    sop_s1_format: "格式： 檔案為 AI 或 EPS 格式",
    sop_s1_font: "字體： 文字皆已轉換為外框",
    sop_s1_resource: "資源：外部連結資源皆已正確附上",
    sop_s1_spell: "除錯掃描：已完成基本拼寫檢查",
    sop_s1_dieline: "刀模：新刀模已標明英吋與公分雙軌尺寸",
    sop_s1_structure: "結構防呆：客戶已提供新結構的參考",
    sop_stage2: "Stage 2:校對與審核準備",
    sop_s2_desc: "出圖給客戶前，以及整理雙方檔案時的確認。",
    sop_s2_single: "單一事實：確認客戶提供的「最終檔案」為唯一生產依據",
    sop_s2_cloud: "雲端同步：最終生產檔案已上傳至NAS",
    sop_s2_proof: "打樣確認：已將校對稿轉為PDF格式回傳給客戶",
    sop_s2_notice: "微調告知：已明確列出為符合印刷要求所做的任何微小調整",
    sop_stage3: "Stage 3:最終核准",
    sop_s3_desc: "送廠印製前的最後確認。",
    sop_s3_approved: " 客戶核准：已收到客戶明確回覆Approved",

    modal_update_design: "更新設計版本",
    modal_choose_file: "選擇新檔案 (支援 PDF/JPG/PNG)",
    modal_notify_review: "交辦審核",
    modal_notify_approve: "核准該階段",
    modal_notify_desc: "確認收件人 Email，將透過 Node 後端發信：",
    modal_confirm_send: "確認送出",
    modal_sending: "發信中...",
    modal_skip_email: "直接更新狀態 (不發信)",
    modal_share_title: "複製連結分享給客戶或老闆",
    modal_copy: "複製",
    modal_new_project: "建立專案",
    modal_project_name_placeholder: "專案名稱...",
    modal_create: "建立",

    toast_copied: "已複製 {{name}}！",
    toast_copy_failed: "複製失敗",
    toast_project_created: "✅ 專案建立成功！",

    toast_block_s1: "⚠️ 阻擋送出：Stage 1 規範未過！",
    toast_block_s2: "⚠️ 阻擋送出：Stage 2 規範未過！",
    toast_block_s3: "🛑 阻擋送出：Stage 3 規範未過！",
    toast_review_sent: "📧 Stage {{stage}} 審核通知已真實發送！",
    toast_review_simulated: "⚠️ 信件 API 未連線，僅為系統模擬送出！",
    toast_approve_sent: "✅ 核准成功！通知真實發送。",
    toast_approve_simulated: "✅ 核准成功！(系統模擬通知)",
    toast_pdf_failed: "⚠️ PDF 解析失敗，將使用預設底圖",
    toast_upload_success: "✅ 檔案上傳成功！",
    toast_version_covered: "✅ 新版本已覆蓋，準備進行審核！",
    toast_diff_found: "✅ 差異比對完成 (紅色區域為不同處)",
    toast_diff_same: "✅ 比對完成，兩版本完全相同",
    return_for_revision: "返還簽核 (退回至前置討論)",
    toast_returned: "⚠️ 檔案已返還簽核！狀態改為討論中。",
    toast_diff_failed: "❌ 比對失敗，圖片可能跨網域無法分析",
    toast_cannot_delete_last: "⚠️ 無法刪除最後一個版本",
    confirm_delete_version: "確定要刪除此版本嗎？刪除後無法復原！",
    toast_version_deleted: "✅ 版本已成功刪除！",
    toast_project_finalized: "🎉 專案已正式結案並鎖定！",

    confirm_finalize: "確定要結案嗎？結案後檔案將無法再更新或留言！",
    btn_finalize: "確認結案 (Final Approve)",
    status_closed: "💼 已結案",

    ruler_toggle: "測量工具",
    ruler_mm: "公釐 (mm)",
    ruler_in: "英吋 (in)",
    measure_precision: "精確度",
    measure_distance: "距離",
    measure_angle: "角度",
    measure_x: "X-軸",
    measure_y: "Y-軸",
    measure_scale: "比例設定",
    measure_calibrate: "校準比例",
    measure_unit_mm: "mm",
    measure_unit_in: "in",
    measure_placeholder: "點擊並拖拉進行測量",

    loading: "載入中..."
  },
  en: {
    auth_title: "DesignSync Proofreading System",
    auth_subtitle: "Please select your role. Different roles have different permissions.",
    display_name: "Display Name:",
    name_placeholder: "e.g. Manager Wang",
    contact_email: "Contact Email:",
    role_designer: "I am a Designer",
    role_designer_desc: "Upload files, create projects, manage SOP checklists.",
    role_client: "I am a Client/Decision Maker",
    role_client_desc: "Review designs, create bounding boxes or pin comments.",
    role_observer: "I am an Observer (Boss)",
    role_observer_desc: "View-only access, cannot modify comments.",
    role_name_designer: "Designer",
    role_name_client: "Client",
    role_name_observer: "Observer",

    dashboard_title: "Project Dashboard",
    current_role: "Current Role:",
    my_projects: "My Projects",
    new_project: "New Project",
    running_days: "Running for {{days}} days",
    stage_x_of_3: "Stage {{stage}}/3",
    version_x: "Version: V{{v}}",
    status_approved: "Approved",
    status_reviewing: "Reviewing",
    status_waiting_designer: "Pending Designer (Stage {{stage}})",
    status_waiting_client: "Pending Client (Stage {{stage}})",
    status_waiting_supervisor: "Pending Supervisor (Stage {{stage}})",
    status_fully_approved: "🎉 Fully Approved",
    upload_new_file: "Add Image/PDF",

    version_v_uploader: "V{{v}} - {{uploader}}",
    version_uploader_unknown: "Unknown",
    compare_versions: "Compare Versions",
    diff_compare: "Diff Compare",
    computing_diff: "Computing Diff...",
    exit_compare: "Exit Compare",
    update_design: "Update Design",
    share_link: "Share Link",
    send_review_notice: "Send Review Notice",
    approve_design: "Approve Design",
    processing: "Processing...",

    current_view: "V{{v}} ({{uploader}})",
    version_v: "V{{v}}",
    version_tag: "V{{v}}",

    tab_comments: "Discussion & Comments",
    tab_sop: "SOP Checklist",

    marker_box: "Box",
    marker_pin: "Pin",
    mark_resolved: "Mark Resolved",
    mark_unresolved: "Reopen",
    adding_marker: "Adding marker...",
    comment_placeholder_marker: "Add a comment for this marker...",
    comment_placeholder_general: "General comment...",
    send: "Send",

    s1_action_discuss: "1. Have comments (Send to Client)",
    s1_action_advance: "2. No comments (Send to Client, enter Stage 2)",
    s2_action_discuss: "1. Have comments (Return to Designer)",
    s2_action_advance: "2. No comments (Confirm Final, enter Stage 3)",
    s3_action_discuss: "1. Have comments (Return to Client)",
    s3_action_advance: "2. No comments (Finalize, send to print)",

    sop_stage1: "Stage 1: Specs & Pre-flight",
    sop_s1_desc: "Designer uploads, confirms specs, file pre-flight and version control.",
    sop_s1_basic: "Basic Specs: Product Name/SKU, Quantity, and Material provided.",
    sop_s1_size: "Exact Size: Exact metric size (cm) provided.",
    sop_s1_technique: "Technique: Specific printing effects and areas confirmed.",
    sop_s1_format: "Format: File is in AI or EPS format.",
    sop_s1_font: "Fonts: All text converted to Outlines.",
    sop_s1_resource: "Resources: External links embedded correctly.",
    sop_s1_spell: "Spell Check: Basic spelling checked.",
    sop_s1_dieline: "Dieline check: Dimensions marked in both inches and cm.",
    sop_s1_structure: "Structure check: Client provided references for new structures.",
    sop_stage2: "Stage 2: Proofing & Single Source Prep",
    sop_s2_desc: "Checks before sending proofs & compiling final files.",
    sop_s2_single: "Single source: Ensure client's 'Finalized File' is the only source truth.",
    sop_s2_cloud: "Cloud Sync: Production files uploaded to NAS/Drive.",
    sop_s2_proof: "Defensive Proofing: Proofs sent as PDF.",
    sop_s2_notice: "Twists Noticed: Minor printing adjustments clearly stated to client.",
    sop_stage3: "Stage 3: Final Approval",
    sop_s3_desc: "Final lock before printing.",
    sop_s3_approved: "Absolute Approval: 'Approved for Production' received via email.",

    modal_update_design: "Update Design Version",
    modal_choose_file: "Choose new file (PDF/JPG/PNG)",
    modal_notify_review: "Request Review",
    modal_notify_approve: "Approve Stage",
    modal_notify_desc: "Confirm recipient email for the Node backend notification:",
    modal_confirm_send: "Confirm & Send",
    modal_sending: "Sending...",
    modal_skip_email: "Direct Update (Skip Mail)",
    modal_share_title: "Copy link to share with client or boss",
    modal_copy: "Copy",
    modal_new_project: "Create Project",
    modal_project_name_placeholder: "Project Name...",
    modal_create: "Create",

    toast_copied: "Copied {{name}}!",
    toast_copy_failed: "Copy failed",
    toast_project_created: "✅ Project created successfully!",

    toast_block_s1: "⚠️ Blocked: Stage 1 checklist incomplete!",
    toast_block_s2: "⚠️ Blocked: Stage 2 checklist incomplete!",
    toast_block_s3: "🛑 Blocked: Stage 3 proofing checklist incomplete!",
    toast_review_sent: "📧 Stage {{stage}} review notice sent!",
    toast_review_simulated: "⚠️ Mail API disconnected, simulated send!",
    toast_approve_sent: "✅ Approved! Notice sent.",
    toast_approve_simulated: "✅ Approved! (Simulated notice)",
    toast_pdf_failed: "⚠️ PDF parsing failed, using default background",
    toast_upload_success: "✅ File uploaded successfully!",
    toast_version_covered: "✅ New version overwritten, ready for review!",
    toast_diff_found: "✅ Diff compare complete (Red areas differ)",
    toast_diff_same: "✅ Compare complete, both versions are identical",
    return_for_revision: "Return for Revision",
    toast_returned: "⚠️ File returned for revision!",
    toast_diff_failed: "❌ Compare failed, image cross-origin issue",
    toast_cannot_delete_last: "⚠️ Cannot delete the last version",
    confirm_delete_version: "Are you sure you want to delete this version? This action cannot be undone!",
    toast_version_deleted: "✅ Version successfully deleted!",
    toast_project_finalized: "🎉 Project officially finalized and locked!",

    confirm_finalize: "Are you sure you want to finalize? File updates and comments will be locked!",
    btn_finalize: "Finalize Project",
    status_closed: "💼 Closed",

    ruler_toggle: "Ruler Tool",
    ruler_mm: "mm",
    ruler_in: "in",
    measure_precision: "Precision",
    measure_distance: "Distance",
    measure_angle: "Angle",
    measure_x: "X-Axis",
    measure_y: "Y-Axis",
    measure_scale: "Scale Source",
    measure_calibrate: "Calibrate Scale",
    measure_unit_mm: "mm",
    measure_unit_in: "in",
    measure_placeholder: "Click and drag to measure",

    loading: "Loading..."
  }
};

// --- 模擬資料 (Mock Data) ---
const mockProjects = [];

export default function App() {
  const [appView, setAppView] = useState('auth');
  const [language, setLanguage] = useState('zh');
  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || key;
    Object.keys(params).forEach(k => {
      text = text.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), params[k]);
    });
    return text;
  };

  const [currentUser, setCurrentUser] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [usingFirebase, setUsingFirebase] = useState(false);

  const [projects, setProjects] = useState(mockProjects);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeFileId, setActiveFileId] = useState(null);
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);

  const [activeTab, setActiveTab] = useState('comments');

  // Marker & Drawing States
  const [drawingMode, setDrawingMode] = useState('pin');
  const [newMarker, setNewMarker] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const [dragCurrent, setDragCurrent] = useState(null);

  const [commentInput, setCommentInput] = useState('');

  // Modals Info
  const [showShareModal, setShowShareModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAllDataModal, setShowAllDataModal] = useState(false);

  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyRecipients, setNotifyRecipients] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const [userNameInput, setUserNameInput] = useState('');
  const [userEmailInput, setUserEmailInput] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Comparing feature
  const [isComparing, setIsComparing] = useState(false);
  const [compareLeft, setCompareLeft] = useState(0);
  const [compareRight, setCompareRight] = useState(0);
  const [diffDataUrl, setDiffDataUrl] = useState(null);
  const [isComputingDiff, setIsComputingDiff] = useState(false);

  // Ruler States
  const [showRuler, setShowRuler] = useState(false);
  const [rulerUnit, setRulerUnit] = useState('mm'); // 'mm' or 'in'
  const [rulerPos, setRulerPos] = useState({ x: 100, y: 100 });
  const [isDraggingRuler, setIsDraggingRuler] = useState(false);
  const [rulerOffset, setRulerOffset] = useState({ x: 0, y: 0 });

  // Measurement Tool Session States (Transient UI)
  const [activeMeasure, setActiveMeasure] = useState(null);
  const [measureScale, setMeasureScale] = useState(1); // mm per % unit (default 1:1)
  const [measurePrecision, setMeasurePrecision] = useState(1);
  const [showMeasureInfo, setShowMeasureInfo] = useState(false);
  const [measureUnit, setMeasureUnit] = useState('mm');

  const imageRef = useRef(null);
  const lastCloudDataRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeProject = projects.find(p => p.id === activeProjectId);
  const activeFile = activeProject?.files.find(f => f.id === activeFileId);
  const activeVersion = activeFile?.versions[activeVersionIndex];

  // ================= 跨裝置存儲 (Firebase / LocalForage) =================
  useEffect(() => {
    const isFirebaseActive = initFirebase();
    setUsingFirebase(isFirebaseActive);

    const loadData = async () => {
      let savedProjects = null;
      if (isFirebaseActive) {
        savedProjects = await loadProjectsFromDB();
        // Setup real-time listener if using Firebase
        subscribeToProjects((cloudData) => {
          if (cloudData) {
            lastCloudDataRef.current = JSON.stringify(cloudData);
            setProjects(cloudData);
          }
        });
      }

      if (!savedProjects) {
        // Fallback to local storage
        savedProjects = await localforage.getItem('designSyncProjects');
      }

      if (savedProjects && savedProjects.length > 0) {
        setProjects(savedProjects);
      }
      setIsDataLoaded(true);
    };

    loadData();
  }, []);

  // --- Handle Auto-save (Local or Cloud) ---
  useEffect(() => {
    if (!isDataLoaded) return;

    if (usingFirebase) {
      // Avoid infinite loop: only save if the current 'projects' is DIFFERENT from what we last got from cloud
      const currentDataStr = JSON.stringify(projects);
      if (currentDataStr !== lastCloudDataRef.current) {
        saveProjectsToDB(projects).catch(err => console.error(err));
        lastCloudDataRef.current = currentDataStr;
      }
    } else {
      // Local Storage only
      localforage.setItem('designSyncProjects', projects).catch(err => console.error(err));
    }
  }, [projects, isDataLoaded, usingFirebase]);

  // ================= 輔助功能 =================
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const copyToClipboard = (text, typeName) => {
    try {
      navigator.clipboard.writeText(text);
      showToast(t('toast_copied', { name: typeName }));
    } catch (err) {
      showToast(t('toast_copy_failed'));
    }
  };

  const getElapsedDays = (startDateStr) => {
    const diffTime = Math.abs(new Date() - new Date(startDateStr));
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  // ================= API & Email =================
  const sendEmailThroughAPI = async (to, subject, text) => {
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, text })
      });
      const data = await response.json();
      return data.success;
    } catch (err) {
      console.error('Mail API Error:', err);
      return false;
    }
  };

  // ================= 處理與點擊邏輯 =================
  const handleLogin = (role) => {
    if (!userEmailInput.trim() || !userEmailInput.includes('@')) {
      showToast(language === 'zh' ? '⚠️ 請填寫有效的 Email 地址進入系統' : '⚠️ Please enter a valid Email address');
      return;
    }

    const email = userEmailInput.trim().toLowerCase();
    const superAdmin = 'max.d@dazed8.com';

    // Email Whitelists
    const allowedDesigners = [superAdmin, 'designer@dazed8.com'];
    const allowedClients = [superAdmin, 'client@dazed8.com', 'starbucks@dazed8.com'];
    const allowedObservers = [superAdmin, 'boss@dazed8.com'];

    if (role === 'designer' && !allowedDesigners.includes(email)) {
      showToast(language === 'zh' ? '🚫 無權限：您的信箱不在設計師白名單中' : '🚫 No Permission: Email not in Designer whitelist');
      return;
    }
    if (role === 'client' && !allowedClients.includes(email)) {
      showToast(language === 'zh' ? '🚫 無權限：您的信箱不在客戶白名單中' : '🚫 No Permission: Email not in Client whitelist');
      return;
    }
    if (role === 'observer' && !allowedObservers.includes(email)) {
      showToast(language === 'zh' ? '🚫 無權限：僅限超級管理員或指定觀察者' : '🚫 No Permission: Super Admins or Observers only');
      return;
    }

    const defaultName = role === 'designer' ? t('role_name_designer') : role === 'client' ? t('role_name_client') : t('role_name_observer');
    const finalName = userNameInput.trim() !== '' ? userNameInput : defaultName;
    const finalEmail = userEmailInput.trim() !== '' ? userEmailInput : `${role}@designsync.com`;
    setCurrentUser({ role, name: finalName, email: finalEmail });

    // Deep Linking support
    const path = window.location.pathname;
    if (path.startsWith('/p/')) {
      const fileId = path.split('/p/')[1];
      let targetProj = null;
      projects.forEach(p => {
        if (p.files.some(f => f.id === fileId)) {
          targetProj = p;
        }
      });
      if (targetProj) {
        openFile(targetProj.id, fileId);
        return;
      }
    }
    setAppView('dashboard');
  };

  const handleCreateProjectSubmit = () => {
    if (!newProjectTitle.trim()) return;
    const newProj = {
      id: `PRJ-${Date.now()}`,
      title: newProjectTitle,
      client: currentUser.name,
      defaultClientEmail: `${currentUser.name}@client.com`,
      defaultDesignerEmail: currentUser.email,
      startDate: new Date().toISOString(),
      files: []
    };
    setProjects([newProj, ...projects]);
    setShowNewProjectModal(false);
    setNewProjectTitle('');
    showToast(t('toast_project_created'));
  };

  const toggleChecklist = (category, key) => {
    if (currentUser.role !== 'designer') return;
    setProjects(prev => prev.map(p => {
      if (p.id !== activeProjectId) return p;
      return {
        ...p,
        files: p.files.map(f => {
          if (f.id !== activeFileId) return f;
          if (category !== `stage${f.stage}`) return f;
          return {
            ...f,
            checklists: { ...f.checklists, [category]: { ...f.checklists[category], [key]: !f.checklists[category][key] } }
          };
        })
      };
    }));
  };

  const handleStageAction = (actionType) => {
    if (actionType === 's1_discuss') {
      setNotifyRecipients(activeProject?.defaultClientEmail || '');
      setPendingAction('s1_discuss');
      setShowNotifyModal(true);
    } else if (actionType === 's1_advance') {
      const currentStageObj = activeFile?.checklists?.[`stage1`];
      if (currentStageObj) {
        const allChecked = Object.values(currentStageObj).every(val => val === true);
        if (!allChecked) {
          showToast(t(`toast_block_s1`));
          return;
        }
      }
      setNotifyRecipients(activeProject?.defaultClientEmail || '');
      setPendingAction('s1_advance');
      setShowNotifyModal(true);
    } else if (actionType === 's2_advance') {
      const currentStageObj = activeFile?.checklists?.[`stage2`];
      if (currentStageObj && currentUser.role === 'designer') {
        const allChecked = Object.values(currentStageObj).every(val => val === true);
        if (!allChecked) {
          showToast(t(`toast_block_s2`));
          return;
        }
      }
      setNotifyRecipients(activeProject?.defaultDesignerEmail || '');
      setPendingAction('s2_advance');
      setShowNotifyModal(true);
    } else if (actionType === 's3_advance') {
      finalizeFile(activeProjectId, activeFileId);
    }
  };

  const handleReturnRevision = async () => {
    if (!window.confirm("確定要將此階段返還簽核退回嗎？")) return;

    // Send email notification to previous-stage recipient
    const baseUrl = window.location.origin;
    const projectLink = `${baseUrl}/p/${activeFile.id}`;
    const prevStageRecipient = currentUser.role === 'client'
      ? activeProject?.defaultDesignerEmail   // client returns → notify designer
      : activeProject?.defaultClientEmail;     // designer returns → notify client
    if (prevStageRecipient) {
      const subject = `[返還簽核] ${activeProject.title} - ${activeFile.name} (Stage ${activeFile.stage} → ${Math.max(1, activeFile.stage - 1)})`;
      const text = `${currentUser.name} 已將檔案返還簽核，請重新確認並送審。\n專案連結: ${projectLink}`;
      try {
        await emailjs.send('service_xn79iw9', 'template_xetd0oo', {
          from_name: currentUser.name,
          from_email: currentUser.email,
          to_email: prevStageRecipient,
          client_name: activeProject.client || 'Customer',
          project_link: projectLink,
          subject,
          message: text
        }, 'E0y1n-5yyxI0sQuls');
      } catch (err) {
        console.error('Return revision email failed:', err);
      }
    }

    setProjects(prev => prev.map(p => {
      if (p.id !== activeProjectId) return p;
      return {
        ...p,
        files: p.files.map(f => {
          if (f.id !== activeFileId) return f;
          return {
            ...f,
            stage: Math.max(1, f.stage - 1),
            versions: f.versions.map((v, i) => i !== f.versions.length - 1 ? v : { ...v, status: 'review' })
          };
        })
      };
    }));
    showToast(t('toast_returned'));
  };

  const confirmSendNotification = async (skipEmail = false) => {
    const shouldSkip = skipEmail === true;
    setShowNotifyModal(false);
    setIsSendingEmail(true);

    let apiSuccess = false;
    if (!shouldSkip) {
      const baseUrl = window.location.origin;
      const projectLink = `${baseUrl}/p/${activeFile.id}${pendingAction.includes('discuss') ? '?role=reviewer' : ''}`;

      let subject = '';
      let text = '';
      if (pendingAction === 's1_discuss') {
        subject = `[討論提問] ${activeProject.title} - ${activeFile.name} (Stage 1)`;
        text = `設計師已上傳檔案並提出討論點，請前往系統確認與回覆: ${projectLink}`;
      } else if (pendingAction === 's1_advance') {
        subject = `[審核請求] ${activeProject.title} - ${activeFile.name} (進入 Stage 2)`;
        text = `設計師已送簽確認無誤，檔案推進至 Stage 2，請前往系統進行校對與審核: ${projectLink}`;
      } else if (pendingAction === 's2_advance') {
        subject = `[完稿確認] ${activeProject.title} - ${activeFile.name} (進入 Stage 3)`;
        text = `客戶已完稿確認，檔案推進至 Stage 3 (最終核准)，請前往系統確認: ${projectLink}`;
      }

      try {
        const templateParams = {
          from_name: currentUser.name,
          from_email: currentUser.email,
          to_email: notifyRecipients,
          client_name: activeProject.client || "Customer",
          project_link: projectLink,
          subject: subject,
          message: text
        };
        const response = await emailjs.send('service_xn79iw9', 'template_xetd0oo', templateParams, 'E0y1n-5yyxI0sQuls');
        apiSuccess = true;
      } catch (err) {
        console.error('EmailJS Error:', err);
        apiSuccess = false;
      }
    } else {
      apiSuccess = true;
    }

    setTimeout(() => {
      setIsSendingEmail(false);
      if (pendingAction === 's1_discuss') {
        showToast(apiSuccess ? t('toast_review_sent', { stage: 1 }) : t('toast_review_simulated'));
      } else if (pendingAction === 's1_advance' || pendingAction === 's2_advance') {
        setProjects(prev => prev.map(p => {
          if (p.id !== activeProjectId) return p;
          return {
            ...p,
            files: p.files.map(f => {
              if (f.id !== activeFileId) return f;
              const newStage = pendingAction === 's1_advance' ? 2 : 3;
              const versions = [...f.versions];
              versions[versions.length - 1].status = 'approved';
              return { ...f, stage: newStage, versions };
            })
          };
        }));
        showToast(skipEmail ? t('toast_approve_simulated') : (apiSuccess ? t('toast_approve_sent') : t('toast_approve_simulated')));
      }
    }, 1000);
  };

  const handleDeleteVersion = (e, index) => {
    e.stopPropagation();
    if (activeFile.versions.length <= 1) {
      return showToast(t('toast_cannot_delete_last'));
    }

    if (!window.confirm(t('confirm_delete_version'))) return;

    setProjects(prev => prev.map(p => {
      if (p.id !== activeProjectId) return p;
      return {
        ...p,
        files: p.files.map(f => {
          if (f.id !== activeFileId) return f;
          const newVersions = f.versions.filter((_, i) => i !== index);
          // 重新編號，確保不會跳號
          const renumbered = newVersions.map((v, i) => ({ ...v, versionNumber: i + 1 }));
          return { ...f, versions: renumbered };
        })
      };
    }));

    // 調整目前檢視的版本
    if (activeVersionIndex === index) {
      setActiveVersionIndex(Math.max(0, activeFile.versions.length - 2));
    } else if (activeVersionIndex > index) {
      setActiveVersionIndex(activeVersionIndex - 1);
    }

    // 如果對比模式下有被刪除的，就重置對比模式
    if (isComparing && (compareLeft === index || compareRight === index)) {
      setIsComparing(false);
      setDiffDataUrl(null);
    }

    showToast(t('toast_version_deleted'));
  };

  // ================= PDF與真圖上傳處理 =================
  const handleRealFileUpload = async (e, projectId, isNewFile = false) => {
    const file = e.target.files[0];
    const inputEl = e.target;
    if (!file) return;

    if (!isNewFile) {
      setUploadingProgress(10);
      setShowUploadModal(true);
    }

    const isImage = file.type.startsWith('image/');
    const isPdf = file.name.toLowerCase().endsWith('.pdf');
    let finalImageUrl = 'https://images.unsplash.com/photo-1616628188550-808682f3926d?auto=format&fit=crop&w=1200&q=80';

    try {
      if (isPdf && pdfjsLib) {
        setUploadingProgress(40);
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        setUploadingProgress(60);
        await page.render({ canvasContext: context, viewport }).promise;
        const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.85));
        setUploadingProgress(80);
        if (usingFirebase) {
          const url = await uploadFileToStorage(blob, 'uploads/pdf_previews');
          if (url) finalImageUrl = url;
        } else {
          finalImageUrl = canvas.toDataURL('image/jpeg', 0.85);
        }
      } else if (isImage) {
        setUploadingProgress(70);
        if (usingFirebase) {
          const url = await uploadFileToStorage(file, 'uploads/images');
          if (url) finalImageUrl = url;
        } else {
          finalImageUrl = URL.createObjectURL(file);
        }
      }
    } catch (err) {
      console.error("PDF 處理失敗:", err);
      showToast(t('toast_pdf_failed'));
    }

    setUploadingProgress(90);
    const uploaderStr = `${currentUser.name} (${currentUser.role})`;

    setTimeout(() => {
      if (isNewFile) {
        const newFile = {
          id: `FILE-${Date.now()}`,
          name: file.name,
          stage: 1,
          checklists: {
            stage1: { basic: false, size: false, technique: false, format: false, font: false, resource: false, spell: false, dieline: false, structure: false },
            stage2: { single: false, cloud: false, permission: false, proof: false, notice: false },
            stage3: { approved: false, logisticsInv: false, logisticsConf: false }
          },
          versions: [{
            versionNumber: 1,
            date: new Date().toISOString().split('T')[0],
            status: 'review',
            uploader: uploaderStr,
            imageUrl: finalImageUrl,
            markers: []
          }]
        };
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, files: [...p.files, newFile] } : p));
        showToast(t('toast_upload_success'));
      } else {
        setProjects(prevData => prevData.map(p => {
          if (p.id !== activeProjectId) return p;
          return {
            ...p,
            files: p.files.map(f => {
              if (f.id !== activeFileId) return f;
              return {
                ...f,
                versions: [...f.versions, {
                  versionNumber: f.versions.length + 1,
                  date: new Date().toISOString().split('T')[0],
                  status: 'review',
                  uploader: uploaderStr,
                  imageUrl: finalImageUrl,
                  markers: []
                }]
              };
            })
          };
        }));
        setShowUploadModal(false);
        setActiveVersionIndex(activeFile.versions.length);
        showToast(t('toast_version_covered'));
      }
      setUploadingProgress(0);
      inputEl.value = null;
    }, 500);
  };

  const openFile = (projectId, fileId) => {
    setActiveProjectId(projectId);
    setActiveFileId(fileId);
    const file = projects.find(p => p.id === projectId).files.find(f => f.id === fileId);
    setActiveVersionIndex(file.versions.length - 1);
    setCompareLeft(file.versions.length > 1 ? file.versions.length - 2 : 0);
    setCompareRight(file.versions.length - 1);
    setIsComparing(false);
    setAppView('editor');
    setNewMarker(null);
    setShowRuler(false); // Reset ruler when opening new file
  };

  const finalizeProject = (projectId) => {
    if (!window.confirm(t('confirm_finalize'))) return;
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'closed' } : p));
    showToast(t('toast_project_finalized'));
  };

  const finalizeFile = (projectId, fileId) => {
    if (!window.confirm('確定要結案此圖檔嗎？結案後無法再更新或留言！')) return;
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        files: p.files.map(f => f.id === fileId ? { ...f, status: 'closed' } : f)
      }
    }));
    showToast('該檔案已成功結案！');
  };

  // ================= 滑鼠標註邏輯 (點擊與框選) =================
  const handlePointerDown = (e) => {
    if (!imageRef.current || currentUser.role === 'observer' || isComparing) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (drawingMode === 'pin') {
      setNewMarker({ type: 'pin', x, y });
      setCommentInput('');
      setActiveTab('comments');
    } else if (drawingMode === 'measure') {
      imageRef.current.setPointerCapture(e.pointerId);
      setActiveMeasure({ x1: x, y1: y, x2: x, y2: y });
      setShowMeasureInfo(true);
    } else {
      imageRef.current.setPointerCapture(e.pointerId); // Ensuring pointer events are captured specifically here
      setDragStart({ x, y });
      setDragCurrent({ x, y });
    }
  };

  const handlePointerMove = (e) => {
    if (dragStart && drawingMode === 'box') {
      const rect = imageRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setDragCurrent({ x, y });
    } else if (activeMeasure && drawingMode === 'measure') {
      const rect = imageRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setActiveMeasure(prev => ({ ...prev, x2: x, y2: y }));
    }
  };

  const handlePointerUp = () => {
    if (dragStart && drawingMode === 'box') {
      const x1 = Math.min(dragStart.x, dragCurrent.x);
      const y1 = Math.min(dragStart.y, dragCurrent.y);
      const w = Math.abs(dragStart.x - dragCurrent.x);
      const h = Math.abs(dragStart.y - dragCurrent.y);

      if (w > 1 && h > 1) {
        setNewMarker({ type: 'box', x: x1, y: y1, width: w, height: h });
        setCommentInput('');
        setActiveTab('comments');
      }
      setDragStart(null);
      setDragCurrent(null);
    } else if (activeMeasure && drawingMode === 'measure') {
      const newM = { ...activeMeasure, id: Date.now(), type: 'measure', timestamp: new Date().toLocaleTimeString() };
      setProjects(prev => prev.map(p => {
        if (p.id !== activeProjectId) return p;
        return {
          ...p,
          files: p.files.map(f => {
            if (f.id !== activeFileId) return f;
            return {
              ...f,
              versions: f.versions.map((v, i) => i !== activeVersionIndex ? v : { ...v, markers: [...(v.markers || []), newM] })
            };
          })
        };
      }));
      setActiveMeasure(null);
    }
  };

  const submitComment = () => {
    if (!commentInput.trim() && !newMarker) return;
    const commentData = {
      id: Date.now(),
      author: `${currentUser.name} (${currentUser.role === 'designer' ? t('role_name_designer') : currentUser.role === 'client' ? t('role_name_client') : t('role_name_observer')})`,
      text: commentInput,
      resolved: false,
      isoTimestamp: new Date().toISOString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...(newMarker || {})
    };

    setProjects(prev => prev.map(p => {
      if (p.id !== activeProjectId) return p;
      return {
        ...p,
        files: p.files.map(f => {
          if (f.id !== activeFileId) return f;
          return {
            ...f,
            versions: f.versions.map((v, i) => i !== activeVersionIndex ? v : { ...v, markers: [...(v.markers || []), commentData] })
          };
        })
      };
    }));
    setNewMarker(null);
    setCommentInput('');
  };

  const toggleResolve = (markerId) => {
    if (currentUser.role === 'observer' || activeProject?.status === 'closed') return;
    setProjects(prev => prev.map(p => {
      if (p.id !== activeProjectId) return p;
      return {
        ...p, files: p.files.map(f => {
          if (f.id !== activeFileId) return f;
          return {
            ...f, versions: f.versions.map((v, i) => i !== activeVersionIndex ? v : {
              ...v, markers: (v.markers || []).map(m => m.id === markerId ? { ...m, resolved: !m.resolved } : m)
            })
          };
        })
      };
    }));
  };

  // ================= 差異比對 (Visual Diff) =================
  const computeVisualDiff = async () => {
    const leftUrl = activeFile?.versions[compareLeft]?.imageUrl;
    const rightUrl = activeFile?.versions[compareRight]?.imageUrl;
    if (!leftUrl || !rightUrl) return;

    setIsComputingDiff(true);
    setDiffDataUrl(null);

    const loadImage = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });

    try {
      const [imgA, imgB] = await Promise.all([loadImage(leftUrl), loadImage(rightUrl)]);
      const maxWidth = Math.max(imgA.naturalWidth, imgB.naturalWidth);
      const maxHeight = Math.max(imgA.naturalHeight, imgB.naturalHeight);

      const canvas = document.createElement("canvas");
      canvas.width = maxWidth;
      canvas.height = maxHeight;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(imgA, 0, 0, maxWidth, maxHeight);
      const dataA = ctx.getImageData(0, 0, maxWidth, maxHeight);

      ctx.clearRect(0, 0, maxWidth, maxHeight);
      ctx.drawImage(imgB, 0, 0, maxWidth, maxHeight);
      const dataB = ctx.getImageData(0, 0, maxWidth, maxHeight);

      const outputImageData = ctx.createImageData(maxWidth, maxHeight);
      const dataOut = outputImageData.data;

      let changedCount = 0;
      for (let i = 0; i < dataA.data.length; i += 4) {
        const diff = (Math.abs(dataA.data[i] - dataB.data[i]) + Math.abs(dataA.data[i + 1] - dataB.data[i + 1]) + Math.abs(dataA.data[i + 2] - dataB.data[i + 2])) / 3;
        if (diff > 12) {
          changedCount++;
          dataOut[i] = 255;
          dataOut[i + 1] = 50;
          dataOut[i + 2] = 0;
          dataOut[i + 3] = 200;
        } else {
          dataOut[i] = dataOut[i + 1] = dataOut[i + 2] = dataOut[i + 3] = 0;
        }
      }

      ctx.putImageData(outputImageData, 0, 0);
      setDiffDataUrl(canvas.toDataURL("image/png"));
      showToast(changedCount > 0 ? t('toast_diff_found') : t('toast_diff_same'));
    } catch (error) {
      console.error('Diff failed:', error);
      showToast(t('toast_diff_failed'));
    } finally {
      setIsComputingDiff(false);
    }
  };

  const CheckboxItem = ({ checked, onChange, label, description, isDisabled, isCurrentStage }) => (
    <label className={`flex items-start gap-3 ${!isDisabled && currentUser?.role === 'designer' ? 'cursor-pointer group' : ''} ${isDisabled ? 'opacity-40 select-none' : ''}`}>
      <input type="checkbox" disabled={isDisabled || currentUser?.role !== 'designer'} checked={checked} onChange={onChange} className={`mt-1 w-4 h-4 rounded border-slate-300 focus:ring-blue-500 disabled:opacity-50 ${isCurrentStage ? 'text-blue-600' : 'text-slate-400'}`} />
      <div className="flex flex-col">
        <span className={`text-sm font-medium ${isCurrentStage ? 'text-slate-800' : 'text-slate-600'} ${!isDisabled && currentUser?.role === 'designer' ? 'group-hover:text-blue-700' : ''}`}>{label}</span>
        {description && <span className="text-xs text-slate-500 mt-0.5">{description}</span>}
      </div>
    </label>
  );

  if (!isDataLoaded) return <div className="h-screen flex items-center justify-center bg-slate-50 font-bold text-slate-500">{t('loading')}</div>;

  return (
    <div className="designsync-app-root w-full min-h-screen bg-slate-50 font-sans text-slate-800 relative">


      {appView === 'auth' && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 relative">
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button
                onClick={() => setLanguage('zh')}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${language === 'zh' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
              >
                繁中
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${language === 'en' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
              >
                EN
              </button>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">{t('auth_title')}</h1>
              <p className="text-blue-100 mb-6 font-medium tracking-wide">{t('auth_subtitle')}</p>

              <div className="max-w-md mx-auto text-left flex gap-4 relative z-10">
                <div className="flex-1">
                  <label className="block text-white text-sm font-medium mb-1">{t('display_name')}</label>
                  <input type="text" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} placeholder={t('name_placeholder')} className="w-full px-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
                <div className="flex-1">
                  <label className="block text-white text-sm font-medium mb-1">{t('contact_email')}</label>
                  <input type="email" value={userEmailInput} onChange={(e) => setUserEmailInput(e.target.value)} placeholder="name@company.com" className="w-full px-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <button onClick={() => handleLogin('designer')} className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 hover:bg-blue-50/50 transition-all duration-300 group">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner"><Settings size={36} strokeWidth={1.5} /></div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{t('role_designer')}</h3>
                <p className="text-sm text-slate-500 text-center leading-relaxed">{t('role_designer_desc')}</p>
              </button>
              <button onClick={() => handleLogin('client')} className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-xl hover:-translate-y-2 hover:bg-emerald-50/50 transition-all duration-300 group">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner"><MessageSquare size={36} strokeWidth={1.5} /></div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{t('role_client')}</h3>
                <p className="text-sm text-slate-500 text-center leading-relaxed">{t('role_client_desc')}</p>
              </button>
              <button onClick={() => handleLogin('observer')} className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-purple-500 hover:shadow-xl hover:-translate-y-2 hover:bg-purple-50/50 transition-all duration-300 group">
                <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner"><Eye size={36} strokeWidth={1.5} /></div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{t('role_observer')}</h3>
                <p className="text-sm text-slate-500 text-center leading-relaxed">{t('role_observer_desc')}</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {appView === 'dashboard' && (
        <div className="min-h-screen flex flex-col pt-10">
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 h-16 flex items-center justify-between px-8 sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-inner flex items-center justify-center text-white font-extrabold tracking-widest text-sm">HY</div>
              <h1 className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">{t('dashboard_title')}</h1>
            </div>
            <div className="flex items-center gap-4 text-sm mr-20">
              <span className="text-slate-500 font-medium">{t('current_role')}</span>
              <span className={`px-3 py-1 rounded-lg font-bold shadow-sm ${currentUser?.role === 'designer' ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200' : currentUser?.role === 'client' ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border border-purple-200'}`}>{currentUser?.name}</span>
              <button onClick={() => setLanguage(l => l === 'zh' ? 'en' : 'zh')} className="bg-white px-3 py-1 rounded-lg text-xs font-bold outline-none border hover:bg-slate-50 shadow-sm transition-all">{language === 'zh' ? 'EN' : '中文'}</button>
              <button onClick={() => setAppView('auth')} className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-50"><LogOut size={20} /></button>
            </div>
          </header>

          <main className="flex-1 p-8 max-w-7xl mx-auto w-full relative z-10">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('my_projects')}</h2>
              {currentUser?.role === 'designer' && (
                <button onClick={() => setShowNewProjectModal(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"><Plus size={18} strokeWidth={2.5} /> {t('new_project')}</button>
              )}
            </div>

            <div className="space-y-8">
              {projects.map(proj => (
                <div key={proj.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{proj.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{proj.client} · {t('project_id')}: {proj.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {currentUser?.role === 'observer' && (
                        <button onClick={() => {
                          if (window.confirm('Boss: 確定要刪除整個專案嗎？此動作不可逆！')) {
                            setProjects(prev => prev.filter(p => p.id !== proj.id));
                            showToast('✅ 專案已徹底刪除');
                          }
                        }} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-100 text-sm font-bold flex gap-1 items-center">
                          <X size={16} /> 刪除專案
                        </button>
                      )}
                      {currentUser?.role === 'designer' && (
                        <button onClick={() => {
                          if (window.confirm('這會清理該專案所有檔案的舊版本（僅保留最後一版）以釋放空間，確定執行？')) {
                            setProjects(prev => prev.map(p => {
                              if (p.id !== proj.id) return p;
                              return {
                                ...p,
                                files: p.files.map(f => ({
                                  ...f,
                                  versions: f.versions.slice(-1) // keep only the last one
                                }))
                              };
                            }));
                            showToast('🧹 已自動清理舊版本！');
                          }
                        }} className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-sm font-bold">
                          清理空間
                        </button>
                      )}
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border text-sm font-medium text-slate-600 shadow-sm">
                        <Calendar size={16} className="text-blue-500" /> {t('running_days', { days: getElapsedDays(proj.startDate) })}
                      </div>
                      {currentUser?.role === 'client' && proj.status !== 'closed' && (
                        <button onClick={(e) => { e.stopPropagation(); finalizeProject(proj.id); }} className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-md hover:bg-emerald-700 transition-colors flex items-center gap-2">
                          <CheckCircle2 size={16} /> {t('btn_finalize')}
                        </button>
                      )}
                      {proj.status === 'closed' && (
                        <div className="bg-slate-200 text-slate-600 px-4 py-1.5 rounded-lg font-extrabold text-sm border border-slate-300">
                          {t('status_closed')}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {proj.files.map(file => (
                        <div key={file.id} onClick={() => openFile(proj.id, file.id)} className="border border-slate-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-slate-800 font-medium min-w-0 w-full mb-3">
                              <FileImage size={20} className="text-blue-500 shrink-0" /> <span className="truncate flex-1">{file.name}</span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-md border text-xs font-medium">
                              <div className="flex justify-between mb-1.5"><span className="text-slate-600">{t('stage_x_of_3', { stage: file.stage })}</span></div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full"><div className={`h-full duration-500 ${file.stage === 1 ? 'w-1/3 bg-blue-400' : file.stage === 2 ? 'w-2/3 bg-blue-500' : 'w-full bg-emerald-500'}`}></div></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-end mt-4">
                            <div className="text-xs text-slate-500"><span className="font-bold text-slate-700 text-sm"> {t('version_x', { v: file.versions[file.versions.length - 1]?.versionNumber || 1 })}</span></div>
                            <span className={`text-[10px] px-2 py-1 rounded-full ${file.versions[file.versions.length - 1]?.status === 'approved'
                              ? file.stage === 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                              : file.stage === 3 ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                              {(() => {
                                const lastStatus = file.versions[file.versions.length - 1]?.status;
                                if (lastStatus === 'closed' || file.status === 'closed') {
                                  return t('status_closed');
                                }
                                if (file.stage === 1) {
                                  return t('status_waiting_designer', { stage: 1 });
                                } else if (file.stage === 2) {
                                  return t('status_waiting_client', { stage: 2 });
                                } else if (file.stage === 3) {
                                  return t('status_waiting_designer', { stage: 3 });
                                }
                                return t('status_reviewing');
                              })()}
                            </span>
                          </div>
                        </div>
                      ))}

                      {currentUser?.role !== 'observer' && (
                        <div>
                          <input type="file" id={`upload-new-${proj.id}`} className="hidden" accept="image/*,.pdf,.ai,.eps,.jpg,.png" onChange={(e) => handleRealFileUpload(e, proj.id, true)} />
                          <label htmlFor={`upload-new-${proj.id}`} className="border border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer min-h-[140px]">
                            <Plus size={24} className="mb-2" />
                            <span className="text-sm font-medium">{t('upload_new_file')}</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {appView === 'editor' && (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
          <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b z-20 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setAppView('dashboard')} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"><ArrowLeft size={20} /></button>
              <div>
                <h1 className="font-bold text-sm">{activeFile?.name}</h1>
                <p className="text-xs text-slate-500">{activeProject?.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-100 rounded-lg p-1 flex">
                {!isComparing ? (
                  <div className="flex items-center gap-1">
                    {activeFile?.versions.map((v, idx) => (
                      <button key={v.versionNumber} onClick={() => { setActiveVersionIndex(idx); setNewMarker(null); }} className={`px-4 py-1.5 text-xs font-bold rounded-md flex items-center group ${activeVersionIndex === idx ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>
                        {t('version_tag', { v: v.versionNumber })}
                        <span className="ml-1 text-[9px] font-normal text-slate-400 truncate max-w-[150px] hidden sm:inline-block">{v.uploader || t('version_uploader_unknown')}</span>
                        {activeFile?.versions.length > 1 && (
                          <div onClick={(e) => handleDeleteVersion(e, idx)} className="ml-1.5 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 rounded-full hover:bg-red-50 p-0.5 transition-all" title="Delete Version">
                            <X size={12} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                    {activeFile?.versions?.length > 1 && (
                      <button onClick={() => setIsComparing(true)} className="ml-2 px-3 py-1.5 text-xs font-bold text-slate-600 bg-white shadow-sm rounded-md flex items-center gap-1 border border-slate-200">
                        <Columns size={12} /> {t('compare_versions')}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-2 text-sm font-medium">
                    <select value={compareLeft} onChange={e => setCompareLeft(Number(e.target.value))} className="bg-white border text-xs rounded px-2 py-1 outline-none">
                      {activeFile?.versions.map((v, i) => <option key={i} value={i}>{t('version_tag', { v: v.versionNumber })}</option>)}
                    </select>
                    <span className="text-slate-400">vs</span>
                    <select value={compareRight} onChange={e => setCompareRight(Number(e.target.value))} className="bg-white border text-xs rounded px-2 py-1 outline-none">
                      {activeFile?.versions.map((v, i) => <option key={i} value={i}>{t('version_tag', { v: v.versionNumber })}</option>)}
                    </select>
                    <button onClick={computeVisualDiff} disabled={isComputingDiff} className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold shadow disabled:opacity-50">
                      {isComputingDiff ? t('computing_diff') : t('diff_compare')}
                    </button>
                    <button onClick={() => { setIsComparing(false); setDiffDataUrl(null); }} className="px-3 py-1 bg-slate-200 text-slate-700 rounded text-xs">{t('exit_compare')}</button>
                  </div>
                )}
              </div>

              {currentUser?.role !== 'observer' && !isComparing && (
                <button onClick={() => setShowUploadModal(true)} className="ml-4 px-3 py-1.5 flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 shadow-sm rounded-md text-xs font-bold hover:bg-slate-50 transition-colors">
                  <Upload size={14} /> {t('update_design')}
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setShowShareModal(true)} className="border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-2"><Share2 size={14} /> {t('share_link')}</button>
              {currentUser?.role === 'client' && activeProject?.status !== 'closed' && !activeFileId && (
                <button onClick={() => finalizeProject(activeProjectId)} className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-emerald-700 transition-colors">
                  <CheckCircle2 size={14} /> {t('btn_finalize')}
                </button>
              )}
              {activeProject?.status === 'closed' && (
                <div className="bg-slate-200 text-slate-600 px-4 py-1.5 rounded-lg text-xs font-extrabold border border-slate-300">
                  {t('status_closed')}
                </div>
              )}
              {currentUser?.role !== 'observer' && activeProject?.status !== 'closed' && activeFile && (
                <>
                  {activeFile.stage === 1 && currentUser.role === 'designer' && (
                    <>
                      <button onClick={() => handleStageAction('s1_discuss')} disabled={isSendingEmail} className="bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-rose-100 transition-all">
                        {isSendingEmail && pendingAction === 's1_discuss' ? t('processing') : t('s1_action_discuss')}
                      </button>
                      <button onClick={() => handleStageAction('s1_advance')} disabled={isSendingEmail} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-blue-700 transition-all">
                        {isSendingEmail && pendingAction === 's1_advance' ? t('processing') : t('s1_action_advance')}
                      </button>
                    </>
                  )}
                  {activeFile.stage === 2 && currentUser.role === 'client' && (
                    <>
                      <button onClick={() => handleReturnRevision()} disabled={isSendingEmail} className="bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-rose-100 transition-all">
                        {t('s2_action_discuss')}
                      </button>
                      <button onClick={() => handleStageAction('s2_advance')} disabled={isSendingEmail} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-blue-700 transition-all">
                        {isSendingEmail && pendingAction === 's2_advance' ? t('processing') : t('s2_action_advance')}
                      </button>
                    </>
                  )}
                  {activeFile.stage === 3 && currentUser.role === 'designer' && (
                    <>
                      <button onClick={() => handleReturnRevision()} disabled={isSendingEmail} className="bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-rose-100 transition-all">
                        {t('s3_action_discuss')}
                      </button>
                      <button onClick={() => handleStageAction('s3_advance')} disabled={isSendingEmail} className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-emerald-700 transition-all">
                        <CheckCircle2 size={14} /> {t('s3_action_advance')}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden mt-16 relative">

            {/* 繪圖工具箱 (僅編輯模式顯示) */}
            {!isComparing && currentUser.role !== 'observer' && drawingMode !== 'measure' && (
              <div className="absolute top-6 left-6 z-30 bg-white rounded-lg shadow-xl border border-slate-200 p-2 flex flex-col gap-2">
                <button onClick={() => setDrawingMode('pin')} className={`p-2 rounded-md ${drawingMode === 'pin' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`} title="圖釘標註">
                  <MousePointerClick size={20} />
                </button>
                <button onClick={() => setDrawingMode('box')} className={`p-2 rounded-md ${drawingMode === 'box' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`} title="框選標註">
                  <Square size={20} />
                </button>
                <button onClick={() => setDrawingMode('measure')} className={`p-2 rounded-md ${drawingMode === 'measure' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`} title="測量距離">
                  <Ruler size={20} />
                </button>

                <div className="w-full h-px bg-slate-200 my-1"></div>

                <div className="flex flex-col items-center gap-1">
                  <button onClick={() => setZoomLevel(Math.min(5, zoomLevel + 0.25))} className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-blue-600" title="放大"><Plus size={16} /></button>
                  <span className="text-[9px] font-black text-slate-600 tracking-tighter">{Math.round(zoomLevel * 100)}%</span>
                  <button onClick={() => setZoomLevel(Math.max(0.25, zoomLevel - 0.25))} className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-blue-600" title="縮小"><Minus size={16} /></button>
                  {zoomLevel !== 1 && <button onClick={() => setZoomLevel(1)} className="mt-1 text-[8px] font-black text-blue-600 hover:text-blue-800">RESET</button>}
                </div>
              </div>
            )}

            {/* Measurement Info Panel */}
            {showMeasureInfo && (
              <div className="absolute top-6 left-24 z-[60] bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-64 backdrop-blur-md bg-white/90">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h4 className="text-xs font-black text-slate-800 flex items-center gap-2"><Ruler size={14} className="text-blue-600" /> DISTANCE MEASUREMENT</h4>
                  <button onClick={() => { setShowMeasureInfo(false); setDrawingMode('pin'); setActiveMeasure(null); }} className="text-slate-400 hover:text-red-500" title="取消測量"><X size={14} /></button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-slate-100 p-2 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Scale</span>
                    <div className="flex items-center gap-1">
                      <input type="number" value={measureScale} onChange={(e) => setMeasureScale(Number(e.target.value))} className="w-16 bg-white border rounded px-1 text-xs font-bold text-right" />
                      <span className="text-[10px] font-bold text-slate-400">mm / %</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <div className="text-[9px] text-slate-400 font-bold mb-1 uppercase">Distance</div>
                      <div className="text-sm font-black text-blue-600">
                        {activeMeasure ? (Math.sqrt(Math.pow(activeMeasure.x2 - activeMeasure.x1, 2) + Math.pow(activeMeasure.y2 - activeMeasure.y1, 2)) * measureScale).toFixed(measurePrecision) : '0.0'}
                        <span className="text-[10px] ml-1 text-slate-400 uppercase">{measureUnit}</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <div className="text-[9px] text-slate-400 font-bold mb-1 uppercase">Angle</div>
                      <div className="text-sm font-black text-emerald-600">
                        {activeMeasure ? (Math.atan2(activeMeasure.y2 - activeMeasure.y1, activeMeasure.x2 - activeMeasure.x1) * (180 / Math.PI)).toFixed(1) : '0.0'}
                        <span className="text-[10px] ml-1 text-slate-400 font-normal">°</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-50/50 p-2 rounded-lg">
                      <div className="text-[9px] text-slate-400 font-bold mb-1 uppercase">X-Axis</div>
                      <div className="text-xs font-bold text-slate-700">
                        {activeMeasure ? (Math.abs(activeMeasure.x2 - activeMeasure.x1) * measureScale).toFixed(1) : '0.0'} {measureUnit}
                      </div>
                    </div>
                    <div className="bg-slate-50/50 p-2 rounded-lg">
                      <div className="text-[9px] text-slate-400 font-bold mb-1 uppercase">Y-Axis</div>
                      <div className="text-xs font-bold text-slate-700">
                        {activeMeasure ? (Math.abs(activeMeasure.y2 - activeMeasure.y1) * measureScale).toFixed(1) : '0.0'} {measureUnit}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => {
                      setProjects(prev => prev.map(p => {
                        if (p.id !== activeProjectId) return p;
                        return {
                          ...p,
                          files: p.files.map(f => {
                            if (f.id !== activeFileId) return f;
                            return {
                              ...f,
                              versions: f.versions.map((v, i) => i !== activeVersionIndex ? v : { ...v, markers: (v.markers || []).filter(m => m.type !== 'measure') })
                            };
                          })
                        };
                      }));
                    }} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-600 py-1.5 rounded-lg text-xs font-bold transition-colors">CLEAR</button>
                    <button onClick={() => setMeasurePrecision(p => p === 1 ? 2 : 1)} className="flex-1 bg-blue-50 text-blue-600 py-1.5 rounded-lg text-xs font-bold border border-blue-100 transition-colors">Precision: {measurePrecision === 1 ? '0.1' : '0.01'}</button>
                  </div>
                </div>
              </div>
            )}

            <div className={`flex-1 bg-slate-200 p-8 overflow-auto flex justify-center items-start relative ${isComparing ? 'gap-4 flex-row' : ''}`}>

              {/* Virtual Ruler */}
              {showRuler && (
                <div
                  className="absolute z-[100] cursor-move select-none"
                  style={{ left: rulerPos.x, top: rulerPos.y }}
                  onMouseDown={(e) => {
                    setIsDraggingRuler(true);
                    setRulerOffset({ x: e.clientX - rulerPos.x, y: e.clientY - rulerPos.y });
                  }}
                  onMouseMove={(e) => {
                    if (isDraggingRuler) {
                      setRulerPos({ x: e.clientX - rulerOffset.x, y: e.clientY - rulerOffset.y });
                    }
                  }}
                  onMouseUp={() => setIsDraggingRuler(false)}
                  onMouseLeave={() => setIsDraggingRuler(false)}
                >
                  <div className="bg-yellow-100/90 backdrop-blur-sm border-2 border-yellow-400 shadow-2xl rounded-sm p-1 min-w-[300px] h-12 relative overflow-hidden">
                    <div className="flex justify-between items-center absolute top-1 left-2 right-2 px-1">
                      <span className="text-[10px] font-black text-yellow-800 tracking-tighter">RULER PRO 2024</span>
                      <div className="flex gap-1">
                        <button onClick={(e) => { e.stopPropagation(); setRulerUnit('mm'); }} className={`text-[8px] px-1 rounded ${rulerUnit === 'mm' ? 'bg-yellow-600 text-white' : 'text-yellow-700'}`}>MM</button>
                        <button onClick={(e) => { e.stopPropagation(); setRulerUnit('in'); }} className={`text-[8px] px-1 rounded ${rulerUnit === 'in' ? 'bg-yellow-600 text-white' : 'text-yellow-700'}`}>IN</button>
                        <button onClick={(e) => { e.stopPropagation(); setShowRuler(false); }} className="text-yellow-800 hover:text-red-600"><X size={10} /></button>
                      </div>
                    </div>
                    {/* Markings */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 flex items-end pointer-events-none border-t border-yellow-300">
                      {[...Array(rulerUnit === 'mm' ? 31 : 13)].map((_, i) => (
                        <div key={i} className="flex-1 border-l border-yellow-600/40 relative h-full">
                          <div className={`absolute bottom-0 -left-[0.5px] border-l-2 border-yellow-800 ${i % (rulerUnit === 'mm' ? 10 : 4) === 0 ? 'h-full' : 'h-1/2'}`}></div>
                          <span className="absolute top-0.5 left-1 text-[8px] font-bold text-yellow-900">{i % (rulerUnit === 'mm' ? 10 : 1) === 0 ? i : ''}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 設計原圖區域 */}
              <div
                className={`w-full bg-white shadow-2xl relative border border-slate-300 touch-none select-none transition-all duration-300 ${isComparing ? 'flex-1 basis-1/2 max-w-[calc(50%-0.5rem)]' : ''} ${drawingMode === 'box' && !isComparing ? 'cursor-crosshair' : 'cursor-pointer'}`}
                style={isComparing ? {} : { maxWidth: `${56 * zoomLevel}rem` }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onPointerCancel={handlePointerUp}
                ref={imageRef}
              >
                <div className="absolute -top-8 left-0 right-0 flex justify-between text-xs font-medium px-2 text-slate-500">
                  {isComparing ? t('version_v', { v: activeFile?.versions[compareLeft]?.versionNumber }) : t('current_view', { v: activeVersion?.versionNumber, uploader: activeVersion?.uploader || t('version_uploader_unknown') })}
                </div>

                <img src={isComparing ? activeFile?.versions[compareLeft]?.imageUrl : activeVersion?.imageUrl} className="w-full h-auto block select-none" draggable="false" />

                {/* Visual Diff 疊加層 */}
                {isComparing && diffDataUrl && (
                  <img src={diffDataUrl} className="absolute inset-0 w-full h-auto opacity-70 pointer-events-none mix-blend-multiply" />
                )}

                {/* 顯示現有 Marker */}
                {(!isComparing ? activeVersion : activeFile.versions[compareLeft])?.markers?.map((m, idx) => (
                  <React.Fragment key={m.id}>
                    {m.type === 'box' ? (
                      <div className={`absolute border-2 flex items-start justify-start ${m.resolved ? 'border-emerald-500 bg-emerald-500/10' : 'border-red-500 bg-red-500/20 shadow-lg'}`} style={{ left: `${m.x}%`, top: `${m.y}%`, width: `${m.width}%`, height: `${m.height}%` }}>
                        <span className={`-mt-6 -ml-0.5 px-2 py-0.5 text-[10px] font-bold text-white ${m.resolved ? 'bg-emerald-500' : 'bg-red-500'}`}>{idx + 1}</span>
                      </div>
                    ) : (
                      <div className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md ${m.resolved ? 'bg-emerald-500 opacity-70' : 'bg-red-500 ring-4 ring-red-500/30'}`} style={{ left: `${m.x}%`, top: `${m.y}%` }} onClick={(e) => { if (isComparing) return; e.stopPropagation(); setActiveTab('comments'); }}>
                        {idx + 1}
                      </div>
                    )}
                  </React.Fragment>
                ))}

                {/* 正在繪製的路徑 */}
                {!isComparing && drawingMode === 'box' && dragStart && dragCurrent && (
                  <div className="absolute z-50 border-[3px] border-dashed border-red-500 bg-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.6)] pointer-events-none" style={{ left: `${Math.min(dragStart.x, dragCurrent.x)}%`, top: `${Math.min(dragStart.y, dragCurrent.y)}%`, width: `${Math.abs(dragCurrent.x - dragStart.x)}%`, height: `${Math.abs(dragCurrent.y - dragStart.y)}%` }} />
                )}

                {/* Pin Tool 新增中 */}
                {!isComparing && newMarker?.type === 'pin' && (
                  <div className="absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg ring-4 ring-blue-500/40 animate-pulse pointer-events-none" style={{ left: `${newMarker.x}%`, top: `${newMarker.y}%` }}>+</div>
                )}

                {/* Box Tool 確認留言前的預覽 */}
                {!isComparing && newMarker?.type === 'box' && (
                  <div className="absolute z-50 border-[3px] border-dashed border-emerald-500 bg-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.5)] pointer-events-none" style={{ left: `${newMarker.x}%`, top: `${newMarker.y}%`, width: `${newMarker.width}%`, height: `${newMarker.height}%` }} />
                )}

                {/* 測量線條渲染 */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-40">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                      <path d="M0,0 L10,3.5 L0,7" fill="#ef4444" />
                    </marker>
                    <marker id="arrowhead-rev" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                      <path d="M10,0 L0,3.5 L10,7" fill="#ef4444" />
                    </marker>
                  </defs>
                  {activeVersion?.markers?.filter(m => m.type === 'measure').map(m => {
                    const dist = Math.sqrt(Math.pow(m.x2 - m.x1, 2) + Math.pow(m.y2 - m.y1, 2));
                    const midX = (m.x1 + m.x2) / 2;
                    const midY = (m.y1 + m.y2) / 2;
                    return (
                      <g key={m.id}>
                        <line x1={`${m.x1}%`} y1={`${m.y1}%`} x2={`${m.x2}%`} y2={`${m.y2}%`} stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-rev)" strokeDasharray="4 2" />
                        <text x={`${midX}%`} y={`${midY}%`} dy="-10" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ef4444" className="drop-shadow-sm" style={{ paintOrder: 'stroke', stroke: 'white', strokeWidth: '3px' }}>
                          {(dist * measureScale).toFixed(measurePrecision)}{measureUnit}
                        </text>
                      </g>
                    );
                  })}
                  {activeMeasure && (
                    <g>
                      <line x1={`${activeMeasure.x1}%`} y1={`${activeMeasure.y1}%`} x2={`${activeMeasure.x2}%`} y2={`${activeMeasure.y2}%`} stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-rev)" />
                      <text x={`${(activeMeasure.x1 + activeMeasure.x2) / 2}%`} y={`${(activeMeasure.y1 + activeMeasure.y2) / 2}%`} dy="-10" textAnchor="middle" fontSize="12" fontWeight="black" fill="#3b82f6" className="drop-shadow-md" style={{ paintOrder: 'stroke', stroke: 'white', strokeWidth: '3px' }}>
                        {(Math.sqrt(Math.pow(activeMeasure.x2 - activeMeasure.x1, 2) + Math.pow(activeMeasure.y2 - activeMeasure.y1, 2)) * measureScale).toFixed(measurePrecision)}{measureUnit}
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* 比較模式的右側原圖 */}
              {isComparing && (
                <div className="flex-1 basis-1/2 max-w-[calc(50%-0.5rem)] bg-white shadow-2xl border border-slate-300 relative h-fit">
                  <div className="absolute -top-8 left-0 right-0 flex justify-between text-xs font-medium px-2 text-slate-500">{t('version_v', { v: activeFile?.versions[compareRight]?.versionNumber })}</div>
                  <img src={activeFile?.versions[compareRight]?.imageUrl} className="w-full h-auto block select-none" draggable="false" />
                </div>
              )}
            </div>

            <div className={`w-[360px] bg-white border-l z-10 flex flex-col ${isComparing || drawingMode === 'measure' ? 'hidden' : ''}`}>
              <div className="flex border-b">
                <button onClick={() => setActiveTab('comments')} className={`flex-1 py-4 text-xs font-bold ${activeTab === 'comments' ? 'text-blue-600 border-b-2 border-blue-600 bg-slate-50' : 'text-slate-500'}`}>{t('tab_comments')}</button>
                <button onClick={() => setActiveTab('sop')} className={`flex-1 py-4 text-xs font-bold ${activeTab === 'sop' ? 'text-blue-600 border-b-2 border-blue-600 bg-slate-50' : 'text-slate-500'}`}>{t('tab_sop')}</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-slate-50 relative">
                {activeTab === 'comments' && (
                  <div className="space-y-4 pb-32">
                    {[...(activeVersion?.markers || [])]
                      .filter(m => m.type !== 'measure')
                      .sort((a, b) => {
                        const ta = a.isoTimestamp || a.timestamp || '';
                        const tb = b.isoTimestamp || b.timestamp || '';
                        return ta < tb ? -1 : ta > tb ? 1 : 0;
                      })
                      .map((m, idx) => (
                        <div key={m.id} className={`p-4 rounded-xl border ${m.resolved ? 'bg-white opacity-60' : 'bg-white shadow-sm border-blue-100'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${m.resolved ? 'bg-emerald-500' : m.type === 'box' ? 'bg-purple-500' : 'bg-red-500'}`}>
                                #{idx + 1} {m.type === 'box' ? t('marker_box') : t('marker_pin')}
                              </span>
                              <span className="text-xs font-bold">{m.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {m.timestamp && <span className="text-[10px] text-slate-400">{m.timestamp}</span>}
                              {currentUser?.role !== 'observer' && (
                                <button onClick={() => toggleResolve(m.id)} className="text-[10px] underline text-slate-400 hover:text-blue-600">{m.resolved ? t('mark_unresolved') : t('mark_resolved')}</button>
                              )}
                            </div>
                          </div>
                          <p className={`text-sm text-slate-700 ${m.resolved && 'line-through opacity-70'}`}>{m.text}</p>
                        </div>
                      ))}

                    {newMarker && (
                      <div className="bg-blue-50 p-3 rounded border border-blue-200 text-xs font-bold text-blue-800 flex justify-between items-center">
                        {t('adding_marker')} <button onClick={() => setNewMarker(null)}><X size={14} /></button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'sop' && (
                  <div className="space-y-6">
                    <section className={`bg-white border rounded-xl p-4 ${activeFile?.stage === 1 ? 'border-blue-400 ring-2 ring-blue-50' : ''}`}>
                      <h3 className="font-bold text-xs mb-1">{t('sop_stage1')}</h3>
                      <p className="text-xs text-slate-500 mb-3">{t('sop_s1_desc')}</p>
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.basic} onChange={() => toggleChecklist('stage1', 'basic')} label={t('sop_s1_basic')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.size} onChange={() => toggleChecklist('stage1', 'size')} label={t('sop_s1_size')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.technique} onChange={() => toggleChecklist('stage1', 'technique')} label={t('sop_s1_technique')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.format} onChange={() => toggleChecklist('stage1', 'format')} label={t('sop_s1_format')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.font} onChange={() => toggleChecklist('stage1', 'font')} label={t('sop_s1_font')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.resource} onChange={() => toggleChecklist('stage1', 'resource')} label={t('sop_s1_resource')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.spell} onChange={() => toggleChecklist('stage1', 'spell')} label={t('sop_s1_spell')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.dieline} onChange={() => toggleChecklist('stage1', 'dieline')} label={t('sop_s1_dieline')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.structure} onChange={() => toggleChecklist('stage1', 'structure')} label={t('sop_s1_structure')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                    </section>

                    <section className={`bg-white border rounded-xl p-4 ${activeFile?.stage === 2 ? 'border-blue-400 ring-2 ring-blue-50' : ''}`}>
                      <h3 className="font-bold text-xs mb-1">{t('sop_stage2')}</h3>
                      <p className="text-xs text-slate-500 mb-3">{t('sop_s2_desc')}</p>
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.single} onChange={() => toggleChecklist('stage2', 'single')} label={t('sop_s2_single')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.cloud} onChange={() => toggleChecklist('stage2', 'cloud')} label={t('sop_s2_cloud')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.proof} onChange={() => toggleChecklist('stage2', 'proof')} label={t('sop_s2_proof')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.notice} onChange={() => toggleChecklist('stage2', 'notice')} label={t('sop_s2_notice')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                    </section>

                    <section className={`bg-white border rounded-xl p-4 ${activeFile?.stage === 3 ? 'border-blue-400 ring-2 ring-blue-50' : ''}`}>
                      <h3 className="font-bold text-xs mb-1">{t('sop_stage3')}</h3>
                      <p className="text-xs text-slate-500 mb-3">{t('sop_s3_desc')}</p>
                      <CheckboxItem checked={activeFile?.checklists?.stage3?.approved} onChange={() => toggleChecklist('stage3', 'approved')} label={t('sop_s3_approved')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                    </section>


                  </div>
                )}
              </div>

              {currentUser?.role !== 'observer' && activeTab === 'comments' && (
                <div className="absolute bottom-0 w-[360px] bg-white border-t p-4 z-40 shadow-xl">
                  {activeProject?.status === 'closed' ? (
                    <div className="text-center py-4 text-slate-400 font-bold bg-slate-50 rounded-lg border border-dashed text-xs italic">
                      🔒 {t('status_closed')}
                    </div>
                  ) : (
                    <>
                      <textarea value={commentInput} onChange={(e) => setCommentInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), submitComment())} className="w-full border rounded-lg p-3 text-sm resize-none h-20 outline-none focus:border-blue-500 bg-slate-50" placeholder={newMarker ? t('comment_placeholder_marker') : t('comment_placeholder_general')} />
                      <button onClick={submitComment} disabled={!commentInput.trim() && !newMarker} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-lg text-sm flex justify-center gap-2 items-center transition-colors">{t('send')} <Send size={14} /></button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= 彈窗區 ================= */}

      {/* 顯示所有資料 Modal (Top Right) */}
      {showAllDataModal && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex justify-center items-center p-6">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-sm font-bold flex items-center gap-2"><LayoutTemplate size={16} /> Data View</h2>
              <button onClick={() => setShowAllDataModal(false)} className="text-slate-400 hover:text-black"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-auto text-xs bg-slate-900 text-green-400 font-mono flex-1 relative custom-scrollbar">
              <pre>{JSON.stringify(projects, null, 2)}</pre>
            </div>
            <div className="p-4 border-t bg-slate-50 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 w-1/2">Export</span>
              <button onClick={() => copyToClipboard(JSON.stringify(projects, null, 2), 'JSON Data')} className="bg-black text-white px-4 py-2 rounded font-bold text-xs flex gap-2"><Copy size={14} /> Copy</button>
            </div>
          </div>
        </div>
      )}

      {/* 通知與上傳相關的 Modals ... */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            {!uploadingProgress && <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4"><X /></button>}
            <h2 className="font-bold text-lg mb-2">{t('modal_update_design')}</h2>

            {activeProject.status === 'closed' ? (
              <div className="p-8 text-center text-rose-500 font-bold bg-rose-50 rounded-xl border border-rose-200">
                🔒 {t('status_closed')}
              </div>
            ) : uploadingProgress > 0 ? (
              <div className="py-8 text-center">
                <div className="w-full bg-slate-100 rounded-full h-3 mb-2"><div className="bg-blue-600 h-3" style={{ width: `${uploadingProgress}%` }}></div></div>
                <div className="text-xs font-bold text-blue-600">{uploadingProgress}%</div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-xl p-8 flex flex-col items-center cursor-pointer hover:border-blue-400 mt-4">
                <Upload size={32} className="text-blue-500 mb-2" />
                <span className="text-sm font-bold text-slate-700">{t('modal_choose_file')}</span>
                <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => handleRealFileUpload(e, activeProjectId, false)} />
              </label>
            )}
          </div>
        </div>
      )}

      {showNotifyModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 relative">
            <button onClick={() => setShowNotifyModal(false)} className="absolute top-4 right-4"><X size={18} /></button>
            <h2 className="font-bold text-base mb-4 flex gap-2"><Mail className="text-blue-600" size={20} /> {pendingAction === 'review' ? t('modal_notify_review') : t('modal_notify_approve')}</h2>
            <p className="text-xs mb-2">{t('modal_notify_desc')}</p>
            <input type="email" value={notifyRecipients} onChange={e => setNotifyRecipients(e.target.value)} className="w-full border p-2 rounded text-sm mb-4 outline-none focus:border-blue-500" />
            <button onClick={() => confirmSendNotification(false)} disabled={isSendingEmail} className="w-full bg-blue-600 text-white font-bold py-2 rounded text-sm">{isSendingEmail ? t('modal_sending') : t('modal_confirm_send')}</button>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4"><X size={18} /></button>
            <h2 className="font-bold text-base mb-4 flex gap-2"><Link className="text-blue-600" size={20} /> {t('modal_share_title')}</h2>
            <div className="flex gap-2 mb-2">
              <input readOnly value={`${window.location.origin}/p/${activeFileId}?role=reviewer`} className="flex-1 border p-1.5 text-xs bg-slate-50 outline-none" />
              <button onClick={() => copyToClipboard(`${window.location.origin}/p/${activeFileId}?role=reviewer`, 'Reviewer Link')} className="bg-black text-white px-3 text-xs font-bold rounded">{t('modal_copy')}</button>
            </div>
          </div>
        </div>
      )}

      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full relative">
            <button onClick={() => setShowNewProjectModal(false)} className="absolute top-4 right-4"><X size={18} /></button>
            <h2 className="font-bold mb-4">{t('modal_new_project')}</h2>
            <input autoFocus value={newProjectTitle} onChange={e => setNewProjectTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCreateProjectSubmit()} placeholder={t('modal_project_name_placeholder')} className="w-full border p-2 mb-4 rounded text-sm outline-none" />
            <button onClick={handleCreateProjectSubmit} className="w-full bg-blue-600 text-white font-bold p-2 text-sm rounded">{t('modal_create')}</button>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-2.5 rounded-full shadow-2xl z-[9999] text-xs font-bold tracking-widest">{toastMessage}</div>
      )}
    </div>
  );
}
