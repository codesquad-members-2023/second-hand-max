export const getFormattedTimeDifference = (date: string) => {
  const targetDate = new Date(date);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference > 0) {
    return `${daysDifference}일 전`;
  }

  if (hoursDifference > 0) {
    return `${hoursDifference}시간 전`;
  }

  if (minutesDifference > 0) {
    return `${minutesDifference}분 전`;
  }

  return '방금';
};