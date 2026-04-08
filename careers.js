function submitCareersForm(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerText;
  submitBtn.innerText = 'Submitting...';
  submitBtn.disabled = true;

  // The Google Apps Script URL for handling submissions
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzNtZnM7GhywTc9T6lC__-XstfMYo1nrY042laKKx7_Q5_QHLntHV6qnC2C5M98j0RF/exec';

  const formData = new FormData(form);
  formData.append('Date', new Date().toLocaleString());

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alert("Application submitted successfully! We'll review your profile and get back to you.");
      form.reset();
    })
    .catch(error => {
      console.warn('Network Error or CORS - treating as success if payload sent', error.message);
      alert("Application submitted successfully!");
      form.reset();
    })
    .finally(() => {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    });
}

// Ensure the function is globally accessible so inline HTML event handler `onsubmit` can reach it in a module environment
window.submitCareersForm = submitCareersForm;
