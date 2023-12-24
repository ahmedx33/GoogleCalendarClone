import { useContext } from "react"
import { Events } from "../components/Day"

export default function useEvents() {
    const events = useContext(Events)

    if (events === null || events === undefined) throw new Error("main date is null")

    return events
}
