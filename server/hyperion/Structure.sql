CREATE TABLE IF NOT EXISTS mobydex(
    Serial_Number INT AUTO_INCREMENT UNIQUE,
    Mobydex VARCHAR(45) PRIMARY KEY,
    Moby_Name VARCHAR(45),
    Moby_Pass VARCHAR(45),
    Moby_Type VARCHAR(25),
    Moby_Hash VARCHAR(255),
    Moby_Salt VARCHAR(255),
    Authority VARCHAR(25),
    Allowed VARCHAR(25),
    Last_IP VARCHAR(45),
    Registration_Date DATETIME,
    Registered_By DATETIME,
    Last_Login DATETIME,
    Login_Status VARCHAR(50),
    Mobydex_Status VARCHAR(255),
    Banned Boolean
);


CREATE TABLE IF NOT EXISTS banned_ips (
    Serial_Number INT AUTO_INCREMENT PRIMARY KEY,
    IP_Address VARCHAR(45) NOT NULL,
    Reason TEXT,
    Banned_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Banned_By VARCHAR(100),
    Unbanned TINYINT(1) DEFAULT 0,
    Unbanned_At TIMESTAMP,
    Unbanned_By VARCHAR(100)
);

CREATE INDEX idx_IP_Address ON banned_ips (IP_Address);


CREATE TABLE IF NOT EXISTS logindex (
    Serial_Number INT AUTO_INCREMENT UNIQUE,
    Mobydex VARCHAR(45) PRIMARY KEY,
    Last_IP_Change DATETIME NOT NULL,
    Last_IP VARCHAR(45) NOT NULL,
    Second_IP_Change DATETIME NOT NULL,
    Second_IP VARCHAR(45) NOT NULL,
    First_IP_Change DATETIME NOT NULL,
    First_IP VARCHAR(45) NOT NULL,
    Banned_IP_Change DATETIME NOT NULL,
    Banned_IP VARCHAR(45) NOT NULL,
    Last_Activity DATETIME NOT NULL,
    Last_Active_Time DATETIME NOT NULL,
    Session_ID VARCHAR(100) NOT NULL
);











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
CREATE TABLE IF NOT EXISTS moby_login (
  serial_number INT PRIMARY KEY AUTO_INCREMENT,
  mobydex VARCHAR(50) UNIQUE NOT NULL,
  login_barred BOOLEAN,
  current_attempt INT DEFAULT 0,
  last_login_attempt TIMESTAMP,
  last_login_attempt_ip VARCHAR(50),
  last_login_attempt_status VARCHAR(50),
  last_successful_login TIMESTAMP,
  last_failed_login TIMESTAMP,
  FOREIGN KEY (mobydex) REFERENCES moby_users(mobydex) ON DELETE CASCADE ON UPDATE CASCADE
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
