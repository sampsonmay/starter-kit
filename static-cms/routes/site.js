const express = require('express');
const router = express.Router();
const fs = require('fs-extra')

// Pages
router.get('/:page', (req, res) => {
    let view = req.params.page;
    let dataPath = './data/'+view+'.json';
    
    // Check to see if file path exists
    if(!fs.existsSync(dataPath)) {
        dataPath = './data/error.json'
        view = 'error';
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath));
    res.render(view, {
        config: req.app.locals,
        settings: data.settings,
        content: data.content
    });
});

// Homepage
router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/home.json'));
    res.render('home', {
        settings: data.settings,
        content: data.content
    });
});

// Homepage
router.get('*', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/error.json'));
    res.render('error', {
        settings: data.settings,
        content: data.content
    });
});

module.exports = router;