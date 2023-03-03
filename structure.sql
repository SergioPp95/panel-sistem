DROP DATABASE IF EXISTS panelSistem;
CREATE DATABASE panelSistem;
USE panelSistem;

create table users (
    id smallint not null auto_increment,
    mail text unique not null,
    name text default null,
    last_name text default null,
    password text not null,
    picture text NOT NULL,
    is_admin smallint(2) default null,
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt timestamp NULL,
  primary key (id)
);