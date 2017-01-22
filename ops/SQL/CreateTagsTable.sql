create table "tag" (
    tag_id bigserial PRIMARY KEY,
    user_id bigint,
    tag_name text,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);
