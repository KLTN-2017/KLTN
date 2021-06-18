interface Params {
    search: string
    fetchData: (text: string) => void
    setFetch: (value: boolean) => void
    isFetch: boolean
}
export default function delayFetchData({search, fetchData, setFetch, isFetch }: Params) {
    let myVar: any
    function myFunction() {
      myVar = search
        ? setTimeout(() => {
            fetchData(search)
            setFetch(false)
          }, 2000)
        : ''
    }
    function myStopFunction() {
      clearTimeout(myVar)
    }
    if (isFetch) {
      myStopFunction()
      myFunction()
    } else {
      setFetch(true)
      myFunction()
    }
    return () => {
      myStopFunction()
    }
}
