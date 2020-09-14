//const entrada = [];
const entrada = require('../db/db.json');

//Almacema funcion para renderizar un formulario index
const renderIndex = (req, res) => {
    res.render('index', { entrada });
};

//Mostrar formulario para tipear info
const renderNewEntry = (req, res) => {
    res.render('new-entry');
};

//Guardar los datos ingresados
const createNewEntry = (req, res) => {

    const nuevaEntrada = {
        title: req.body.title,
        content: req.body.body,
        publish: new Date()
    };

    entrada.push(nuevaEntrada);

    res.redirect('/');
    /*console.log(req.body); //Mostrar elementos en consola local
    res.send('Recibido'); //Mandar mensaje en la web*/
};

module.exports = {
    renderIndex,
    renderNewEntry,
    createNewEntry
}