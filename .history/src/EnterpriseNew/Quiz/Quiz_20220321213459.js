import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "../assets/bodyFront.png";
import { useContext } from "react";
import { AuthContext } from "../Store/auth-context";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import axios from "axios";
import questions from "../question";
import "./Quiz.css";
// import { logout } from './API/userAuth/userAuth';

// const questions = [
//   {
//     id: "q1",
//     question: "How long have you been suffering from shoulder pain / injury?",
//     options: [
//       "shoulder-More than a Week",
//       "More than a Month",
//       "More than 3 Months",
//       "Not Sure",
//     ],
//   },
//   {
//     id: "q2",
//     question: "How long have you been suffering from back pain / injury?",
//     options: [
//       "Back-More than a Week",
//       "More than a Month",
//       "More than 3 Months",
//       "Not Sure",
//     ],
//   },
//   {
//     id: "q3",
//     question: "How long have you been suffering from Neck pain / injury?",
//     options: [
//       "Neck-More than a Week",
//       "More than a Month",
//       "More than 3 Months",
//       "Not Sure",
//     ],
//   },
//   {
//     id: "q4",
//     question: "How long have you been suffering from Elbow pain / injury?",
//     options: [
//       "Elbow-More than a Week",
//       "More than a Month",
//       "More than 3 Months",
//       "Not Sure",
//     ],
//   },
// ];

function Quiz() {
  const [question, setQuestion] = useState(0);
  const [que, setQue] = useState([]);
  const [isSelected, setSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const joints = useSelector((state) => state.jointReducer.joints);
  console.log(joints);

  let allsections = [];

  for (let section in joints) {
    allsections.push(joints[section].section);
  }

  allsections = [...new Set(allsections)];
  console.log(allsections);



  useEffect(() => {
    // axios.get("https://myphysio.digitaldarwin.in/api/get_question").then(res => console.log(res.data)).catch(err => console.log(err))
    setLoading(true);
    axios
      .post("https://myphysio.digitaldarwin.in/api/get_question/", {
        "exercise_name": allsections
      })
      .then((res) => {let data = res.data;
        setLoading(false);
            let exerciseQuestions = [];
            for (let ex in data.details) {
              let exercise = {
                id: Math.ceil(Math.random() * 1000000),
                exercise_name: data.details[ex][0].exercise_name,
                exercise_question: data.details[ex][1][0].question,
                options: data.details[ex][1][0].answer.map((ans) => ans.keyvalue),
              };
              exerciseQuestions.push(exercise);
            }
            setQue(exerciseQuestions);
            console.log(exerciseQuestions);
          }
      )
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  // fetch("https://myphysio.digitaldarwin.in/api/get_question")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setLoading(false);
  //     console.log(data.details[0][0]);
  //     let exerciseQuestions = [];
  //     for (let ex in data.details) {
  //       let exercise = {
  //         id: Math.ceil(Math.random() * 1000000),
  //         exercise_name: data.details[ex][0].exercise_name,
  //         exercise_question: data.details[ex][1][0].question,
  //         options: data.details[ex][1][0].answer.map((ans) => ans.keyvalue),
  //       };
  //       exerciseQuestions.push(exercise);
  //     }
  //     setQue(exerciseQuestions);
  //     console.log(exerciseQuestions);
  //   })
  //   .catch((err) => console.log(err));
  }, []);

  // console.log(que);

  // const newQue = que.filter((q) => {
  //   for (let section in allsections) {
  //     if (q.exercise_name.includes(allsections[section])) {
  //       return q;
  //     }
  //   }
  // });

  // console.log(newQue);

  const authCtx = useContext(AuthContext);
  const questionAnswers = useSelector(
    (state) => state.questionAnswerReducer.questionAnswers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (questionAnswers[question]) {
      setSelected(true);
    }
  }, [questionAnswers, question]);

  const clickHandler = (e) => {
    setSelected(true);
    const q = que[question].exercise_question;
    const qId = que[question].id;
    const ans = e.target.value;
    const section = que[question].exercise_name;
    const qAns = {
      questionId: qId,
      question: q,
      answer: ans,
      section
    };
    dispatch({ type: "SELECT", questionAnswer: qAns });
  };

  // console.log(que);

  console.log(questionAnswers);

  const classHandler = (index) => {
    if (questionAnswers.length > 0) {
      if (questionAnswers[question]) {
        if (
          que[question].options[index] ===
          que[question].options[questionAnswers[question].answer]
        ) {
          console.log("active");
          return "option active";
        } else {
          return "option";
        }
      }
      // console.log();
      // console.log();
    }
    return;
  };

  const dotClassHandler = (index) => {
    if (index === question) {
      return "dot active";
    } else {
      return "dot";
    }
  };

  const backClickHandler = () => {
    setQuestion((prevState) => {
      if (prevState !== 0) {
        return prevState - 1;
      } else {
        return 0;
      }
    });
  };

  const backHandler = () => {
    dispatch({ type: "CLEAR" });
    history.push("/patient/enterprise/muscle-selection");
  };

  const nextClickHandler = () => {
    if (isSelected) {
      setQuestion((prevQuestion) => prevQuestion + 1);
      setSelected(false);
    }
  };

  // const logoutHandler = () => {
  //   logout();
  //       localStorage.clear();
  //       window.location.href="/"
  // };

  return (
    <div className="App">
      <div className="logout">
        {/* <button onClick={logoutHandler}>Logout</button> */}
      </div>
      <section id="question_section">
        <div className="questions">
          <div className="image">
            <img src={img} alt="body" />
          </div>
          {question < que.length ? (
            <div className="question">
              <div className="question_number">
                <div className="dots">
                  {que.map((question, index) => (
                    <div className={dotClassHandler(index)} key={question.id} />
                  ))}
                </div>
                <p>
                  <span>Question {question + 1}/</span>
                  {que.length}
                </p>
              </div>
              <p>
                {que[question].exercise_question
                  .toLowerCase()
                  .includes("if you experienced")
                  ? que[question].exercise_question +
                    ` (${que[question].exercise_name})`
                  : que[question].exercise_question
                      .toLowerCase()
                      .includes("during last")
                  ? que[question].exercise_question +
                    ` ${que[question].exercise_name}?`
                  : que[question].exercise_question}
              </p>
              <div className="options">
                {que[question].options.map((option, index) => (
                  <button
                    className={
                      classHandler(index) ? classHandler(index) : "option"
                    }
                    key={index}
                    onClick={clickHandler}
                    value={index}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="action-buttons">
                {question !== 0 ? (
                  <button onClick={backClickHandler}>Back</button>
                ) : (
                  <button onClick={backHandler}>Back</button>
                )}
                <button
                  onClick={nextClickHandler}
                  className={!isSelected ? "disable" : ""}
                >
                  Next
                </button>
              </div>
            </div>
          ) : !isLoading && joints.length > 0 ? (
            <div className="end"><p>Thanks For Completing The Quiz</p>
            <button className="" onClick={() =>history.push('/pat/PoseTest')}>Next</button></div>
          ) : (
            <>
              {!isLoading ? (
                <div className="end">
                  <p>No Questions Found!!</p>
                  <button onClick={backHandler}>Back</button>
                </div>
              ) : (
                <LoadingSpinner />
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Quiz;
