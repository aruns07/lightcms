'use strict';


let express = require('express');
let exphbs = require('express-handlebars');
let app = express();

//Handlebars configuration
app.engine('.hbs', exphbs({
		defaultLayout: 'main',
		extname: '.hbs',
		layoutsDir: 'dist/views/layouts/',
		partialsDir: 'dist/views/partials/',
		helpers: {
			resolveAsset: function(assetId, collection) {
				for(let asset of collection) {
					console.log(assetId, '££££££££ : ', JSON.stringify(asset.sys.id));
					if(asset.sys.id === assetId) {
						return asset.fields.file.url;
					}
				}
				return 'Not found';
			}
		}
	}));
app.set('views','dist/views');
app.set('view engine', '.hbs');

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