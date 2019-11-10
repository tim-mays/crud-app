INSERT INTO company (
    company_name,
    website_uri,
    phone_number ,
    street_address,
    city,
    state,
    zip_code
) VALUES (
    'ACMY',
    'https://acmy.com',
    '8281235555',
    '987 Main St.',
    'Burnsville',
    'NC',
    '28714'
);

INSERT INTO person (
    company_id,
    first_name,
    last_name,
    email_address,
    street_address,
    city,
    state,
    zip_code
) VALUES (
    1,
    'John',
    'Smith',
    'fake1@aquent.com',
    '123 Any St.',
    'Asheville',
    'NC',
    '28801'
), (
    null,
    'Jane',
    'Smith',
    'fake2@aquent.com',
    '123 Any St.',
    'Asheville',
    'NC',
    '28801'
);
