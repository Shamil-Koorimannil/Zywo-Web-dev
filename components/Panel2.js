class BentoPanel2 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p2";
    this.innerHTML = `
      <div class="p2-top">
        <div class="p2-logo"></div>
        <a href="#" class="p2-btn">Blogs</a>
      </div>
      <div class="p2-bottom">
        <div class="p2-tagline-1"></div>
        <div class="p2-tagline-2"></div>
      </div>
    `;
  }
}

customElements.define('bento-panel-2', BentoPanel2);
