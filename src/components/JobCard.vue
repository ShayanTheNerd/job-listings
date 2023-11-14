<script setup>
	import { default as CompanyLogo } from '@/components/JobCardLogo.vue';
	import { default as TagTablet } from '@/components/JobCardTagTablet.vue';

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
		v-once
		:class="isFeatured ? 'border-darkCyan' : 'border-white'"
		class="w-full rounded border-l-4 bg-white px-5 pb-6 pt-0 shadow-xl shadow-darkCyan/10 lg:flex lg:items-center lg:justify-between lg:px-9 lg:py-7">
		<div class="lg:flex lg:items-center lg:gap-5">
			<CompanyLogo :logo="logo" :company="company" />

			<div class="space-y-1.5 sm:space-y-2">
				<div class="flex items-center gap-2">
					<strong class="text-lg text-darkCyan">{{ company }}</strong>

					<ul
						v-if="isNew || isFeatured"
						class="mt-1.5 flex scale-90 gap-2 text-sm font-bold text-whiteSmoke lg:tracking-wide">
						<li v-if="isNew" class="rounded-full bg-darkCyan px-3 pb-1 pt-0.5 lg:pb-0 lg:pt-1">NEW!</li>
						<li v-if="isFeatured" class="rounded-full bg-charcoal px-3 pb-1 pt-0.5 lg:pb-0 lg:pt-1">FEATURED</li>
					</ul>
				</div>

				<a href="javascript:" class="inline-block text-xl font-bold transition-all hover:text-darkCyan sm:text-2xl">
					{{ position }}
				</a>

				<ul class="divide-x-disc flex min-w-max text-sm text-steel sm:text-base">
					<li v-for="detail in [postedAt, contract, location]">{{ detail }}</li>
				</ul>
			</div>
		</div>

		<hr class="my-4 border border-charcoal/20 lg:hidden" />

		<menu class="flex flex-wrap gap-4 text-sm lg:w-2/5 lg:justify-end xl:w-1/2">
			<TagTablet v-for="tag in tags" :key="tag" :tag="tag" />
		</menu>
	</li>
</template>
