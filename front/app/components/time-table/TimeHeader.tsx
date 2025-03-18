const TimeHeader = ({
  startDate,
  showHour,
}: {
  startDate: Date;
  showHour: { start: number; end: number };
}) => {
  return (
    <div className="time-container">
      <div className="time-header">
        {startDate.getFullYear()}년{startDate.getMonth()}월
      </div>
      <div className="time-col">
        {[...Array(showHour.end - showHour.start + 1).keys()].map((i, key) => (
          <div className="time border-b-1" key={key}>
            <p className="time-text">{showHour.start + i + 1}시</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeHeader;
