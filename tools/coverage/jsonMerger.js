/** Inspired by https://yonatankra.com/how-to-create-a-workspace-coverage-report-in-nrwl-nx-monorepo/
 * This version collects all the coverage-final.json files in a folder and throws them into .nyc_output
 * Then I can run
 *   nyc report --temp-dir ./.nyc_output --reporter html --report-dir ./coverage/report
 *   npx serve -c ./tools/coverage/serve.json
 * */

const glob = require('glob');
const fs = require('fs');
const path = require('path');

const getJsonFiles = function (src) {
  return new Promise((resolve, reject) => {
    glob(`${src}/**/coverage-final.json`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

(async function () {
  // Remove any existing files in output folder
  // const oldFiles = await getJsonFiles('.nyc_output');

  // for (const file of oldFiles) {
  //   await fs.unlink(path.resolve(file), (err) => {
  //     if (err) {
  //       if (err) throw err;
  //     }
  //   });
  // }

  // Create folder
  const folderName = './coverage/json';
  try {
    if (!fs.existsSync(path.resolve(folderName))) {
      fs.mkdirSync(path.resolve(folderName));
    }
  } catch (err) {
    console.error(err);
  }

  // Copy new files from input to output
  const files = await getJsonFiles('coverage');

  for (const file of files) {
    const dirname = path.dirname(file); // looks like: coverage/apps/b-cal-mobile
    // console.log(path.basename(file)); // looks like: coverage-final.json

    let newFilename = dirname.replace('coverage/', '');
    newFilename = newFilename.replaceAll('/', '-');
    newFilename = newFilename + '.json';

    await fs.copyFile(
      path.resolve(file),
      path.resolve('./coverage/json/' + newFilename),
      (err) => {
        if (err) throw err;
      }
    );
  }

  console.log('Files have been saved!');
})();
