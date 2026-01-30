document.querySelectorAll("[data-folder-id]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dialogId = btn.getAttribute("data-folder-id");
    if (!dialogId) return;

    const dialog = document.getElementById(dialogId) as
      | HTMLDialogElement
      | null;

    if (!dialog) return;
    if (dialog.open) return;

    dialog.showModal();
  });
});
