import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StopIcon from '@material-ui/icons/Stop';
import { TestNavbar } from 'Components/TestNavbar';
import * as myConstants from 'Constants';
import axios from 'axios';
import MySnackbar from 'Util/SnackBar';
import AlertDialog from 'Components/SubComponents/Alert';
import { AuthContext } from 'Components/Contexts/AuthContext';
import { NavbarContext } from 'Components/Contexts/NavbarContext';

export default function TestDetails() {

    const { testID } = useParams();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    // to handle snakkebar
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("");

    //Alert Dialog
    const [alert, setAlert] = useState(false);
    const [objAert, setObjAlert] = useState({});

    // Bottom buttons, shown after completion 
    const [bottomButtons, setBtoomButtons] = useState(false);
    const [index, setIndex] = useState(0);

    // User context data, used to check login status
    var auth = useContext(AuthContext);

    //Navbar context to hide main navbar.
    var contextNavbar = useContext(NavbarContext);

    const history = useHistory();

    //Helper used to initialize userAnswers array.
    const updatedState = [];

    const apiMethod = myConstants.apiUrl + 'tests/' + testID;

    //fetching tests from database
    useEffect(async () => {

        if ((auth.authState.status && testID <= parseInt(auth.authState.totalTests)) || testID == 1) { // because first test is open for every one.

            const response = await axios({
                url: apiMethod,
                method: 'GET',
            });

            if (response.data.status) {
                setQuestions(response.data.questions.questions);

                // I used following technique to initialize userAnswers array with false value.
                for (let a = 0; a < response.data.questions.length; a++) {
                    updatedState[a] = false;

                    setUserAnswers([...userAnswers, ...updatedState]);

                }
            }

            contextNavbar.setNavbar(false); // Hide primary navbar

            console.log('useEffect called');
        } else {

            history.push(`/tests`); // If user tries to bypass and tries to access test by not clicking test no in tests page, but through url parameter.            
        }



    }, []);


    useEffect(async () => {

        console.log(objAert);

    }, [objAert]);    

    // following function is called on time finished.
    const timer = () => {
        handleStop();
    };

    const handleNextPrev = (e) => {

        e.preventDefault();

        const caller = e.currentTarget.name;

        if (document.querySelector('input[name=option]:checked') || bottomButtons) 
        {
            if (caller === 'btnNext') 
            {
                if (index < questions.length - 1) 
                {
                    setIndex(index + 1);
                }
            }
            else if (caller === 'btnPrev') 
            {
                if (index > 0) 
                {
                    setIndex(index - 1);
                }
            }

        }
        else {
            showSnakkebar('warning');

            setMsg('please make your selection first');
        }

    }

    const handleStop = () => {

        stopTimmer();

        const objResult = getResult();

        createAlertObject(objResult);

        setBtoomButtons(true);

        if (auth.authState && auth.authState.status) {
            console.log('you are logged in');
            // save results into database;
            saveResults(objResult.rightAnswers);
        }
        else {
            console.log('you are not logged in');
        }
    }

    const handleAlertClose = () => {
        setAlert(false);
    }
    const handleChange = (e) => {
        const newSelection = [
            ...userAnswers.slice(0, index),
            e.target.value,
            ...userAnswers.slice(index + 1)
        ]
        setUserAnswers(newSelection);
    }


    // Snakkebar handling 
    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);

    };
    const showSnakkebar = (severity) => {

        setOpen(true);

        setSeverity(severity);

    }

    const createAlertObject = (objResult) => {

        setAlert(true);

        setObjAlert({
            title: 'You got following results',
            description: objResult.description,
            open: true,
            onClose: handleAlertClose
        },
        );


    }


    const getResult = () => {
        let myRightAnswers = 0;
        let myResult = 'Fail';

        questions.map((question, index) => {

            if (question['answer'] === userAnswers[index]) 
            {
                myRightAnswers += 1;
            }
        });

        myResult = myRightAnswers > 19 ? 'Pass' : 'Fail';

        const description = (
            <div className="resultCard">
                <p>Total Questions:     25</p>
                <p>Total Right Answers: {myRightAnswers}  </p>
                <p className={myResult === 'Pass' ? 'pass' : 'fail'}> {myResult === "Pass" ? 'Congratulations! You have passed it.' : 'You couldn\'t pass it'}  </p>
                {myResult === 'Fail' && <p className="info"> Keep practicing until you get better results.</p>}
            </div>
        );

        const objResult = {
            description: description,
            rightAnswers: myRightAnswers,
            result: myResult
        }
        return objResult;
    }

    const saveResults = async (rightAnswers) => {

        const statistics = {
            action: 'save',
            userID: Number(auth.authState.id),
            testID: 1, // It is received from params
            rightAnswers: rightAnswers
        }

        const apiMethod = myConstants.apiUrl + 'statistics';

        try 
        {
            const response = await axios({
                url: apiMethod,
                method: 'POST',
                data: statistics
            });

            if (response.data.status)
                return true;
            else
                return false;
        }
        catch (error) 
        {
            console.log(error);
            return false;
        }

    }

    const stopTimmer = () => {
        //testNavBarRef.current?.cancelTimer();
        childRef.current?.cancelTimer();
    }
    const childRef = useRef();

    return (
        <div className="testContainer">

            <TestNavbar timerRef={childRef} timerOnComplete={timer} />

            <div className="content">
                <div className="question">
                    {questions.length > 0 && <span>Q#{(index + 1)}<h4>{questions[index]['question']} ?</h4></span>}
                </div>
                <div className="options">
                    <ul>
                        {questions.length > 0 && questions[index]['op1'] != '' &&
                            <li>
                                <input
                                    type="radio"
                                    id="option1"
                                    name="option"
                                    value={questions.length > 0 && questions[index]['op1']}
                                    checked={questions[index]['op1'] === userAnswers[index]}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="option1"
                                    style={bottomButtons && questions[index]['answer'] === questions[index]['op1'] ? { color: 'green' } : null}
                                >
                                    {questions.length > 0 && questions[index]['op1']}
                                </label>

                            </li>
                        }
                        {questions.length > 0 && questions[index]['op2'] != '' &&
                            <li>
                                <input
                                    type="radio"
                                    id="option2"
                                    name="option"
                                    style={bottomButtons && questions[index]['answer'] === questions[index]['op2'] ? { color: 'green' } : null}
                                    value={questions.length > 0 && questions[index]['op2']}
                                    checked={questions[index]['op2'] === userAnswers[index]}
                                    onChange={handleChange}
                                />

                                <label
                                    htmlFor="option2"
                                    style={bottomButtons && questions[index]['answer'] === questions[index]['op2'] ? { color: 'green' } : null}
                                >
                                    {questions.length > 0 && questions[index]['op2']}
                                </label>

                            </li>
                        }
                        {questions.length > 0 && questions[index]['op3'] != '' &&
                            <li>
                                <input
                                    type="radio"
                                    id="option3"
                                    name="option"
                                    style={bottomButtons && questions[index]['answer'] === questions[index]['op3'] ? { color: 'green' } : null}
                                    value={questions.length > 0 && questions[index]['op3']}
                                    checked={questions[index]['op3'] === userAnswers[index]}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="option3"
                                    style={bottomButtons && questions[index]['answer'] === questions[index]['op3'] ? { color: 'green' } : null}
                                >
                                    {questions[index]['op3']}
                                </label>

                            </li>
                        }
                    </ul>

                </div>
                <div className="navigationButtons">
                    <Link to="#" name="btnPrev" title="Previous" onClick={handleNextPrev}><ArrowBackIcon /></Link>
                    <Link
                        to="#"
                        title="Stop"
                        onClick={handleStop}
                        style={bottomButtons ? { pointerEvents: "none" } : null}
                    >
                        <StopIcon />
                    </Link>
                    <Link to="#" name="btnNext" title="Next" onClick={handleNextPrev}><ArrowForwardIcon /></Link>
                </div>
                <MySnackbar open={open} handleClose={handleClose} severity={severity} msg={msg} />

                {alert && <AlertDialog {...objAert} />}

                {bottomButtons &&

                    <div className="buttons">
                        {
                            questions.map((question, index) => (
                                <Link
                                    to=""
                                    key={index}
                                    className={question['answer'] !== userAnswers[index] ? 'error' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIndex(index);
                                    }}
                                >
                                    {index + 1}
                                </Link>
                            ))
                        }
                        
                    </div>
                }
            </div>
        </div>
    );
}



