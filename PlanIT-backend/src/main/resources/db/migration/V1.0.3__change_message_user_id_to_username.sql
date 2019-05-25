alter table messages
rename column user_id to username;

alter table messages
alter column username type varchar(255)


