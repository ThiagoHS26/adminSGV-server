import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Ventas } from './Ventas'
import { Categoria } from "./Categoria";

@Entity()
export class Articulo{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    codigo:string;

    @Column()
    nombre:string;

    @Column()
    precio_compra:number;

    @Column()
    precio_venta:number;

    @Column()
    stock:number;

    //Relacion 1-M con Categoria
    @ManyToOne(()=>Categoria,(categoria)=>categoria.articulos,{
        eager:true,
        cascade:true
    })
    categoria:Categoria
    /*-------------------------------------------------------- */
    //Relacion 1 - N con Ventas
    @OneToMany(()=>Ventas,(venta)=>venta.articulo)
    ventas:Ventas[]

}
