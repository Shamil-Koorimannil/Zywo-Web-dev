class BentoPanel6 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p6";
    const logos = `
      <img src="assets/clients/ARC logo.svg" class="p6-logo" alt="ARC">
      <img src="assets/clients/Atom jr Logo.svg" class="p6-logo" alt="Atom jr">
      <img src="assets/clients/Coolcane logo.svg" class="p6-logo" alt="Coolcane">
      <img src="assets/clients/Edhwi logo.svg" class="p6-logo" alt="Edhwi">
      <img src="assets/clients/Fillmore logo.svg" class="p6-logo" alt="Fillmore">
      <img src="assets/clients/LOGO_INDOMIE.svg" class="p6-logo" alt="Indomie">
      <img src="assets/clients/Lamar logo.svg" class="p6-logo" alt="Lamar">
      <img src="assets/clients/Mandi manzil.svg" class="p6-logo" alt="Mandi Manzil">
      <img src="assets/clients/Mouzy logo Yellow.svg" class="p6-logo" alt="Mouzy">
      <img src="assets/clients/Pisang logo.svg" class="p6-logo" alt="Pisang">
      <img src="assets/clients/Polski Kebab.svg" class="p6-logo" alt="Polski Kebab">
      <img src="assets/clients/Shairan Cafe logo Orange.svg" class="p6-logo" alt="Shairan Cafe">
      <img src="assets/clients/Trace  logo.svg" class="p6-logo" alt="Trace">
      <img src="assets/clients/Y69 logo.svg" class="p6-logo" alt="Y69">
      <img src="assets/clients/fluxify logo.svg" class="p6-logo" alt="Fluxify">
      <img src="assets/clients/fudge logo.svg" class="p6-logo" alt="Fudge">
      <img src="assets/clients/thara group logo.svg" class="p6-logo" alt="Thara Group">
    `;

    this.innerHTML = `
      <div class="marquee-track">
        <div class="marquee-content">
          ${logos}
        </div>
        <div class="marquee-content" aria-hidden="true">
          ${logos}
        </div>
      </div>
    `;
  }
}

customElements.define('bento-panel-6', BentoPanel6);
