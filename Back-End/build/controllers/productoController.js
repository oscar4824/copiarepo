"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoController = void 0;
const utils_1 = require("../utils/utils");
const productoDatabase_1 = __importDefault(require("../database/productoDatabase"));
class ProductoController {
    //Método para listar todos los productos de la tabla tblProducto
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var productos = yield productoDatabase_1.default.listar();
                return res.json(productos);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    listarDetalleByProductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var idProducto = req.body.idProducto;
                var detalleProducto = yield productoDatabase_1.default.listarDetalleByProductId(idProducto);
                return res.json(detalleProducto);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Método para insertar productos de la tabla tblProducto
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const data = utils_1.utils.getPayload(token);
                var producto = req.body;
                var newProducto = {
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    idCategoria: producto.idCategoria,
                    idRegistro: data.idUsuario
                };
                const result = yield productoDatabase_1.default.insertar(newProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Producto registrado correctamente" });
                }
                else {
                    return res.status(505).json({ mensaje: "Ocurrió un error" });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Método para insertar el detalle de producto en la tabla tblDetalleProducto
    insertarDetalleProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var detalleProducto = __rest(req.body, []);
                const result = yield productoDatabase_1.default.insertarDetalleProducto(detalleProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Detalle del producto registrado correctamente" });
                }
                else {
                    return res.status(505).json({ mensaje: "Ocurrió un error" });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Método para actualizar productos de la tabla tblProducto
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const data = utils_1.utils.getPayload(token);
                var producto = req.body;
                var updateProducto = {
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    idCategoria: producto.idCategoria,
                    idRegistro: data.idUsuario
                };
                const result = yield productoDatabase_1.default.actualizar(updateProducto, producto.idProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Producto actualizado correctamente" });
                }
                else {
                    return res.status(500).json({ mensaje: "ocurrió un error" });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Método para actualizar el detalle de un productos de la tabla tblDetalleProducto
    actualizarDetalleProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var _a = req.body, { idDetalleProducto } = _a, detalleProducto = __rest(_a, ["idDetalleProducto"]);
                const result = yield productoDatabase_1.default.actualizarDetalleProducto(detalleProducto, idDetalleProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Detalle del producto actualizado correctamente" });
                }
                else {
                    return res.status(500).json({ mensaje: "ocurrió un error" });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Método para eliminar productos de la tabla tblProducto
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var idProducto = parseInt(req.params.idProducto);
                yield productoDatabase_1.default.eliminarDetalleByProductId(idProducto);
                const result = yield productoDatabase_1.default.eliminar(idProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: 'Producto eliminado correctamente' });
                }
                else {
                    return res.status(500).json({ mensaje: 'Ocurrió un error' });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Método para eliminar el detalle de producto de la tabla tblDetalleProducto
    eliminarDetalleProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var idDetalleProducto = parseInt(req.params.idDetalleProducto);
                const result = yield productoDatabase_1.default.eliminarDetalleProducto(idDetalleProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: 'Detalle de producto eliminado correctamente' });
                }
                else {
                    return res.status(500).json({ mensaje: 'Ocurrió un error' });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Método para eliminar los detalles de producto de un producto que se va a eliminar
    eliminarDetalleByProductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var idProducto = parseInt(req.params.idProducto);
                const result = yield productoDatabase_1.default.eliminarDetalleByProductId(idProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: 'Detalle(s) del producto eliminado(s) correctamente' });
                }
                else {
                    return res.status(500).json({ mensaje: 'Ocurrió un error' });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
}
exports.productoController = new ProductoController();
