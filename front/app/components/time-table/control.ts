import type { tableType } from "./type";

function createDateArray(start: Date, end: Date, schedules: any) {
  const dateArray = [];

  let current = new Date(start);
  let di = 0; // duration index
  let si = 0; // schedule index
  while (current <= end) {
    let _s = [];
    while (
      schedules &&
      si < schedules.length &&
      di === schedules[si]["data-day"]
    ) {
      _s.push(schedules[si]);
      si++;
    }
    dateArray.push({ date: new Date(current), schedules: _s }); // Format as YYYY-MM-DD
    di++;
    current.setDate(current.getDate() + 1); // Move to the next day
  }

  return dateArray;
}
const createBlockList = (dateArr: Date[]) => {
  let blockCount = 0;
  const blockTable: tableType = {};
  dateArr.forEach((date) => {
    const yy = date.getFullYear();
    const mm = date.getMonth();
    const dd = date.getDate();

    if (!blockTable[yy]) blockTable[yy] = {};
    if (!blockTable[yy][mm]) blockTable[yy][mm] = {};
    if (!blockTable[yy][mm][dd]) blockTable[yy][mm][dd] = null;
  });
  console.log(blockTable);
  return { blockTable, blockCount };
};

export default { createDateArray, createBlockList };
