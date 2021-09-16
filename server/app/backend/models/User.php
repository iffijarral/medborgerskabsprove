<?php

class User
{
    private $id,
            $name,
            $email,
            $phone,
            $password,
            $status;

    public function __construct($id, $name, $email, $phone, $status)
    {
        $this->setID($id);
        $this->setName($name);
        $this->setEmail($email);
        $this->setPhone($phone);
        $this->setStatus($status);
    }
    public function setID($id)
    {
        if(!empty($id))
            $this->id = $id;
        else
            throw new Exception('Please give a valid user id.');
    }
    public function setName($name)
    {
        if(!empty($name))
            $this->name = $name;
        else
            throw new Exception('Please give a valid user name.');
    }
    public function setEmail($email)
    {
        if(!empty($email))
            $this->email = $email;
        else
            throw new Exception('Please give a valid user email.');
    }
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }
    public function setPassword($password)
    {
        if(!empty($password))
            $this->password = $password;
        else
            throw new Exception('Please give a valid user password.');
    }
    public function setStatus($number)
    {
        if($number > 1)
            throw new Exception('Please give valid status value.');
        else
            $this->status = $number;
    }
    public function getID()
    {
        return $this->id;
    }
    public function getName()
    {
        return $this->name;
    }
    public function getEmail()
    {
        return $this->email;
    }
    public function getPhone()
    {
        return $this->phone;
    }
    public function getPassword()
    {
        return $this->password;
    }
    public function getStatus()
    {
        return $this->status;
    }
    /*public function update($fields = array(), $id = null)
    {

        if (!$this->_db->update('products', $id, $fields))
        {
            throw new Exception('Unable to update the product.');
        }
    }

    public function create($fields = array())
    {
        if (!$this->_db->insert('products', $fields))
        {
            throw new Exception("Unable to create the product.");
        }
    }

    public function deleteMe($id)
    {

        if (!$this->_db->delete('products', array('uid', '=', $id)))
        {
            throw new Exception('Unable to update the product.');
        }
    }*/
}
