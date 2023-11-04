CREATE TABLE users_inventory(
  id int PRIMARY KEY AUTO_INCREMENT,
  username varchar(15) UNIQUE NOT NULL,
  name varchar(50) NOT NULL,
  color varchar(10),
  password varchar(1000) NOT NULL,
  image varchar(200),
  birth_date DATE,
  gender varchar(6),
  constraint check_gender CHECK (gender in ('male', 'female'))
);

CREATE TABLE zones(
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  user_id int NOT NULL,
  image varchar(200),
  color varchar(10),
  notes varchar(200),
  constraint uq_zones_name_user unique (name, user_id),
  constraint fk_zones_user foreign key (user_id) references users_inventory(id)
);

CREATE TABLE products(
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  image varchar(200),
  color varchar(10),
  amount int DEFAULT 0,
  expiration_date DATE,
  price int,
  notes varchar(200),
  user_id int NOT NULL,
  zone_id int NOT NULL,
  constraint uq_products_name_user_zone unique (name, zone_id, user_id),
  constraint fk_products_users foreign key (user_id) references users_inventory(id),
  constraint fk_products_zones foreign key (zone_id) references zones(id)
);