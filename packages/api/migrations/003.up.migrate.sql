BEGIN;

--- 1. Rename table cab_types to cabs

ALTER TABLE cab_types RENAME TO cabs;

--- 2. Rename cab_type_id column to cab_id in trips table

ALTER TABLE trips RENAME COLUMN cab_type_id TO cab_id;

--- 3. Define id as the primary key of the trips table

ALTER TABLE trips
ADD CONSTRAINT id PRIMARY KEY (id);

COMMIT;