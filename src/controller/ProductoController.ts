import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Articulo } from "../entity/Articulo";
import { validate } from "class-validator";
import { Categoria } from "../entity/Categoria";
//import { Categoria } from "../entity/Categoria";

class ProductoController {

    //Traer todos los productos
    static getAll = async (req:Request,res:Response)=>{
        const productoRepository = getRepository(Articulo);

        try {
            const productos = await productoRepository.find();
            res.send(productos);
        } catch (e) {
            res.status(404).json({
                message:'No existen resultados'
            });
        }
    };

    //Traer un producto
    static getById = async(req:Request, res:Response)=>{
        //desestructurar para traer id
        const {id} = req.params;
        ////////////////////////////////
        const productoRepository = getRepository(Articulo);

        try {
            const producto = await productoRepository.findOneOrFail(id);
            res.send(producto);
        } catch (e) {
            res.status(404).json({
                message:'No existen resultados'
            });
        }
    };

    //Crear nuevo producto
    static newProducto = async(req:Request, res:Response)=>{
        //desestructurar para traer datos
        const {id} = req.params;
        const {codigo, nombre,descripcion, precio_compra, precio_venta, stock} = req.body;
        
        //Mapear clave foranea con categoria
        const categoriaRepository = getRepository(Categoria);
        const categoria = await categoriaRepository.findOneOrFail(id);
        //Control si existe o no la clave foranea
        if(!categoria){
            return res.json({
                message:'No existe la categoría'
            });
        }
        ////////////////////////////////////////////////////////////////
        const producto = new Articulo();
        producto.codigo = codigo;
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio_compra = precio_compra;
        producto.precio_venta = precio_venta;
        producto.stock = stock;
        producto.categoria = categoria;

        const productoRepository = getRepository(Articulo);

        try {
            await productoRepository.save(producto);
        } catch (e) {
            return res.status(400).json({
                message:'El artículo ya existe'
            });
        }
        res.send('Artículo agregado');
    };

    //Editar producto
    static editProducto = async(req:Request, res:Response)=>{
        let producto;
        const {id} = req.params;
        const {codigo, nombre, descripcion, precio_compra,precio_venta,stock} = req.body;

        const categoriaRepository = getRepository(Categoria);
        const categoria = await categoriaRepository.findOneOrFail(id);

        if(!categoria){
            return res.json({
                message:'No existe la categoría'
            });
        }

        const productoRepository = getRepository(Articulo);//clase Articulo

        try {
            producto = await productoRepository.findOneOrFail(id);

        } catch (e) {
            return res.status(404).json({
                message: 'Categoria no encontrado'
            });
        }

        producto.codigo = codigo;
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio_compra = precio_compra;
        producto.precio_venta = precio_venta;
        producto.stock = stock;
        producto.categoria = categoria;
        //clave foranea con categoria
        
        const errors = await validate(producto,{
            validateError:{target:false, value:false}//Los errores no se muestran por seguridad
        });
        
        if(errors.length > 0){
            res.status(400).json({errors});
        }

        try {
            await productoRepository.save(producto);
        } catch (e) {
            return res.status(409).json({message: 'El artículo ya existe'});
        }

        res.status(201).json({message: 'Artículo actualizado'});
    };

    //Eliminar categoria
    static deleteProducto = async (req:Request, res:Response)=>{

        const {id} = req.params;
        const productoRepository = getRepository(Articulo);
        let producto : Articulo;

        try {
            producto = await productoRepository.findOneOrFail(id);
        } catch (e) {
            res.status(404).json({
                message:'Artículo no encontrado'
            });
        }

        productoRepository.delete(id);
        res.status(201).json({
            message:'Artículo eliminado'
        });

    };

}
 export default ProductoController;
