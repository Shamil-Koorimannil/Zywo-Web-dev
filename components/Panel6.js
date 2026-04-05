class BentoPanel6 extends HTMLElement {
  connectedCallback() {
    this.className = "panel p6";
    this.innerHTML = `<div class="client-logo">Brand 1</div>`;
    
    // Completely encapsulated functionality scoped directly to this component instance
    const clientLogo = this.querySelector(".client-logo");
    
    if (clientLogo) {
      const clients = [
        { text: "Acme Corp", color: "#FF5733" },
        { text: "Globex", color: "#33A1FF" },
        { text: "Initech", color: "#28B463" },
        { text: "Soylent", color: "#8E44AD" }
      ];
      let currentClientIndex = 0;

      // Base initialization
      this.style.backgroundColor = clients[0].color;
      clientLogo.textContent = clients[0].text;

      setInterval(() => {
        clientLogo.classList.add("slide-out-left");

        setTimeout(() => {
          currentClientIndex = (currentClientIndex + 1) % clients.length;
          
          // Applying background transition explicitly to 'this' bound HTMLElement
          this.style.backgroundColor = clients[currentClientIndex].color;
          clientLogo.textContent = clients[currentClientIndex].text;
          
          clientLogo.classList.remove("slide-out-left");
          clientLogo.classList.add("prepare-right");
          void clientLogo.offsetWidth;
          
          clientLogo.classList.remove("prepare-right");
        }, 500); 
      }, 4500); 
    }
  }
}

customElements.define('bento-panel-6', BentoPanel6);
