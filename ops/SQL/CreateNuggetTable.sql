create table nugget (
    nugget_id bigserial PRIMARY KEY,
    user_id bigint,
    content_markup_format varchar(255),
    content text,
    created_date timestamp NOT NULL DEFAULT now()
);
