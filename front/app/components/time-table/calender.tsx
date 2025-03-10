import type { EventType } from "~/types/eventTypes";
import "./calender.css";
import { useEffect, useRef, type CSSProperties } from "react";
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
  const popup = useRef<HTMLDivElement>(null);
  const isTarget = useRef<HTMLDivElement>(null);

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

  function ctrlPopup(e: React.MouseEvent) {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (!popup.current) return;
    popup.current.style.top = `${e.clientY + 10}px`;
    popup.current.style.left = `${e.clientX + 10}px`;
    if (target.className !== "schedule") return;

    if (!isTarget.current) {
      isTarget.current = target;
      console.log("show");
      const start = target.getAttribute("data-start");
      const end = target.getAttribute("data-end");
      const user = target.getAttribute("data-user");
      popup.current.innerHTML = `
      <div class="popup">
      <div class="popup-header">
      <div class="header-block">${user}</div>
      </div>
      <div class="popup-content">
      <div class="content-block">${start}</div>
      <div class="content-block">${end}</div>
      </div>
      </div>
      `;
      popup.current.style.opacity = "1";
    }
  }
  function onTargetLeave(e: React.MouseEvent) {
    e.preventDefault();
    if (!popup.current) return;
    if (popup.current.style.opacity === "0") return;
    isTarget.current = null;
    setTimeout(() => {
      if (!popup.current || isTarget.current) return;
      popup.current.style.opacity = "0";
    }, 100);
  }

  // check userData
  useEffect(() => {
    popup.current = document.getElementById("schedule-popup") as HTMLDivElement;
    popup.current.style.opacity = "0";
  }, []);
  return (
    <div className="table" onMouseMove={ctrlPopup}>
      <div className="time-container">
        <div className="time-header">
          {start.getFullYear()}년{start.getMonth()}월
        </div>
        {[...Array(24).keys()].map((i, key) => (
          <div className="time" key={key}>
            <p className="time-text">{i + 1}시</p>
          </div>
        ))}
      </div>
      <div className="date-container">
        <div className="date-background">
          {[...Array(24).keys()].map((i, key) => (
            <div className="time" key={key}></div>
          ))}
        </div>
        {duration.map((data, dkey) => (
          <div className="date-col" key={dkey}>
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
                    style={{
                      ...sch.position,
                      opacity: 1 / event.participants.length,
                    }}
                    data-user={sch["data-user"]}
                    data-start={sch["data-start"]}
                    data-end={sch["data-end"]}
                    onMouseOut={onTargetLeave}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <div id="schedule-popup" ref={popup}></div>
    </div>
  );
}

export default TimeTable;
