import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "URL",
      message: "Enter a URL to generate a QR code:",
      validate: (input) => !!input.trim() || "Please enter a URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url, { type: "png" });
    // Use the already imported fs (ESM) instead of require (which caused ReferenceError)
    // Derive a clean base name from the URL without protocol, path, or .com
    let fileBase;
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      fileBase = parsed.hostname;
    } catch {
      fileBase = url;
    }

    fileBase = fileBase
      .replace(/^www\./, '')
      .replace(/\.com$/i, '')
      .replace(/[^a-z0-9_-]/gi, '_'); // sanitize for file system

    const fileName = `qr_${fileBase || 'code'}.png`;

    qr_svg.pipe(fs.createWriteStream(fileName));
    console.log(`QR code generated and saved as ${fileName}`);

    fs.writeFile(`url_${fileBase || 'code'}.txt`, url, (err) => {
      if (err) {
        console.error("Error writing URL to file:", err);
      } else {
        console.log(`URL saved to url_${fileBase || 'code'}.txt`);
      }
    });
  })
  .catch((error) => {
    console.error("Error during inquirer prompt:", error);
  });