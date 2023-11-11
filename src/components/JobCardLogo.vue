<script setup>
	const props = defineProps({
		logo: {
			required: true,
			type: String,
		},
		company: {
			required: true,
			type: String,
		},
	});
</script>

<template>
	<figure class="-mb-6 inline-block -translate-y-1/2 overflow-hidden rounded-full shadow-sm lg:mb-0 lg:translate-y-0">
		<img :src="`/images/logos/${logo}`" :alt="`${company} logo`" width="60" height="60" class="w-14 lg:w-20" />
	</figure>
</template>
