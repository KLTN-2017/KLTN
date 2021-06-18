export function autoGeneratorColor(length: number): string[] {
    return Array.from({length}, ()=> `#${Math.floor(Math.random()*16777215).toString(16)}`)
}