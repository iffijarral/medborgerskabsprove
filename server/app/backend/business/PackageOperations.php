<?php
    /*
        This file handles different operations related to packages.
    */
class PackageOperations{
    private $_db;

    public function __construct()
    {
        $this->_db = Database::getInstance();
    }

    public function getPackages()
    {
        $sql = "SELECT * from packages";

        $results = $this->_db->Select($sql);

        if(empty($results)) {
            throw new Exception('No package data found');
        }

        $packagesList = array();

        foreach($results as $result)
        {
            $package = new Package(
               (int)$result['id'],
               $result['name'],
               (int)$result['duration'],
               (int)$result['numberoftests'],
               (float)$result['price']
            );

            array_push($packagesList, $package->getPackage());
        }

        return $packagesList;
    }


    public function getPackage($packageID)
    {
        $sql = "SELECT * FROM packages p WHERE p.id = :packageID " ;

        $params = array(
            'packageID' => $packageID
        );

        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {
            throw new Exception('Invalid test ID');
        }

        $package = new Package(
            (int)$results[0]['id'],
            $results[0]['name'],
            (int)$results[0]['duration'],
            (int)$results[0]['numberoftests'],
            (float)$results[0]['price']
        );

        return $package;
    }

    public function getTotalUserTests($userID)
    {
        $sql = "SELECT * FROM packages p
                      LEFT JOIN userpackage up
                      ON p.id = up.packageid
                      WHERE up.userid = :userID
                      ORDER BY up.created DESC
                      LIMIT 1";

        $params = array(
            'userID' => $userID
        );

        $results = $this->_db->Select($sql, $params);

        if(empty($results)) {
            return false;
        }
        else
            return $results;

    }

    public function saveUserPackage($obj)
    {
        $packageData = array(

            'userid'	=> $obj->userid,

            'packageid'	=> $obj->packageid,

            'created'	=> date("Y-m-d H:i:s"),

            'modified'	=> date("Y-m-d H:i:s")

        );

        $statement = "INSERT INTO userpackage (userid, packageid, created, modified)
                    VALUES (:userid, :packageid, :created, :modified)";

        if (!$this->_db->insert($statement, $packageData))
        {
            throw new Exception("Unable to save userpackage.");
        }
        return true;
    }

}
