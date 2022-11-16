const express = require("express");
const router = express.Router();
const { removeListener } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//importar modelo
const Product = require("../models/product.model");

//router.get("ruta",() => {})
router.get("/get-products", (req, res) => {
  res.status(200).json({ data: [] });
});

//crear producto
router.post("/create-product", async (req, res) => {
  //con el async volvemos asincronica la funcion

  const newProduct = new Product(req.body); //el req.body me trae el modelo que se creo en el product.model Schema
  await newProduct.save(); //se guarda el registro de lo que el usuario haya llenado en la base de datos el await es para que la api espere hasta que
  //se guarde para seguir adelante con el resto de procesdimientos, si no se hace de esta manera da un error

  return res.status(201).json({ msg: "Producto guardado exitosamente" });
});

//Eliminar producto
router.delete("/delete-product", async (req, res) => {
  console.log(req.query.id);
  await Product.findByIdAndDelete(req.query.id); //la funcion findByIdAndDelete nos busca el id que le pasemos y lo borra id pasara a ser la variable
  //declarada despues del ?en el insomnia osea ?id=le pasamos el id que queremos eliminar
  return res.status(200).json({ msg: "producto eliminado", id: req.query.id });
});
//Actulizar un producto
router.put("/update-product", async (req, res) => {
  await Product.findByIdAndUpdate(req.query.id, { $set: req.body });
  return res.status(200).json({ msg: "Producto actualizado" });
});

//Listar productos
router.get("/get-all-products", async (req, res) => {
  const products = await Product.find(/* query - consulta- filtros*/); //modelo.find me trae todos los elementos guardados en la base de datos
  return res.status(200).json({ data: products });
});

//USUARIOS
//ingresar
router.post("/singup", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const userPass = await User.findOne({ password });
  if (!email || !password) return res.status(401).send("Rellene los campos");
  if (!user) return res.status(401).send("El correo no existe");
  if (!userPass) return res.status(401).send("Contraseña incorrecta");

  const token = jwt.sign({ _id: user._id }, "secretkey");

  return res.status(200).json(token);
});

//exportar las rutas
module.exports = router;

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Accion no permitida para este usuario");
  }
  const token = req.headers.authorization.split(" ");
  if (token === "null") {
    return res.status(401).send("Accion no permitida para este usuario");
  }

  const payload = jwt.verify(token, "secretkey");
  req.userId = payload._id;
  next();
}
