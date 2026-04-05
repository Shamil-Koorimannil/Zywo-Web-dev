class BentoPanel4 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p4";
    this.innerHTML = `
      <div class="p4-top">
        <div class="p4-profile"></div>
        <div class="p4-quote"></div>
      </div>
      <div class="p4-bottom">
        <div class="p4-name"></div>
        <div class="p4-role"></div>
        <div class="p4-test"></div>
      </div>
    `;
  }
}

customElements.define('bento-panel-4', BentoPanel4);
