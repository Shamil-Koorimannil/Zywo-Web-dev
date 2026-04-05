document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    // Keep it visible for 5 seconds when the page loads, then remove the class to trigger CSS fade out
    setTimeout(() => {
      navbar.classList.remove("initial-visible");
    }, 5000);
  }
});
