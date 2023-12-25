import { useState } from "react";
import { EventType } from "../ts/types";
import EditEventModal from "./EditEventModal";

export default function DayEvent({
  id,
  name,
  startTime,
  endTime,
  color,
  allDay,
  currentDate,
}: EventType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {allDay ? (
        <>
          <button
            className={`all-day-event ${color} event`}
            onClick={() => setIsOpen(true)}
          >
            <div className="event-name">{name}</div>
          </button>
          
        </>
      ) : (
        <button className="event" onClick={() => setIsOpen(true)}>
          <div className={`color-dot ${color}`}></div>
          <div className="event-time">
            {startTime}:{endTime}
          </div>
          <div className="event-name">{name}</div>
        </button>
      )}

      {isOpen && (
        <EditEventModal
          id={id}
          name={name}
          startTime={startTime}
          endTime={endTime}
          allDay={allDay}
          color={color}
          IsOpen={isOpen}
          currentDate={currentDate}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
