export function FullDateCheck(props) {
  const date = new Date(props);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const dateAt = formatter.format(date);
  return dateAt;
}
export function HourCheck(props) {
  const date = new Date(props);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const dateAt = formatter.format(date);
  return dateAt;
}
