create table "user" (
    user_id bigserial PRIMARY KEY,
    display_name varchar(255),
    login varchar(255) UNIQUE,
    password_salt integer,
    password_hash varchar(255),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);
