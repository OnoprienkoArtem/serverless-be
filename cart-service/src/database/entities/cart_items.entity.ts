import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carts } from './carts.entity';

@Entity()
export class CartItems {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @ManyToOne(() => Carts)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart_id: Carts;

    @Column({ type: 'int', nullable: true })
    count: number;
}
