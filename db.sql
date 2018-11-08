CREATE TABLE results (
    id serial primary key,
    x double precision not null,
    y double precision not null,
    r double precision not null,
    checking boolean not null,
    sessionID varchar(100) not null
);