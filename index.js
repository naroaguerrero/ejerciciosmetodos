const express = require("express");
const app = express();

const personas = require("./personas");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

//-------------------EJERCICIO 1---------------------
app.get("/personas", function (req, res) {
  res.send(personas);
});

//-------------------EJERCICIO 2---------------------
app.post("/personas", function (req, res) {
  personas.push({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: parseInt(req.body.edad),
  });

  res.send({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: parseInt(req.body.edad),
  });
});

//-------------------EJERCICIO 3---------------------
app.put("/personas", function (req, res) {
  let persona = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: parseInt(req.body.edad),
  };
  let found = false;
  for (let i = 0; i < personas.length && !found; i++) {
    if (personas[i].nombre === req.body.nombre) {
      found = true;
      personas[i].apellido = req.body.apellido;
      personas[i].edad = req.body.edad;
    }
  }
  found
    ? res.send({ mensaje: "Modificado correctamente" })
    : res.send({ mensaje: "Persona no encontrada" });
});

//-------------------EJERCICIO 4---------------------
app.delete("/personas", function (req, res) {
  let found = false;
  for (let i = 0; i < personas.length && !found; i++) {
    if (personas[i].nombre.includes(req.body.nombre)) {
      found = true;
      personas.splice(i, 1);
    }
  }

  found
    ? res.send({ mensaje: "Eliminado correctamente" })
    : res.send({ mensaje: "Persona no encontrada" });
});

app.listen(3000);