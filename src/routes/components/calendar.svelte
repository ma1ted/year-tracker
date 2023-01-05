<script lang="ts">
	import { onMount } from "svelte";
	import { selectedDay } from "$lib/stores";
	import { isPastDay, isToday, daysInMonth } from "$lib/date-utils";
	import DayModal from "./daymodal.svelte";

	import { page } from "$app/stores";
	const days = $page.data.days;

	export let data: any;

	function patch() {
		fetch($page.url.origin + "/api/day", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "GitHub " + $page.data.session?.access_token
			},
			body: JSON.stringify({
				access_token: "test token!"
			})
		});
	}

	function getActivityValues(day: number, month: number) {
		fetch($page.url.origin + "/api/day", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "GitHub " + $page.data.session?.access_token
			},
			body: JSON.stringify({ day, month })
		});
	}

	let locale: string, formatter: Intl.DateTimeFormat;
	onMount(() => {
		locale = window.navigator.languages ? window.navigator.languages[0] : window.navigator.language;
		formatter = new Intl.DateTimeFormat(locale, { month: "short" });
	});

	function click(e: MouseEvent) {
		selectedDay.set({
			month: Number((e.target as HTMLElement).dataset.month),
			date: Number((e.target as HTMLElement).dataset.date)
		});
	}
</script>

<div class="grid grid-cols-[repeat(13,1fr)] h-full w-[min(100%,30rem)]">
	<div class="grid justify-items-center items-center grid-rows-[repeat(32,var(--y-gap))]">
		<p>&nbsp;</p>
		{#each Array(31) as _, idx}
			<p>{idx + 1}</p>
		{/each}
	</div>
	{#each Array(12) as _, monthIdx}
		{@const date = new Date(new Date().getFullYear(), monthIdx, 1)}
		<div class="grid justify-items-center grid-rows-[repeat(32,var(--y-gap))]">
			<p class="overflow-hidden">{formatter?.format(date).slice(0, 1) ?? ""}</p>
			{#each Array(daysInMonth(monthIdx)) as _, dayIdx}
				{@const curr = new Date(new Date().getFullYear(), monthIdx, dayIdx + 1)}
				{@const colour = isToday(curr)
					? "bg-green-500"
					: isPastDay(curr)
					? "bg-red-500"
					: "bg-slate-500"}
				<div
					on:click={click}
					on:keypress
					data-month={monthIdx}
					data-date={dayIdx}
					class="self-center w-4 h-4 rounded-full cursor-pointer {colour}"
				/>
			{/each}
		</div>
	{/each}
</div>

{#if $selectedDay}
	<DayModal bind:data />
{/if}

<style>
	:root {
		--y-gap: calc(100% / 32);
	}
</style>
