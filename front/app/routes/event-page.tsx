import { useEffect, useState } from "react";
import type { EventType } from "~/types/eventTypes";
import api from "~/utils/api";

interface Participant {
  start: string;
  end: string;
}

export default function EventPage(_: { params: { eventCode: string } }) {
  console.log(_.params);
  const eventCode = _.params.eventCode;
  const [event, setEvent] = useState<EventType | null>(null);
  useEffect(() => {
    api.get("/event/", { eventCode }).then((res) => {
      console.log(res);
      setEvent(res.data.event);
    });
  }, []);
  return (
    <>
      {event && event ? (
        <div>
          <h1>{event.eventName || "Event"}</h1>
          <h2>{event.host || "host"}</h2>
          <h3>{event.durationStart || "start"}</h3>
          <h3>{event.durationEnd || "end"}</h3>
          <div>
            <h3>schedules</h3>
            {event.participants &&
              event.participants.length &&
              Object.keys(event.participants).map((user: string) => (
                <li>
                  <h4>{user}</h4>
                  {event.participants[user].map(
                    (s: { start: string; end: string }) => (
                      <p>{"start : " + s.start + "\nend :" + s.end}</p>
                    )
                  )}
                </li>
              ))}
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
