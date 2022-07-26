import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Clientes } from "./Cliente";

@Entity()
export class Contacto_Clientes{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    numero:string;

    @Column()
    operadora:string;

    @Column()
    email:string;

    //Relacion N - 1 con Cliente
    @ManyToOne(()=>Clientes,(cliente)=>cliente.contactosCli,{
        eager:true,
        cascade:true
    })
    clientes:Clientes

}