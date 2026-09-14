# FinFlow — Personal Wealth & Expense Tracker

A modern, responsive, and privacy-first personal finance web application with real-time balance calculations, interactive analytics, monthly category budgeting, and Indian Rupee (`₹`) formatting.

Designed with an **Apple / Fi Money minimalist interface** prioritizing clean typography, generous whitespace, and zero clutter.

---

## ✨ Features

- **Real-Time Balance Calculation**: Total Net Balance, Monthly Inflow, Monthly Outflow, and dynamic Savings Rate (`%`).
- **Apple Segmented Pill Navigation**: Clean views for **Overview**, **Analytics**, **Budgets**, and **Activity** to eliminate visual clutter.
- **Interactive Visualizations (Chart.js)**:
  - **Category Breakdown**: Interactive donut chart with center totals and percentage badges.
  - **Monthly Cashflow**: 6-month historical bar chart comparing income vs. expenses.
  - **30-Day Balance Trajectory**: Smooth running net balance line chart.
- **Category Budgets & Overspend Monitoring**: Monthly spending caps per category with visual progress bars and real-time overspend warning banners.
- **Smart Date Grouping & Relative Timestamps**: Transactions automatically grouped under *Today*, *Yesterday*, and earlier dates with relative times (*"2 hours ago"*, *"Yesterday"*).
- **Search & Multi-Criteria Filters**: Live search across merchants, notes, and categories with filters for transaction type, category, date range, and sorting.
- **Indian Rupee Financial Engine**: Native `en-IN` currency format (`₹1,00,000`) with dynamic Lakhs / Crores helper hints.
- **Permanent Dual Storage**: Synchronously persisted in `localStorage` and `IndexedDB` so data never resets on page refresh or browser restarts.
- **Privacy First & Zero Dependencies**: Runs completely locally inside your browser with no backend database or tracking.
- **CSV Data Export**: One-click download of all transaction history to `.csv`.
- **Dark / Light Mode**: Seamless theme switching respecting modern system design.

---

## 🚀 Getting Started

No build tools, Node.js, or server configuration required!

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/finflow-expense-tracker.git
   ```
2. Double-click `index.html` to open directly in any modern browser (Chrome, Edge, Safari, Firefox).

---

## 🛠️ Built With

- **HTML5** (Semantic & Accessible)
- **CSS3 / Tailwind CSS**
- **Vanilla JavaScript (ES6+)**
- **Chart.js** (Data Visualizations)
- **Lucide Icons**
- **LocalStorage & IndexedDB API**

---

## 📄 License

MIT License — Feel free to use and customize for your personal finances.
