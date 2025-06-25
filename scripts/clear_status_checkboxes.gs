function clearStatusCheckboxes() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName('Calendar');
  if (!sheet) return;

  const startRow = 6;
  const numRows = 10; // рядки 6–15
  const adRange = sheet.getRange(startRow, 30, numRows, 1); // AD6:AD15

  // Встановити всі клітинки колонки AD в false (зняти чекбокс)
  adRange.setValue(false);
}