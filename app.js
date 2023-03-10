const express = require("express");
const fileupload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 3001;

app.use(fileupload());

app.post('/saveFile', (req, res) => {
  const fileName = req.files.myFile.name

  console.log("/saveFile: " + fileName);
  console.log("size: " + req.files.myFile.size + " truncated: " + req.files.myFile.truncated);
  res.writeHead(200, {
    'Content-Type': 'application/json'});
  res.end(JSON.stringify({ status: 'success', path: fileName }));

})


app.get("/", (req, res) => res.type('html').send(html));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Upload test</title>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Upload test
    </section>
    <input type="file" id="fileUpload" />
    <p id="upload_status"> </p>
   
   <script>
   
      let upload_status = "not started";
      console.log("upload_status: " + upload_status);
      document.getElementById('upload_status').innerHTML = upload_status;
      
      const handleImageUpload = event => {
      const files = event.target.files
      const formData = new FormData()
      formData.append('myFile', files[0])

      upload_status = "started";
      console.log("upload_status: " + upload_status);
      fetch('/saveFile', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log("success: " + data.path);
        upload_status = "complete";
        console.log("upload_status: " + upload_status);
        document.getElementById('upload_status').innerHTML = upload_status;
      })
      .catch(error => {
        upload_status = "error";
        console.log("upload_status: " + upload_status);
        console.error(error)
        document.getElementById('upload_status').innerHTML = upload_status;
      })
    }

    document.querySelector('#fileUpload').addEventListener('change', event => {
      handleImageUpload(event)
    })
   </script>

  </body>
</html>
`
