const express = require('express');
const fs = require('fs-extra');
const router = express.Router();

router.post('/:page/update', (req, res) => {
    let name = req.params.page;
    let dataPath = './data/'+name+'.json';
    
    // DATA: Write the new html to the data file
    let data = JSON.parse(fs.readFileSync(dataPath));
    data.content[req.body.key] = req.body.html;
    fs.writeFile(dataPath, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('Data ('+dataPath+') has been saved to file');
    });
        
    // TEMPLATE: String replacement(s) if it's a new editable area
    if(req.body.new) {
        
        let templatePath = './views/'+name+'.ejs';
        let template = fs.readFileSync(templatePath, "utf-8")

        template = template.replace(/[\n\r]+/g, '');

        let element = req.body.element.replace(/[\n\r]+/g, '').replace('=""', ' data-key="'+req.body.key+'"');
            element = element.replace(req.body.oldHtml.replace(/[\n\r]+/g, ''), '<%- content.'+req.body.key+' %>');

        let result = template.replace(req.body.element.replace('=""', '').replace(/[\n\r]+/g, ''), element);

        fs.writeFile(templatePath, result, (err) => {
            if (err) throw err;
            console.log('Template ('+templatePath+') has been updated');
        }, 2);
    }

    res.send('{"message" : "Update successfully", "status" : 200}');

});

module.exports = router;
