const noteCopiedTimeouts = new WeakMap<Element, number>();

document.querySelectorAll("[data-note-id]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const noteId = btn.getAttribute("data-note-id");
    const content = document.querySelector(`[data-note-content="${noteId}"]`);
    const copiedLabel = btn.nextElementSibling as HTMLElement;

    if (content) {
      navigator.clipboard.writeText(content.textContent.trim());

      if (copiedLabel) {
        const prevTimeout = noteCopiedTimeouts.get(copiedLabel);
        if (prevTimeout) clearTimeout(prevTimeout);

        copiedLabel.classList.remove("scale-0");
        copiedLabel.classList.add("scale-100");

        const timeoutId = globalThis.setTimeout(() => {
          copiedLabel.classList.remove("scale-100");
          copiedLabel.classList.add("scale-0");
          noteCopiedTimeouts.delete(copiedLabel);
        }, 2000);

        noteCopiedTimeouts.set(copiedLabel, timeoutId);
      }
    }
  });
});
