(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/App.jsx
  var import_react = __toESM(__require("react"), 1);
  var import_lucide_react = __require("lucide-react");
  var import_localforage = __toESM(__require("localforage"), 1);
  var pdfjsLib = window.pdfjsLib;
  var mockProjects = [
    {
      id: "PRJ-2023-001",
      title: "ATOJ\u79CB\u5B63\u65B0\u54C1\u5C08\u6848",
      client: "ATOJ",
      defaultClientEmail: "wang.manager@starbucks.com",
      defaultDesignerEmail: "design.lin@designsync.com",
      startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1e3).toISOString(),
      files: [
        {
          id: "FILE-001",
          name: "\u5916\u76D2\u4E3B\u8996\u89BA\u8A2D\u8A08_\u79CB\u5B63\u9650\u5B9A\u6700\u7D42\u7248_final_v2.eps",
          stage: 2,
          checklists: {
            preDesign: { text: true, logo: true, dieline: true },
            stage1: { structure: true, keyVisual: true },
            stage2: { brandColor: false, details: false, barcodeContent: false },
            stage3: { spelling: false, cmyk: false, dpi: false, bleed: false, safeZone: false, outline: false, vectorBarcode: false }
          },
          versions: [
            {
              versionNumber: 1,
              date: "2025-10-01",
              status: "approved",
              // Stage 1 已核准
              imageUrl: "https://images.unsplash.com/photo-1585644171281-5421da63309a?auto=format&fit=crop&w=1200&q=80",
              markers: [
                { id: 1, x: 45, y: 30, author: "\u738B\u7D93\u7406 (\u5BA2\u6236)", text: "\u7D50\u69CB\u6C92\u554F\u984C\uFF0C\u8ACB\u63A8\u9032\u7D30\u7BC0\u8A2D\u8A08\u3002", resolved: true, timestamp: "10:00 AM" }
              ]
            },
            {
              versionNumber: 2,
              date: "2025-10-03",
              status: "review",
              // 目前處於 Stage 2 審核中
              imageUrl: "https://images.unsplash.com/photo-1606168094336-40f0eba8307e?auto=format&fit=crop&w=1200&q=80",
              markers: [
                { id: 2, x: 60, y: 50, author: "\u9673\u7E3D\u76E3 (\u8001\u95C6)", text: "\u8272\u8ABF\u8207\u54C1\u724C\u898F\u7BC4\u4E00\u81F4\uFF0C\u689D\u78BC\u5340\u8ACB\u518D\u78BA\u8A8D\u3002", resolved: false, timestamp: "09:15 AM" }
              ]
            }
          ]
        },
        {
          id: "FILE-002",
          name: "\u5167\u896F\u7D50\u69CB\u5200\u6A21\u5716.ai",
          stage: 3,
          checklists: {
            preDesign: { text: true, logo: true, dieline: true },
            stage1: { structure: true, keyVisual: true },
            stage2: { brandColor: true, details: true, barcodeContent: true },
            stage3: { spelling: true, cmyk: true, dpi: true, bleed: true, safeZone: true, outline: true, vectorBarcode: true }
          },
          versions: [
            {
              versionNumber: 1,
              date: "2023-10-02",
              status: "approved",
              imageUrl: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=1200&q=80",
              markers: []
            }
          ]
        }
      ]
    }
  ];
  function App() {
    const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
    const [lang, setLang] = (0, import_react.useState)("zh");
    const t = (zhText, enText) => lang === "en" ? enText : zhText;
    const [projects, setProjects] = (0, import_react.useState)(mockProjects);
    const [isDataLoaded, setIsDataLoaded] = (0, import_react.useState)(false);
    const [activeProjectId, setActiveProjectId] = (0, import_react.useState)(null);
    const [activeFileId, setActiveFileId] = (0, import_react.useState)(null);
    const [activeVersionIndex, setActiveVersionIndex] = (0, import_react.useState)(0);
    const [appView, setAppView] = (0, import_react.useState)("auth");
    import_react.default.useEffect(() => {
      import_localforage.default.getItem("designSyncProjects").then((savedProjects) => {
        if (savedProjects && savedProjects.length > 0) {
          setProjects(savedProjects);
        }
        setIsDataLoaded(true);
      }).catch((err) => {
        console.error("\u8F09\u5165\u672C\u5730\u5B58\u6A94\u5931\u6557", err);
        setIsDataLoaded(true);
      });
    }, []);
    import_react.default.useEffect(() => {
      if (isDataLoaded) {
        import_localforage.default.setItem("designSyncProjects", projects).catch((err) => console.error("\u5BEB\u5165\u672C\u5730\u5B58\u6A94\u5931\u6557", err));
      }
    }, [projects, isDataLoaded]);
    const [activeTab, setActiveTab] = (0, import_react.useState)("comments");
    const [newMarker, setNewMarker] = (0, import_react.useState)(null);
    const [drawingMode, setDrawingMode] = (0, import_react.useState)("pin");
    const [dragBox, setDragBox] = (0, import_react.useState)(null);
    const [commentInput, setCommentInput] = (0, import_react.useState)("");
    const [zoomLevel, setZoomLevel] = (0, import_react.useState)(1);
    const [showDiff, setShowDiff] = (0, import_react.useState)(false);
    const [diffDataUrl, setDiffDataUrl] = (0, import_react.useState)(null);
    const [isComputingDiff, setIsComputingDiff] = (0, import_react.useState)(false);
    const diffCanvasRef = (0, import_react.useRef)(null);
    const [showShareModal, setShowShareModal] = (0, import_react.useState)(false);
    const [showUploadModal, setShowUploadModal] = (0, import_react.useState)(false);
    const [uploadingProgress, setUploadingProgress] = (0, import_react.useState)(0);
    const [toastMessage, setToastMessage] = (0, import_react.useState)("");
    const [showNewProjectModal, setShowNewProjectModal] = (0, import_react.useState)(false);
    const [newProjectTitle, setNewProjectTitle] = (0, import_react.useState)("");
    const [showNotifyModal, setShowNotifyModal] = (0, import_react.useState)(false);
    const [notifyRecipients, setNotifyRecipients] = (0, import_react.useState)("");
    const [pendingAction, setPendingAction] = (0, import_react.useState)(null);
    const [userNameInput, setUserNameInput] = (0, import_react.useState)("");
    const [userEmailInput, setUserEmailInput] = (0, import_react.useState)("");
    const [isSendingEmail, setIsSendingEmail] = (0, import_react.useState)(false);
    const [isComparing, setIsComparing] = (0, import_react.useState)(false);
    const [compareLeft, setCompareLeft] = (0, import_react.useState)(0);
    const [compareRight, setCompareRight] = (0, import_react.useState)(0);
    const imageRef = (0, import_react.useRef)(null);
    if (!isDataLoaded) {
      return /* @__PURE__ */ import_react.default.createElement("div", { className: "min-h-screen flex items-center justify-center font-bold text-slate-500 bg-slate-50" }, "\u8F09\u5165\u5C08\u6848\u8CC7\u6599\u4E2D...");
    }
    const activeProject = projects.find((p) => p.id === activeProjectId);
    const activeFile = activeProject?.files.find((f) => f.id === activeFileId);
    const activeVersion = activeFile?.versions[activeVersionIndex];
    const getElapsedDays = (startDateStr) => {
      const start = new Date(startDateStr);
      const now = /* @__PURE__ */ new Date();
      const diffTime = Math.abs(now - start);
      return Math.floor(diffTime / (1e3 * 60 * 60 * 24));
    };
    const copyToClipboard = (text, typeName) => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        showToast(`\u5DF2\u8907\u88FD${typeName}\uFF01(\u8A3B: \u5BE6\u969B\u7DB2\u5740\u9700\u642D\u914D\u5F8C\u7AEF\u8DEF\u7531\u529F\u80FD)`);
      } catch (err) {
        showToast("\u8907\u88FD\u5931\u6557\uFF0C\u8ACB\u624B\u52D5\u8907\u88FD\u9023\u7D50\u3002");
        console.error("Copy failed", err);
      }
    };
    const showToast = (message) => {
      setToastMessage(message);
      setTimeout(() => {
        setToastMessage("");
      }, 3500);
    };
    const handleLogin = (role) => {
      const defaultName = role === "designer" ? "\u8A2D\u8A08\u5E2B" : role === "client" ? "\u5BA2\u6236" : "\u89C0\u5BDF\u8005";
      const finalName = userNameInput.trim() !== "" ? userNameInput : defaultName;
      const finalEmail = userEmailInput.trim() !== "" ? userEmailInput : `${role}@designsync.com`;
      setCurrentUser({ role, name: finalName, email: finalEmail });
      setAppView("dashboard");
    };
    const handleCreateProjectSubmit = () => {
      if (!newProjectTitle.trim()) return;
      const newProj = {
        id: `PRJ-${Date.now()}`,
        title: newProjectTitle,
        client: currentUser.name,
        defaultClientEmail: `${currentUser.name}@client.com`,
        defaultDesignerEmail: currentUser.email,
        startDate: (/* @__PURE__ */ new Date()).toISOString(),
        files: []
      };
      setProjects([newProj, ...projects]);
      setShowNewProjectModal(false);
      setNewProjectTitle("");
      showToast("\u2705 \u5C08\u6848\u5EFA\u7ACB\u6210\u529F\uFF01");
    };
    const toggleChecklist = (category, key) => {
      if (currentUser.role !== "designer") return;
      setProjects((prev) => prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        return {
          ...p,
          files: p.files.map((f) => {
            if (f.id !== activeFileId) return f;
            if (category !== "preDesign" && category !== `stage${f.stage}`) return f;
            return {
              ...f,
              checklists: {
                ...f.checklists,
                [category]: {
                  ...f.checklists[category],
                  [key]: !f.checklists[category][key]
                }
              }
            };
          })
        };
      }));
    };
    const handleActionClick = () => {
      if (currentUser.role === "designer") {
        const cl = activeFile.checklists;
        const currentStage = activeFile.stage;
        if (!cl.preDesign.text || !cl.preDesign.logo || !cl.preDesign.dieline) {
          setActiveTab("sop");
          showToast("\u26A0\uFE0F \u963B\u64CB\u9001\u51FA\uFF1A\u8ACB\u5148\u78BA\u8A8D\u300C\u524D\u7F6E\u6280\u8853\u9700\u6C42 (Pre-Design)\u300D\u7686\u5DF2\u6253\u52FE\uFF01");
          return;
        }
        if (currentStage === 1) {
          if (!cl.stage1.structure || !cl.stage1.keyVisual) {
            setActiveTab("sop");
            showToast("\u26A0\uFE0F \u963B\u64CB\u9001\u51FA\uFF1AStage 1 \u8ACB\u78BA\u8A8D\u300C\u7D50\u69CB\u8207\u4F48\u5C40\u300D\u898F\u7BC4\u7686\u5DF2\u904E\u95DC\uFF01");
            return;
          }
        } else if (currentStage === 2) {
          if (!cl.stage2.brandColor || !cl.stage2.details || !cl.stage2.barcodeContent) {
            setActiveTab("sop");
            showToast("\u26A0\uFE0F \u963B\u64CB\u9001\u51FA\uFF1AStage 2 \u8ACB\u78BA\u8A8D\u300C\u7D30\u7BC0\u8207\u5167\u5BB9\u300D\u898F\u7BC4\u7686\u5DF2\u904E\u95DC\uFF01");
            return;
          }
        } else if (currentStage === 3) {
          if (!cl.stage3.spelling || !cl.stage3.cmyk || !cl.stage3.dpi || !cl.stage3.bleed || !cl.stage3.safeZone || !cl.stage3.outline || !cl.stage3.vectorBarcode) {
            setActiveTab("sop");
            showToast("\u{1F6D1} \u963B\u64CB\u9001\u51FA\uFF1A\u4EA4\u5EE0\u524D\u751F\u6B7B\u95DC\u982D\uFF01\u8ACB\u78BA\u5BE6\u52FE\u9078\u300C\u5370\u5237\u6280\u8853\u5F37\u5236\u78BA\u8A8D\u300D\uFF01");
            return;
          }
        }
        setNotifyRecipients(activeProject?.defaultClientEmail || "");
        setPendingAction("review");
        setShowNotifyModal(true);
      } else if (currentUser.role === "client") {
        setNotifyRecipients(activeProject?.defaultDesignerEmail || "");
        setPendingAction("approve");
        setShowNotifyModal(true);
      }
    };
    const confirmSendNotification = async () => {
      setShowNotifyModal(false);
      setIsSendingEmail(true);
      try {
        const subject = pendingAction === "review" ? `[\u8A2D\u8A08\u5BE9\u6838\u8ACB\u6C42] ${activeProject?.title} - Stage ${activeFile?.stage}` : `[\u8A2D\u8A08\u5DF2\u6838\u51C6] ${activeProject?.title}`;
        const body = pendingAction === "review" ? `\u60A8\u597D\uFF0C

\u5C08\u6848\u300C${activeProject?.title}\u300D\u7684\u6A94\u6848\u300C${activeFile?.name}\u300D\u76EE\u524D\u8655\u65BC Stage ${activeFile?.stage} \u968E\u6BB5\uFF0C\u9700\u8981\u60A8\u7684\u5BE9\u6838\u3002

\u8ACB\u9EDE\u64CA\u4E0B\u65B9\u9023\u7D50\u767B\u5165\u7CFB\u7D71\u6AA2\u8996\u6700\u65B0\u5167\u5BB9\u4E26\u7559\u4E0B\u610F\u898B\uFF1A
http://localhost:5173/?project=${activeProjectId}&file=${activeFileId}&role=reviewer

\u8B1D\u8B1D\uFF01

DesignSync \u7CFB\u7D71\u81EA\u52D5\u767C\u9001` : `\u60A8\u597D\uFF0C

\u5C08\u6848\u300C${activeProject?.title}\u300D\u7684\u6A94\u6848\u300C${activeFile?.name}\u300D\u5DF2\u7D93\u6838\u51C6\uFF01

\u60A8\u53EF\u9EDE\u64CA\u4E0B\u65B9\u9023\u7D50\u767B\u5165\u7CFB\u7D71\u67E5\u770B\u6700\u7D42\u7248\u672C\uFF1A
http://localhost:5173/?project=${activeProjectId}&file=${activeFileId}&role=observer

\u8B1D\u8B1D\uFF01

DesignSync \u7CFB\u7D71\u81EA\u52D5\u767C\u9001`;
        const response = await fetch("http://localhost:3001/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: notifyRecipients,
            subject,
            text: body
          })
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "\u7121\u6CD5\u9023\u7DDA\u5230\u5F8C\u7AEF\u5BC4\u4FE1\u4F3A\u670D\u5668\uFF0C\u8ACB\u78BA\u8A8D server.js \u662F\u5426\u555F\u52D5\uFF0C\u6216\u662F\u60A8\u7684 Gmail \u5BC6\u78BC\u662F\u5426\u6B63\u78BA\uFF01");
        }
        setIsSendingEmail(false);
        if (pendingAction === "review") {
          showToast(`\u{1F4E7} Stage ${activeFile.stage} \u5BE9\u6838\u901A\u77E5\u5DF2\u6210\u529F\u767C\u9001\u81F3\uFF1A${notifyRecipients}`);
        } else if (pendingAction === "approve") {
          setProjects((prev) => prev.map((p) => {
            if (p.id !== activeProjectId) return p;
            return {
              ...p,
              files: p.files.map((f) => {
                if (f.id !== activeFileId) return f;
                const currentStage2 = f.stage;
                const newStage = currentStage2 < 3 ? currentStage2 + 1 : 3;
                const updatedVersions = [...f.versions];
                updatedVersions[updatedVersions.length - 1] = {
                  ...updatedVersions[updatedVersions.length - 1],
                  status: "approved"
                };
                return { ...f, stage: newStage, versions: updatedVersions };
              })
            };
          }));
          const currentStage = activeFile.stage;
          if (currentStage >= 3) {
            showToast(`\u2705 \u6700\u7D42\u968E\u6BB5\u5DF2\u6838\u51C6\uFF01\u5C08\u6848\u5927\u529F\u544A\u6210\uFF0C\u5DF2\u901A\u77E5\uFF1A${notifyRecipients}`);
          } else {
            showToast(`\u2705 Stage ${currentStage} \u5DF2\u6838\u51C6\uFF01\u6A94\u6848\u81EA\u52D5\u63A8\u9032\u81F3 Stage ${currentStage + 1}\uFF0C\u5DF2\u901A\u77E5\uFF1A${notifyRecipients}`);
          }
        }
      } catch (error) {
        console.error("Email \u5BC4\u9001\u5931\u6557:", error);
        setIsSendingEmail(false);
        showToast("\u274C Email \u5BC4\u9001\u5931\u6557\uFF0C\u8ACB\u6AA2\u67E5 EmailJS \u8A2D\u5B9A\u3002");
      }
    };
    const handleRealFileUpload = async (e, projectId, isNewFile = false) => {
      if (e.persist) e.persist();
      const file = e.target.files[0];
      const inputElement = e.target;
      if (!file) return;
      const nameLower = file.name.toLowerCase();
      const isImage = file.type.startsWith("image/");
      const isAiEps = nameLower.endsWith(".ai") || nameLower.endsWith(".eps");
      const isPdf = nameLower.endsWith(".pdf");
      let imageUrl = "https://images.unsplash.com/photo-1616628188550-808682f3926d?auto=format&fit=crop&w=1200&q=80";
      if (!isNewFile) {
        setUploadingProgress(10);
        setShowUploadModal(true);
      }
      if (isImage) {
        imageUrl = URL.createObjectURL(file);
        if (!isNewFile) setUploadingProgress(50);
      } else if (isPdf) {
        try {
          if (!isNewFile) setUploadingProgress(30);
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const numPages = Math.min(pdf.numPages, 20);
          const canvases = [];
          let totalHeight = 0;
          let maxWidth = 0;
          for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            let viewport = page.getViewport({ scale: 1 });
            const maxCanvasWidth = 1600;
            if (viewport.width > maxCanvasWidth) {
              viewport = page.getViewport({ scale: maxCanvasWidth / viewport.width });
            } else {
              viewport = page.getViewport({ scale: 1.5 });
            }
            const canvas = document.createElement("canvas");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
            canvases.push(canvas);
            totalHeight += viewport.height;
            maxWidth = Math.max(maxWidth, viewport.width);
            if (!isNewFile) setUploadingProgress(30 + i / numPages * 50);
          }
          const finalCanvas = document.createElement("canvas");
          finalCanvas.width = maxWidth;
          finalCanvas.height = totalHeight;
          const ctx = finalCanvas.getContext("2d");
          let currentY = 0;
          canvases.forEach((c) => {
            ctx.drawImage(c, 0, currentY);
            currentY += c.height;
          });
          imageUrl = finalCanvas.toDataURL("image/jpeg", 0.82);
          if (!isNewFile) setUploadingProgress(85);
          showToast(`\u2705 PDF (${numPages} \u9801) \u5DF2\u6210\u529F\u5408\u4F75\u70BA\u9810\u89BD\u5716\uFF01`);
        } catch (err) {
          console.error("PDF \u89E3\u6790\u5931\u6557:", err);
          imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/400px-PDF_file_icon.svg.png";
          alert(`\u26A0\uFE0F PDF \u89E3\u6790\u5931\u6557\u3002
\u7CFB\u7D71\u5DF2\u5957\u7528\u9810\u8A2D\u5716\u793A\u63D0\u4F9B\u7559\u8A00\u529F\u80FD\u3002\u8ACB\u78BA\u8A8D\u6A94\u6848\u6C92\u6709\u640D\u6BC0\u6216\u5BC6\u78BC\u8A2D\u5B9A\u3002`);
        }
      } else if (isAiEps) {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/512px-Adobe_Illustrator_CC_icon.svg.png";
        alert(`\u26A0\uFE0F \u60A8\u4E0A\u50B3\u4E86 ${file.name}\u3002
\u7DB2\u9801\u700F\u89BD\u5668\u7121\u6CD5\u76F4\u63A5\u986F\u793A AI/EPS \u5411\u91CF\u6A94\uFF0C\u7CFB\u7D71\u5DF2\u81EA\u52D5\u66FF\u63DB\u70BA\u300CAI \u6A94\u6848\u5716\u793A\u300D\u4F9B\u60A8\u6A19\u8A18\u7559\u8A00\u3002

\u82E5\u9700\u8B93\u5BA2\u6236\u770B\u898B\u771F\u5BE6\u8A2D\u8A08\uFF0C\u8ACB\u4E00\u4F75\u532F\u51FA\u4E0A\u50B3 JPG/PNG \u9810\u89BD\u5716\uFF01`);
      }
      if (isNewFile) {
        const newFile = {
          id: `FILE-${Date.now()}`,
          name: file.name,
          stage: 1,
          checklists: {
            preDesign: { text: false, logo: false, dieline: false },
            stage1: { structure: false, keyVisual: false },
            stage2: { brandColor: false, details: false, barcodeContent: false },
            stage3: { spelling: false, cmyk: false, dpi: false, bleed: false, safeZone: false, outline: false, vectorBarcode: false }
          },
          versions: [{
            versionNumber: 1,
            date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            status: "review",
            imageUrl,
            uploader: currentUser?.name || "\u672A\u77E5",
            markers: []
          }]
        };
        setProjects((prev) => prev.map((p) => p.id === projectId ? { ...p, files: [...p.files, newFile] } : p));
        showToast("\u2705 \u6A94\u6848\u4E0A\u50B3\u6210\u529F\uFF0C\u8ACB\u958B\u59CB\u9032\u884C Stage 1 \u6821\u5C0D\u3002");
      } else {
        setUploadingProgress(100);
        setTimeout(() => {
          setProjects((prevData) => prevData.map((p) => {
            if (p.id !== activeProjectId) return p;
            return {
              ...p,
              files: p.files.map((f) => {
                if (f.id !== activeFileId) return f;
                const newVerNum = f.versions.length + 1;
                return {
                  ...f,
                  versions: [...f.versions, {
                    versionNumber: newVerNum,
                    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                    status: "review",
                    imageUrl,
                    uploader: currentUser?.name || "\u672A\u77E5",
                    markers: []
                  }]
                };
              })
            };
          }));
          setShowUploadModal(false);
          setUploadingProgress(0);
          setActiveVersionIndex(activeFile.versions.length);
        }, 500);
      }
      inputElement.value = null;
    };
    const openFile = (projectId, fileId) => {
      setActiveProjectId(projectId);
      setActiveFileId(fileId);
      const file = projects.find((p) => p.id === projectId).files.find((f) => f.id === fileId);
      setActiveVersionIndex(file.versions.length - 1);
      setCompareLeft(file.versions.length > 1 ? file.versions.length - 2 : 0);
      setCompareRight(file.versions.length - 1);
      setIsComparing(false);
      setAppView("editor");
      setNewMarker(null);
    };
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
        img.onerror = reject;
        img.src = src;
      });
      try {
        const [imgA, imgB] = await Promise.all([loadImage(leftUrl), loadImage(rightUrl)]);
        const W = Math.max(imgA.naturalWidth, imgB.naturalWidth);
        const H = Math.max(imgA.naturalHeight, imgB.naturalHeight);
        const canvas = document.createElement("canvas");
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(imgA, 0, 0, W, H);
        const dataA = ctx.getImageData(0, 0, W, H);
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(imgB, 0, 0, W, H);
        const dataB = ctx.getImageData(0, 0, W, H);
        const out = ctx.createImageData(W, H);
        let diffPixels = 0;
        for (let i = 0; i < dataA.data.length; i += 4) {
          const dr = Math.abs(dataA.data[i] - dataB.data[i]);
          const dg = Math.abs(dataA.data[i + 1] - dataB.data[i + 1]);
          const db = Math.abs(dataA.data[i + 2] - dataB.data[i + 2]);
          const diff = (dr + dg + db) / 3;
          if (diff > 12) {
            out.data[i] = 255;
            out.data[i + 1] = 50;
            out.data[i + 2] = 0;
            out.data[i + 3] = Math.min(230, 100 + diff * 2);
          } else {
            out.data[i] = out.data[i + 1] = out.data[i + 2] = out.data[i + 3] = 0;
          }
        }
        ctx.putImageData(out, 0, 0);
        setDiffDataUrl(canvas.toDataURL("image/png"));
      } catch (e) {
        console.error("Diff failed", e);
      }
      setIsComputingDiff(false);
    };
    const deleteVersion = (versionIndex) => {
      if (!window.confirm(t("\u78BA\u5B9A\u8981\u522A\u9664\u6B64\u7248\u672C\u55CE\uFF1F\u6B64\u64CD\u4F5C\u7121\u6CD5\u9084\u539F\u3002", "Delete this version? This cannot be undone."))) return;
      setProjects((prev) => prev.map((p) => p.id !== activeProjectId ? p : {
        ...p,
        files: p.files.map((f) => f.id !== activeFileId ? f : {
          ...f,
          versions: f.versions.filter((_, i) => i !== versionIndex)
        })
      }));
      setActiveVersionIndex(0);
    };
    const exportData = () => {
      const backup = {
        projects,
        version: "1.0",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `design-sync-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showToast(t("\u2705 \u8CC7\u6599\u5099\u4EFD\u4E0B\u8F09\u6210\u529F\uFF01", "\u2705 Backup downloaded!"));
    };
    const importData = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data && Array.isArray(data.projects)) {
            if (window.confirm(t("\u9019\u5C07\u8986\u84CB\u73FE\u6709\u8CC7\u6599\uFF0C\u78BA\u5B9A\u8981\u7E7C\u7E8C\u55CE\uFF1F", "This will overwrite existing data. Continue?"))) {
              setProjects(data.projects);
              showToast(t("\u2705 \u8CC7\u6599\u9084\u539F\u6210\u529F\uFF01", "\u2705 Restore successful!"));
            }
          } else {
            alert(t("\u683C\u5F0F\u932F\u8AA4\uFF1A\u975E\u6709\u6548\u7684\u5099\u4EFD\u6A94\u6848\u3002", "Invalid format: not a valid backup file."));
          }
        } catch (err) {
          alert(t("\u8B80\u53D6\u6A94\u6848\u5931\u6557\u3002", "Failed to read file."));
        }
      };
      reader.readAsText(file);
      e.target.value = null;
    };
    const handlePointerDown = (e) => {
      if (!imageRef.current || currentUser.role === "observer") return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      if (drawingMode === "box") {
        setDragBox({ startX: x, startY: y, currentX: x, currentY: y });
        setNewMarker(null);
      } else {
        setNewMarker({ type: "pin", x, y });
        setCommentInput("");
        setActiveTab("comments");
      }
    };
    const handlePointerMove = (e) => {
      if (dragBox && drawingMode === "box" && imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        setDragBox((prev) => ({ ...prev, currentX: Math.max(0, Math.min(100, x)), currentY: Math.max(0, Math.min(100, y)) }));
      }
    };
    const handlePointerUp = () => {
      if (dragBox && drawingMode === "box") {
        const width = Math.abs(dragBox.currentX - dragBox.startX);
        const height = Math.abs(dragBox.currentY - dragBox.startY);
        if (width > 2 && height > 2) {
          const x = Math.min(dragBox.startX, dragBox.currentX);
          const y = Math.min(dragBox.startY, dragBox.currentY);
          setNewMarker({ type: "box", x, y, width, height });
          setActiveTab("comments");
          setCommentInput("");
        } else if (width <= 2 && height <= 2) {
          setNewMarker({ type: "pin", x: dragBox.startX, y: dragBox.startY });
          setActiveTab("comments");
          setCommentInput("");
        }
        setDragBox(null);
      }
    };
    const submitComment = () => {
      if (!commentInput.trim() && !newMarker) return;
      const newComment = {
        id: Date.now(),
        type: newMarker?.type || "pin",
        x: newMarker ? newMarker.x : null,
        y: newMarker ? newMarker.y : null,
        width: newMarker?.width || null,
        height: newMarker?.height || null,
        author: `${currentUser.name} (${currentUser.role === "designer" ? "\u8A2D\u8A08\u5E2B" : currentUser.role === "client" ? "\u5BA2\u6236" : "\u8001\u95C6"})`,
        text: commentInput,
        resolved: false,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setProjects((prev) => prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        return {
          ...p,
          files: p.files.map((f) => {
            if (f.id !== activeFileId) return f;
            return {
              ...f,
              versions: f.versions.map((v, i) => {
                if (i !== activeVersionIndex) return v;
                return { ...v, markers: [...v.markers, newComment] };
              })
            };
          })
        };
      }));
      setNewMarker(null);
      setCommentInput("");
    };
    const toggleResolve = (markerId) => {
      if (currentUser.role === "observer") return;
      setProjects((prev) => prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        return {
          ...p,
          files: p.files.map((f) => {
            if (f.id !== activeFileId) return f;
            return {
              ...f,
              versions: f.versions.map((v, i) => {
                if (i !== activeVersionIndex) return v;
                return {
                  ...v,
                  markers: v.markers.map((m) => m.id === markerId ? { ...m, resolved: !m.resolved } : m)
                };
              })
            };
          })
        };
      }));
    };
    const CheckboxItem = ({ checked, onChange, label, description, isDisabled, isCurrentStage }) => /* @__PURE__ */ import_react.default.createElement("label", { className: `flex items-start gap-3 ${!isDisabled && currentUser?.role === "designer" ? "cursor-pointer group" : ""} ${isDisabled ? "opacity-40 select-none" : ""}` }, /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "checkbox",
        disabled: isDisabled || currentUser?.role !== "designer",
        checked,
        onChange,
        className: `mt-1 w-4 h-4 rounded border-slate-300 focus:ring-blue-500 disabled:opacity-50 ${isCurrentStage ? "text-blue-600" : "text-slate-400"}`
      }
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ import_react.default.createElement("span", { className: `text-sm font-medium ${isCurrentStage ? "text-slate-800" : "text-slate-600"} ${!isDisabled && currentUser?.role === "designer" ? "group-hover:text-blue-700" : ""}` }, label), description && /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-slate-500 mt-0.5" }, description)));
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "designsync-app-root w-full min-h-screen bg-slate-50 font-sans text-slate-800 relative" }, appView === "auth" && /* @__PURE__ */ import_react.default.createElement("div", { className: "min-h-screen bg-slate-100 flex items-center justify-center p-4 relative" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute top-6 right-8 flex gap-1 bg-white rounded-full shadow-sm p-1" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setLang("zh"), className: `px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${lang === "zh" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}` }, "\u4E2D\u6587"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setLang("en"), className: `px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${lang === "en" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}` }, "EN")), /* @__PURE__ */ import_react.default.createElement("div", { className: "max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-blue-600 p-8 text-center" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-3xl font-bold text-white mb-2" }, t("DesignSync \u5C08\u696D\u6821\u7A3F\u7CFB\u7D71", "DesignSync Proofing System")), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-blue-100 mb-6" }, t("\u8ACB\u9078\u64C7\u60A8\u7684\u8EAB\u5206\u9032\u5165\u7CFB\u7D71\uFF0C\u4E0D\u540C\u8EAB\u5206\u5C07\u64C1\u6709\u4E0D\u540C\u6B0A\u9650\u3002", "Please select your role. Different roles have different permissions.")), /* @__PURE__ */ import_react.default.createElement("div", { className: "max-w-md mx-auto text-left flex gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-white text-sm font-medium mb-1" }, t("\u986F\u793A\u540D\u7A31\uFF1A", "Display Name:")), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "text",
        value: userNameInput,
        onChange: (e) => setUserNameInput(e.target.value),
        placeholder: "\u4F8B: \u738B\u7D93\u7406, \u8A2D\u8A08\u90E8 Lin...",
        className: "w-full px-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-white text-sm font-medium mb-1" }, t("\u806F\u7D61 Email\uFF1A", "Contact Email:")), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "email",
        value: userEmailInput,
        onChange: (e) => setUserEmailInput(e.target.value),
        placeholder: "name@company.com",
        className: "w-full px-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
      }
    )))), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-8 grid grid-cols-1 md:grid-cols-3 gap-6" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => handleLogin("designer"), className: "flex flex-col items-center p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Settings, { size: 32 })), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-lg font-bold text-slate-800 mb-2" }, t("\u6211\u662F\u8A2D\u8A08\u5E2B", "I am a Designer")), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-sm text-slate-500 text-center" }, t("\u53EF\u4E0A\u50B3\u6A94\u6848\u3001\u5EFA\u7ACB\u5C08\u6848\u3001\u7BA1\u7406 SOP \u6AA2\u6838\u8868\u3001\u56DE\u8986\u5BA2\u6236\u3002", "Upload files, manage projects, handle SOP checklists, reply to clients."))), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => handleLogin("client"), className: "flex flex-col items-center p-6 border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageSquare, { size: 32 })), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-lg font-bold text-slate-800 mb-2" }, t("\u6211\u662F\u5BA2\u6236/\u6C7A\u7B56\u8005", "I am a Client / Decision Maker")), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-sm text-slate-500 text-center" }, t("\u53EF\u4F7F\u7528\u5716\u91D8\u7559\u8A00\u3001\u5BE9\u6838\u901A\u904E\u9000\u56DE\u3001\u6AA2\u8996\u7248\u672C\u5DEE\u7570\u3002", "Leave pin comments, approve or reject, compare versions."))), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => handleLogin("observer"), className: "flex flex-col items-center p-6 border-2 border-slate-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { size: 32 })), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-lg font-bold text-slate-800 mb-2" }, t("\u6211\u662F\u89C0\u5BDF\u8005 (\u8001\u95C6)", "I am an Observer (Boss)")), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-sm text-slate-500 text-center" }, t("\u50C5\u80FD\u700F\u89BD\u6A94\u6848\u3001\u95B1\u8B80\u7559\u8A00\u8207\u9032\u5EA6\uFF0C\u7121\u6CD5\u9032\u884C\u4FEE\u6539\u8207\u7559\u8A00\u3002", "View files, read comments and progress. Cannot make changes or leave comments.")))))), appView === "dashboard" && /* @__PURE__ */ import_react.default.createElement("div", { className: "min-h-screen bg-slate-50 flex flex-col" }, /* @__PURE__ */ import_react.default.createElement("header", { className: "bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold" }, "HY"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "font-bold text-xl text-slate-800" }, t("\u5C08\u6848\u7E3D\u89BD (Dashboard)", "Projects Dashboard"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-4 text-sm" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-1 bg-slate-100 rounded-full p-1 mr-4" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setLang("zh"), className: `px-3 py-1 rounded-full text-xs font-bold transition-colors ${lang === "zh" ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-800"}` }, "\u4E2D\u6587"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setLang("en"), className: `px-3 py-1 rounded-full text-xs font-bold transition-colors ${lang === "en" ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-800"}` }, "EN")), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-500" }, t("\u76EE\u524D\u8EAB\u5206:", "Role:")), /* @__PURE__ */ import_react.default.createElement("span", { className: `px-3 py-1 rounded-full font-medium ${currentUser?.role === "designer" ? "bg-blue-100 text-blue-700" : currentUser?.role === "client" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"}` }, currentUser?.name), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setAppView("auth"), className: "text-slate-400 hover:text-slate-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.LogOut, { size: 18 })))), /* @__PURE__ */ import_react.default.createElement("main", { className: "flex-1 p-8 max-w-7xl mx-auto w-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mb-8" }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-2xl font-bold text-slate-800" }, t("\u6211\u7684\u5C08\u6848", "My Projects")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center bg-white rounded-lg border border-slate-200 p-1 shadow-sm mr-2 group" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: exportData,
        className: "p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all flex items-center gap-1.5",
        title: t("\u532F\u51FA\u5099\u4EFD (JSON)", "Export Backup")
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Download, { size: 16 }),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs font-medium hidden group-hover:inline" }, t("\u5099\u4EFD", "Backup"))
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-px h-4 bg-slate-200 mx-1" }), /* @__PURE__ */ import_react.default.createElement("label", { className: "p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-all flex items-center gap-1.5 cursor-pointer", title: t("\u9084\u539F\u8CC7\u6599", "Restore Data") }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Upload, { size: 16 }), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs font-medium hidden group-hover:inline" }, t("\u9084\u539F", "Restore")), /* @__PURE__ */ import_react.default.createElement("input", { type: "file", className: "hidden", accept: ".json", onChange: importData }))), currentUser?.role === "designer" && /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setShowNewProjectModal(true), className: "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-sm" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Plus, { size: 16 }), " ", t("\u65B0\u589E\u5C08\u6848", "New Project")))), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, projects.map((proj) => /* @__PURE__ */ import_react.default.createElement("div", { key: proj.id, className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-lg text-slate-800" }, proj.title), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-sm text-slate-500 mt-1" }, proj.client, " \xB7 ID: ", proj.id)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-sm font-medium text-slate-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Calendar, { size: 16, className: "text-blue-500" }), t("\u5DF2\u57F7\u884C ", "Active for "), getElapsedDays(proj.startDate), t(" \u5929", " days"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-6" }, /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-sm font-bold text-slate-700 mb-4 flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.FolderOpen, { size: 16 }), " ", t("\u5305\u542B\u6A94\u6848", "Included Files"), " (", proj.files.length, ")"), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, proj.files.map((file) => /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        key: file.id,
        onClick: () => openFile(proj.id, file.id),
        className: "border border-slate-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group relative flex flex-col justify-between"
      },
      /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-start mb-2 w-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 text-slate-800 font-medium min-w-0 w-full" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.FileImage, { size: 20, className: "text-blue-500 shrink-0" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "truncate flex-1", title: file.name }, file.name))), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-3 mb-4 bg-slate-50 p-2.5 rounded-md border border-slate-100" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between text-xs mb-1.5 font-medium" }, /* @__PURE__ */ import_react.default.createElement("span", { className: file.stage === 3 ? "text-emerald-600" : "text-slate-600" }, file.stage === 1 ? t("Stage 1: \u7D50\u69CB\u4F48\u5C40", "Stage 1: Structure") : file.stage === 2 ? t("Stage 2: \u7D30\u7BC0\u5167\u5BB9", "Stage 2: Details") : t("Stage 3: \u5370\u5237\u9810\u6AA2", "Stage 3: Pre-flight")), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-400" }, t("\u968E\u6BB5 ", "Stage "), file.stage, "/3")), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-full bg-slate-200 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `h-full transition-all duration-500 ${file.stage === 1 ? "w-1/3 bg-blue-400" : file.stage === 2 ? "w-2/3 bg-blue-500" : "w-full bg-emerald-500"}` })))),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-end mt-auto" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-xs text-slate-500" }, t("\u6700\u65B0\u7248\u672C:", "Latest Version:"), " ", /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold text-slate-700 text-sm pl-1" }, "V", file.versions[file.versions.length - 1]?.versionNumber || 1), file.versions[file.versions.length - 1]?.uploader && /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] text-slate-400 font-normal ml-1" }, "(", t("\u7531 ", "By "), file.versions[file.versions.length - 1].uploader, t(" \u63D0\u4F9B", ""), ")")), /* @__PURE__ */ import_react.default.createElement("span", { className: `text-xs px-2 py-1 rounded-full ${file.versions[file.versions.length - 1]?.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"}` }, file.versions[file.versions.length - 1]?.status === "approved" ? t("\u5DF2\u6838\u51C6", "Approved") : t("\u6821\u7A3F\u4E2D", "In Review")))
    )), currentUser?.role === "designer" && /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("input", { type: "file", id: `upload-new-${proj.id}`, className: "hidden", accept: "image/*,.pdf,.ai,.eps", onChange: (e) => handleRealFileUpload(e, proj.id, true) }), /* @__PURE__ */ import_react.default.createElement(
      "label",
      {
        htmlFor: `upload-new-${proj.id}`,
        className: "border border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 cursor-pointer h-full min-h-[140px] transition-colors"
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Plus, { size: 24, className: "mb-2" }),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm font-medium" }, t("\u4E0A\u50B3\u65B0\u6A94\u6848", "Upload New File"))
    ))))))))), appView === "editor" && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex h-screen bg-slate-50 font-sans text-slate-800" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-4 shadow-sm" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setAppView("dashboard"), className: "p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ArrowLeft, { size: 20 })), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-8 w-px bg-slate-300 mx-1" }), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h1", { className: "font-bold text-sm text-slate-800" }, activeFile?.name), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500" }, activeProject?.title))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-100 rounded-lg p-1 flex relative items-center" }, !isComparing ? /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-1" }, activeFile?.versions.map((v, idx) => /* @__PURE__ */ import_react.default.createElement("div", { key: v.versionNumber, className: "flex flex-col items-center group/vtab" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          setActiveVersionIndex(idx);
          setNewMarker(null);
        },
        className: `px-4 py-1 flex-1 text-sm font-bold rounded-md transition-all ${activeVersionIndex === idx ? "bg-white shadow-sm border border-slate-200 text-blue-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"}`
      },
      "V",
      v.versionNumber
    ), activeFile?.versions?.length > 1 && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          deleteVersion(idx);
        },
        className: "ml-0.5 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover/vtab:opacity-100 transition-opacity rounded",
        title: t("\u522A\u9664\u6B64\u7248\u672C", "Delete this version")
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Trash2, { size: 11 })
    )), activeVersionIndex === idx && v.uploader && /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[9px] text-slate-400 mt-0.5 whitespace-nowrap font-medium" }, "\u7531 ", v.uploader, " \u63D0\u4F9B"))), activeFile?.versions?.length > 1 && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setIsComparing(true),
        className: "ml-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-md flex items-center gap-1 border border-slate-200 bg-white shadow-sm"
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Columns, { size: 14 }),
      " ",
      t("\u6BD4\u8F03\u7248\u672C", "Compare")
    )) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 px-2 text-sm font-medium" }, /* @__PURE__ */ import_react.default.createElement("select", { value: compareLeft, onChange: (e) => setCompareLeft(Number(e.target.value)), className: "bg-white border border-slate-300 rounded px-2 py-1 outline-none" }, activeFile?.versions.map((v, i) => /* @__PURE__ */ import_react.default.createElement("option", { key: i, value: i }, "V", v.versionNumber))), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-400" }, "vs"), /* @__PURE__ */ import_react.default.createElement("select", { value: compareRight, onChange: (e) => setCompareRight(Number(e.target.value)), className: "bg-white border border-slate-300 rounded px-2 py-1 outline-none" }, activeFile?.versions.map((v, i) => /* @__PURE__ */ import_react.default.createElement("option", { key: i, value: i }, "V", v.versionNumber))), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => {
      setIsComparing(false);
      setShowDiff(false);
      setDiffDataUrl(null);
    }, className: "ml-2 px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded border border-red-200" }, t("\u96E2\u958B\u6BD4\u8F03", "Exit Compare")), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-px h-5 bg-slate-300 mx-1" }), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          setShowDiff((v) => !v);
          if (!diffDataUrl) computeVisualDiff();
        },
        disabled: isComputingDiff,
        className: `px-3 py-1 rounded border text-xs font-bold flex items-center gap-1 transition-all ${showDiff ? "bg-rose-600 text-white border-rose-700" : "bg-white text-slate-600 border-slate-300 hover:bg-rose-50 hover:text-rose-700"}`
      },
      isComputingDiff ? /* @__PURE__ */ import_react.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" }), t("\u5206\u6790\u4E2D...", "Analyzing...")) : showDiff ? t("\u96B1\u85CF\u5DEE\u7570", "Hide Diff") : t("\u986F\u793A\u5DEE\u7570", "Show Diff")
    ))), !isComparing && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setShowUploadModal(true),
        className: "bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-slate-700 flex items-center gap-2 ml-2 shadow-sm font-bold"
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Upload, { size: 14 }),
      " ",
      t("\u66F4\u65B0\u7248\u672C", "Upload Version")
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-1 bg-slate-100 rounded-full p-0.5 mr-2" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setLang("zh"), className: `px-2 py-1 rounded-full text-[10px] font-bold ${lang === "zh" ? "bg-white shadow text-blue-600" : "text-slate-500"}` }, "\u4E2D"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setLang("en"), className: `px-2 py-1 rounded-full text-[10px] font-bold ${lang === "en" ? "bg-white shadow text-blue-600" : "text-slate-500"}` }, "EN")), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setShowShareModal(true),
        className: "border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-50 flex items-center gap-2 font-medium"
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Share2, { size: 14 }),
      " ",
      t("\u9080\u8ACB/\u5206\u4EAB", "Share")
    ), currentUser?.role !== "observer" && /* @__PURE__ */ import_react.default.createElement("button", { onClick: handleActionClick, disabled: isSendingEmail, className: "bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 font-medium disabled:opacity-70 flex items-center gap-2 transition-all shadow-sm" }, isSendingEmail ? /* @__PURE__ */ import_react.default.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), " ", t("\u8655\u7406\u4E2D...", "Processing...")) : currentUser?.role === "designer" ? t("\u9001\u51FA\u5BE9\u6838\u901A\u77E5", "Send Review Request") : t("\u5B8C\u6210\u6821\u7A3F (Approve)", "Approve Design")), !isComparing && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 border border-slate-200" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setZoomLevel((z) => Math.max(0.5, +(z - 0.25).toFixed(2))), disabled: zoomLevel <= 0.5, className: "w-7 h-7 rounded flex items-center justify-center text-slate-700 hover:bg-white disabled:opacity-30 text-lg font-bold leading-none", title: t("\u7E2E\u5C0F", "Zoom Out") }, "-"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs font-bold text-slate-600 min-w-[36px] text-center" }, Math.round(zoomLevel * 100), "%"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setZoomLevel((z) => Math.min(4, +(z + 0.25).toFixed(2))), disabled: zoomLevel >= 4, className: "w-7 h-7 rounded flex items-center justify-center text-slate-700 hover:bg-white disabled:opacity-30 text-lg font-bold leading-none", title: t("\u653E\u5927", "Zoom In") }, "+"), zoomLevel !== 1 && /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setZoomLevel(1), className: "text-[10px] text-slate-500 hover:text-blue-600 px-1 font-medium" }, t("\u91CD\u7F6E", "Reset"))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 flex overflow-hidden mt-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `flex-1 bg-slate-200 p-8 overflow-auto relative flex justify-center items-start ${isComparing ? "gap-4 flex-row" : ""}` }, /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: `bg-white shadow-2xl rounded-sm border border-slate-300 relative group ${isComparing ? "w-1/2 cursor-default" : `max-w-4xl w-full ${currentUser?.role === "observer" ? "cursor-default" : "cursor-crosshair"}`}`,
        style: !isComparing && zoomLevel !== 1 ? { transform: `scale(${zoomLevel})`, transformOrigin: "top center", transition: "transform 0.15s ease" } : {}
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute -top-8 left-0 right-0 flex justify-between text-sm text-slate-500 font-medium px-2" }, isComparing ? /* @__PURE__ */ import_react.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { size: 14 }), " ", t("\u6BD4\u8F03\u6A21\u5F0F (\u5DE6): V", "Compare Mode (Left): V"), activeFile?.versions[compareLeft]?.versionNumber) : currentUser?.role === "observer" ? /* @__PURE__ */ import_react.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { size: 14 }), " ", t("\u89C0\u5BDF\u6A21\u5F0F (\u50C5\u4F9B\u700F\u89BD)", "Observer Mode (Read Only)")) : /* @__PURE__ */ import_react.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MousePointerClick, { size: 14 }), " ", t("\u9EDE\u64CA\u5716\u7247\u4EFB\u610F\u8655\u65B0\u589E\u6A19\u8A3B (\u76EE\u524D\u6AA2\u8996 V", "Click to drag or add marker (Viewing V"), activeVersion?.versionNumber || 1, ")"), !isComparing && activeVersionIndex !== (activeFile?.versions?.length || 1) - 1 && /* @__PURE__ */ import_react.default.createElement("span", { className: "bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full border border-orange-200" }, t("\u6B63\u5728\u89C0\u770B\u820A\u7248\u672C", "Viewing old version"))),
      !isComparing && currentUser?.role !== "observer" && /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-slate-200 p-1 flex gap-1 z-30" }, /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          onClick: () => setDrawingMode("pin"),
          className: `p-2 rounded ${drawingMode === "pin" ? "bg-blue-100 text-blue-600" : "text-slate-600 hover:bg-slate-100"}`,
          title: t("\u5716\u91D8 (\u9EDE\u64CA\u6A19\u8A18\u55AE\u9EDE)", "Pin (Click to mark point)")
        },
        /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MousePointerClick, { size: 16 })
      ), /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          onClick: () => setDrawingMode("box"),
          className: `p-2 rounded ${drawingMode === "box" ? "bg-blue-100 text-blue-600" : "text-slate-600 hover:bg-slate-100"}`,
          title: t("\u65B9\u6846 (\u62D6\u66F3\u6A19\u8A18\u7BC4\u570D)", "Box (Drag to mark area)")
        },
        /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Square, { size: 16 })
      )),
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: "relative w-full",
          onPointerDown: isComparing ? void 0 : handlePointerDown,
          onPointerMove: isComparing ? void 0 : handlePointerMove,
          onPointerUp: isComparing ? void 0 : handlePointerUp,
          onPointerLeave: isComparing ? void 0 : handlePointerUp,
          ref: imageRef,
          style: { touchAction: "none" }
        },
        /* @__PURE__ */ import_react.default.createElement(
          "img",
          {
            src: isComparing ? activeFile?.versions[compareLeft]?.imageUrl : activeVersion?.imageUrl,
            alt: "Design File",
            className: "w-full h-auto block select-none pointer-events-none",
            draggable: "false"
          }
        ),
        (isComparing ? activeFile?.versions[compareLeft] : activeVersion)?.markers?.map((marker, idx) => {
          if (marker.type === "box") {
            return /* @__PURE__ */ import_react.default.createElement(
              "div",
              {
                key: marker.id,
                className: `absolute border-2 z-10 transition-all cursor-pointer group hover:opacity-100 ${marker.resolved ? "border-emerald-500 bg-emerald-500/10 opacity-70" : "border-rose-500 bg-rose-500/20 shadow-[0_0_0_2px_rgba(244,63,94,0.3)]"}`,
                style: { left: `${marker.x}%`, top: `${marker.y}%`, width: `${marker.width}%`, height: `${marker.height}%` },
                onClick: (e) => {
                  if (isComparing) return;
                  e.stopPropagation();
                  setActiveTab("comments");
                }
              },
              /* @__PURE__ */ import_react.default.createElement("div", { className: `absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md transition-transform group-hover:scale-110 ${marker.resolved ? "bg-emerald-500" : "bg-rose-500"}` }, idx + 1)
            );
          }
          return /* @__PURE__ */ import_react.default.createElement(
            "div",
            {
              key: marker.id,
              className: `absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform hover:scale-110 cursor-pointer ${marker.resolved ? "bg-emerald-500 opacity-70" : "bg-red-500 ring-4 ring-red-500/30"}`,
              style: { left: `${marker.x}%`, top: `${marker.y}%` },
              onClick: (e) => {
                if (isComparing) return;
                e.stopPropagation();
                setActiveTab("comments");
              }
            },
            idx + 1
          );
        }),
        !isComparing && dragBox && drawingMode === "box" && /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            className: "absolute border-2 border-blue-500 bg-blue-500/20 z-10 pointer-events-none",
            style: {
              left: `${Math.min(dragBox.startX, dragBox.currentX)}%`,
              top: `${Math.min(dragBox.startY, dragBox.currentY)}%`,
              width: `${Math.abs(dragBox.currentX - dragBox.startX)}%`,
              height: `${Math.abs(dragBox.currentY - dragBox.startY)}%`
            }
          }
        ),
        !isComparing && newMarker && newMarker.type === "box" && /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            className: "absolute border-2 border-amber-500 bg-amber-500/20 z-20 pointer-events-none animate-pulse",
            style: { left: `${newMarker.x}%`, top: `${newMarker.y}%`, width: `${newMarker.width}%`, height: `${newMarker.height}%` }
          }
        ),
        !isComparing && newMarker && (!newMarker.type || newMarker.type === "pin") && /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            className: "absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg ring-4 ring-blue-500/40 animate-pulse pointer-events-none z-20",
            style: { left: `${newMarker.x}%`, top: `${newMarker.y}%` }
          },
          "+"
        )
      )
    ), isComparing && /* @__PURE__ */ import_react.default.createElement("div", { className: "w-1/2 bg-white shadow-2xl rounded-sm border border-slate-300 relative group cursor-default" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute -top-8 left-0 right-0 flex justify-between text-sm text-slate-500 font-medium px-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { size: 14 }), " ", t("\u6BD4\u8F03\u6A21\u5F0F (\u53F3): V", "Compare Mode (Right): V"), activeFile?.versions[compareRight]?.versionNumber)), /* @__PURE__ */ import_react.default.createElement("div", { className: "relative w-full" }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: activeFile?.versions[compareRight]?.imageUrl,
        alt: "Design File Right",
        className: "w-full h-auto block select-none",
        draggable: "false"
      }
    ), showDiff && diffDataUrl && /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: diffDataUrl,
        alt: "diff overlay",
        className: "absolute inset-0 w-full h-full pointer-events-none",
        style: { mixBlendMode: "normal", opacity: 0.85 }
      }
    ), showDiff && diffDataUrl && /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute top-2 right-2 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-md" }, t("\u5DEE\u7570\u6A19\u793A", "Diff Highlighted")), activeFile?.versions[compareRight]?.markers?.map((marker, idx) => /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        key: marker.id,
        className: `absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${marker.resolved ? "bg-emerald-500 opacity-70" : "bg-red-500 ring-4 ring-red-500/30"}`,
        style: { left: `${marker.x}%`, top: `${marker.y}%` }
      },
      idx + 1
    ))))), /* @__PURE__ */ import_react.default.createElement("div", { className: `w-[400px] bg-white border-l border-slate-200 flex flex-col shadow-xl z-10 ${isComparing ? "hidden" : ""}` }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex border-b border-slate-200 bg-slate-50" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: `flex-1 py-3.5 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === "comments" ? "text-blue-600 bg-white border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"}`,
        onClick: () => setActiveTab("comments")
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageSquare, { size: 16 }),
      " ",
      t("\u8A0E\u8AD6\u8207\u7559\u8A00", "Comments"),
      " (",
      activeVersion?.markers?.length || 0,
      ")"
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: `flex-1 py-3.5 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === "sop" ? "text-blue-600 bg-white border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"}`,
        onClick: () => setActiveTab("sop")
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ShieldCheck, { size: 16 }),
      " ",
      t("\u968E\u6BB5 SOP \u6AA2\u6838", "Stage SOP Checklist")
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 overflow-y-auto p-5" }, activeTab === "comments" && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col h-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 overflow-y-auto space-y-4 pb-4" }, (!activeVersion?.markers || activeVersion.markers.length === 0) && !newMarker ? /* @__PURE__ */ import_react.default.createElement("div", { className: "text-center py-10 text-slate-400 flex flex-col items-center" }, currentUser?.role === "observer" ? /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { size: 32, className: "mb-2 opacity-50" }) : /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MousePointerClick, { size: 32, className: "mb-2 opacity-50" }), /* @__PURE__ */ import_react.default.createElement("p", { className: "mt-2 text-sm" }, currentUser?.role === "observer" ? t("\u6B64\u7248\u672C\u76EE\u524D\u6C92\u6709\u7559\u8A00", "No comments on this version yet") : t("\u9EDE\u64CA\u5716\u7247\u5373\u53EF\u9488\u5C0D\u7279\u5B9A\u4F4D\u7F6E\u7559\u8A00", "Click the image to pin a comment at a specific location"))) : activeVersion?.markers?.map((marker, idx) => /* @__PURE__ */ import_react.default.createElement("div", { key: marker.id, className: `p-4 rounded-xl border ${marker.resolved ? "bg-slate-50 border-slate-200" : "bg-white border-slate-200 shadow-sm"}` }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-start mb-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${marker.resolved ? "bg-emerald-500" : "bg-red-500"}` }, idx + 1), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-semibold text-sm text-slate-800" }, marker.author)), currentUser?.role !== "observer" && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => toggleResolve(marker.id),
        className: `p-1.5 rounded-md text-xs font-medium flex items-center gap-1 ${marker.resolved ? "bg-slate-200 text-slate-600 hover:bg-slate-300" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"}`
      },
      marker.resolved ? /* @__PURE__ */ import_react.default.createElement(import_lucide_react.CheckSquare, { size: 14 }) : /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Circle, { size: 14 }),
      marker.resolved ? t("\u5DF2\u89E3\u6C7A", "Resolved") : t("\u6A19\u793A\u89E3\u6C7A", "Mark Resolved")
    )), /* @__PURE__ */ import_react.default.createElement("p", { className: `text-sm mt-2 ${marker.resolved ? "text-slate-500 line-through" : "text-slate-700"}` }, marker.text), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] text-slate-400 mt-2 block" }, marker.timestamp))), newMarker && /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 rounded-xl bg-blue-50 border border-blue-200 shadow-sm animate-fade-in" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm font-semibold text-blue-800 flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold" }, "+"), t("\u65B0\u589E\u6A19\u8A3B\u4F4D\u7F6E", "New annotation")), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setNewMarker(null), className: "text-blue-400 hover:text-blue-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.X, { size: 16 }))))), currentUser?.role !== "observer" && /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-auto pt-4 border-t border-slate-200 bg-white" }, /* @__PURE__ */ import_react.default.createElement(
      "textarea",
      {
        className: "w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24",
        placeholder: newMarker ? t("\u8F38\u5165\u9488\u5C0D\u6A19\u8A18\u9EDE\u7684\u4FEE\u6539\u610F\u898B...", "Enter your comment for this annotation...") : t("\u4E00\u822C\u7559\u8A00\uFF08\u4E0D\u6307\u5B9A\u4F4D\u7F6E\uFF09...", "General comment (no specific location)..."),
        value: commentInput,
        onChange: (e) => setCommentInput(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), submitComment())
      }
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-end mt-2" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: submitComment,
        disabled: !commentInput.trim() && !newMarker,
        className: "bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
      },
      t("\u9001\u51FA\u7559\u8A00", "Submit"),
      " ",
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Send, { size: 14 })
    )))), activeTab === "sop" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-8 pb-8" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-xl flex items-start gap-3 shadow-sm" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Info, { size: 20, className: "shrink-0 mt-0.5 text-blue-600" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold mb-1" }, t("\u5F37\u5236\u968E\u6BB5\u6AA2\u6838\u9598\u9580", "Mandatory Stage Gate")), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-slate-600 leading-relaxed" }, t("\u70BA\u9632\u6B62\u7121\u6548\u5F80\u8FD4\uFF0C\u9001\u51FA\u5BE9\u6838\u524D\u7CFB\u7D71\u5C07\u5F37\u5236\u9A57\u8B49\u300C\u7576\u524D\u968E\u6BB5\u300D\u7684 SOP\u3002\u672A\u5230\u968E\u6BB5\u4E4B\u9805\u76EE\u5C07\u88AB\u9396\u5B9A\u4EE5\u9632\u5206\u5FC3\u3002", "To prevent rework, the system forces SOP verification before submission. Items not yet at stage are locked.")))), /* @__PURE__ */ import_react.default.createElement("section", { className: "bg-white border border-slate-200 rounded-xl p-5 shadow-sm" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs font-bold" }, "0"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-slate-800 text-sm" }, t("\u524D\u7F6E\u6280\u8853\u9700\u6C42\u6E05\u55AE (Pre-Design)", "Pre-Design Checklist"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-4 pl-8 border-l-2 border-slate-100 ml-3" }, /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.preDesign?.text || false,
        onChange: () => toggleChecklist("preDesign", "text"),
        label: t("\u63D0\u4F9B\u6700\u7D42\u7248\u6587\u5B57\u7A3F", "Provide final copy / text content"),
        description: t("\u907F\u514D\u8A2D\u8A08\u5B8C\u6210\u5F8C\u624D\u767C\u73FE\u8B66\u544A\u8A9E\u591A\u51FA\u4E09\u884C", "Avoid discovering extra warning lines after design is complete"),
        isDisabled: false,
        isCurrentStage: true
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.preDesign?.logo || false,
        onChange: () => toggleChecklist("preDesign", "logo"),
        label: t("\u63D0\u4F9B\u5411\u91CF Logo (.ai / .eps / .svg)", "Provide vector Logo (.ai / .eps / .svg)"),
        isDisabled: false,
        isCurrentStage: true
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.preDesign?.dieline || false,
        onChange: () => toggleChecklist("preDesign", "dieline"),
        label: t("\u78BA\u8A8D\u6B63\u78BA\u7684\u5200\u6A21\u7DDA (Dieline)", "Confirm correct Dieline structure"),
        isDisabled: false,
        isCurrentStage: true
      }
    ))), /* @__PURE__ */ import_react.default.createElement("section", { className: `bg-white border rounded-xl p-5 shadow-sm transition-all ${activeFile?.stage === 1 ? "border-blue-400 ring-4 ring-blue-50" : "border-slate-200"}` }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${activeFile?.stage >= 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-400"}` }, "1"), /* @__PURE__ */ import_react.default.createElement("h3", { className: `font-bold text-sm ${activeFile?.stage >= 1 ? "text-blue-900" : "text-slate-400"}` }, "Stage 1: ", t("\u7D50\u69CB\u8207\u4F48\u5C40 (Structure & Layout)", "Structure & Layout")), activeFile?.stage === 1 && /* @__PURE__ */ import_react.default.createElement("span", { className: "ml-auto text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-1 rounded" }, t("\u7576\u524D\u968E\u6BB5", "Current Stage"))), /* @__PURE__ */ import_react.default.createElement("div", { className: `space-y-4 pl-8 border-l-2 ml-3 ${activeFile?.stage >= 1 ? "border-blue-100" : "border-slate-100"}` }, /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage1?.structure || false,
        onChange: () => toggleChecklist("stage1", "structure"),
        label: t("\u76D2\u5B50\u5F62\u72C0\u8207\u647A\u758A\u4F4D\u7F6E\u6B63\u78BA", "Box shape and fold positions are correct"),
        description: t("\u78BA\u4FDD\u5927\u6846\u67B6\u6B63\u78BA\uFF0C\u907F\u514D\u5F8C\u671F\u8B8A\u52D5\u5200\u6A21", "Ensure the main structure is correct to avoid late dieline changes"),
        isDisabled: activeFile?.stage !== 1,
        isCurrentStage: activeFile?.stage === 1
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage1?.keyVisual || false,
        onChange: () => toggleChecklist("stage1", "keyVisual"),
        label: t("\u4E3B\u8996\u89BA\u91CD\u653E\u4F4D\u7F6E\u78BA\u8A8D", "Confirm key visual placement"),
        isDisabled: activeFile?.stage !== 1,
        isCurrentStage: activeFile?.stage === 1
      }
    ))), /* @__PURE__ */ import_react.default.createElement("section", { className: `bg-white border rounded-xl p-5 shadow-sm transition-all ${activeFile?.stage === 2 ? "border-blue-400 ring-4 ring-blue-50" : "border-slate-200"}` }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${activeFile?.stage >= 2 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-400"}` }, activeFile?.stage < 2 ? /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Lock, { size: 14 }) : "2"), /* @__PURE__ */ import_react.default.createElement("h3", { className: `font-bold text-sm ${activeFile?.stage >= 2 ? "text-blue-900" : "text-slate-400"}` }, "Stage 2: ", t("\u7D30\u7BC0\u8207\u5167\u5BB9 (Details & Content)", "Details & Content")), activeFile?.stage === 2 && /* @__PURE__ */ import_react.default.createElement("span", { className: "ml-auto text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-1 rounded" }, t("\u7576\u524D\u968E\u6BB5", "Current Stage"))), /* @__PURE__ */ import_react.default.createElement("div", { className: `space-y-4 pl-8 border-l-2 ml-3 ${activeFile?.stage >= 2 ? "border-blue-100" : "border-slate-100"}` }, /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage2?.brandColor || false,
        onChange: () => toggleChecklist("stage2", "brandColor"),
        label: t("\u5B57\u9AD4\u984F\u8272\u8207\u54C1\u724C\u898F\u7BC4\u4E00\u81F4", "Font colors match brand guidelines"),
        isDisabled: activeFile?.stage !== 2,
        isCurrentStage: activeFile?.stage === 2
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage2?.details || false,
        onChange: () => toggleChecklist("stage2", "details"),
        label: t("\u5716\u6848\u7D30\u7BC0\u6B63\u78BA", "Artwork details are correct"),
        isDisabled: activeFile?.stage !== 2,
        isCurrentStage: activeFile?.stage === 2
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage2?.barcodeContent || false,
        onChange: () => toggleChecklist("stage2", "barcodeContent"),
        label: t("\u689D\u78BC\u8207 QR Code \u5167\u5BB9\u78BA\u8A8D\u7121\u8AA4", "Barcode and QR Code content verified"),
        isDisabled: activeFile?.stage !== 2,
        isCurrentStage: activeFile?.stage === 2
      }
    ))), /* @__PURE__ */ import_react.default.createElement("section", { className: `bg-white border rounded-xl p-5 shadow-sm transition-all ${activeFile?.stage === 3 ? "border-rose-400 ring-4 ring-rose-50" : "border-slate-200"}` }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${activeFile?.stage >= 3 ? "bg-rose-600 text-white" : "bg-slate-200 text-slate-400"}` }, activeFile?.stage < 3 ? /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Lock, { size: 14 }) : "3"), /* @__PURE__ */ import_react.default.createElement("h3", { className: `font-bold text-sm ${activeFile?.stage >= 3 ? "text-rose-900" : "text-slate-400"}` }, "Stage 3: ", t("\u5370\u5237\u9810\u6AA2 (Technical Checklist)", "Technical Pre-flight Checklist")), activeFile?.stage === 3 && /* @__PURE__ */ import_react.default.createElement("span", { className: "ml-auto text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-2 py-1 rounded" }, t("\u751F\u6B7B\u95DC\u982D", "Critical!"))), /* @__PURE__ */ import_react.default.createElement("div", { className: `space-y-6 pl-8 border-l-2 ml-3 ${activeFile?.stage >= 3 ? "border-rose-100" : "border-slate-100"}` }, /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react.default.createElement("h4", { className: `text-xs font-bold uppercase tracking-wider ${activeFile?.stage >= 3 ? "text-rose-700" : "text-slate-400"}` }, t("\u8272\u5F69\u8207\u5F71\u50CF", "Color & Image")), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage3?.cmyk || false,
        onChange: () => toggleChecklist("stage3", "cmyk"),
        label: t("\u8272\u5F69\u6A21\u5F0F\u70BA CMYK (\u56B4\u7981 RGB)", "Color mode is CMYK (RGB prohibited)"),
        description: t("\u82E5\u6709\u54C1\u724C\u8272\uFF0C\u9700\u5DF2\u6A19\u8A3B Pantone \u8272\u865F", "If using brand colors, Pantone codes must be specified"),
        isDisabled: activeFile?.stage !== 3,
        isCurrentStage: activeFile?.stage === 3
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage3?.dpi || false,
        onChange: () => toggleChecklist("stage3", "dpi"),
        label: t("\u5F71\u50CF\u89E3\u6790\u5EA6\u9054 300 DPI \u4EE5\u4E0A", "Image resolution is 300 DPI or above"),
        description: t("(\u65BC 100% \u7E2E\u653E\u6642)", "(at 100% scale)"),
        isDisabled: activeFile?.stage !== 3,
        isCurrentStage: activeFile?.stage === 3
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react.default.createElement("h4", { className: `text-xs font-bold uppercase tracking-wider ${activeFile?.stage >= 3 ? "text-rose-700" : "text-slate-400"}` }, t("\u7248\u9762\u8207\u7D50\u69CB", "Layout & Structure")), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage3?.bleed || false,
        onChange: () => toggleChecklist("stage3", "bleed"),
        label: t("\u51FA\u8840 (Bleed) \u8A2D\u5B9A\u6B63\u78BA", "Bleed is set correctly"),
        description: t("\u6240\u6709\u80CC\u666F\u5716\u6848\u9700\u5EF6\u4F38\u81F3\u5200\u6A21\u7DDA\u5916\u81F3\u5C11 3mm (0.125&quot;)", 'All backgrounds must extend at least 3mm (0.125") beyond the dieline'),
        isDisabled: activeFile?.stage !== 3,
        isCurrentStage: activeFile?.stage === 3
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage3?.safeZone || false,
        onChange: () => toggleChecklist("stage3", "safeZone"),
        label: t("\u5B89\u5168\u5340 (Safe Zone) \u5408\u898F", "Safe Zone is compliant"),
        description: t("\u95DC\u9375\u8CC7\u8A0A (Logo\u3001\u8B66\u544A\u8A9E) \u9700\u8DDD\u96E2\u5200\u6A21\u7DDA\u6216\u647A\u75D5 3-5mm", "Key info (Logo, warnings) must be 3-5mm from dielines/folds"),
        isDisabled: activeFile?.stage !== 3,
        isCurrentStage: activeFile?.stage === 3
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage3?.outline || false,
        onChange: () => toggleChecklist("stage3", "outline"),
        label: t("\u5B57\u9AD4\u7686\u5DF2\u8F49\u8DEF\u5F91 (Outlining)", "All fonts converted to outlines"),
        description: t("\u4EA4\u4ED8\u6700\u7D42\u7A3F\u524D\u5FC5\u9808\u8F49\u5916\u6846\uFF0C\u9632\u6B62\u5370\u5237\u7AEF\u63F4\u5B57", "Must outline fonts before final delivery to prevent missing fonts at print"),
        isDisabled: activeFile?.stage !== 3,
        isCurrentStage: activeFile?.stage === 3
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react.default.createElement("h4", { className: `text-xs font-bold uppercase tracking-wider ${activeFile?.stage >= 3 ? "text-rose-700" : "text-slate-400"}` }, t("\u6587\u5B57\u8207\u689D\u78BC", "Text & Barcodes")), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage3?.spelling || false,
        onChange: () => toggleChecklist("stage3", "spelling"),
        label: t("\u6587\u5B57\u62FC\u5BEB\u8207\u8B66\u544A\u8A9E\u5927\u5C0F\u5408\u898F", "Text spelling and warning label size compliant"),
        isDisabled: activeFile?.stage !== 3,
        isCurrentStage: activeFile?.stage === 3
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      CheckboxItem,
      {
        checked: activeFile?.checklists?.stage3?.vectorBarcode || false,
        onChange: () => toggleChecklist("stage3", "vectorBarcode"),
        label: t("\u689D\u78BC\u8207 QR Code \u70BA\u5411\u91CF\u683C\u5F0F", "Barcode and QR Code are vector format"),
        description: t("\u4E14\u5DF2\u6E2C\u8A66\u63C3\u63CF\u5F8C\u5167\u5BB9\u6B63\u78BA", "And has been scanned to verify the content is correct"),
        isDisabled: activeFile?.stage !== 3,
        isCurrentStage: activeFile?.stage === 3
      }
    ))))))))), showNewProjectModal && /* @__PURE__ */ import_react.default.createElement("div", { className: "fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setShowNewProjectModal(false), className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.X, { size: 20 })), /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-xl font-bold mb-4" }, t("\u5EFA\u7ACB\u65B0\u5C08\u6848", "Create New Project")), /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-6" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-2" }, t("\u5C08\u6848\u540D\u7A31", "Project Name")), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "text",
        value: newProjectTitle,
        onChange: (e) => setNewProjectTitle(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && handleCreateProjectSubmit(),
        placeholder: t("\u4F8B\u5982\uFF1A2024 \u6625\u5B63\u5305\u88DD\u8A2D\u8A08...", "e.g., 2024 Spring Packaging Design..."),
        autoFocus: true,
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-end gap-2" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setShowNewProjectModal(false), className: "px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg" }, t("\u53D6\u6D88", "Cancel")), /* @__PURE__ */ import_react.default.createElement("button", { onClick: handleCreateProjectSubmit, disabled: !newProjectTitle.trim(), className: "px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" }, t("\u5EFA\u7ACB", "Create"))))), showNotifyModal && /* @__PURE__ */ import_react.default.createElement("div", { className: "fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setShowNotifyModal(false), className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.X, { size: 20 })), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-3 mb-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Mail, { size: 20 })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-lg font-bold text-slate-800" }, pendingAction === "review" ? t("\u767C\u9001\u5BE9\u6838\u901A\u77E5", "Send Review Notification") : t("\u767C\u9001\u6838\u51C6\u901A\u77E5", "Send Approval Notification")), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500" }, t("\u78BA\u8A8D\u8981\u5BC4\u9001 Email \u901A\u77E5\u7684\u4EBA\u54E1\u540D\u55AE", "Confirm the recipient list for the email notification")))), /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-6" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-2" }, t("\u6536\u4EF6\u4EBA Email (\u53EF\u8F38\u5165\u591A\u7B46\uFF0C\u4EE5\u9017\u865F\u5206\u9694)", "Recipient Email (multiple, comma separated)")), /* @__PURE__ */ import_react.default.createElement(
      "textarea",
      {
        value: notifyRecipients,
        onChange: (e) => setNotifyRecipients(e.target.value),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 text-sm resize-none",
        placeholder: t("\u8F38\u5165 Email...", "Enter Email...")
      }
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-3" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs font-medium text-slate-500 mb-2" }, t("\u5C08\u6848\u9810\u8A2D\u6210\u54E1 (\u9EDE\u64CA\u52A0\u5165)\uFF1A", "Project default members (click to add):")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-wrap gap-2" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          if (!notifyRecipients.includes(activeProject?.defaultClientEmail)) {
            setNotifyRecipients((prev) => prev ? `${prev}, ${activeProject?.defaultClientEmail}` : activeProject?.defaultClientEmail);
          }
        },
        className: "text-xs px-2.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 flex items-center gap-1"
      },
      "\u{1F464} ",
      t("\u5BA2\u6236\u7A97\u53E3", "Client Contact")
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          if (!notifyRecipients.includes(activeProject?.defaultDesignerEmail)) {
            setNotifyRecipients((prev) => prev ? `${prev}, ${activeProject?.defaultDesignerEmail}` : activeProject?.defaultDesignerEmail);
          }
        },
        className: "text-xs px-2.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 flex items-center gap-1"
      },
      "\u{1F58C}\uFE0F ",
      t("\u8A2D\u8A08\u8CA0\u8CAC\u4EBA", "Lead Designer")
    )))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-end gap-2" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setShowNotifyModal(false), className: "px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg" }, t("\u53D6\u6D88", "Cancel")), /* @__PURE__ */ import_react.default.createElement("button", { onClick: confirmSendNotification, disabled: !notifyRecipients.trim(), className: "px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Send, { size: 14 }), " ", t("\u78BA\u8A8D\u9001\u51FA", "Send"))))), showShareModal && /* @__PURE__ */ import_react.default.createElement("div", { className: "fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative" }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setShowShareModal(false), className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.X, { size: 20 })), /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-xl font-bold mb-6 flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Share2, { size: 24, className: "text-blue-600" }), " ", t("\u9080\u8ACB\u6210\u54E1\u53C3\u8207\u5BE9\u6838", "Invite Members to Review")), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "border border-slate-200 rounded-lg p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mb-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold text-emerald-700 text-sm flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageSquare, { size: 14 }), " ", t("\u5BE9\u6838\u8005\u9023\u7D50 (\u5BA2\u6236\u7AEF)", "Reviewer Link (Client)"))), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mb-2" }, t("\u5141\u8A31\u65B0\u589E\u6A19\u8A3B\u3001\u56DE\u8986\u7559\u8A00\u3001\u6838\u51C6\u6A94\u6848\u3002", "Can add annotations, reply to comments, approve files.")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react.default.createElement("input", { type: "text", readOnly: true, value: `https://designsync.app/p/${activeFileId}?role=reviewer`, className: "flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-600 outline-none" }), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => copyToClipboard(`https://designsync.app/p/${activeFileId}?role=reviewer`, t("\u5BA2\u6236\u9023\u7D50", "Client Link")), className: "bg-slate-800 text-white px-3 py-1 rounded text-xs hover:bg-slate-700 flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Copy, { size: 12 }), " ", t("\u8907\u88FD", "Copy")))), /* @__PURE__ */ import_react.default.createElement("div", { className: "border border-slate-200 rounded-lg p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mb-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold text-purple-700 text-sm flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { size: 14 }), " ", t("\u89C0\u5BDF\u8005\u9023\u7D50 (\u8001\u95C6/\u5167\u90E8)", "Observer Link (Boss / Internal)"))), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mb-2" }, t("\u50C5\u80FD\u700F\u89BD\u6A94\u6848\u8207\u8A0E\u8AD6\u9032\u5EA6\uFF0C\u7121\u6CD5\u7559\u8A00\u7834\u58DE\u7D50\u69CB\u3002", "Can only view files and progress. Cannot leave comments.")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react.default.createElement("input", { type: "text", readOnly: true, value: `https://designsync.app/p/${activeFileId}?role=observer`, className: "flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-600 outline-none" }), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => copyToClipboard(`https://designsync.app/p/${activeFileId}?role=observer`, t("\u89C0\u5BDF\u8005\u9023\u7D50", "Observer Link")), className: "bg-slate-800 text-white px-3 py-1 rounded text-xs hover:bg-slate-700 flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Copy, { size: 12 }), " ", t("\u8907\u88FD", "Copy"))))))), showUploadModal && /* @__PURE__ */ import_react.default.createElement("div", { className: "fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative" }, !uploadingProgress && /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setShowUploadModal(false), className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.X, { size: 20 })), /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-xl font-bold mb-2" }, t("\u4E0A\u50B3\u65B0\u7248\u672C", "Upload New Version"), " (V", activeFile?.versions?.length ? activeFile.versions.length + 1 : 1, ")"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-sm text-slate-500 mb-6" }, t("\u820A\u7248\u672C\u8207\u5176\u7559\u8A00\u5C07\u6703\u88AB\u5C01\u5B58\u4FDD\u7559\uFF0C\u4F9B\u96A8\u6642\u67E5\u95B1\u3002", "Old versions and their comments will be archived for later reference.")), uploadingProgress > 0 ? /* @__PURE__ */ import_react.default.createElement("div", { className: "py-10 text-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-blue-600 h-3 rounded-full transition-all duration-300", style: { width: `${uploadingProgress}%` } })), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-sm font-medium text-slate-700" }, uploadingProgress < 50 ? t("\u6B63\u5728\u8B80\u53D6\u6A94\u6848...", "Reading file...") : t("\u6B63\u5728\u8655\u7406\u9810\u89BD\u8F49\u63DB...", "Converting preview..."), " ", uploadingProgress, "%")) : /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("input", { type: "file", id: "modal-file-upload", className: "hidden", accept: "image/*,.pdf,.ai,.eps", onChange: (e) => handleRealFileUpload(e, activeProjectId, false) }), /* @__PURE__ */ import_react.default.createElement(
      "label",
      {
        htmlFor: "modal-file-upload",
        className: "border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-colors"
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Upload, { size: 48, className: "text-blue-500 mb-4" }),
      /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-lg text-slate-700 mb-1" }, t("\u9EDE\u64CA\u9078\u64C7\u771F\u5BE6\u6A94\u6848", "Click to Select File")),
      /* @__PURE__ */ import_react.default.createElement("p", { className: "text-sm text-slate-500 mb-4" }, t("\u652F\u63F4 .ai, .eps, .pdf, .psd, .jpg, .png", "Supports .ai, .eps, .pdf, .psd, .jpg, .png")),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white border border-blue-100 p-3 rounded-lg flex items-start gap-3 text-left w-full shadow-sm" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Info, { size: 16, className: "text-blue-500 mt-0.5 shrink-0" }), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, /* @__PURE__ */ import_react.default.createElement("strong", null, t("\u771F\u5BE6\u6A94\u6848\u6E2C\u8A66\uFF1A", "Real file test:")), /* @__PURE__ */ import_react.default.createElement("br", null), t("\u60A8\u53EF\u4EE5\u4E0A\u50B3\u771F\u5BE6\u5716\u7247(.png/.jpg)\u3002\u82E5\u4E0A\u50B3\u5411\u91CF\u5716(.eps/.ai)\uFF0C\u700F\u89BD\u5668\u5C07\u81EA\u52D5\u5957\u7528\u9810\u8A2D\u7684\u300C\u8F49\u63DB\u9810\u89BD\u5716\u300D", "You can upload real images (.png/.jpg). Vector files (.eps/.ai) will use a placeholder icon to simulate conversion.")))
    )))), toastMessage && /* @__PURE__ */ import_react.default.createElement("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg z-[110] text-sm font-medium transition-all duration-300 transform translate-y-0 opacity-100" }, toastMessage));
  }
})();
