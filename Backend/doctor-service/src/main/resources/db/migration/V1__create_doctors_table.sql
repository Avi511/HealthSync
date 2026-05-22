CREATE TABLE doctors (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    specialization VARCHAR(255),
    hospital VARCHAR(255),
    experience INTEGER,
    phone VARCHAR(255),
    availability VARCHAR(255)
);
