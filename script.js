// Show one page at a time. Sections can only be reached with the nav buttons.
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");

  document.querySelectorAll("nav button").forEach(b => {
    b.classList.toggle("active", b.dataset.page === pageId);
  });

  document.querySelector("main").scrollTop = 0; // new tab always starts at its top
}

const photoViewer = document.getElementById("photo-viewer");
const viewerImage = photoViewer.querySelector("img");
const closeViewerButton = photoViewer.querySelector(".photo-viewer-close");

function openPhotoViewer(image) {
  viewerImage.src = image.currentSrc || image.src;
  viewerImage.alt = image.alt;
  photoViewer.showModal();
}

document.querySelectorAll("main img").forEach(image => {
  image.tabIndex = 0;
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Open full-size image: ${image.alt || "photo"}`);
  image.addEventListener("click", () => openPhotoViewer(image));
  image.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPhotoViewer(image);
    }
  });
});

closeViewerButton.addEventListener("click", () => photoViewer.close());
photoViewer.addEventListener("click", event => {
  if (event.target === photoViewer) photoViewer.close();
});
photoViewer.addEventListener("close", () => viewerImage.removeAttribute("src"));