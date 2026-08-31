const LAYOUT_STORAGE_KEY = "luoshuan-python.bolt-layout.v1";

const state = {
  image: null,
  imageFile: null,
  imageName: "",
  imageUrl: null,
  layout: [],
  results: [],
  selectedId: "",
  dragging: false,
  dragOffset: { x: 0, y: 0 },
};

const els = {
  canvas: document.getElementById("imageCanvas"),
  imageInput: document.getElementById("imageInput"),
  loadImageBtn: document.getElementById("loadImageBtn"),
  useSampleBtn: document.getElementById("useSampleBtn"),
  runBtn: document.getElementById("runBtn"),
  exportLayoutBtn: document.getElementById("exportLayoutBtn"),
  exportResultBtn: document.getElementById("exportResultBtn"),
  resetLayoutBtn: document.getElementById("resetLayoutBtn"),
  editMode: document.getElementById("editMode"),
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
  maxOffsetRatio: document.getElementById("maxOffsetRatio"),
  maxShadowImbalance: document.getElementById("maxShadowImbalance"),
  resultBody: document.getElementById("resultBody"),
  okCount: document.getElementById("okCount"),
  reviewCount: document.getElementById("reviewCount"),
  ngCount: document.getElementById("ngCount"),
  missingCount: document.getElementById("missingCount"),
  ignoreCount: document.getElementById("ignoreCount"),
  imageInfo: document.getElementById("imageInfo"),
  loadingOverlay: document.getElementById("loadingOverlay"),
};

const ctx = els.canvas.getContext("2d");

function loadLayout() {
  try {
    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      if (parsed.length === 0) return null;
      return { layout: parsed, thresholds: null };
    }
    if (parsed && Array.isArray(parsed.layout) && parsed.layout.length > 0) {
      return { layout: parsed.layout, thresholds: parsed.thresholds || null };
    }
    return null;
  } catch {
    return null;
  }
}

function saveLayout() {
  try {
    const payload = {
      layout: state.layout,
      thresholds: getThresholds(),
    };
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(payload));
  } catch {}
}

async function saveLayoutToServer() {
  try {
    const response = await fetch("/api/layout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.layout),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `保存失败: ${response.status}`);
    }
    return true;
  } catch (err) {
    console.error(err);
    alert("保存到服务器失败: " + err.message);
    return false;
  }
}

function resetLayout() {
  localStorage.removeItem(LAYOUT_STORAGE_KEY);
  fetch("/api/defaults")
    .then((r) => r.json())
    .then((data) => {
      state.layout = JSON.parse(JSON.stringify(data.layout));
      if (data.thresholds) {
        els.minPresence.value = data.thresholds.minPresence ?? els.minPresence.value;
        els.maxPresence.value = data.thresholds.maxPresence ?? els.maxPresence.value;
        els.maxOffsetRatio.value = data.thresholds.maxOffsetRatio ?? els.maxOffsetRatio.value;
        els.maxShadowImbalance.value = data.thresholds.maxShadowImbalance ?? els.maxShadowImbalance.value;
      }
      syncSelectedFields();
      drawOverlay();
      runInspection();
    });
}

function getThresholds() {
  return {
    minPresence: Number(els.minPresence.value),
    maxPresence: Number(els.maxPresence.value),
    maxOffsetRatio: Number(els.maxOffsetRatio.value),
    maxShadowImbalance: Number(els.maxShadowImbalance.value),
  };
}

function pointWithOffset(point) {
  return {
    ...point,
    x: point.x + Number(els.offsetX.value || 0),
    y: point.y + Number(els.offsetY.value || 0),
    r: point.r || Number(els.radiusInput.value || 28),
  };
}

function showLoading(show) {
  els.loadingOverlay.style.display = show ? "flex" : "none";
}

async function runInspection() {
  if (!state.image && !state.imageFile) return;

  showLoading(true);

  const formData = new FormData();
  formData.append("layout", JSON.stringify(state.layout));
  formData.append("thresholds", JSON.stringify(getThresholds()));
  formData.append("offsetX", els.offsetX.value || "0");
  formData.append("offsetY", els.offsetY.value || "0");

  try {
    let response;
    if (state.imageFile) {
      formData.append("image", state.imageFile, state.imageName);
      response = await fetch("/api/detect", { method: "POST", body: formData });
    } else {
      response = await fetch("/api/detect-sample", { method: "POST", body: formData });
    }

    if (!response.ok) {
      throw new Error(`检测失败: ${response.status}`);
    }

    const data = await response.json();
    state.results = data.results;

    if (data.width && data.height) {
      els.canvas.width = data.width;
      els.canvas.height = data.height;
    }

    drawOverlay();
    renderResults();
    syncSelectedFields();
  } catch (err) {
    console.error(err);
    alert("检测失败: " + err.message);
  } finally {
    showLoading(false);
  }
}

function drawOverlay() {
  if (!state.image) return;
  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
  ctx.drawImage(state.image, 0, 0);

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
}

function resultColor(status) {
  if (status === "OK") return "#14804a";
  if (status === "REVIEW") return "#b86b00";
  if (status === "MISSING") return "#6a4ad8";
  if (status === "NG") return "#c7352f";
  return "#737b82";
}

function renderResults() {
  const counts = { OK: 0, REVIEW: 0, MISSING: 0, NG: 0, IGNORE: 0 };
  els.resultBody.innerHTML = "";

  for (const result of state.results) {
    counts[result.status] = (counts[result.status] || 0) + 1;
    const row = document.createElement("tr");
    row.dataset.id = result.id;
    row.innerHTML = `
      <td>${result.id}</td>
      <td>${result.type === "bolt" ? "螺栓" : "忽略"}</td>
      <td><span class="status ${statusClass(result.status)}">${statusText(result.status)}</span></td>
      <td>${formatRatio(result.presenceRatio)}</td>
      <td>${result.centerOffsetRatio.toFixed(2)} R</td>
      <td>${result.shadowImbalance.toFixed(2)}</td>
      <td>${result.note || ""}</td>
    `;
    row.addEventListener("click", () => selectPoint(result.id));
    els.resultBody.appendChild(row);
  }

  els.okCount.textContent = counts.OK || 0;
  els.reviewCount.textContent = counts.REVIEW || 0;
  els.missingCount.textContent = counts.MISSING || 0;
  els.ngCount.textContent = counts.NG || 0;
  els.ignoreCount.textContent = counts.IGNORE || 0;
}

function statusClass(status) {
  return {
    OK: "ok",
    REVIEW: "review",
    MISSING: "missing",
    NG: "ng",
    IGNORE: "ignore",
  }[status] || "";
}

function statusText(status) {
  return {
    OK: "OK",
    REVIEW: "复核",
    MISSING: "缺失",
    NG: "NG",
    IGNORE: "忽略",
  }[status] || status;
}

function formatRatio(value) {
  return `${(value * 100).toFixed(1)}%`;
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
  els.expectedColor.value = point.expectedColor || "auto";
}

function applyPointEdit() {
  const index = state.layout.findIndex((item) => item.id === state.selectedId);
  if (index < 0) return;

  state.layout[index] = {
    id: els.pointId.value.trim() || state.layout[index].id,
    type: els.pointType.value,
    x: Number(els.pointX.value),
    y: Number(els.pointY.value),
    r: Number(els.pointR.value),
    expectedColor: els.expectedColor.value,
  };
  state.selectedId = state.layout[index].id;
  saveLayout();
  saveLayoutToServer();
  runInspection();
}

function addPoint() {
  const nextNumber = String(state.layout.length + 1).padStart(2, "0");
  const point = {
    id: `P${nextNumber}`,
    x: Math.round(els.canvas.width / 2),
    y: Math.round(els.canvas.height / 2),
    r: Number(els.radiusInput.value || 28),
    type: "bolt",
    expectedColor: "auto",
  };
  state.layout.push(point);
  state.selectedId = point.id;
  saveLayout();
  saveLayoutToServer();
  runInspection();
}

function deletePoint() {
  const index = state.layout.findIndex((item) => item.id === state.selectedId);
  if (index < 0) return;
  state.layout.splice(index, 1);
  state.selectedId = state.layout[0]?.id || "";
  saveLayout();
  saveLayoutToServer();
  runInspection();
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

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function loadPreviewImage(src, name) {
  const img = new Image();
  img.onload = () => {
    state.image = img;
    state.imageName = name;
    els.canvas.width = img.naturalWidth;
    els.canvas.height = img.naturalHeight;
    els.imageInfo.textContent = `${name} · ${img.naturalWidth} x ${img.naturalHeight}`;
    if (!state.selectedId && state.layout.length > 0) {
      state.selectedId = state.layout[0].id;
    }
    syncSelectedFields();
    drawOverlay();
    runInspection();
  };
  img.src = src;
}

els.loadImageBtn.addEventListener("click", () => els.imageInput.click());
els.imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  state.imageFile = file;
  const url = URL.createObjectURL(file);
  loadPreviewImage(url, file.name);
});

els.useSampleBtn.addEventListener("click", () => {
  state.imageFile = null;
  fetch("/api/defaults")
    .then((r) => r.json())
    .then((data) => {
      state.layout = JSON.parse(JSON.stringify(data.layout));
      if (data.thresholds) {
        els.minPresence.value = data.thresholds.minPresence ?? els.minPresence.value;
        els.maxPresence.value = data.thresholds.maxPresence ?? els.maxPresence.value;
        els.maxOffsetRatio.value = data.thresholds.maxOffsetRatio ?? els.maxOffsetRatio.value;
        els.maxShadowImbalance.value = data.thresholds.maxShadowImbalance ?? els.maxShadowImbalance.value;
      }
      localStorage.removeItem(LAYOUT_STORAGE_KEY);
      if (data.imageUrl) {
        loadPreviewImage(data.imageUrl, data.imageName);
      } else {
        alert("示例图片不可用");
      }
    });
});

els.runBtn.addEventListener("click", runInspection);
els.exportLayoutBtn.addEventListener("click", async () => {
  const ok = await saveLayoutToServer();
  if (ok) {
    downloadJson("standard_layout.json", state.layout);
  }
});
els.exportResultBtn.addEventListener("click", () =>
  downloadJson("bolt-inspection-result.json", {
    imageName: state.imageName,
    thresholds: getThresholds(),
    results: state.results,
  })
);

els.resetLayoutBtn.addEventListener("click", () => {
  if (!confirm("确定恢复默认布局？当前所有点位修改将被清除。")) return;
  resetLayout();
});

els.applyPointBtn.addEventListener("click", applyPointEdit);
els.addPointBtn.addEventListener("click", addPoint);
els.deletePointBtn.addEventListener("click", deletePoint);

[els.offsetX, els.offsetY, els.radiusInput, els.minPresence, els.maxPresence, els.maxOffsetRatio, els.maxShadowImbalance]
  .forEach((input) => input.addEventListener("change", runInspection));

els.canvas.addEventListener("mousedown", (event) => {
  const pos = canvasPoint(event);
  const point = nearestPoint(pos);
  if (!point) return;
  selectPoint(point.id);
  if (!els.editMode.checked) return;
  state.dragging = true;
  state.dragOffset = {
    x: pos.x - point.x,
    y: pos.y - point.y,
  };
});

els.canvas.addEventListener("mousemove", (event) => {
  if (!state.dragging) return;
  const point = state.layout.find((item) => item.id === state.selectedId);
  if (!point) return;
  const pos = canvasPoint(event);
  point.x = Math.round(pos.x - state.dragOffset.x);
  point.y = Math.round(pos.y - state.dragOffset.y);
  syncSelectedFields();
  drawOverlay();
});

window.addEventListener("mouseup", () => {
  if (state.dragging) {
    saveLayout();
    saveLayoutToServer();
    runInspection();
  }
  state.dragging = false;
});

fetch("/api/defaults")
  .then((r) => r.json())
  .then((data) => {
    state.layout = JSON.parse(JSON.stringify(data.layout));

    if (data.thresholds) {
      els.minPresence.value = data.thresholds.minPresence ?? els.minPresence.value;
      els.maxPresence.value = data.thresholds.maxPresence ?? els.maxPresence.value;
      els.maxOffsetRatio.value = data.thresholds.maxOffsetRatio ?? els.maxOffsetRatio.value;
      els.maxShadowImbalance.value = data.thresholds.maxShadowImbalance ?? els.maxShadowImbalance.value;
    }

    localStorage.removeItem("bolt_layout_v1");

    if (data.imageUrl) {
      loadPreviewImage(data.imageUrl, data.imageName);
    }
  })
  .catch((err) => {
    console.error("初始化失败:", err);
    els.imageInfo.textContent = "连接后端失败，请确认 server.py 已启动";
  });