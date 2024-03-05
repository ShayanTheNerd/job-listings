<script setup>
	import TheMain from '@/components/TheMain.vue';
	import TheHeader from '@/components/TheHeader.vue';

	const jobsListTopOffset = ref(0);
</script>

<template>
	<TheHeader @search-box-height-change="newHight => (jobsListTopOffset = newHight)" />
	<TheMain :top-offset="jobsListTopOffset" />
</template>
