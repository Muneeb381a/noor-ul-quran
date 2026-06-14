const REVISION_SCHEDULE = {
  sabaq:  [1, 3, 7],
  sabaqi: [7, 14],
  manzil: [30, 90],
};

export function getNextRevisionDates(logType, logDate) {
  const days = REVISION_SCHEDULE[logType] || [];
  return days.map(d => {
    const date = new Date(logDate);
    date.setDate(date.getDate() + d);
    return date.toISOString().split('T')[0];
  });
}

export function getDueRevisions(allLogs, today) {
  return allLogs.filter(log => {
    const nextDates = getNextRevisionDates(log.log_type, log.log_date);
    return nextDates.includes(today);
  });
}
