import { ref, computed, watch } from 'vue';
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

		if (activeTags.value.size) {
			relevantJobs = jobs.value.filter(job => [...activeTags.value].every(activeTag => job.tags.includes(activeTag)));
		}
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
	function toggleTag(tag) {
		activeTags.value.has(tag) ? deleteTag(tag) : addTag(tag);
	}
	function deleteAllTags() {
		activeTags.value.clear();
	}

	/* Watchers */
	watch(activeTags, () => document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' }), { deep: true });

	return {
		jobs,
		activeTags,
		tags,
		filteredJobs,
		addTag,
		toggleTag,
		deleteTag,
		deleteAllTags,
	};
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useJobsStore, import.meta.hot));
