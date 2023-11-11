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

			<div class="space-y-3 lg:space-y-2">
				<div class="flex items-center gap-2">
					<strong class="text-darkCyan">{{ company }}</strong>

					<ul v-if="isNew || isFeatured" class="flex scale-90 gap-2 text-sm font-bold text-whiteSmoke lg:tracking-wide">
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
					<li v-for="detail in [postedAt, contract, location]">{{ detail }}</li>
				</ul>
			</div>
		</div>

		<hr class="my-4 border border-charcoal/20 lg:hidden" />

		<menu class="flex flex-wrap gap-4 text-sm lg:w-1/2 lg:justify-end">
			<TagTablet v-for="tag in tags" :key="tag" :tag="tag" />
		</menu>
	</li>
</template>
