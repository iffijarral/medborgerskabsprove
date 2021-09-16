<?php
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

require APP_ROOT.'app/backend/core/Database.php';
require APP_ROOT.'app/backend/auth/config.php';
require APP_ROOT.'app/backend/core/Helpers.php';

require APP_ROOT.'app/backend/models/Test.php';
require APP_ROOT.'app/backend/models/Package.php';
require APP_ROOT.'app/backend/models/Question.php';
require APP_ROOT.'app/backend/models/User.php';

require APP_ROOT.'app/backend/business/TestOperations.php';
require APP_ROOT.'app/backend/business/UserOperations.php';
require APP_ROOT.'app/backend/business/PackageOperations.php';


require APP_ROOT.'app/backend/PHPMailer/src/Exception.php';
require APP_ROOT.'app/backend/PHPMailer/src/PHPMailer.php';
require APP_ROOT.'app/backend/PHPMailer/src/SMTP.php';