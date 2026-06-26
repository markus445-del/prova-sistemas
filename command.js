const { existsSync } = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const appDir = existsSync(path.join(__dirname, 'src', 'package.json'))
  ? path.join(__dirname, 'src')
  : __dirname;

const sequelizeArgs = [
  '--config', 'config/config.js',
  '--migrations-path', 'migrations',
  '--seeders-path', 'seeders',
  '--models-path', 'models',
];

function runSequelize(command) {
  execFileSync('npx', ['sequelize-cli', command, ...sequelizeArgs], {
    cwd: appDir,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
}

function main() {
  const command = process.argv[2];

  if (command === 'migrate') {
    runSequelize('db:migrate');
    return;
  }

  if (command === 'seed') {
    runSequelize('db:seed:all');
    return;
  }

  if (command === 'seed:optional') {
    try {
      runSequelize('db:seed:all');
    } catch (error) {
      console.log('Seed ignorado: dados iniciais provavelmente ja existem.');
    }
    return;
  }

  console.log('Uso: node command.js [migrate|seed|seed:optional]');
}

main();
