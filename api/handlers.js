const fs = require('fs');
const path = require('path');
const config = require('../config');

// define FILES_DIR
const FILES_DIR = path.join(__dirname, '../', config.FILES_DIR );
console.log(1, FILES_DIR);


// declare the handlers
const handlers = {
	getFiles: async (req, res, next) => {
    try{
      await fs.readdir(FILES_DIR, (err, list) => {
        if (err && err.code === 'ENOENT') {
          res.status(404).end();
          return;
        }
        if (err) {
          next(err);
          return;
        }
  
        res.json(list);
      });

    }
    catch(err){
      console.log(Error.message);
    }
	},
	getFile: async (req, res, next) => {
    const fileName = req.params.name;
    try {
      await fs.readFile(`${FILES_DIR}/${fileName}`, 'utf-8', (err, fileText) => {
        if (err && err.code === 'ENOENT') {
          res.status(404).end();
          return;
        }
        if (err) {
          next(err);
          return;
        }
  
        const responseData = {
          name: fileName,
          text: fileText
        };
        res.json(responseData);
      });
    }
    catch(err){
      console.log(Error.message);
    }
	},
	writeFile: async (req, res, next) => {
		const fileName = req.params.name;
    const fileText = req.body.text;
    try{
     await fs.writeFile(`${FILES_DIR}/${fileName}`, fileText, (err) => {
        if (err && err.code === 'ENOENT') {
          res.status(404).end();
          return;
        }
        if (err) {
          next(err);
          return;
        }
  
        // refactor hint:
        res.redirect(303, '/api/files');
        // handlers.getFiles(req, res, next);
      });

    }
    catch(err){
      console.log(Error.message);
    }
	},
	deleteFile: async (req, res, next) => {
    const fileName = req.params.name;
    try{
      fs.unlink(`${FILES_DIR}/${fileName}`, (err) => {
        if (err && err.code === 'ENOENT') {
          res.status(404).end();
          return;
        }
        if (err) {
          next(err);
          return;
        }
  
        // refactor hint:
        res.redirect(303, '/api/files');
        // handlers.getFiles(req, res, next);
      });

    }
    catch(err){
      console.log(Error.message);
    }
	}
};

// export the handlers
module.exports = handlers;
