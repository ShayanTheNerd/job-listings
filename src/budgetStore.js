import { defineStore, acceptHMRUpdate } from 'pinia';

export const useBudgetStore = defineStore('budgetStore', {
	persist: true,
	state: () => ({
		incomes: [],
		expenses: [],
		transitionsConfig: Object.freeze({ transition: [0.55, 0, 0.1, 1], duration: 650 }),
	}),
	getters: {
		balance() {
			const totalIncomes = this.getTotal('incomes');
			const totalExpenses = this.getTotal('expenses');

			return totalIncomes - totalExpenses;
		},
		getTotal() {
			return function (accountType) {
				return this[accountType].reduce((previousValue, currentItem) => previousValue + currentItem.value, 0);
			};
		},
		expensesPercentage() {
			const totalIncomes = this.getTotal('incomes');
			const totalExpenses = this.getTotal('expenses');

			return Math.round((totalExpenses / totalIncomes) * 100) || 0;
		},
	},
	actions: {
		addItem(item) {
			this[item.type].push(item);
		},
		deleteItem(item) {
			const items = this[item.type];
			const itemIndex = items.indexOf(item);

			if (itemIndex !== -1) items.splice(itemIndex, 1);
		},
	},
});

// Enable HMR
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useBudgetStore, import.meta.hot));
