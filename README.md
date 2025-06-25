# 📅 Dynamic Google Sheets Calendar

A fully automated calendar built in **Google Sheets**, with support for:
- 🗓️ Dynamic event display from multiple sheets
- 🎨 Color-coded highlights by event type
- 💬 Comments (tooltips) on calendar dates
- ✅ Daily task checklist with auto-reset
- ⚙️ Powered by Google Apps Script (no manual runs needed)

---

### 🚀 Try It Yourself

You can try a **live copy** of the calendar here:  
[👉 Open Google Sheets Template](https://docs.google.com/spreadsheets/d/1MUKjmpNIvPBEJr-SRxYphfnEz6MZxd5JoaOJdl5xd2M/edit?usp=sharing)

---

## ✨ Features

- Automatically displays today's events from:
  - `Deadline`, `Call`, `Meeting`, `Reminder`, `Vacation`, `Holidays`, `Other`
- Applies **conditional formatting** based on event type
- Adds **comments** to calendar dates for hoverable descriptions
- Auto-inserts and clears checkboxes daily
- Works even if data is updated by formulas
- All automation handled via **time-driven triggers** (every 10 minutes + daily reset)

## 🔧 Automated Scripts

Three Google Apps Script functions:

| Function                 | Purpose                               | Trigger               |
|--------------------------|----------------------------------------|------------------------|
| `updateCalendarNotes`    | Adds highlights + comments             | Every 10 minutes       |
| `insertStatusCheckboxes` | Manages checkboxes for today’s tasks  | Every 10 minutes       |
| `clearStatusCheckboxes`  | Resets all checkboxes                  | Every night (00:00–01:00) |

## 📋 Setup Instructions

> ⚠️ Scripts are not copied automatically.  
> After making a copy of the spreadsheet, follow the steps below to configure triggers and adjust the calendar year.  
> For full walkthrough, including screenshots and script logic, check the [📘 Developer Guide](./docs/calendar_dev_guide.md).

1. **Make a copy** of the spreadsheet
2. Set the calendar year:
   - Go to the `Settings` sheet
   - Update cell `B1` with your desired year
3. Open the script editor:
   - Go to `Extensions → Apps Script`
4. Click on the clock icon (Triggers)
5. Add the following time-driven triggers:
   - `updateCalendarNotes` → every 10 minutes
   - `insertStatusCheckboxes` → every 10 minutes
   - `clearStatusCheckboxes` → daily (00:00–01:00)
6. Grant permissions when prompted

## 📘 Developer Guide

See [`calendar-dev-guide.md`](./docs/calendar_dev_guide.md) for a complete technical explanation: setup, structure, formulas, screenshots, and script files.

## 📃 License

MIT License – see [`LICENSE`](./LICENSE)

---

> Created with ❤️ using Google Sheets + Apps Script  
> Contributions welcome!
