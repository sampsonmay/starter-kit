const express = require('express');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const request = require("request");
const router = express.Router();

router.post('/home/build', (req, res) => {

    const output = './dist';

    // Create the dist directory if it does not yet exists
    fs.rmdirSync(output, { recursive: true });
    fs.mkdirSync(output);

    // Remove all existing directories/files first, incase of old pages.
    const builtPages = fs.readdirSync(output).map(x => x.replace(/\.[^/.]+$/, ""));
    builtPages.forEach(x => {
        fs.rmdirSync(output + "/" + x, { recursive: true });
    });


    // Copy assets from static & remove the ones we don't need.
    let filesToRemove = [
        'css/cms.css',
        'css/tinymce.css',
        'js/cms.js',
        'js/tinymce.js'
    ]
    fs.copySync('./static/assets', output + '/assets');
    filesToRemove.forEach(x => fs.unlink(output + '/assets/' + x) )
        
    
    // Create an array of pages and create the folder structure
    const pages = fs.readdirSync('./data').map(x => x.replace(/\.[^/.]+$/, ""));
    pages.forEach(x => {

        let home = x == "home";
        let path = home ? output : output + "/" + x;

        if(!home) {
            fs.rmdirSync(path, { recursive: true });
            fs.mkdirSync(path);
        }
        request.get(req.app.locals.path + x, (error, response, body) => {
            let $ = cheerio.load(body);

            // Remove things that aren't needed for production.
            $('[data-remove]').remove();

            // Remove data attributes that are associated with the CMS.
            

            // Turn body into HTML document
            body = $.html();

            // Create an index file in the correct directory, and write to it
            let ps = fs.createWriteStream(path + '/index.html');
                ps.write(body);
                ps.end();
            
        }); 
    });

    res.send('{"message" : "Build success", "status" : 200}');
    
});

module.exports = router;
