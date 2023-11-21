import Options from "./Options";

export default function Question({
  question,
  dispatch,
  answer,
  index,
  questionsNum,
}) {
  let button;

  if (index === questionsNum - 1 && answer !== null) {
    button = (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  } else if (answer !== null) {
    button = (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
      {button}
    </div>
  );
}
