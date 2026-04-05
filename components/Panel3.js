class BentoPanel3 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p3";
    this.innerHTML = `
      <div class="p3-img"></div>
      <div class="p3-text">Team</div>
      <div class="p3-img"></div>
    `;
  }
}

customElements.define('bento-panel-3', BentoPanel3);
