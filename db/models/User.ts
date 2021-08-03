import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity({ name: "user" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    userName: string;

    @Column()
    password: string;

}
