<script setup>
	import { onMounted, ref, watch } from 'vue';
	import { useElementSize } from '@vueuse/core';
	import resolveConfig from 'tailwindcss/resolveConfig';
	import tailwindConfigFile from '../../tailwind.config.js';
	import { useJobsStore } from '@/stores/jobsStore.js';
	import JobFilterTag from '@/components/JobFilterTag.vue';
	import JobFilterInput from '@/components/JobFilterInput.vue';

	const jobsStore = useJobsStore();
	const newTagInput = ref();
	const tagsList = ref();
	const { height: tagsListHeight } = useElementSize(tagsList);
	const emit = defineEmits(['searchBoxHeightChange']);

	onMounted(() => {
		/* prettier-ignore */
		const { theme: { screens: { lg: tailwindScreenLG } } } = resolveConfig(tailwindConfigFile);
		const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		if (viewportWidth >= parseFloat(tailwindScreenLG)) newTagInput.value.focus();
	});
	watch(tagsListHeight, newHight => emit('searchBoxHeightChange', newHight));

	function resetSearchForm() {
		jobsStore.deleteAllTags();
		newTagInput.value.focus();
	}
</script>

<template>
	<header class="relative z-20 flex h-36 bg-darkCyan lg:!bg-cover lg:!bg-center">
		<h1 class="sr-only">Job Listings</h1>

		<search
			class="mx-auto mt-auto w-88% max-w-screen-lg translate-y-1/2 rounded bg-white p-5 shadow-2xl shadow-darkCyan/30 lg:px-9 lg:py-4">
			<form
				@reset.prevent="resetSearchForm()"
				class="flex items-center justify-between gap-4 overflow-x-auto overflow-y-hidden">
				<fieldset class="w-full">
					<legend class="sr-only">Search for jobs</legend>

					<output class="relative flex flex-wrap items-center gap-2 sm:gap-3.5">
						<JobFilterInput ref="newTagInput" class="md:hidden" />

						<menu
							v-animate
							ref="tagsList"
							class="flex max-h-20 grow flex-col flex-wrap gap-3.5 overflow-x-auto overflow-y-hidden scroll-smooth rounded md:max-h-none md:flex-row md:items-center">
							<li class="hidden md:order-last md:inline-block">
								<JobFilterInput ref="newTagInput" />
							</li>

							<JobFilterTag v-for="tag in jobsStore.activeTags" :key="tag" :tag="tag" />
						</menu>
					</output>
				</fieldset>

				<button
					type="reset"
					class="font-bold text-steel transition-colors hover:text-darkCyan hover:underline focus-visible:text-darkCyan focus-visible:underline">
					Clear
				</button>
			</form>
		</search>
	</header>
</template>

<style scoped>
	header {
		background-size: 300%;
		background-position: 80% 25%;
		background-image: url('/images/bg-header-mobile.svg');

		@screen lg {
			background-image: url('/images/bg-header-desktop.svg');
		}
	}
</style>
