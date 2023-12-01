CREATE DATABASE moby_user;

USE moby_user;

-- Table: Moby_Users
CREATE TABLE IF NOT EXISTS moby_users (
  serial_number INT PRIMARY KEY AUTO_INCREMENT,
  mobydex VARCHAR(50) UNIQUE NOT NULL,
  moby_name VARCHAR(50),
  moby_type VARCHAR(50),
  moby_hash VARCHAR(255),
  moby_salt VARCHAR(255),
  mobydex_status VARCHAR(50),
  banned BOOLEAN DEFAULT FALSE,
  notes TEXT NULL
);

-- Table: Moby_Registration
CREATE TABLE IF NOT EXISTS moby_registration (
  serial_number INT PRIMARY KEY AUTO_INCREMENT,
  mobydex VARCHAR(50) UNIQUE NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  registered_by VARCHAR(50),
  registered_ip VARCHAR(50),
  deregistration_date TIMESTAMP,
  deregistered_by VARCHAR(50),
  deregistered_ip VARCHAR(50),
  FOREIGN KEY (mobydex) REFERENCES moby_users(mobydex) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: Moby_Login
CREATE TABLE moby_login (
  serial_number int NOT NULL AUTO_INCREMENT,
  mobydex varchar(50) NOT NULL,
  login_barred tinyint(1) DEFAULT NULL,
  current_attempt int DEFAULT '0',
  login_code varchar(45) DEFAULT NULL,
  last_login_attempt timestamp NULL DEFAULT NULL,
  last_login_attempt_ip varchar(50) DEFAULT NULL,
  last_login_attempt_status varchar(50) DEFAULT NULL,
  last_successful_login timestamp NULL DEFAULT NULL,
  last_failed_login timestamp NULL DEFAULT NULL,
  PRIMARY KEY (serial_number),
  UNIQUE KEY mobydex (mobydex),
  KEY idx_mobydex_login (mobydex),
  FOREIGN KEY (mobydex) REFERENCES moby_users (mobydex) ON DELETE CASCADE ON UPDATE CASCADE
); 

-- Table: Moby_Allowed
CREATE TABLE IF NOT EXISTS moby_allowed (
  serial_number INT PRIMARY KEY AUTO_INCREMENT,
  mobydex VARCHAR(50) NOT NULL,
  module VARCHAR(50),
  allowed_by VARCHAR(50),
  allowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mobydex) REFERENCES moby_users(mobydex) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: Moby_IP
CREATE TABLE IF NOT EXISTS moby_ip (
  serial_number INT PRIMARY KEY AUTO_INCREMENT,
  mobydex VARCHAR(50) NOT NULL,
  detected_banned_ip VARCHAR(50),
  last_ip VARCHAR(50),
  last_ip_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  before_last_ip VARCHAR(50),
  before_last_ip_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  country_hop_detected BOOLEAN,
  FOREIGN KEY (mobydex) REFERENCES moby_users(mobydex) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE INDEX idx_mobydex_registration ON moby_registration(mobydex);
CREATE INDEX idx_mobydex_login ON moby_login(mobydex);
CREATE INDEX idx_mobydex_allowed ON moby_allowed(mobydex);
CREATE INDEX idx_mobydex_ip ON moby_ip(mobydex);

CREATE DATABASE keiko_data;

USE keiko_data;

CREATE TABLE IF NOT EXISTS keiko_minor (
    serial_number INT PRIMARY KEY AUTO_INCREMENT,
    keikodex VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50),
    location VARCHAR(50),
    delivery BOOLEAN,
    rating DECIMAL(3, 1),
    offer_type TINYINT UNSIGNED,
    offer_text TEXT,
    img_card VARCHAR(255),
    img_spotlight VARCHAR(255),
    title_spotlight TEXT
);

INSERT INTO keiko_minor (keikodex, name, location, delivery, rating, offer_type, offer_text, img_card, img_spotlight, title_spotlight) 
VALUES
('202306-FOOD-1', 'Leesh Cafe', 'Nugegoda, Colombo', true, 4.5, 1, '25% off on selected food', '202306-FOOD-1-card', '202306-FOOD-1-spotlight', 'Enjoy the finest luxuries of a cafe...'),
('202306-FOOD-2', 'Tasty Bites', 'Mount Lavinia, Colombo', true, 4.2, 2, 'Buy one get one free on appetizers', '202306-FOOD-2-card', '202306-FOOD-2-spotlight', 'Savor the flavors that delight!'),
('202306-FOOD-3', 'Spice Fusion', 'Dehiwala-Mount Lavinia, Colombo', true, 4.7, 1, 'Free dessert with every main course', '202306-FOOD-3-card', '202306-FOOD-3-spotlight', 'A fusion of spices for your palate'),
('202306-FOOD-4', 'Ocean Delights', 'Wellawatte, Colombo', true, 4.0, 3, '15% off on seafood platters', '202306-FOOD-4-card', '202306-FOOD-4-spotlight', 'Dive into the freshness of the sea'),
('202306-FOOD-5', 'Green Garden Cafe', 'Battaramulla, Colombo', true, 4.4, 2, 'Free coffee refill with every breakfast order', '202306-FOOD-5-card', '202306-FOOD-5-spotlight', 'Where freshness meets relaxation'),
('202306-FOOD-6', 'Flavorsome Delights', 'Rajagiriya, Colombo', true, 4.6, 1, '20% off on all pasta dishes', '202306-FOOD-6-card', '202306-FOOD-6-spotlight', 'Indulge in flavorful experiences'),
('202306-FOOD-7', 'Sizzle House', 'Kollupitiya, Colombo', true, 4.3, 2, 'Free drink with every steak order', '202306-FOOD-7-card', '202306-FOOD-7-spotlight', 'Where steaks sizzle with perfection'),
('202306-FOOD-8', 'Mango Tree Bistro', 'Borella, Colombo', true, 4.8, 1, '10% off on all vegetarian meals', '202306-FOOD-8-card', '202306-FOOD-8-spotlight', 'A taste of nature’s goodness'),
('202306-FOOD-9', 'Spicy Bite', 'Kirulapana, Colombo', true, 4.1, 3, 'Free appetizer with every order over $30', '202306-FOOD-9-card', '202306-FOOD-9-spotlight', 'Ignite your taste buds'),
('202306-FOOD-10', 'Zenith Diner', 'Kotte, Colombo', true, 4.9, 1, 'Buy two desserts, get one free', '202306-FOOD-10-card', '202306-FOOD-10-spotlight', 'Elevating your dining experience'),
('202306-FOOD-11', 'Flourish Bakery', 'Pamankada, Colombo', true, 4.5, 2, 'Free pastry with every sandwich purchase', '202306-FOOD-11-card', '202306-FOOD-11-spotlight', 'Where freshness is baked into every bite');
