# firestore-extractor
```
This a simple app creates database.js containing all the collections specified in the collection.js

```

## Project setup
```
1. npm install
2. Paste your project settings in the intializeApp method in the firestore.js
3. Fill the collections array in the collections.js with the collections you would like to download. Note
   Note that for a single doc, you must specify the doc id in addition to the name.
4. Run "node index.js extract" in the terminal
Note: Be sure you set the firestsore to allow all reads
```

## Output
```
Output is found in the ./output/database.js
```
