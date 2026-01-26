const noteCards = document.querySelectorAll("[data-note-id]");

noteCards.forEach((btn) => {
  btn.addEventListener("click", () => {
    const noteId = btn.getAttribute("data-note-id");

    const content = document.querySelector(
      `[data-note-content="${noteId}"]`,
    );

    if (content) {
      navigator.clipboard.writeText(content.textContent.trim());
    }
  });
});
