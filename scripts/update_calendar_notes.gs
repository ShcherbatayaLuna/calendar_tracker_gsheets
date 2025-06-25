function updateCalendarNotes() {
  const ss = SpreadsheetApp.getActive();
  const calSheet = ss.getSheetByName('Calendar');
  const yearInCalendar = ss.getSheetByName('Settings').getRange('B1').getValue();

  const monthsMap = {
    0: {row: 6, col: 2},    // January
    1: {row: 6, col: 11},   // February
    2: {row: 6, col: 20},   // March
    3: {row: 16, col: 2},   // April
    4: {row: 16, col: 11},  // May
    5: {row: 16, col: 20},  // June
    6: {row: 26, col: 2},   // July
    7: {row: 26, col: 11},  // August
    8: {row: 26, col: 20},  // September
    9: {row: 36, col: 2},   // October
    10: {row: 36, col: 11}, // November
    11: {row: 36, col: 20}, // December
  };

  // Зчитати значення й нотатки всього календаря
  const calRange = calSheet.getRange("B6:Z41");
  const calValues = calRange.getValues();
  const calNotes = calRange.getNotes();

  // Очистити нотатки в памʼяті
  for (let r = 0; r < calNotes.length; r++) {
    for (let c = 0; c < calNotes[0].length; c++) {
      calNotes[r][c] = '';
    }
  }

  const sources = [
    { name: 'Deadline', sheet: 'Deadline', dateCol: 1, descCol: 2 },
    { name: 'Call', sheet: 'Call', dateCol: 1, descCol: 2 },
    { name: 'Meeting', sheet: 'Meeting', dateCol: 1, descCol: 2 },
    { name: 'Reminder', sheet: 'Reminder', dateCol: 1, descCol: 2 },
    { name: 'Vacation', sheet: 'Vacation', dateColStart: 1, dateColEnd: 2, descCol: 3 },
    { name: 'Holiday', sheet: 'Holidays', dateCol: 1, descCol: 2 },
    { name: 'Other', sheet: 'Other', dateCol: 1, descCol: 2 }
  ];

  for (const src of sources) {
    const sh = ss.getSheetByName(src.sheet);
    if (!sh) continue;

    if (src.name === 'Vacation') {
      const data = sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues();

      for (let row of data) {
        const startDate = row[0];
        const endDate = row[1];
        const desc = row[2];
        if (!(startDate instanceof Date) || !(endDate instanceof Date) || !desc) continue;

        for (let r = 0; r < calValues.length; r++) {
          for (let c = 0; c < calValues[0].length; c++) {
            const cellDate = calValues[r][c];
            if (cellDate instanceof Date && cellDate >= startDate && cellDate <= endDate) {
              const existingNote = calNotes[r][c];
              const newNote = `${src.name}: ${desc}`;
              calNotes[r][c] = existingNote ? existingNote + '\n' + newNote : newNote;
            }
          }
        }
      }

    } else {
      const data = sh.getRange(2, src.dateCol, sh.getLastRow() - 1, src.descCol).getValues();

      for (let row of data) {
        const date = row[0];
        const desc = row[src.descCol - 1];
        if (!(date instanceof Date) || !desc) continue;
        if (date.getFullYear() !== yearInCalendar) continue; // 💡 Перевірка року

        for (let r = 0; r < calValues.length; r++) {
          for (let c = 0; c < calValues[0].length; c++) {
            const cellDate = calValues[r][c];
            if (
              cellDate instanceof Date &&
              cellDate.getDate() === date.getDate() &&
              cellDate.getMonth() === date.getMonth() &&
              cellDate.getFullYear() === date.getFullYear()
            ) {
              const existingNote = calNotes[r][c];
              const newNote = `${src.name}: ${desc}`;
              calNotes[r][c] = existingNote ? existingNote + '\n' + newNote : newNote;
            }
          }
        }
      }
    }
  }

  // Повернути нотатки назад у таблицю
  calRange.setNotes(calNotes);
}
