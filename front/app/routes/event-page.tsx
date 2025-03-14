import { useEffect, useState } from "react";
import Page from "~/components/page";
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
    <Page>
      {event?.durationStart && event ? (
        <div className="flex flex-col gap-4 mx-10 lg:mx-20  my-10 justify-center text-center">
          <h1 className="text-2xl font-bold italic">
            {event.eventName || "Event"}
          </h1>
          <div>
            <h3 className="text-sm text-gray-500">hosted by</h3>
            <h2 className="text-lg font-bold">{event.host || "host"}</h2>
          </div>
          <h3 className="text-sm text-gray-500">
            {event.durationStart || "start"}
          </h3>
          <h3 className="text-sm text-gray-500">
            {event.durationEnd || "end"}
          </h3>

          <TimeTable event={event} mode={mode} />
          <Button onClick={() => setMode(Mode.CREATE)}>Add Schedule</Button>
          <Button onClick={() => setMode(Mode.VIEW)}>confirm Schedule</Button>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </Page>
  );
}
