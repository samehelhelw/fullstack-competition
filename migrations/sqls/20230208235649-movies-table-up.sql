CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE movies (
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
name  VARCHAR(50) ,
relase_date DATE NOT NULL
);
