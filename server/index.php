<?php
    header('content-type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    require_once 'start.php';
    require_once 'router.php';

    get('/server/tests', 'server/'.FRONTEND_PAGE . 'tests.php');

    get('/server/tests/$id', 'server/'.FRONTEND_PAGE . 'tests.php');

    get('/server/packages', 'server/'.FRONTEND_PAGE . 'packages.php');

    post('/server/login', 'server/'.FRONTEND_PAGE . 'login.php');

    post('/server/register', 'server/'.FRONTEND_PAGE . 'register.php');

    post('/server/newPassword', 'server/'.FRONTEND_PAGE . 'newPassword.php');

    get('/server/resetPassword', 'server/'.FRONTEND_PAGE . 'resetPassword.php');

    post('/server/forgotPassword', 'server/'.FRONTEND_PAGE . 'forgotPassword.php');

    post('/server/changePassword', 'server/'.FRONTEND_PAGE . 'changePassword.php');

    post('/server/transaction', 'server/'.FRONTEND_PAGE . 'transaction.php');

    post('/server/payment', 'server/create.php');

    post('/server/statistics', 'server/'.FRONTEND_PAGE . 'statistics.php');

    any('/404','server/404.html');

