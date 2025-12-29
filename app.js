console.log("Hello World from JavaScript");

const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer(function (request, response) {

    console.log('Server Requesting ' + request.url);

    if (request.url === "/" || request.url === "/frontPage.html") {
        const htmlPath = path.join(__dirname, 'public/HTML/frontPage.html');

        fs.readFile(htmlPath, function (err, html) {
            if (err) {
                console.error("HTML Error: " + err.message);
                response.writeHead(404);
                response.end("Front Page not found");
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(html);
            }
        });
    } else if (request.url.endsWith(".html")) {
        const htmlFile = path.basename(request.url);
        const htmlPath = path.join(__dirname, 'public/HTML', htmlFile);

        fs.readFile(htmlPath, function (err, html) {
            if (err) {
                console.error("HTML Error: " + err.message);
                response.writeHead(404);
                response.end("HTML File not found");
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(html);
            }
        });


        // 3. HANDLE CSS REQUESTS (Dynamic)
        // Automatically finds ANY file ending in .css inside public/CSS
    } else if (request.url.endsWith(".css")) {
        const cssFile = path.basename(request.url);
        const cssPath = path.join(__dirname, 'public/CSS', cssFile);

        fs.readFile(cssPath, function (err, css) {
            if (err) {
                console.error("CSS Error: " + err.message);
                response.writeHead(404);
                response.end("CSS File not found");
            } else {
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.end(css);
            }
        });

        // 4. HANDLE JAVASCRIPT FILES (Dynamic)
        // Automatically finds ANY file ending in .js (sidebar.js, frontPage.js, sidebar.js)
    } else if (request.url.endsWith(".js")) {
        const jsFile = path.basename(request.url);
        const jsPath = path.join(__dirname, 'public/JavaScript', jsFile);

        fs.readFile(jsPath, function (err, jsContent) {
            if (err) {
                console.error("JS Error: " + err.message);
                response.writeHead(404);
                response.end("JS File not found");
            } else {
                response.writeHead(200, {'Content-Type': 'text/javascript'});
                response.end(jsContent);
            }
        });

        // 5. HANDLE VIDEO FILES (MP4 Only)
    } else if (request.url.endsWith(".mp4")) {
        const vidPath = path.join(__dirname, 'public/vid', path.basename(request.url));

        console.log("Looking for Video at: " + vidPath);

        fs.readFile(vidPath, function (err, content) {
            if (err) {
                console.error("Video Error: " + err.message);
                response.writeHead(404);
                response.end("Video not found");
            } else {
                response.writeHead(200, {'Content-Type': 'video/mp4'});
                response.end(content);
            }
        });

        // 6. HANDLE IMAGES (Dynamic)
    } else if (request.url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
        const imgPath = path.join(__dirname, 'public/img', path.basename(request.url));

        fs.readFile(imgPath, function (err, content) {
            if (err) {
                console.error("Image Error: " + err.message);
                response.writeHead(404);
                response.end("Image not found");
            } else {
                // Determine the correct image type
                const ext = path.extname(imgPath).toLowerCase();
                let contentType = 'image/jpeg';
                if (ext === '.png') contentType = 'image/png';
                if (ext === '.webp') contentType = 'image/webp';
                if (ext === '.gif') contentType = 'image/gif';
                if (ext === '.svg') contentType = 'image/svg+xml';

                response.writeHead(200, {'Content-Type': contentType});
                response.end(content);
            }
        });

// 7. HANDLE 404 (Unknown Requests)
    } else {
        console.log("404 Error: " + request.url);
        response.writeHead(404);
        response.end("404 Not Found");
    }

}).listen(8081, '0.0.0.0');

console.log('Server running at http://127.0.0.1:8081/');