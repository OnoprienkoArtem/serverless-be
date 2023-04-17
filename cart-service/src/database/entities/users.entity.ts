import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'string', nullable: false })
    name: string;

    @Column({ type: 'string', nullable: false })
    email: string;

    @Column({ type: 'string', nullable: false })
    password: string;
}
