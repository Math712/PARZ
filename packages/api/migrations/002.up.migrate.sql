BEGIN;

--- 1. Create the trips_tmp table, with optimized data alignment
--- See: https://atlasgo.io/guides/postgres/ar-101

CREATE TABLE IF NOT EXISTS trips_tmp (
  distance     DOUBLE PRECISION NOT NULL,
  tip_amount   DOUBLE PRECISION NOT NULL,
  total_amount DOUBLE PRECISION NOT NULL,
  started_at   TIMESTAMPTZ      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ended_at     TIMESTAMPTZ      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id           SERIAL           NOT NULL,
  cab_type_id  SMALLINT         NOT NULL,
  has_dispute  BOOLEAN          NOT NULL
);

--- 2. Insert trips data into trips_tmp

INSERT INTO trips_tmp (distance, tip_amount, total_amount, started_at, ended_at, id, cab_type_id, has_dispute)
SELECT distance, tip_amount, total_amount, started_at, ended_at, id, cab_type_id,has_dispute FROM trips;

--- 3. Rename trips table to trips_old

ALTER TABLE trips RENAME TO trips_old;

--- 4. Rename trips_tmp table to trips

ALTER TABLE trips_tmp RENAME TO trips;

--- 5. Check that table size is less than or equal to the expected value
SELECT pg_size_pretty(pg_relation_size('trips_old')); -- 89 MB
SELECT pg_size_pretty(pg_relation_size('trips')); -- 73 MB

COMMIT;