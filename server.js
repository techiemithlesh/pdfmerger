const express = require('express');
const path = require('path');
const multer  = require('multer')
const app = express();
const {mergePdfs} = require('./mergepdf');

const upload = multer({dest: 'uploads'})
const PORT = 3001;
app.use('/static', express.static('public'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"));
})

app.post('/merge', upload.array('pdf', 2), async (req, res, next) => {
    // console.log(req.files);
    // res.send({data: req.files})
   let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3001/static/${d}.pdf`)
  })

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})
