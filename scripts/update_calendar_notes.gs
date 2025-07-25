function updateCalendarNotes() {
  const ss = SpreadsheetApp.getActive();
  const calSheet = ss.getSheetByName('Calendar');
  const yearInCalendar = ss.getSheetByName('Settings').getRange('B1').getValue();

  const calRange = calSheet.getRange("B6:Z41");
  const calValues = calRange.getValues();
  const calNotes = calRange.getNotes();

  // Clear all existing notes in memory
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

    const lastRow = sh.getLastRow();
    if (lastRow < 2) continue; // No data in the sheet

    // Handle vacation events (date range)
    if (src.name === 'Vacation') {
      const data = sh.getRange(2, 1, lastRow - 1, 3).getValues();
      for (let row of data) {
        const [startDate, endDate, desc] = row;
        if (!(startDate instanceof Date) || !(endDate instanceof Date) || !desc) continue;

        // Iterate through all calendar cells
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
      // Handle regular events (single date)
      const data = sh.getRange(2, src.dateCol, lastRow - 1, src.descCol).getValues();
      for (let row of data) {
        const date = row[0];
        const desc = row[src.descCol - 1];
        if (!(date instanceof Date) || !desc || date.getFullYear() !== yearInCalendar) continue;

        // Match each event to the correct calendar cell
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

  // Apply updated notes to the calendar sheet
  calRange.setNotes(calNotes);
}
