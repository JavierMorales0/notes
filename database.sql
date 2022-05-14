/*
 USING POSTGRESQL
 */
/*
 CREATE DATABASE OR USE NOTES
 */
CREATE DATABASE notes WITH ENCODING='UTF8';

/*
 CREATE TABLE NOTES
 */
CREATE TABLE note(
    id SMALLSERIAL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_important BOOLEAN NOT NULL,
    is_private BOOLEAN NOT NULL,
    pass VARCHAR(255) DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

/*
    CREATE THE FUNCTION TO AUTOMATICALLY UPDATE THE UPDATED_AT FIELD 
*/
CREATE OR REPLACE FUNCTION trigger_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/*
    SETING THE TRIGGER EVERY TIME A ROW IS UPDATED
*/
CREATE TRIGGER set_timestamp BEFORE UPDATE ON note FOR EACH ROW EXECUTE PROCEDURE trigger_updated_at();

/*
    INSERT TWO NOTES INTO THE TABLE
*/
INSERT INTO note (title, content, is_important, is_private, pass) VALUES ('Champions final', 'The champions final is coming soon', true, false,  '');
INSERT INTO note (title, content, is_important, is_private, pass) VALUES ('Daniela´s Birthday', 'Her birthday is on the 22th of December.', true, true,  '1234');