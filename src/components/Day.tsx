import {  useLayoutEffect, useRef, useState } from "react";
import { DayType } from "../ts/types";
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
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const amount = allEvents?.length;

  const eventsContainer = useRef<HTMLDivElement>(null);

  const checkOverflow = () => {
    if (eventsContainer.current) {
      const isOverflowing =
        eventsContainer.current.scrollHeight >
        eventsContainer.current.clientHeight;
      setShowMoreButton(isOverflowing);
    }
  };

  useLayoutEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
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
        <div className="events" ref={eventsContainer}>
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
        {showMoreButton && (
          <button
            className="events-view-more-btn"
            onClick={() => setShowMore(true)}
          >
            +{amount} More
          </button>
        )}
      </div>
      {showMore && (
        <HiddenEvents setIsOpen={setShowMore} currentDate={currentDate}>
          {allEvents &&
            allEvents.map((event, key) => (
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
        </HiddenEvents>
      )}

      {}

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
