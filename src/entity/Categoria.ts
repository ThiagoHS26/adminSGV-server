import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Articulo } from "./Articulo";

@Entity()
export class Categoria{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    nombre:string;

    @Column()
    descripcion:string;

    //Relacion 1 to N con Articulos
    @OneToMany(()=>Articulo,(articulo)=>articulo.categoria)
    articulos: Articulo[]
    /*------------------------------------------------------ */
}