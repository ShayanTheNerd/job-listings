<script setup>
	import { computed } from 'vue';
	import { useBudgetStore } from '../budgetStore.js';
	import tailwindConfigFile from '../../tailwind.config.js';
	import resolveTailwindConfig from 'tailwindcss/resolveConfig';
	import { useFormatNumber } from '@/composables/useFormatNumber.mjs';

	const props = defineProps({
		type: {
			type: String,
			required: true,
		},
	});

	const { formatNumber: formatCurrency } = useFormatNumber();

	/* prettier-ignore */
	const { theme: { colors: tailwindColors, } } = resolveTailwindConfig(tailwindConfigFile);
	const budgetStore = useBudgetStore();
	const color = computed(() => tailwindColors[props.type === 'incomes' ? 'emerald' : 'red'][500]);
	const colorDim = computed(() => tailwindColors[props.type === 'incomes' ? 'emerald' : 'red'][600]);
	const transitionDuration = computed(() => `${budgetStore.transitionsConfig.duration}ms`);
	const transitionTimingFunction = computed(() => budgetStore.transitionsConfig.transition.join(', '));
</script>

<template>
	<details open @click="$event.preventDefault()" class="relative grow space-y-1 overflow-hidden lg:w-1/2">
		<summary
			tabindex="-1"
			class="flex list-none items-center justify-between px-1 lg:bg-slate-900 [&::-webkit-details-marker]:hidden">
			<strong class="pb-2 text-xl font-bold capitalize tracking-wide text-[--color] lg:pb-3.5 lg:text-2xl">
				{{ type }}
			</strong>
		</summary>

		<transition-group appear tag="ul" name="fade" class="relative divide-y divide-slate-600">
			<li
				v-for="item in budgetStore[type]"
				:key="item"
				class="flex w-full items-center justify-between gap-4 overflow-x-auto bg-slate-800 p-2.5 first-of-type:rounded-t-md last-of-type:rounded-b-md sm:gap-6 lg:px-3.5 lg:py-3">
				<!-- Item name -->
				<p class="w-1/2 shrink-0 hyphens-auto break-words tracking-wide lg:font-medium">{{ item.name }}</p>

				<!-- Item value -->
				<strong
					class="w-full overflow-x-clip text-ellipsis text-end font-medium text-[--color] sm:text-lg lg:text-xl lg:font-bold">
					{{ formatCurrency(item.value) }}
				</strong>

				<!-- Item delete button -->
				<button
					type="button"
					title="Delete item"
					@click="budgetStore.deleteItem(item)"
					class="group h-9 w-9 flex-none rounded-full transition-all focus-visible:outline-offset-[3px] active:scale-90 lg:h-10 lg:w-10">
					<svg
						class="h-inherit w-inherit fill-[--color] transition-all group-hover:fill-[--color-dim] group-focus-visible:fill-[--color-dim]">
						<use href="/icons.svg#x_mark" />
					</svg>
				</button>
			</li>
		</transition-group>
	</details>
</template>

<style scoped>
	details {
		--color: v-bind(color);
		--color-dim: v-bind(colorDim);
	}

	/* Items animation */
	.fade-move,
	.fade-enter-active,
	.fade-leave-active {
		transition: all v-bind(transitionDuration) cubic-bezier(v-bind(transitionTimingFunction));
	}
	.fade-enter-from,
	.fade-leave-to {
		@apply opacity-0;
		transform: scaleY(0.1) translate(30px, 0);
	}
	.fade-leave-active {
		@apply absolute;
	}
</style>
