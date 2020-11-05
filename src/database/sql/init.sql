-- INIT SQL FOR DEVELOPMENT ONLY
-- ---------------------------------------------------------
CREATE TABLE starter_table (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP 
);
-- ---------------------------------------------------------

-- INSERT ONE FOR TESTING
INSERT INTO starter_table(username, password, email, created_at) VALUES('dummy', 'dummy_password', 'dummy_email', current_timestamp);