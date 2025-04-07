const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static('public'));

const students = [];
fs.createReadStream(path.join(__dirname, 'data', 'students.csv'))
  .pipe(csv())
  .on('data', (data) => students.push(data))
  .on('end', () => {
    console.log(students)
    console.log('Rows read: ' + students.length);
  });

  const staff = [];
  fs.createReadStream(path.join(__dirname, 'data', 'staff.csv'))
  .pipe(csv())
  .on('data', (data) => staff.push(data))
  .on('end', () => {
    console.log(staff)
    console.log('Rows read: ' + staff.length);
  });

// Serve the hompage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route to display the student CSV data by row number
app.get('/students', (req, res) => {
  const rowIndex = parseInt(req.query.row)|| 1; // Default to the first row if no query parameter is provided
  if (rowIndex < 1 || rowIndex > students.length) {
      return res.status(400).send('Invalid row index');
  }
  const extractedData = students[rowIndex-2];
  res.render('students', { data: extractedData });
});

// Route to display student CSV data by LastFirst
app.get('/studentname', (req, res) => {
  const lastfirst = req.query.lastfirst;

  if (!lastfirst) {
    return res.status(400).send('Search term is required');
  }

  const extractedData = students.find((row) => row.LastFirst.toLowerCase().startsWith(lastfirst.toLowerCase()));

  if (!extractedData) {
    return res.status(404).send('No matching student found');
  }
  const dob = new Date(extractedData.DOB);
  const today = new Date();
  const ageToday = today.getFullYear() - dob.getFullYear();

  const adult = ageToday >= 18 ? true : false;

  res.render('studentname', { data: extractedData, isAdult: adult });
});

// Route to display the staff CSV data by row number
app.get('/staff', (req, res) => {
  const rowIndex = parseInt(req.query.row)|| 1; // Default to the first row if no query parameter is provided
  if (rowIndex < 1 || rowIndex > staff.length) {
      return res.status(400).send('Invalid row index');
  }
  const extractedData = staff[rowIndex-2];
  res.render('staff', { data: extractedData });
});

// Route to display staff CSV data by LastFirst
app.get('/staffname', (req, res) => {
  const lastfirst = req.query.lastfirst;

  if (!lastfirst) {
    return res.status(400).send('Search term is required');
  }

  const extractedData = staff.find((row) => row.LastFirst.toLowerCase().startsWith(lastfirst.toLowerCase()));

  if (!extractedData) {
    return res.status(404).send('No matching staff member found');
  }

  res.render('staffname', { data: extractedData });
});

// Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});