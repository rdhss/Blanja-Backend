-- CUSTOMER
insert into customer(id, name, password, email) values (1,"ridho", "ridho123","ridho@gmail.com" );
select * from customer;


-- SELLER
insert into seller(id, name, email, phone, storename, password) values (1
,"ridho", "ridho@gmail.com", 8211111, "ridhostore", "ridho123" );

-- PRODUCT
insert into product(namestore, Name, price, qty, category, photo1, photo2, photo3, photo4, conditions, description) values ('ridhostore', 'rihdo', 50, 5,
 'cap', 'test', 'test', 'test', 'test', 'new', 'topi ajaib');

 -- ADDRESS
insert into address(id, saveas, receiptname, receiptphone, address, postalcode, city) values (1, 'rumah', 'ridho',
81111, 'jl.haha', 89899, 'pekanbaru');

-- CATEGORY

