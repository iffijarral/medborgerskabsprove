<?php

class Package
{
    private $id,
            $name,
            $duration,
            $numberOfTests,
            $price;


    public function __construct($id, $name, $duration, $numberOfTests, $price)
    {
        $this->setPackageID($id);
        $this->setName($name);
        $this->setDuration($duration);
        $this->setNumberOfTests($numberOfTests);
        $this->setPrice($price);
    }

    public function setPackageID($PackageID)
    {
        if(!empty($PackageID) && is_int($PackageID))
        {
            $this->id = $PackageID;
        } else
            throw new Exception('Please give a valid Package ID.');
    }

    public function setName($name)
    {
        if(!empty($name))
            $this->name = $name;
        else
            throw new Exception('Please give a valid Package Name.');
    }

    public function setDuration($duration)
    {
        if(is_int($duration) && !empty($duration))
            $this->duration = $duration;
        else
            throw new Exception('Please give a valid duration.');
    }

    public function setNumberOfTests($numberOfTests)
    {
        if(is_int($numberOfTests) && !empty($numberOfTests))
            $this->numberOfTests = $numberOfTests;
        else
            throw new Exception('Please give a valid number of tests.');
    }

    public function setPrice($price)
    {
        if(is_float($price) && !empty($price))
            $this->price = $price;
        else
            throw new Exception('Please give a valid price.');
    }

    public function getID()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getDuration()
    {
        return $this->duration;
    }

    public function getNumberOfTests()
    {
        return $this->numberOfTests;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function getPackage()
    {
        return array(
            'id' => $this->getID(),
            'name'  => $this->getName(),
            'duration'  => $this->getDuration(),
            'numberOfTests' => $this->getNumberOfTests(),
            'price' => $this->getPrice()
        );
    }

    /*public function update($fields = array(), $id = null)
    {

        if (!$this->_db->update('Packageucts', $id, $fields))
        {
            throw new Exception('Unable to update the Packageuct.');
        }
    }

    public function create($fields = array())
    {
        if (!$this->_db->insert('Packageucts', $fields))
        {
            throw new Exception("Unable to create the Packageuct.");
        }
    }

    public function deleteMe($id)
    {

        if (!$this->_db->delete('Packageucts', array('uid', '=', $id)))
        {
            throw new Exception('Unable to update the Packageuct.');
        }
    }*/
}
