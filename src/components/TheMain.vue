<script setup>
	import JobCard from '@/components/JobCard.vue';
	import { useJobsStore } from '@/stores/jobsStore.js';

	const jobsStore = useJobsStore();
	const { filteredJobs } = storeToRefs(jobsStore);
	const props = defineProps({
		topOffset: {
			required: true,
			type: Number,
		},
	});
	const topOffsetPX = computed(() => `${props.topOffset}px`);
</script>

<template>
	<main
		v-animate
		tabindex="-1"
		class="lg:scrollbar-stable-both overflow-x-hidden scroll-smooth pb-6 lg:mx-1.5 lg:h-px lg:overflow-y-auto">
		<nav v-if="filteredJobs.length" class="relative mx-auto w-88% max-w-screen-lg">
			<ul v-animate class="flex flex-col gap-16 lg:gap-6">
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
		--top-distance: 110px;

		@screen sm {
			--top-distance: 60px;
		}
		@screen lg {
			--top-distance: 30px;
		}

		min-height: calc(100vh - theme('spacing.36'));
		padding-top: calc(v-bind('topOffsetPX') + var(--top-distance));
	}

	@supports (scrollbar-gutter: stable both-edges) {
		nav {
			@apply lg:!w-[90.4%];
		}
	}
</style>
