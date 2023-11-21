export default function StartScreen({questionsNum, dispatch}) {

    function handleStart() {
        dispatch({type: 'start'});
    }
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>{questionsNum} questions to test you React mastery</h3>
      <button className="btn btn-ui" onClick={handleStart}>Let's Start</button>
    </div>
  );
}
