class ConnectButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .floating-action-container {
                    position: fixed;
                    top: calc(32px + (60px + 8px) * var(--ui-scale, 1));
                    right: calc(50% - 363px * var(--ui-scale, 1));
                    left: auto;
                    bottom: auto;
                    z-index: 1000;
                    display: flex;
                    flex-direction: column-reverse; /* popup below button */
                    align-items: flex-end; /* right alignment */
                    gap: 16px;
                    font-family: 'Roboto', sans-serif;
                }

                .floating-action-btn {
                    height: calc(60px * var(--ui-scale, 1));
                    width: calc(211px * var(--ui-scale, 1));
                    border-radius: calc(30px * var(--ui-scale, 1));
                    background: rgba(255, 255, 255, 0.05); 
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-sizing: border-box;
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.4s ease;
                    color: #2C367A;
                    font-family: 'Changa', sans-serif;
                    font-weight: 500;
                    font-size: calc(16px * var(--ui-scale, 1));
                    letter-spacing: 0.5px;
                    position: relative;
                    overflow: hidden;
                }

                .floating-action-btn::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
                    opacity: 0;
                    transform: scale(0.5);
                    transition: opacity 0.4s ease, transform 0.4s ease;
                    pointer-events: none;
                }

                .floating-action-btn:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
                    background: rgba(255, 255, 255, 0.1);
                }

                .floating-action-btn:hover::before {
                    opacity: 0.5;
                    transform: scale(1);
                }

                .floating-action-btn:active {
                    transform: translateY(0) scale(0.95);
                }

                .connect-popup {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow:
                        0 16px 40px rgba(0, 0, 0, 0.25),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.2);
                    border-radius: 24px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-20px) scale(0.9);
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                    transform-origin: top right; /* origin top right */
                }

                .connect-popup.active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }

                .connect-icons {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                }

                .connect-icons a {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .connect-icons a img {
                    width: 22px;
                    height: 22px;
                    object-fit: contain;
                    transition: transform 0.3s ease;
                }

                .connect-icons a:hover {
                    background: rgba(255, 255, 255, 0.25);
                    transform: translateY(-4px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                }

                .connect-icons a:hover img {
                    transform: scale(1.1);
                }

                .book-call-btn {
                    background: linear-gradient(135deg, #ffffff, #e0e0e0);
                    color: #2C367A;
                    border: none;
                    border-radius: 12px;
                    padding: 12px 24px;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 600;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    width: 100%;
                }

                .book-call-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                    background: #ffffff;
                }

                /* Book a Call Modal */
                .book-call-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    font-family: 'Roboto', sans-serif;
                }

                .book-call-modal.active {
                    pointer-events: all;
                    opacity: 1;
                    visibility: visible;
                }

                .book-call-content {
                    width: 90%;
                    max-width: 400px;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow:
                        0 24px 60px rgba(0, 0, 0, 0.4),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.2);
                    border-radius: 28px;
                    padding: 32px;
                    transform: translateY(40px) scale(0.95);
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                    position: relative;
                    overflow: hidden;
                }

                .book-call-modal.active .book-call-content {
                    transform: translateY(0) scale(1);
                }

                .close-modal-btn {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    background: transparent;
                    border: none;
                    color: #2C367A;
                    cursor: pointer;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease;
                    opacity: 0.7;
                }

                .close-modal-btn:hover {
                    transform: rotate(90deg);
                    opacity: 1;
                }

                .close-modal-btn svg {
                    width: 24px;
                    height: 24px;
                }

                .modal-title {
                    color: #2C367A;
                    font-size: 24px;
                    margin: 0 0 24px 0;
                    font-family: 'Changa', sans-serif;
                    letter-spacing: 0.5px;
                }

                .book-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .input-group label {
                    font-size: 13px;
                    color: #2C367A;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }

                .input-group input,
                .input-group textarea {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 12px;
                    padding: 14px 16px;
                    color: #2C367A;
                    font-family: 'Roboto', sans-serif;
                    font-size: 15px;
                    box-sizing: border-box;
                    transition: all 0.3s ease;
                    resize: none;
                }

                .input-group input::placeholder,
                .input-group textarea::placeholder {
                    color: rgba(44, 54, 122, 0.5); /* derived from #2C367A */
                }

                .input-group input:focus,
                .input-group textarea:focus {
                    outline: none;
                    background: rgba(0, 0, 0, 0.3);
                    border-color: rgba(255, 255, 255, 0.4);
                    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
                }

                .submit-call-btn {
                    background: linear-gradient(135deg, #ffffff, #e0e0e0);
                    color: #2C367A;
                    border: none;
                    border-radius: 12px;
                    padding: 14px 24px;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    margin-top: 8px;
                }

                .submit-call-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                    background: #ffffff;
                }

                .submit-call-btn:active {
                    transform: translateY(0);
                }

                @media (max-width: 768px) {
                    .floating-action-container {
                        top: auto;
                        bottom: 96px; /* Near top right side of bottom nav (which is at 24px and height 60px) */
                        right: 24px;
                        left: auto;
                        gap: 12px;
                        align-items: flex-end; /* right align on mobile */
                        flex-direction: column; /* reset to upwards popup */
                    }

                    .floating-action-btn {
                        height: calc(52px * var(--ui-scale, 1));
                        width: calc(180px * var(--ui-scale, 1));
                        font-size: calc(14px * var(--ui-scale, 1));
                    }

                    .connect-popup {
                        transform-origin: bottom right; /* origin bottom right for mobile */
                        transform: translateY(20px) scale(0.9);
                        padding: 16px;
                        gap: 14px;
                        border-radius: 20px;
                        min-width: 200px;
                    }

                    .connect-icons a {
                        width: 38px;
                        height: 38px;
                    }

                    .connect-icons a img {
                        width: 18px;
                        height: 18px;
                    }

                    .book-call-btn {
                        padding: 10px 16px;
                        font-size: 14px;
                    }

                    .book-call-modal {
                        align-items: flex-end;
                    }

                    .book-call-content {
                        max-width: 100%;
                        width: 100%;
                        border-radius: 28px 28px 0 0;
                        transform: translateY(100%);
                        padding-bottom: 32px;
                    }
                }
            </style>
            <div class="floating-action-container">
                <div class="connect-popup" id="connectPopup">
                    <div class="connect-icons">
                        <a href="https://www.linkedin.com/company/zywo-creatives/" target="_blank" rel="noopener noreferrer"><img src="https://zywo.in/wp-content/uploads/2025/05/Linkedin.svg" alt="LinkedIn"></a>
                        <a href="https://www.behance.net/zywocreatives" target="_blank" rel="noopener noreferrer"><img src="https://zywo.in/wp-content/uploads/2025/05/Behance.svg" alt="Behance"></a>
                        <a href="https://wa.me/916282881159" target="_blank" rel="noopener noreferrer"><img src="https://zywo.in/wp-content/uploads/2025/05/Whatsapp.svg" alt="WhatsApp"></a>
                        <a href="https://www.facebook.com/share/16ofbMjv2Y/" target="_blank" rel="noopener noreferrer"><img src="https://zywo.in/wp-content/uploads/2025/05/Facebook.svg" alt="Facebook"></a>
                        <a href="https://www.instagram.com/zywo_advertising?igsh=NXFiejd6ODZkN2dw" target="_blank" rel="noopener noreferrer"><img src="https://zywo.in/wp-content/uploads/2025/05/Instagram.svg" alt="Instagram"></a>
                    </div>
                    <button class="book-call-btn">Book a Call</button>
                </div>
                <button class="floating-action-btn" aria-label="Connect with us">
                    <span>Connect Us</span>
                </button>
            </div>

            <!-- Book a Call Modal -->
            <div class="book-call-modal" id="bookCallModal">
                <div class="book-call-content">
                    <button class="close-modal-btn" aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <h3 class="modal-title">Book a Call</h3>
                    <form class="book-form">
                        <div class="input-group">
                            <label>Name</label>
                            <input type="text" id="waName" placeholder="Full Name" required />
                        </div>
                        <div class="input-group">
                            <label>Phone Number</label>
                            <input type="tel" id="waPhone" placeholder="+............" required />
                        </div>
                        <div class="input-group">
                            <label>Message</label>
                            <textarea rows="4" id="waMessage" placeholder="Tell us about your requirements..." required></textarea>
                        </div>
                        <button type="submit" class="submit-call-btn">Submit</button>
                    </form>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const container = this.querySelector('.floating-action-container');
        const popup = this.querySelector('#connectPopup');
        const btn = this.querySelector('.floating-action-btn');
        const bookModal = this.querySelector('#bookCallModal');
        const openBookBtn = this.querySelector('.book-call-btn');
        const closeModalBtn = this.querySelector('.close-modal-btn');
        const bookForm = this.querySelector('.book-form');

        // Toggle Popup logic
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            popup.classList.toggle('active');
            btn.classList.toggle('active');
        });

        const openBookForm = () => {
            bookModal.classList.add('active');
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
                btn.classList.remove('active');
            }
        };

        const closeBookForm = () => {
            bookModal.classList.remove('active');
        };

        openBookBtn.addEventListener('click', openBookForm);
        closeModalBtn.addEventListener('click', closeBookForm);
        bookModal.addEventListener('click', (e) => {
            if (e.target === bookModal) closeBookForm();
        });

        bookForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const name = this.querySelector('#waName').value;
            const phone = this.querySelector('#waPhone').value;
            const message = this.querySelector('#waMessage').value;

            const scriptURL = 'https://script.google.com/macros/s/AKfycbz9HHBLeVoujebHuy9-CBKp4Be2ZCSrkT1CDFTGxiTgsUSBHPt2d2qu2M7mfiyM9lXQ/exec';

            const formData = new FormData();
            formData.append('Name', name);
            formData.append('Phone', phone);
            formData.append('Message', message);
            formData.append('Date', new Date().toLocaleString());

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
                .then(res => res.text())
                .then(data => {
                    if (data === "Success") {
                        alert("Thanks for reaching out! We'll get back to you shortly.");
                        closeBookForm();
                        event.target.reset();
                    } else {
                        throw new Error("Unexpected response");
                    }
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('Something went wrong. Please try again.');
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

customElements.define('connect-button', ConnectButton);
