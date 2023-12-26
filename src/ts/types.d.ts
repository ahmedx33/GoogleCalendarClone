import  { Dispatch, ReactNode, SetStateAction } from "react"

type DayType = {
    id?: string | number,
    children?: ReactNode,
    weekName: boolean ,
    dayNumber: number,
    sameMonth: boolean,
    isToday: boolean,
    currentDate: Date | null,
    allEvents: EventType[] | null,
    day: Date | null
}

type ModalType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    currentDate: Date | null
}

type Color = "red" | "green" | "blue"

type EventType = {
    id: number | string | Date | null,
    name: string,
    allDay: boolean,
    startTime: string,
    endTime: string,
    color: Color | null,
    currentDate: number,
}

type EventContext = {
    events: EventType[] | null;
    setEvents:  Dispatch<SetStateAction<EventType[] | null>>
};

type EditEventType = {
    id: number | string | Date | null,
    name: string,
    allDay: boolean,
    startTime: string,
    endTime: string,
    color: Color | null,
    IsOpen: boolean,
    currentDate: EventType["currentDate"]  ,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}

type HiddenEvent = {
    children?: ReactNode,
    currentDate: Date | null,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}