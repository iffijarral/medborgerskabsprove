<?php
    /*
        In this file user statistics (the history of his practice) is either saved or
        fetched from database and send to client.
        'action' decides what to do.
    */
    $json = file_get_contents('php://input');

    $obj = json_decode($json);

   if(isset($obj->action))
    {
        $action = $obj->action;

        if($action == 'save')
        {
            $data = array(
                'testid' => $obj->testID,
                'userid' => $obj->userID,
                'testdate'=> date("Y-m-d H:i:s"),
                'answers'=> $obj->rightAnswers
            );
            try
            {
                $userOperations = new UserOperations();

                $userOperations->saveStatistics($data);

                $response['status'] = true;
                $response['message'] = 'Statistics have been saved.';
            }
            catch (\Throwable $th)
            {
                $error = $th->getMessage();
                $response['message'] = $error;
                $response['status'] = false;
            }
        }
        else
        {
            $response['status'] = false;
            $response['message'] = 'Record can not be saved.';
        }
    }
    else
    {
        if(isset($obj->userID))
        {
            $userID = $obj->userID;

            $userOperations = new UserOperations();

            $data = $userOperations->getStatistics($userID);

            $response['status'] = true;
            $response['statistics'] = $data;
            $response['message'] = 'Statistics fetched successfully.';
        }
        else
        {
            $response['status'] = false;
            $response['message'] = 'Bad Request.';
        }

    }

    echo json_encode($response);