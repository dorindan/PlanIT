create table rooms (
    id              int primary key,
    room_name        varchar(80)
);

create table room_user(
    id              int primary key,
    room_id         int references rooms(id),
    user_id         int references users(id)
);

create table messages(
    id              int primary key,
    message         varchar(400),
    room_id         int references rooms(id)
);
