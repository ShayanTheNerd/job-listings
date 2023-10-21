<script setup>
	import { ref } from 'vue';

	const props = defineProps({
		modelValue: {
			required: true,
			type: [String, Number, null],
			default: '',
		},
	});

	const input = ref();
	const focus = () => input.value.focus();
	defineExpose({ focus });
</script>

<template>
	<input
		ref="input"
		:value="modelValue"
		required
		@input="$emit('update:modelValue', $event.target.value)"
		class="h-9 w-full rounded-md bg-slate-100 px-2.5 text-slate-900 focus:outline focus:outline-3 focus:outline-[--color] sm:h-11 lg:text-lg" />
</template>
