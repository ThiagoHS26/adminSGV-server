import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Unique, OneToMany } from "typeorm";
import { Ventas } from "./Ventas";
import { Contacto_Clientes } from "./Contacto_Cliente";
import { IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['c_i'])
export class Clientes{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    c_i:string;

    @Column()
    nombres:string;

    @Column()
    apellidos:string;

    //Relacion M - N con Ventas
    @ManyToMany(()=>Ventas)
    @JoinTable()
    ventas:Ventas[]
    /*------------------------- */
    //Relacion 1 - N con Contacto
    @OneToMany(()=>Contacto_Clientes,(contacto)=>contacto.clientes)
    contactosCli:Contacto_Clientes[]
    /*------------------------------------------------------------- */

}