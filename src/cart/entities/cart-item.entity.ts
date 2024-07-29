import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('cart-item')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => CartEntity, ({ items }) => items)
  cart: CartEntity;
}
