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
	<li class="flex h-8 min-w-max items-center overflow-hidden rounded shadow-sm">
		<span
			class="flex h-full grow items-center justify-center bg-whiteSmoke px-2.5 pt-0.5 text-center text-sm font-bold leading-10 tracking-wide text-darkCyan">
			{{ tag }}
		</span>

		<button
			type="button"
			title="Delete tag"
			@click="jobsStore.deleteTag(tag)"
			class="flex h-full w-8 items-center justify-center bg-darkCyan transition-colors hover:bg-charcoal focus-visible:bg-charcoal">
			<svg aria-hidden="true" viewBox="0 0 13.44 13.44" class="h-3.5 w-3.5 fill-white">
				<path
					fill-rule="evenodd"
					d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z" />
			</svg>
		</button>
	</li>
</template>
