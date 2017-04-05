const fs = require('fs');
const folder = './tasks/';

fs.readdir(folder, (err, files) => {
    files.forEach(file => {
        const fullPath = folder + file;

        fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            const newData = data.replace(/\*\*/g, '*');

            fs.writeFile(fullPath, newData, 'utf8', err => {
                console.log(err);
            });
        });
    });
});