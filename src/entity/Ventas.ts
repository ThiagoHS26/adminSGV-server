import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Articulo } from "./Articulo";
import { Usuario } from "./Usuario";

@Entity()
export class Ventas {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    descripcion:string;

    @Column()
    precio:number;

    //Relacion N - 1 con Articulos
    @ManyToOne(()=>Articulo,(articulo)=>articulo.ventas,{
        eager:true,
        cascade:true
    })
    articulo:Articulo
    /*-------------------------------------------------- */
    //Relacion N - 1 con Usuario
    @ManyToOne(()=>Usuario,(user)=>user.ventas)
    user:Usuario
    /*-------------------------------------------------- */
    //Relacion M - N con Clientes
    

}