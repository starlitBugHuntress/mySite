const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Create an instance of the express app
const app = express();

// Set up the port (use whatever port you like, 3000 is common)
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter for Nodemailer (using Gmail for example)
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // You can change this to use other email services
        auth: {
            user: 'your-email@gmail.com',  // Replace with your email
            pass: 'your-email-password',   // Or use an app password for Gmail
        },
    });

    // Set up the email data
    const mailOptions = {
        from: email,  // Email of the form submitter
        to: 'your-email@example.com',  // Replace with your email
        subject: 'New Contact Form Message',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Message sent successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});