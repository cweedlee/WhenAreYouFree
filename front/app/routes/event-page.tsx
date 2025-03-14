import { useEffect, useState } from "react";
import TimeTable from "~/components/time-table/calender";
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
  // // OFFLINE TEST
  // const [event, setEvent] = useState<EventType | null>({
  //   eventName: "Event",
  //   host: "host",
  //   durationStart: "2021-11-01T00:00:00",
  //   durationEnd: "2021-11-03T00:00:00",
  //   schedules: [
  //     {
  //       user: "user1",
  //       start: "2021-11-01T09:00:00",
  //       end: "2021-11-01T20:00:00",
  //     },
  //     {
  //       user: "user2",
  //       start: "2021-11-01T15:00:00",
  //       end: "2021-11-01T16:00:00",
  //     },
  //     {
  //       user: "user1",
  //       start: "2021-11-02T10:00:00",
  //       end: "2021-11-02T11:00:00",
  //     },
  //     {
  //       user: "user2",
  //       start: "2021-11-02T17:00:00",
  //       end: "2021-11-02T19:00:00",
  //     },
  //   ],
  //   participants: ["user1", "user2"],
  // });
  useEffect(() => {
    api.get("/event/", { eventCode }).then((res) => {
      console.log(res);
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

          <TimeTable event={event} mode={"view"} />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
