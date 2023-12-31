import { Request, Response } from "express";
import { utils } from "../utils/utils";
import daoP from "../database/productoDatabase";
import fileUpload from "express-fileupload";
class ProductoController {
    //Método para listar todos los productos de la tabla tblProducto
    public async listar(req: Request, res: Response) {
        try {
            var productos = await daoP.listar();
            return res.json(productos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para listar del detalle de un producto en base a su id de producto
    public async listarByProductId(req: Request, res: Response) {
        try {
            var idProducto = parseInt(req.params.idProducto); // Convertir el idProducto de string a number

            var producto = await daoP.listarByProductId(idProducto);
            return res.json(producto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para listar del detalle de un producto en base a su id de producto
    public async listarDetalleByProductId(req: Request, res: Response) {
        try {
            var idProducto = parseInt(req.params.idProducto); // Convertir el idProducto de string a number

            var detalleProducto = await daoP.listarDetalleByProductId(idProducto);
            return res.json(detalleProducto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para listar todos los detalles de productos de la tabla tblDetalleProducto
    public async listarDetalleByProduct(req: Request, res: Response) {
        try {
            var productos = await daoP.listarDetalleByProduct();
            return res.json(productos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para listar las imagenes en base a su id de detalle del producto
    public async listarImagenByProductDetailId(req: Request, res: Response) {
        try {
            var idDetalleProducto = req.body.idDetalleProducto;

            var imagenProducto = await daoP.listarImagenByProductDetailId(idDetalleProducto);
            return res.json(imagenProducto);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para insertar productos de la tabla tblProducto
    public async insertar(req: Request, res: Response) {
        try {
            const token = <string>req.headers["auth"];
            const data = utils.getPayload(token);
            var producto = req.body
            var newProducto = {
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                idCategoria: producto.idCategoria,
                idRegistro: data.idUsuario
            }

            const result = await daoP.insertar(newProducto);

            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Producto registrado correctamente" });
            } else {
                return res.status(505).json({ mensaje: "Ocurrió un error" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para insertar el detalle de producto en la tabla tblDetalleProducto
    public async insertarDetalleProducto(req: Request, res: Response) {
        try {
            var { ...detalleProducto } = req.body;
            const result = await daoP.insertarDetalleProducto(detalleProducto)

            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Detalle del producto registrado correctamente" });
            } else {
                return res.status(505).json({ mensaje: "Ocurrió un error" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para insetar la imagenes del producto
    public async insertarImagenProducto(req: Request, res: Response) {
        try {
            var { ...imagenProducto } = req.body;
            const result = await daoP.insertarImagenProducto(imagenProducto);

            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Imagen del producto agregada correctamente" });
            } else {
                return res.status(505).json({ mensaje: "Ocurrió un error" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    public async subirArchivos(req: Request, res: Response) {
        try {
            const { idDetalleProducto } = req.params;
            const token = <string>req.headers["auth"];
            const data = utils.getPayload(token);

            const files = req.files;

            if (files && files.imagenes && Array.isArray(files.imagenes)) {
                for (let file of files.imagenes) {
                    file.mv(`./uploads/${idDetalleProducto}/${file.name}`);
                    let data = {
                        rutaImagen: file.name,
                        idDetalleProducto
                    }

                    await daoP.insertarData(data);
                }
                return res.json({ mensaje: "Imágenes registradas correctamente" });
            } else if (files && files.imagenes) {
                let file = <fileUpload.UploadedFile>files.imagenes;
                file.mv(`./uploads/${idDetalleProducto}/${file.name}`);

                let data = {
                    rutaImagen: file.name,
                    idDetalleProducto
                }

                await daoP.insertarData(data);

                return res.json({ mensaje: "Imágenes registrados correctamente" });
            } else {
                return res.status(500).json({ mensaje: "Ocurrió un error al guardar las imágenes" });

            }
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para actualizar productos de la tabla tblProducto
    public async actualizar(req: Request, res: Response) {
        try {
            const token = <string>req.headers["auth"];
            const data = utils.getPayload(token);
            var producto = req.body
            var updateProducto = {
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                idCategoria: producto.idCategoria,
                idRegistro: data.idUsuario
            }

            const result = await daoP.actualizar(updateProducto, producto.idProducto);
            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Producto actualizado correctamente" })
            } else {
                return res.status(500).json({ mensaje: "ocurrió un error" })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para actualizar el detalle de un productos de la tabla tblDetalleProducto
    public async actualizarDetalleProducto(req: Request, res: Response) {
        try {
            var { idDetalleProducto, ...detalleProducto } = req.body;
            const result = await daoP.actualizarDetalleProducto(detalleProducto, idDetalleProducto);
            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Detalle del producto actualizado correctamente" })
            } else {
                return res.status(500).json({ mensaje: "ocurrió un error" })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para actualizar la imagen del producto
    public async actualizarImagenProducto(req: Request, res: Response) {
        try {
            var { idImagen, ...imagenProducto } = req.body;
            const result = await daoP.actualizarImagenProducto(imagenProducto, idImagen)
            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Imagen del producto actualizada correctamente" })
            } else {
                return res.status(500).json({ mensaje: "ocurrió un error" })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para eliminar productos de la tabla tblProducto
    public async eliminar(req: Request, res: Response) {
        try {
            var idProducto: number = parseInt(req.params.idProducto);
            await daoP.eliminarDetalleByProductId(idProducto);
            const result = await daoP.eliminar(idProducto);
            if (result.affectedRows > 0) {
                return res.json({ mensaje: 'Producto eliminado correctamente' });
            } else {
                return res.status(500).json({ mensaje: 'Ocurrió un error' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para eliminar el detalle de producto de la tabla tblDetalleProducto
    public async eliminarDetalleProducto(req: Request, res: Response) {
        try {
            var idDetalleProducto: number = parseInt(req.params.idDetalleProducto);
            const result = await daoP.eliminarDetalleProducto(idDetalleProducto);
            if (result.affectedRows > 0) {
                return res.json({ mensaje: 'Detalle de producto eliminado correctamente' });
            } else {
                return res.status(500).json({ mensaje: 'Ocurrió un error' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para eliminar los detalles de producto de un producto que se va a eliminar
    public async eliminarDetalleByProductId(req: Request, res: Response) {
        try {
            var idProducto: number = parseInt(req.params.idProducto);
            const result = await daoP.eliminarDetalleByProductId(idProducto);
            if (result.affectedRows > 0) {
                return res.json({ mensaje: 'Detalle(s) del producto eliminado(s) correctamente' });
            } else {
                return res.status(500).json({ mensaje: 'Ocurrió un error' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para eliminar imagen de un producto
    public async eliminarImagenProducto(req: Request, res: Response) {
        try {
            var idImagen: number = parseInt(req.params.idImagen);
            const result = await daoP.eliminarImagenProducto(idImagen);
            if (result.affectedRows > 0) {
                return res.json({ mensaje: 'Imagen del producto eliminada correctamente' });
            } else {
                return res.status(500).json({ mensaje: 'Ocurrió un error' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }
}

export const productoController = new ProductoController();