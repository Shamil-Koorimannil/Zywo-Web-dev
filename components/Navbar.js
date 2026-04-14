class BentoNavbar extends HTMLElement {
  connectedCallback() {
    // Preserve exact CSS footprint globally
    this.className = "navbar";
    
    const isSubdir = window.location.pathname.toLowerCase().includes('/services/') || 
                     window.location.href.toLowerCase().includes('/services/') ||
                     window.location.pathname.toLowerCase().includes('/campaign/') || 
                     window.location.href.toLowerCase().includes('/campaign/');
    const prefix = isSubdir ? '../' : '';

    // Inject HTML payload with water drop indicator
    this.innerHTML = `
      <div class="nav-water-drop"></div>
      <a href="${prefix}index.html" class="nav-item">Home</a>
      <a href="${prefix}gallery.html" class="nav-item">Work</a>
      <a href="${prefix}services/branding.html" class="nav-item">Service</a>
      <a href="${prefix}careers.html" class="nav-item">Careers</a>
    `;

    // Active Link & Water Drop Logic
    const fullPath = window.location.pathname.toLowerCase() + window.location.search.toLowerCase();
    const links = this.querySelectorAll('.nav-item');
    let activeLink = null;

    links.forEach(link => {
      const linkText = link.textContent.trim().toLowerCase();
      // Match "Service"
      if (linkText === 'service' && fullPath.includes('/services/')) {
          activeLink = link;
      }
      // Match "Work" (gallery)
      else if (linkText === 'work' && fullPath.includes('gallery.html')) {
          activeLink = link;
      }
      // Match "Careers"
      else if (linkText === 'careers' && fullPath.includes('careers.html')) {
          activeLink = link;
      }
      // Match "Home"
      else if (linkText === 'home' && (fullPath.includes('index.html') || fullPath.endsWith('/'))) {
          activeLink = link;
      }
    });

    if (!activeLink) {
        // Fallback to home if no match (e.g. standalone pages)
        activeLink = links[0];
    }

    // Check if we have a previous nav state to jump from across page loads
    const prevNavState = sessionStorage.getItem('zywo_prev_nav');
    let prevLink = null;
    if (prevNavState) {
        links.forEach(l => {
            if (l.textContent.trim().toLowerCase() === prevNavState) {
                prevLink = l;
            }
        });
    }

    // Save current active state for future navigations immediately
    sessionStorage.setItem('zywo_prev_nav', activeLink.textContent.trim().toLowerCase());

    const waterDrop = this.querySelector('.nav-water-drop');
    let isInitialLoad = true;

    // Temporarily hide visually and disable transition to prevent strictly ANY frame flicker
    if (waterDrop) {
      waterDrop.style.transition = 'none';
      waterDrop.style.opacity = '0';
    }

    const updateDropPosition = (targetLink, doJump = false) => {
      if (targetLink && waterDrop) {
        if (doJump) {
          waterDrop.classList.remove('jumping');
          void waterDrop.offsetWidth; // strict reflow reset
          waterDrop.classList.add('jumping');
        }
        
        // center the water drop over the target link securely
        const leftPos = targetLink.offsetLeft + (targetLink.offsetWidth / 2) - 8; // 8px is half the 16px width
        waterDrop.style.left = `${leftPos}px`;
      }
    };

    const snapToActive = () => {
      if (isInitialLoad && prevLink && prevLink !== activeLink) {
          // Instantly securely position at the previous link's location invisibly
          updateDropPosition(prevLink, false);
          
          requestAnimationFrame(() => {
              // Make it visible at previous location
              waterDrop.style.opacity = '1';
              // Wait a tiny frame for browser to render
              setTimeout(() => {
                  waterDrop.style.transition = '';
                  // Trigger the jump to current active link!
                  updateDropPosition(activeLink, true);
              }, 50);
          });
      } else if (isInitialLoad) {
          // No previous link or same link, just appear at target invisibly then fade in
          updateDropPosition(activeLink, false);
          requestAnimationFrame(() => {
            waterDrop.style.opacity = '1';
            setTimeout(() => {
              waterDrop.style.transition = '';
            }, 50);
          });
      } else {
          // Standard resize updates
          updateDropPosition(activeLink, false);
      }
      isInitialLoad = false;
    };

    // Handle Chrome/Safari back button (BFCache restores)
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
         const currentPrevNav = sessionStorage.getItem('zywo_prev_nav');
         let restoredPrevLink = null;
         if (currentPrevNav) {
             links.forEach(l => {
                 if (l.textContent.trim().toLowerCase() === currentPrevNav) restoredPrevLink = l;
             });
         }
         
         if (restoredPrevLink && restoredPrevLink !== activeLink) {
             waterDrop.style.transition = 'none';
             updateDropPosition(restoredPrevLink, false);
             sessionStorage.setItem('zywo_prev_nav', activeLink.textContent.trim().toLowerCase());
             
             requestAnimationFrame(() => {
                 setTimeout(() => {
                     waterDrop.style.transition = '';
                     updateDropPosition(activeLink, true);
                 }, 50);
             });
         } else {
             updateDropPosition(activeLink, false);
             sessionStorage.setItem('zywo_prev_nav', activeLink.textContent.trim().toLowerCase());
         }
      }
    });

    // Add click events so the drop jumps to the user's selection immediately before page load
    links.forEach(link => {
      link.addEventListener('click', () => {
        // Prevent double jumping on the next page load by immediately syncing the session state
        sessionStorage.setItem('zywo_prev_nav', link.textContent.trim().toLowerCase());
        updateDropPosition(link, true);
      });
    });

    // Add resize listener to update position dynamically
    window.addEventListener('resize', snapToActive);

    // Small timeout to allow layout calculation
    setTimeout(snapToActive, 100);
  }
}

customElements.define('bento-navbar', BentoNavbar);

