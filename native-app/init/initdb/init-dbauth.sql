USE wi_auth;
INSERT IGNORE INTO company(name, description, createdAt, updatedAt) values('I2G','I2G',NOW(),NOW());
INSERT INTO user(username, password, status, role, fullname, createdAt, updatedAt, idCompany) values('i2glocal','c4ca4238a0b923820dcc509a6f75849b', 'Active', 1, 'I2G', NOW(),NOW(), 1);