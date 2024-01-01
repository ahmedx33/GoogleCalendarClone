import { createContext, useEffect, useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isToday,
  format,
} from "date-fns";
import Day from "./Day";
import { EventContext, EventType } from "../ts/types";

export const Events = createContext<EventContext | null>(null);

export default function Calendar() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<EventType[] | null>([]);
  useEffect(() => {
    if (localStorage.getItem("events") === null && events?.length === 0) {
      localStorage.setItem("events", "[]");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const data: EventType[] = JSON.parse(`${localStorage.getItem("events")}`);
    if (events?.length !== 0)
      return localStorage.setItem("events", JSON.stringify(events));
    setEvents(data);
  }, [events]);

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(date as Date)),
        end: endOfWeek(endOfMonth(date as Date)),
      }),
    [date]
  );

  return (
    <>
      <div className="calendar">
        <div className="header">
          <button className="btn" onClick={() => setDate(new Date())}>
            Today
          </button>
          <div>
            <button
              className="month-change-btn"
              onClick={() => setDate((c) => addMonths(c as Date, -1))}
            >
              &lt;
            </button>
            <button
              className="month-change-btn"
              onClick={() => setDate((c) => addMonths(c as Date, 1))}
            >
              &gt;
            </button>
          </div>
          <span className="month-title">
            {format(date as Date, "MMMM")} {date?.getFullYear()}
          </span>
        </div>
        <Events.Provider value={{ events, setEvents }}>
          <div className="days">
            {days.map((day, index) => (
              <Day
                day={day}
                key={day.getTime()}
                id={day.getTime()}
                isToday={isToday(day as Date)}
                weekName={index < 7}
                dayNumber={day.getDate()}
                sameMonth={isSameMonth(day, date as Date)}
                currentDate={day}
                allEvents={
                  events &&
                  events.filter((ev) => ev.currentDate === day.getTime())
                }
              />
            ))}
          </div>
        </Events.Provider>
      </div>
    </>
  );
}
