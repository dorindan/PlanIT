create table user_event(
    id              int primary key,
    event_id        int references event(id),
    user_id         int references users(id)
);