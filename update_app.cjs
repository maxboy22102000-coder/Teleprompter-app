const fs = require('fs');

let content = fs.readFileSync('c:\\Users\\User\\.gemini\\antigravity\\專業設計校稿平台\\design-sync-app\\src\\App.jsx', 'utf8');

// Update stage 3 to stage 4 translation
content = content.replace(/stage_x_of_3/g, 'stage_x_of_4');
content = content.replace(/階段 \{\{stage\}\}\/3/g, '階段 {{stage}}/4');
content = content.replace(/Stage \{\{stage\}\}\/3/g, 'Stage {{stage}}/4');

// ZH SOP
const oldZhSop = `    sop_pre_design: "前置技術需求清單 (Pre-Design)",
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
    sop_s3_vector_barcode: "條碼與 QR Code 必須為向量格式，並確認掃描後內容正確。",`;

const newZhSop = `    sop_stage1: "階段一：進件與規格確認 (Gateway Check)",
    sop_s1_desc: "收到新專案或需求時的第一道防線。",
    sop_s1_basic: "基礎規格： 已提供「產品名稱/SKU」、「數量」與「材質結構」",
    sop_s1_size: "精確尺寸： 已提供確切的「公制尺寸 (cm)」",
    sop_s1_technique: "工法定義： 已確認特殊印刷效果的具體類型與區域",
    sop_stage2: "階段二：檔案預檢與版本控制 (File Pre-flight)",
    sop_s2_desc: "開啟客戶檔案或準備排版前的必做技術檢查。",
    sop_s2_format: "格式合規： 檔案為 AI 或 EPS 格式",
    sop_s2_font: "字體與連結： 文字皆已轉換為外框 (Outlines)",
    sop_s2_resource: "資源齊全： 外部連結資源皆已正確嵌入或附上",
    sop_s2_spell: "除錯掃描： 已完成基本拼寫檢查",
    sop_s2_dieline: "刀模防呆： 新刀模已標明英吋與公分雙軌尺寸",
    sop_s2_structure: "結構防呆： 客戶已提供新結構的參考圖片或例子",
    sop_stage3: "階段三：校對與審核準備 (Proofing & Single Source)",
    sop_s3_desc: "出圖給客戶前，以及整理雙方檔案時的確認。",
    sop_s3_single: "單一事實： 確認以客戶提供的「最終檔案」為唯一生產依據",
    sop_s3_cloud: "雲端同步： 最終生產檔案已上傳至指定平台NAS",
    sop_s3_permission: "權限開通： 確認雙方對共享連結皆具備存取或編輯權限",
    sop_s3_proof: "防禦性打樣： 已將校對稿轉為 PDF 格式回傳給客戶",
    sop_s3_notice: "微調告知： 已明確列出為符合印刷要求所做的任何微小調整",
    sop_stage4: "階段四：最終核准與物流 (Final Approval & Logistics)",
    sop_s4_desc: "送廠印製前的最後一道鎖。",
    sop_s4_approved: "絕對核准： 已收到客戶明確回覆 Approved",
    sop_s4_logistics_inv: "物流盤點： 確認特殊分批運送或免簽收等要求",
    sop_s4_logistics_conf: "物流雙重確認： 特殊物流需求已再次向客戶確認並註記",
    return_for_revision: "返還簽核 (退回至前置討論)",
    toast_returned: "⚠️ 檔案已返還簽核！狀態改為討論中。",`;

content = content.replace(oldZhSop, newZhSop);

// EN SOP
const oldEnSop = `    sop_pre_design: "Pre-Design Technical Checklist",
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
    sop_s3_desc: "Final checkpoint before handing over to the printer. Must check with the client:",
    sop_s3_color_img: "Color & Image",
    sop_s3_cmyk: "Confirm color mode is CMYK (no RGB); if using brand colors, indicate Pantone codes.",
    sop_s3_dpi: "Image resolution must be at least 300 DPI at 100% scale.",
    sop_s3_layout: "Layout & Structure",
    sop_s3_bleed: "Bleed: Ensure all backgrounds extend at least 3mm (0.125\\") beyond dieline.",
    sop_s3_safe_zone: "Safe Zone: Key info must be 3-5mm away from dieline or creases.",
    sop_s3_outline: "Outlining: Before final delivery, all fonts must be outlined.",
    sop_s3_barcodes_title: "Barcodes",
    sop_s3_vector_barcode: "Barcodes and QR Codes must be vector format and scan content confirmed.",`;

const newEnSop = `    sop_stage1: "Stage 1: Gateway Check",
    sop_s1_desc: "First line of defense upon receiving a new project.",
    sop_s1_basic: "Basic Specs: Product Name/SKU, Quantity, and Material provided.",
    sop_s1_size: "Exact Size: Exact metric size (cm) provided.",
    sop_s1_technique: "Technique: Specific printing effects and areas confirmed.",
    sop_stage2: "Stage 2: File Pre-flight",
    sop_s2_desc: "Technical checks before layout or opening files.",
    sop_s2_format: "Format: File is in AI or EPS format.",
    sop_s2_font: "Fonts: All text converted to Outlines.",
    sop_s2_resource: "Resources: External links embedded correctly.",
    sop_s2_spell: "Spell Check: Basic spelling checked.",
    sop_s2_dieline: "Dieline check: Dimensions marked in both inches and cm.",
    sop_s2_structure: "Structure check: Client provided references for new structures.",
    sop_stage3: "Stage 3: Proofing & Single Source",
    sop_s3_desc: "Checks before sending proofs & compiling final files.",
    sop_s3_single: "Single source: Ensure client's 'Finalized File' is the only source of truth.",
    sop_s3_cloud: "Cloud Sync: Production files uploaded to NAS/Drive.",
    sop_s3_permission: "Permissions: Shared links accessible by both parties.",
    sop_s3_proof: "Defensive Proofing: Proofs sent as PDF.",
    sop_s3_notice: "Twists Noticed: Minor printing adjustments clearly stated to client.",
    sop_stage4: "Stage 4: Final Approval & Logistics",
    sop_s4_desc: "Final lock before printing.",
    sop_s4_approved: "Absolute Approval: 'Approved for Production' received via email.",
    sop_s4_logistics_inv: "Logistics Inventory: Split-shipping or no-signature reqs confirmed.",
    sop_s4_logistics_conf: "Logistics Double Check: Special logistics noted in final email.",
    return_for_revision: "Return for Revision",
    toast_returned: "⚠️ File returned for revision!",`;

content = content.replace(oldEnSop, newEnSop);

// Checklist states in handleRealFileUpload
const oldChecklistState = `checklists: {
            preDesign: { text: false, logo: false, dieline: false },
            stage1: { structure: false, keyVisual: false },
            stage2: { brandColor: false, details: false, barcodeContent: false },
            stage3: { spelling: false, cmyk: false, dpi: false, bleed: false, safeZone: false, outline: false, vectorBarcode: false }
          }`;

const newChecklistState = `checklists: {
            stage1: { basic: false, size: false, technique: false },
            stage2: { format: false, font: false, resource: false, spell: false, dieline: false, structure: false },
            stage3: { single: false, cloud: false, permission: false, proof: false, notice: false },
            stage4: { approved: false, logisticsInv: false, logisticsConf: false }
          }`;

content = content.replace(oldChecklistState, newChecklistState);

// also in mockProjects
const oldMockChecklists = `checklists: {
          preDesign: { text: true, logo: true, dieline: true },
          stage1: { structure: true, keyVisual: true },
          stage2: { brandColor: false, details: false, barcodeContent: false },
          stage3: { spelling: false, cmyk: false, dpi: false, bleed: false, safeZone: false, outline: false, vectorBarcode: false }
        }`;

const newMockChecklists = `checklists: {
          stage1: { basic: true, size: true, technique: true },
          stage2: { format: true, font: true, resource: true, spell: false, dieline: false, structure: false },
          stage3: { single: false, cloud: false, permission: false, proof: false, notice: false },
          stage4: { approved: false, logisticsInv: false, logisticsConf: false }
        }`;
content = content.replace(oldMockChecklists, newMockChecklists);


// Replace max stage from 3 to 4 in code:
content = content.replace(/const newStage = f\.stage < 3 \? f\.stage \+ 1 : 3;/g, 'const newStage = f.stage < 4 ? f.stage + 1 : 4;');
content = content.replace(/file\.stage === 3 \? 'bg-purple-100 /g, "file.stage === 4 ? 'bg-purple-100 ");
content = content.replace(/file\.stage === 3 \? 'bg-emerald-100 /g, "file.stage === 4 ? 'bg-emerald-100 ");
content = content.replace(/file\.stage === 3 \? t\('status_waiting_supervisor'/g, "file.stage === 4 ? t('status_waiting_supervisor'");

content = content.replace(/toast_block_pre: "[^"]*",/g, ''); // Remove no longer used msg

// We need to carefully replace the render logic for statuses
const oldStatusRender = `                              {(() => {
                                const lastStatus = file.versions[file.versions.length - 1]?.status;
                                if (lastStatus === 'approved') {
                                  return file.stage === 3 ? t('status_fully_approved') : t('status_waiting_designer', { stage: file.stage + 1 });
                                } else {
                                  return file.stage === 3 ? t('status_waiting_supervisor', { stage: file.stage }) : t('status_waiting_client', { stage: file.stage });
                                }
                              })()}`;
const newStatusRender = `                              {(() => {
                                const lastStatus = file.versions[file.versions.length - 1]?.status;
                                if (lastStatus === 'approved') {
                                  return file.stage === 4 ? t('status_fully_approved') : t('status_waiting_designer', { stage: file.stage + 1 });
                                } else {
                                  return file.stage === 4 ? t('status_waiting_supervisor', { stage: file.stage }) : t('status_waiting_client', { stage: file.stage });
                                }
                              })()}`;
content = content.replace(oldStatusRender, newStatusRender);


const oldProgressRender = `                                <div className="w-full bg-slate-200 h-1.5 rounded-full"><div className={\`h-full duration-500 \${file.stage === 1 ? 'w-1/3 bg-blue-400' : file.stage === 2 ? 'w-2/3 bg-blue-500' : 'w-full bg-emerald-500'}\`}></div></div>`;
const newProgressRender = `                                <div className="w-full bg-slate-200 h-1.5 rounded-full"><div className={\`h-full duration-500 \${file.stage === 1 ? 'w-1/4 bg-blue-400' : file.stage === 2 ? 'w-2/4 bg-blue-500' : file.stage === 3 ? 'w-3/4 bg-blue-600' : 'w-full bg-emerald-500'}\`}></div></div>`;
content = content.replace(oldProgressRender, newProgressRender);

// Replace the SOP rendering components:
const oldSopRender = `<div className="space-y-6">
                    <section className="bg-white border rounded-xl p-4">
                      <h3 className="font-bold text-xs mb-3">{t('sop_pre_design')}</h3>
                      <CheckboxItem checked={activeFile?.checklists?.preDesign?.logo} onChange={() => toggleChecklist('preDesign', 'logo')} label={t('sop_pre_logo')} isCurrentStage={true} />
                      <CheckboxItem checked={activeFile?.checklists?.preDesign?.text} onChange={() => toggleChecklist('preDesign', 'text')} label={t('sop_pre_text')} isCurrentStage={true} />
                      <CheckboxItem checked={activeFile?.checklists?.preDesign?.dieline} onChange={() => toggleChecklist('preDesign', 'dieline')} label={t('sop_pre_dieline')} isCurrentStage={true} />
                    </section>
                    <section className={\`bg-white border rounded-xl p-4 \${activeFile?.stage === 1 ? 'border-blue-400 ring-2 ring-blue-50' : ''}\`}>
                      <h3 className="font-bold text-xs mb-3">{t('sop_stage1')}</h3>
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.structure} onChange={() => toggleChecklist('stage1', 'structure')} label={t('sop_s1_structure')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.keyVisual} onChange={() => toggleChecklist('stage1', 'keyVisual')} label={t('sop_s1_key_visual')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                    </section>
                    <section className={\`bg-white border rounded-xl p-4 \${activeFile?.stage === 2 ? 'border-blue-400 ring-2 ring-blue-50' : ''}\`}>
                      <h3 className="font-bold text-xs mb-3">{t('sop_stage2')}</h3>
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.brandColor} onChange={() => toggleChecklist('stage2', 'brandColor')} label={t('sop_s2_brand_color')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.details} onChange={() => toggleChecklist('stage2', 'details')} label={t('sop_s2_details')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.barcodeContent} onChange={() => toggleChecklist('stage2', 'barcodeContent')} label={t('sop_s2_barcode')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                    </section>
                    <section className={\`bg-white border rounded-xl p-4 \${activeFile?.stage === 3 ? 'border-rose-400 ring-2 ring-rose-50' : ''}\`}>
                      <h3 className="font-bold text-xs mb-3">{t('sop_stage3')}</h3>
                      <p className="text-xs text-rose-600 mb-3 font-medium">{t('sop_s3_desc')}</p>

                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-slate-700 mb-2 border-b pb-1">{t('sop_s3_color_img')}</h4>
                        <CheckboxItem checked={activeFile?.checklists?.stage3?.cmyk} onChange={() => toggleChecklist('stage3', 'cmyk')} label={t('sop_s3_cmyk')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                        <CheckboxItem checked={activeFile?.checklists?.stage3?.dpi} onChange={() => toggleChecklist('stage3', 'dpi')} label={t('sop_s3_dpi')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                      </div>

                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-slate-700 mb-2 border-b pb-1">{t('sop_s3_layout')}</h4>
                        <CheckboxItem checked={activeFile?.checklists?.stage3?.bleed} onChange={() => toggleChecklist('stage3', 'bleed')} label={t('sop_s3_bleed')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                        <CheckboxItem checked={activeFile?.checklists?.stage3?.safeZone} onChange={() => toggleChecklist('stage3', 'safeZone')} label={t('sop_s3_safe_zone')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                        <CheckboxItem checked={activeFile?.checklists?.stage3?.outline} onChange={() => toggleChecklist('stage3', 'outline')} label={t('sop_s3_outline')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                      </div>

                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-slate-700 mb-2 border-b pb-1">{t('sop_s3_barcodes_title')}</h4>
                        <CheckboxItem checked={activeFile?.checklists?.stage3?.vectorBarcode} onChange={() => toggleChecklist('stage3', 'vectorBarcode')} label={t('sop_s3_vector_barcode')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                      </div>
                    </section>
                  </div>`;

const newSopRender = `<div className="space-y-6 pb-20">
                    <section className={\`bg-white border rounded-xl p-4 \${activeFile?.stage === 1 ? 'border-blue-400 ring-2 ring-blue-50' : ''}\`}>
                      <h3 className="font-bold text-xs mb-1">{t('sop_stage1')}</h3>
                      <p className="text-xs text-slate-500 mb-3">{t('sop_s1_desc')}</p>
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.basic} onChange={() => toggleChecklist('stage1', 'basic')} label={t('sop_s1_basic')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.size} onChange={() => toggleChecklist('stage1', 'size')} label={t('sop_s1_size')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                      <CheckboxItem checked={activeFile?.checklists?.stage1?.technique} onChange={() => toggleChecklist('stage1', 'technique')} label={t('sop_s1_technique')} isDisabled={activeFile?.stage !== 1} isCurrentStage={activeFile?.stage === 1} />
                    </section>
                    
                    <section className={\`bg-white border rounded-xl p-4 \${activeFile?.stage === 2 ? 'border-blue-400 ring-2 ring-blue-50' : ''}\`}>
                      <h3 className="font-bold text-xs mb-1">{t('sop_stage2')}</h3>
                      <p className="text-xs text-slate-500 mb-3">{t('sop_s2_desc')}</p>
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.format} onChange={() => toggleChecklist('stage2', 'format')} label={t('sop_s2_format')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.font} onChange={() => toggleChecklist('stage2', 'font')} label={t('sop_s2_font')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.resource} onChange={() => toggleChecklist('stage2', 'resource')} label={t('sop_s2_resource')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.spell} onChange={() => toggleChecklist('stage2', 'spell')} label={t('sop_s2_spell')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.dieline} onChange={() => toggleChecklist('stage2', 'dieline')} label={t('sop_s2_dieline')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                      <CheckboxItem checked={activeFile?.checklists?.stage2?.structure} onChange={() => toggleChecklist('stage2', 'structure')} label={t('sop_s2_structure')} isDisabled={activeFile?.stage !== 2} isCurrentStage={activeFile?.stage === 2} />
                    </section>
                    
                    <section className={\`bg-white border rounded-xl p-4 \${activeFile?.stage === 3 ? 'border-blue-400 ring-2 ring-blue-50' : ''}\`}>
                      <h3 className="font-bold text-xs mb-1">{t('sop_stage3')}</h3>
                      <p className="text-xs text-slate-500 mb-3">{t('sop_s3_desc')}</p>
                      <CheckboxItem checked={activeFile?.checklists?.stage3?.single} onChange={() => toggleChecklist('stage3', 'single')} label={t('sop_s3_single')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                      <CheckboxItem checked={activeFile?.checklists?.stage3?.cloud} onChange={() => toggleChecklist('stage3', 'cloud')} label={t('sop_s3_cloud')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                      <CheckboxItem checked={activeFile?.checklists?.stage3?.permission} onChange={() => toggleChecklist('stage3', 'permission')} label={t('sop_s3_permission')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                      <CheckboxItem checked={activeFile?.checklists?.stage3?.proof} onChange={() => toggleChecklist('stage3', 'proof')} label={t('sop_s3_proof')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                      <CheckboxItem checked={activeFile?.checklists?.stage3?.notice} onChange={() => toggleChecklist('stage3', 'notice')} label={t('sop_s3_notice')} isDisabled={activeFile?.stage !== 3} isCurrentStage={activeFile?.stage === 3} />
                    </section>

                    <section className={\`bg-white border rounded-xl p-4 \${activeFile?.stage === 4 ? 'border-rose-400 ring-2 ring-rose-50' : ''}\`}>
                      <h3 className="font-bold text-xs mb-1">{t('sop_stage4')}</h3>
                      <p className="text-xs text-rose-600 mb-3 font-medium">{t('sop_s4_desc')}</p>
                      <CheckboxItem checked={activeFile?.checklists?.stage4?.approved} onChange={() => toggleChecklist('stage4', 'approved')} label={t('sop_s4_approved')} isDisabled={activeFile?.stage !== 4} isCurrentStage={activeFile?.stage === 4} />
                      <CheckboxItem checked={activeFile?.checklists?.stage4?.logisticsInv} onChange={() => toggleChecklist('stage4', 'logisticsInv')} label={t('sop_s4_logistics_inv')} isDisabled={activeFile?.stage !== 4} isCurrentStage={activeFile?.stage === 4} />
                      <CheckboxItem checked={activeFile?.checklists?.stage4?.logisticsConf} onChange={() => toggleChecklist('stage4', 'logisticsConf')} label={t('sop_s4_logistics_conf')} isDisabled={activeFile?.stage !== 4} isCurrentStage={activeFile?.stage === 4} />
                    </section>
                  </div>`;
content = content.replace(oldSopRender, newSopRender);


// Return for Revision logic
const oldActionClick = `  const handleActionClick = () => {
    if (currentUser.role === 'designer') {
      setNotifyRecipients(activeProject?.defaultClientEmail || '');
      setPendingAction('review');
      setShowNotifyModal(true);
    } else if (currentUser.role === 'client') {
      setNotifyRecipients(activeProject?.defaultDesignerEmail || '');
      setPendingAction('approve');
      setShowNotifyModal(true);
    }
  };`;

const newActionClick = `  const handleActionClick = () => {
    if (currentUser.role === 'designer') {
      setNotifyRecipients(activeProject?.defaultClientEmail || '');
      setPendingAction('review');
      setShowNotifyModal(true);
    } else if (currentUser.role === 'client') {
      setNotifyRecipients(activeProject?.defaultDesignerEmail || '');
      setPendingAction('approve');
      setShowNotifyModal(true);
    }
  };

  const handleReturnRevision = () => {
    if (!window.confirm("確定要將此階段返還簽核退回嗎？")) return;
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
  };`;
content = content.replace(oldActionClick, newActionClick);

const oldNavbarBtnRender = `              {currentUser?.role !== 'observer' && activeProject?.status !== 'closed' && (
                <button onClick={handleActionClick} disabled={isSendingEmail} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm">
                  {isSendingEmail ? t('processing') : currentUser?.role === 'designer' ? t('send_review_notice') : t('approve_design')}
                </button>
              )}`;

const newNavbarBtnRender = `              {currentUser?.role !== 'observer' && activeProject?.status !== 'closed' && (
                <>
                  <button onClick={handleReturnRevision} disabled={isSendingEmail} className="bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-rose-100">
                    {t('return_for_revision')}
                  </button>
                  <button onClick={handleActionClick} disabled={isSendingEmail} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-blue-700">
                    {isSendingEmail ? t('processing') : currentUser?.role === 'designer' ? t('send_review_notice') : t('approve_design')}
                  </button>
                </>
              )}`;
content = content.replace(oldNavbarBtnRender, newNavbarBtnRender);


// Fix toggleChecklist function bounds
let toggleSopFnOld = `          if (category !== 'preDesign' && category !== \`stage\${f.stage}\`) return f;`;
let toggleSopFnNew = `          if (category !== \`stage\${f.stage}\`) return f;`;
content = content.replace(toggleSopFnOld, toggleSopFnNew);

fs.writeFileSync('c:\\Users\\User\\.gemini\\antigravity\\專業設計校稿平台\\design-sync-app\\src\\App.jsx', content);
