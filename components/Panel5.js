class BentoPanel5 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p5";
    this.innerHTML = `
      <div class="p5-animation-wrapper" style="cursor: pointer; overflow: hidden; height: 100%; display: flex; flex-direction: column;">
        <div class="p5-top">
          <div class="p5-title-group">
            <img class="p5-service-logo" src="assets/logo/Zywo Design Studio.svg" alt="Branding">
            <h3 class="p5-service-name">Branding</h3>
          </div>
          <div class="p5-dot"></div>
        </div>
        <div class="p5-desc">
          <p class="p5-service-desc">Transforming bold ideas into lasting visual identities that connect with people.</p>
        </div>
      </div>
    `;

    const services = [
      { name: 'Branding', file: 'branding.html', icon: 'assets/logo/Zywo Design Studio.svg', desc: 'Transforming bold ideas into lasting visual identities that connect with people.' },
      { name: 'Visual Identity', file: 'visual-identity.html', icon: 'assets/logo/Zywo Design Studio.svg', desc: 'Designing cohesive visual systems for your brand making it truly unforgettable.' },
      { name: 'Video Production', file: 'video-production.html', icon: 'assets/logo/Zywo Production.svg', desc: 'Filming to Final Cut: Crafting high-impact video experiences from the ground up.' },
      { name: 'Web Development', file: 'web-development.html', icon: 'assets/logo/Zywo Labs.svg', desc: 'Engineering robust, seamless digital platforms backed by cutting-edge architecture.' }
    ];

    let currentIndex = 0;

    // Wire up navigation logic
    this.addEventListener('click', () => {
      const url = 'services/' + services[currentIndex].file;
      if (window.triggerPageTransition) {
        window.triggerPageTransition(url);
      } else {
        window.location.href = url;
      }
    });
    const logoEl = this.querySelector(".p5-service-logo");
    const nameEl = this.querySelector(".p5-service-name");
    const descEl = this.querySelector(".p5-service-desc");

    if (nameEl && descEl && logoEl) {
      setInterval(() => {
        // 1. Slide Out
        logoEl.classList.add("slide-left-fast");
        nameEl.classList.add("slide-left-med");
        descEl.classList.add("slide-left-slow");

        setTimeout(() => {
          // 2. Update Content while hidden offscreen
          currentIndex = (currentIndex + 1) % services.length;
          logoEl.src = services[currentIndex].icon;
          logoEl.alt = services[currentIndex].name;
          nameEl.textContent = services[currentIndex].name;
          descEl.textContent = services[currentIndex].desc;

          // 3. Revert outflows and snap instantaneously to the right
          logoEl.classList.remove("slide-left-fast");
          nameEl.classList.remove("slide-left-med");
          descEl.classList.remove("slide-left-slow");

          logoEl.classList.add("prepare-right-fast");
          nameEl.classList.add("prepare-right-med");
          descEl.classList.add("prepare-right-slow");

          // 4. Force Browser Thread Repaint Buffer
          void logoEl.offsetWidth;

          // 5. Trigger CSS Interpolation Parallax Cascade Flow In
          logoEl.classList.remove("prepare-right-fast");
          nameEl.classList.remove("prepare-right-med");
          descEl.classList.remove("prepare-right-slow");
        }, 800); // Allow outflow animation to finish
      }, 5000); // Total cycle time
    }
  }
}

customElements.define('bento-panel-5', BentoPanel5);
