//initialize express router
let express = require('express');
let router = express.Router();

//set default API response
router.get('/', function (req, res) {

    res.json({
        status: 'API Works',
        message: 'Welcome to First API Mongo'
    });
});



//import Dados Controller

var covidController = require('./covidController');

//Dados Routes

router.route('/dados')
    .get(covidController.index)
    .post(covidController.add);

router.route('/total')
    .get(covidController.total);

router.route('/listan')
    .get(covidController.lista1);

router.route('/listai')
    .get(covidController.lista2);

router.route('/media')
    .get(covidController.media);

router.route('/maxmin')
    .get(covidController.maxmin);

router.route('/dados/:dados_id')
    .get(covidController.view);
/*.patch(covidController.update)
.put(covidController.update)
.delete(covidController.delete);*/

//Export API routes
module.exports = router;