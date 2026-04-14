class BentoPanel7 extends HTMLElement {
  connectedCallback() {
    // Keep it entirely decoupled by strictly returning the identical CSS bindings representing the large complex quadrant
    this.className = "panel p7";
    this.style.cursor = "pointer";
    this.addEventListener('click', () => {
      // Abort redirect if we are already in the gallery
      if (window.location.href.includes('gallery.html') || window.location.pathname.endsWith('gallery.html')) {
        return;
      }
      if (window.triggerPageTransition) {
        window.triggerPageTransition('gallery.html');
      } else {
        window.location.href = 'gallery.html';
      }
    });

    const staticMode = this.hasAttribute('data-static');
    const customLogo = this.getAttribute('data-logo');
    const startingLogo = customLogo ? customLogo : "./assets/clients/Mouzy logo Yellow.svg";

    this.innerHTML = `
      <div class="p7-inner">
        <div class="p7-row-top">
          <div class="p7-block-l"></div>
          <div class="p7-block-l desktop-only-block"></div>
          <div class="p7-block-m"></div>
          <div class="p7-block-m"></div>
          <div class="p7-stack">
            <div class="shape-circle"><img src="${startingLogo}"></div>
            <div class="shape-sq"></div>
            <div class="shape-sq"></div>
          </div>
        </div>
        <div class="p7-row-bot-wrapper">
          <div class="p7-block-l"></div>
          <div class="p7-block-l desktop-only-block"></div>
          <div class="p7-row-bot"></div>
        </div>
      </div>
    `;
    // Internalized Staggered Parallax UI Animation engine scoped explicitly to just this component payload
    const blockLs = this.querySelectorAll(".p7-block-l");
    const blockL = blockLs[0];
    const blockL_new = blockLs[1];
    const botL1 = blockLs[2];
    const botL2 = blockLs[3];
    const blocksM = this.querySelectorAll(".p7-block-m");
    const blockM1 = blocksM[0];
    const blockM2 = blocksM[1];
    const stack = this.querySelector(".p7-stack");
    const shapeSquares = this.querySelectorAll(".shape-sq");
    const sq1 = shapeSquares[0];
    const sq2 = shapeSquares[1];
    const rowBot = this.querySelector(".p7-row-bot");
    const shapeCircleImg = this.querySelector(".shape-circle img");

    const els = [blockL, blockL_new, blockM1, blockM2, stack, rowBot, botL1, botL2].filter(Boolean);

    const logos = [
      "./assets/clients/LOGO_INDOMIE.svg",
      "./assets/clients/Mouzy logo Yellow.svg",
      "./assets/clients/Y69 logo.svg",
      "./assets/clients/Shairan Cafe logo Orange.svg",
      "./assets/clients/Coolcane logo.svg",
      "./assets/clients/Fillmore logo.svg",
      "./assets/clients/Mandi manzil.svg",
      "./assets/clients/Lamar logo.svg",
      "./assets/clients/Edhwi logo.svg",
      "./assets/clients/Trace  logo.svg",
    ];
    let currentLogoIndex = 1;

    // --- DYNAMIC BRAND CONFIGURATION APPLY FUNCTION ---
    const applyBrandConfig = (logoUrl) => {
      // 1. Reset everything to prevent cross-contamination in animated loop mode
      if (blockL) { blockL.style.backgroundImage = ''; blockL.onclick = null; }
      if (blockL_new) { blockL_new.style.backgroundImage = ''; blockL_new.onclick = null; }
      if (blockM1) { blockM1.style.backgroundImage = ''; blockM1.onclick = null; }
      if (blockM2) { blockM2.style.backgroundImage = ''; blockM2.onclick = null; }
      if (botL1) { botL1.style.backgroundImage = ''; botL1.onclick = null; }
      if (botL2) { botL2.style.backgroundImage = ''; botL2.onclick = null; }
      if (rowBot) { rowBot.style.backgroundImage = ''; rowBot.onclick = null; }
      if (sq1) sq1.style.backgroundColor = '';
      if (sq2) sq2.style.backgroundColor = '';

      // 2. Resolve custom assets mapping
      const baseWorksPath = "./assets/works/";
      let brandConfig = null;
      const sLogoLower = logoUrl.toLowerCase();

      if (sLogoLower.includes('coolcane')) {
        brandConfig = {
          m1: { img: `${baseWorksPath}Coolcane/Coolcane Ant.jpeg`, link: "https://www.instagram.com/reel/DSh2A_UCNV7/?igsh=a25zeG1vOWVhazdq" },
          m2: { img: `${baseWorksPath}Coolcane/Coolcane Love.jpeg`, link: "https://www.instagram.com/reel/DUiTKqaExNU/?igsh=MWo2enFjMWt4cGQ1Nw==" },
          l1: { img: `${baseWorksPath}Coolcane/Coolcane Kids.jpeg`, link: "https://www.instagram.com/p/DRBZV00kxZV/?igsh=emtmcThiYzIwYWZy" },
          l2: null,
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "#d0dd71", sqColor2: "#0d4827", bot: { img: `${baseWorksPath}`, link: "" }
        };
      } else if (sLogoLower.includes('shairan')) {
        brandConfig = {
          m1: { img: `${baseWorksPath}Shairan cafe/Pistachio kunafa bun.jpeg`, link: "https://www.instagram.com/reel/DSZ-9FKE4Pg/?igsh=MTlsZHdsd3R4ajg2eg==" },
          m2: { img: `${baseWorksPath}Shairan cafe/Men are simple.png`, link: "https://www.instagram.com/reel/DVu3Tuwk4Rr/?igsh=Yjdja3piN3kxd3R2" },
          l1: { img: `${baseWorksPath}Shairan cafe/Kunafa bun.jpeg`, link: "https://www.instagram.com/p/DS-F8Wck1Cd/?igsh=MWI4b2UyaTk4dmczcQ==" },
          l2: { img: `${baseWorksPath}Shairan cafe/Bun muska.jpeg`, link: "https://www.instagram.com/p/DTDRqqIDA8B/?igsh=MXB6aGRxZnhxMnMyMQ==" },
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "#ef6f2d", sqColor2: "#a42722", bot: { img: `${baseWorksPath}Shairan cafe/Shairan cafe - tagline.jpg`, link: "" }
        };
      } else if (sLogoLower.includes('mouzy')) {
        brandConfig = {
          m1: { img: `${baseWorksPath}Mouzy/Chicken bake.jpeg`, link: "https://www.instagram.com/reel/DShmdikk1nU/?igsh=YnM2MWwzZXFxc2pm" },
          m2: { img: `${baseWorksPath}Mouzy/Mouzy - diet avil milk.jpg`, link: "https://www.instagram.com/reel/DXEr5FgD6ge/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
          l1: { img: `${baseWorksPath}Mouzy/Eid.jpeg`, link: "https://www.instagram.com/p/DWEgjaJkws8/?igsh=MXZocXdrdTI2emVzcg==" },
          l2: { img: `${baseWorksPath}Mouzy/Election.jpeg`, link: "https://www.instagram.com/p/DRmX95cEx7b/?igsh=dXB4bTA5ZGo1cXow" },
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "#fdf100", sqColor2: "#07692e", bot: { img: `${baseWorksPath}Mouzy/Mouzy - tagline.jpg`, link: "" }
        };
      } else if (sLogoLower.includes('y69')) {
        brandConfig = {
          m1: { img: "", link: "" },
          m2: { img: "", link: "" },
          l1: { img: "", link: "" },
          l2: { img: "", link: "" },
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "", sqColor2: "", bot: { img: `${baseWorksPath}Y69/Y69 - tagline.jpg`, link: "" }
        };
      } else if (sLogoLower.includes('fillmore')) {
        brandConfig = {
          m1: { img: "", link: "" },
          m2: { img: "", link: "" },
          l1: { img: "", link: "" },
          l2: { img: "", link: "" },
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "", sqColor2: "", bot: { img: "", link: "" }
        };
      } else if (sLogoLower.includes('mandi')) {
        brandConfig = {
          m1: { img: "", link: "" },
          m2: { img: "", link: "" },
          l1: { img: "", link: "" },
          l2: { img: "", link: "" },
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "#323232", sqColor2: "#fccf1e", bot: { img: "", link: "" }
        };
      } else if (sLogoLower.includes('lamar')) {
        brandConfig = {
          m1: { img: "", link: "" },
          m2: { img: "", link: "" },
          l1: { img: "", link: "" },
          l2: { img: "", link: "" },
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "#1276b2", sqColor2: "", bot: { img: "", link: "" }
        };
      } else if (sLogoLower.includes('edhwi')) {
        brandConfig = {
          m1: { img: "", link: "" },
          m2: { img: "", link: "" },
          l1: { img: `${baseWorksPath}Edhwi/Edhwi Oil.jpg`, link: "https://www.instagram.com/p/DUprL6mDFzz/?igsh=bTRqZmw0c2s1OTMw" },
          l2: { img: `${baseWorksPath}Edhwi/edhwi valentine.jpg`, link: "https://www.instagram.com/p/DUtHP2gjq19/?igsh=MWQ1ejZvM3M1Mnh3dg==" },
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "", sqColor2: "", bot: { img: "", link: "" }
        };
      } else if (sLogoLower.includes('trace')) {
        brandConfig = {
          m1: { img: "", link: "" },
          m2: { img: "", link: "" },
          l1: { img: `${baseWorksPath}Trace/Trace Christmas.webp`, link: "https://www.instagram.com/p/DSpmRF1AU2Z/?igsh=cTJzdDVudHhmaXE2" },
          l2: { img: `${baseWorksPath}Trace/Trace health.webp`, link: "https://www.instagram.com/p/DW0gQkikRYz/?igsh=MWl2cG16dGppYTdycQ==" },
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "#8a2783", sqColor2: "#3c2e3f", bot: { img: "", link: "" }
        };
      } else if (sLogoLower.includes('indomie')) {
        brandConfig = {
          m1: { img: "", link: "" },
          m2: { img: "", link: "" },
          l1: { img: "", link: "" },
          l2: { img: "", link: "" },
          l3: { img: "", link: "" },
          l4: { img: "", link: "" },
          sqColor1: "", sqColor2: "", bot: { img: `${baseWorksPath}Indomie/Indomie - tagline.jpg`, link: "" }
        };
      }

      // 3. Inject explicit cover images and overrides
      if (brandConfig) {
        if (brandConfig.l1 && brandConfig.l1.img && blockL) {
          blockL.style.backgroundImage = `url('${brandConfig.l1.img}')`;
          blockL.style.backgroundSize = 'cover';
          blockL.style.backgroundPosition = 'center';
          if (brandConfig.l1.link) {
            blockL.onclick = (e) => { e.stopPropagation(); window.open(brandConfig.l1.link, '_blank'); };
          }
        }
        if (brandConfig.l2 && brandConfig.l2.img && blockL_new) {
          blockL_new.style.backgroundImage = `url('${brandConfig.l2.img}')`;
          blockL_new.style.backgroundSize = 'cover';
          blockL_new.style.backgroundPosition = 'center';
          if (brandConfig.l2.link) {
            blockL_new.onclick = (e) => { e.stopPropagation(); window.open(brandConfig.l2.link, '_blank'); };
          }
        }
        if (brandConfig.m1 && brandConfig.m1.img && blockM1) {
          blockM1.style.backgroundImage = `url('${brandConfig.m1.img}')`;
          blockM1.style.backgroundSize = 'cover';
          blockM1.style.backgroundPosition = 'center';
          if (brandConfig.m1.link) {
            blockM1.onclick = (e) => { e.stopPropagation(); window.open(brandConfig.m1.link, '_blank'); };
          }
        }
        if (brandConfig.m2 && brandConfig.m2.img && blockM2) {
          blockM2.style.backgroundImage = `url('${brandConfig.m2.img}')`;
          blockM2.style.backgroundSize = 'cover';
          blockM2.style.backgroundPosition = 'center';
          if (brandConfig.m2.link) {
            blockM2.onclick = (e) => { e.stopPropagation(); window.open(brandConfig.m2.link, '_blank'); };
          }
        }
        if (brandConfig.bot && brandConfig.bot.img && rowBot) {
          rowBot.style.backgroundImage = `url('${brandConfig.bot.img}')`;
          rowBot.style.backgroundSize = 'cover';
          rowBot.style.backgroundPosition = 'center';
          if (brandConfig.bot.link) {
            rowBot.onclick = (e) => { e.stopPropagation(); window.open(brandConfig.bot.link, '_blank'); };
          }
        }
        if (brandConfig.l3 && brandConfig.l3.img && botL1) {
          botL1.style.backgroundImage = `url('${brandConfig.l3.img}')`;
          botL1.style.backgroundSize = 'cover';
          botL1.style.backgroundPosition = 'center';
          if (brandConfig.l3.link) {
            botL1.onclick = (e) => { e.stopPropagation(); window.open(brandConfig.l3.link, '_blank'); };
          }
        }
        if (brandConfig.l4 && brandConfig.l4.img && botL2) {
          botL2.style.backgroundImage = `url('${brandConfig.l4.img}')`;
          botL2.style.backgroundSize = 'cover';
          botL2.style.backgroundPosition = 'center';
          if (brandConfig.l4.link) {
            botL2.onclick = (e) => { e.stopPropagation(); window.open(brandConfig.l4.link, '_blank'); };
          }
        }
        if (brandConfig.sqColor1 && sq1) {
          sq1.style.backgroundColor = brandConfig.sqColor1;
        }
        if (brandConfig.sqColor2 && sq2) {
          sq2.style.backgroundColor = brandConfig.sqColor2;
        }
      }
    };

    // Apply initially
    applyBrandConfig(startingLogo);

    if (blockL && blockM1 && blockM2 && stack && rowBot && !staticMode) {
      setInterval(() => {
        // 1. Slide Out
        blockL.classList.add("slide-left-fast");
        if (blockL_new) blockL_new.classList.add("slide-left-fast");
        blockM1.classList.add("slide-left-med");
        blockM2.classList.add("slide-left-slow");
        stack.classList.add("slide-left-fast");
        rowBot.classList.add("slide-left-med");
        if (botL1) botL1.classList.add("slide-left-med");
        if (botL2) botL2.classList.add("slide-left-med");

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
          if (botL1) botL1.classList.add("prepare-right-med");
          if (botL2) botL2.classList.add("prepare-right-med");

          if (shapeCircleImg) {
            const nextLogo = logos[currentLogoIndex];
            shapeCircleImg.src = nextLogo;
            applyBrandConfig(nextLogo);
            currentLogoIndex = (currentLogoIndex + 1) % logos.length;
          }

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
