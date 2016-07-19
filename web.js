let express = require('express');
let app = express();

app.use(express.static('.'));

app.get('/carousel', function(req, res){
	res.send('carousel data');
});

app.listen(3000, function() {
	console.log('App listening on port 3000!');
});