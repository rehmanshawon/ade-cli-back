/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function seedInitialData() {
  try {
    const { stdout } = await exec('npx sequelize-cli db:seed:all', {
      shell: 'powershell.exe',
    });
    // const { stdout } = await exec("npm install --save dotenv @nestjs/passport passport passport-local @nestjs/jwt passport-jwt", {
    //   shell: "powershell.exe",
    // });
    console.log('Initial seeding is done!', stdout);
    console.log('Use information below to login and start developing backend!');
    console.log('super-admin email: super@email.com');
    console.log('super-admin password: 123456');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = seedInitialData;
