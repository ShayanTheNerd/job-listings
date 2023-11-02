<script setup>
	import { onMounted, ref } from 'vue';

	const tags = ref(new Set(['Frontend', 'CSS', 'JavaScript']));
	const newTag = ref('');
	const tagInput = ref();

	function deleteTag(event) {
		const tagName = event.target.closest('li').querySelector('span').textContent;

		tags.value.delete(tagName);
	}

	function addNewTag() {
		if (!newTag.value || tags.value.has(newTag.value)) return;

		tags.value.add(newTag.value);
		newTag.value = '';
		tagInput.value.focus();
	}

	onMounted(() => tagInput.value.focus());
</script>

<template>
	<header class="flex h-36 bg-darkCyan lg:!bg-cover lg:!bg-center">
		<h1 class="sr-only">Job Listings</h1>

		<search
			class="mx-auto mt-auto w-[88%] max-w-screen-lg translate-y-1/2 rounded-md bg-white p-5 shadow-2xl shadow-darkCyan/30 lg:px-9 lg:py-4">
			<form
				@submit="$event.preventDefault()"
				@reset="tags.clear(), tagInput.focus()"
				class="flex items-center justify-between gap-4 overflow-x-auto">
				<fieldset>
					<legend class="sr-only">Search for jobs</legend>

					<output class="flex flex-wrap items-center gap-2">
						<label class="relative mx-0.5 my-1.5 inline-block h-9 md:order-last md:hidden">
							<input
								required
								type="search"
								list="job_tags"
								title="Separate tags with spaces"
								maxlength="25"
								@keypress.space.enter.prevent="addNewTag($event)"
								v-model.trim="newTag"
								ref="tagInput"
								class="peer h-inherit w-44 rounded-md px-2 pt-1 outline outline-3 outline-steel valid:outline-darkCyan focus:outline-darkCyan" />
							<p
								class="absolute bottom-1/2 left-2 translate-y-1/2 cursor-text bg-white px-1 !leading-3 text-steel transition-all ease-linear peer-valid:bottom-full peer-valid:text-sm peer-valid:text-darkCyan peer-focus:bottom-full peer-focus:text-sm peer-focus:text-darkCyan">
								Filter jobs by tags
							</p>

							<datalist id="job_tags">
								<option value="Vue">Vue</option>
								<option value="CSS">CSS</option>
								<option value="HTML">HTML</option>
								<option value="Tailwind">Tailwind</option>
								<option value="JavaScript">JavaScript</option>
							</datalist>
						</label>

						<menu
							class="flex max-h-20 grow flex-col flex-wrap gap-3.5 overflow-x-auto scroll-smooth rounded-md md:max-h-none md:flex-row md:items-center">
							<li class="hidden md:order-last md:inline-block">
								<label class="relative mx-0.5 my-1.5 inline-block h-9 md:order-last">
									<input
										required
										type="search"
										list="job_tags"
										title="Separate tags with spaces"
										maxlength="25"
										@keypress.space.enter.prevent="addNewTag($event)"
										v-model.trim="newTag"
										ref="tagInput"
										class="peer h-inherit w-44 rounded-md px-2 pt-1 outline outline-3 outline-steel valid:outline-darkCyan focus:outline-darkCyan" />
									<p
										class="absolute bottom-1/2 left-2 translate-y-1/2 cursor-text bg-white px-1 !leading-3 text-steel transition-all ease-linear peer-valid:bottom-full peer-valid:text-sm peer-valid:text-darkCyan peer-focus:bottom-full peer-focus:text-sm peer-focus:text-darkCyan">
										Filter jobs by tags
									</p>

									<datalist id="job_tags">
										<option value="Vue">Vue</option>
										<option value="CSS">CSS</option>
										<option value="HTML">HTML</option>
										<option value="Tailwind">Tailwind</option>
										<option value="JavaScript">JavaScript</option>
									</datalist>
								</label>
							</li>

							<li
								v-for="tag in tags"
								:key="tag"
								class="flex h-8 min-w-max items-center overflow-hidden rounded-md shadow-sm">
								<span
									class="flex h-full grow items-center justify-center bg-whiteSmoke px-2.5 pt-0.5 text-center text-sm font-bold leading-10 tracking-wide text-darkCyan">
									{{ tag }}
								</span>

								<button
									type="button"
									title="Delete tag"
									@click="deleteTag($event)"
									class="flex h-full w-8 items-center justify-center bg-darkCyan transition-colors hover:bg-charcoal focus-visible:bg-charcoal">
									<svg aria-hidden="true" viewBox="0 0 13.44 13.44" class="h-3.5 w-3.5 fill-white">
										<path
											fill-rule="evenodd"
											d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z" />
									</svg>
								</button>
							</li>
						</menu>
					</output>
				</fieldset>

				<button
					type="reset"
					class="font-bold text-steel transition-colors hover:text-darkCyan hover:underline focus-visible:text-darkCyan focus-visible:underline">
					Clear
				</button>
			</form>
		</search>
	</header>
</template>

<style scoped>
	header {
		background-size: 300%;
		background-position: 80% 25%;
		background-image: url('/images/bg-header-mobile.svg');
	}
	@media (min-width: theme('screens.lg')) {
		header {
			background-image: url('/images/bg-header-desktop.svg');
		}
	}
</style>
