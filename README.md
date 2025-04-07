# csv-to-html/csv-to-html/README.md

# PowerSchool Data Breach CSV to HTML Converter

This project is a Node.js application that reads data from CSV files, allows searching for specific data based on query parameters, and displays the results as HTML pages using Handlebars as the templating engine.

## Project Structure

```
csv-to-html
├── src
│   ├── index.js         # Entry point of the application
│   ├── concat.js        # Script to process and concatenate CSV data
│   ├── views
│   │   ├── index.hbs    # Handlebars template for displaying general data
│   │   ├── students.hbs # Template for displaying student data
│   │   └── staff.hbs    # Template for displaying staff data
│   └── data
│       ├── students.csv # CSV file containing student data
│       ├── staff.csv    # CSV file containing processed staff data
│       └── staff_orig.csv # Original staff CSV file
├── public
│   └── home.html        # Static homepage for the application
├── package.json          # npm configuration file
├── .gitignore            # Files and directories to ignore by Git
└── README.md             # Project documentation
```

Note that CSVs contain confidential information and are not included in the repository. You will need to provide your own CSV files.

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd ps-breach-csv-to-html
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm start
   ```

4. **Access the application**:
   Open your web browser and navigate to `http://localhost:3000`. Here you will be presented with the chance to search for students or staff members.

### Routes

1. **`/students`**:
   - Query parameter: `row` (e.g., `/students?row=2`)
   - Displays a specific row of student data based on the row number.

2. **`/studentname`**:
   - Query parameter: `lastfirst` (e.g., `/studentname?lastfirst=JohnDoe`)
   - Searches for a student whose `LastFirst` field starts with the provided query and displays their data.

3. **`/staff`**:
   - Query parameter: `search` (e.g., `/staff?search=Smith`)
   - Searches for a staff member whose `LastFirst` field starts with the provided query and displays their data.

4. **`/staffname`**:
   - Query parameter: `lastfirst` (e.g., `/staffname?lastfirst=JaneDoe`)
   - Searches for a staff member whose `LastFirst` field starts with the provided query and displays their data.

### CSV Concatenation Script

- The `concat.js` script processes the `staff_orig.csv` file and generates a new `staff.csv` file.
- It groups rows by `TeacherNumber` and concatenates all other fields to ensure no data is lost.

Run the script with:

```bash
node src/concat.js
```

## Dependencies

- **Express**: A web framework for Node.js.
- **csv-parser**: A library for parsing CSV files.
- **csv-writer**: A library for writing CSV files.
- **express-handlebars**: A templating engine for rendering HTML with Handlebars.

## Usage Notes

- Ensure the `src/data` directory contains the required CSV files (`students.csv`, `staff_orig.csv`).
- Modify the logic in `src/index.js` or `src/concat.js` as needed to customize functionality.

## License

This project is licensed under the MIT License.
