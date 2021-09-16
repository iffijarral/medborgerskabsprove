<?php

class Question
{
    private $id,
            $question,
            $op1,
            $op2,
            $op3,
            $answer;

    public function __construct($id, $question, $op1, $op2, $op3, $answer)
    {
        $this->setID($id);
        $this->setQuestion($question);
        $this->setOp1($op1);
        $this->setOp2($op2);
        $this->setOp3($op3);
        $this->setAnswer($answer);
    }
    public function setID($id)
    {
        if(!empty($id))
            $this->id = $id;
        else
            throw new Exception('Please give a valid user id.');
    }
    public function setQuestion($question)
    {
        if(!empty($question)) {
            $this->question = $question;
        }

        else
            throw new Exception('Please give a valid question.');
    }
    public function setOp1($op1)
    {
        $this->op1 = $op1;
    }
    public function setOp2($op2)
    {
        $this->op2 = $op2;
    }
    public function setOp3($op3)
    {
        $this->op3 = $op3;
    }
    public function setAnswer($answer)
    {
        if(!empty($answer))
            $this->answer = $answer;
        else
            throw new Exception('Please give a valid answer.');
    }
    public function getID()
    {
        return $this->id;
    }
    public function getQuestion()
    {
        return $this->question;
    }
    public function getOp1()
    {
        return $this->op1;
    }
    public function getOp2()
    {
        return $this->op2;
    }
    public function getOp3()
    {
        return $this->op3;
    }
    public function getAnswer()
    {
        return $this->answer;
    }
   
}
