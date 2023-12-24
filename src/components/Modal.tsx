import { createPortal } from "react-dom";
import { EventType, ModalType } from "../types/types";
import { format } from "date-fns";
import useEvents from "../hooks/useEvents.hooks";
import React, { useRef, useState } from "react";

export default function Modal({ isOpen, setIsOpen, currentDate }: ModalType) {
  const { setEvents } = useEvents();
  const [color, setColor] = useState<string>("blue");
  const [allDay, setAllDay] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTime = useRef<HTMLInputElement>(null);
  const endTime = useRef<HTMLInputElement>(null);

  function eventHandler(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    if (inputRef.current?.value === "") return;
    const [startHour, startMin]: string[] = startTime.current?.value.split(
      ":"
    ) as string[];
    const [endHour, endMin]: string[] = endTime.current?.value.split(
      ":"
    ) as string[];

    const checkTimeFormat = +startHour >= 12 ? "PM" : "AM";

    if (startHour && endHour && startMin && endMin) {
      if (checkTimeFormat === "PM" || checkTimeFormat === "AM") {
        if (
          startHour >= endHour ||
          startHour <= endHour ||
          (startHour === endHour && startMin < endMin)
        ) {
          console.log("yes");
        } else {
          console.log("nope");
        }
      }
    }

    if (inputRef.current && inputRef.current.value !== null) {
      setEvents(
        (prev) =>
          prev &&
          ([
            ...prev,
            {
              name: inputRef.current!.value,
              startTime: startHour,
              endTime: endHour,
              color: color,
              allDay: allDay,
            },
          ] as EventType[])
      );
    }

    setIsOpen(false);
  }

  return createPortal(
    <>
      <div className={`modal ${isOpen ? "" : "closing"}`}>
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>Add Event</div>
            <small>{format(currentDate as Date, "d/MM/yyyy")}</small>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input ref={inputRef} type="text" name="name" />
            </div>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                onChange={(ev) =>
                  setAllDay(ev.currentTarget.value === "on" ? true : false)
                }
                name="all-day"
                id="all-day"
              />
              <label htmlFor="all-day">All Day?</label>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="start-time">Start Time</label>
                <input
                  disabled={allDay}
                  ref={startTime}
                  type="time"
                  name="start-time"
                  id="start-time"
                />
              </div>
              <div className="form-group">
                <label htmlFor="end-time">End Time</label>
                <input
                  disabled={allDay}
                  ref={endTime}
                  type="time"
                  name="end-time"
                  id="end-time"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Color</label>
              <div className="row left">
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  id="blue"
                  defaultChecked
                  className="color-radio"
                  onClick={(ev) => setColor(ev.currentTarget.value)}
                />
                <label htmlFor="blue">
                  <span className="sr-only">Blue</span>
                </label>
                <input
                  type="radio"
                  name="color"
                  value="red"
                  id="red"
                  className="color-radio"
                  onClick={(ev) => setColor(ev.currentTarget.value)}
                />
                <label htmlFor="red">
                  <span className="sr-only">Red</span>
                </label>
                <input
                  type="radio"
                  name="color"
                  value="green"
                  id="green"
                  className="color-radio"
                  onClick={(ev) => setColor(ev.currentTarget.value)}
                />
                <label htmlFor="green">
                  <span className="sr-only">Green</span>
                </label>
              </div>
            </div>
            <div className="row">
              <button
                className="btn btn-success"
                type="submit"
                onClick={eventHandler}
              >
                Add
              </button>
              {/* <button className="btn btn-delete" type="button">
                Delete
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}
