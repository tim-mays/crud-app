CREATE TABLE company (
    company_id integer IDENTITY,
    company_name varchar(50) NOT NULL,
    website_uri varchar(50) NOT NULL,
    phone_number varchar(10) NOT NULL,
    street_address varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(2) NOT NULL,
    zip_code varchar(5) NOT NULL
);

CREATE TABLE person (
    person_id integer IDENTITY,
    company_id integer,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email_address varchar(50) NOT NULL,
    street_address varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(2) NOT NULL,
    zip_code varchar(5) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(company_id)
);
