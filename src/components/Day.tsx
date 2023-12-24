import { createContext, useState } from "react";
import { DayType, EventContext, EventType } from "../types/types";
import Modal from "./Modal";
import DayEvent from "./DayEvent";

export const Events = createContext<EventContext | null>(null);

export default function Day({
  weekName,
  dayNumber,
  sameMonth,
  isToday,
  currentDate,
}: DayType) {
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<EventType[] | null>([]);

  return (
    <>
      <Events.Provider value={{ events, setEvents }}>
        <div className={`day  ${!sameMonth && "non-month-day old-month-day"}`}>
          <div className="day-header">
            <div className="week-name">{weekName}</div>
            <div className={`day-number ${isToday && "today"}`}>
              {dayNumber}
            </div>
            <button
              className="add-event-btn"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              +
            </button>
          </div>
          <div className="events">
            {events?.map((event, key) => (
              <DayEvent
                key={key}
                name={event.name}
                startTime={event.startTime}
                endTime={event.endTime}
                color={event.color}
                allDay={event.allDay}
              />
            ))}
          </div>
        </div>
        {IsOpen && (
          <Modal
            currentDate={currentDate}
            isOpen={IsOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </Events.Provider>
    </>
  );
}
