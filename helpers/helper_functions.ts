export function formatDate(data: string) {
  const date = new Date(data);

  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();

  const dateTime = `${localDate} | ${localTime}`;

  return dateTime;
}

function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
}
