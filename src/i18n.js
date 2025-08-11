const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'fr'], // Supported languages
    directory: path.join(__dirname, 'locales'), // Directory for translation files
    defaultLocale: 'en', // Default language
    queryParameter: 'lang', // Query parameter to switch languages
    autoReload: true,
    updateFiles: false,
});

module.exports = i18n;