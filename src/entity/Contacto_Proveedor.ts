import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Proveedor } from "./Proveedor";

@Entity()
export class Contacto_Proveedores{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    numero:string;

    @Column()
    operadora:string;

    @Column()
    email:string;

    //Relacion N - 1 con Proveedor
    @ManyToOne(()=>Proveedor,(prove)=>prove.contactosProv,{
        eager:true,
        cascade:true
    })
    prov:Proveedor
}