const Background = ({
  showHour,
}: {
  showHour: { start: number; end: number };
}) => {
  return (
    <div className="date-background">
      {[...Array(24).keys()].map((i, key) => (
        <div
          className={`time border-b-1 ${
            (i + showHour.start + 1) % 3 === 0
              ? "border-stone-500"
              : "border-stone-300"
          }`}
          key={key}
          data-hour={i}
        ></div>
      ))}
    </div>
  );
};

export default Background;
