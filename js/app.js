/**
 * FinFlow — Apple / Fi Money Clean Minimalist Personal Finance Engine
 */

// --- Categories Configuration (10 Expense + 4 Income Categories) ---
const CATEGORIES = {
  food: { name: 'Food & Dining', icon: 'utensils', color: '#f97316', bg: '#fff7ed', darkBg: '#431407', type: 'expense' },
  shopping: { name: 'Shopping', icon: 'shopping-bag', color: '#ec4899', bg: '#fdf2f8', darkBg: '#500724', type: 'expense' },
  housing: { name: 'Rent & Housing', icon: 'home', color: '#8b5cf6', bg: '#f5f3ff', darkBg: '#2e1065', type: 'expense' },
  utilities: { name: 'Bills & Utilities', icon: 'zap', color: '#eab308', bg: '#fefce8', darkBg: '#422006', type: 'expense' },
  transport: { name: 'Transport & Travel', icon: 'car', color: '#06b6d4', bg: '#ecfeff', darkBg: '#083344', type: 'expense' },
  entertainment: { name: 'Entertainment', icon: 'film', color: '#a855f7', bg: '#faf5ff', darkBg: '#3b0764', type: 'expense' },
  health: { name: 'Health & Medical', icon: 'heart-pulse', color: '#ef4444', bg: '#fef2f2', darkBg: '#450a0a', type: 'expense' },
  education: { name: 'Education', icon: 'book-open', color: '#3b82f6', bg: '#eff6ff', darkBg: '#172554', type: 'expense' },
  investments: { name: 'Investments & SIP', icon: 'trending-up', color: '#10b981', bg: '#ecfdf5', darkBg: '#064e3b', type: 'expense' },
  travel: { name: 'Vacation & Trips', icon: 'plane', color: '#14b8a6', bg: '#f0fdfa', darkBg: '#042f2e', type: 'expense' },

  salary: { name: 'Salary & Payroll', icon: 'briefcase', color: '#10b981', bg: '#ecfdf5', darkBg: '#064e3b', type: 'income' },
  freelance: { name: 'Freelance & Projects', icon: 'laptop', color: '#06b6d4', bg: '#ecfeff', darkBg: '#083344', type: 'income' },
  dividends: { name: 'Dividends & Returns', icon: 'coins', color: '#84cc16', bg: '#f7fee7', darkBg: '#1a2e05', type: 'income' },
  gifts: { name: 'Gifts & Cashback', icon: 'gift', color: '#f59e0b', bg: '#fffbeb', darkBg: '#451a03', type: 'income' }
};

const DEFAULT_BUDGETS = {
  food: 12000,
  shopping: 10000,
  housing: 30000,
  utilities: 6000,
  transport: 5000,
  entertainment: 4000,
  health: 5000,
  education: 4000,
  investments: 20000,
  travel: 15000
};

// --- Currency Formatter (Indian Rupee: ₹1,00,000) ---
function formatINR(amount, includeDecimals = false) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0
  }).format(num);
}

function formatIndianWords(num) {
  if (num >= 10000000) return `(${ (num / 10000000).toFixed(2) } Crore)`;
  if (num >= 100000) return `(${ (num / 100000).toFixed(2) } Lakh)`;
  if (num >= 1000) return `(${ (num / 1000).toFixed(1) }k)`;
  return '';
}

// --- Relative Time Formatter ("2 hours ago", "Yesterday", etc.) ---
function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;

  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// --- Realistic Seed Data Generator ---
function generateRealisticData() {
  const now = new Date();
  const makeDate = (daysAgo, hoursAgo = 0, minsAgo = 0) => {
    const d = new Date(now.getTime() - (daysAgo * 86400000) - (hoursAgo * 3600000) - (minsAgo * 60000));
    return d.toISOString().slice(0, 16);
  };

  return [
    { id: 'tx-1', type: 'expense', amount: 480, title: 'Starbucks Hazelnut Latte', category: 'food', paymentMethod: 'UPI', dateTime: makeDate(0, 2, 15), notes: 'Coffee with team' },
    { id: 'tx-2', type: 'expense', amount: 2450, title: 'Nature Basket Organic Groceries', category: 'food', paymentMethod: 'Credit Card', dateTime: makeDate(0, 5, 40), notes: 'Weekly groceries' },
    { id: 'tx-3', type: 'income', amount: 25000, title: 'UI/UX Design Sprint Milestone', category: 'freelance', paymentMethod: 'Net Banking', dateTime: makeDate(0, 7, 0), notes: 'Client milestone invoice' },
    { id: 'tx-4', type: 'expense', amount: 1650, title: 'Uber Premier Ride', category: 'transport', paymentMethod: 'UPI', dateTime: makeDate(1, 4, 30), notes: 'Airport pickup' },
    { id: 'tx-5', type: 'expense', amount: 4200, title: 'Zara Summer Apparel', category: 'shopping', paymentMethod: 'Credit Card', dateTime: makeDate(1, 8, 10), notes: 'Casual wear' },
    { id: 'tx-6', type: 'income', amount: 450, title: 'CRED Cashback & Rewards', category: 'gifts', paymentMethod: 'UPI', dateTime: makeDate(1, 14, 0), notes: 'Bill payment reward' },
    { id: 'tx-7', type: 'expense', amount: 15000, title: 'HDFC Index Mutual Fund SIP', category: 'investments', paymentMethod: 'Net Banking', dateTime: makeDate(3, 2, 0), notes: 'Monthly SIP' },
    { id: 'tx-8', type: 'expense', amount: 2800, title: 'Electricity & Water Bill', category: 'utilities', paymentMethod: 'UPI', dateTime: makeDate(4, 5, 20), notes: 'Monthly utilities' },
    { id: 'tx-9', type: 'expense', amount: 1199, title: 'Netflix & Spotify Premium', category: 'entertainment', paymentMethod: 'Credit Card', dateTime: makeDate(5, 6, 0), notes: 'OTT subscriptions' },
    { id: 'tx-10', type: 'income', amount: 125000, title: 'Monthly Salary Credit', category: 'salary', paymentMethod: 'Net Banking', dateTime: makeDate(8, 10, 0), notes: 'TechCorp salary' },
    { id: 'tx-11', type: 'expense', amount: 28500, title: 'Apartment Monthly Rent', category: 'housing', paymentMethod: 'Net Banking', dateTime: makeDate(9, 11, 0), notes: 'Bangalore apartment rent' },
    { id: 'tx-12', type: 'expense', amount: 3500, title: 'Apollo Pharmacy Health Care', category: 'health', paymentMethod: 'Debit Card', dateTime: makeDate(11, 3, 30), notes: 'Vitamins & checkup' },
    { id: 'tx-13', type: 'expense', amount: 1890, title: 'Barbeque Nation Dinner', category: 'food', paymentMethod: 'Credit Card', dateTime: makeDate(12, 8, 0), notes: 'Family dinner' },
    { id: 'tx-14', type: 'expense', amount: 8999, title: 'GoAir Flight Tickets', category: 'travel', paymentMethod: 'Credit Card', dateTime: makeDate(18, 4, 15), notes: 'Goa weekend' },
    { id: 'tx-15', type: 'expense', amount: 3200, title: 'AI & Machine Learning Course', category: 'education', paymentMethod: 'Debit Card', dateTime: makeDate(22, 6, 45), notes: 'Upskilling' },
    { id: 'tx-16', type: 'income', amount: 3200, title: 'TCS Dividend Payout', category: 'dividends', paymentMethod: 'Net Banking', dateTime: makeDate(26, 2, 0), notes: 'Quarterly dividend' }
  ];
}

// --- IndexedDB Dual Storage Engine ---
const IDB_NAME = 'FinFlowAppDB';
const IDB_VERSION = 1;
const IDB_STORE = 'app_data';

function openIDB() {
  return new Promise((resolve) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function saveToIDB(key, val) {
  try {
    const db = await openIDB();
    if (!db) return;
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(val, key);
  } catch (e) {
    console.warn('IDB write failed:', e);
  }
}

// --- App State Store with Permanent Storage Guarantees ---
class FinFlowStore {
  constructor() {
    this.transactions = this.loadTransactions();
    this.budgets = this.loadBudgets();
    this.theme = localStorage.getItem('finflow_theme') || 'dark';
    this.filters = {
      search: '',
      type: 'all',
      category: 'all',
      date: 'all',
      sort: 'date_desc'
    };
  }

  loadTransactions() {
    const isInitialized = localStorage.getItem('finflow_initialized');
    const saved = localStorage.getItem('finflow_transactions');

    if (isInitialized === 'true') {
      if (saved !== null) {
        try {
          return JSON.parse(saved) || [];
        } catch (e) {
          console.error('Error reading saved transactions:', e);
          return [];
        }
      }
      return [];
    }

    if (saved !== null) {
      try {
        localStorage.setItem('finflow_initialized', 'true');
        return JSON.parse(saved) || [];
      } catch (e) {
        console.error('Failed to parse transactions', e);
      }
    }

    const sample = generateRealisticData();
    localStorage.setItem('finflow_transactions', JSON.stringify(sample));
    localStorage.setItem('finflow_initialized', 'true');
    saveToIDB('transactions', sample);
    return sample;
  }

  saveTransactions() {
    localStorage.setItem('finflow_transactions', JSON.stringify(this.transactions));
    localStorage.setItem('finflow_initialized', 'true');
    saveToIDB('transactions', this.transactions);
    updateStorageStatus();
  }

  loadBudgets() {
    const saved = localStorage.getItem('finflow_budgets');
    if (saved) {
      try {
        return { ...DEFAULT_BUDGETS, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse budgets', e);
      }
    }
    return { ...DEFAULT_BUDGETS };
  }

  saveBudgets(newBudgets) {
    this.budgets = { ...this.budgets, ...newBudgets };
    localStorage.setItem('finflow_budgets', JSON.stringify(this.budgets));
    localStorage.setItem('finflow_initialized', 'true');
    saveToIDB('budgets', this.budgets);
    updateStorageStatus();
  }

  clearAllData() {
    this.transactions = [];
    localStorage.setItem('finflow_transactions', JSON.stringify([]));
    localStorage.setItem('finflow_initialized', 'true');
    saveToIDB('transactions', []);
    updateStorageStatus();
  }

  resetToSampleData() {
    this.transactions = generateRealisticData();
    this.budgets = { ...DEFAULT_BUDGETS };
    this.saveTransactions();
    this.saveBudgets(this.budgets);
  }

  addTransaction(tx) {
    this.transactions.unshift({
      ...tx,
      id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)
    });
    this.saveTransactions();
  }

  updateTransaction(id, updatedTx) {
    const idx = this.transactions.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.transactions[idx] = { ...this.transactions[idx], ...updatedTx };
      this.saveTransactions();
    }
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.saveTransactions();
  }

  getFilteredTransactions() {
    return this.transactions.filter(tx => {
      if (this.filters.search) {
        const query = this.filters.search.toLowerCase();
        const catName = CATEGORIES[tx.category]?.name.toLowerCase() || '';
        const matchTitle = (tx.title || '').toLowerCase().includes(query);
        const matchNotes = (tx.notes || '').toLowerCase().includes(query);
        const matchCat = catName.includes(query);
        if (!matchTitle && !matchNotes && !matchCat) return false;
      }

      if (this.filters.type !== 'all' && tx.type !== this.filters.type) {
        return false;
      }

      if (this.filters.category !== 'all' && tx.category !== this.filters.category) {
        return false;
      }

      if (this.filters.date !== 'all') {
        const txDate = new Date(tx.dateTime);
        const now = new Date();

        if (this.filters.date === 'today') {
          if (txDate.toDateString() !== now.toDateString()) return false;
        } else if (this.filters.date === 'this_week') {
          const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
          firstDay.setHours(0, 0, 0, 0);
          if (txDate < firstDay) return false;
        } else if (this.filters.date === 'this_month') {
          if (txDate.getMonth() !== new Date().getMonth() || txDate.getFullYear() !== new Date().getFullYear()) {
            return false;
          }
        } else if (this.filters.date === 'last_30_days') {
          const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
          if (txDate < thirtyDaysAgo) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();
      const amtA = Number(a.amount);
      const amtB = Number(b.amount);

      switch (this.filters.sort) {
        case 'date_asc': return dateA - dateB;
        case 'amount_desc': return amtB - amtA;
        case 'amount_asc': return amtA - amtB;
        case 'date_desc':
        default:
          return dateB - dateA;
      }
    });
  }

  getMetrics() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalIncome = 0;
    let totalExpense = 0;
    let monthlyIncome = 0;
    let monthlyExpense = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    this.transactions.forEach(tx => {
      const amt = Number(tx.amount) || 0;
      const txDate = new Date(tx.dateTime);
      const isCurrentMonth = txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;

      if (tx.type === 'income') {
        totalIncome += amt;
        if (isCurrentMonth) {
          monthlyIncome += amt;
          incomeCount++;
        }
      } else {
        totalExpense += amt;
        if (isCurrentMonth) {
          monthlyExpense += amt;
          expenseCount++;
        }
      }
    });

    const netBalance = totalIncome - totalExpense;
    let savingsRate = 0;
    if (monthlyIncome > 0) {
      savingsRate = Math.max(0, Math.round(((monthlyIncome - monthlyExpense) / monthlyIncome) * 100));
    }

    return {
      totalBalance: netBalance,
      monthlyIncome,
      monthlyExpense,
      monthlySavings: monthlyIncome - monthlyExpense,
      savingsRate,
      incomeCount,
      expenseCount
    };
  }
}

const store = new FinFlowStore();

let donutChart = null;
let barChart = null;
let lineChart = null;

function getDateGroupKey(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  }
}

function updateStorageStatus() {
  const badgeText = document.getElementById('storageStatusText');
  if (badgeText) {
    const count = store.transactions.length;
    badgeText.textContent = `${count} Saved`;
  }
}

// --- App Initialization & Tab Controller ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  populateCategorySelects();
  setupEventListeners();
  renderAll();
});

function initTheme() {
  if (store.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  store.theme = isDark ? 'dark' : 'light';
  localStorage.setItem('finflow_theme', store.theme);
  updateCharts();
}

// --- Segmented Pill Navigation Tab Controller ---
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(targetTab) {
    tabButtons.forEach(btn => {
      if (btn.dataset.tab === targetTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabContents.forEach(content => {
      if (content.id === `tab-${targetTab}`) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });

    if (targetTab === 'analytics') {
      setTimeout(() => updateCharts(), 50);
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Cross-link buttons (e.g. "View All ->")
  document.querySelectorAll('.switch-to-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });
}

function populateCategorySelects() {
  const categoryFilterSelect = document.getElementById('categoryFilter');
  const currentType = document.getElementById('txType').value;

  categoryFilterSelect.innerHTML = '<option value="all">All Categories</option>';
  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = `${cat.name} (${cat.type})`;
    categoryFilterSelect.appendChild(opt);
  });

  updateModalCategoryOptions(currentType);
}

function updateModalCategoryOptions(type) {
  const txCategorySelect = document.getElementById('txCategory');
  txCategorySelect.innerHTML = '';

  Object.entries(CATEGORIES)
    .filter(([_, cat]) => cat.type === type)
    .forEach(([key, cat]) => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = cat.name;
      txCategorySelect.appendChild(opt);
    });
}

function setupEventListeners() {
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

  const modal = document.getElementById('transactionModal');
  const openModalBtn = document.getElementById('openAddModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const form = document.getElementById('transactionForm');

  openModalBtn.addEventListener('click', () => openTransactionModal());
  closeModalBtn.addEventListener('click', () => modal.close());
  cancelModalBtn.addEventListener('click', () => modal.close());

  // Quick Action Buttons on Balance Card
  const quickIncomeBtn = document.getElementById('quickAddIncomeBtn');
  if (quickIncomeBtn) {
    quickIncomeBtn.addEventListener('click', () => {
      openTransactionModal();
      document.getElementById('typeIncomeBtn').click();
    });
  }

  const quickExpenseBtn = document.getElementById('quickAddExpenseBtn');
  if (quickExpenseBtn) {
    quickExpenseBtn.addEventListener('click', () => {
      openTransactionModal();
      document.getElementById('typeExpenseBtn').click();
    });
  }

  document.getElementById('emptyStateAddBtn').addEventListener('click', () => openTransactionModal());

  const typeExpenseBtn = document.getElementById('typeExpenseBtn');
  const typeIncomeBtn = document.getElementById('typeIncomeBtn');
  const txTypeInput = document.getElementById('txType');

  typeExpenseBtn.addEventListener('click', () => {
    txTypeInput.value = 'expense';
    typeExpenseBtn.className = 'py-2 rounded-lg transition-all bg-white dark:bg-[#27272a] text-rose-500 shadow-sm';
    typeIncomeBtn.className = 'py-2 rounded-lg transition-all text-slate-500 hover:text-emerald-500';
    updateModalCategoryOptions('expense');
  });

  typeIncomeBtn.addEventListener('click', () => {
    txTypeInput.value = 'income';
    typeIncomeBtn.className = 'py-2 rounded-lg transition-all bg-white dark:bg-[#27272a] text-emerald-500 shadow-sm';
    typeExpenseBtn.className = 'py-2 rounded-lg transition-all text-slate-500 hover:text-rose-500';
    updateModalCategoryOptions('income');
  });

  document.getElementById('txAmount').addEventListener('input', (e) => {
    const val = Number(e.target.value);
    const wordsSpan = document.getElementById('amountInWords');
    if (val > 0) {
      wordsSpan.textContent = formatIndianWords(val);
    } else {
      wordsSpan.textContent = '';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('txId').value;
    const type = document.getElementById('txType').value;
    const amount = parseFloat(document.getElementById('txAmount').value);
    const title = document.getElementById('txTitle').value.trim();
    const category = document.getElementById('txCategory').value;
    const paymentMethod = document.getElementById('txPaymentMethod').value;
    const dateTime = document.getElementById('txDateTime').value;
    const notes = document.getElementById('txNotes').value.trim();

    if (!amount || amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }

    const txData = { type, amount, title, category, paymentMethod, dateTime, notes };

    if (id) {
      store.updateTransaction(id, txData);
      showToast('Transaction updated', 'success');
    } else {
      store.addTransaction(txData);
      showToast('Transaction added', 'success');
    }

    modal.close();
    renderAll();
  });

  // Clear All Data
  const clearBtn = document.getElementById('clearAllDataBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const confirmClear = confirm('Are you sure you want to clear all data and start with an empty slate for your personal records?');
      if (confirmClear) {
        store.clearAllData();
        renderAll();
        showToast('Clean slate active. Ready for your personal records.', 'info');
      }
    });
  }

  // Budget Modal
  const budgetModal = document.getElementById('budgetModal');
  const quickEditBudgetBtn = document.getElementById('quickEditBudgetBtn');
  const closeBudgetModalBtn = document.getElementById('closeBudgetModalBtn');
  const cancelBudgetBtn = document.getElementById('cancelBudgetBtn');
  const budgetForm = document.getElementById('budgetForm');

  const openBudgetModal = () => {
    populateBudgetInputs();
    budgetModal.showModal();
    lucide.createIcons();
  };

  if (quickEditBudgetBtn) quickEditBudgetBtn.addEventListener('click', openBudgetModal);
  if (closeBudgetModalBtn) closeBudgetModalBtn.addEventListener('click', () => budgetModal.close());
  if (cancelBudgetBtn) cancelBudgetBtn.addEventListener('click', () => budgetModal.close());

  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBudgets = {};
    Object.keys(CATEGORIES).filter(k => CATEGORIES[k].type === 'expense').forEach(k => {
      const input = document.getElementById(`budget_${k}`);
      if (input) {
        newBudgets[k] = parseFloat(input.value) || 0;
      }
    });
    store.saveBudgets(newBudgets);
    budgetModal.close();
    renderBudgetSection();
    showToast('Budgets updated', 'success');
  });

  // Search & Filters
  document.getElementById('searchInput').addEventListener('input', (e) => {
    store.filters.search = e.target.value;
    renderTransactions();
  });

  document.getElementById('typeFilter').addEventListener('change', (e) => {
    store.filters.type = e.target.value;
    renderTransactions();
  });

  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    store.filters.category = e.target.value;
    renderTransactions();
  });

  document.getElementById('dateFilter').addEventListener('change', (e) => {
    store.filters.date = e.target.value;
    renderTransactions();
  });

  document.getElementById('sortFilter').addEventListener('change', (e) => {
    store.filters.sort = e.target.value;
    renderTransactions();
  });

  document.getElementById('resetFiltersBtn').addEventListener('click', () => {
    store.filters = { search: '', type: 'all', category: 'all', date: 'all', sort: 'date_desc' };
    document.getElementById('searchInput').value = '';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('dateFilter').value = 'all';
    document.getElementById('sortFilter').value = 'date_desc';
    renderTransactions();
    showToast('Filters reset', 'info');
  });

  document.getElementById('donutPeriodFilter').addEventListener('change', () => {
    updateDonutChart();
  });

  document.getElementById('exportCsvBtn').addEventListener('click', exportToCSV);

  document.getElementById('dismissAlertBtn').addEventListener('click', () => {
    document.getElementById('overspendAlertBanner').classList.add('hidden');
  });
}

function openTransactionModal(editTx = null) {
  const modal = document.getElementById('transactionModal');
  const form = document.getElementById('transactionForm');
  form.reset();

  const titleEl = document.getElementById('modalTitle');
  const idInput = document.getElementById('txId');
  const typeInput = document.getElementById('txType');
  const typeExpenseBtn = document.getElementById('typeExpenseBtn');
  const typeIncomeBtn = document.getElementById('typeIncomeBtn');
  const amountInput = document.getElementById('txAmount');
  const titleInput = document.getElementById('txTitle');
  const categorySelect = document.getElementById('txCategory');
  const paymentSelect = document.getElementById('txPaymentMethod');
  const dateTimeInput = document.getElementById('txDateTime');
  const notesInput = document.getElementById('txNotes');

  if (editTx) {
    titleEl.textContent = 'Edit Transaction';
    idInput.value = editTx.id;
    typeInput.value = editTx.type;
    amountInput.value = editTx.amount;
    titleInput.value = editTx.title;
    paymentSelect.value = editTx.paymentMethod || 'UPI';
    dateTimeInput.value = editTx.dateTime;
    notesInput.value = editTx.notes || '';

    if (editTx.type === 'income') {
      typeIncomeBtn.className = 'py-2 rounded-lg transition-all bg-white dark:bg-[#27272a] text-emerald-500 shadow-sm';
      typeExpenseBtn.className = 'py-2 rounded-lg transition-all text-slate-500 hover:text-rose-500';
    } else {
      typeExpenseBtn.className = 'py-2 rounded-lg transition-all bg-white dark:bg-[#27272a] text-rose-500 shadow-sm';
      typeIncomeBtn.className = 'py-2 rounded-lg transition-all text-slate-500 hover:text-emerald-500';
    }
    updateModalCategoryOptions(editTx.type);
    categorySelect.value = editTx.category;
    document.getElementById('amountInWords').textContent = formatIndianWords(editTx.amount);
  } else {
    titleEl.textContent = 'Add Transaction';
    idInput.value = '';
    typeInput.value = 'expense';
    typeExpenseBtn.className = 'py-2 rounded-lg transition-all bg-white dark:bg-[#27272a] text-rose-500 shadow-sm';
    typeIncomeBtn.className = 'py-2 rounded-lg transition-all text-slate-500 hover:text-emerald-500';
    updateModalCategoryOptions('expense');
    const now = new Date();
    dateTimeInput.value = now.toISOString().slice(0, 16);
    document.getElementById('amountInWords').textContent = '';
  }

  modal.showModal();
  lucide.createIcons();
}

function populateBudgetInputs() {
  const container = document.getElementById('budgetInputsContainer');
  container.innerHTML = '';

  Object.entries(CATEGORIES)
    .filter(([_, cat]) => cat.type === 'expense')
    .forEach(([key, cat]) => {
      const budgetVal = store.budgets[key] || 0;
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between gap-3 p-2 rounded-xl bg-black/5 dark:bg-white/5';
      row.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs" style="background-color: ${cat.color}">
            <i data-lucide="${cat.icon}" class="w-3.5 h-3.5"></i>
          </div>
          <span class="text-xs font-semibold">${cat.name}</span>
        </div>
        <div class="relative w-32">
          <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-500">₹</span>
          <input type="number" id="budget_${key}" min="0" step="500" value="${budgetVal}" class="apple-input text-xs font-bold pl-6 pr-2 py-1.5 rounded-lg w-full outline-none text-right">
        </div>
      `;
      container.appendChild(row);
    });
}

function renderAll() {
  renderKPIs();
  renderBudgetSection();
  renderTransactions();
  renderOverviewWidgets();
  updateCharts();
  updateStorageStatus();
}

function renderKPIs() {
  const metrics = store.getMetrics();

  const totalBalEl = document.getElementById('kpiTotalBalance');
  totalBalEl.textContent = formatINR(metrics.totalBalance);
  if (metrics.totalBalance < 0) {
    totalBalEl.className = 'text-4xl sm:text-5xl font-black tracking-tight text-rose-500';
  } else {
    totalBalEl.className = 'text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white';
  }

  document.getElementById('kpiMonthlyIncome').textContent = formatINR(metrics.monthlyIncome);
  document.getElementById('kpiMonthlyExpense').textContent = formatINR(metrics.monthlyExpense);
  document.getElementById('kpiSavingsRate').textContent = `${metrics.savingsRate}%`;
}

function renderBudgetSection() {
  const grid = document.getElementById('budgetProgressGrid');
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const spentByCategory = {};
  store.transactions.forEach(tx => {
    if (tx.type === 'expense') {
      const d = new Date(tx.dateTime);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        spentByCategory[tx.category] = (spentByCategory[tx.category] || 0) + Number(tx.amount);
      }
    }
  });

  const overspentCategories = [];
  grid.innerHTML = '';

  Object.entries(CATEGORIES)
    .filter(([_, cat]) => cat.type === 'expense')
    .forEach(([key, cat]) => {
      const budget = store.budgets[key] || 0;
      const spent = spentByCategory[key] || 0;
      const percent = budget > 0 ? Math.round((spent / budget) * 100) : 0;

      let statusColor = 'bg-emerald-500';
      let badgeHtml = `<span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">On track</span>`;

      if (percent >= 100) {
        statusColor = 'bg-rose-500';
        badgeHtml = `<span class="text-[10px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">Overspent</span>`;
        overspentCategories.push({ name: cat.name, diff: spent - budget });
      } else if (percent >= 80) {
        statusColor = 'bg-amber-500';
        badgeHtml = `<span class="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Near limit</span>`;
      }

      const card = document.createElement('div');
      card.className = 'apple-card rounded-2xl p-4 space-y-3';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl flex items-center justify-center text-white" style="background-color: ${cat.color}">
              <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
            </div>
            <div>
              <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">${cat.name}</h4>
              <span class="text-[10px] text-slate-400">${percent}% of budget</span>
            </div>
          </div>
          ${badgeHtml}
        </div>
        <div class="space-y-1.5">
          <div class="w-full bg-black/5 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div class="${statusColor} h-1.5 rounded-full transition-all duration-300" style="width: ${Math.min(100, percent)}%"></div>
          </div>
          <div class="flex justify-between text-[11px] text-slate-400">
            <span>Spent: <strong>${formatINR(spent)}</strong></span>
            <span>Limit: ${formatINR(budget)}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

  const alertBanner = document.getElementById('overspendAlertBanner');
  const alertText = document.getElementById('overspendAlertText');
  if (overspentCategories.length > 0) {
    alertBanner.classList.remove('hidden');
    const names = overspentCategories.map(c => `${c.name} (+${formatINR(c.diff)})`).join(', ');
    alertText.textContent = `You have exceeded your monthly limit in: ${names}.`;
  } else {
    alertBanner.classList.add('hidden');
  }

  lucide.createIcons();
}

// Render widgets on the Overview tab (Recent transactions + Budget snapshot)
function renderOverviewWidgets() {
  const recentContainer = document.getElementById('overviewRecentList');
  const budgetContainer = document.getElementById('overviewBudgetList');
  const isDark = document.documentElement.classList.contains('dark');

  // 1. Recent Transactions (Top 5)
  if (recentContainer) {
    recentContainer.innerHTML = '';
    const recent = store.transactions.slice(0, 5);

    if (recent.length === 0) {
      recentContainer.innerHTML = '<div class="text-center text-slate-400 py-6 text-xs">No transactions yet. Click "+ Add Expense" above.</div>';
    } else {
      recent.forEach(tx => {
        const cat = CATEGORIES[tx.category] || { name: tx.category, icon: 'tag', color: '#64748b' };
        const isIncome = tx.type === 'income';
        const relativeTime = getRelativeTime(tx.dateTime);

        const row = document.createElement('div');
        row.className = 'py-3 flex items-center justify-between gap-3';
        row.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 text-xs" style="background-color: ${cat.color}">
              <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
            </div>
            <div class="min-w-0">
              <h4 class="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">${escapeHtml(tx.title)}</h4>
              <p class="text-[11px] text-slate-400">${cat.name} • ${relativeTime} • ${tx.paymentMethod || 'UPI'}</p>
            </div>
          </div>
          <span class="font-bold text-xs shrink-0 ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}">
            ${isIncome ? '+' : '-'}${formatINR(tx.amount)}
          </span>
        `;
        recentContainer.appendChild(row);
      });
    }
  }

  // 2. Budget Snapshot (Top 4)
  if (budgetContainer) {
    budgetContainer.innerHTML = '';
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const spentByCategory = {};
    store.transactions.forEach(tx => {
      if (tx.type === 'expense') {
        const d = new Date(tx.dateTime);
        if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
          spentByCategory[tx.category] = (spentByCategory[tx.category] || 0) + Number(tx.amount);
        }
      }
    });

    const expenseCats = Object.entries(CATEGORIES).filter(([_, cat]) => cat.type === 'expense').slice(0, 4);

    expenseCats.forEach(([key, cat]) => {
      const budget = store.budgets[key] || 0;
      const spent = spentByCategory[key] || 0;
      const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0;
      const barColor = pct >= 100 ? 'bg-rose-500' : (pct >= 80 ? 'bg-amber-500' : 'bg-emerald-500');

      const item = document.createElement('div');
      item.className = 'space-y-1.5';
      item.innerHTML = `
        <div class="flex items-center justify-between text-xs">
          <span class="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background-color: ${cat.color}"></span>
            ${cat.name}
          </span>
          <span class="font-semibold text-slate-900 dark:text-white text-[11px]">${formatINR(spent)} / ${formatINR(budget)}</span>
        </div>
        <div class="w-full bg-black/5 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div class="${barColor} h-1.5 rounded-full transition-all duration-300" style="width: ${Math.min(100, pct)}%"></div>
        </div>
      `;
      budgetContainer.appendChild(item);
    });
  }

  lucide.createIcons();
}

function renderTransactions() {
  const container = document.getElementById('groupedTransactionsContainer');
  const emptyState = document.getElementById('emptyTransactionsState');
  const countSpan = document.getElementById('filteredTxnCount');
  const netTotalSpan = document.getElementById('filteredNetTotal');

  const filtered = store.getFilteredTransactions();
  countSpan.textContent = filtered.length;

  let netFilteredTotal = 0;
  filtered.forEach(tx => {
    netFilteredTotal += (tx.type === 'income' ? 1 : -1) * Number(tx.amount);
  });
  netTotalSpan.textContent = formatINR(netFilteredTotal);
  netTotalSpan.className = netFilteredTotal >= 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-500 font-bold';

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  const groups = {};
  filtered.forEach(tx => {
    const key = getDateGroupKey(tx.dateTime);
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });

  container.innerHTML = '';

  Object.entries(groups).forEach(([groupTitle, txList]) => {
    let groupNet = 0;
    txList.forEach(t => groupNet += (t.type === 'income' ? 1 : -1) * Number(t.amount));

    const groupSection = document.createElement('div');
    groupSection.className = 'space-y-2';

    const groupHeader = document.createElement('div');
    groupHeader.className = 'flex items-center justify-between px-2 text-xs font-semibold text-slate-400';
    groupHeader.innerHTML = `
      <span>${groupTitle}</span>
      <span class="${groupNet >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'} font-medium">
        Net: ${groupNet >= 0 ? '+' : ''}${formatINR(groupNet)}
      </span>
    `;
    groupSection.appendChild(groupHeader);

    const cardGroup = document.createElement('div');
    cardGroup.className = 'apple-card rounded-2xl divide-y divide-black/5 dark:divide-white/5 overflow-hidden';

    txList.forEach(tx => {
      const cat = CATEGORIES[tx.category] || { name: tx.category, icon: 'tag', color: '#64748b' };
      const isIncome = tx.type === 'income';
      const relativeTime = getRelativeTime(tx.dateTime);
      const exactTime = new Date(tx.dateTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

      const item = document.createElement('div');
      item.className = 'apple-tx-row p-3.5 sm:p-4 flex items-center justify-between gap-3 group';
      item.innerHTML = `
        <div class="flex items-center gap-3.5 min-w-0">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 text-sm shadow-sm" style="background-color: ${cat.color}">
            <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
          </div>
          <div class="min-w-0">
            <h4 class="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">${escapeHtml(tx.title)}</h4>
            <p class="text-[11px] text-slate-400 mt-0.5">
              ${cat.name} • ${relativeTime} (${exactTime}) • ${tx.paymentMethod || 'UPI'}
              ${tx.notes ? `<span class="italic text-slate-400"> — ${escapeHtml(tx.notes)}</span>` : ''}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <span class="font-bold text-xs sm:text-sm ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}">
            ${isIncome ? '+' : '-'}${formatINR(tx.amount)}
          </span>

          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="edit-tx-btn p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" data-id="${tx.id}" title="Edit">
              <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
            </button>
            <button class="del-tx-btn p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" data-id="${tx.id}" title="Delete">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;

      item.querySelector('.edit-tx-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openTransactionModal(tx);
      });

      item.querySelector('.del-tx-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Delete "${tx.title}" of ${formatINR(tx.amount)}?`)) {
          store.deleteTransaction(tx.id);
          renderAll();
          showToast('Transaction removed', 'info');
        }
      });

      cardGroup.appendChild(item);
    });

    groupSection.appendChild(cardGroup);
    container.appendChild(groupSection);
  });

  lucide.createIcons();
}

function updateCharts() {
  updateDonutChart();
  updateBarChart();
  updateLineChart();
}

function updateDonutChart() {
  const canvas = document.getElementById('donutChartCanvas');
  if (!canvas) return;
  const period = document.getElementById('donutPeriodFilter').value;
  const centerValEl = document.getElementById('donutCenterValue');
  const legendContainer = document.getElementById('donutLegendContainer');
  const isDark = document.documentElement.classList.contains('dark');

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const categoryTotals = {};
  let totalExpense = 0;

  store.transactions.forEach(tx => {
    if (tx.type === 'expense') {
      const d = new Date(tx.dateTime);
      if (period === 'all' || (d.getMonth() === currentMonth && d.getFullYear() === currentYear)) {
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + Number(tx.amount);
        totalExpense += Number(tx.amount);
      }
    }
  });

  centerValEl.textContent = `Total: ${formatINR(totalExpense)}`;

  const labels = [];
  const data = [];
  const bgColors = [];

  Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .forEach(([catKey, total]) => {
      const cat = CATEGORIES[catKey] || { name: catKey, color: '#94a3b8' };
      labels.push(cat.name);
      data.push(total);
      bgColors.push(cat.color);
    });

  legendContainer.innerHTML = '';
  if (labels.length === 0) {
    legendContainer.innerHTML = '<div class="col-span-2 text-center text-slate-400 py-2">No expenses recorded</div>';
  } else {
    labels.forEach((label, idx) => {
      const val = data[idx];
      const pct = totalExpense > 0 ? Math.round((val / totalExpense) * 100) : 0;
      const col = bgColors[idx];
      const item = document.createElement('div');
      item.className = 'flex items-center justify-between gap-1 text-[11px]';
      item.innerHTML = `
        <div class="flex items-center gap-1.5 truncate">
          <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${col}"></span>
          <span class="truncate text-slate-600 dark:text-slate-300 font-medium">${label}</span>
        </div>
        <span class="font-bold text-slate-900 dark:text-slate-100 shrink-0">${pct}%</span>
      `;
      legendContainer.appendChild(item);
    });
  }

  if (donutChart) {
    donutChart.destroy();
  }

  donutChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: labels.length ? labels : ['No Expenses'],
      datasets: [{
        data: data.length ? data : [1],
        backgroundColor: data.length ? bgColors : ['#e2e8f0'],
        borderWidth: 2,
        borderColor: isDark ? '#141417' : '#ffffff',
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '76%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (!labels.length) return ' No expenses';
              const label = context.label || '';
              const val = context.raw || 0;
              const pct = totalExpense > 0 ? Math.round((val / totalExpense) * 100) : 0;
              return ` ${label}: ${formatINR(val)} (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

function updateBarChart() {
  const canvas = document.getElementById('barChartCanvas');
  if (!canvas) return;
  const isDark = document.documentElement.classList.contains('dark');

  const months = [];
  const monthLabels = [];
  const incomeData = [];
  const expenseData = [];

  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ month: d.getMonth(), year: d.getFullYear() });
    monthLabels.push(d.toLocaleDateString('en-IN', { month: 'short' }));
    incomeData.push(0);
    expenseData.push(0);
  }

  store.transactions.forEach(tx => {
    const d = new Date(tx.dateTime);
    const m = d.getMonth();
    const y = d.getFullYear();
    const idx = months.findIndex(item => item.month === m && item.year === y);
    if (idx !== -1) {
      if (tx.type === 'income') {
        incomeData[idx] += Number(tx.amount);
      } else {
        expenseData[idx] += Number(tx.amount);
      }
    }
  });

  if (barChart) {
    barChart.destroy();
  }

  const textColor = isDark ? '#a1a1aa' : '#71717a';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  barChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: monthLabels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: '#10b981',
          borderRadius: 6,
          barPercentage: 0.55,
          categoryPercentage: 0.65
        },
        {
          label: 'Expense',
          data: expenseData,
          backgroundColor: '#f43f5e',
          borderRadius: 6,
          barPercentage: 0.55,
          categoryPercentage: 0.65
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ` ${context.dataset.label}: ${formatINR(context.raw)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { size: 11 } }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { size: 10 },
            callback: function(val) {
              return val >= 1000 ? `₹${(val / 1000).toFixed(0)}k` : `₹${val}`;
            }
          }
        }
      }
    }
  });
}

function updateLineChart() {
  const canvas = document.getElementById('lineChartCanvas');
  if (!canvas) return;
  const isDark = document.documentElement.classList.contains('dark');

  const labels = [];
  const balanceData = [];

  const now = new Date();
  const days = 30;

  const thirtyDaysAgo = new Date(now.getTime() - days * 86400000);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  let runningBalance = 0;
  store.transactions.forEach(tx => {
    const d = new Date(tx.dateTime);
    if (d < thirtyDaysAgo) {
      runningBalance += (tx.type === 'income' ? 1 : -1) * Number(tx.amount);
    }
  });

  for (let i = days - 1; i >= 0; i--) {
    const dayStart = new Date(now.getTime() - i * 86400000);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart.getTime() + 86400000);

    store.transactions.forEach(tx => {
      const d = new Date(tx.dateTime);
      if (d >= dayStart && d < dayEnd) {
        runningBalance += (tx.type === 'income' ? 1 : -1) * Number(tx.amount);
      }
    });

    labels.push(dayStart.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));
    balanceData.push(runningBalance);
  }

  if (lineChart) {
    lineChart.destroy();
  }

  const textColor = isDark ? '#a1a1aa' : '#71717a';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 240);
  gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
  gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  lineChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Net Balance',
        data: balanceData,
        borderColor: '#10b981',
        borderWidth: 2,
        backgroundColor: gradient,
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#10b981'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ` Balance: ${formatINR(context.raw)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { size: 10 }, maxTicksLimit: 6 }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { size: 10 },
            callback: function(val) {
              return val >= 100000 ? `₹${(val / 100000).toFixed(1)}L` : (val >= 1000 ? `₹${(val / 1000).toFixed(0)}k` : `₹${val}`);
            }
          }
        }
      }
    }
  });
}

function exportToCSV() {
  const transactions = store.getFilteredTransactions();
  if (transactions.length === 0) {
    showToast('No transactions to export', 'error');
    return;
  }

  const headers = ['Transaction ID', 'Date', 'Time', 'Type', 'Category', 'Title', 'Amount (INR)', 'Payment Method', 'Notes'];
  const rows = transactions.map(tx => {
    const d = new Date(tx.dateTime);
    const dateStr = d.toLocaleDateString('en-IN');
    const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const catName = CATEGORIES[tx.category]?.name || tx.category;

    return [
      `"${tx.id}"`,
      `"${dateStr}"`,
      `"${timeStr}"`,
      `"${tx.type.toUpperCase()}"`,
      `"${catName}"`,
      `"${(tx.title || '').replace(/"/g, '""')}"`,
      tx.amount,
      `"${tx.paymentMethod || 'UPI'}"`,
      `"${(tx.notes || '').replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  const nowStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `FinFlow_Transactions_${nowStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Exported ${transactions.length} transactions`, 'success');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');

  const bgColors = {
    success: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md',
    error: 'bg-rose-500 text-white shadow-md',
    info: 'bg-slate-800 text-white shadow-md'
  };

  toast.className = `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition-all duration-200 transform translate-y-2 opacity-0 pointer-events-auto ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
