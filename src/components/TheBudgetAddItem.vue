<script setup>
	import { useBudgetStore } from '../budgetStore.js';
	import tailwindConfigFile from '../../tailwind.config.js';
	import { ref, reactive, computed, onMounted } from 'vue';
	import resolveTailwindConfig from 'tailwindcss/resolveConfig';
	import BudgetAddItemInput from '@/components/BudgetAddItemInput.vue';

	/* prettier-ignore */
	const { theme: { colors: tailwindColors } } = resolveTailwindConfig(tailwindConfigFile);
	const item = reactive({ id: crypto.randomUUID(), type: 'incomes', name: '', value: null });
	const color = computed(() => tailwindColors[`${item.type === 'incomes' ? 'emerald' : 'red'}`][500]);
	const colorDim = computed(() => tailwindColors[`${item.type === 'incomes' ? 'emerald' : 'red'}`][600]);
	const itemNameInput = ref();
	const itemValueInput = ref();

	onMounted(() => itemNameInput.value.focus());

	function changeItemType() {
		item.type = item.type === 'incomes' ? 'expenses' : 'incomes';
		!item.name ? itemNameInput.value.focus() : itemValueInput.value.focus();
	}

	function submitItem() {
		useBudgetStore().addItem({ ...item }); // spread the Proxy into a plain object

		// Reset inputs
		item.name = '';
		item.value = null;
		itemNameInput.value.focus();
	}
</script>

<template>
	<section class="flex justify-center bg-slate-900 p-3.5 shadow-[inset_0px_0px_5px_5px_#00000050]">
		<form @submit.prevent="submitItem()" class="mx-auto w-full max-w-sm sm:max-w-2xl">
			<fieldset class="relative flex items-center justify-center">
				<legend class="sr-only">Add or remove item</legend>

				<!-- Item type identifier -->
				<button
					type="button"
					title="Change item type"
					@click="changeItemType()"
					class="group group flex h-9 w-9 items-center justify-center rounded-md border-3 border-[--color] bg-slate-100 p-3 transition-colors hover:border-[--color-dim] focus-visible:border-[--color-dim] focus-visible:outline-none sm:h-11 sm:w-11">
					<svg
						aria-hidden="true"
						class="h-6 w-6 shrink-0 stroke-[--color] transition-colors group-hover:stroke-[--color-dim] group-focus-visible:stroke-[--color-dim] sm:h-7 sm:w-7">
						<use :href="`/icons.svg#${item.type === 'incomes' ? 'plus' : 'minus'}`" />
					</svg>
				</button>

				<div class="me-3.5 ms-4 flex w-full flex-col items-center justify-center gap-3.5 sm:me-2 sm:ms-3 sm:flex-row">
					<!-- Item name -->
					<BudgetAddItemInput
						ref="itemNameInput"
						v-model.trim="item.name"
						type="text"
						placeholder="Item name"
						inputmode="text" />

					<!-- Item value -->
					<BudgetAddItemInput
						ref="itemValueInput"
						v-model.number="item.value"
						type="number"
						placeholder="Item value"
						inputmode="decimal"
						min="1" />
				</div>

				<!-- Submit item button -->
				<button
					ref="submitItemBtn"
					type="submit"
					title="Submit item"
					class="group h-[41px] w-[41px] transition-transform focus-visible:outline-none active:scale-90 sm:h-11 sm:w-11">
					<svg
						aria-hidden="true"
						class="h-inherit w-inherit stroke-[--color] transition-all group-hover:stroke-[--color-dim] group-focus-visible:stroke-[--color-dim]">
						<use href="/icons.svg#check_circle" />
					</svg>
				</button>
			</fieldset>
		</form>
	</section>
</template>

<style scoped>
	fieldset {
		--color: v-bind(color);
		--color-dim: v-bind(colorDim);
	}
</style>
