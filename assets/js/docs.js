const cache = new Map();

async function loadMarkdown(file, { signal } = {}) {
  if (!file) return;

  // Loading UI
  markdownContent.innerHTML = '<p class="loading">Loading…</p>';

  // Return cached content if present
  if (cache.has(file)) {
    renderMarkdown(cache.get(file), file);
    return;
  }

  const controller = new AbortController();
  const combinedSignal = signal ? mergeSignals(signal, controller.signal) : controller.signal;
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch("/docs/md/" + encodeURIComponent(file), { signal: combinedSignal });
    clearTimeout(timeout);

    if (!response.ok) {
      markdownContent.innerHTML = `
        <h1>404</h1>
        <p>Document not found.</p>
      `;
      return;
    }

    const markdown = await response.text();

    // Convert markdown -> HTML
    const html = marked.parse(markdown);
    // If you want sanitization, uncomment the next line and include DOMPurify in your page:
    // const safeHtml = DOMPurify.sanitize(html);

    // cache
    cache.set(file, html);

    renderMarkdown(html, file);
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      markdownContent.innerHTML = '<p class="error">Request timed out or was cancelled.</p>';
    } else {
      markdownContent.innerHTML = '<p class="error">Failed to load document.</p>';
      console.error("loadMarkdown:", err);
    }
  }
}

function renderMarkdown(html, file) {
  markdownContent.innerHTML = html;

  // Safe-ish title
  try {
    const title = decodeURIComponent(file).replace(/\.md$/i, "") || "Document";
    document.title = `${title} - fv3-cpp`;
  } catch (e) {
    document.title = `fv3-cpp`;
  }

  // Scroll to top
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (e) {
    window.scrollTo(0, 0);
  }

  // Generate TOC after paint
  requestAnimationFrame(() => {
    generateTOC();
  });
}

// Helper to merge AbortSignals
function mergeSignals(...signals) {
  const controller = new AbortController();
  const onAbort = () => controller.abort();

  signals.forEach(s => {
    if (!s) return;
    if (s.aborted) controller.abort();
    else s.addEventListener("abort", onAbort, { once: true });
  });

  return controller.signal;
}
