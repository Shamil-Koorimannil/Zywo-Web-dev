document.addEventListener("DOMContentLoaded", () => {
  /* =============================== */
  /* Navbar Fade Out Logic             */
  /* =============================== */
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    setTimeout(() => {
      navbar.classList.remove("initial-visible");
    }, 5000);
  }

  /* =============================== */
  /* Panel P6 Client Logo Rotation   */
  /* =============================== */
  const p6Panel = document.querySelector(".p6");
  const clientLogo = document.querySelector(".client-logo");

  if (p6Panel && clientLogo) {
    const clients = [
      { text: "Acme Corp", color: "#FF5733" },
      { text: "Globex", color: "#33A1FF" },
      { text: "Initech", color: "#28B463" },
      { text: "Soylent", color: "#8E44AD" }
    ];
    let currentClientIndex = 0;

    p6Panel.style.backgroundColor = clients[0].color;
    clientLogo.textContent = clients[0].text;

    setInterval(() => {
      clientLogo.classList.add("slide-out-left");

      setTimeout(() => {
        currentClientIndex = (currentClientIndex + 1) % clients.length;
        p6Panel.style.backgroundColor = clients[currentClientIndex].color;
        clientLogo.textContent = clients[currentClientIndex].text;
        
        clientLogo.classList.remove("slide-out-left");
        clientLogo.classList.add("prepare-right");
        
        void clientLogo.offsetWidth;
        clientLogo.classList.remove("prepare-right");
      }, 500); 
    }, 4500); 
  }

  /* =============================== */
  /* Panel P9 Campaign Parallax      */
  /* =============================== */
  const p9Img = document.querySelector(".p9-camp-img");
  const p9Copy = document.querySelector(".p9-camp-copy");
  const p9Desc = document.querySelector(".p9-camp-desc");

  if (p9Img && p9Copy && p9Desc) {
    setInterval(() => {
      // 1. Trigger staggered slide out to the left
      // Different objects get different physical distance pushes creating parallax
      p9Img.classList.add("slide-left-fast");
      p9Copy.classList.add("slide-left-med");
      p9Desc.classList.add("slide-left-slow");

      // Wait for the slowest transition (1.0s) to vanish seamlessly
      setTimeout(() => {
        // 2. Remove left bounds and instantly teleport objects to the invisible right wing
        p9Img.classList.remove("slide-left-fast");
        p9Copy.classList.remove("slide-left-med");
        p9Desc.classList.remove("slide-left-slow");
        
        p9Img.classList.add("prepare-right-fast");
        p9Copy.classList.add("prepare-right-med");
        p9Desc.classList.add("prepare-right-slow");
        
        // Force browser layout repaint so the teleport registers as a stateless warp
        void p9Img.offsetWidth;
        
        // 3. Unleash the staggered transition, sliding everything organically back into center
        p9Img.classList.remove("prepare-right-fast");
        p9Copy.classList.remove("prepare-right-med");
        p9Desc.classList.remove("prepare-right-slow");
        
      }, 1000); 
      
    }, 5500); // Triggers independently of P6 
  }
});
