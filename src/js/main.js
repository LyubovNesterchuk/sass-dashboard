import "../scss/main.scss";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

// Sidebar menu
const refsMenu = {
  openMenuBtn: document.querySelector(".js-menu-open"),
  closeMenuBtn: document.querySelector(".js-menu-close"),
  overlayMenu: document.querySelector(".js-menu"),
};

const toggleMenu = () => {
  const isMenuOpen =
    refsMenu.openMenuBtn.getAttribute("aria-expanded") === "true";

  refsMenu.openMenuBtn.setAttribute("aria-expanded", String(!isMenuOpen));
  refsMenu.overlayMenu.classList.toggle("is-open");

  if (!isMenuOpen) {
    disableBodyScroll(document.body);
  } else {
    enableBodyScroll(document.body);
  }
};

refsMenu.openMenuBtn.addEventListener("click", toggleMenu);
refsMenu.closeMenuBtn.addEventListener("click", toggleMenu);

window
  .matchMedia("(min-width: 1200px)")
  .addEventListener("change", (event) => {
    if (!event.matches) return;

    refsMenu.overlayMenu.classList.remove("is-open");
    refsMenu.openMenuBtn.setAttribute("aria-expanded", "false");
    enableBodyScroll(document.body);
  });