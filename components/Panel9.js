class BentoPanel9 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p9";
    this.style.cursor = "pointer";
    this.addEventListener('click', () => {
      // Determine if we are already inside the campaigns grid page
      if (window.location.pathname.includes('campaigns.html')) {
        if (window.triggerPageTransition) {
          window.triggerPageTransition('campaign-detail.html');
        } else {
          window.location.href = 'campaign-detail.html';
        }
      } else {
        if (window.triggerPageTransition) {
          window.triggerPageTransition('campaigns.html');
        } else {
          window.location.href = 'campaigns.html';
        }
      }
    });
    this.innerHTML = `
      <div class="p9-left">
        <div class="p9-camp-img"></div>
      </div>
      <div class="p9-right">
        <div class="p9-camp-copy"></div>
        <div class="p9-camp-desc">
          <div class="p9-desc-1"></div>
          <div class="p9-desc-2"></div>
        </div>
        <div class="p9-camp-dots">
          <div class="p9-dot-tiny"></div>
          <div class="p9-dot-active"></div>
          <div class="p9-dot-tiny"></div>
        </div>
      </div>
    `;

    // Internalized Staggered Parallax UI Animation engine scoped explicitly to just this component payload
    const p9Img = this.querySelector(".p9-camp-img");
    const p9Copy = this.querySelector(".p9-camp-copy");
    const p9Desc = this.querySelector(".p9-camp-desc");

    if (p9Img && p9Copy && p9Desc) {
      setInterval(() => {
        p9Img.classList.add("slide-left-fast");
        p9Copy.classList.add("slide-left-med");
        p9Desc.classList.add("slide-left-slow");

        setTimeout(() => {
          // Reverting Outflows
          p9Img.classList.remove("slide-left-fast");
          p9Copy.classList.remove("slide-left-med");
          p9Desc.classList.remove("slide-left-slow");
          
          // Immediate Snapping Triggers
          p9Img.classList.add("prepare-right-fast");
          p9Copy.classList.add("prepare-right-med");
          p9Desc.classList.add("prepare-right-slow");
          
          // Browser UI Thread Repaint Buffer Check
          void p9Img.offsetWidth;
          
          // Trigger CSS Interpolation Parallax Cascade Flow In
          p9Img.classList.remove("prepare-right-fast");
          p9Copy.classList.remove("prepare-right-med");
          p9Desc.classList.remove("prepare-right-slow");
        }, 1000); 
      }, 5500);
    }
  }
}

customElements.define('bento-panel-9', BentoPanel9);
