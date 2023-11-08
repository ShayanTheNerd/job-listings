<script setup></script>

<template>
	<li
		class="rounded border-l-4 border-white bg-white px-5 pb-6 pt-0 shadow-xl shadow-darkCyan/10 lg:flex lg:items-center lg:justify-between lg:px-9 lg:py-7">
		<div class="lg:flex lg:items-center lg:gap-5">
			<figure
				class="-mb-6 inline-block -translate-y-1/2 overflow-hidden rounded-full shadow-sm lg:mb-0 lg:translate-y-0">
				<img src="/images/logos/photosnap.svg" width="60" height="60" alt="Photosnap logo" class="w-14 lg:w-20" />
			</figure>

			<div class="space-y-3 lg:space-y-2">
				<div class="flex items-center gap-2">
					<strong class="text-darkCyan">Photosnap</strong>

					<ul class="flex scale-90 gap-2 text-sm font-bold uppercase text-whiteSmoke lg:tracking-wide">
						<li class="rounded-full bg-darkCyan px-2.5 pt-1">new!</li>
						<li class="rounded-full bg-charcoal px-2.5 pt-1">featured</li>
					</ul>
				</div>

				<a
					href="javascript:"
					class="inline-block font-bold transition-all hover:text-darkCyan lg:text-xl lg:tracking-wide">
					Senior Frontend Developer
				</a>

				<ul class="divide-x-disc flex text-steel">
					<li v-for="item in ['1d ago', 'Full Time', 'USA only']">
						{{ item }}
					</li>
				</ul>
			</div>
		</div>

		<hr class="my-4 border border-charcoal/20 lg:hidden" />

		<menu class="flex flex-wrap gap-4 text-sm">
			<li class="" v-for="number in 4" :key="number">
				<button
					type="button"
					class="rounded bg-whiteSmoke px-2 pb-1 pt-1.5 font-bold tracking-wide text-darkCyan shadow-sm transition-all focus-within:bg-darkCyan focus-within:text-whiteSmoke hover:bg-darkCyan hover:text-whiteSmoke">
					Frontend
				</button>
			</li>
		</menu>
	</li>
</template>
