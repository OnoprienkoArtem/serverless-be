import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';
import { Carts } from './carts.entity';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Users)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user_id: string;

    @OneToOne(() => Carts)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart_id: string;

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
