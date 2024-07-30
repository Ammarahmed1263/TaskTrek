import getDayName from "./getDayName";
import getMonthName from "./getMonthName";

export default function formatDate(date: Date): string {
  return `${getDayName(date.getDay())}, ${getMonthName(date.getMonth())} ${date.getDate()}`
}