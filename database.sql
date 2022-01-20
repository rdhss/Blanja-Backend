create table user (id int auto_increment primary key, user_id int, phone int, Name varchar(64), Email varchar(64), password int, pin int)

create table wallet (id_user int primary key, balance int);

create table transaction (id int primary key, id_sender int, receiver int, amount int);

insert into user (user_id, phone, Name, Email, password, pin) values 
(334, 082178, 'ridho', 'ridho@gmail.com', 123, 123)


insert into wallet (id_user, balance) values (334,1000000)