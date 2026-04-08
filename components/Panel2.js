class BentoPanel2 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p2";
    this.innerHTML = `
      <div class="p2-top">
        <div class="p2-logo-wrapper">
          <img src="assets/logo/zywo logo.svg" class="p2-logo" alt="Zywo">
        </div>
        <a href="#" class="p2-btn">Blogs</a>
      </div>
      <div class="text-carousel-container">
          <section class="text-slide active">
              <h1 class="slide-heading"><span class="highlight">Our</span><br>Mission</h1>
              <p>Zywo's mission is to connect businesses with creative solutions that make their brands unique, attractive, and successful.</p>
          </section>
          
          <section class="text-slide">
              <h1 class="slide-heading"><span class="highlight">Our</span><br>Vision</h1>
              <p>To be the most trusted and preferred advertising partner for businesses.</p>
          </section>

          <section class="text-slide who-we-are-slide">
              <h1 class="slide-heading"><span class="highlight">Who&nbsp;</span><span class="highlight">We</span>&nbsp;Are</h1>
              <p>At Zywo, we don't just make ads, we make brands unforgettable. As a strategic advertising agency, we help businesses stand out, scale up, and connect meaningfully with their audiences.</p>
              <p>Precision, innovation, and integrity set us apart. We don't follow trends; <br><span class="bold">we build brands that lead them.</span></p>
          </section>

          <section class="text-slide">
              <h1 class="slide-heading"><span class="highlight">What</span>&nbsp;<span class="highlight">We</span>&nbsp;Do</h1>
              <p><span class="bold">At Zywo, we create bold, effective advertising that helps brands grow.</span><br><br>From branding and digital ads to video content and social media campaigns, we craft experiences that get you noticed &ndash; memorable, authentic, and impactful.</p>
          </section>
      </div>
      <div class="p2-tagline">"Every Impression Matters"</div>
    `;

    // Internal Encapsulated Logic
    const carouselInterval = setInterval(() => {
      if (!this.isConnected) {
        clearInterval(carouselInterval);
        return;
      }
      const slides = Array.from(this.querySelectorAll('.text-slide'));
      if (slides.length === 0) return;

      const activeIdx = slides.findIndex(s => s.classList.contains('active'));
      let nextIdx = 0;

      if (activeIdx !== -1) {
        nextIdx = (activeIdx + 1) % slides.length;
        slides[activeIdx].classList.remove('active');
        slides[activeIdx].classList.add('exit');

        setTimeout(() => {
          if (slides[activeIdx]) slides[activeIdx].classList.remove('exit');
        }, 1200);
      }

      slides[nextIdx].classList.remove('exit');

      // Delay active slightly so exit animation can start
      setTimeout(() => {
        if (slides[nextIdx]) slides[nextIdx].classList.add('active');
      }, 150);
    }, 6000);
  }
}

customElements.define('bento-panel-2', BentoPanel2);
