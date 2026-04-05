class BentoPanel1 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p1";
    this.innerHTML = `
      <div class="p1-img"></div>
      <div class="p1-img"></div>
      <div class="p1-img"></div>
      <div class="p1-img"></div>
      <div class="p1-img"></div>
    `;
  }
}

customElements.define('bento-panel-1', BentoPanel1);
