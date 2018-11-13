function template(content = "", styleTags) {
  let scripts = "";
  if (content) {
    scripts = `<script src="assets/main.js"></script>`;
  } else {
    scripts = ` <script src="assets/main.js"> </script>`;
  }
  let page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title> APP </title>
                ${styleTags}
              </head>
              <body>
                <div id="container">${content}</div>
                <div id="modal-root"></div>
                ${scripts}
              </body>
              `;

  return page;
}

module.exports = template;
