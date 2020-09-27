let firebase = require("firebase/app");
require("firebase/firestore");
let { collections } = require("./collections.js");
let fs = require("fs").promises;

firebase.initializeApp({
  //paste app settings here
});

const db = firebase.firestore();

exports.extract = async () => {
  try {
    let output = await getCollectionString(collections);
    //writes file
    let outputFolder = "./output";
    await fs.mkdir(outputFolder, { recursive: true });
    await fs.writeFile(`${outputFolder}/database.js`, output);
    console.log("done!! the results can be found in ./output/database.js");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

let getCollectionString = async (collection) => {
  try {
    let output = "";
    let fcollections = [];
    let fexports = [];

    for (const collection of collections) {
      if (collection.name && collection.doc) {
        let doc = await db
          .collection(collection.name)
          .doc(collection.doc)
          .get();
        let item = { id: doc.id, ...doc.data() };
        fexports.push(collection.name);
        fcollections.push(`let ${collection.name} = ${JSON.stringify(item)}`);
      } else if (collection.name && !collection.doc) {
        let items = [];
        let docs = await db.collection(collection.name).get();
        docs.forEach(function (doc) {
          items.push({ id: doc.id, ...doc.data() });
        });
        fexports.push(collection.name);
        fcollections.push(`let ${collection.name} = ${JSON.stringify(items)}`);
      } else {
        console.log("collection name is not valid");
        return "there was some unknown error";
      }
    }
    output += `${fcollections.join(";")}`;
    output += `
    
export { ${fexports.join()} }`;
    return output;
  } catch (error) {
    console.log(error);
    return error;
  }
};
