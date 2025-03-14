import type { EventType, Mode } from "~/types/eventTypes";
import Calender from "./calender";

const TimeTable = ({ event, mode }: { event: EventType; mode: Mode }) => {
  const start = new Date(event.durationStart);
  const end = new Date(event.durationEnd);
  const durationLength = end.getTime() - start.getTime();
  const duration = durationLength / (1000 * 60 * 60 * 24);
  console.log(duration);
  return <Calender event={event} mode={mode} />;
};

export default TimeTable;
