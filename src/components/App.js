import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";

const initialState = {
  questions: [],
  // 'loading, 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "fetchFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...state,
        // 'loading, 'error', 'ready', 'active', 'finished'
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };

    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer, points } = state;

  const questionsNum = questions.length;
  const pointsArr = questions.map((question) => question.points);
  const totalPoints = pointsArr.reduce((acc, cur) => acc + cur, 0);
  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch("http://localhost:9000/questions");
        if (!response.ok) {
          throw new Error("couldnt fetch data");
        }
        const resData = await response.json();
        dispatch({ type: "dataReceived", payload: resData });
      } catch (error) {
        dispatch({ type: "fetchFailed" });
      }
    }

    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNum={questionsNum} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              max={questionsNum}
              index={index}
              points={points}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              questionsNum={questionsNum}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
