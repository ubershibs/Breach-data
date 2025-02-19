# csv-to-html/csv-to-html/README.md

# CSV to HTML Converter

This project is a simple Node.js application that reads data from a CSV file, extracts a specific line of data, and displays it as an HTML page using Handlebars as the templating engine.

## Project Structure

```
csv-to-html
├── src
│   ├── index.js         # Entry point of the application
│   ├── views
│   │   └── index.hbs    # Handlebars template for displaying data
│   └── data
│       └── data.csv     # CSV file containing the data
├── package.json          # npm configuration file
├── .gitignore            # Files and directories to ignore by Git
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd csv-to-html
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   node src/index.js
   ```

4. **Access the application**:
   Open your web browser and navigate to `http://localhost:3000` to view the extracted data displayed as an HTML page.

## Usage

- The application reads from `src/data/data.csv`. Ensure that the CSV file is formatted correctly and contains the data you wish to extract.
- Modify the extraction logic in `src/index.js` to specify which line of data you want to display.

## Dependencies

- Express: A web framework for Node.js.
- csv-parser: A library for parsing CSV files.
- express-handlebars: A templating engine for rendering HTML with Handlebars.

## License

This project is licensed under the MIT License.