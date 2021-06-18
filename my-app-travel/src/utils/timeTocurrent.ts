const timeToCurrent = (dateString: string) => {
  const dateComment = new Date(dateString).getTime()
  const dateCurrent = new Date().getTime()
  const subTime = Math.round((dateCurrent - dateComment) / 60000)
  if (subTime < 60) return `${subTime} phút trước.`
  const subHour = Math.round(subTime / 60)
  if (subHour < 24) return `${subHour} giờ trước.`
  const subDay = Math.round(subHour / 24)
  if (subDay < 30) return `${subDay} ngày trước.`
  const subMonth = Math.round(subDay / 30)
  if (subMonth < 12) return `${subMonth} tháng trước.`
  return `${Math.round(subMonth / 12)} năm trước.`
}
export default timeToCurrent