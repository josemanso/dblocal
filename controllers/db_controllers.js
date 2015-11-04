var pg = require('pg');

/*   conexión a base datos local= //user:pass@dir:port/nombredatabase*/
var conString = "postgres://jmouser:user956@localhost:5432/coches_hibridos";

/*select all*/
exports.mostrardb = function(req, res) {
  
  /* conexión  cliente*/
  var client = new pg.Client(conString);
  client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });
  var query = client.query("select * from hibridos"); //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    console.log(JSON.stringify(result.rows, null, " "));
    res.render('mostrardb', {filas: result.rows});
    client.end();
  });
};

exports.mostrardbnr = function(req, res) {
  
  /* traemos la conexión hecha en el modelo*/
  var client = new pg.Client(conString);
  client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });
  var query = client.query("select * from hibridos"); //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    //console.log(JSON.stringify(result.rows, null, " "));
    res.render('nuevo', {filas: result.rows});
    client.end();
  });
};

exports.insertar = function(req, res) {
  /* traemos la conexión hecha en el modelo, aqui por ser db local*/
  var client = new pg.Client(conString);
  client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });;
  
 /* client.query("INSERT INTO hibridos(id) values ('5')");*/
  /* funciona, ahora a por el body*/
   //var data = {marca: req.body.marca, modelo: req.body.modelo, concumo:req.body.consumo, potencia:req.body.potencia, precio:req.body.precio};
   var marca1 = req.body.marca, modelo1 = req.body.modelo;
   console.log(" "+marca1+" "+modelo1);
   /*números*/
  
   

   var consumo1 = req.body.consumo, potencia1 = req.body.potencia, precio1 = req.body.precio;
    //console.log("  consumo2 " +typeof(consumo2));
     /*errores sin entrada NaN, si es un string poues pasamos a NaN*/
    if(consumo1 === '') {
      consumo1 = 0.00;
    }else {
      consumo1 = Number.parseFloat(consumo1)+0.00;
    };
     if(potencia1 === '') {
      potencia1 = 0.00;
    }else {
      potencia1 = Number.parseFloat(potencia1)+0.00;
    };
     if(precio1 === '') {//si es un string dará error, controlado en function error
      precio1 = 0.00;
    }else {
      precio1 = Number.parseFloat(precio1)+0.00;
    };
   
 client.query("INSERT INTO hibridos(marca, modelo, consumo, potencia_cv, precio_euros) values($1,$2,$3,$4,$5)", [marca1, modelo1, consumo1, potencia1, precio1],
   function(error, result) {
     if(error) {
       console.log (error);
       return;
     }
   });
  var query = client.query("select * from hibridos"); //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    /*console.log(JSON.stringify(result.rows, null, " "));*/
    res.render('nuevo', {filas: result.rows});
    client.end();
  });

};

// DELETE /hibridos/ :id
/*primero el pedir registro  */
exports.mostrardbbr = function(req, res) {
  
  /* traemos la conexión hecha en el modelo*/
  var client = new pg.Client(conString);
 client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });
  var query = client.query("select * from hibridos"); //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    //console.log(JSON.stringify(result.rows, null, " "));
    res.render('borrar', {filas: result.rows});
    client.end();
  });
};
/* ahora borrar registro por id */
exports.delete = function(req, res) {
  var client = new pg.Client(conString);
  client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });
  
  /*ha de ser por id*/
 // var id = req.params.hibridos.id;
  //console.log (" id es " +id);
 
  client.query("DELETE FROM hibridos WHERE id =($1)", [req.body.id],
     function(error, result) {
     if(error) {
       console.log (error);
       return;
     }
   });
  
  
  var query = client.query("select * from hibridos"); //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    //console.log(JSON.stringify(result.rows, null, " "));
    res.render('borrar', {filas: result.rows});
    client.end();
  });
    
};

/*Editar /hibridos/ cambiar algún /algunos datos */
/*primero el pedir registro */
exports.mostrardbedit = function(req, res) {
  
  /* traemos la conexión hecha en el modelo*/
  var client = new pg.Client(conString);
  client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });
  var query = client.query("select * from hibridos"); //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    //console.log(JSON.stringify(result.rows, null, " "));
    res.render('edit', {filas: result.rows});
    client.end();
  });
 };
/* ahora editar (el id no cambia),  editar registro sus datos */
exports.editar = function(req, res) {
  var client = new pg.Client(conString);
  client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });
  
  /*ha de ser por id*/
  /*validar entradas*/
   var marca1 = req.body.marca, modelo1 = req.body.modelo;
   console.log(" "+marca1+" "+modelo1);
   /*números*/
  
   var consumo1 = req.body.consumo, potencia1 = req.body.potencia, precio1 = req.body.precio;
    console.log("  consumo2 " +typeof(consumo2));
     /*errores sin entrada NaN*/

    if(consumo1 === '') {
      console.log("consuo Nan if ");
      consumo1 = 0.00;
    }else {
       console.log("consuo Nan no if ");
      consumo1 = Number.parseFloat(consumo1)+0.00;
    };
     if(potencia1 === '') {
        console.log("poteconsuo Nan if ");
      potencia1 = 0.00;
    }else {
       console.log("pot no if consuo Nan if ");
      potencia1 = Number.parseFloat(potencia1)+0.00;
    };
     if(precio1 === '') {
      precio1 = 0.00;
    }else {
      precio1 = Number.parseFloat(precio1)+0.00;
    };
 // var id = req.params.hibridos.id;
    var id = req.body.id;
  console.log (" id es " +req.body.id);
    //UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);potencia_cv, precio_euros
 
  client.query("UPDATE hibridos SET marca =($2), modelo =($3),consumo =($4), potencia_cv =($5), precio_euros =($6) WHERE id =($1)",[id,marca1, modelo1, consumo1, potencia1, precio1],
     function(error, result) {
     if(error) {
       console.log (error);
       return;
     }
   }
  );
  
  var query = client.query("select * from hibridos"); //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    //console.log(JSON.stringify(result.rows, null, " "));
    res.render('edit', {filas: result.rows});
    client.end();
  });
  
};


/*Filtrar /hibridos/ marcas */
/*primero el pedir que marca */
exports.mostrardbfiltroMa = function(req, res) {
  
  /* traemos la conexión hecha en el modelo*/
  var client = new pg.Client(conString);
  client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });
  var query = client.query("select * from hibridos"); //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    //console.log(JSON.stringify(result.rows, null, " "));
    res.render('filtro', {filas: result.rows});
    client.end();
  });
 };
 
 /*Con la marca */
exports.filtroMa = function(req, res) {
  
  /* traemos la conexión hecha en el modelo*/
  var client = new pg.Client(conString);
  client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });
  console.log(" marca a filtrat  "+req.body.marca);
  var query = client.query("select * from hibridos where marca = ($1)", [req.body.marca],
			   function(error, result) {
			     if(error) {
			       console.log (error);
			       return;
			     }
			   }
		     );
  //; //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    //console.log(JSON.stringify(result.rows, null, " "));
    res.render('filtro', {filas: result.rows});
    client.end();
  });
 };
      
  
 /*Ordenar/hibridos/ por id */
/*primero el pedir que marca */
exports.mostrardbOrden = function(req, res) {
  
  /* traemos la conexión hecha en el modelo*/
  var client = new pg.Client(conString);
  client.connect(function(error) {
    if(error) 
      console.log('problemas con la conexión a db local');
  });
  var query = client.query("select * from hibridos order by id ASC"); //tabla
  query.on("row", function(row, result) {
    result.addRow(row);
  });
  query.on("end", function(result) {
    //console.log(JSON.stringify(result.rows, null, " "));
    res.render('orden', {filas: result.rows});
    client.end();
  });
 };