const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const studentsToProcess = [4511157, 3541153]; // Example student numbers to process

// Read the student numbers from the same CSV file
fs.createReadStream(path.join(__dirname, 'src', 'data', 'students.csv'))
  .pipe(csv())
  .on('data', (row) => {
    // Assuming the column in your CSV is named 'Student_Number'
    if (row.Student_Number) {
      studentsToProcess.push(row.Student_Number);
    }
  })
  .on('end', async () => {
    console.log(`Found ${studentsToProcess.length} students to process.`);
    await generatePdfs();
  });

async function generatePdfs() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Create a directory for the PDFs if it doesn't exist
  const pdfDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(pdfDir)){
      fs.mkdirSync(pdfDir);
  }

  // You can use a slice for testing, e.g., studentsToProcess.slice(0, 5)
  for (const studentNumber of studentsToProcess) {
    const url = `http://localhost:3000/studentnumber?studentnumber=${studentNumber}`;
    console.log(`Navigating to ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle0' });

    const pdfPath = path.join(pdfDir, `student-report-${studentNumber}.pdf`);
    
    // Save the PDF
    await page.pdf({
      path: pdfPath,
      format: 'letter',
      printBackground: true // Important for including CSS background colors/images
    });

    console.log(`Saved PDF to ${pdfPath}`);
  }

  await browser.close();
  console.log('All PDFs have been generated.');
} 