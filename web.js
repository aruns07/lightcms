'use strict';


let express = require('express');
let app = express();

let contentful = require('contentful');
let client = contentful.createClient({
	space: 'xbpa6t4nntz2',
	accessToken: 'e1110ae644b75e50373c2162faa6f082d543b87763fdc303974ae020ee37ce5a'
});

app.use(express.static('.'));

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