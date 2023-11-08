<script setup>
	import { inject } from 'vue';
	import TheMain from '@/components/TheMain.vue';
	import TheHeader from '@/components/TheHeader.vue';

	const jobs = inject('jobs');
	const jobTags = jobs.reduce((previousTags, currentJob) => [...previousTags, ...currentJob.tags], []);
	const uniqueJobTags = new Set(jobTags);
</script>

<template>
	<TheHeader :tags="uniqueJobTags" />

	<TheMain :jobs="jobs" />
</template>
