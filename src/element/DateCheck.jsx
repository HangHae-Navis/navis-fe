function DateCheck(props) {
  const date = new Date(props);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  });
  const dateAt = formatter.format(date);
  return dateAt;
}
export default DateCheck;
