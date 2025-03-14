import { useEffect, useState } from "react";
import TimeTable from "~/components/time-table/TimeTable";
import { Button } from "~/components/ui/button";
import { Mode, type EventType } from "~/types/eventTypes";
import api from "~/utils/api";

export default function EventPage(_: { params: { eventCode: string } }) {
  console.log(_.params);
  const eventCode = _.params.eventCode;
  const [event, setEvent] = useState<EventType | null>(null);
  const [mode, setMode] = useState<Mode>(Mode.VIEW);
  console.log("mode", mode);
  useEffect(() => {
    api.get("/event/", { eventCode }).then((res) => {
      console.log(res);
      res.data.event.eventCode = eventCode;
      setEvent(res.data.event);
    });
  }, []);
  return (
    <>
      {event?.durationStart && event ? (
        <div>
          <h1>{event.eventName || "Event"}</h1>
          <h2>{event.host || "host"}</h2>
          <h3>{event.durationStart || "start"}</h3>
          <h3>{event.durationEnd || "end"}</h3>

          <TimeTable event={event} mode={mode} />
          <Button onClick={() => setMode(Mode.CREATE)}>Add Schedule</Button>
          <Button onClick={() => setMode(Mode.VIEW)}>confirm Schedule</Button>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
