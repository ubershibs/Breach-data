// Import the Puppeteer library
const puppeteer = require('puppeteer');
const path = require('path');

// An array of website URLs to print to PDF
const students =  [{ "Student_Number": 4511157, "LastFirst": "Anderson, Malikhia" },{ "Student_Number": 3541153, "LastFirst": "Anderson, Savanna" }];

// We use an async function to use the 'await' keyword
async function printPdfs() {
    console.log('🚀 Launching browser...');
    const browser = await puppeteer.launch({  headless: false, slowMo: 25 }); 

    console.log('✅ Browser launched. Starting PDF creation...');

    // Loop through each URL in the array
    for (const student of students) {
        const url = `http://localhost:3000/studentnumber?studentnumber=${student.Student_Number}`;
        const page = await browser.newPage(); // Create a new page for each URL

        try {
            console.log(`Navigating to: ${url}`);
            // Go to the URL and wait until the DOM is fully loaded
            await page.goto(url, { waitUntil: 'domcontentloaded' });

            // Generate a unique filename for each PDF
            const filename = `${student.Student_Number}.pdf`;
            const pdfPath = path.join(__dirname, filename);

            console.log(`📄 Printing ${filename}...`);
            // Generate the PDF from the page content
            await page.pdf({
                path: pdfPath,
                format: 'Letter',  // Paper format
                printBackground: true // Print background graphics
            })

            console.log(`✅ Successfully created ${pdfPath}`);

        } catch (error) {
            console.error(`❌ Failed to process ${url}. Error: ${error.message}`);
        } finally {
            await page.close(); // Close the page to free up resources
        }
    }

    // Close the browser once all PDFs are created
    await browser.close();
    console.log('🎉 All PDFs created successfully. Browser closed.');
}

// Run the function
printPdfs();
