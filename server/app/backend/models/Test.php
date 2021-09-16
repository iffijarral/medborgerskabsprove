<?php

class Test
{
    private $id,
            $title;

    public function __construct($id, $title)
    {
        $this->setID($id);
        $this->setTitle($title);
    }
    public function setID($id)
    {
        if(!empty($id))
            $this->id = $id;
        else
            throw new Exception('Please give a valid user id.');
    }
    public function setTitle($title)
    {
        $this->title = $title;
    }
    public function getID()
    {
        return $this->id;
    }
    public function getTitle()
    {
        return $this->title;
    }
    public function getTest()
    {
        return array(
            'id'    => $this->getID(),
            'title' => $this->getTitle()
        );
    }
}
