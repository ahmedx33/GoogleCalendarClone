import { createPortal } from "react-dom";
import { HiddenEvent } from "../ts/types";
import { format } from "date-fns";


export default function HiddenEvents({
  children,
  currentDate,
  setIsOpen,
}: HiddenEvent) {
  
  return createPortal(
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            {format(currentDate as Date, "d/MM/yyyy")}
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </div>
          <div  className="events scroll">
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
