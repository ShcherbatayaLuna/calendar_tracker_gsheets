function insertStatusCheckboxes() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName('Calendar');
  if (!sheet) return;

  const startRow = 6;
  const numRows = 10; // рядки 6–15
  const abRange = sheet.getRange(startRow, 28, numRows, 2); // AB6:AC15
  const adRange = sheet.getRange(startRow, 30, numRows, 1); // AD6:AD15

  const abValues = abRange.getValues();

  for (let i = 0; i < numRows; i++) {
    const adCell = adRange.getCell(i + 1, 1);
    const hasData = abValues[i][0] || abValues[i][1]; // AB або AC не порожні

    if (hasData) {
      adCell.insertCheckboxes();
      adCell.setValue(false); // встановити чекбокс пустим
    } else {
      adCell.clearContent();
      adCell.removeCheckboxes();
    }
  }
}
