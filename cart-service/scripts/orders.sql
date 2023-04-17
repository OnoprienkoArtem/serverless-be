insert into orders (user_id, cart_id, payment, delivery, comments, status, total) values (
    '7521c91b-b75e-4c09-9a0d-aaa8a78a35dc',
    'ae7e8d56-e632-4778-ac87-384419fa73f0',
    '{ "type": "cash", "address": "address_1", "creditCard": "1111" }',
    '{ "type": "courier", "address": "address 1" }',
    'some comment 1',
    'ORDERED',
    2
);

insert into orders (user_id, cart_id, payment, delivery, comments, status, total) values (
    '851e9559-def3-4a0c-befb-d1388122deff',
    '14acf919-737e-4329-b141-47af91691713',
    '{ "type": "cash", "address": "address_2", "creditCard": "2222" }',
    '{ "type": "courier", "address": "address 2" }',
    'some comment 2',
    'ORDERED',
    3
);

insert into orders (user_id, cart_id, payment, delivery, comments, status, total) values (
    '78bdc54c-2e53-4b65-a3e6-6966fc77cd0e',
    '3336e94c-70fe-4003-8bfa-95f1d7465ad5',
    '{ "type": "cash", "address": "address_3", "creditCard": "3333" }',
    '{ "type": "courier", "address": "address 3" }',
    'some comment 3',
    'FULFILLED',
    7
);
