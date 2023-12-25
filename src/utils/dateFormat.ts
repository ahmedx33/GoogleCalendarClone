export default function dateFormat(date: Date, option: Intl.DateTimeFormatOptions) {
    return new Intl.DateTimeFormat(undefined, option).format(date)
}