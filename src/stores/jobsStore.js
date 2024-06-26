import useGetJobs from '@/composables/useGetJobs.mjs';

const jobs = Object.freeze(await useGetJobs());

export const useJobsStore = defineStore('jobsStore', () => {
	/*** State ***/
	const activeTags = ref(new Set());

	/*** Getters ***/
	const tags = computed(() => {
		const allTags = jobs.flatMap(job => job.tags);
		const uniqueTags = new Set(allTags);
		return uniqueTags;
	});
	const filteredJobs = computed(() => {
		if (!activeTags.value.size) return jobs;

		const matchingJobs = jobs.filter(job => [...activeTags.value].every(activeTag => job.tags.includes(activeTag)));
		return matchingJobs;
	});

	/*** Actions ***/
	function addTag(newTag) {
		if (!newTag || activeTags.value.has(newTag)) return false;

		activeTags.value.add(newTag);
		tags.value.delete(newTag);
		return true;
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

	/*** Store API ***/
	return {
		activeTags,
		tags,
		filteredJobs,
		addTag,
		toggleTag,
		deleteTag,
		deleteAllTags,
	};
});

const HMR = import.meta.hot;
if (HMR) HMR.accept(acceptHMRUpdate(useJobsStore, HMR));
