'use strict';

let util = require('./server/util');
let express = require('express');
let exphbs = require('express-handlebars');
let app = express();

require('./server/handlebars-config')(app, exphbs);

//Contentfull configuration
let contentful = require('contentful');
let client = contentful.createClient({
	space: 'xbpa6t4nntz2',
	accessToken: 'e1110ae644b75e50373c2162faa6f082d543b87763fdc303974ae020ee37ce5a'
});

app.use(express.static('dist'));

app.get('/', (req, res) => {
	
	client.getEntries({ 
			content_type: 'carouselType'
		})
		.then((entry) => {
			entry.items = util.identifyFirst(entry.items);
			res.render('home', entry);
		})
		.catch((error) => { 
			res.sendStatus(500);
		});
});

app.get('/carousel', (req, res) => {
	client.getEntry('1NEONRexcIIYis6GKkqMw6')
		.then((entry) => {
			res.send('carousel data : ' + JSON.stringify(entry));		
		});
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('App listening on port '+ port);
});