const express = require('express');
const path = require('path');

const router = express.Router();

const appRoot = path.dirname(process.mainModule.filename);

router.get('/', (req, res) => {
    res.sendFile(path.join(appRoot, 'views', 'home.html'));
    });

module.exports = router;