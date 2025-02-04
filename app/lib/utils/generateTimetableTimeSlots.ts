type Override = {
  start: string;
  end: string;
  interval: number;
};

export function generateTimetableTimeSlots(
  startTime24: string,
  endTime24: string,
  interval: number,
  overrides: Override[] = [],
  numberOfPeriods?: number
): {
  timeSlots: string[];
  isEquallySplit: boolean;
  totalPeriods: number;
  isPeriodCountValid?: boolean;
} {
  const timeSlots: string[] = [];

  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesTo12Hour = (totalMinutes: number): string => {
    let hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const meridian = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes.toString().padStart(2, '0')}${meridian}`;
  };

  let currentStart = timeToMinutes(startTime24);
  const end = timeToMinutes(endTime24);
  let totalPeriods = 0;

  while (currentStart < end) {
    let currentInterval = interval;

    const override = overrides.find(
      (override) =>
        currentStart >= timeToMinutes(override.start) &&
        currentStart < timeToMinutes(override.end)
    );

    if (override) {
      currentInterval = override.interval;
    }

    const slotEnd = currentStart + currentInterval;

    if (slotEnd > end) break;

    const slotStartStr = minutesTo12Hour(currentStart);
    const slotEndStr = minutesTo12Hour(slotEnd);
    timeSlots.push(`${slotStartStr}-${slotEndStr}`);

    currentStart = slotEnd;
    totalPeriods++;
  }

  const totalMinutes = timeToMinutes(endTime24) - timeToMinutes(startTime24);
  const isEquallySplit = totalMinutes % interval === 0;

  const isPeriodCountValid =
    numberOfPeriods !== undefined
      ? totalPeriods === numberOfPeriods
      : undefined;

  return {
    timeSlots,
    isEquallySplit,
    totalPeriods,
    isPeriodCountValid,
  };
}
