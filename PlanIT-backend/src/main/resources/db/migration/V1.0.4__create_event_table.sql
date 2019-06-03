create table event (
    id                  int primary key,
    sport               varchar(80),
    location            varchar(80),
    cost                varchar(80),
    date_and_hour       date,
    subscribed_persons  int,
    maximum_persons     int,
    description         varchar(250),
    owner               int references users(id)
);