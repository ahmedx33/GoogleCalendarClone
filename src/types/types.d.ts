import React, { Dispatch, ReactNode, SetStateAction } from "react"

type DayType = {
    id?: string | number,
    children?: ReactNode,
    weekName: string | number ,
    dayNumber: number,
    sameMonth: boolean,
    isToday: boolean,
    currentDate: Date | null
}

type ModalType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    currentDate: Date | null
}

type Color = "red" | "green" | "blue"

type EventType = {
    name: string,
    allDay: boolean,
    startTime: string,
    endTime: string,
    color: Color | null,
}

type EventContext = {
    events: EventType[] | null;
    setEvents:  React.Dispatch<React.SetStateAction<EventType[] | null>>
};