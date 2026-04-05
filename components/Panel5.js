class BentoPanel5 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p5";
    this.innerHTML = `
      <div class="p5-top">
        <div class="p5-title-group">
          <div class="p5-logo"></div>
          <div class="p5-name"></div>
        </div>
        <div class="p5-dot"></div>
      </div>
      <div class="p5-desc">
        <div class="p5-line-1"></div>
        <div class="p5-line-2"></div>
        <div class="p5-line-3"></div>
      </div>
    `;
  }
}

customElements.define('bento-panel-5', BentoPanel5);
