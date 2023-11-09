<script setup>
	import { storeToRefs } from 'pinia';
	import { useJobsStore } from '@/jobsStore.js';
	import JobCard from '@/components/JobCard.vue';

	const jobsStore = useJobsStore();
	const { filteredJobs } = storeToRefs(jobsStore);
</script>

<template>
	<main
		class="scrollbar-stable-both h-px overflow-y-auto scroll-smooth bg-lilacWhite pb-6 pt-44 sm:pt-32 md:pt-28 lg:pt-24">
		<nav v-if="filteredJobs" class="mx-auto w-88% max-w-screen-lg">
			<ul class="space-y-12 lg:space-y-6">
				<JobCard v-for="job in filteredJobs" :key="job.id" :job="job" />
			</ul>
		</nav>

		<p v-else class="text-center text-3xl font-bold tracking-wide text-darkCyan md:mt-10 md:text-4xl">
			No jobs found :(
		</p>
	</main>
</template>

<style>
	main {
		min-height: calc(100vh - theme('spacing.36'));
	}

	@media (min-width: theme('screens.lg')) {
		@supports (scrollbar-gutter: stable both-edges) {
			nav {
				width: 90.7% !important;
			}
		}
	}
</style>
