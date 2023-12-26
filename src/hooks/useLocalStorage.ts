export function useLocalStorage(method: {get?: boolean , post?: boolean} ,key: string, value: string): string | void {
    if (method.get) {
        const data = localStorage.getItem(key)
        return data as string
    } else if (method.post) {
        localStorage.setItem(key, value)
    }
}