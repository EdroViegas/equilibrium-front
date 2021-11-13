export function formatDateTime(data: string) {
  const date = new Date(data);

  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();

  const dateTime = `${localDate} | ${localTime}`;

  return dateTime;
}

export function formatDate(data: string) {
  const date = new Date(data);

  return date.toLocaleDateString();
}
