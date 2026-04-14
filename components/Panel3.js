class BentoPanel3 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p3";
    this.innerHTML = `
      <style>
        .p3-img-anchor {
            display: contents;
            text-decoration: none;
        }
        .p3-img {
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .p3-img:hover {
            transform: scale(1.05);
        }
      </style>
      <a href="founder-page-standalone.html" class="p3-img-anchor">
          <div class="p3-img" title="View Founder Profile" style="background-image: url('./assets/images/Rayan hany a.jpg'); background-size: cover; background-position: center;"></div>
      </a>
      <div class="p3-text">Team</div>
      <a href="team-page-standalone.html" class="p3-img-anchor">
          <div class="p3-img" title="View Team Profile" style="background-image: url('./assets/images/group photo.jpg'); background-size: cover; background-position: center;"></div>
      </a>
    `;
  }
}

customElements.define('bento-panel-3', BentoPanel3);
