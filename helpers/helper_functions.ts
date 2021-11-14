import toast from "react-hot-toast";

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

export const notify = (message: string) => toast.success(message);
export const notifyError = (message: string) => toast.error(message);
