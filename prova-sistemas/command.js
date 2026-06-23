// This file provides a CLI utility to run Sequelize migrations and seed the database.

const { exec } = require('child_process');

const runMigrations = () => {
    exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running migrations: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Migration stderr: ${stderr}`);
            return;
        }
        console.log(`Migration stdout: ${stdout}`);
    });
};

const runSeeders = () => {
    exec('npx sequelize-cli db:seed:all', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running seeders: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Seeder stderr: ${stderr}`);
            return;
        }
        console.log(`Seeder stdout: ${stdout}`);
    });
};

const main = () => {
    const command = process.argv[2];

    if (command === 'migrate') {
        runMigrations();
    } else if (command === 'seed') {
        runSeeders();
    } else {
        console.log('Usage: node command.js [migrate|seed]');
    }
};

main();