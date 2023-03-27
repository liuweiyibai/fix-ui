/**
 * 格式化秒数为 '00:00' 格式
 * @param seconds
 * @returns
 */
export function getMinutesTo0000(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
  const formattedSeconds =
    (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  return formattedMinutes + ':' + formattedSeconds;
}
