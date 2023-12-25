import { useEffect, useRef, useState } from "react";
import { DayType, EventType } from "../ts/types";
import Modal from "./Modal";
import DayEvent from "./DayEvent";
import dateFormat from "../utils/dateFormat";
import HiddenEvents from "./HiddenEvents";

export default function Day({
  day,
  weekName,
  dayNumber,
  sameMonth,
  isToday,
  currentDate,
  allEvents,
}: DayType) {
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const eventsOverflow = useRef<HTMLDivElement>(null);
  const [childLength, setChildLength] = useState<number>();
  const [hiddenEvents, setHiddenEvents] = useState<EventType[] | null>();
  const [showMore, setShowMore] = useState<boolean>(false);
  const amount = childLength && childLength - 2;

  useEffect(() => {
    setChildLength(allEvents?.length);
    setHiddenEvents(allEvents?.slice(2));
  }, [allEvents]);

  return (
    <>
      <div className={`day  ${!sameMonth && "non-month-day old-month-day"}`}>
        <div className="day-header">
          {weekName && (
            <div className="week-name">
              {dateFormat(day as Date, { weekday: "short" })}
            </div>
          )}
          <div className={`day-number ${isToday && "today"}`}>{dayNumber}</div>
          <button
            className="add-event-btn"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            +
          </button>
        </div>
        <div className="events" ref={eventsOverflow}>
          {allEvents?.map((event, key) => (
            <DayEvent
              key={key}
              id={event.id}
              name={event.name}
              startTime={event.startTime}
              endTime={event.endTime}
              color={event.color}
              allDay={event.allDay}
              currentDate={event.currentDate}
            />
          ))}
        </div>
        {childLength && childLength > 2 ? (
          <button
            className="events-view-more-btn"
            onClick={() => setShowMore(true)}
          >
            +{amount} More
          </button>
        ) : (
          ""
        )}
      </div>
      {showMore && hiddenEvents && (
        <HiddenEvents setIsOpen={setShowMore} currentDate={currentDate}>
          {hiddenEvents.map((event, key) =>
            event.allDay ? (
              <button
                key={key}
                className={`all-day-event ${event.color} event`}
              >
                <div className="event-name">{event.name}</div>
              </button>
            ) : (
              <button key={key} className="event">
                <div className={`color-dot ${event.color}`}></div>
                <div className="event-time">10am</div>
                <div className="event-name">{event.name}</div>
              </button>
            )
          )}
        </HiddenEvents>
      )}

      {IsOpen && (
        <Modal
          currentDate={currentDate}
          isOpen={IsOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
