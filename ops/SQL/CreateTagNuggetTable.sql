create table "tag_nugget" (
    tag_id bigint,
    nugget_id bigint,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);
