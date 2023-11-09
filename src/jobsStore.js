import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import useFetchJobs from '@/composables/useFetchJobs.mjs';

const fetchedJobs = Object.freeze(await useFetchJobs('/jobs.json'));

export const useJobsStore = defineStore('jobsStore', () => {
	/* State */
	const jobs = ref(fetchedJobs);
	const activeTags = ref(new Set());

	/* Getters */
	const tags = computed(() => {
		const allTags = jobs.value.reduce((previousTags, currentJob) => [...previousTags, ...currentJob.tags], []);
		const allTagsSorted = allTags.sort();
		const uniqueTags = new Set(allTagsSorted);

		return uniqueTags;
	});
	const filteredJobs = computed(() => {
		let relevantJobs = jobs.value;

		if (activeTags.value.size) relevantJobs = jobs.value.filter(job => job.tags.some(tag => activeTags.value.has(tag)));
		if (!relevantJobs.length) relevantJobs = null;

		return relevantJobs;
	});

	/* Actions */
	function addTag(newTag) {
		if (!newTag || activeTags.value.has(newTag)) return;

		activeTags.value.add(newTag);
		tags.value.delete(newTag);
	}
	function deleteTag(tag) {
		activeTags.value.delete(tag);
		tags.value.add(tag);
	}
	function deleteAllTags() {
		activeTags.value.clear();
	}

	return {
		jobs,
		activeTags,
		tags,
		filteredJobs,
		addTag,
		deleteTag,
		deleteAllTags,
	};
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useJobsStore, import.meta.hot));