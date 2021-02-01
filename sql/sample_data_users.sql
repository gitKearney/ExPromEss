-- the password for the following users is "#!ABC123"
INSERT INTO users
(
    user_id, first_name, last_name,
    upassword,
    email, birthday, roles, active,
    created_at, updated_at
)
VALUES
(
    '12345678-1234-1234-1234-123456789000', 'Johnny', 'Adams',
    '$2a$10$baZyz2/429B/xNQJhmYRE./tV0Pic1X7TLIsek83ZdUDMASWa3j2K',
    'j.adams@example.com', '2001-01-11', 'create', 'yes',
    '2017-12-31', NULL
),
(
    '12345678-1234-1234-1234-123456789001', 'Tommy', 'Jefferson',
    '$2a$10$QnDEdADnojmoMkSxmpXqMeLq33Zq2LgvBPJ8nSZc8KbVQDKIUEEti',
    'tom.jefferson@example.com', '2001-04-13', 'edit', 'yes',
    '2015-12-31', NULL
),
(
    '12345678-1234-1234-1234-123456789002', 'G Dog', 'Washington',
    '$2a$10$Vzd5jribt1fVI5Vre2CoZ.WvkPyEKT57G5GKgZCMHg1yhyfUmVgUm',
    'g.w@example.com', '2001-12-14', 'read', 'yes',
    '2016-12-31', NULL
),
(
    '12345678-1234-1234-1234-123456789003', 'Aaron', 'Burr',
    '$2a$10$baZyz2/429B/xNQJhmYRE./tV0Pic1X7TLIsek83ZdUDMASWa3j2K',
    'aaron.burr@example.com', '2001-02-06', 'edit', 'yes',
    '2015-12-31', NULL
);