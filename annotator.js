const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageFiles = document.getElementById("imageFiles");
const imageFolder = document.getElementById("imageFolder");
const split = document.getElementById("split");
const status = document.getElementById("status");
const filename = document.getElementById("filename");
const counter = document.getElementById("counter");
const thumbs = document.getElementById("thumbs");
const currentLabel = document.getElementById("currentLabel");
const state = { frames: [], labels: {}, index: 0, image: null, mode: "box", start: null, draft: null };
const STORAGE_KEY = "screwdriver-tip-annotations-v1";

function setStatus(message, kind = "") { status.textContent = message; status.dataset.kind = kind; }
function labelKey(file) { return `${split.value}:${file.name}`; }
function loadSavedLabels() {
  try { const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); state.labels = parsed.labels || {}; }
  catch { state.labels = {}; }
}
function saveLabels() { localStorage.setItem(STORAGE_KEY, JSON.stringify({ labels: state.labels })); }
function revokeFrames() { state.frames.forEach((frame) => URL.revokeObjectURL(frame.url)); }
async function loadProjectFrames() {
  try {
    const base = "./training/dataset/images/unlabeled/";
    const response = await fetch(`${base}${encodeURIComponent("拧紧-manifest.csv")}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const names = (await response.text()).split(/\r?\n/).slice(1).map((line) => line.split(",")[0]?.trim()).filter(Boolean);
    revokeFrames();
    state.frames = names.map((name) => ({ file: { name, webkitRelativePath: "" }, url: `${base}${encodeURIComponent(name)}` }));
    state.index = 0;
    renderThumbs();
    loadFrame();
    setStatus(`已加载拧紧视频的 ${state.frames.length} 张抽帧。`, "ok");
  } catch (error) {
    setStatus(`项目抽帧加载失败：${error.message}。也可以使用“导入图片文件夹”。`, "error");
  }
}
function importFiles(files) {
  revokeFrames();
  state.frames = [...files].filter((file) => file.type.startsWith("image/")).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })).map((file) => ({ file, url: URL.createObjectURL(file) }));
  state.index = 0;
  renderThumbs();
  loadFrame();
  setStatus(`已加载 ${state.frames.length} 张图片。`, "ok");
}
function currentFrame() { return state.frames[state.index]; }
function loadFrame() {
  const frame = currentFrame();
  if (!frame) { canvas.width = 0; canvas.height = 0; filename.textContent = "-"; counter.textContent = "0 / 0"; currentLabel.textContent = "当前：未标注"; return; }
  const image = new Image();
  image.onload = () => { state.image = image; canvas.width = image.naturalWidth; canvas.height = image.naturalHeight; draw(); updatePanel(); };
  image.src = frame.url;
}
function getLabel() { const frame = currentFrame(); return frame ? state.labels[labelKey(frame.file)] || null : null; }
function updatePanel() {
  const frame = currentFrame();
  if (!frame) return;
  const label = getLabel();
  filename.textContent = frame.file.webkitRelativePath || frame.file.name;
  counter.textContent = `${state.index + 1} / ${state.frames.length}`;
  currentLabel.textContent = label?.negative ? "当前：负样本（无枪头或不可判断）" : label?.box && label?.tip ? "当前：已完成枪体框 + 批头末端" : label?.box ? "当前：已画枪体框，请点击批头末端" : "当前：未标注";
  [...thumbs.children].forEach((node, index) => node.classList.toggle("active", index === state.index));
  [...thumbs.children].forEach((node, index) => node.classList.toggle("done", Boolean(state.labels[labelKey(state.frames[index].file)])));
}
function renderThumbs() {
  thumbs.innerHTML = "";
  state.frames.forEach((frame, index) => { const button = document.createElement("button"); button.type = "button"; button.className = "thumb"; button.title = frame.file.name; button.innerHTML = `<img src="${frame.url}" alt="" />`; button.addEventListener("click", () => { commitDraft(); state.index = index; loadFrame(); }); thumbs.appendChild(button); });
}
function draw() {
  if (!state.image) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(state.image, 0, 0);
  const label = getLabel();
  if (label?.box) { ctx.strokeStyle = "#f4a340"; ctx.lineWidth = Math.max(4, canvas.width / 500); ctx.strokeRect(label.box.x * canvas.width, label.box.y * canvas.height, label.box.w * canvas.width, label.box.h * canvas.height); }
  if (label?.tip) { ctx.fillStyle = "#ef4d4d"; ctx.beginPath(); ctx.arc(label.tip.x * canvas.width, label.tip.y * canvas.height, Math.max(7, canvas.width / 180), 0, Math.PI * 2); ctx.fill(); }
  if (state.draft?.box) { ctx.strokeStyle = "#f4a340"; ctx.setLineDash([10, 7]); ctx.lineWidth = Math.max(4, canvas.width / 500); ctx.strokeRect(state.draft.box.x * canvas.width, state.draft.box.y * canvas.height, state.draft.box.w * canvas.width, state.draft.box.h * canvas.height); ctx.setLineDash([]); }
}
function canvasPosition(event) { const rect = canvas.getBoundingClientRect(); return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height }; }
function normalizeBox(start, end) { const x = Math.min(start.x, end.x); const y = Math.min(start.y, end.y); return { x: x / canvas.width, y: y / canvas.height, w: Math.abs(end.x - start.x) / canvas.width, h: Math.abs(end.y - start.y) / canvas.height }; }
function commitDraft() { if (!state.draft || !currentFrame()) return; const key = labelKey(currentFrame().file); state.labels[key] = { ...(state.labels[key] || {}), box: state.draft.box, negative: false }; state.draft = null; saveLabels(); draw(); updatePanel(); }
canvas.addEventListener("mousedown", (event) => { if (!state.image || getLabel()?.negative) return; const point = canvasPosition(event); if (state.mode === "box") { state.start = point; state.draft = { box: normalizeBox(point, point) }; } else { const key = labelKey(currentFrame().file); state.labels[key] = { ...(state.labels[key] || {}), tip: { x: point.x / canvas.width, y: point.y / canvas.height }, negative: false }; state.mode = "box"; saveLabels(); draw(); updatePanel(); } });
canvas.addEventListener("mousemove", (event) => { if (!state.start) return; state.draft.box = normalizeBox(state.start, canvasPosition(event)); draw(); });
window.addEventListener("mouseup", () => { if (!state.start) return; state.start = null; if (state.draft?.box.w > 0.01 && state.draft.box.h > 0.01) { commitDraft(); state.mode = "tip"; setStatus("枪体框已完成，请点击批头最末端。", "ok"); } else { state.draft = null; draw(); } });
document.getElementById("negative").addEventListener("click", () => { const frame = currentFrame(); if (!frame) return; state.labels[labelKey(frame.file)] = { negative: true }; state.mode = "box"; state.draft = null; saveLabels(); draw(); updatePanel(); setStatus("已标记为负样本。", "ok"); });
document.getElementById("clearLabel").addEventListener("click", () => { const frame = currentFrame(); if (!frame) return; delete state.labels[labelKey(frame.file)]; state.mode = "box"; state.draft = null; saveLabels(); draw(); updatePanel(); });
function move(delta) { if (!state.frames.length) return; commitDraft(); state.index = Math.max(0, Math.min(state.frames.length - 1, state.index + delta)); state.mode = "box"; loadFrame(); }
window.addEventListener("keydown", (event) => { if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); if (event.key.toLowerCase() === "n") document.getElementById("negative").click(); if (event.key === "Escape") { state.start = null; state.draft = null; state.mode = "box"; draw(); } });
split.addEventListener("change", () => { saveLabels(); updatePanel(); });
document.getElementById("loadFiles").addEventListener("click", () => imageFiles.click());
document.getElementById("loadFolder").addEventListener("click", () => imageFolder.click());
document.getElementById("loadProjectFrames").addEventListener("click", loadProjectFrames);
imageFiles.addEventListener("change", (event) => importFiles(event.target.files));
imageFolder.addEventListener("change", (event) => importFiles(event.target.files));
function toYolo(label) { if (!label || label.negative || !label.box || !label.tip) return ""; return `0 ${label.box.x + label.box.w / 2} ${label.box.y + label.box.h / 2} ${label.box.w} ${label.box.h} ${label.tip.x} ${label.tip.y} 2\n`; }
function projectPayload() { return { format: "screwdriver-tip-pose-v1", split: split.value, labels: state.labels, generatedAt: new Date().toISOString() }; }
function download(name, content, type = "application/json") { const blob = new Blob([content], { type }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); }
document.getElementById("saveProject").addEventListener("click", () => download("screwdriver-tip-annotations.json", JSON.stringify(projectPayload(), null, 2)));
document.getElementById("exportLabels").addEventListener("click", async () => { const entries = state.frames.map((frame) => ({ frame, label: state.labels[labelKey(frame.file)] })).filter(({ label }) => label?.negative || (label?.box && label?.tip)).map(({ frame, label }) => ({ name: `${frame.file.name.replace(/\.[^.]+$/, "")}.txt`, content: toYolo(label) })); if (!entries.length) { setStatus("还没有可导出的完整标注或负样本。", "error"); return; } if (window.showDirectoryPicker) { try { const directory = await window.showDirectoryPicker({ mode: "readwrite" }); for (const entry of entries) { const handle = await directory.getFileHandle(entry.name, { create: true }); const writable = await handle.createWritable(); await writable.write(entry.content); await writable.close(); } setStatus(`已写入 ${entries.length} 个 YOLO 标签文件。`, "ok"); return; } catch (error) { if (error.name === "AbortError") return; } } entries.forEach((entry) => download(entry.name, entry.content, "text/plain")); setStatus(`已下载 ${entries.length} 个 YOLO 标签文件，请放入 labels/${split.value}。`, "ok"); });
loadSavedLabels();
loadProjectFrames();
