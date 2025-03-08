document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevents the form from submitting normally

    // Get form data
    const formData = new FormData(this);

    // Show a loading message
    document.getElementById('form-status').innerText = 'Sending...';

    // Make AJAX request to Formspree
    fetch('https://formspree.io/f/your-form-id', {  // Replace with your Formspree form ID
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('form-status').innerText = 'Message sent successfully!';
            document.getElementById('contact-form').reset();  // Reset form fields
        } else {
            document.getElementById('form-status').innerText = 'Sorry, something went wrong.';
        }
    })
    .catch(error => {
        document.getElementById('form-status').innerText = 'Error: ' + error.message;
    });
});