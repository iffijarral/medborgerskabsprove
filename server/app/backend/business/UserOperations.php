<?php

include BACKEND_BASE.'models/UserTests.php';
include BACKEND_BASE.'models/Statistics.php';

class UserOperations{
    private $_db;

    public function __construct()
    {
        $this->_db = Database::getInstance();
    }

    public function getUsers()
    {
        $sql = "SELECT * from users";

        $results = $this->_db->Select($sql);

        $usersList = array();

        foreach($results as $result)
        {

            array_push(
                $usersList,
                new User(
                    $result['id'],
                    $result['name'],
                    $result['email'],
                    $result['phone']
                )
            );
        }

        return $usersList;
    }
    public function getUserWithEmailAndPassword($fields = array())
    {
        $sql = "SELECT * FROM users
                WHERE email = :email
                AND password = :password
                ";

        $results = $this->_db->Select($sql, $fields);

        if(empty($results)) {
            throw new Exception('Wrong credentials');
        }

        if($results[0]['status']) {

            $packageOperations = new PackageOperations();

            $testData = $packageOperations->getTotalUserTests($results[0]['id']);

            $totalTests = $testData[0]['numberoftests'];


        } else {
            $totalTests = 0;
        }

        $user = new User($results[0]['id'], $results[0]['name'], $results[0]['email'], $results[0]['phone'], $results[0]['status']);

        $objUserTests = new UserTests($user, $totalTests);

        return $objUserTests->getuserInfo();
    }

    public function getUserPackageData($userID)
    {
        $sql = "SELECT u.id, u.name, u.email, u.phone, p.numberoftests
                FROM users u
                INNER JOIN userpackage up
                ON u.id = up.userid
                LEFT JOIN packages p on p.id = up.packageid
                WHERE u.id = :id";

        $params = array(
            'id'=> $userID
        );
        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {
            throw new Exception('UserPackageData could not be fetched');
        }

        $userInfo = array(
            'status'        => true,
            'id'            => $results[0]['id'],
            'email'         => $results[0]['email'],
            'totalTests'    => $results[0]['numberoftests']
        );

        return $userInfo;

    }
    public function checkEmail($email)
    {
        $sql = "SELECT * FROM users
        WHERE email = :email";


        $params = array(
            'email' => $email
        );

        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {

            return false;

        }

        return $results;
    }
    public function getUser($userID)
    {
        $sql = "SELECT * FROM users
        WHERE id = :id";


        $params = array(
            'id' => $userID
        );

        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {
            throw new Exception('Invalid user ID');
        }

        $user = new User($results[0]['id'], $results[0]['name'], $results[0]['email'], $results[0]['phone'], $results[0]['status']);

        return $user;
    }

    public function create($fields = array())
    {
        $statement = "INSERT INTO users (name, type, email, phone, password, pas, created, modified, status)
        VALUES (:name, :type, :email, :phone, :password, :pas, :created, :modified, :status)";

        $lastInsertedID = $this->_db->insert($statement, $fields);
        if (!$lastInsertedID)
        {
            throw new Exception("Unable to create the user.");
        }
        return $lastInsertedID;
    }
    public function updatePassword($fields)
    {

        $statement = "UPDATE users SET password=:password WHERE id=:id";
         try {

            $this->_db->update($statement, $fields);

         } catch(Throwable $e) {
            throw new Exception("Unable to update the password.");
         }
    }

    public function updateUserStatus($obj)
    {
        $userData = array(

            'id'        => $obj->userid,

            'status'	=> '1',

            'modified'	=> date("Y-m-d H:i:s")

        );

        $statement = "UPDATE users SET status=:status, modified=:modified WHERE id=:id";

         try {

            $this->_db->update($statement, $userData);

         } catch(Throwable $e) {
            throw new Exception("Unable to update user status.");
         }
    }
    public function saveToken($fields = array())
    {
        $statement = "INSERT INTO temp (userId, token) VALUES (:userId, :token)";
        if (!$this->_db->insert($statement, $fields))
        {
            throw new Exception("Unable to save token.");
        }
        return true;
    }

    public function deleteToken($userId)
    {
        try {

            if(!$this->_db->Remove("Delete from password-change-temp where userId = :userId",['userId' => $userID])) {
                throw new Exception('Unable to delete token');
            }
        } catch(Throwable $e) {
            throw new Exception('The token has already been used');
        }

    }
    public function deleteUser($userID)
    {

        try {
            if($this->_db->Remove("Delete from users where id = :id",['id' => $userID])) {

                return true;

            } else {
                return false;
            }

        } catch(Throwable $e) {
            throw new Exception($e->getMessage());
        }

    }

    public function getStatistics($userID)
    {
        $sql = "SELECT t.id as testID, t.title as testTitle, s.testdate, s.answers
                FROM statistics s
                LEFT JOIN tests t
                ON s.testid = t.id
                WHERE s.userid = :id";

        $params = array(
            'id' => $userID
        );

        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {
            throw new Exception('Invalid user ID, Statics record not found');
        }

        $statisticsList = array();

        foreach($results as $result)
        {
            $statistics = new Statistics($result);

            array_push($statisticsList, $statistics->getStatistics());
        }

        return $statisticsList;
    }

    public function saveStatistics($fields = array())
    {
        $statement = "INSERT INTO statistics(testid, userid, testdate, answers) 
                VALUES (:testid, :userid, :testdate, :answers)";

        if (!$this->_db->insert($statement, $fields))
        {
            throw new Exception("Unable to save statistics.");
        }
        return true;
    }
}
