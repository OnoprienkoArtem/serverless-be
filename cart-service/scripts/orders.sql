insert into orders (user_id, cart_id, payment, delivery, comments, status, total) values (
    '56a98772-3732-4aac-a270-230ab941f17e',
    '4599de1e-5050-4b28-94c0-e408c31a6e01',
    '{ "type": "cash", "address": "address_1", "creditCard": "1111" }',
    '{ "type": "courier", "address": "address 1" }',
    'some comment 1',
    'ORDERED',
    2
);

insert into orders (user_id, cart_id, payment, delivery, comments, status, total) values (
    '779f7f21-1105-47a2-8211-286647b30a71',
    '7486258c-8ddd-41b0-a3f0-58628864d8cb',
    '{ "type": "cash", "address": "address_2", "creditCard": "2222" }',
    '{ "type": "courier", "address": "address 2" }',
    'some comment 2',
    'ORDERED',
    3
);

insert into orders (user_id, cart_id, payment, delivery, comments, status, total) values (
    '87f818ee-4994-446b-a0c2-03787c1ea827',
    'fb011059-2275-4b33-a08d-c0f55b319488',
    '{ "type": "cash", "address": "address_3", "creditCard": "3333" }',
    '{ "type": "courier", "address": "address 3" }',
    'some comment 3',
    'FULFILLED',
    7
);
