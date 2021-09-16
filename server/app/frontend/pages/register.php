<?php
    /*
        In this file new user is created.
        First given email is checked if it already exists in database.
        If yes, a message is sent to client saying that email already exists.
        If no, the user is created and required information is fetched from database and sent to client.
    */
    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();

    $userData = array(
        'name'  => $obj->name,
        'type'  => 'user',
        'email' => $obj->email,
        'password' => md5($obj->password),
        'pas' => $obj->password,
        'phone' => $obj->phone,
        'created' => date("Y-m-d H:i:s"),
        'modified' => date("Y-m-d H:i:s"),
        'status' => '0'
    );

    try
    {
        $userOperations = new UserOperations();

        if(!$userOperations->checkEmail($obj->email)) // It returns true if email exists
        {

            $lastInsertedID = $userOperations->create($userData);

            $user = $userOperations->getUser($lastInsertedID);

            $objUserTests = new UserTests($user, 0); //Because user is just created that's y 0

            $userInfo = $objUserTests->getUserInfo();

            $response['status'] = true;
            $response['user'] = $userInfo;
            $response['message'] = 'Account has been created.';

        }
        else
        {
            $response['status'] = false;
            $response['message'] = 'Email already exists.';
        }

   }
   catch (\Throwable $th)
   {
       $error = $th->getMessage();
       $response['message'] = $error;
       $response['status'] = false;
   }

    echo json_encode($response);