export default function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const precentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  if (precentage === 100) emoji = "🥇";
  if (precentage >= 70 && precentage < 100) emoji = "🥈";
  if (precentage >= 50 && precentage < 70) emoji = "🥉";
  if (precentage < 50) emoji = "👎";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({precentage}%)
      </p>
      <button
        className="btn center"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart
      </button>
    </>
  );
}
