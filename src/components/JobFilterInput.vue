<script setup>
	import { computed, ref } from 'vue';
	import { useJobsStore } from '@/stores/jobsStore.js';

	const jobsStore = useJobsStore();
	const sortedTags = computed(() => [...jobsStore.tags].sort());
	const tagInput = ref();

	function addNewTag(newTag) {
		const newTagIsValid = jobsStore.addTag(newTag);

		if (!newTagIsValid) return;

		tagInput.value.value = '';
		tagInput.value.focus();
	}

	defineExpose({ focus: () => tagInput.value.focus() });
</script>

<template>
	<label class="relative mx-0.5 my-1.5 inline-block h-9 md:order-last">
		<input
			required
			type="search"
			inputmode="search"
			list="job_tags"
			maxlength="15"
			ref="tagInput"
			title="Press space or enter to add a new tag"
			@keypress.space.enter.prevent="addNewTag($event.target.value)"
			class="peer h-inherit w-44 rounded px-2 pt-1 outline outline-3 outline-steel valid:outline-darkCyan focus:outline-darkCyan" />
		<p
			class="absolute bottom-1/2 left-2 translate-y-1/2 cursor-text bg-white px-1 !leading-3 text-steel transition-all ease-linear peer-valid:bottom-full peer-valid:text-sm peer-valid:text-darkCyan peer-focus:bottom-full peer-focus:text-sm peer-focus:text-darkCyan">
			Filter jobs by tags
		</p>

		<datalist id="job_tags">
			<template v-for="tag in sortedTags" :key="tag">
				<option v-if="!jobsStore.activeTags.has(tag)" :value="tag"></option>
			</template>
		</datalist>
	</label>
</template>
