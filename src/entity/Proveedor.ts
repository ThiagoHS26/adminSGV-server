import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, OneToMany } from "typeorm";
import { Compras } from "./Compras";
import { IsNotEmpty } from 'class-validator';
import { Contacto_Proveedores } from "./Contacto_Proveedor";

@Entity()
@Unique(['c_i'])

export class Proveedor{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    c_i:string;

    @Column()
    nombres:string;

    //Relacion N - 1 con Compras
    @ManyToOne(()=>Compras,(compra)=>compra.proveedor,{
        eager:true,
        cascade:true
    })
    compras:Compras
    /*----------------------------------------------- */
    //Relacion 1 - N con Contactos
    @OneToMany(()=>Contacto_Proveedores,(contact)=>contact.prov)
    contactosProv:Contacto_Proveedores[]
}