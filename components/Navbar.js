class BentoNavbar extends HTMLElement {
  connectedCallback() {
    // Preserve exact CSS footprint globally
    this.className = "navbar initial-visible";
    
    // Inject HTML payload
    this.innerHTML = `
      <a href="#" class="nav-item">Home</a>
      <a href="#" class="nav-item">Work</a>
      <a href="#" class="nav-item">Service</a>
      <a href="#" class="nav-item">Careers</a>
    `;

    // Internal encapsulated logic ripped from global scope
    setTimeout(() => {
      this.classList.remove("initial-visible");
    }, 5000);
  }
}

customElements.define('bento-navbar', BentoNavbar);
