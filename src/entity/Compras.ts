import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Articulo } from "./Articulo";
import { Proveedor } from "./Proveedor";
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Compras {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    descripcion:string;

    @Column()
    precio:number;

    //Relacion M - N con Articulos
    @ManyToMany(()=>Articulo)
    @JoinTable()
    articulos:Articulo[]
    /*----------------------------------- */
    //Relacion 1 - N con Proveedor
    @OneToMany(()=>Proveedor,(prove)=>prove.compras)
    proveedor:Proveedor[]

}