const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static('public'));

// File upload setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/workpapers', (req, res) => {
    res.render('workpapers');
});

app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/upload', upload.single('workpaper'), (req, res) => {
    // Compare the uploaded workpaper here
    const uploadedFile = req.file;
    // Logic to compare uploaded file with a sample
    res.send('File uploaded successfully!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
