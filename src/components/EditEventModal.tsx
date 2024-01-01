import { createPortal } from "react-dom";
import { Color, EditEventType, EventType } from "../ts/types";
import { MouseEvent, useRef, useState } from "react";
import { format } from "date-fns";
import useEvents from "../hooks/useEvents.hooks";

export default function EditEventModal({
  id,
  name,
  startTime,
  endTime,
  color,
  allDay,
  IsOpen,
  currentDate,
  setIsOpen,
}: EditEventType) {
  const [check, setCheck] = useState<boolean>(allDay);
  const { setEvents } = useEvents();
  const [newColor, setNewColor] = useState<Color | null>(color);
  const inputRef = useRef<HTMLInputElement>(null);
  const newStartTime = useRef<HTMLInputElement>(null);
  const newEndTime = useRef<HTMLInputElement>(null);

  function editEventHandler(ev: MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    const eventDate: EventType = {
      id,
      name: inputRef.current?.value as string,
      allDay: check,
      color: newColor,
      currentDate,
      startTime: newStartTime.current?.value as string,
      endTime: newEndTime.current?.value as string,
    };
    setEvents((ev) =>
      ev!.map((event) => (event.id === id ? eventDate : event))
    );

    setIsOpen(false);
  }

  function deletEventHanlder() {
    setEvents((event) => event!.filter((ev) => ev.id !== id));
    setIsOpen(false);
  }

  return createPortal(
    <>
      <div className={`modal ${IsOpen ? "" : "closing"}`}>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>Edit Event</div>
            <small>{format(new Date(currentDate), "d/MM/yyyy")}</small>
            <button className="close-btn" onClick={() => setIsOpen!(false)}>
              &times;
            </button>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                ref={inputRef}
                type="text"
                name="name"
                id="name"
                defaultValue={name}
              />
            </div>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                name="all-day"
                id="all-day"
                onChange={(ev) => setCheck!(ev.currentTarget.checked)}
                defaultChecked={allDay}
              />
              <label htmlFor="all-day">All Day?</label>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="start-time">Start Time</label>
                <input
                  disabled={check}
                  ref={newStartTime}
                  defaultValue={startTime}
                  type="time"
                  name="start-time"
                  id="start-time"
                />
              </div>
              <div className="form-group">
                <label htmlFor="end-time">End Time</label>
                <input
                  disabled={check}
                  ref={newEndTime}
                  defaultValue={endTime}
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
                  className="color-radio"
                  onClick={(ev) => setNewColor(ev.currentTarget.value as Color)}
                  defaultChecked={color === "blue" ? true : false}
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
                  onClick={(ev) => setNewColor(ev.currentTarget.value as Color)}
                  defaultChecked={color === "red" ? true : false}
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
                  onClick={(ev) => setNewColor(ev.currentTarget.value as Color)}
                  defaultChecked={color === "green" ? true : false}
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
                onClick={editEventHandler}
              >
                Edit
              </button>
              <button
                className="btn btn-delete"
                type="button"
                onClick={deletEventHanlder}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}
