/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    app = express();

var SCConfig = {
    client_id: '041e3d064c8a9360d004a4760dd4a23e',
    client_secret: '0efe8c1cfd06d004c6dc8d15ef17b3e0',
    redirect_uri: 'http://localhost:5000/auth/callback',
    response_type: 'token',
    scope: 'non-expiring'
}

app.use('/', express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/auth/connect', function(req, res) {
    res.redirect('https://soundcloud.com/connect?client_id=' + SCConfig.client_id + '&redirect_uri=' + SCConfig.redirect_uri + '&response_type=' + SCConfig.response_type + '&scope=' + SCConfig.scope);
});

app.get('/auth/callback', function(req, res) {
    console.log(res.body);
//    console.log(res);
    res.redirect('/wtfwtfwtf');
});

app.get('/comments.json', function(req, res) {
  fs.readFile('_comments.json', function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments.json', function(req, res) {
  fs.readFile('_comments.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('_comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

app.listen(5000);

console.log('Server started: http://localhost:5000/');
