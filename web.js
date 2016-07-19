let express = require('express');
let app = express();

app.use(express.static('.'));

app.get('/carousel', function(req, res){
	res.send('carousel data');
});

let port = process.env.port || 3000;
app.listen(port, function() {
	console.log('App listening on port '+ port);
});