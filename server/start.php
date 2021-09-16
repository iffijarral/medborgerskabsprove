<?php

define('APP_ROOT',  $_SERVER['DOCUMENT_ROOT'].'/server/');
define('BACKEND_AUTH',  'app/backend/auth/');
define('BACKEND_BASE', 'app/backend/');
define('FRONTEND_BASE', 'app/frontend/');
define('FRONTEND_PAGE', 'app/frontend/pages/');
define('FRONTEND_INCLUDE', 'app/frontend/includes/');
define('FRONTEND_INCLUDE_ERROR', 'app/frontend/includes/errors/');
define('FRONTEND_ASSET', 'app/frontend/assets/');

require_once 'app/backend/core/Init.php';