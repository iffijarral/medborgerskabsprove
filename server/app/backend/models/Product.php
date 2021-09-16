<?php

class Product
{
    private $id,                    
            $reference,
            $price;
            

    public function __construct($id, $reference, $price)
    {
        $this->setProdID($id);  
        $this->setReference($reference);
        $this->setPrice($price);
    }
    
    public function setProdID($prodID)
    {
        if(!empty($prodID) && is_int($prodID))
        {
            $this->id = $prodID;
        } else 
            throw new Exception('Please give a valid product ID.');
    }

    public function setReference($reference) 
    {
        if(!empty($reference))
            $this->reference = $reference;
        else 
            throw new Exception('Please give a valid pruduct reference.');
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

    public function getReference()
    {
        return $this->reference;
    }

    public function getPrice()
    {
        return $this->price;
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
