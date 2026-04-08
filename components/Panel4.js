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

    const p4Profile = this.querySelector(".p4-profile");
    const p4Quote = this.querySelector(".p4-quote");
    const p4Name = this.querySelector(".p4-name");
    const p4Role = this.querySelector(".p4-role");
    const p4Test = this.querySelector(".p4-test");

    if (p4Profile && p4Quote && p4Name && p4Role && p4Test) {
      setInterval(() => {
        p4Profile.classList.add("slide-left-fast");
        p4Name.classList.add("slide-left-fast");
        
        p4Quote.classList.add("slide-left-med");
        p4Role.classList.add("slide-left-med");

        p4Test.classList.add("slide-left-slow");

        setTimeout(() => {
          // Reverting Outflows
          p4Profile.classList.remove("slide-left-fast");
          p4Name.classList.remove("slide-left-fast");
          
          p4Quote.classList.remove("slide-left-med");
          p4Role.classList.remove("slide-left-med");

          p4Test.classList.remove("slide-left-slow");
          
          // Immediate Snapping Triggers
          p4Profile.classList.add("prepare-right-fast");
          p4Name.classList.add("prepare-right-fast");
          
          p4Quote.classList.add("prepare-right-med");
          p4Role.classList.add("prepare-right-med");

          p4Test.classList.add("prepare-right-slow");
          
          // Randomize widths to simulate changing contents
          p4Name.style.width = Math.floor(Math.random() * 40 + 40) + '%';
          p4Role.style.width = Math.floor(Math.random() * 30 + 30) + '%';
          p4Test.style.width = Math.floor(Math.random() * 40 + 40) + '%';
          p4Quote.style.width = Math.floor(Math.random() * 15 + 10) + '%';

          // Browser UI Thread Repaint Buffer Check
          void p4Profile.offsetWidth;
          
          // Trigger CSS Interpolation Parallax Cascade Flow In
          p4Profile.classList.remove("prepare-right-fast");
          p4Name.classList.remove("prepare-right-fast");
          
          p4Quote.classList.remove("prepare-right-med");
          p4Role.classList.remove("prepare-right-med");

          p4Test.classList.remove("prepare-right-slow");
        }, 1000); 
      }, 5500);
    }
  }
}

customElements.define('bento-panel-4', BentoPanel4);

