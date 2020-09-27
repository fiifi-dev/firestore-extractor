let { extract } = require("./firestore.js");

(async function () {
  let argv = require("yargs")
    .command("extract", "extracts the specified collection into database.js file")
    .help().argv;

  let command = argv._[0];

  if (command === "extract") {
    extract()
  }

})();