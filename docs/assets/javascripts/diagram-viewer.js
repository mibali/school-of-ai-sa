(() => {
  const viewerId = "diagram-viewer";
  let dialog;
  let canvas;
  let zoomLabel;
  let zoom = 1;
  let translateX = 0;
  let translateY = 0;
  let dragStart;

  function decodeSource(encodedSource) {
    const binary = atob(encodedSource);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function createDialog() {
    if (dialog) return dialog;

    dialog = document.createElement("dialog");
    dialog.id = viewerId;
    dialog.className = "diagram-lightbox";
    dialog.innerHTML = `
      <div class="diagram-lightbox__header">
        <p id="diagram-viewer-title">Architecture diagram</p>
        <div class="diagram-lightbox__controls" aria-label="Diagram controls">
          <button type="button" data-action="zoom-out" aria-label="Zoom out">−</button>
          <output aria-live="polite">100%</output>
          <button type="button" data-action="zoom-in" aria-label="Zoom in">+</button>
          <button type="button" data-action="reset">Reset</button>
          <button type="button" data-action="close" aria-label="Close diagram viewer">Close</button>
        </div>
      </div>
      <p class="diagram-lightbox__help">Use the mouse wheel to zoom. Drag to move the diagram. Press Escape to close.</p>
      <div class="diagram-lightbox__viewport">
        <div class="diagram-lightbox__canvas"></div>
      </div>
    `;

    canvas = dialog.querySelector(".diagram-lightbox__canvas");
    zoomLabel = dialog.querySelector("output");

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();

      const action = event.target.dataset.action;
      if (action === "zoom-in") changeZoom(0.2);
      if (action === "zoom-out") changeZoom(-0.2);
      if (action === "reset") resetView();
      if (action === "close") dialog.close();
    });

    dialog.querySelector(".diagram-lightbox__viewport").addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        changeZoom(event.deltaY < 0 ? 0.15 : -0.15);
      },
      { passive: false },
    );

    canvas.addEventListener("pointerdown", (event) => {
      if (zoom <= 1) return;
      dragStart = { x: event.clientX - translateX, y: event.clientY - translateY };
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add("is-dragging");
    });

    canvas.addEventListener("pointermove", (event) => {
      if (!dragStart) return;
      translateX = event.clientX - dragStart.x;
      translateY = event.clientY - dragStart.y;
      updateTransform();
    });

    canvas.addEventListener("pointerup", () => {
      dragStart = undefined;
      canvas.classList.remove("is-dragging");
    });

    document.body.append(dialog);
    return dialog;
  }

  function updateTransform() {
    canvas.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom})`;
    zoomLabel.value = `${Math.round(zoom * 100)}%`;
  }

  function resetView() {
    zoom = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  }

  function changeZoom(change) {
    zoom = Math.min(3, Math.max(0.5, Number((zoom + change).toFixed(2))));
    updateTransform();
  }

  function setInitialZoom() {
    const diagram = canvas.querySelector("svg");
    const viewport = dialog.querySelector(".diagram-lightbox__viewport");
    const viewBox = diagram?.viewBox.baseVal;
    if (viewBox?.width && viewBox.height && viewport) {
      const maxWidth = viewport.clientWidth * 0.9;
      const maxHeight = viewport.clientHeight * 0.8;
      const aspectRatio = viewBox.width / viewBox.height;
      canvas.style.width = `${Math.min(maxWidth, maxHeight * aspectRatio)}px`;
    }

    zoom = 1;
    updateTransform();
  }

  async function openViewer(trigger) {
    const source = decodeSource(trigger.dataset.mermaidSource);
    const lightbox = createDialog();
    const title = trigger.closest(".admonition, details")?.querySelector(".admonition-title, summary")?.textContent;

    lightbox.querySelector("#diagram-viewer-title").textContent = title || "Architecture diagram";
    canvas.replaceChildren();
    resetView();
    lightbox.showModal();

    try {
      const { svg, bindFunctions } = await window.mermaid.render(
        `diagram-lightbox-${Date.now()}`,
        source,
      );
      canvas.innerHTML = svg;
      bindFunctions?.(canvas);
      setInitialZoom();
    } catch (error) {
      canvas.textContent = "The diagram could not be rendered. Please close the viewer and try again.";
      console.error("Unable to render the diagram viewer", error);
    }
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".diagram-viewer");
    if (trigger) openViewer(trigger);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const trigger = event.target.closest(".diagram-viewer");
    if (!trigger) return;
    event.preventDefault();
    openViewer(trigger);
  });
})();
