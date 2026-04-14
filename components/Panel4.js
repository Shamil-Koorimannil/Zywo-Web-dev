class BentoPanel4 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p4";
    this.innerHTML = `
      <div class="p4-carousel-container">
      </div>
    `;

    const container = this.querySelector(".p4-carousel-container");

    const testimonials = [
      { name: "Ashar Mouzy", text: "A team of highly visionary individuals with strong creative potential. Their approach reflects both innovation and long-term thinking.", logo: "./assets/clients/Mouzy logo Yellow.svg", profile: "./assets/Testimonials/Ashar mouzy.jpg", insta: "https://www.instagram.com/ashar_mouzy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
      { name: "Nadeem Safran", text: "The designs and concepts are consistently impressive. They bring fresh ideas that align perfectly with our brand vision.", logo: "", profile: "./assets/Testimonials/Nadeem Safran.jpg", insta: "https://www.instagram.com/nadeem_safran_kongath?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
      { name: "Shayban", text: "They handle every task with seriousness and professionalism. Working with them is smooth, efficient, and hassle-free.", logo: "./assets/clients/Coolcane logo.svg", profile: "./assets/Testimonials/Shayban.jpg", insta: "https://www.instagram.com/m.shayban?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
      { name: "Saima Nadeem", text: "A very cooperative and supportive team throughout the process. Our page has become significantly more active and engaging because of their efforts.", logo: "./assets/clients/Edhwi logo.svg", profile: "./assets/Testimonials/Saima Nadeem.jpg", insta: "https://www.instagram.com/edhwibysaimanadeem?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
      { name: "Marwan", text: "Their attention to detail in design is exceptional. From color choices to typography, everything is thoughtfully executed.", logo: "", profile: "./assets/Testimonials/Marwan.jpg", insta: "https://www.instagram.com/shamim_marvan_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
      { name: "Munavar", text: "The content quality and consistency have elevated our entire online presence. It now reflects our brand properly.", logo: "./assets/clients/Mandi manzil.svg", profile: "", insta: "" },
      { name: "Ubais", text: "Our social media finally has direction and consistency. The content feels intentional, and the growth has been steady.", logo: "./assets/clients/Lamar logo.svg", profile: "./assets/Testimonials/Ubais.jpg", insta: "https://www.instagram.com/ubais_lamar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
      { name: "Fawas", text: "They completely transformed our brand identity. The designs are clean, modern, and perfectly aligned with our vision.", logo: "./assets/clients/Criswings logo.svg", profile: "", insta: "" },
      { name: "Yazin", text: "They understood our vision and translated it into a complete brand system. It’s Structured, memorable, and scalable.", logo: "./assets/clients/Y69 logo.svg", profile: "", insta: "https://www.instagram.com/yaasinsalim?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
      { name: "Favas", text: "Every creative feels strongly aligned with our brand identity. The quality is consistently high, with clear attention to detail and purpose.", logo: "./assets/clients/Trace  logo.svg", profile: "./assets/Testimonials/Favas.jpg", insta: "https://www.instagram.com/favasrah?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
      { name: "Shabeer", text: "", logo: "./assets/clients/Atom jr Logo.svg", profile: "./assets/Testimonials/Shabeer.jpg", insta: "https://www.instagram.com/shabeer_atom_jr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" }
    ];

    let html = '';
    testimonials.forEach((t, i) => {
      const testHtml = t.text ? `"${t.text}"` : "";
      const profileStyle = t.profile ? `background-image: url('${t.profile}'); opacity: 1;` : `opacity: 0;`;
      
      let logoHtml = t.logo ? `<img class="p4-logo" src="${t.logo}" alt="${t.name} logo" />` : `<div class="p4-logo"></div>`;
      if (t.insta) {
        logoHtml = `<a href="${t.insta}" target="_blank" style="display: block; cursor: pointer; pointer-events: auto;">${logoHtml}</a>`;
      }
      
      let profileHtml = `<div class="p4-profile" style="${profileStyle}"></div>`;
      if (t.insta && t.profile) {
        profileHtml = `<a href="${t.insta}" target="_blank" style="display: block; cursor: pointer; pointer-events: auto;">${profileHtml}</a>`;
      }

      html += `
        <div class="p4-slide ${i === 0 ? 'active' : ''}">
          <div class="p4-top">
            ${profileHtml}
            ${logoHtml}
          </div>
          <div class="p4-mid">
            <div class="p4-test">${testHtml}</div>
          </div>
          <div class="p4-bottom">
            <div class="p4-name">${t.name}</div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    const slides = this.querySelectorAll(".p4-slide");
    if (slides.length > 1) {
      let currentIndex = 0;
      setInterval(() => {
        const currentSlide = slides[currentIndex];
        currentSlide.classList.remove('active');
        currentSlide.classList.add('exit');

        currentIndex = (currentIndex + 1) % slides.length;

        const nextSlide = slides[currentIndex];
        nextSlide.classList.remove('exit');
        nextSlide.classList.add('active');

        setTimeout(() => {
          currentSlide.classList.remove('exit');
        }, 800); // Match transition duration
      }, 5500);
    }
  }
}

customElements.define('bento-panel-4', BentoPanel4);
