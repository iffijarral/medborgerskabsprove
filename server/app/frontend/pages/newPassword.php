<?php
    /*
        This file handles user's request to change the password.
        This is when user just wants to change password after successful login, not because he forgets but he wants new.
        Here his old password is verified first. If its valid then new password is set.
    */
    $json = file_get_contents('php://input');

    $obj = json_decode($json);

    $response = array();

    if(isset($obj))
    {
        $fields = array(
            'password' => md5($obj->oldPassword),
            'email' => $obj->email
        );

        try
        {
            $userOperations = new UserOperations();

            if($userOperations->getUserWithEmailAndPassword($fields))
            {
                $newFields = array(
                    'password' => md5($obj->newPassword),
                    'id' => $obj->userID
                );

                $userOperations->updatePassword($newFields); // if transaction fails, an exception will occured, which is catched in catch section
                $response['message'] = 'Password Changed Successfully';
                $response['status'] = true;
            }
            else
            {
                $response['message'] = 'Old password is wrong';
                $response['status'] = false;
            }

        }
        catch (\Throwable $th)
        {
            $error = $th->getMessage();
            if($error === 'Invalid credentials')
                $response['message'] = 'Old password is wrong';
            else
                $response['message'] = $error;
            $response['status'] = false;
        }

    }
    else
    {
        $response['message'] = 'Bad Request. Missing data from client side';
        $response['status'] = false;
    }

    echo json_encode($response);