const { convert } = require('html-to-text');
const express = require('express');
const bodyParser = require('body-parser');
const removeMD= require('remove-markdown-and-html')

var markdown ="fnbdsjfn"

const removeHTMLTags = (htmlString) => convert(htmlString, {
    wordwrap: false,
    preserveNewlines: false
}).replace(/\n|\\n/g, '');

const removeMarkdown = (postString) => removeMd(postString, {
    stripListLeaders: false,
    gfm: false,
}).replace(/\n|\\n|#/g, '');


const app = express();

app.use(bodyParser.json());

//endpoint to clean string
app.post('/cleanHTML', async (req, res) => {
    
    try {
        var str=JSON.stringify(req.body.body);
        const cleanString= removeHTMLTags(str);
        res.status(201).json({"result":{"cleanBody":cleanString.replace(/\\/g,"")}});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//endpoint to clean POSTstring
app.post('/cleanPost', async (req, res) => {

    try {
        var str=JSON.stringify(req.body.body);
        const cleanString= removeMarkdown(str);
        res.status(201).json({"result":{"cleanBody":cleanString}});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
      
});

const port = 3000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});