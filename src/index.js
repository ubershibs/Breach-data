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

// Route to display the CSV data
app.get('/', (req, res) => {
  const rowIndex = parseInt(req.query.row)|| 1; // Default to the first row if no query parameter is provided
  if (rowIndex < 1 || rowIndex > students.length) {
      return res.status(400).send('Invalid row index');
  }
  const extractedData = students[rowIndex - 1];
  res.render('index', { data: extractedData });
});

// Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});