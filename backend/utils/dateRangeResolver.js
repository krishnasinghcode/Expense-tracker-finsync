export const resolveDateRange = (period, startDate, endDate) => {
  const today = new Date();
  let from, to;

  switch (period) {
    case 'daily':
      from = new Date(today.setHours(0, 0, 0, 0));
      to = new Date(today.setHours(23, 59, 59, 999));
      break;
    case 'weekly':
      const day = today.getDay();
      from = new Date(today);
      from.setDate(today.getDate() - day);
      from.setHours(0, 0, 0, 0);
      to = new Date(from);
      to.setDate(from.getDate() + 6);
      to.setHours(23, 59, 59, 999);
      break;
    case 'monthly':
      from = new Date(today.getFullYear(), today.getMonth(), 1);
      to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;
    case 'yearly':
      from = new Date(today.getFullYear(), 0, 1);
      to = new Date(today.getFullYear(), 11, 31);
      break;
    case 'custom':
      if (!startDate || !endDate) throw new Error('Custom range requires startDate and endDate');
      from = new Date(startDate);
      to = new Date(endDate);
      break;
    default:
      throw new Error('Invalid period type');
  }

  return { from, to };
};
