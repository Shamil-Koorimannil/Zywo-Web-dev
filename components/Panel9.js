class BentoPanel9 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p9";
    this.style.cursor = "pointer";
    const isSubdir = window.location.pathname.toLowerCase().includes('/services/') || 
                     window.location.href.toLowerCase().includes('/services/') ||
                     window.location.pathname.toLowerCase().includes('/campaign/') || 
                     window.location.href.toLowerCase().includes('/campaign/');
    const prefix = isSubdir ? '../' : '';
    const linkPrefix = isSubdir ? '' : 'Campaign/';

    this.addEventListener('click', () => {
      // Determine if we are already inside the campaigns grid page
      if (window.location.pathname.includes('campaigns.html')) {
        const customLink = this.getAttribute('link') || 'campaign-detail.html';
        if (window.triggerPageTransition) {
          window.triggerPageTransition(customLink);
        } else {
          window.location.href = customLink;
        }
      } else {
        if (window.triggerPageTransition) {
          window.triggerPageTransition(linkPrefix + 'campaigns.html');
        } else {
          window.location.href = linkPrefix + 'campaigns.html';
        }
      }
    });

    // Campaign Directory for Dashboard Carousel
    const campaigns = [
      {
        title: "Manjayellam Mouzy yalla",
        subtitle: "A viral awareness campaign combating copycat outlets and recovering brand trust after counterfeit stores hijacked their signature yellow aesthetic.",
        imgUrl: prefix + "assets/images/campaign_hero.png",
        logoUrl: prefix + "assets/clients/Mouzy logo Yellow.svg",
        link: linkPrefix + "campaign-detail.html"
      },
      {
        title: "Irumb Karimnaakum",
        subtitle: "Coolcane campaign showcasing how their hygienic, unique sugarcane juice turns even 'iron-hearted' arch enemies into absolute sweethearts.",
        imgUrl: prefix + "assets/images/coolcane_hero.png",
        logoUrl: prefix + "assets/clients/Coolcane logo.svg",
        link: linkPrefix + "campaign-coolcane.html"
      },
      {
        title: "Mouzy yullappol oonenthin?",
        subtitle: "Positioning Mouzy Avil Milk as the perfect, tasty, cheap, and fulfilling replacement for a traditional heavy lunch.",
        imgUrl: prefix + "assets/images/mouzy_lunch_hero.png",
        logoUrl: prefix + "assets/clients/Mouzy logo Yellow.svg",
        link: linkPrefix + "campaign-mouzy-lunch.html"
      }
    ];

    const activeTitle = this.getAttribute('title') || campaigns[0].title;
    const activeSubtitle = this.getAttribute('subtitle') || campaigns[0].subtitle;
    const activeImg = this.getAttribute('image') || campaigns[0].imgUrl;
    const activeLogo = this.getAttribute('logo') || campaigns[0].logoUrl;

    this.innerHTML = `
      <div class="p9-left">
        <div class="p9-camp-img" style="background-image: url('${activeImg}')"></div>
      </div>
      <div class="p9-right">
        <div class="p9-camp-copy">${activeTitle}</div>
        <div class="p9-camp-desc">
          <div class="p9-desc-1">${activeSubtitle}</div>
          <div class="p9-desc-2"></div>
        </div>
        <div class="p9-camp-dots">
          <div class="p9-dot-tiny"></div>
          <div class="p9-dot-active" style="background-image: url('${activeLogo}')"></div>
          <div class="p9-dot-tiny"></div>
        </div>
      </div>
    `;

    // Internalized Staggered Parallax UI Animation engine scoped explicitly to just this component payload
    const p9Img = this.querySelector(".p9-camp-img");
    const p9Copy = this.querySelector(".p9-camp-copy");
    const p9Desc = this.querySelector(".p9-camp-desc");
    const p9DotActive = this.querySelector(".p9-dot-active");
    const p9Desc1 = this.querySelector(".p9-desc-1");

    let currentIdx = 0;

    // Only run the Staggered Parallax UI Animation engine if not on campaigns grid page
    // (To prevent mass flashing/changing of contents across multiple panels)
    if (p9Img && p9Copy && p9Desc && !window.location.pathname.includes('campaigns.html')) {
      setInterval(() => {
        p9Img.classList.add("slide-left-fast");
        p9Copy.classList.add("slide-left-med");
        p9Desc.classList.add("slide-left-slow");

        setTimeout(() => {
          // Progress Campaign Index Before Repaint
          currentIdx = (currentIdx + 1) % campaigns.length;
          
          p9Img.style.backgroundImage = `url('${campaigns[currentIdx].imgUrl}')`;
          p9Copy.innerText = campaigns[currentIdx].title;
          if (p9Desc1) p9Desc1.innerText = campaigns[currentIdx].subtitle;
          if (p9DotActive) p9DotActive.style.backgroundImage = `url('${campaigns[currentIdx].logoUrl}')`;

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
