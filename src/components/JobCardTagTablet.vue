<script setup>
	import { useJobsStore } from '@/stores/jobsStore.js';

	const jobsStore = useJobsStore();
	const props = defineProps({
		tag: {
			required: true,
			type: String,
		},
	});
</script>

<template>
	<li>
		<button
			type="button"
			@click="jobsStore.toggleTag(tag)"
			:class="jobsStore.activeTags.has(tag) ? 'bg-darkCyan text-whiteSmoke' : 'bg-whiteSmoke text-darkCyan'"
			class="rounded px-2 pb-1 pt-1.5 font-bold tracking-wide shadow-sm transition-all hover:bg-darkCyan hover:text-whiteSmoke focus-visible:bg-darkCyan focus-visible:text-whiteSmoke">
			{{ tag }}
		</button>
	</li>
</template>
