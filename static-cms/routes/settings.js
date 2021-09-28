const express = require('express');
const fs = require('fs-extra');
const router = express.Router();

router.post('/:page/settings', (req, res) => {
    let name = req.params.page;
    let dataPath = './data/' + name + '.json';

    // DATA: Write the new html to the data file
    let data = JSON.parse(fs.readFileSync(dataPath));

    data.settings['keywords'] = req.body.keywords;
    data.settings['description'] = req.body.description;

    fs.writeFile(dataPath, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('Data ('+dataPath+') has been saved to file');
    });
    
    res.send('{"message" : "Settings updated successfully", "status" : 200}');

});

module.exports = router;
