// require the handlers
const express = require('express');

const handlers = require('./handlers.js');


// build the router
const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {
	res.send('files API!');
});

// add routes to router

router.get('/files', handlers.getFiles);

// read a file
//  called by action: fetchAndLoadFile
router.get('/files/:name', handlers.getFile);

// write a file
//  called by action: saveFile
router.post('/files/:name', handlers.writeFile);

// delete a file
//  called by action: deleteFile
router.delete('/files/:name', handlers.deleteFile);

// export the router
module.exports = router;
