const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const { applyEach } = require('async');
const app = express();
/// const mongoClient = require('mongodb').MongoClient;
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const url = "mongodb+srv://harryfora:maki12te@cluster0.yswxu.mongodb.net/";
const port = process.env.PORT || 3000;

const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'harryfora',
    password: 'd4cebf08',
    database: 'creadendb'
});

connection.connect(function (err) {});

/*
console.log(mongoClient);
mongoClient.connect(url,  {useNewUrlParser: true}, function (err, db) {
    if (err) res.send(err);
    console.log("Database created!"  + db);
});
*/
// gestor de la url
app.use(bodyParser.urlencoded({ extended: true }));
// puerto donde se ejecuta
// app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// indicar donde estan los elemntos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// operaciones get
app.get('/', (req, res) => {
    res.render('pages/index', { hecho: false });
});

app.get('/pedido', (req, res) => {
    res.render('pages/pedido');
});

app.get('/menu', (req, res) => {

    res.render('pages/menu');
});

app.get('/login', (req, res) => {
    /*
    try {
        mongoClient.connect(url, function (err, db) {
            if (err) return err;
            if (db.db) {
                let dbo = db.db('mydb');
                dbo.collection('users').find({}).toArray(function (err, result) {
                    if (err) throw err;
                    
                    res.render('pages/login', { datos: JSON.stringify(result) });
                });
            }
    
    
        });
    } catch (error) {
        console.log(error);
    }
    */
    try {
        let query = 'select * from usersDominos';
        connection.query(query, function (error, result) {
            if (error) res.send(error);
            res.render('pages/login', { datos: JSON.stringify(result) });
        });
    } catch (error) {

    }

});

app.get('/tablas', (req, res) => {
    /*
    // conectar a la base de datos
    try {
        mongoClient.connect(url, function (err, db) {
            if (err) res.send(err);
            if (db.db) {
                let dbo = db.db("mydb");
                dbo.collection('pedidos').find({}).toArray(function (err, result) {
                    if (err) throw err;
                    res.render('pages/tablas', { datos: JSON.stringify(result) });
                    
                });
            }
    
        });
    } catch (error) {
        console.log(error);
    }
*/
    try {
        let query = 'select * from pedidosDominos';
            connection.query(query, function (error, result) {
                if (error) return 0;
                res.render('pages/tablas', { datos: JSON.stringify(result) });
            });

        // connection.end();
    } catch (error) {

    }
});

// cuando se inicia el servidor
app.listen(port, () => {
    console.log('Ejecutando servidor');
});

// metodos post

app.post('/menu', (req, res) => {
    if ('' == req.body.cedula || 'sd' == req.body.departamento || 'ciudad' == req.body.ciudad || 'direccion' == req.body.direccion || '' == req.body.barrio || 'si' == req.body.TipoImnu || 'si' == req.body.bloque) {
        res.render("pages/pedido");
    } else {

        let redir = `pages/menu?cedula=${req.body.cedula}&ciudad=${req.body.departamento + ";" + req.body.ciudad}&direccion=${req.body.direccion + " " + req.body.primero + " " + req.body.segundo + " " + req.body.tercero + " " + req.body.barrio + " " + req.body.TipoImnu + " " + req.body.bloque}&observaciones=${req.body.observaciones}&estado=Procesando`;

        res.render(`pages/menu`, {
            cedula: req.body.cedula,
            ciudad: req.body.departamento + ";" + req.body.ciudad,
            direccion: req.body.direccion + " " + req.body.primero + " " + req.body.segundo + " " + req.body.tercero + " " + req.body.barrio + " " + req.body.TipoImnu + " " + req.body.bloque,
            observaciones: req.body.observaciones,
            estado: "Procesando"
        });
    }
});

app.post('/procesarPedido', (req, res) => {
    /*
    try {
        mongoClient.connect(url, (err, db) => {
            if (err) res.send(err);
            if (db.db) {
                let dbo = db.db("mydb");
                dbo.collection('pedidos').insertOne({
                    cedula: req.body.cedula,
                    ciudad: req.body.ciudad.split("+").join(" "),
                    direccion: req.body.direccion.split("+").join(" "),
                    observaciones: req.body.observaciones.split("+").join(" "),
                    estado: "Procesando",
                    productos: req.body.lista
                });
            }
    
    
        });
    } catch (error) {
        console.log(error);
    }
    */
    let cedula = req.body.cedula;
    let ciudad = req.body.ciudad.split("+").join(" ");
    let direccion = req.body.direccion.split("+").join(" ");
    let observaciones = req.body.observaciones.split("+").join(" ");
    let estado = "Procesando";
    let productos = req.body.lista.split("\"").join("%w%");

    try {
        let query = `INSERT INTO pedidosDominos (cedula, ciudad, direccion, observaciones, estado, productos) ` +
                `values ("${cedula}", "${ciudad}", "${direccion}", "${observaciones}",  "${estado}", "${productos}")`;
            connection.query(query, function (error, result) {
                if (error) console.log(error);
            });


        // connection.end();
    } catch (error) {

    }

    res.render('pages/index', { hecho: true });
});

app.post('/login', (req, res) => {

    try {
        let query = 'select * from pedidosDominos';
            connection.query(query, function (error, result) {
                if (error) return 0;
                res.redirect('/tablas');
            });

        ///connection.end();
    } catch (error) {

    }
});

app.post('/actualizarTabla', (req, res) => {
    /*
    try {
        mongoClient.connect(url, function (err, db) {
            if (err) res.send(err);
            if (db.db) {
                let dbo = db.db("mydb");
                let myquery = { cedula: req.body.id };
                let newvalues = { $set: { estado: req.body.estado } };
                dbo.collection("pedidos").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                    
                });
            }
    
        });
    } catch (error) {
        console.log(error);
    }
    */
    let cedula = req.body.id;
    let estado = req.body.estado;
    try {
        let query = `UPDATE pedidosDominos SET estado = "${estado}" where cedula = "${cedula}"`;
            connection.query(query, function (error, result) {
                if (error) return 0;
            });
             query = `select * from pedidosDominos`;
            connection.query(query, function (error, result) {
                if (error) return 0;
                console.log(result);
            }); 

        //connection.end();
    } catch (error) {

    }
    res.redirect('/tablas');
});


// crear base de datos
/*



mongoClient.connect(url, function (err, db) {
    var dbo = db.db("mydb");
    dbo.collection('pedidos').find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result)
        db.close();
    });

});                  
*/