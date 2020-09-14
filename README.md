## Creando lista

1.- npm init -y
2.- instalar
    express (Fremework)
    ejs (Motor de plantillas)
    morgan (Modulo de peticiones)
    nodemon (Modulo)

    npm i express ejs morgan nodemon
3.- crear carpeta src
4.- crear archivo app.js dentro de src
5.- crear carpetas: views, controllers, routes dentro de src
6.- En app.js:
    requerir path,express,morgan en sus variables
    const express = require('express');
    const path = require('path');
    const morgan = require('morgan');

    - Inicializar express con const app
        const app = express();
    -En la parte de configuracion del servidor:
        -Debemos especificar el puerto por defecto o el de process
        -La carpeta de vistas y
        -El motor de plantilla:

        app.set('port', process.env.PORT || 3000);
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'ejs');
    -En la parte de middleware tenemos que poner:
        -Que la aplicacion use morgan con la opcion 'dev'
        -que la aplicacion use una extension de express de urlencoded con extension falsa

        app.use(morgan('dev'));
        app.use(express.urlencoded({ extended: false }));
7.- Crear archivo 
    entrien.routes.js en routes

8.- En app.js
    enrutar rutas 
    app.use(require('./routes/entries.routes'));

9.- En entries.routes.js:
    requerimos express y lo guardamos en una contante objeto con nombre Router:
        const { Router } = require('express');
    asignamos una variable minuscula de lo anterior y lo igualamos a lo anterior:
        const router = Router();
    Exportamos la variable:
        module.exports = router;

10.- En app.js
    en la parte de 404 handlers:
    hacer que la aplicacion cree una excepcion de 404 nor found
    app.use((req,res)=>{res.status(404).send('404 not found')});

    - Hacer en la parte de starting que escuche al puerto:
    app.listen(app.get('port'),()=>{console.log('Escuchando al puerto: ',app.get('port'))});
    
11.- Crear archivo en views:
    index.ejs
    404.ejs
    new-entry.ejs
    carpeta partials

12.- Crear archivos dentro de partials
    header.ejs
    footer.ejs
13.- En archivo 404.ejs:
    Poner h1 para denotar que no fue encontrado
14.- En app.js en la parte de 404, poner en ves de .run, poner .render y el nombre de 404 (.ejs)
    res.status(404).render('404');

15.- Dentro de la carpeta controllers crear archivo:
    entries.controller.js

    - Dentro del archivo, crear 3 constantes:
        const renderIndex = (req, res) => { };      //Almacema funcion para renderizar un formulario index
        const renderNewEntry = (req, res) => { };    //Mostrar formulario para tipear info
        const createNewEntry = (req, res) => { };   //Guardar los datos ingresados

    Exportar los metodos:
        module.exports = {
            renderIndex,
            renderNewEntry,
            createNewEntry
        }
16.- En entries.routes.js:
    importar los metodos que exportamos anteriormente, usando destructuracion:
    const { renderIndex,renderNewEntry,createNewEntry } = require('../controllers/entries.controller');

17.- En entries.routes.js:
    router.get('/',renderIndex);
    router.get('/new-entry',renderNewEntry);
    router.post('/new-entry',createNewEntry);

18.- En entries.controller.js:
    renderizar en respuesta el index (página principal):
        res.render('index');
19.- Poner un h1 de testeo en index:
    <h1> h1 de testeo XD </h1>
20.- En header.ejs:
    escribir html:5
    importar bootstrap desde internet
    
    crear un link <a> que direccione a / y otro a new entry con clase button
        <a href="/">Inicio de proyecto Express</a>
        <a href="/new-entry" class="btn btn-primary pull-right">Escribe una nueva tarea</a>

    TODO SIN ETIQUETAS CERRADAS DE HTML NI BODY

21.- En footer PONER ETIQUETAS DE CIERRE SOLAMENTE:
        </body>
    </html>
22.- En index, cargar parcial header con etiquetas de ejs en la parte superior:
    <%- include('partials/header') %>
    y en la parte superior podemos importar el footer:
    <%- include('partials/footer') %>
23.- En header poner en h1:
        class="p-2"
    y en vez de pull-right en el segundo link, poner
        float-right

SIGAMOS CON EL BOTON DEL FORMULARIO:
24.- En entries.controller.js, escribir el renderizado de new entry:
    res.render('new-entry')
25.- Poner h1 de prueba en new.entry.ejs:
    <h1>New entry</h1>
26.- En new-entry.ejs poner etiquetas de requerir:
    <%- include('partials/header') %>
    <h1>New entry</h1>
    <%- include('partials/footer') %>
27.- Borrar h1 y poner:     Para centrar todo lo que este adentro de ello 
    <div class="col-md-8 offset-md-2">
        <h2 class="text-center">Escribe una nueva tarea</h2>
    </div>
28.- Crear un formulario con el metodo de envio post
        <form method="post">

        </form>
29.- dentro de lo anterior crear:
    .form-group     :
    <form method="post">
        <div class="form-group">

        </div>
    </form>
30.- Dentro de lo anterior crear un label con titulo "title" y un input de tipo texto,
    nombre title, id title, clase form-control y un placeholder:
        <label for="title">Titulo</label>
        <input type="text" name="title" id="title" class="form-control" placeholder="Nueva tarea">
31.- crear nuevo form-group con un label adentro:referencie a body y un textarea:con nombre body, id body, sin filas, solo 3 columnas, y en clase poner form-control y que sea requerido:
    <div class="form-group">
        lo anteriorote
    </div>
    <div class="form-group">
        <!-- lo de ahora --> 
        <label for="body">Descripcion</label>
        <textarea name="body" id="body" rows="3" class="form-control" required></textarea>
    </div>
32.- Crear otro nuevo form-group que tenga adentro un input de tipo submit con valor "Agregar", con clase btn btn-primary:
    <div class="form-group">
        <input type="submit" value="Agregar" class="btn btn-primary">
    </div>

33.- En el formulario principal poner:
    method="post" action="/new-entry"
34.- En entries.controller.js, en el metodo create poner:
    console.log(req.body);
    res.send('Recibido');
35.- Crear una contante  llamada entradas inicializada como arreglo:
    const entradas = [];
36.- En createNewEntry, crear una constante de nueva entrada de tipo objeto con elementos:
    title:, content:, published:
    const nuevaEntrada = {
        title: req.body.title,
        content: req.body.body,
        publish: newDate()
    };
37.- Insertar en el arreglo creado anteriormente la variable anterior:
    entrada.push(nuevaEntrada);
38.- Redireccionar a la pag principal:
    res.redirect('/');
39.- En renderIndex mandarle aparte el objeto que es el arreglo de tarea:
    res.render('index', { entrada });
40.- crear condicional en index.ejs con sintaxis de ejs:
    <% if(entrada.length){%>
    <% }else{ %>
        <p>No hay tareas
        <a href="/new-entry">Agrega una</a></p>
    <% } %>
41.- En caso de haber tareas, en la primera comparacion, hacer cosas por cada uno: 
    <% entrada.forEach(function (entry) { %>

    <% }) %>