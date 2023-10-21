<script setup>
	import { storeToRefs } from 'pinia';
	import { useTransition } from '@vueuse/core';
	import { useBudgetStore } from '../budgetStore.js';
	import { useDate } from '@/composables/useDate.mjs';
	import BudgetInfoItemCard from './BudgetInfoItemCard.vue';
	import { useFormatNumber } from '@/composables/useFormatNumber.mjs';

	const budgetStore = useBudgetStore();
	const { currentMachineDate, currentDate } = useDate();
	const { balance, expensesPercentage } = storeToRefs(budgetStore);
	const balanceAnimated = useTransition(balance, budgetStore.transitionsConfig);

	const { formatNumber: formatCurrency } = useFormatNumber({ signDisplay: 'exceptZero' });
</script>

<template>
	<section class="mx-3 !mt-0 text-center text-slate-100">
		<p v-once class="text-sm lg:text-base">
			Available Budget on
			<time :datetime="currentMachineDate">{{ currentDate }}</time>
		</p>

		<!-- Balance -->
		<strong
			:class="balanceAnimated === 0 ? 'text-slate-100' : balanceAnimated > 0 ? 'text-emerald-500' : 'text-red-500'"
			class="mb-6 mt-4 inline-block w-full max-w-sm overflow-x-clip text-ellipsis text-4xl font-medium leading-8 tracking-wide transition-colors sm:max-w-screen-sm">
			{{ formatCurrency(balanceAnimated) }}
		</strong>

		<!-- The total amount of incomes and expenses -->
		<div class="mx-auto flex max-w-sm flex-col gap-3.5 sm:max-w-2xl sm:flex-row sm:items-center sm:justify-center">
			<BudgetInfoItemCard type="incomes" :value="budgetStore.getTotal('incomes')" />

			<BudgetInfoItemCard type="expenses" :value="budgetStore.getTotal('expenses')" :percentage="expensesPercentage" />
		</div>
	</section>
</template>
