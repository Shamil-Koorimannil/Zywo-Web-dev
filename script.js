/* 
  Global Script Environment 
  -------------------------
  All modular animation loops and UI behavior logic has been decoupled 
  from the global namespace and shifted explicitly into their respective 
  Web Components located in the /components/ directory.
*/

document.addEventListener("DOMContentLoaded", () => {
    // Initializer logic for future globally-scoped architecture can sit here safely.
    console.log("Zywo Component Grid Initialized.");

    // Global Page Transition Logic
    if (!window.hasPageTransitions) {
      window.hasPageTransitions = true;

      
      // Helper to get all animatable items robustly across all pages
      const getItems = () => {
        const selector = 'bento-panel-1, bento-panel-2, bento-panel-3, bento-panel-4, bento-panel-5, bento-panel-6, bento-panel-7, bento-panel-9, .careers-container, .founder-wrapper, .scale-wrapper, .card, .card-right-group > *, .gallery-grid > *, .service-details-page .page-title, .service-details-page .content-container > *, .service-details-page > *:not(bento-navbar):not(connect-button):not(.page-title):not(.content-container):not(#bg-transition-overlay):not(.service-nav-arrows)';
        return Array.from(document.querySelectorAll(selector));
      };
      
      // Setup crossfade background overlay if coming from another page
      const prevBg = sessionStorage.getItem('zywo_prev_bg');
      if (prevBg) {
        const overlay = document.createElement('div');
        overlay.id = 'bg-transition-overlay';
        overlay.style.cssText = "position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: -1; background: " + prevBg + "; transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1); pointer-events: none;";
        document.body.appendChild(overlay);
        void overlay.offsetWidth; // trigger reflow
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 1000);
      }
      
      // Global method to trigger animated navigation anywhere via JS
      window.triggerPageTransition = function(targetUrl, transitionDir = 'right') {
          sessionStorage.setItem('zywo_nav_dir', transitionDir);
          document.body.classList.remove('page-enter-flow-left', 'page-enter-flow-right');
          document.body.classList.add('page-exit-flow-' + transitionDir);
          
          const items = getItems();
          items.forEach((item, i) => {
            // Need to reset animation bindings to ensure it plays sequentially
            item.style.animation = 'none';
            void item.offsetWidth; // Reflow
            item.style.animation = '';
            item.style.animationDelay = (i * 0.04) + 's';
            // Randomize exit duration for a chaotic, organic 'different speed' sweep
            item.style.animationDuration = (0.6 + Math.random() * 0.3) + 's';
            item.setAttribute('data-flow', 'exit');
          });
          
          // Capture current background for crossfade on next page
          sessionStorage.setItem('zywo_prev_bg', getComputedStyle(document.body).background);
          
          const waitTime = 800 + (items.length * 40);
          setTimeout(() => {
            window.location.href = targetUrl;
          }, waitTime);
      };

      // Directional Navigation Setup
      let dir = sessionStorage.getItem('zywo_nav_dir') || 'right';
      let stateIndex = history.state?.index;
      let histIndex = parseInt(sessionStorage.getItem('zywo_hist_index') || '0');

      if (stateIndex !== undefined) {
          if (stateIndex < histIndex) {
              dir = 'left'; // Backward
          } else if (stateIndex > histIndex) {
              dir = 'right'; // Forward
          }
          histIndex = stateIndex;
          sessionStorage.setItem('zywo_hist_index', histIndex);
      } else {
          histIndex += 1;
          history.replaceState({index: histIndex}, '');
          sessionStorage.setItem('zywo_hist_index', histIndex);
      }

      // Handle Safari/Chrome back button cache issues
      window.addEventListener('pageshow', (e) => {
        if (e.persisted || document.body.classList.contains('page-exit-flow-left') || document.body.classList.contains('page-exit-flow-right')) {
           document.body.classList.remove('page-exit-flow-left', 'page-exit-flow-right');
           document.body.classList.add('page-enter-flow-' + dir);
           const items = getItems();
           items.forEach((item, i) => {
             item.setAttribute('data-flow', 'enter');
             item.style.animation = 'none';
             void item.offsetWidth; // trigger reflow
             item.style.animation = '';
             item.style.animationDelay = (0.05 * i) + 's';
             item.style.animationDuration = (0.6 + Math.random() * 0.4) + 's';
           });
        }
      });

      // Apply enter animation globally (including home page)
      // Only do this if it wasn't a pageshow resume, but typically DOMContentLoaded handles cold loads.
      document.body.classList.add('page-enter-flow-' + dir);
      const items = getItems();
      items.forEach((item, i) => {
        item.style.animationDelay = (0.05 * i) + 's';
        item.style.animationDuration = (0.6 + Math.random() * 0.4) + 's';
        item.setAttribute('data-flow', 'enter');
      });


      // Intercept all link clicks natively
      document.addEventListener("click", (e) => {
        const link = e.target.closest('a');
        if (link && link.href) {
            
          // Exclude certain clicks (like active hashes, targets, defaults)
          if (link.getAttribute('target') === '_blank' || link.href.startsWith('mailto:') || link.href.startsWith('tel:')) return;
          
          const url = new URL(link.href, window.location.origin);
          if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
            e.preventDefault();
            let clickDir = 'right'; // default is move to right (exit right, enter from left)
            if (link.classList.contains('next-service-btn')) {
                clickDir = 'left'; // "Next" moves sequence leftward (exit left)
            } else if (link.classList.contains('prev-service-btn')) {
                clickDir = 'right'; // "Prev" moves sequence rightward (exit right)
            }
            window.triggerPageTransition(link.href, clickDir);
          }
        }
      });
      
      // Also intercept manual js routing (like the onClick='navigateService()')
      // by monkey-patching window.location.href setter if we really needed to, 
      // but the `navigateService` naturally just changes window.location.href directly. 
      // Mobile Swipe Logic for Services Pages
      if (document.body.classList.contains('service-details-page')) {
          let startX = 0;
          let startY = 0;
          
          document.addEventListener('touchstart', e => {
              startX = e.touches[0].clientX;
              startY = e.touches[0].clientY;
          }, {passive: true});

          document.addEventListener('touchend', e => {
              const endX = e.changedTouches[0].clientX;
              const endY = e.changedTouches[0].clientY;
              const deltaX = endX - startX;
              const deltaY = endY - startY;

              if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
                  // A horizontal swipe occurred
                  if (deltaX < 0) {
                      // Swipe Left (Next)
                      const nextBtn = document.querySelector('.next-service-btn');
                      if (nextBtn && nextBtn.href) {
                          window.triggerPageTransition(nextBtn.href, 'left'); // slide out left
                      }
                  } else {
                      // Swipe Right (Prev)
                      const prevBtn = document.querySelector('.prev-service-btn');
                      if (prevBtn && prevBtn.href) {
                          window.triggerPageTransition(prevBtn.href, 'right'); // slide out right
                      }
                  }
              }
          });

          // Show swipe tutorial if on mobile view
          if (window.innerWidth <= 768 && !sessionStorage.getItem('zywo_swipe_tut_seen')) {
              sessionStorage.setItem('zywo_swipe_tut_seen', 'true');
              const overlay = document.createElement('div');
              overlay.className = 'swipe-tutorial-overlay';
              overlay.innerHTML = `
                <div class="swipe-hand-icon">
                  <svg viewBox="0 0 24 24"><path d="M12.98 1.54A7 7 0 0 0 5.48 10v6a7 7 0 0 0 14.52 1.34c.03-3.79-.88-6.04-1.99-7.79H18v-4.5c0-1.89-1.5-3.5-3.5-3.5h0c-.62 0-1.19.16-1.72.44A7.44 7.44 0 0 0 11 1.54h1.98z"/><path d="M12.98 1.54C12.44 4.54 10 7 7 7H5.48"/></svg>
                </div>
                <div class="swipe-text">Swipe to explore</div>
              `;
              document.body.appendChild(overlay);
              
              // Trigger active with slight delay to ensure CSS transition fires
              setTimeout(() => overlay.classList.add('active'), 100);

              // Remove after 3 seconds
              setTimeout(() => {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 400);
              }, 3000);
          }
      }

      // --- Idle UI Controller (Navbar & Connect Button fading) ---
      const injectIdleCSS = () => {
          if (document.getElementById('idle-ui-styles')) return;
          const style = document.createElement('style');
          style.id = 'idle-ui-styles';
          style.innerHTML = `
              .idle-ui-hidden bento-navbar,
              .idle-ui-hidden connect-button {
                  opacity: 0 !important;
                  pointer-events: none !important;
                  transition: opacity 0.8s ease-in-out !important;
              }
              bento-navbar, connect-button {
                  transition: opacity 0.4s ease-in-out;
              }
          `;
          document.head.appendChild(style);
      };
      injectIdleCSS();

      let idleTimer;
      let isMouseInZone = false;

      const wakeUI = () => {
          document.body.classList.remove('idle-ui-hidden');
          clearTimeout(idleTimer);
          idleTimer = setTimeout(() => {
              const connectPopup = document.querySelector('.connect-popup.active');
              const bookModal = document.querySelector('.book-call-modal.active');
              if (!isMouseInZone && !connectPopup && !bookModal) {
                  document.body.classList.add('idle-ui-hidden');
              } else if (connectPopup || bookModal || isMouseInZone) {
                  // Keep checking if popups/modals are active instead of permanently hiding
                  wakeUI();
              }
          }, 3000);
      };

      // Initial start
      wakeUI();

      // Detection Zones for "hovering" the hidden elements smoothly without pointer-events blocking
      document.addEventListener('mousemove', (e) => {
          // Top 120px for Navbar, Bottom 200px / Right side 300px for Connect Button
          const nearTop = e.clientY < 120;
          const nearBottomRight = window.innerWidth > 768 
              ? (e.clientY > window.innerHeight - 250 && e.clientX > window.innerWidth - 300) 
              : (e.clientY > window.innerHeight - 250);
              
          if (nearTop || nearBottomRight) {
              isMouseInZone = true;
              wakeUI();
          } else {
              isMouseInZone = false;
          }
      });
      
      // Global activity interactions wake up the UI universally
      document.addEventListener('click', wakeUI);
      document.addEventListener('scroll', wakeUI);
      document.addEventListener('touchstart', wakeUI);
      // ------------------------------------------------------------
    }
});

