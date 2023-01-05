<script lang="ts">
	import Calendar from "./components/calendar.svelte";
	// import DayModal from "./components/daymodal.svelte";
	// import { selectedDay } from "$lib/stores";

	export let data: any;
</script>

<main class="grid place-items-center p-6">
	{#if data.github}
		<Calendar bind:data />
	{:else}
		<h3>Please log in!</h3>
	{/if}
</main>
