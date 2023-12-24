import { EventType } from "../types/types";

export default function DayEvent({
  name,
  startTime,
  endTime,
  color,
  allDay,
}: EventType) {
  return (
    <>
      {allDay ? (
        <button className={`all-day-event ${color}  event`}>
          <div className="event-name">
            {name}
          </div>
        </button>
      ) : (
        <button className="event">
          <div className={`color-dot ${color}`}></div>
          <div className="event-time">
            {startTime}:{endTime}
          </div>
          <div className="event-name">{name}</div>
        </button>
      )}
    </>
  );
}
