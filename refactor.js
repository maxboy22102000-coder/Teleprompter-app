const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// The translations dictionary to inject
const translationsCode = `
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
    upload_new_file: "新增圖面或PDF",
    
    version_v_uploader: "V{{v}} ({{uploader}})",
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
    
    current_view: "當前檢視: V{{v}} ({{uploader}})",
    version_v: "版本 V{{v}}",
    
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
    
    sop_pre_design: "前置技術需求清單 (Pre-Design)",
    sop_pre_logo: "提供向量 Logo (.ai / .eps)",
    sop_pre_text: "提供最終版文字稿",
    sop_pre_dieline: "確認正確的刀模線",
    sop_stage1: "Stage 1: 結構與佈局",
    sop_s1_structure: "盒子形狀與摺疊位置正確",
    sop_s1_key_visual: "主視覺擺放位置確認",
    sop_stage2: "Stage 2: 細節與內容",
    sop_s2_brand_color: "字體顏色與品牌一致",
    sop_s2_details: "圖案細節無誤",
    sop_s2_barcode: "條碼內容正確",
    sop_stage3: "Stage 3: 印刷技術強制確認 SOP (Technical Checklist)",
    sop_s3_desc: "這是設計師交接給印刷廠前的「生死關頭」，必須與客戶逐一勾選：",
    sop_s3_color_img: "色彩與影像 (Color & Image)",
    sop_s3_cmyk: "確認色彩模式為 CMYK（嚴禁 RGB）；若有品牌色，需標註 Pantone 色號。",
    sop_s3_dpi: "影像解析度在 100% 縮放時必須達到 300 DPI 以上。",
    sop_s3_layout: "版面與結構 (Layout & Structure)",
    sop_s3_bleed: "出血 (Bleed)： 確認所有背景圖案延伸至刀模線外至少 3mm (0.125\\").",
    sop_s3_safe_zone: "安全區 (Safe Zone)： 關鍵資訊（Logo、警告語）需距離刀模線或摺痕 3-5mm，防止模切偏移被裁掉。",
    sop_s3_outline: "字體轉路徑 (Outlining)： 交付最終稿前，所有字體必須轉外框，防止印刷端掉字。",
    sop_s3_barcodes_title: "條碼與掃描 (Barcodes)",
    sop_s3_vector_barcode: "條碼與 QR Code 必須為向量格式，並確認掃描後內容正確。",
    
    modal_update_design: "更新設計版本",
    modal_choose_file: "選擇新檔案 (支援 PDF/JPG/PNG)",
    modal_notify_review: "交辦審核",
    modal_notify_approve: "核准該階段",
    modal_notify_desc: "確認收件人 Email，將透過 Node 後端發信：",
    modal_confirm_send: "確認送出",
    modal_sending: "發信中...",
    modal_share_title: "複製連結分享給客戶或老闆",
    modal_copy: "複製",
    modal_new_project: "建立專案",
    modal_project_name_placeholder: "專案名稱...",
    modal_create: "建立",
    
    toast_copied: "已複製 {{name}}！",
    toast_copy_failed: "複製失敗",
    toast_project_created: "✅ 專案建立成功！",
    toast_block_pre: "⚠️ 阻擋送出：未完成前置需求！",
    toast_block_s1: "⚠️ 阻擋送出：Stage 1 規範未過！",
    toast_block_s2: "⚠️ 阻擋送出：Stage 2 規範未過！",
    toast_block_s3: "🛑 阻擋送出：最終印刷預檢未通過！",
    toast_review_sent: "📧 Stage {{stage}} 審核通知已真實發送！",
    toast_review_simulated: "⚠️ 信件 API 未連線，僅為系統模擬送出！",
    toast_approve_sent: "✅ 核准成功！通知真實發送。",
    toast_approve_simulated: "✅ 核准成功！(系統模擬通知)",
    toast_pdf_failed: "⚠️ PDF 解析失敗，將使用預設底圖",
    toast_upload_success: "✅ 檔案上傳成功！",
    toast_version_covered: "✅ 新版本已覆蓋，準備進行審核！",
    toast_diff_found: "✅ 差異比對完成 (紅色區域為不同處)",
    toast_diff_same: "✅ 比對完成，兩版本完全相同",
    toast_diff_failed: "❌ 比對失敗，圖片可能跨網域無法分析",
    
    loading: "載入中..."
  },
  en: {
    auth_title: "DesignSync Proofreading System",
    auth_subtitle: "Please select your role to enter the system. Different roles have different permissions.",
    display_name: "Display Name:",
    name_placeholder: "e.g. Manager Wang",
    contact_email: "Contact Email:",
    role_designer: "I am a Designer",
    role_designer_desc: "Can upload files, create projects, and manage SOP checklists.",
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
    upload_new_file: "Add Image/PDF",
    
    version_v_uploader: "V{{v}} ({{uploader}})",
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
    
    current_view: "Current View: V{{v}} ({{uploader}})",
    version_v: "Version V{{v}}",
    
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
    
    sop_pre_design: "Pre-Design Technical Checklist",
    sop_pre_logo: "Provide vector Logo (.ai / .eps)",
    sop_pre_text: "Provide final text copy",
    sop_pre_dieline: "Confirm correct dieline",
    sop_stage1: "Stage 1: Structure & Layout",
    sop_s1_structure: "Box shape and folding positions are correct",
    sop_s1_key_visual: "Key visual placement confirmed",
    sop_stage2: "Stage 2: Details & Content",
    sop_s2_brand_color: "Font color matches brand identity",
    sop_s2_details: "Graphic details are correct",
    sop_s2_barcode: "Barcode content is correct",
    sop_stage3: "Stage 3: Printing Technical SOP",
    sop_s3_desc: "This is the final checkpoint before handing over to the printer. Must be checked with the client:",
    sop_s3_color_img: "Color & Image",
    sop_s3_cmyk: "Confirm color mode is CMYK (strictly no RGB); if using brand colors, indicate Pantone codes.",
    sop_s3_dpi: "Image resolution must be at least 300 DPI at 100% scale.",
    sop_s3_layout: "Layout & Structure",
    sop_s3_bleed: "Bleed: Ensure all background patterns extend at least 3mm (0.125\\").",
    sop_s3_safe_zone: "Safe Zone: Key info (Logo, warnings) must be 3-5mm away from dieline or creases.",
    sop_s3_outline: "Outlining: Before final delivery, all fonts must be outlined.",
    sop_s3_barcodes_title: "Barcodes",
    sop_s3_vector_barcode: "Barcodes and QR Codes must be in vector format, and scan content confirmed correct.",
    
    modal_update_design: "Update Design Version",
    modal_choose_file: "Choose new file (PDF/JPG/PNG)",
    modal_notify_review: "Request Review",
    modal_notify_approve: "Approve Stage",
    modal_notify_desc: "Confirm recipient Email, will be sent via Node backend:",
    modal_confirm_send: "Confirm & Send",
    modal_sending: "Sending...",
    modal_share_title: "Copy link to share with client or boss",
    modal_copy: "Copy",
    modal_new_project: "Create Project",
    modal_project_name_placeholder: "Project Name...",
    modal_create: "Create",
    
    toast_copied: "Copied {{name}}!",
    toast_copy_failed: "Copy failed",
    toast_project_created: "✅ Project created successfully!",
    toast_block_pre: "⚠️ Blocked: Pre-design checklist incomplete!",
    toast_block_s1: "⚠️ Blocked: Stage 1 checklist incomplete!",
    toast_block_s2: "⚠️ Blocked: Stage 2 checklist incomplete!",
    toast_block_s3: "🛑 Blocked: Final print preflight failed!",
    toast_review_sent: "📧 Stage {{stage}} review notice sent!",
    toast_review_simulated: "⚠️ Mail API disconnected, simulated send!",
    toast_approve_sent: "✅ Approved! Notice sent.",
    toast_approve_simulated: "✅ Approved! (Simulated notice)",
    toast_pdf_failed: "⚠️ PDF parsing failed, using default background",
    toast_upload_success: "✅ File uploaded successfully!",
    toast_version_covered: "✅ New version overwritten, ready for review!",
    toast_diff_found: "✅ Diff compare complete (Red areas are different)",
    toast_diff_same: "✅ Compare complete, both versions are identical",
    toast_diff_failed: "❌ Compare failed, image cross-origin issue",
    
    loading: "Loading..."
  }
};
`;

if (!content.includes('const translations = {')) {
    content = content.replace(/(export default function App\(\) \{)/, translationsCode + '\n$1');
}

const hookCode = `
  const [language, setLanguage] = useState('zh');
  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || key;
    Object.keys(params).forEach(k => {
      text = text.replace(new RegExp(\`\\\\{\\\\{$\{k}\\\\}\\\\\}\`, 'g'), params[k]);
    });
    return text;
  };
`;

if (!content.includes('const [language, setLanguage]')) {
    content = content.replace(/(const \[appView, setAppView\] = useState\('auth'\);)/, hookCode + '\n  $1');
}

const replaceMapping = [
    // Toasts
    ['`已複製 ${typeName}！`', "t('toast_copied', {name: typeName})"],
    ["'複製失敗'", "t('toast_copy_failed')"],
    ["'✅ 專案建立成功！'", "t('toast_project_created')"],
    ["'⚠️ 阻擋送出：未完成前置需求！'", "t('toast_block_pre')"],
    ["'⚠️ 阻擋送出：Stage 1 規範未過！'", "t('toast_block_s1')"],
    ["'⚠️ 阻擋送出：Stage 2 規範未過！'", "t('toast_block_s2')"],
    ["'🛑 阻擋送出：最終印刷預檢未通過！'", "t('toast_block_s3')"],
    ['`📧 Stage ${activeFile.stage} 審核通知已真實發送！`', "t('toast_review_sent', {stage: activeFile.stage})"],
    ['`⚠️ 信件 API 未連線，僅為系統模擬送出！`', "t('toast_review_simulated')"],
    ['`✅ 核准成功！通知真實發送。`', "t('toast_approve_sent')"],
    ['`✅ 核准成功！(系統模擬通知)`', "t('toast_approve_simulated')"],
    ["'⚠️ PDF 解析失敗，將使用預設底圖'", "t('toast_pdf_failed')"],
    ["'✅ 檔案上傳成功！'", "t('toast_upload_success')"],
    ["'✅ 新版本已覆蓋，準備進行審核！'", "t('toast_version_covered')"],
    ["'✅ 差異比對完成 (紅色區域為不同處)'", "t('toast_diff_found')"],
    ["'✅ 比對完成，兩版本完全相同'", "t('toast_diff_same')"],
    ["'❌ 比對失敗，圖片可能跨網域無法分析'", "t('toast_diff_failed')"],

    // Auth Screen
    [">DesignSync 專業校稿系統<", ">{t('auth_title')}<"],
    [">請選擇您的身分進入系統，不同身分將擁有不同權限。<", ">{t('auth_subtitle')}<"],
    [">顯示名稱：<", ">{t('display_name')}<"],
    ['placeholder="例: 王經理"', "placeholder={t('name_placeholder')}"],
    [">聯絡 Email：<", ">{t('contact_email')}<"],
    [">我是設計師<", ">{t('role_designer')}<"],
    [">可上傳檔案、建立專案、管理 SOP 檢核表。<", ">{t('role_designer_desc')}<"],
    [">我是客戶/決策者<", ">{t('role_client')}<"],
    [">審核圖面、框選或圖釘留言。<", ">{t('role_client_desc')}<"],
    [">我是觀察者 (老闆)<", ">{t('role_observer')}<"],
    [">僅瀏覽權限，無法修改留言。<", ">{t('role_observer_desc')}<"],

    // Dashboard
    [">專案總覽 (Dashboard)<", ">{t('dashboard_title')}<"],
    [">目前身分:<", ">{t('current_role')}<"],
    [">我的專案<", ">{t('my_projects')}<"],
    [">新增專案<", ">{t('new_project')}<"],
    ['`已執行 ${getElapsedDays(proj.startDate)} 天`', "t('running_days', {days: getElapsedDays(proj.startDate)})"],
    [">已執行 {getElapsedDays(proj.startDate)} 天<", ">{t('running_days', {days: getElapsedDays(proj.startDate)})}<"],
    [">階段 {file.stage}/3<", ">{t('stage_x_of_3', {stage: file.stage})}<"],
    ['>版本: <', "> {t('version_x', {v: file.versions[file.versions.length - 1]?.versionNumber || 1}).split('V')[0]}<"],
    ["file.versions[file.versions.length - 1]?.status === 'approved' ? '已核准' : '校稿中'", "file.versions[file.versions.length - 1]?.status === 'approved' ? t('status_approved') : t('status_reviewing')"],
    [">新增圖面或PDF<", ">{t('upload_new_file')}<"],

    // Editor Header
    [">V{v.versionNumber}", ">{t('version_tag', {v: v.versionNumber})}"],
    ["'未知'", "t('version_uploader_unknown')"],
    [">版本比較<", ">{t('compare_versions')}<"],
    ["{isComputingDiff ? '比對中...' : 'Diff 比對'}", "{isComputingDiff ? t('computing_diff') : t('diff_compare')}"],
    [">退出比對<", ">{t('exit_compare')}<"],
    [">更新設計版", ">{t('update_design')}"],
    [">分享連結<", ">{t('share_link')}<"],
    ["{isSendingEmail ? '處理中...' : currentUser?.role === 'designer' ? '送出審核通知' : '完成校稿 (Approve)'}", "{isSendingEmail ? t('processing') : currentUser?.role === 'designer' ? t('send_review_notice') : t('approve_design')}"],

    [
        "<button onClick={() => setAppView('auth')} className=\\"text - slate - 400 hover: text - slate - 600\\">",
\`<button onClick={() => setLanguage(l => l === 'zh' ? 'en' : 'zh')} className="bg-slate-200 px-3 py-1 rounded text-xs font-bold mr-2">{language === 'zh' ? 'EN' : '中文'}</button><button onClick={() => setAppView('auth')} className="text-slate-400 hover:text-slate-600">\`
  ],

  // Main canvas area
  ['{isComparing ? `版本 V${ activeFile?.versions[compareLeft]?.versionNumber } ` : `當前檢視: V${ activeVersion?.versionNumber } (${
    activeVersion?.uploader || t(\'version_uploader_unknown\')})`}', "{isComparing ? t('version_v', {v: activeFile?.versions[compareLeft]?.versionNumber}) : t('current_view', {v: activeVersion?.versionNumber, uploader: activeVersion?.uploader || t('version_uploader_unknown')})}"],
        ['{isComparing ? `版本 V${activeFile?.versions[compareLeft]?.versionNumber}` : `當前檢視: V${activeVersion?.versionNumber} (${activeVersion?.uploader || \'未知\'})`}', "{isComparing ? t('version_v', {v: activeFile?.versions[compareLeft]?.versionNumber}) : t('current_view', {v: activeVersion?.versionNumber, uploader: activeVersion?.uploader || t('version_uploader_unknown')})}"],

        ['>版本 V{activeFile?.versions[compareRight]?.versionNumber}<', ">{t('version_v', {v: activeFile?.versions[compareRight]?.versionNumber})}<"],

        // Tabs
        [">討論與留言<", ">{t('tab_comments')}<"],
        [">SOP 檢核<", ">{t('tab_sop')}<"],

        // Comments
        ["#{idx + 1} {m.type === 'box' ? '框選' : '圖釘'}", "#{idx + 1} {m.type === 'box' ? t('marker_box') : t('marker_pin')}"],
        ["{m.resolved ? '撤銷' : '標示解決'}", "{m.resolved ? t('mark_unresolved') : t('mark_resolved')}"],
        [">正在新增標註... <", ">{t('adding_marker')} <"],
        ['placeholder={newMarker ? "針對標註點發表建議..." : "一般留言..."}', "placeholder={newMarker ? t('comment_placeholder_marker') : t('comment_placeholder_general')}"],
        [">送出 <", ">{t('send')} <"],

        // Stage Checklists
        [">前置技術需求清單 (Pre-Design)<", ">{t('sop_pre_design')}<"],
        ['label="提供向量 Logo (.ai / .eps)"', "label={t('sop_pre_logo')}"],
        ['label="提供最終版文字稿"', "label={t('sop_pre_text')}"],
        ['label="確認正確的刀模線"', "label={t('sop_pre_dieline')}"],
        [">Stage 1: 結構與佈局<", ">{t('sop_stage1')}<"],
        ['label="盒子形狀與摺疊位置正確"', "label={t('sop_s1_structure')}"],
        ['label="主視覺擺放位置確認"', "label={t('sop_s1_key_visual')}"],
        [">Stage 2: 細節與內容<", ">{t('sop_stage2')}<"],
        ['label="字體顏色與品牌一致"', "label={t('sop_s2_brand_color')}"],
        ['label="圖案細節無誤"', "label={t('sop_s2_details')}"],
        ['label="條碼內容正確"', "label={t('sop_s2_barcode')}"],

        [">Stage 3: 印刷技術強制確認 SOP (Technical Checklist)<", ">{t('sop_stage3')}<"],
        [">這是設計師交接給印刷廠前的「生死關頭」，必須與客戶逐一勾選：<", ">{t('sop_s3_desc')}<"],
        [">色彩與影像 (Color & Image)<", ">{t('sop_s3_color_img')}<"],
        ['label="確認色彩模式為 CMYK（嚴禁 RGB）；若有品牌色，需標註 Pantone 色號。"', "label={t('sop_s3_cmyk')}"],
        ['label="影像解析度在 100% 縮放時必須達到 300 DPI 以上。"', "label={t('sop_s3_dpi')}"],
        [">版面與結構 (Layout & Structure)<", ">{t('sop_s3_layout')}<"],
        ['label="出血 (Bleed)： 確認所有背景圖案延伸至刀模線外至少 3mm (0.125\\")."', "label={t('sop_s3_bleed')}"],
        ['label="安全區 (Safe Zone)： 關鍵資訊（Logo、警告語）需距離刀模線或摺痕 3-5mm，防止模切偏移被裁掉。"', "label={t('sop_s3_safe_zone')}"],
        ['label="字體轉路徑 (Outlining)： 交付最終稿前，所有字體必須轉外框，防止印刷端掉字。"', "label={t('sop_s3_outline')}"],
        [">條碼與掃描 (Barcodes)<", ">{t('sop_s3_barcodes_title')}<"],
        ['label="條碼與 QR Code 必須為向量格式，並確認掃描後內容正確。"', "label={t('sop_s3_vector_barcode')}"],

        // Modals
        [">更新設計版本<", ">{t('modal_update_design')}<"],
        [">選擇新檔案 (支援 PDF/JPG/PNG)<", ">{t('modal_choose_file')}<"],
        ["{pendingAction === 'review' ? '交辦審核' : '核准該階段'}", "{pendingAction === 'review' ? t('modal_notify_review') : t('modal_notify_approve')}"],
        [">確認收件人 Email，將透過 Node 後端發信：<", ">{t('modal_notify_desc')}<"],
        ["{isSendingEmail ? '發信中...' : '確認送出'}", "{isSendingEmail ? t('modal_sending') : t('modal_confirm_send')}"],
        [">複製連結分享給客戶或老闆<", ">{t('modal_share_title')}<"],
        [">複製</button>", ">{t('modal_copy')}</button>"],
        [">建立專案<", ">{t('modal_new_project')}<"],
        ['placeholder="專案名稱..."', "placeholder={t('modal_project_name_placeholder')}"],
        [">建立</button>", ">{t('modal_create')}</button>"],

        // Handlers and Roles mapping
        ["role === 'designer' ? '設計師' : role === 'client' ? '客戶' : '觀察者'", "role === 'designer' ? Object.keys(params||{}).length > 0 ? t('role_name_designer') : t('role_name_designer') : role === 'client' ? t('role_name_client') : t('role_name_observer')"],

        [">載入中...<", ">{t('loading')}<"]
];

    replaceMapping.forEach(([search, replace]) => {
        content = content.replaceAll(search, replace); // using string replacement ensures we match literal characters exactly
    });

    // Final Fixes mapping for edge cases manually
    content = content.replaceAll("role === 'designer' ? Object.keys(params||{}).length > 0 ? t('role_name_designer') : t('role_name_designer') : role === 'client' ? t('role_name_client') : t('role_name_observer')", "role === 'designer' ? t('role_name_designer') : role === 'client' ? t('role_name_client') : t('role_name_observer')");

    // Adding toggle for editor view
    const editorHeader = \`
            <div className="flex items-center gap-3">
              <button onClick={() => setLanguage(l => l === 'zh' ? 'en' : 'zh')} className="bg-slate-200 px-3 py-1 rounded text-xs font-bold">{language === 'zh' ? 'EN' : '中文'}</button>
              <button onClick={() => setShowShareModal(true)}
\`;
content = content.replace(/(<div className="flex items-center gap-3">\s*<button onClick=\{\(\) => setShowShareModal\(true\)\})/, editorHeader.trim() + ' ');

// Save
fs.writeFileSync(appPath, content, 'utf8');
console.log('App.jsx translated successfully.');
