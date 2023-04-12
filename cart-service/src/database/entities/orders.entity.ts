import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';
import { Carts } from './carts.entity';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    users: Users;

    @ManyToOne(() => Carts, (cart) => cart.id)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    carts: Carts;

    @Column({ type: 'json', nullable: false })
    payment: { type: string, address?: any, creditCard?: any, };

    @Column({ type: 'json', nullable: false })
    delivery: { type: string, address: any };

    @Column("varchar", { length: 100 , nullable: true })
    comments: string;

    @Column({ type: 'enum', enum: ['ORDERED', 'FULFILLED'], nullable: true })
    status: 'ORDERED' | 'FULFILLED';

    @Column({ type: 'integer', nullable: true })
    total: number;
}
