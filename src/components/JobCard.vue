<script setup>
	import { useJobsStore } from '@/jobsStore.js';

	const jobsStore = useJobsStore();
	const props = defineProps({
		job: {
			required: true,
			type: Object,
		},
	});
	const { company, logo, new: isNew, featured: isFeatured, position, postedAt, contract, location, tags } = props.job;
</script>

<template>
	<li
		:class="isFeatured ? 'border-darkCyan' : 'border-white'"
		class="rounded border-l-4 bg-white px-5 pb-6 pt-0 shadow-xl shadow-darkCyan/10 lg:flex lg:items-center lg:justify-between lg:px-9 lg:py-7">
		<div class="lg:flex lg:items-center lg:gap-5">
			<figure
				class="-mb-6 inline-block -translate-y-1/2 overflow-hidden rounded-full shadow-sm lg:mb-0 lg:translate-y-0">
				<img :src="`/images/logos/${logo}`" :alt="`${company} logo`" width="60" height="60" class="w-14 lg:w-20" />
			</figure>

			<div class="space-y-3 lg:space-y-2">
				<div class="flex items-center gap-2">
					<strong class="text-darkCyan">{{ company }}</strong>

					<ul class="flex scale-90 gap-2 text-sm font-bold text-whiteSmoke lg:tracking-wide">
						<li v-if="isNew" class="rounded-full bg-darkCyan px-2.5 pt-1">NEW!</li>
						<li v-if="isFeatured" class="rounded-full bg-charcoal px-2.5 pt-1">FEATURED</li>
					</ul>
				</div>

				<a
					href="javascript:"
					class="inline-block font-bold transition-all hover:text-darkCyan lg:text-xl lg:tracking-wide">
					{{ position }}
				</a>

				<ul class="divide-x-disc flex min-w-max text-sm text-steel lg:text-base">
					<li v-for="detail in [postedAt, contract, location]">
						{{ detail }}
					</li>
				</ul>
			</div>
		</div>

		<hr class="my-4 border border-charcoal/20 lg:hidden" />

		<menu class="flex w-1/2 flex-wrap justify-end gap-4 text-sm">
			<li v-for="tag in tags" :key="tag">
				<button
					type="button"
					@click="jobsStore.addTag(tag)"
					:class="jobsStore.activeTags.has(tag) ? 'bg-darkCyan text-whiteSmoke' : 'bg-whiteSmoke text-darkCyan'"
					class="rounded px-2 pb-1 pt-1.5 font-bold tracking-wide shadow-sm transition-all focus-within:bg-darkCyan focus-within:text-whiteSmoke hover:bg-darkCyan hover:text-whiteSmoke">
					{{ tag }}
				</button>
			</li>
		</menu>
	</li>
</template>
