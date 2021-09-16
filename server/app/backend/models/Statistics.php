<?php

class Statistics
{
    private $test,
            $testDate,
            $rightAnswers;

    public function __construct($result)
    {
        $test = new Test($result['testID'], $result['testTitle']);

        $this->test = $test;

        $this->testDate = $result['testdate'];
        $this->rightAnswers = $result['answers'];
    }

    public function getStatistics()
    {
        return array(
            'title'     => $this->test->getTitle(),
            'testdate'  => $this->testDate,
            'answers'   => $this->rightAnswers
        );
    }
}