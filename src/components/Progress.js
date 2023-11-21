export default function Progress({ index, max, points, totalPoints }) {
  return (
    <header className="progress">
      <progress max={max - 1} value={index} />
      <p>
        Question <strong>{index + 1}</strong>/{max}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints} Points
      </p>
    </header>
  );
}
