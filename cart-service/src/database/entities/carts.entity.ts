import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { CartItems } from './cart_items.entity';

@Entity()
export class Carts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Users, (user) => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    users: Users;

    @Column({ type: 'date', nullable: false })
    created_at: string;

    @Column({ type: 'date', nullable: false })
    updated_at: string;

    @Column({ type: 'enum', enum: ['OPEN', 'ORDERED'], nullable: false })
    status: 'OPEN' | 'ORDERED';
}
