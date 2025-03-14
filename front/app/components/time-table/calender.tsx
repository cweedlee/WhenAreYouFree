import { Mode, type EventType } from "~/types/eventTypes";
import "./calender.css";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import c from "./control";
import api from "~/utils/api";
interface SchedulePosition extends CSSProperties {
  s?: number;
}

const dayName = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const headerHeight = 2;
function getHeight(date: Date) {
  return date.getHours() * 2 + date.getMinutes() / 30 + headerHeight - 2;
}

function Calender({ event, mode }: { event: EventType; mode: Mode }) {
  console.log("calender mode", mode);

  const start = new Date(event.durationStart);
  const end = new Date(event.durationEnd);
  let day: number = start.getDay();
  const schedules = getSchedules();
  const popup = useRef<HTMLDivElement>(null);
  const isTarget = useRef<HTMLDivElement>(null);
  const duration = c.createDateArray(start, end, schedules);
  const dateColStart = useRef<number>(0);
  const createSchDiv = useRef<HTMLDivElement>(null);
  const tempSchedule = useRef<HTMLDivElement>(null);
  const [newSchedule, setNewSchedule] = useState<{
    start: string;
    end: string;
    duration: string;
    position: SchedulePosition;
  } | null>(null);

  function getSchedules() {
    const schedules = [];
    for (const schedule of event.schedules) {
      const position = getSchedulePosition(schedule.start, schedule.end);
      if (!position) continue;
      for (const pos of position) {
        let s = pos.s;
        delete pos.s;
        schedules.push({
          position: pos,
          "data-day": s,
          "data-user": schedule.username,
          "data-id": schedule.id,
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
    if (start > _start || end < _end) return [{ top: 0, height: 0, s: 0 }];
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

  function addSchedule(e: React.MouseEvent) {
    e.preventDefault();
    if (!createSchDiv.current) return;
    const target = e.target as HTMLDivElement;

    // Get the time (hour) from the clicked element
    const hour = +(target.getAttribute("data-hour") || -1);

    // Find the parent date column
    console.log(dateColStart.current);
    if (!dateColStart.current) return;
    const date = +(
      (e.clientX - dateColStart.current) /
      (parseInt(getComputedStyle(document.documentElement).fontSize) * 5)
    ).toFixed(0);
    console.log(date, hour, duration[date].date.toDateString());

    if (!date || date < 0 || hour < 0) return;
    const _start = new Date(duration[date].date);
    const _end = new Date(_start);
    _start.setHours(hour, 0, 0, 0);
    _end.setHours(hour + 1, 0, 0, 0);
    const position = getSchedulePosition(_start.toString(), _end.toString());
    console.log("new position", position);
    setNewSchedule({
      start: _start.toLocaleString(),
      end: _end.toLocaleString(),
      duration:
        (_end.getTime() - _start.getTime()) / 1000 / 60 / 60 +
        "h " +
        (((_end.getTime() - _start.getTime()) / 1000 / 60) % 60) +
        "m",
      position: position[0],
    });
    createSchDiv.current.style.opacity = "1";
    createSchDiv.current.style.top = `${e.clientY + 10}px`;
    createSchDiv.current.style.left = `${e.clientX + 10}px`;
  }

  function submitSchedule(e: React.MouseEvent) {
    e.preventDefault();
    if (!tempSchedule.current || !newSchedule) return;
    const data = [{ start: newSchedule.start, end: newSchedule.end }];

    c.postSchedule(event.eventCode, data);
  }

  // check userData
  useEffect(() => {
    popup.current = document.getElementById("schedule-popup") as HTMLDivElement;
    popup.current.style.opacity = "0";
    let timediv = document.querySelector(".time:first-child") as HTMLDivElement;
    dateColStart.current =
      timediv?.getBoundingClientRect().x +
        timediv?.getBoundingClientRect().width || 0;
  }, []);
  return (
    <div
      className="table"
      onMouseMove={(e) => mode === Mode.VIEW && ctrlPopup(e)}
      onClick={addSchedule}
    >
      <div className="time-container">
        <div className="time-header">
          {start.getFullYear()}년{start.getMonth()}월
        </div>
        <div className="time-col">
          {[...Array(24).keys()].map((i, key) => (
            <div className="time" key={key}>
              <p className="time-text">{i + 1}시</p>
            </div>
          ))}
        </div>
      </div>
      <div className="date-container">
        <div className="date-background">
          {[...Array(24).keys()].map((i, key) => (
            <div className="time" key={key} data-hour={i}></div>
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
                    className={
                      mode === Mode.VIEW ? "schedule" : "schedule-others"
                    }
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
      <div id="schedule-new" ref={createSchDiv}>
        <div className="popup-header">
          <h2>Create Schedule</h2>
          <button>x</button>
        </div>
        <div className="popup-content">
          <p>{newSchedule?.start}</p>
          <p>{newSchedule?.end}</p>
          <p>duration: {newSchedule?.duration}</p>
          <button onClick={submitSchedule}>Create</button>
        </div>
      </div>
      {newSchedule && (
        <div
          className="schedule"
          ref={tempSchedule}
          style={newSchedule?.position}
        ></div>
      )}
    </div>
  );
}

export default Calender;
