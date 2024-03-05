<script setup>
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
		<p class="sr-only">Filter jobs by tags</p>

		<input
			required
			type="search"
			inputmode="search"
			list="job_tags"
			maxlength="15"
			ref="tagInput"
			title="Filter jobs by tags"
			placeholder="Divide tags with 'space'"
			@keypress.space.enter.prevent="addNewTag($event.target.value)"
			class="h-inherit w-[184px] rounded border-3 border-solid border-steel bg-white pe-1 ps-2 caret-darkCyan placeholder:-translate-y-0.5 focus:border-darkCyan lg:px-2 lg:pt-[3px] lg:placeholder:translate-y-0" />

		<datalist id="job_tags">
			<template v-for="tag in sortedTags" :key="tag">
				<option v-if="!jobsStore.activeTags.has(tag)" :value="tag"></option>
			</template>
		</datalist>
	</label>
</template>
