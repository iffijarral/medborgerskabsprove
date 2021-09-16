<?php
require_once BACKEND_BASE.'models/TestQuestions.php';

class TestOperations{
    private $_db;

    public function __construct()
    {
        $this->_db = Database::getInstance();
    }

    public function getTests()
    {
        $sql = "SELECT * from tests";

        $results = $this->_db->Select($sql);

        $testsList = array();

        foreach($results as $result)
        {
            $test = new Test($result['id'], $result['title']);

            array_push($testsList, $test->getTest());
        }

        return $testsList;
    }


    public function getTest($testID)
    {
        $sql = "SELECT t.id as testID, t.title as testTitle, q.id, q.question, q.op1, q.op2, q.op3, q.answer FROM testquestions tq
                INNER JOIN questions as q
                ON q.id = tq.questionid
                INNER JOIN tests t
                ON t.id = tq.testid
                AND tq.testid = :testID GROUP BY q.question";

        $params = array(
            'testID' => $testID
        );

        $results = $this->_db->Select($sql, $params);

        $questionsList = array();

        if(empty($results)) {
            throw new Exception('Invalid test ID');
        }

        foreach($results as $result)
        {
            array_push(
            $questionsList,
                new Question(
                    $result['id'],
                    $result['question'],
                    $result['op1'],
                    $result['op2'],
                    $result['op3'],
                    $result['answer']
                )
            );

        }
        $test = new Test($results[0]['testID'], $results[0]['testTitle']);

        $testquestions = new TestQuestions($test, $questionsList);

        return $testquestions->getTestQuestions();
    }

}
