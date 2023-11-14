<script setup>
	import { storeToRefs } from 'pinia';
	import { useJobsStore } from '@/stores/jobsStore.js';
	import JobCard from '@/components/JobCard.vue';

	const jobsStore = useJobsStore();
	const { filteredJobs } = storeToRefs(jobsStore);
</script>

<template>
	<main
		v-animate
		tabindex="-1"
		class="lg:scrollbar-stable-both overflow-x-hidden scroll-smooth pb-6 pt-44 sm:pt-32 md:pt-28 lg:mx-1.5 lg:h-px lg:overflow-y-auto lg:pt-24">
		<nav v-if="filteredJobs.length" class="relative mx-auto w-88% max-w-screen-lg">
			<ul v-animate class="flex flex-col gap-12 lg:gap-6">
				<JobCard v-for="job in filteredJobs" :key="job.id" :job="job" />
			</ul>
		</nav>

		<p v-else class="w-full text-center text-3xl font-bold tracking-wide text-darkCyan md:mt-10 md:text-4xl">
			No jobs found :(
		</p>
	</main>
</template>

<style scoped>
	main {
		min-height: calc(100vh - theme('spacing.36'));
	}

	@supports (scrollbar-gutter: stable both-edges) {
		nav {
			@apply lg:!w-[90.4%];
		}
	}
</style>
