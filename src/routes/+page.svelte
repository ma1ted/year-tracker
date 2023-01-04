<script lang="ts">
	import Calendar from "./components/calendar.svelte";
	import DayModal from "./components/daymodal.svelte";

	export let data: any;
</script>

<main class="grid place-items-center p-6">
	{#if data.github}
		<Calendar />
		<DayModal bind:data />
	{:else}
		<h3>Please log in!</h3>
	{/if}
</main>
