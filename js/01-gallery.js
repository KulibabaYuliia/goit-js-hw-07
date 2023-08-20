import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

galleryList.insertAdjacentHTML("beforeend", createGalleryCards(galleryItems));

function createGalleryCards(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
       data-source="${original}"
       alt="${description}"
      />
      </a>
  </li>`
    )
    .join("");
}

galleryList.addEventListener("click", onGalleryPictureClick);
let instance = "";

function onGalleryPictureClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);

  instance.show();

  document.addEventListener("keydown", onModalWindowEscKeydown);
}

function onModalWindowEscKeydown(e) {
  if (e.key === "Escape") {
    instance.close();
    document.removeEventListener("keydown", onModalWindowEscKeydown);
  }
}
