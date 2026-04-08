class BentoPanel7 extends HTMLElement {
  connectedCallback() {
    // Keep it entirely decoupled by strictly returning the identical CSS bindings representing the large complex quadrant
    this.className = "panel p7";
    this.style.cursor = "pointer";
    this.addEventListener('click', () => {
      if (window.triggerPageTransition) {
        window.triggerPageTransition('gallery.html');
      } else {
        window.location.href = 'gallery.html';
      }
    });
    this.innerHTML = `
      <div class="p7-inner">
        <div class="p7-row-top">
          <div class="p7-block-l"></div>
          <div class="p7-block-l desktop-only-block"></div>
          <div class="p7-block-m"></div>
          <div class="p7-block-m"></div>
          <div class="p7-stack">
            <div class="shape-circle"></div>
            <div class="shape-sq"></div>
            <div class="shape-sq"></div>
          </div>
        </div>
        <div class="p7-row-bot"></div>
      </div>
    `;
    // Internalized Staggered Parallax UI Animation engine scoped explicitly to just this component payload
    const blockLs = this.querySelectorAll(".p7-block-l");
    const blockL = blockLs[0];
    const blockL_new = blockLs[1];
    const blocksM = this.querySelectorAll(".p7-block-m");
    const blockM1 = blocksM[0];
    const blockM2 = blocksM[1];
    const stack = this.querySelector(".p7-stack");
    const rowBot = this.querySelector(".p7-row-bot");

    const els = [blockL, blockL_new, blockM1, blockM2, stack, rowBot];
    
    if (blockL && blockM1 && blockM2 && stack && rowBot) {
      setInterval(() => {
        // 1. Slide Out
        blockL.classList.add("slide-left-fast");
        if (blockL_new) blockL_new.classList.add("slide-left-fast");
        blockM1.classList.add("slide-left-med");
        blockM2.classList.add("slide-left-slow");
        stack.classList.add("slide-left-fast");
        rowBot.classList.add("slide-left-med");

        setTimeout(() => {
          // 2. Revert outflows and snap
          els.forEach(el => {
            el.classList.remove("slide-left-fast", "slide-left-med", "slide-left-slow");
          });

          blockL.classList.add("prepare-right-fast");
          if (blockL_new) blockL_new.classList.add("prepare-right-fast");
          blockM1.classList.add("prepare-right-med");
          blockM2.classList.add("prepare-right-slow");
          stack.classList.add("prepare-right-fast");
          rowBot.classList.add("prepare-right-med");

          // 3. Force Browser Thread Repaint Buffer
          void blockL.offsetWidth;
          if (blockL_new) void blockL_new.offsetWidth;

          // 4. Trigger CSS Interpolation Parallax Cascade Flow In
          els.forEach(el => {
            el.classList.remove("prepare-right-fast", "prepare-right-med", "prepare-right-slow");
          });
        }, 1000); // Allow outflow animation to finish
      }, 4500); // Total cycle time (offset slightly from p5 and p9 for asymmetric organic layout feel)
    }
  }
}

customElements.define('bento-panel-7', BentoPanel7);
