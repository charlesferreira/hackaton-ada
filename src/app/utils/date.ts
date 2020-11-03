export const isSameDay = (d1: Date | string, d2: Date | string) => {
  if (typeof d1 === 'string') {
    d1 = new Date(d1);
  }

  if (typeof d2 === 'string') {
    d2 = new Date(d2);
  }

  return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
};
