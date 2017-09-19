const port = process.env.PORT || 8080;
const root = './views';

const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(root));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/hide-motd', (req, res) => {
	res.render('hide_motd');
});

app.get('/mini', (req, res) => {
	res.render('mini');
})

app.listen(port, err => {
	if (err) throw err;
	console.log('Smart Mirror server running on port', port);
});
