class BentoPanel1 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p1";
    this.innerHTML = `
      <img src="assets/logo/Zywo AI Studio.svg" class="p1-img" alt="Zywo AI Studio">
      <img src="assets/logo/Zywo Design Studio.svg" class="p1-img" alt="Zywo Design Studio">
      <img src="assets/logo/Zywo Labs.svg" class="p1-img" alt="Zywo Labs">
      <img src="assets/logo/Zywo Online.svg" class="p1-img" alt="Zywo Online">
      <img src="assets/logo/Zywo Production.svg" class="p1-img" alt="Zywo Production">
    `;
  }
}

customElements.define('bento-panel-1', BentoPanel1);
