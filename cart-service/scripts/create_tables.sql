CREATE type cart_status as enum ('OPEN', 'ORDERED');
CREATE type order_status as enum ('ORDERED', 'FULFILLED');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table users (
	id uuid not null default uuid_generate_v4() primary key,
	name text not null,
	email text not null,
	password text not null
);

create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null references users(id),
	created_at date not null,
	updated_at date not null,
	status cart_status
);

create table cart_items (
	cart_id uuid not null references carts(id),
	product_id uuid,
	count integer
);

create table orders (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null references users(id),
	cart_id uuid not null references carts(id),
	payment json not null,
	delivery json not null,
	comments varchar(100),
	status order_status,
	total integer
);


