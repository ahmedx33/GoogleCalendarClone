import { useMemo, useState } from "react";
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

// import { Color } from "../types/types";


export default function Calendar() {
  const [date, setDate] = useState<Date | null>(new Date());
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

        <div className="days">
          {days.map((day) => (
            <Day
              key={day.getTime()}
              id={day.getTime()}
              isToday={isToday(day as Date)}
              weekName={format(day, "iii")}
              dayNumber={day.getDate()}
              sameMonth={isSameMonth(day, date as Date)}
              currentDate={day}
            />
          ))}
        </div>
      </div>
    </>
  );
}
