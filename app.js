const DEFAULT_LAYOUT = [
  { id: "A01", x: 348, y: 273, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A02", x: 461, y: 280, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A03", x: 577, y: 285, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A04", x: 689, y: 288, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A05", x: 800, y: 295, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A06", x: 908, y: 301, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A07", x: 1016, y: 306, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A08", x: 1124, y: 312, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A09", x: 1227, y: 316, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A10", x: 1329, y: 323, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "A11", x: 1431, y: 327, r: 28, type: "bolt", expectedColor: "blackHead" },

  { id: "B01", x: 329, y: 348, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B02", x: 450, y: 354, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B03", x: 569, y: 359, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B04", x: 685, y: 365, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B05", x: 798, y: 369, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B06", x: 913, y: 374, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B07", x: 1025, y: 379, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B08", x: 1136, y: 384, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B09", x: 1245, y: 389, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B10", x: 1350, y: 391, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "B11", x: 1459, y: 399, r: 28, type: "bolt", expectedColor: "blackHead" },

  { id: "C01", x: 311, y: 430, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C02", x: 434, y: 434, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C03", x: 557, y: 440, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C04", x: 678, y: 446, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C05", x: 802, y: 449, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C06", x: 922, y: 453, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C07", x: 1037, y: 457, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C08", x: 1146, y: 462, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C09", x: 1266, y: 466, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C10", x: 1378, y: 471, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "C11", x: 1486, y: 475, r: 28, type: "bolt", expectedColor: "blackHead" },

  { id: "D01", x: 288, y: 518, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D02", x: 420, y: 523, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D03", x: 549, y: 528, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D04", x: 675, y: 532, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D05", x: 811, y: 541, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D06", x: 928, y: 540, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D07", x: 1048, y: 545, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D08", x: 1164, y: 548, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D09", x: 1287, y: 552, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D10", x: 1402, y: 556, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "D11", x: 1515, y: 560, r: 28, type: "bolt", expectedColor: "blackHead" },

  { id: "E01", x: 264, y: 617, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E02", x: 400, y: 621, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E03", x: 539, y: 625, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E04", x: 671, y: 629, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E05", x: 803, y: 632, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E06", x: 933, y: 637, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E07", x: 1057, y: 643, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E08", x: 1187, y: 643, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E09", x: 1310, y: 645, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E10", x: 1430, y: 648, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "E11", x: 1548, y: 651, r: 28, type: "bolt", expectedColor: "blackHead" },

  { id: "F01", x: 239, y: 723, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F02", x: 384, y: 726, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F03", x: 524, y: 732, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F04", x: 668, y: 734, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F05", x: 804, y: 738, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F06", x: 944, y: 740, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F07", x: 1076, y: 744, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F08", x: 1209, y: 744, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F09", x: 1337, y: 747, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F10", x: 1461, y: 748, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "F11", x: 1584, y: 751, r: 28, type: "bolt", expectedColor: "blackHead" },

  { id: "G01", x: 210, y: 841, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G02", x: 363, y: 845, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G03", x: 511, y: 849, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G04", x: 660, y: 852, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G05", x: 810, y: 853, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G06", x: 950, y: 855, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G07", x: 1092, y: 857, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G08", x: 1229, y: 858, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G09", x: 1367, y: 858, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G10", x: 1494, y: 859, r: 28, type: "bolt", expectedColor: "blackHead" },
  { id: "G11", x: 1620, y: 860, r: 28, type: "bolt", expectedColor: "blackHead" }
];

const STORAGE_KEYS = {
  layout: "bolt-roi-layout-fixed-sample-v2",
  settings: "bolt-roi-settings-fixed-sample-v3",
  calibration: "bolt-roi-calibration-v1",
};

const WASHER_ONLY_RULE = {
  minWasherRatio: 0.62,
  maxSolidHeadRatio: 0.16,
  maxSolidToWasherRatio: 0.26,
};

const REFERENCE_ANCHORS = [
  { id: "左上", x: 215, y: 306 },
  { id: "右上", x: 1680, y: 340 },
  { id: "右下", x: 1870, y: 1042 },
  { id: "左下", x: 66, y: 1048 },
];

const REFERENCE_IMAGE_SIZE = { width: 1920, height: 1080 };
const POSE_MODEL_URL = "./training/models/screwdriver-tip.onnx";
const POSE_INPUT_SIZE = 960;
const POSE_CONFIDENCE = 0.45;

const state = {
  image: null,
  imageName: "assets/sample-board.png",
  videoStream: null,
  videoUrl: "",
  sourceMode: "image",
  layout: loadSavedLayout(),
  calibration: cloneAnchors(REFERENCE_ANCHORS),
  layoutFileHandle: null,
  layoutFileName: "",
  results: [],
  visualResults: [],
  tighteningByPoint: {},
  initialStatusByPoint: null,
  toolTracking: createEmptyToolTracking(),
  monitoring: false,
  previewFrameId: 0,
  monitorFrameId: 0,
  lastMonitorAt: 0,
  liveSignal: null,
  poseModel: { session: null, loading: false, error: "" },
  selectedId: "A01",
  selectedAnchorId: "",
  dragging: false,
  dragTarget: "",
  dirtyDuringDrag: false,
  dragOffset: { x: 0, y: 0 },
};

const els = {
  canvas: document.getElementById("imageCanvas"),
  imageInput: document.getElementById("imageInput"),
  videoInput: document.getElementById("videoInput"),
  layoutInput: document.getElementById("layoutInput"),
  loadImageBtn: document.getElementById("loadImageBtn"),
  loadVideoBtn: document.getElementById("loadVideoBtn"),
  cameraBtn: document.getElementById("cameraBtn"),
  monitorBtn: document.getElementById("monitorBtn"),
  stopVideoBtn: document.getElementById("stopVideoBtn"),
  runBtn: document.getElementById("runBtn"),
  resetLayoutBtn: document.getElementById("resetLayoutBtn"),
  snapLayoutBtn: document.getElementById("snapLayoutBtn"),
  openLayoutBtn: document.getElementById("openLayoutBtn"),
  saveLayoutFileBtn: document.getElementById("saveLayoutFileBtn"),
  exportResultBtn: document.getElementById("exportResultBtn"),
  editMode: document.getElementById("editMode"),
  calibrationMode: document.getElementById("calibrationMode"),
  autoLocateOnLoad: document.getElementById("autoLocateOnLoad"),
  autoLocateBtn: document.getElementById("autoLocateBtn"),
  resetCalibrationBtn: document.getElementById("resetCalibrationBtn"),
  offsetX: document.getElementById("offsetX"),
  offsetY: document.getElementById("offsetY"),
  radiusInput: document.getElementById("radiusInput"),
  pointId: document.getElementById("pointId"),
  pointType: document.getElementById("pointType"),
  pointX: document.getElementById("pointX"),
  pointY: document.getElementById("pointY"),
  pointR: document.getElementById("pointR"),
  expectedColor: document.getElementById("expectedColor"),
  applyPointBtn: document.getElementById("applyPointBtn"),
  addPointBtn: document.getElementById("addPointBtn"),
  deletePointBtn: document.getElementById("deletePointBtn"),
  minPresence: document.getElementById("minPresence"),
  maxPresence: document.getElementById("maxPresence"),
  minSolidHead: document.getElementById("minSolidHead"),
  maxOffsetRatio: document.getElementById("maxOffsetRatio"),
  maxShadowImbalance: document.getElementById("maxShadowImbalance"),
  resultBody: document.getElementById("resultBody"),
  okCount: document.getElementById("okCount"),
  reviewCount: document.getElementById("reviewCount"),
  ngCount: document.getElementById("ngCount"),
  ignoreCount: document.getElementById("ignoreCount"),
  imageInfo: document.getElementById("imageInfo"),
  videoSource: document.getElementById("videoSource"),
  lampState: document.getElementById("lampState"),
  activePoint: document.getElementById("activePoint"),
  tightenedCount: document.getElementById("tightenedCount"),
  operationMode: document.getElementById("operationMode"),
  monitorHint: document.getElementById("monitorHint"),
  statusText: document.getElementById("statusText"),
};

const ctx = els.canvas.getContext("2d", { willReadFrequently: true });

function cloneLayout(layout) {
  return JSON.parse(JSON.stringify(layout));
}

function cloneAnchors(anchors) {
  return anchors.map((anchor) => ({ ...anchor }));
}

function createEmptyToolTracking() {
  return {
    candidateId: "",
    candidatePoint: null,
    candidateFrames: 0,
    lostFrames: 0,
    greenFrames: 0,
    greenLatched: false,
  };
}

function resetTighteningSession() {
  state.tighteningByPoint = {};
  state.initialStatusByPoint = null;
  state.toolTracking = createEmptyToolTracking();
}

async function loadPoseModel() {
  if (state.poseModel.session || state.poseModel.loading || !globalThis.ort) return;
  state.poseModel.loading = true;
  try {
    ort.env.wasm.wasmPaths = "./vendor/onnxruntime-web/";
    state.poseModel.session = await ort.InferenceSession.create(POSE_MODEL_URL, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
    });
    state.poseModel.error = "";
    updateMonitorPanel();
  } catch (error) {
    state.poseModel.error = error.message || String(error);
    updateMonitorPanel();
    console.warn("YOLO pose model unavailable; using the image-rule fallback.", error);
  } finally {
    state.poseModel.loading = false;
  }
}

function poseInputFromImageData(imageData) {
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = imageData.width;
  sourceCanvas.height = imageData.height;
  sourceCanvas.getContext("2d").putImageData(imageData, 0, 0);
  const letterbox = document.createElement("canvas");
  letterbox.width = POSE_INPUT_SIZE;
  letterbox.height = POSE_INPUT_SIZE;
  const letterboxCtx = letterbox.getContext("2d", { willReadFrequently: true });
  letterboxCtx.fillStyle = "rgb(114,114,114)";
  letterboxCtx.fillRect(0, 0, POSE_INPUT_SIZE, POSE_INPUT_SIZE);
  const scale = Math.min(POSE_INPUT_SIZE / imageData.width, POSE_INPUT_SIZE / imageData.height);
  const width = Math.round(imageData.width * scale);
  const height = Math.round(imageData.height * scale);
  const padX = Math.round((POSE_INPUT_SIZE - width) / 2);
  const padY = Math.round((POSE_INPUT_SIZE - height) / 2);
  letterboxCtx.drawImage(sourceCanvas, 0, 0, imageData.width, imageData.height, padX, padY, width, height);
  const pixels = letterboxCtx.getImageData(0, 0, POSE_INPUT_SIZE, POSE_INPUT_SIZE).data;
  const input = new Float32Array(3 * POSE_INPUT_SIZE * POSE_INPUT_SIZE);
  const plane = POSE_INPUT_SIZE * POSE_INPUT_SIZE;
  for (let i = 0; i < plane; i += 1) {
    input[i] = pixels[i * 4] / 255;
    input[plane + i] = pixels[i * 4 + 1] / 255;
    input[plane * 2 + i] = pixels[i * 4 + 2] / 255;
  }
  return { input, scale, padX, padY };
}

function boxIoU(a, b) {
  const left = Math.max(a.x1, b.x1);
  const top = Math.max(a.y1, b.y1);
  const right = Math.min(a.x2, b.x2);
  const bottom = Math.min(a.y2, b.y2);
  const intersection = Math.max(0, right - left) * Math.max(0, bottom - top);
  const areaA = Math.max(0, a.x2 - a.x1) * Math.max(0, a.y2 - a.y1);
  const areaB = Math.max(0, b.x2 - b.x1) * Math.max(0, b.y2 - b.y1);
  return intersection / Math.max(1e-6, areaA + areaB - intersection);
}

function decodePoseOutput(output, imageData, transform) {
  const data = output.data;
  const count = output.dims[output.dims.length - 1];
  const candidates = [];
  for (let index = 0; index < count; index += 1) {
    const confidence = data[4 * count + index];
    if (confidence < POSE_CONFIDENCE) continue;
    const centerX = data[index];
    const centerY = data[count + index];
    const width = data[2 * count + index];
    const height = data[3 * count + index];
    const tipX = data[5 * count + index];
    const tipY = data[6 * count + index];
    const keypointConfidence = data[7 * count + index];
    const unletter = (x, y) => ({
      x: Math.max(0, Math.min(imageData.width - 1, (x - transform.padX) / transform.scale)),
      y: Math.max(0, Math.min(imageData.height - 1, (y - transform.padY) / transform.scale)),
    });
    const boxCenter = unletter(centerX, centerY);
    const boxWidth = width / transform.scale;
    const boxHeight = height / transform.scale;
    candidates.push({
      confidence,
      keypointConfidence,
      tip: unletter(tipX, tipY),
      x1: boxCenter.x - boxWidth / 2,
      y1: boxCenter.y - boxHeight / 2,
      x2: boxCenter.x + boxWidth / 2,
      y2: boxCenter.y + boxHeight / 2,
    });
  }
  candidates.sort((a, b) => b.confidence - a.confidence);
  const kept = [];
  for (const candidate of candidates) {
    if (kept.every((other) => boxIoU(candidate, other) < 0.45)) kept.push(candidate);
    if (kept.length >= 3) break;
  }
  return kept;
}

async function predictPose(imageData) {
  if (!state.poseModel.session || !globalThis.ort) return [];
  const transform = poseInputFromImageData(imageData);
  const inputName = state.poseModel.session.inputNames[0];
  const outputName = state.poseModel.session.outputNames[0];
  const tensor = new ort.Tensor("float32", transform.input, [1, 3, POSE_INPUT_SIZE, POSE_INPUT_SIZE]);
  const outputs = await state.poseModel.session.run({ [inputName]: tensor });
  return decodePoseOutput(outputs[outputName], imageData, transform);
}

function loadSavedCalibration() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.calibration);
    if (!raw) return cloneAnchors(REFERENCE_ANCHORS);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 4) return cloneAnchors(REFERENCE_ANCHORS);
    return parsed.map((anchor, index) => ({
      id: REFERENCE_ANCHORS[index].id,
      x: Number(anchor.x || REFERENCE_ANCHORS[index].x),
      y: Number(anchor.y || REFERENCE_ANCHORS[index].y),
    }));
  } catch (error) {
    return cloneAnchors(REFERENCE_ANCHORS);
  }
}

function saveCalibration(reason = "标定已保存") {
  try {
    localStorage.setItem(STORAGE_KEYS.calibration, JSON.stringify(state.calibration));
    setStatus(`${reason} · ${formatTime(new Date())}`, "ok");
  } catch (error) {
    setStatus(`标定保存失败：${error.message}`, "error");
  }
}

function resetCalibration() {
  state.calibration = cloneAnchors(REFERENCE_ANCHORS);
  state.selectedAnchorId = "";
  localStorage.removeItem(STORAGE_KEYS.calibration);
  runInspection("已重置标定并重新检测");
}

function loadSavedLayout() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.layout);
    if (!raw) return cloneLayout(DEFAULT_LAYOUT);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.length) return cloneLayout(DEFAULT_LAYOUT);
    return parsed.map(normalizePoint);
  } catch (error) {
    return cloneLayout(DEFAULT_LAYOUT);
  }
}

function normalizePoint(point, index = 0) {
  return {
    id: String(point.id || `P${String(index + 1).padStart(2, "0")}`),
    x: Number(point.x || 0),
    y: Number(point.y || 0),
    r: Number(point.r || 28),
    type: point.type === "ignore" ? "ignore" : "bolt",
    expectedColor: normalizeHeadTarget(point.expectedColor),
  };
}

function saveLayout(reason = "点位已保存") {
  try {
    localStorage.setItem(STORAGE_KEYS.layout, JSON.stringify(state.layout.map(normalizePoint)));
    setStatus(`${reason} · ${formatTime(new Date())}`, "ok");
  } catch (error) {
    setStatus(`保存失败：${error.message}`, "error");
  }
}

async function syncLayoutFileIfConnected(reason = "点位文件已同步") {
  if (!state.layoutFileHandle) return;
  try {
    await saveJsonToFile("bolt-layout.json", layoutPayload(), state.layoutFileHandle);
    setStatus(`${reason}：${state.layoutFileName || "bolt-layout.json"} · ${formatTime(new Date())}`, "ok");
  } catch (error) {
    if (error.name !== "AbortError") {
      setStatus(`点位已存浏览器本地，但写入文件失败：${error.message}`, "error");
    }
  }
}

function layoutPayload() {
  return {
    version: 2,
    layout: state.layout.map(normalizePoint),
    calibration: cloneAnchors(state.calibration),
    settings: getSettingsPayload(),
  };
}

function resultPayload() {
  return {
    imageName: state.imageName,
    sourceMode: state.sourceMode,
    thresholds: getThresholds(),
    tighteningByPoint: state.tighteningByPoint,
    results: state.results,
  };
}

function parseLayoutPayload(payload) {
  const layout = Array.isArray(payload) ? payload : payload.layout;
  if (!Array.isArray(layout) || !layout.length) {
    throw new Error("JSON 中没有有效的点位数组");
  }
  return layout.map(normalizePoint);
}

function applyCalibrationPayload(payload) {
  if (!payload || Array.isArray(payload) || !Array.isArray(payload.calibration)) return;
  if (payload.calibration.length !== 4) return;
  state.calibration = payload.calibration.map((anchor, index) => ({
    id: REFERENCE_ANCHORS[index].id,
    x: Number(anchor.x || REFERENCE_ANCHORS[index].x),
    y: Number(anchor.y || REFERENCE_ANCHORS[index].y),
  }));
  saveCalibration("点位文件中的标定已保存");
}

async function openLayoutFile() {
  if ("showOpenFilePicker" in window) {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: "点位 JSON",
          accept: { "application/json": [".json"] },
        }],
        multiple: false,
      });
      const file = await handle.getFile();
      const text = await file.text();
      const payload = JSON.parse(text);
      state.layout = parseLayoutPayload(payload);
      applyCalibrationPayload(payload);
      state.layoutFileHandle = handle;
      state.layoutFileName = file.name;
      state.selectedId = state.layout[0]?.id || "";
      saveLayout("点位文件已打开并同步到本地");
      runInspection(`已加载点位文件 ${file.name}`);
    } catch (error) {
      if (error.name !== "AbortError") {
        setStatus(`打开点位文件失败：${error.message}`, "error");
      }
    }
    return;
  }

  els.layoutInput.click();
}

async function readLayoutFromInput(file) {
  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    state.layout = parseLayoutPayload(payload);
    applyCalibrationPayload(payload);
    state.layoutFileHandle = null;
    state.layoutFileName = file.name;
    state.selectedId = state.layout[0]?.id || "";
    saveLayout("点位文件已打开并同步到本地");
    runInspection(`已加载点位文件 ${file.name}`);
  } catch (error) {
    setStatus(`打开点位文件失败：${error.message}`, "error");
  }
}

async function saveJsonToFile(filename, payload, existingHandle = null) {
  const json = `${JSON.stringify(payload, null, 2)}\n`;

  if ("showSaveFilePicker" in window) {
    const handle = existingHandle || await window.showSaveFilePicker({
      suggestedName: filename,
      types: [{
        description: "JSON 文件",
        accept: { "application/json": [".json"] },
      }],
    });
    const writable = await handle.createWritable();
    await writable.write(json);
    await writable.close();
    return handle;
  }

  downloadJson(filename, payload);
  return null;
}

async function saveLayoutFile() {
  try {
    const handle = await saveJsonToFile("bolt-layout.json", layoutPayload(), state.layoutFileHandle);
    if (handle) {
      state.layoutFileHandle = handle;
      state.layoutFileName = handle.name || "bolt-layout.json";
      setStatus(`点位已保存到文件：${state.layoutFileName} · ${formatTime(new Date())}`, "ok");
    } else {
      setStatus(`浏览器不支持直接写文件，已下载 bolt-layout.json · ${formatTime(new Date())}`, "warn");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      setStatus(`保存点位文件失败：${error.message}`, "error");
    }
  }
}

function loadSavedSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function applySavedSettings() {
  const saved = loadSavedSettings();
  const fields = ["offsetX", "offsetY", "radiusInput", "minPresence", "maxPresence", "minSolidHead", "maxOffsetRatio", "maxShadowImbalance"];
  for (const field of fields) {
    if (saved[field] !== undefined && els[field]) {
      els[field].value = saved[field];
    }
  }
  if (saved.autoLocateOnLoad !== undefined) {
    els.autoLocateOnLoad.checked = Boolean(saved.autoLocateOnLoad);
  }
  if (saved.operationMode && els.operationMode) {
    els.operationMode.value = saved.operationMode;
  }
}

function saveSettings(reason = "参数已保存") {
  const settings = getSettingsPayload();
  try {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
    setStatus(`${reason} · ${formatTime(new Date())}`, "ok");
  } catch (error) {
    setStatus(`参数保存失败：${error.message}`, "error");
  }
}

function getSettingsPayload() {
  return {
    offsetX: els.offsetX.value,
    offsetY: els.offsetY.value,
    radiusInput: els.radiusInput.value,
    minPresence: els.minPresence.value,
    maxPresence: els.maxPresence.value,
    minSolidHead: els.minSolidHead.value,
    maxOffsetRatio: els.maxOffsetRatio.value,
    maxShadowImbalance: els.maxShadowImbalance.value,
    operationMode: els.operationMode.value,
    autoLocateOnLoad: els.autoLocateOnLoad.checked,
  };
}

function setStatus(message, tone = "") {
  els.statusText.textContent = message;
  els.statusText.className = `status-line ${tone}`.trim();
}

function formatTime(date) {
  return date.toLocaleTimeString("zh-CN", { hour12: false });
}

function loadImage(src, name) {
  stopMonitoring();
  stopVideoSource();
  resetTighteningSession();
  const img = new Image();
  img.onload = () => {
    state.image = img;
    state.imageName = name;
    state.sourceMode = "image";
    state.liveSignal = null;
    els.canvas.width = img.naturalWidth;
    els.canvas.height = img.naturalHeight;
    els.imageInfo.textContent = `${name} · ${img.naturalWidth} x ${img.naturalHeight}`;
    updateMonitorPanel();
    runInspection("图片加载完成，已按固定坐标检测");
    warnIfImageSizeChanged(img);
  };
  img.onerror = () => {
    setStatus(`图片加载失败：${name}`, "error");
  };
  img.src = src;
}

function loadVideoFile(file) {
  stopMonitoring();
  stopVideoSource();
  const url = URL.createObjectURL(file);
  state.videoUrl = url;
  state.sourceMode = "video";
  state.image = null;
  state.imageName = file.name;
  resetTighteningSession();
  state.liveSignal = null;
  els.videoSource.src = url;
  els.videoSource.loop = true;
  els.videoSource.muted = true;
  els.videoSource.playsInline = true;
  els.videoSource.onloadedmetadata = () => {
    syncCanvasToVideoSize();
    warnIfVideoSizeChanged();
    setStatus(`录像元数据已加载：${file.name}，正在等待首帧...`, "warn");
    updateMonitorPanel();
  };
  els.videoSource.onloadeddata = () => {
    drawVideoPreviewFrame();
    runInspection(`录像首帧已加载：${file.name}`);
    startVideoPreview();
    els.videoSource.play().catch(() => {
      setStatus("录像已加载。浏览器未允许自动播放，请点击“开始监控”或视频区域后再试。", "warn");
    });
  };
  els.videoSource.oncanplay = () => {
    drawVideoPreviewFrame();
    startVideoPreview();
  };
  els.videoSource.onerror = () => {
    const error = els.videoSource.error;
    setStatus(`录像解码失败：${error?.message || "浏览器不支持该视频编码，请换 MP4/H.264 格式"}`, "error");
  };
  els.videoSource.load();
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    setStatus("当前浏览器不支持摄像头访问，请改用导入录像。", "error");
    return;
  }

  try {
    stopMonitoring();
    stopVideoSource();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: "environment",
      },
    });
    state.videoStream = stream;
    state.sourceMode = "video";
    state.image = null;
    state.imageName = "摄像头实时画面";
    resetTighteningSession();
    state.liveSignal = null;
    els.videoSource.srcObject = stream;
    els.videoSource.loop = false;
    await els.videoSource.play();
    syncCanvasToVideoSize();
    warnIfVideoSizeChanged();
    runInspection("摄像头已打开");
    startVideoPreview();
    updateMonitorPanel();
  } catch (error) {
    setStatus(`打开摄像头失败：${error.message}`, "error");
  }
}

function stopVideoSource() {
  stopVideoPreview();
  if (state.videoStream) {
    state.videoStream.getTracks().forEach((track) => track.stop());
    state.videoStream = null;
  }
  if (state.videoUrl) {
    URL.revokeObjectURL(state.videoUrl);
    state.videoUrl = "";
  }
  els.videoSource.pause();
  els.videoSource.onloadedmetadata = null;
  els.videoSource.onloadeddata = null;
  els.videoSource.oncanplay = null;
  els.videoSource.onerror = null;
  els.videoSource.removeAttribute("src");
  els.videoSource.srcObject = null;
  els.videoSource.load();
}

function startVideoPreview() {
  if (state.previewFrameId || state.sourceMode !== "video") return;
  state.previewFrameId = requestAnimationFrame(videoPreviewLoop);
}

function stopVideoPreview() {
  if (!state.previewFrameId) return;
  cancelAnimationFrame(state.previewFrameId);
  state.previewFrameId = 0;
}

function videoPreviewLoop(timestamp) {
  state.previewFrameId = 0;
  if (state.sourceMode !== "video" || !hasDrawableSource()) return;

  if (timestamp - state.lastMonitorAt >= 220) {
    state.lastMonitorAt = timestamp;
    runInspection(state.monitoring ? "视频监控中" : "视频实时检测中", {
      recordTightening: state.monitoring,
    });
  } else {
    drawVideoPreviewFrame();
  }
  state.previewFrameId = requestAnimationFrame(videoPreviewLoop);
}

function drawVideoPreviewFrame() {
  if (state.sourceMode !== "video" || !hasDrawableSource()) return false;
  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
  if (!drawSourceToCanvas()) return false;
  drawOverlay();
  return true;
}

function warnIfVideoSizeChanged() {
  const width = els.videoSource.videoWidth;
  const height = els.videoSource.videoHeight;
  if (!width || !height) return;
  if (width !== REFERENCE_IMAGE_SIZE.width || height !== REFERENCE_IMAGE_SIZE.height) {
    setStatus(
      `当前视频 ${width}x${height} 与标准图 ${REFERENCE_IMAGE_SIZE.width}x${REFERENCE_IMAGE_SIZE.height} 不一致，固定坐标可能需要重新校准。`,
      "warn",
    );
  }
}

function syncCanvasToVideoSize() {
  const width = els.videoSource.videoWidth || REFERENCE_IMAGE_SIZE.width;
  const height = els.videoSource.videoHeight || REFERENCE_IMAGE_SIZE.height;
  if (els.canvas.width !== width || els.canvas.height !== height) {
    els.canvas.width = width;
    els.canvas.height = height;
  }
  els.imageInfo.textContent = `${state.imageName} · ${width} x ${height}`;
}

function hasDrawableSource() {
  if (state.sourceMode === "video") {
    return els.videoSource.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
  }
  return Boolean(state.image);
}

function drawSourceToCanvas() {
  if (state.sourceMode === "video") {
    if (!hasDrawableSource()) return false;
    syncCanvasToVideoSize();
    ctx.drawImage(els.videoSource, 0, 0, els.canvas.width, els.canvas.height);
    return true;
  }

  if (!state.image) return false;
  ctx.drawImage(state.image, 0, 0);
  return true;
}

function warnIfImageSizeChanged(img) {
  const sameSize = img.naturalWidth === REFERENCE_IMAGE_SIZE.width && img.naturalHeight === REFERENCE_IMAGE_SIZE.height;
  if (!sameSize) {
    setStatus(
      `当前图片 ${img.naturalWidth}x${img.naturalHeight} 与标准图 ${REFERENCE_IMAGE_SIZE.width}x${REFERENCE_IMAGE_SIZE.height} 不一致，固定坐标可能不准。`,
      "warn",
    );
  }
}

function getThresholds() {
  return {
    minPresence: Number(els.minPresence.value),
    maxPresence: Number(els.maxPresence.value),
    minSolidHead: Number(els.minSolidHead.value),
    maxOffsetRatio: Number(els.maxOffsetRatio.value),
    maxShadowImbalance: Number(els.maxShadowImbalance.value),
  };
}

function sourceScale() {
  const width = els.canvas.width || REFERENCE_IMAGE_SIZE.width;
  const height = els.canvas.height || REFERENCE_IMAGE_SIZE.height;
  return {
    x: width / REFERENCE_IMAGE_SIZE.width,
    y: height / REFERENCE_IMAGE_SIZE.height,
    r: ((width / REFERENCE_IMAGE_SIZE.width) + (height / REFERENCE_IMAGE_SIZE.height)) / 2,
  };
}

function pointWithOffset(point) {
  const scale = sourceScale();
  return {
    ...point,
    x: point.x * scale.x + Number(els.offsetX.value || 0),
    y: point.y * scale.y + Number(els.offsetY.value || 0),
    r: (point.r || Number(els.radiusInput.value || 28)) * scale.r,
  };
}

function transformReferencePoint(point) {
  const matrix = homographyFromPoints(REFERENCE_ANCHORS, state.calibration);
  return applyHomography(matrix, point);
}

function transformImagePointToReference(point) {
  const matrix = homographyFromPoints(state.calibration, REFERENCE_ANCHORS);
  return applyHomography(matrix, point);
}

function calibrationScale() {
  return calibrationScaleFor(state.calibration);
}

function calibrationScaleFor(anchors) {
  const refTop = distance(REFERENCE_ANCHORS[0], REFERENCE_ANCHORS[1]);
  const refBottom = distance(REFERENCE_ANCHORS[3], REFERENCE_ANCHORS[2]);
  const curTop = distance(anchors[0], anchors[1]);
  const curBottom = distance(anchors[3], anchors[2]);
  return ((curTop / refTop) + (curBottom / refBottom)) / 2;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function applyHomography(matrix, point) {
  const denominator = matrix[6] * point.x + matrix[7] * point.y + 1;
  return {
    x: (matrix[0] * point.x + matrix[1] * point.y + matrix[2]) / denominator,
    y: (matrix[3] * point.x + matrix[4] * point.y + matrix[5]) / denominator,
  };
}

function homographyFromPoints(source, target) {
  const rows = [];
  const values = [];

  for (let i = 0; i < 4; i += 1) {
    const { x, y } = source[i];
    const u = target[i].x;
    const v = target[i].y;
    rows.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    values.push(u);
    rows.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    values.push(v);
  }

  const solution = solveLinearSystem(rows, values);
  return [...solution, 1];
}

function solveLinearSystem(matrix, values) {
  const size = values.length;
  const augmented = matrix.map((row, index) => [...row, values[index]]);

  for (let col = 0; col < size; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < size; row += 1) {
      if (Math.abs(augmented[row][col]) > Math.abs(augmented[pivot][col])) {
        pivot = row;
      }
    }

    [augmented[col], augmented[pivot]] = [augmented[pivot], augmented[col]];
    const divisor = augmented[col][col] || 1e-12;
    for (let item = col; item <= size; item += 1) {
      augmented[col][item] /= divisor;
    }

    for (let row = 0; row < size; row += 1) {
      if (row === col) continue;
      const factor = augmented[row][col];
      for (let item = col; item <= size; item += 1) {
        augmented[row][item] -= factor * augmented[col][item];
      }
    }
  }

  return augmented.map((row) => row[size]);
}

function autoLocateBoard(reason = "自动定位完成") {
  if (!state.image) {
    setStatus("图片还没加载完成，无法自动定位。", "warn");
    return false;
  }

  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
  ctx.drawImage(state.image, 0, 0);

  let imageData;
  try {
    imageData = ctx.getImageData(0, 0, els.canvas.width, els.canvas.height);
  } catch (error) {
    setStatus(`自动定位失败，无法读取图片像素：${error.message}`, "error");
    return false;
  }

  const located = locateBoardByFeatureGrid(imageData);
  if (!located) {
    runInspection("自动定位失败，已使用当前点位检测");
    setStatus("自动定位失败：可见螺栓/垫片匹配点不足，请先手动拖 4 个基准点。", "error");
    return false;
  }

  state.calibration = located.anchors;
  state.selectedAnchorId = "";
  els.offsetX.value = 0;
  els.offsetY.value = 0;
  saveCalibration(`自动定位已保存，匹配 ${located.matchCount} 个点`);
  saveSettings("自动定位后参数已保存");
  runInspection(`${reason} · 匹配 ${located.matchCount} 个点 · 平均误差 ${located.meanError.toFixed(1)}px`);
  return true;
}

function locateBoardByFeatureGrid(imageData) {
  const attempts = [
    { anchors: state.calibration, radius: 115, name: "当前标定" },
    { anchors: REFERENCE_ANCHORS, radius: 150, name: "默认标定" },
  ];
  let best = null;

  for (const attempt of attempts) {
    const candidate = locateWithAnchorGuess(imageData, attempt.anchors, attempt.radius, attempt.name);
    if (!candidate) continue;
    if (!best || candidate.quality > best.quality) {
      best = candidate;
    }
  }

  return best;
}

function locateWithAnchorGuess(imageData, anchors, searchRadius, name) {
  const matrix = homographyFromPoints(REFERENCE_ANCHORS, anchors);
  const scale = calibrationScaleFor(anchors);
  const radius = Math.max(18, 28 * scale);
  const matches = [];

  for (const point of state.layout) {
    if (point.type === "ignore") continue;
    const projected = applyHomography(matrix, point);
    const found = searchBestFeatureNear(projected, radius, imageData, Math.max(70, searchRadius * scale));
    if (found && found.score >= 0.105) {
      matches.push({
        source: point,
        target: found,
        score: found.score,
      });
    }
  }

  if (matches.length < 12) return null;

  const fitted = robustAffineFit(matches);
  if (!fitted || fitted.filtered.length < 12) return null;

  const anchorsOut = REFERENCE_ANCHORS.map((anchor) => {
    const transformed = applyAffine(fitted.affine, anchor);
    return { id: anchor.id, x: Math.round(transformed.x), y: Math.round(transformed.y) };
  });

  if (!anchorsLookValid(anchorsOut, imageData.width, imageData.height)) return null;

  const quality = fitted.filtered.length * 8 - fitted.meanError + average(matches.map((item) => item.score)) * 20;
  return {
    source: name,
    anchors: anchorsOut,
    matchCount: fitted.filtered.length,
    meanError: fitted.meanError,
    quality,
  };
}

function searchBestFeatureNear(projected, radius, imageData, searchRadius) {
  const step = 5;
  let best = null;
  const minX = Math.max(radius, Math.round(projected.x - searchRadius));
  const maxX = Math.min(imageData.width - radius - 1, Math.round(projected.x + searchRadius));
  const minY = Math.max(radius, Math.round(projected.y - searchRadius));
  const maxY = Math.min(imageData.height - radius - 1, Math.round(projected.y + searchRadius));

  for (let y = minY; y <= maxY; y += step) {
    for (let x = minX; x <= maxX; x += step) {
      const distancePenalty = Math.hypot(x - projected.x, y - projected.y) / searchRadius;
      const feature = scoreFeatureAt({ x, y }, radius, imageData);
      const score = feature.score - distancePenalty * 0.08;
      if (!best || score > best.score) {
        best = { x, y, score, rawScore: feature.score };
      }
    }
  }

  if (!best || best.rawScore < 0.12) return null;
  return refineFeatureCenter(best, radius, imageData);
}

function refineFeatureCenter(seed, radius, imageData) {
  let best = seed;
  const step = 2;
  for (let y = seed.y - 8; y <= seed.y + 8; y += step) {
    for (let x = seed.x - 8; x <= seed.x + 8; x += step) {
      if (x < radius || y < radius || x >= imageData.width - radius || y >= imageData.height - radius) continue;
      const feature = scoreFeatureAt({ x, y }, radius, imageData);
      if (feature.score > best.rawScore) {
        best = { x, y, score: feature.score, rawScore: feature.score };
      }
    }
  }
  return best;
}

function scoreFeatureAt(center, radius, imageData) {
  const data = imageData.data;
  const coreR = radius * 0.76;
  const coreR2 = coreR * coreR;
  const outerR = radius * 1.12;
  const outerR2 = outerR * outerR;
  const innerEdgeR2 = radius * radius * 0.72;
  let total = 0;
  let dark = 0;
  let solid = 0;
  let blue = 0;
  let ringDark = 0;
  let coreLuma = 0;
  let ringLuma = 0;
  let ringTotal = 0;

  for (let y = Math.round(center.y - outerR); y <= Math.round(center.y + outerR); y += 3) {
    if (y < 0 || y >= imageData.height) continue;
    for (let x = Math.round(center.x - outerR); x <= Math.round(center.x + outerR); x += 3) {
      if (x < 0 || x >= imageData.width) continue;
      const dx = x - center.x;
      const dy = y - center.y;
      const distance2 = dx * dx + dy * dy;
      if (distance2 > outerR2) continue;

      const idx = (y * imageData.width + x) * 4;
      const red = data[idx];
      const green = data[idx + 1];
      const blueValue = data[idx + 2];
      const luma = pixelLuma(red, green, blueValue);

      if (distance2 <= coreR2) {
        total += 1;
        coreLuma += luma;
        if (isBlueWasherPixel(red, green, blueValue)) blue += 1;
        if (isSolidHeadPixel(red, green, blueValue)) solid += 1;
        if (luma < 118 && !isBlueWasherPixel(red, green, blueValue)) dark += 1;
      } else if (distance2 >= innerEdgeR2) {
        ringTotal += 1;
        ringLuma += luma;
        if (luma < 118 || isBlueWasherPixel(red, green, blueValue)) ringDark += 1;
      }
    }
  }

  if (!total || !ringTotal) return { score: 0 };

  const darkRatio = dark / total;
  const solidRatio = solid / total;
  const blueRatio = blue / total;
  const ringRatio = ringDark / ringTotal;
  const contrast = Math.max(0, Math.abs((ringLuma / ringTotal) - (coreLuma / total)) / 120);
  const score = solidRatio * 2.5 + darkRatio * 0.75 + blueRatio * 1.4 + ringRatio * 0.35 + contrast * 0.25;

  return { score };
}

function robustAffineFit(matches) {
  const first = fitAffine(matches);
  const firstResiduals = matches.map((match) => ({
    match,
    error: distance(applyAffine(first, match.source), match.target),
  }));
  const medianError = median(firstResiduals.map((item) => item.error));
  const limit = Math.max(34, Math.min(72, medianError * 2.2));
  const filtered = firstResiduals.filter((item) => item.error <= limit).map((item) => item.match);

  if (filtered.length < 12) return null;

  const affine = fitAffine(filtered);
  const residuals = filtered.map((match) => distance(applyAffine(affine, match.source), match.target));
  const meanError = average(residuals);

  return { affine, filtered, meanError };
}

function fitAffine(matches) {
  const rows = [];
  const values = [];

  for (const match of matches) {
    const x = match.source.x;
    const y = match.source.y;
    rows.push([x, y, 1, 0, 0, 0]);
    values.push(match.target.x);
    rows.push([0, 0, 0, x, y, 1]);
    values.push(match.target.y);
  }

  const normalMatrix = Array.from({ length: 6 }, () => Array(6).fill(0));
  const normalValues = Array(6).fill(0);

  for (let row = 0; row < rows.length; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      normalValues[col] += rows[row][col] * values[row];
      for (let inner = 0; inner < 6; inner += 1) {
        normalMatrix[col][inner] += rows[row][col] * rows[row][inner];
      }
    }
  }

  return solveLinearSystem(normalMatrix, normalValues);
}

function applyAffine(affine, point) {
  return {
    x: affine[0] * point.x + affine[1] * point.y + affine[2],
    y: affine[3] * point.x + affine[4] * point.y + affine[5],
  };
}

function anchorsLookValid(anchors, width, height) {
  const margin = 160;
  const [topLeft, topRight, bottomRight, bottomLeft] = anchors;
  const topWidth = distance(topLeft, topRight);
  const bottomWidth = distance(bottomLeft, bottomRight);
  const leftHeight = distance(topLeft, bottomLeft);
  const rightHeight = distance(topRight, bottomRight);
  const area = polygonArea(anchors);

  return anchors.every((anchor) => anchor.x > -margin && anchor.y > -margin && anchor.x < width + margin && anchor.y < height + margin) &&
    topWidth > width * 0.35 && bottomWidth > width * 0.35 &&
    leftHeight > height * 0.25 && rightHeight > height * 0.25 &&
    area > width * height * 0.18;
}

function polygonArea(points) {
  let area = 0;
  for (let i = 0; i < points.length; i += 1) {
    const next = points[(i + 1) % points.length];
    area += points[i].x * next.y - next.x * points[i].y;
  }
  return Math.abs(area / 2);
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

async function runInspection(reason = "重新检测完成", options = {}) {
  if (!hasDrawableSource()) {
    setStatus("图片或视频还没加载完成，稍后再点重新检测。", "warn");
    return;
  }

  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
  if (!drawSourceToCanvas()) {
    setStatus("当前画面还没准备好，稍后再试。", "warn");
    return;
  }
  let imageData;
  try {
    imageData = ctx.getImageData(0, 0, els.canvas.width, els.canvas.height);
  } catch (error) {
    setStatus(`读取图片像素失败：${error.message}`, "error");
    return;
  }
  const thresholds = getThresholds();

  state.visualResults = state.layout.map((point) => inspectPoint(point, imageData, thresholds));
  state.results = state.visualResults;
  let poseDetections = [];
  try {
    poseDetections = await predictPose(imageData);
  } catch (error) {
    console.warn("YOLO pose inference failed; using the image-rule fallback.", error);
  }
  if (state.sourceMode === "video") {
    updateLiveTighteningSignal(imageData, options.recordTightening ?? state.monitoring, poseDetections);
  }
  state.results = applyTighteningProgress(state.visualResults);
  drawOverlay();
  renderResults();
  syncSelectedFields();
  const ok = state.results.filter((item) => item.status === "OK").length;
  const review = state.results.filter((item) => item.status === "REVIEW").length;
  const ng = state.results.filter((item) => item.status === "NG").length;
  const liveText = state.sourceMode === "video" ? ` · 灯号 ${state.liveSignal?.lamp.label || "未检测"} · 枪头 ${state.liveSignal?.activePoint?.id || "-"}` : "";
  setStatus(`${reason} · 已拧 ${ok} / 复核 ${review} / 未拧 ${ng}${liveText} · ${formatTime(new Date())}`, "ok");
}

function captureInitialTighteningStatus() {
  const source = state.visualResults.length ? state.visualResults : state.results;
  state.initialStatusByPoint = Object.fromEntries(source.map((result) => [result.id, result.status]));
  state.toolTracking = createEmptyToolTracking();
  return source.filter((result) => result.status === "NG").length;
}

function applyTighteningProgress(results) {
  if (!state.initialStatusByPoint) return results;

  return results.map((result) => {
    const initialStatus = state.initialStatusByPoint[result.id] || result.status;
    const confirmation = state.tighteningByPoint[result.id];
    if (confirmation && initialStatus === "NG") {
      return {
        ...result,
        status: "OK",
        note: "初始未拧，已由枪头点位和连续绿灯共同确认",
      };
    }
    return {
      ...result,
      status: initialStatus,
      note: initialStatus === "NG" ? "初始识别为未拧，等待对应枪头绿灯确认" : result.note,
    };
  });
}

function inspectPoint(originalPoint, imageData, thresholds) {
  const point = pointWithOffset(originalPoint);

  if (originalPoint.type === "ignore") {
    return {
      id: originalPoint.id,
      type: "ignore",
      status: "IGNORE",
      presenceRatio: 0,
      solidHeadRatio: 0,
      washerRatio: 0,
      centerOffsetRatio: 0,
      shadowImbalance: 0,
      note: "人工配置为忽略，跳过检测",
    };
  }

  const stats = collectRoiStats(point, imageData, normalizeHeadTarget(originalPoint.expectedColor));
  const notes = [];
  let status = "OK";

  const solidToWasherRatio = stats.solidHeadRatio / Math.max(0.01, stats.washerRatio);
  const washerOnly = stats.washerRatio >= 0.16 && stats.solidHeadRatio < thresholds.minSolidHead;
  const washerClearlyHasNoHead =
    stats.washerRatio >= WASHER_ONLY_RULE.minWasherRatio &&
    (
      stats.solidHeadRatio < WASHER_ONLY_RULE.maxSolidHeadRatio ||
      solidToWasherRatio < WASHER_ONLY_RULE.maxSolidToWasherRatio
    );
  const weakHeadSolidLimit = Math.min(WASHER_ONLY_RULE.maxSolidHeadRatio, thresholds.minSolidHead * 1.8);
  const washerDominantWeakHead =
    stats.washerRatio >= 0.55 &&
    (stats.presenceRatio < thresholds.minPresence * 1.8 || stats.solidHeadRatio < weakHeadSolidLimit);

  if (washerOnly || washerClearlyHasNoHead || washerDominantWeakHead) {
    status = "NG";
    notes.push("垫片占比高，但深黑螺栓头不足，判定未拧上");
  } else if (stats.presenceRatio < thresholds.minPresence || stats.solidHeadRatio < thresholds.minSolidHead) {
    status = "NG";
    notes.push("黑色螺栓头占比过低，判定未拧上或点位不准");
  } else if (stats.presenceRatio < thresholds.minPresence * thresholds.maxShadowImbalance) {
    status = "REVIEW";
    notes.push("黑色螺栓头信号偏弱，建议复核或微调 ROI");
  }

  if (stats.presenceRatio > thresholds.maxPresence) {
    status = "REVIEW";
    notes.push("黑色区域占比过高，可能有遮挡、油污或 ROI 半径过大");
  }

  if (stats.centerOffsetRatio > thresholds.maxOffsetRatio) {
    status = status === "NG" ? "NG" : "REVIEW";
    notes.push("黑色螺栓头偏离点位中心，需复核是否拧偏或 ROI 未对准");
  }

  if (status === "OK" && stats.shadowImbalance > 8) {
    notes.push("存在单侧高光/阴影，但黑色螺栓头信号充足");
  }

  return {
    id: originalPoint.id,
    type: originalPoint.type,
    status,
    presenceRatio: stats.presenceRatio,
    solidHeadRatio: stats.solidHeadRatio,
    washerRatio: stats.washerRatio,
    centerOffsetRatio: stats.centerOffsetRatio,
    shadowImbalance: stats.shadowImbalance,
    note: notes.length ? notes.join("；") : "检测到黑色螺栓头",
  };
}

function collectRoiStats(point, imageData, expectedColor) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const r2 = point.r * point.r;
  const coreR = point.r * 0.72;
  const coreR2 = coreR * coreR;
  const ringStartR2 = point.r * point.r * 0.58;
  let roiCount = 0;
  let coreCount = 0;
  let objectCount = 0;
  let solidHeadCount = 0;
  let washerCount = 0;
  let cx = 0;
  let cy = 0;
  const quadrants = [0, 0, 0, 0];
  const ringLumas = [];

  const minX = Math.max(0, Math.floor(point.x - point.r));
  const maxX = Math.min(width - 1, Math.ceil(point.x + point.r));
  const minY = Math.max(0, Math.floor(point.y - point.r));
  const maxY = Math.min(height - 1, Math.ceil(point.y + point.r));

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const dx = x - point.x;
      const dy = y - point.y;
      const distance2 = dx * dx + dy * dy;
      if (distance2 > r2) continue;

      roiCount += 1;
      const idx = (y * width + x) * 4;
      const red = data[idx];
      const green = data[idx + 1];
      const blue = data[idx + 2];
      const luma = pixelLuma(red, green, blue);

      if (distance2 >= ringStartR2) {
        ringLumas.push(luma);
      }

      if (distance2 <= coreR2) {
        coreCount += 1;
      }
    }
  }

  const localCutoff = getLocalDarkCutoff(ringLumas, expectedColor);

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const dx = x - point.x;
      const dy = y - point.y;
      const distance2 = dx * dx + dy * dy;
      if (distance2 > coreR2) continue;

      const idx = (y * width + x) * 4;
      const red = data[idx];
      const green = data[idx + 1];
      const blue = data[idx + 2];

      if (isWasherPixel(red, green, blue)) {
        washerCount += 1;
      }

      if (isSolidHeadPixel(red, green, blue)) {
        solidHeadCount += 1;
      }

      if (isObjectPixel(red, green, blue, expectedColor, localCutoff)) {
        objectCount += 1;
        cx += x;
        cy += y;
        const quad = (x >= point.x ? 1 : 0) + (y >= point.y ? 2 : 0);
        quadrants[quad] += 1;
      }
    }
  }

  if (!objectCount || !roiCount) {
    return {
      presenceRatio: 0,
      solidHeadRatio: 0,
      washerRatio: washerCount / Math.max(1, coreCount),
      centerOffsetRatio: 1,
      shadowImbalance: 99,
    };
  }

  cx /= objectCount;
  cy /= objectCount;
  const centerOffset = Math.hypot(cx - point.x, cy - point.y);
  const minQuad = Math.max(1, Math.min(...quadrants));
  const maxQuad = Math.max(...quadrants);

  return {
    presenceRatio: objectCount / Math.max(1, coreCount),
    solidHeadRatio: solidHeadCount / Math.max(1, coreCount),
    washerRatio: washerCount / Math.max(1, coreCount),
    centerOffsetRatio: centerOffset / point.r,
    shadowImbalance: maxQuad / minQuad,
  };
}

function normalizeHeadTarget(expectedColor) {
  return expectedColor === "darkHead" ? "darkHead" : "blackHead";
}

function pixelLuma(red, green, blue) {
  return red * 0.299 + green * 0.587 + blue * 0.114;
}

function getLocalDarkCutoff(ringLumas, expectedColor) {
  if (!ringLumas.length) return expectedColor === "darkHead" ? 105 : 88;
  const sorted = [...ringLumas].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length * 0.5)];
  const dynamicCutoff = median - 28;
  const absoluteCutoff = expectedColor === "darkHead" ? 112 : 98;
  return Math.max(42, Math.min(absoluteCutoff, dynamicCutoff));
}

function isObjectPixel(red, green, blue, expectedColor, localCutoff) {
  const luma = pixelLuma(red, green, blue);
  const saturationSpread = Math.max(red, green, blue) - Math.min(red, green, blue);
  const blueWasher = blue > 70 && blue > red * 1.25 && blue > green * 1.05;
  const blackHead = luma < localCutoff && saturationSpread < 95 && !blueWasher;
  const darkHead = luma < localCutoff + 14 && !blueWasher;

  if (expectedColor === "darkHead") return darkHead;
  return blackHead;
}

function isSolidHeadPixel(red, green, blue) {
  const luma = pixelLuma(red, green, blue);
  const saturationSpread = Math.max(red, green, blue) - Math.min(red, green, blue);
  return luma < 68 && saturationSpread < 92 && !isBlueWasherPixel(red, green, blue);
}

function isBlueWasherPixel(red, green, blue) {
  return blue > 62 && blue > red * 1.22 && blue > green * 1.04;
}

function isWhiteWasherPixel(red, green, blue) {
  const luma = pixelLuma(red, green, blue);
  const saturationSpread = Math.max(red, green, blue) - Math.min(red, green, blue);
  return luma > 94 && saturationSpread < 48;
}

function isWasherPixel(red, green, blue) {
  return isBlueWasherPixel(red, green, blue) || isWhiteWasherPixel(red, green, blue);
}

function updateLiveTighteningSignal(imageData, shouldRecord, poseDetections = []) {
  const lamp = detectDriverLamp(imageData);
  const rawPoint = findActiveToolPoint(imageData, lamp, poseDetections);
  const tracking = state.toolTracking;

  if (rawPoint?.id && rawPoint.id === tracking.candidateId) {
    tracking.candidateFrames += 1;
    tracking.lostFrames = 0;
    tracking.candidatePoint = rawPoint;
  } else if (!rawPoint && tracking.candidatePoint && tracking.candidateFrames >= 2) {
    tracking.lostFrames += 1;
  } else {
    tracking.candidateId = rawPoint?.id || "";
    tracking.candidateFrames = rawPoint ? 1 : 0;
    if (rawPoint) {
      tracking.candidatePoint = rawPoint;
      tracking.lostFrames = 0;
      tracking.greenFrames = 0;
      tracking.greenLatched = false;
    } else {
      tracking.candidatePoint = null;
      tracking.lostFrames = 0;
      tracking.greenFrames = 0;
      tracking.greenLatched = false;
    }
  }

  const activePoint = tracking.candidatePoint && tracking.candidateFrames >= 2 && tracking.lostFrames <= 5
    ? tracking.candidatePoint
    : null;
  if (activePoint && lamp.status === "GREEN_OK") {
    tracking.greenFrames += 1;
  } else {
    tracking.greenFrames = 0;
    tracking.greenLatched = false;
  }

  state.liveSignal = { lamp, activePoint, rawPoint, stableFrames: tracking.candidateFrames };

  const initialStatus = activePoint && state.initialStatusByPoint?.[activePoint.id];
  const canConfirm =
    shouldRecord &&
    els.operationMode.value === "tighten" &&
    activePoint &&
    canPointBeTightened(activePoint.id) &&
    initialStatus === "NG" &&
    !state.tighteningByPoint[activePoint.id] &&
    tracking.greenFrames >= 2 &&
    !tracking.greenLatched;

  if (canConfirm) {
    state.tighteningByPoint[activePoint.id] = {
      pointId: activePoint.id,
      confirmedAt: new Date().toISOString(),
      lamp: lamp.label,
      lampPixels: lamp.pixelCount,
      toolScore: Number(activePoint.score.toFixed(4)),
      stableToolFrames: tracking.candidateFrames,
      stableGreenFrames: tracking.greenFrames,
    };
    tracking.greenLatched = true;
    state.selectedId = activePoint.id;
  }

  updateMonitorPanel();
}

function detectDriverLamp(imageData) {
  const data = imageData.data;
  const step = 3;
  let green = 0;
  let red = 0;
  let yellow = 0;
  const limitY = Math.floor(imageData.height * 0.68);
  const boundsByColor = {
    green: emptyBounds(imageData),
    red: emptyBounds(imageData),
    yellow: emptyBounds(imageData),
  };

  for (let y = 0; y < limitY; y += step) {
    for (let x = 0; x < imageData.width; x += step) {
      const idx = (y * imageData.width + x) * 4;
      const redValue = data[idx];
      const greenValue = data[idx + 1];
      const blueValue = data[idx + 2];
      // Board washers can also be colored, so require the indicator light to
      // be both bright and strongly saturated before using it as geometry.
      const isGreen = greenValue > 185 && greenValue > redValue * 1.22 && greenValue > blueValue * 1.3 && greenValue - redValue > 28;
      const isRed = redValue > 185 && redValue > greenValue * 1.38 && redValue > blueValue * 1.35 && redValue - greenValue > 35;
      const isYellow = redValue > 185 && greenValue > 150 && blueValue < 105 && redValue > blueValue * 1.8;

      if (!isGreen && !isRed && !isYellow) continue;
      if (isGreen) {
        green += 1;
        extendBounds(boundsByColor.green, x, y);
      } else if (isRed) {
        red += 1;
        extendBounds(boundsByColor.red, x, y);
      } else {
        yellow += 1;
        extendBounds(boundsByColor.yellow, x, y);
      }
    }
  }

  const pixelCount = Math.max(green, red, yellow);
  if (green >= 18 && green > yellow * 0.45 && green > red * 0.18) {
    return { status: "GREEN_OK", label: "绿灯OK", className: "lamp-ok", pixelCount, bounds: boundsByColor.green };
  }
  if (red >= 18 && red >= green) {
    return { status: "RED", label: "红灯/非OK", className: "lamp-ng", pixelCount, bounds: boundsByColor.red };
  }
  if (yellow >= 18) {
    return { status: "YELLOW", label: "黄灯/过程", className: "lamp-warn", pixelCount, bounds: boundsByColor.yellow };
  }
  return { status: "NONE", label: "未检测", className: "", pixelCount: 0, bounds: null };
}

function emptyBounds(imageData) {
  return { minX: imageData.width, minY: imageData.height, maxX: 0, maxY: 0 };
}

function extendBounds(bounds, x, y) {
  bounds.minX = Math.min(bounds.minX, x);
  bounds.minY = Math.min(bounds.minY, y);
  bounds.maxX = Math.max(bounds.maxX, x);
  bounds.maxY = Math.max(bounds.maxY, y);
}

function findActiveToolPoint(imageData, lamp, poseDetections = []) {
  const eligibleIds = getToolCandidateIds();
  if (poseDetections.length) {
    let best = null;
    let second = null;
    for (const detection of poseDetections) {
      if (detection.keypointConfidence < 0.35) continue;
      for (const originalPoint of state.layout) {
        if (originalPoint.type === "ignore") continue;
        if (eligibleIds && !eligibleIds.has(originalPoint.id)) continue;
        const point = pointWithOffset(originalPoint);
        const distance = Math.hypot(point.x - detection.tip.x, point.y - detection.tip.y);
        const maxDistance = Math.max(42, point.r * 1.75);
        if (distance > maxDistance) continue;
        const score = detection.confidence * 0.7 + detection.keypointConfidence * 0.2 + (1 - distance / maxDistance) * 0.1;
        const candidate = { id: originalPoint.id, x: point.x, y: point.y, tipX: detection.tip.x, tipY: detection.tip.y, score, distance, source: "yolo" };
        if (!best || candidate.score > best.score) {
          second = best;
          best = candidate;
        } else if (!second || candidate.score > second.score) {
          second = candidate;
        }
      }
    }
    if (best && (!second || best.score - second.score >= 0.035)) return best;
  }
  const tip = estimateToolTip(imageData, lamp);
  if (tip) {
    let nearest = null;
    let secondDistance = Infinity;

    for (const originalPoint of state.layout) {
      if (originalPoint.type === "ignore") continue;
      if (eligibleIds && !eligibleIds.has(originalPoint.id)) continue;
      const point = pointWithOffset(originalPoint);
      const distanceToTip = Math.hypot(point.x - tip.x, point.y - tip.y);
      if (!nearest || distanceToTip < nearest.distance) {
        secondDistance = nearest?.distance ?? Infinity;
        nearest = { id: originalPoint.id, x: point.x, y: point.y, tipX: tip.x, tipY: tip.y, score: tip.score, distance: distanceToTip, source: "rule" };
      } else if (distanceToTip < secondDistance) {
        secondDistance = distanceToTip;
      }
    }

    const maxTipDistance = Math.max(42, (nearest?.r || 28) * 1.75);
    if (nearest && nearest.distance <= maxTipDistance && (secondDistance - nearest.distance >= 8 || nearest.distance < 24)) {
      return { ...nearest, score: tip.score + Math.max(0, 1 - nearest.distance / maxTipDistance) };
    }
  }

  let best = null;
  let secondScore = 0;
  for (const originalPoint of state.layout) {
    if (originalPoint.type === "ignore") continue;
    if (eligibleIds && !eligibleIds.has(originalPoint.id)) continue;
    const point = pointWithOffset(originalPoint);
    const score = scoreToolNearPoint(point, imageData, lamp);
    if (!best || score > best.score) {
      secondScore = best?.score || 0;
    best = { id: originalPoint.id, x: point.x, y: point.y, score, source: "rule" };
    } else if (score > secondScore) {
      secondScore = score;
    }
  }

  if (!best || best.score < 0.08) return null;
  if (secondScore > 0 && best.score < secondScore * 1.06) return null;
  return best;
}

function estimateToolTip(imageData, lamp) {
  if (!lamp?.bounds) return null;
  const centerX = (lamp.bounds.minX + lamp.bounds.maxX) / 2;
  const centerY = (lamp.bounds.minY + lamp.bounds.maxY) / 2;
  const maxY = Math.min(imageData.height - 1, Math.round(centerY + imageData.height * 0.46));
  const slopes = [-0.55, -0.4, -0.28, -0.16, 0, 0.16, 0.28, 0.4, 0.55];
  let best = null;

  for (const slope of slopes) {
    const rows = [];
    for (let y = Math.round(centerY + 28); y <= maxY; y += 4) {
      const predictedX = centerX + (y - centerY) * slope;
      let darkSamples = 0;
      const sampleCount = 13;
      for (let i = 0; i < sampleCount; i += 1) {
        const x = Math.round(predictedX - 18 + (36 * i) / (sampleCount - 1));
        if (x >= 0 && x < imageData.width && isToolPixelAt(imageData.data, imageData.width, x, y)) {
          darkSamples += 1;
        }
      }
      rows.push({ y, ratio: darkSamples / sampleCount });
    }

    let runStart = -1;
    let runEnd = -1;
    let longest = 0;
    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i].ratio >= 0.15) {
        if (runStart < 0) runStart = i;
        runEnd = i;
      } else if (runStart >= 0) {
        longest = Math.max(longest, runEnd - runStart + 1);
        runStart = -1;
      }
    }
    if (runStart >= 0) longest = Math.max(longest, runEnd - runStart + 1);
    if (longest < 7) continue;

    const endIndex = rows.findIndex((row, index) => {
      if (row.ratio < 0.15) return false;
      let length = 0;
      for (let j = index; j < rows.length && rows[j].ratio >= 0.15; j += 1) length += 1;
      return length === longest;
    });
    if (endIndex < 0) continue;
    const endRun = Math.min(rows.length - 1, endIndex + longest - 1);
    const averageRatio = average(rows.slice(endIndex, endRun + 1).map((row) => row.ratio));
    const tipY = rows[endRun].y;
    const tipX = centerX + (tipY - centerY) * slope;
    const score = averageRatio * 0.7 + Math.min(1, longest / 28) * 0.3;
    if (!best || score > best.score) best = { x: tipX, y: tipY, score };
  }

  return best;
}

function getToolCandidateIds() {
  if (els.operationMode.value === "tighten" && state.initialStatusByPoint) {
    return new Set(
      Object.entries(state.initialStatusByPoint)
        .filter(([id, status]) => status === "NG" && !state.tighteningByPoint[id])
        .map(([id]) => id),
    );
  }

  const currentNgIds = state.visualResults
    .filter((result) => result.status === "NG")
    .map((result) => result.id);
  return currentNgIds.length ? new Set(currentNgIds) : null;
}

function canPointBeTightened(pointId) {
  const eligibleIds = getToolCandidateIds();
  return !eligibleIds || eligibleIds.has(pointId);
}

function scoreToolNearPoint(point, imageData, lamp) {
  const data = imageData.data;
  const lampBounds = lamp?.bounds;
  const lampCenter = lampBounds ? {
    x: (lampBounds.minX + lampBounds.maxX) / 2,
    y: (lampBounds.minY + lampBounds.maxY) / 2,
  } : null;

  if (lampCenter) {
    const belowLamp = point.y > lampCenter.y + point.r;
    const horizontalDistance = Math.abs(point.x - lampCenter.x);
    const maxHorizontalDistance = Math.max(110, (point.y - lampCenter.y) * 0.55);
    if (!belowLamp || horizontalDistance > maxHorizontalDistance) return 0;
  }

  const tip = scoreToolTipContact(point, imageData);
  if (tip < 0.035) return 0;

  const shaft = scoreToolShaftTowardPoint(point, imageData, lampCenter);
  if (shaft < 0.035) return 0;

  const extension = scoreToolExtensionBelowPoint(point, imageData, lampCenter);
  if (extension > 0.72) return 0;

  const lampBonus = lampCenter ? 0.04 : 0;
  const endpointBonus = Math.max(0, 0.72 - extension) * 0.75;
  return tip * 1.15 + shaft * 1.35 + endpointBonus + lampBonus;
}

function scoreToolTipContact(point, imageData) {
  const data = imageData.data;
  const top = Math.max(0, Math.round(point.y - point.r * 1.9));
  const bottom = Math.min(imageData.height - 1, Math.round(point.y + point.r * 0.45));
  const left = Math.max(0, Math.round(point.x - point.r * 0.85));
  const right = Math.min(imageData.width - 1, Math.round(point.x + point.r * 0.85));
  let total = 0;
  let dark = 0;

  for (let y = top; y <= bottom; y += 2) {
    for (let x = left; x <= right; x += 2) {
      total += 1;
      if (isToolPixelAt(data, imageData.width, x, y)) dark += 1;
    }
  }

  return total ? dark / total : 0;
}

function scoreToolShaftTowardPoint(point, imageData, lampCenter) {
  const startY = Math.max(0, Math.round(point.y - point.r * 5.2));
  const endY = Math.max(0, Math.round(point.y - point.r * 1.3));
  let best = 0;
  const slopeHints = lampCenter ? [(lampCenter.x - point.x) / Math.max(1, lampCenter.y - point.y)] : [-0.55, -0.35, -0.18, 0, 0.18, 0.35, 0.55];

  for (const slope of slopeHints) {
    let samples = 0;
    let dark = 0;
    let rowsHit = 0;

    for (let y = endY; y >= startY; y -= 5) {
      const predictedX = point.x + (y - point.y) * slope;
      let rowHit = false;
      for (let dx = -12; dx <= 12; dx += 3) {
        const x = Math.round(predictedX + dx);
        if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) continue;
        samples += 1;
        if (isToolPixelAt(imageData.data, imageData.width, x, y)) {
          dark += 1;
          rowHit = true;
        }
      }
      if (rowHit) rowsHit += 1;
    }

    if (!samples) continue;
    const darkRatio = dark / samples;
    const continuity = rowsHit / Math.max(1, Math.ceil((endY - startY) / 5));
    best = Math.max(best, darkRatio * 0.65 + continuity * 0.35);
  }

  return best;
}

function scoreToolExtensionBelowPoint(point, imageData, lampCenter) {
  const startY = Math.min(imageData.height - 1, Math.round(point.y + point.r * 0.7));
  const endY = Math.min(imageData.height - 1, Math.round(point.y + point.r * 2.15));
  if (endY <= startY) return 0;
  const slopes = lampCenter
    ? [(lampCenter.x - point.x) / Math.max(1, lampCenter.y - point.y)]
    : [-0.45, -0.25, 0, 0.25, 0.45];
  let best = 0;

  for (const slope of slopes) {
    let rows = 0;
    let rowsHit = 0;
    for (let y = startY; y <= endY; y += 4) {
      const predictedX = point.x + (y - point.y) * slope;
      let rowHit = false;
      const halfWidth = Math.max(14, point.r * 0.65);
      for (let dx = -halfWidth; dx <= halfWidth; dx += 3) {
        const x = Math.round(predictedX + dx);
        if (x < 0 || x >= imageData.width) continue;
        if (isToolPixelAt(imageData.data, imageData.width, x, y)) rowHit = true;
      }
      rows += 1;
      if (rowHit) rowsHit += 1;
    }
    best = Math.max(best, rowsHit / Math.max(1, rows));
  }

  return best;
}

function isToolPixelAt(data, width, x, y) {
  const idx = (Math.round(y) * width + Math.round(x)) * 4;
  const red = data[idx];
  const green = data[idx + 1];
  const blue = data[idx + 2];
  const luma = pixelLuma(red, green, blue);
  const saturationSpread = Math.max(red, green, blue) - Math.min(red, green, blue);
  return luma < 92 && saturationSpread < 125 && !isBlueWasherPixel(red, green, blue);
}

function updateMonitorPanel() {
  const lamp = state.liveSignal?.lamp;
  const activePoint = state.liveSignal?.activePoint;
  const tightenedCount = Object.keys(state.tighteningByPoint).length;

  els.lampState.textContent = lamp?.label || "未检测";
  els.lampState.className = lamp?.className || "";
  els.activePoint.textContent = activePoint ? `${activePoint.id} (${activePoint.score.toFixed(2)})` : "-";
  els.tightenedCount.textContent = tightenedCount;
  els.monitorBtn.textContent = state.monitoring ? "停止监控" : "开始监控";

  if (state.sourceMode !== "video") {
    els.monitorHint.textContent = state.poseModel.session
      ? "YOLO 枪头模型已加载。导入录像或打开摄像头后，点击开始监控。"
      : "导入录像或打开摄像头后，点击开始监控。";
  } else if (els.operationMode.value === "loosen") {
    els.monitorHint.textContent = "松开测试模式：忽略红绿灯变化，不改变已拧和未拧计数。";
  } else if (state.monitoring) {
    const pending = Object.entries(state.initialStatusByPoint || {}).filter(([, status]) => status === "NG").length - tightenedCount;
    els.monitorHint.textContent = `监控中：仅跟踪初始未拧点，枪头稳定且连续绿灯后确认；剩余 ${Math.max(0, pending)} 个。`;
  } else {
    els.monitorHint.textContent = state.poseModel.session
      ? "YOLO 枪头模型已加载；视频已加载，可单帧重新检测，也可开始连续监控。"
      : "视频已加载，可单帧重新检测，也可开始连续监控。";
  }
}

function tighteningText(pointId) {
  return state.tighteningByPoint[pointId] ? "绿灯OK" : "-";
}

function drawOverlay() {
  if (!drawSourceToCanvas()) return;
  for (const originalPoint of state.layout) {
    const point = pointWithOffset(originalPoint);
    const result = state.results.find((item) => item.id === originalPoint.id);
    const color = resultColor(result?.status);
    const selected = originalPoint.id === state.selectedId;

    ctx.save();
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
    ctx.lineWidth = selected ? 5 : 3;
    ctx.strokeStyle = selected ? "#0e8f9f" : color;
    ctx.stroke();
    ctx.fillStyle = `${color}33`;
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    ctx.lineWidth = 3;
    ctx.font = "18px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(originalPoint.id, point.x, point.y - point.r - 14);
    ctx.fillText(originalPoint.id, point.x, point.y - point.r - 14);
    ctx.restore();
  }
  if (els.calibrationMode.checked || state.selectedAnchorId) {
    drawCalibrationAnchors();
  }
  drawLiveSignalOverlay();
}

function drawLiveSignalOverlay() {
  if (state.sourceMode !== "video" || !state.liveSignal) return;
  const activePoint = state.liveSignal.activePoint;
  const lamp = state.liveSignal.lamp;

  if (activePoint) {
    ctx.save();
    if (Number.isFinite(activePoint.tipX) && Number.isFinite(activePoint.tipY)) {
      ctx.beginPath();
      ctx.arc(activePoint.tipX, activePoint.tipY, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#ff1744";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(activePoint.x, activePoint.y, 42, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffca28";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = "#ffca28";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
    ctx.lineWidth = 3;
    ctx.font = "22px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText("枪头", activePoint.x, activePoint.y + 56);
    ctx.fillText("枪头", activePoint.x, activePoint.y + 56);
    ctx.restore();
  }

  if (lamp?.bounds && lamp.pixelCount > 0) {
    ctx.save();
    ctx.strokeStyle = lamp.status === "GREEN_OK" ? "#24a148" : "#c7352f";
    ctx.lineWidth = 4;
    ctx.strokeRect(
      lamp.bounds.minX - 8,
      lamp.bounds.minY - 8,
      lamp.bounds.maxX - lamp.bounds.minX + 16,
      lamp.bounds.maxY - lamp.bounds.minY + 16,
    );
    ctx.restore();
  }
}

function drawCalibrationAnchors() {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#155fbf";
  ctx.fillStyle = "rgba(21, 95, 191, 0.18)";
  ctx.beginPath();
  state.calibration.forEach((anchor, index) => {
    if (index === 0) ctx.moveTo(anchor.x, anchor.y);
    else ctx.lineTo(anchor.x, anchor.y);
  });
  ctx.closePath();
  ctx.stroke();

  for (const anchor of state.calibration) {
    const selected = anchor.id === state.selectedAnchorId;
    ctx.beginPath();
    ctx.rect(anchor.x - 12, anchor.y - 12, 24, 24);
    ctx.fillStyle = selected ? "rgba(14, 143, 159, 0.35)" : "rgba(21, 95, 191, 0.22)";
    ctx.strokeStyle = selected ? "#0e8f9f" : "#155fbf";
    ctx.lineWidth = selected ? 6 : 4;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.72)";
    ctx.lineWidth = 3;
    ctx.font = "20px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(anchor.id, anchor.x, anchor.y - 30);
    ctx.fillText(anchor.id, anchor.x, anchor.y - 30);
  }
  ctx.restore();
}

function resultColor(status) {
  if (status === "OK") return "#14804a";
  if (status === "REVIEW") return "#b86b00";
  if (status === "NG") return "#c7352f";
  return "#737b82";
}

function renderResults() {
  const counts = { OK: 0, REVIEW: 0, NG: 0, IGNORE: 0 };
  els.resultBody.innerHTML = "";

  for (const result of state.results) {
    counts[result.status] += 1;
    const row = document.createElement("tr");
    row.dataset.id = result.id;
    row.innerHTML = `
      <td>${result.id}</td>
      <td>${result.type === "bolt" ? "检测点" : "忽略"}</td>
      <td><span class="status ${statusClass(result.status)}">${statusText(result.status)}</span></td>
      <td>${formatRatio(result.presenceRatio)}</td>
      <td>${formatRatio(result.solidHeadRatio || 0)}</td>
      <td>${formatRatio(result.washerRatio || 0)}</td>
      <td>${result.centerOffsetRatio.toFixed(2)} R</td>
      <td>${signalText(result.presenceRatio)}</td>
      <td>${tighteningText(result.id)}</td>
      <td>${result.note}</td>
    `;
    row.addEventListener("click", () => selectPoint(result.id));
    els.resultBody.appendChild(row);
  }

  els.okCount.textContent = counts.OK;
  els.reviewCount.textContent = counts.REVIEW;
  els.ngCount.textContent = counts.NG;
  els.ignoreCount.textContent = counts.IGNORE;
}

function statusClass(status) {
  return {
    OK: "ok",
    REVIEW: "review",
    NG: "ng",
    IGNORE: "ignore",
  }[status];
}

function statusText(status) {
  return {
    OK: "已拧",
    REVIEW: "复核",
    NG: "未拧",
    IGNORE: "忽略",
  }[status];
}

function formatRatio(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function signalText(value) {
  if (value >= 0.32) return "强";
  if (value >= 0.18) return "中";
  if (value >= 0.08) return "弱";
  return "很弱";
}

function selectPoint(id) {
  state.selectedId = id;
  syncSelectedFields();
  drawOverlay();
}

function syncSelectedFields() {
  const point = state.layout.find((item) => item.id === state.selectedId) || state.layout[0];
  if (!point) return;
  state.selectedId = point.id;
  els.pointId.value = point.id;
  els.pointType.value = point.type;
  els.pointX.value = point.x;
  els.pointY.value = point.y;
  els.pointR.value = point.r;
  els.expectedColor.value = normalizeHeadTarget(point.expectedColor);
}

function applyPointEdit() {
  const index = state.layout.findIndex((item) => item.id === state.selectedId);
  if (index < 0) return;

  state.layout[index] = normalizePoint({
    id: els.pointId.value.trim() || state.layout[index].id,
    type: els.pointType.value,
    x: Number(els.pointX.value),
    y: Number(els.pointY.value),
    r: Number(els.pointR.value),
    expectedColor: els.expectedColor.value,
  }, index);
  state.selectedId = state.layout[index].id;
  runInspection();
  saveLayout("点位修改已保存");
  void syncLayoutFileIfConnected("点位修改已写入文件");
}

function addPoint() {
  const nextNumber = String(state.layout.length + 1).padStart(2, "0");
  const scale = sourceScale();
  const point = {
    id: `P${nextNumber}`,
    x: Math.round((els.canvas.width / 2 - Number(els.offsetX.value || 0)) / scale.x),
    y: Math.round((els.canvas.height / 2 - Number(els.offsetY.value || 0)) / scale.y),
    r: Number(els.radiusInput.value || 28),
    type: "bolt",
    expectedColor: "blackHead",
  };
  state.layout.push(point);
  state.selectedId = point.id;
  runInspection();
  saveLayout("新增点位已保存");
  void syncLayoutFileIfConnected("新增点位已写入文件");
}

function deletePoint() {
  const index = state.layout.findIndex((item) => item.id === state.selectedId);
  if (index < 0) return;
  state.layout.splice(index, 1);
  state.selectedId = state.layout[0]?.id || "";
  runInspection();
  saveLayout("删除点位已保存");
  void syncLayoutFileIfConnected("删除点位已写入文件");
}

function resetLayout() {
  state.layout = cloneLayout(DEFAULT_LAYOUT);
  state.selectedId = state.layout[0]?.id || "";
  localStorage.removeItem(STORAGE_KEYS.layout);
  localStorage.removeItem("bolt-roi-layout-fixed-sample-v1");
  runInspection("已恢复默认点位并重新检测");
  setStatus(`已恢复默认点位 · ${formatTime(new Date())}`, "warn");
}

function snapLayoutToCurrentImage() {
  if (!state.image) {
    setStatus("图片还没加载完成，无法校准点位。", "warn");
    return;
  }

  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
  ctx.drawImage(state.image, 0, 0);

  let imageData;
  try {
    imageData = ctx.getImageData(0, 0, els.canvas.width, els.canvas.height);
  } catch (error) {
    setStatus(`读取图片像素失败，无法校准：${error.message}`, "error");
    return;
  }

  const offsetX = Number(els.offsetX.value || 0);
  const offsetY = Number(els.offsetY.value || 0);
  const scale = sourceScale();
  let changed = 0;

  for (const point of state.layout) {
    if (point.type === "ignore") continue;
    const displayPoint = pointWithOffset(point);
    const radius = displayPoint.r || Number(els.radiusInput.value || 28);
    const found = searchBestFeatureNear(displayPoint, radius, imageData, 42);
    if (!found || found.rawScore < 0.16) continue;

    const shift = Math.hypot(found.x - displayPoint.x, found.y - displayPoint.y);
    if (shift > 34) continue;

    const nextX = Math.round((found.x - offsetX) / scale.x);
    const nextY = Math.round((found.y - offsetY) / scale.y);
    if (point.x !== nextX || point.y !== nextY) {
      point.x = nextX;
      point.y = nextY;
      changed += 1;
    }
  }

  runInspection(`已按当前图片校准 ${changed} 个点位`);
  if (changed > 0) {
    saveLayout(`已按当前图片校准 ${changed} 个点位`);
    void syncLayoutFileIfConnected("校准后的点位已写入文件");
  } else {
    setStatus(`当前点位已贴近圆心，无需校准 · ${formatTime(new Date())}`, "ok");
  }
}

function canvasPoint(event) {
  const rect = els.canvas.getBoundingClientRect();
  const scaleX = els.canvas.width / rect.width;
  const scaleY = els.canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

function nearestPoint(pos) {
  let best = null;
  let bestDistance = Infinity;
  for (const originalPoint of state.layout) {
    const point = pointWithOffset(originalPoint);
    const distance = Math.hypot(pos.x - point.x, pos.y - point.y);
    if (distance < bestDistance && distance <= point.r * 1.4) {
      best = originalPoint;
      bestDistance = distance;
    }
  }
  return best;
}

function nearestAnchor(pos) {
  let best = null;
  let bestDistance = Infinity;
  for (const anchor of state.calibration) {
    const distance = Math.hypot(pos.x - anchor.x, pos.y - anchor.y);
    if (distance < bestDistance && distance <= 36) {
      best = anchor;
      bestDistance = distance;
    }
  }
  return best;
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function toggleMonitoring() {
  if (state.monitoring) {
    stopMonitoring();
    setStatus("视频监控已停止", "warn");
    return;
  }
  startMonitoring();
}

function startMonitoring() {
  if (state.sourceMode !== "video" || !hasDrawableSource()) {
    setStatus("请先导入录像或打开摄像头，再开始监控。", "warn");
    return;
  }

  const pendingCount = state.initialStatusByPoint
    ? Object.values(state.initialStatusByPoint).filter((status) => status === "NG").length - Object.keys(state.tighteningByPoint).length
    : captureInitialTighteningStatus();
  state.monitoring = true;
  state.lastMonitorAt = 0;
  els.videoSource.play().catch(() => {});
  startVideoPreview();
  updateMonitorPanel();
  setStatus(`视频监控已开始：已锁定 ${Math.max(0, pendingCount)} 个初始未拧点，只接受枪头稳定后的连续绿灯。`, "ok");
}

function stopMonitoring() {
  if (state.monitorFrameId) {
    cancelAnimationFrame(state.monitorFrameId);
    state.monitorFrameId = 0;
  }
  state.monitoring = false;
  updateMonitorPanel();
}

function monitorLoop(timestamp) {
  if (!state.monitoring) return;
  if (timestamp - state.lastMonitorAt >= 220) {
    state.lastMonitorAt = timestamp;
    runInspection("视频监控中", { recordTightening: true });
  }
  state.monitorFrameId = requestAnimationFrame(monitorLoop);
}

function stopVideoAndKeepLastFrame() {
  stopMonitoring();
  stopVideoSource();
  state.sourceMode = "image";
  state.liveSignal = null;
  updateMonitorPanel();
  setStatus("视频源已停止，可重新导入图片、录像或打开摄像头。", "warn");
}

els.loadImageBtn.addEventListener("click", () => els.imageInput.click());
els.imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  loadImage(url, file.name);
});
els.loadVideoBtn.addEventListener("click", () => els.videoInput.click());
els.videoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  loadVideoFile(file);
  event.target.value = "";
});
els.layoutInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  void readLayoutFromInput(file);
  event.target.value = "";
});

els.cameraBtn.addEventListener("click", () => {
  void startCamera();
});
els.monitorBtn.addEventListener("click", toggleMonitoring);
els.stopVideoBtn.addEventListener("click", stopVideoAndKeepLastFrame);
els.runBtn.addEventListener("click", () => runInspection("手动重新检测完成"));
els.resetLayoutBtn.addEventListener("click", resetLayout);
els.snapLayoutBtn.addEventListener("click", snapLayoutToCurrentImage);
els.resetCalibrationBtn.addEventListener("click", resetCalibration);
els.autoLocateBtn.addEventListener("click", () => autoLocateBoard("手动自动定位完成"));
els.openLayoutBtn.addEventListener("click", () => {
  void openLayoutFile();
});
els.saveLayoutFileBtn.addEventListener("click", () => {
  void saveLayoutFile();
});
els.exportResultBtn.addEventListener("click", () => {
  void saveJsonToFile("bolt-inspection-result.json", resultPayload())
    .then((handle) => {
      const target = handle?.name || "bolt-inspection-result.json";
      setStatus(`检测结果已保存：${target} · ${formatTime(new Date())}`, handle ? "ok" : "warn");
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        setStatus(`保存检测结果失败：${error.message}`, "error");
      }
    });
});

els.applyPointBtn.addEventListener("click", applyPointEdit);
els.addPointBtn.addEventListener("click", addPoint);
els.deletePointBtn.addEventListener("click", deletePoint);

els.calibrationMode.addEventListener("change", () => {
  if (els.calibrationMode.checked) {
    els.editMode.checked = false;
    setStatus("标定模式：拖动 4 个蓝色方块到当前图片的板子四角。", "warn");
  }
  drawOverlay();
});

els.editMode.addEventListener("change", () => {
  if (els.editMode.checked) {
    els.calibrationMode.checked = false;
    setStatus("点位编辑模式：拖动单个 ROI 圆圈微调。", "warn");
  }
  drawOverlay();
});

els.autoLocateOnLoad.addEventListener("change", () => {
  saveSettings(els.autoLocateOnLoad.checked ? "已开启导入后自动定位" : "已关闭导入后自动定位");
});

[els.offsetX, els.offsetY, els.radiusInput, els.minPresence, els.maxPresence, els.minSolidHead, els.maxOffsetRatio, els.maxShadowImbalance]
  .forEach((input) => input.addEventListener("change", () => {
    saveSettings("检测参数已保存");
    runInspection("参数变化后已重新检测");
  }));

els.operationMode.addEventListener("change", () => {
  saveSettings(els.operationMode.value === "loosen" ? "已切换到松开测试模式" : "已切换到拧紧记录模式");
  updateMonitorPanel();
});

els.canvas.addEventListener("mousedown", (event) => {
  const pos = canvasPoint(event);
  if (els.calibrationMode.checked) {
    const anchor = nearestAnchor(pos);
    if (!anchor) return;
    state.selectedAnchorId = anchor.id;
    state.dragging = true;
    state.dragTarget = "anchor";
    state.dirtyDuringDrag = false;
    state.dragOffset = {
      x: pos.x - anchor.x,
      y: pos.y - anchor.y,
    };
    drawOverlay();
    return;
  }

  const point = nearestPoint(pos);
  if (!point) return;
  selectPoint(point.id);
  if (!els.editMode.checked) return;
  state.dragging = true;
  state.dragTarget = "point";
  state.dirtyDuringDrag = false;
  const displayPoint = pointWithOffset(point);
  state.dragOffset = {
    x: pos.x - displayPoint.x,
    y: pos.y - displayPoint.y,
  };
});

els.canvas.addEventListener("mousemove", (event) => {
  if (!state.dragging) return;
  const pos = canvasPoint(event);

  if (state.dragTarget === "anchor") {
    const anchor = state.calibration.find((item) => item.id === state.selectedAnchorId);
    if (!anchor) return;
    anchor.x = Math.round(pos.x - state.dragOffset.x);
    anchor.y = Math.round(pos.y - state.dragOffset.y);
    state.dirtyDuringDrag = true;
    runInspection();
    return;
  }

  const point = state.layout.find((item) => item.id === state.selectedId);
  if (!point) return;
  const scale = sourceScale();
  const displayPoint = {
    x: (pos.x - state.dragOffset.x - Number(els.offsetX.value || 0)) / scale.x,
    y: (pos.y - state.dragOffset.y - Number(els.offsetY.value || 0)) / scale.y,
  };
  point.x = Math.round(displayPoint.x);
  point.y = Math.round(displayPoint.y);
  state.dirtyDuringDrag = true;
  syncSelectedFields();
  runInspection();
});

window.addEventListener("mouseup", () => {
  if (state.dragging && state.dirtyDuringDrag) {
    if (state.dragTarget === "anchor") {
      saveCalibration("标定基准点已保存");
    } else {
      saveLayout("拖动点位已保存");
      void syncLayoutFileIfConnected("拖动点位已写入文件");
    }
  }
  state.dragging = false;
  state.dragTarget = "";
  state.dirtyDuringDrag = false;
});

applySavedSettings();
loadImage("./assets/sample-board.png", "sample-board.png");
void loadPoseModel().then(() => {
  if (state.sourceMode === "image" && state.image) runInspection("YOLO 枪头模型已加载");
});
