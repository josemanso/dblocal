var express = require('express');
var router = express.Router();


var dbControllers = require('../controllers/db_controllers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PostgreSQL local' });
});

/*get mostrar db */
router.get('/mostrardb', dbControllers.mostrardb);
/*get mostrar db */
//router.get('/mostrardb', dbControllers.mostrardb);
/*nuevo redistro*/
router.get('/nuevo', dbControllers.mostrardbnr);

/*insertar*/
router.post('/nuevo', dbControllers.insertar);

/*borrar*/
/* primero mostrar la db y el 2submit  */
router.get('/borrar', dbControllers.mostrardbbr);
/*grabar, borrar */
router.post('/borrar', dbControllers.delete);


/*editar*/
/* primero mostrar la db y el submit  */
router.get('/edit', dbControllers.mostrardbedit);
/*update _method put*/
router.post('/edit', dbControllers.editar);

/*filtro*/
router.get('/filtro', dbControllers.mostrardbfiltroMa);
/*mostrar el filtro*/
router.post('/filtro', dbControllers.filtroMa);

/*ordenar por id*/
router.get('/orden', dbControllers.mostrardbOrden);

module.exports = router;

