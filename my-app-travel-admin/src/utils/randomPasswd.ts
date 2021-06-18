
export const randomPasswd = (): string => {
    return Math.random().toString(36).slice(-12)
}