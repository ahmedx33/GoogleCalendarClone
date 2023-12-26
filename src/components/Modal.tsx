import { createPortal } from "react-dom";
import { EventType, ModalType } from "../ts/types";
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

  const startH = startTime.current?.value;
  const endH = endTime.current?.value;

  function eventHandler(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    const [startHour]: string[] = startTime.current?.value.split(
      ":"
    ) as string[];
    const [endHour]: string[] = endTime.current?.value.split(":") as string[];
    if (inputRef.current?.value === "") return;

    if (inputRef.current && inputRef.current.value !== null) {
      if (startHour > endHour) {
        alert("please");

        return;
      }

      setEvents(
        (prev) =>
          prev &&
          ([
            ...prev,
            {
              id: Date.now(),
              name: inputRef.current!.value,
              startTime: startHour,
              endTime: endHour,
              color,
              allDay,
              currentDate: currentDate?.getTime(),
              setColor,
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
                onChange={(ev) => setAllDay(ev.currentTarget.checked)}
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
                  defaultValue={startH}
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
                  defaultValue={endH}
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
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}
