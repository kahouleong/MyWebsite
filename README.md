# Back to Default Detailing

## Run locally

Extract the website archive and open index.html in a browser. Keep style.css, app.js, car-models.js, and the assets folder beside index.html. No installation, build command, or backend is required. Google Fonts is optional at runtime. The page uses system fonts if the font request fails.

## Set up the WhatsApp button

The WhatsApp button is configured for 01127243879. To change it, update whatsappNumber in app.js using international format with digits only. For a Malaysian number, use country code 60 and omit the domestic leading 0. Select a package, click the button, and verify that WhatsApp opens the correct conversation and fills in the enquiry.

## Update the gallery

The gallery uses assets/before.jpg and assets/after.jpg. Update their image descriptions and dimensions in index.html when changing photos.

## Publish

Upload index.html, style.css, app.js, car-models.js, and assets/ to the document root of any static web host. For a host that supports folder uploads, select the extracted folder containing index.html. Set the publish directory to that folder and leave the build command blank. Open the HTTPS address the host provides and check the gallery, calculator, and WhatsApp link on a phone.
