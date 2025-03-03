const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = path.join(__dirname, 'data', 'staff_orig.csv');
const outputFilePath = path.join(__dirname, 'data', 'staff.csv');

function concatenateCsv(inputFilePath, outputFilePath) {
    const teacherData = {};

    fs.createReadStream(inputFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const teacherNumber = row.TeacherNumber;
            if (!teacherData[teacherNumber]) {
                teacherData[teacherNumber] = { ...row };
            } else {
                for (const key in row) {
                    if (key !== 'TeacherNumber' && teacherData[teacherNumber][key] != `${row[key]}`) {
                        teacherData[teacherNumber][key] += `;${row[key]}`;
                    }
                }
            }
        })
        .on('end', () => {
            const csvWriter = createCsvWriter({
                path: outputFilePath,
                header: Object.keys(teacherData[Object.keys(teacherData)[0]]).map((key) => ({ id: key, title: key }))
            });

            const records = Object.values(teacherData);
            csvWriter.writeRecords(records)
                .then(() => {
                    console.log('CSV file written successfully');
                });
        });
}

concatenateCsv(inputFilePath, outputFilePath);