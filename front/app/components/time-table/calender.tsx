import type { EventType } from "~/types/eventTypes";
import "./calender.css";
import { useEffect, type CSSProperties } from "react";
import c from "./control";
interface SchedulePosition extends CSSProperties {
  s?: number;
}

function TimeTable({ event }: { event: EventType }) {
  const start = new Date(event.durationStart);
  const end = new Date(event.durationEnd);
  const dayName = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let day: number = start.getDay();
  let headerHeight = 2;
  const schedules = getSchedules();

  const duration = c.createDateArray(start, end, schedules);
  function getSchedules() {
    const schedules = [];
    for (const schedule of event.schedules) {
      const position = getSchedulePosition(schedule.start, schedule.end);
      for (const pos of position) {
        let s = pos.s;
        delete pos.s;
        schedules.push({
          position: pos,
          "data-day": s,
          "data-user": schedule.user,
          "data-key": schedule.key,
          "data-start": schedule.start,
          "data-end": schedule.end,
        });
      }
    }
    return schedules;
  }

  function getSchedulePosition(schStart: string, schEnd: string) {
    const _start = new Date(schStart);
    const _end = new Date(schEnd);
    const res: SchedulePosition[] = [];
    const iter = new Date(start);
    // 기간 및 가로 시작점 구하기
    let i = 0;
    let s, e;
    if (
      start.toDateString() > _start.toDateString() ||
      end.toDateString() < _end.toDateString()
    )
      console.log("error: DateString is not in the range");
    while (iter.toDateString() !== _start.toDateString()) {
      i++;
      iter.setDate(iter.getDate() + 1);
    }
    s = i;
    while (iter.toDateString() !== _end.toDateString()) {
      i++;
      iter.setDate(iter.getDate() + 1);
    }
    e = i;

    // 기간이 있을  경우  사각형 여러개
    // 한 칸에 w-5rem h-2rem
    let totalHeight = 27 * 2;
    while (s <= e) {
      let top, height;
      top = getHeight(_start);
      height =
        s !== e ? `${totalHeight - top}rem` : `${getHeight(_end) - top}rem`;
      top = `${top}rem`;
      res.push({ top, height, s });
      s++;
    }
    return res;
  }
  function getHeight(date: Date) {
    return date.getHours() * 2 + date.getMinutes() / 30 + headerHeight - 1;
  }

  // check userData
  useEffect(() => {}, []);
  return (
    <div className="table">
      <div className="time">
        <div className="time-header">
          <div className="header-block">year</div>
        </div>
        {[...Array(24).keys()].map((i, key) => (
          <div className="w-[3rem] h-[2rem] time" key={key}>
            {i}
          </div>
        ))}
      </div>
      <div className="content">
        {duration.map((data, dkey) => (
          <div className="date-container" key={dkey}>
            <div className={`header-block`}>
              {dayName[day++ % 7]}
              {" " + data.date.getDate()}
            </div>
            <div className="date" data-time={`${data.date.toDateString()}`}>
              {data.schedules &&
                data.schedules.length > 0 &&
                data.schedules.map((sch, schKey) => (
                  <div
                    className="schedule"
                    key={schKey}
                    style={{ ...sch.position }}
                    data-key={sch["data-key"]}
                    data-start={sch["data-start"]}
                    data-end={sch["data-end"]}
                  >
                    {sch["data-user"]}
                    <br></br>
                    {sch["data-start"]}
                    <br></br>
                    {sch["data-end"]}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeTable;
