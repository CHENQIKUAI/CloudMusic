var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

	return res.render('index', {
		title: 'QQ音乐'
	});
});

module.exports = router;