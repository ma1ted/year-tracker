<script lang="ts">
	import { onMount } from "svelte";

	let currentDate: Date, date: Date, locale: string, formatter: Intl.DateTimeFormat;
	onMount(() => {
		currentDate = new Date();
		date = new Date();
		locale = window.navigator.languages ? window.navigator.languages[0] : window.navigator.language;
		formatter = new Intl.DateTimeFormat(locale, { month: "short" });
	});
</script>

{#if date}
	<div class="flex w-fit gap-4">
		<div>
			<p>&nbsp;</p>
			{#each Array(31) as _, idx}
				<p>{idx + 1}</p>
			{/each}
		</div>
		{#each Array(12) as _, idx}
			{@const d = new Date(currentDate.getFullYear(), idx + 1, 0) }
			<div class="h-full">
				<p>{date.setMonth(idx) && formatter.format(date)}</p>
				{#each Array(d.getDate()) as _, idx}
					<div data-day={idx + 1} data-month={date} class="rounded-full bg-blue-500 w-6 h-6" />
				{/each}
			</div>
		{/each}
	</div>
{/if}