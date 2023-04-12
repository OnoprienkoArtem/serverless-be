import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Carts } from './carts.entity';

@Entity()
export class CartItems {
    @ManyToOne(() => Carts, (cart) => cart.id)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    carts: Carts;

    @Column({ type: 'uuid' })
    product_id: string;

    @Column({ type: 'int', nullable: true })
    count: number;
}
