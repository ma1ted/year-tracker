<script lang="ts">
	import { selectedDay } from "$lib/stores";
	import {
		isPastDay,
		isYesterday,
		isToday,
		isTomorrow,
		isFutureDay,
		daysOut
	} from "$lib/date-utils";

	export let data: any;
	// $: console.log("this is data", data);

	// const dayInfo = await getDayInfo(id).then((res) => res);
	// if (dayInfo.length === 0) initialiseUser(id);

	let selectedDate: Date, formattedDate: string | null;
	selectedDay.subscribe((value: any) => {
		if (!value) return;

		selectedDate = new Date(new Date().getFullYear(), value.month, value.date + 1);
		formattedDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
			new Date(new Date().getFullYear(), value.month, value.date + 1)
		);
	});

	const closeModal = () => selectedDay.set(null);

	let modal: HTMLElement, closeButton: HTMLElement;
	function click(e: MouseEvent) {
		if (!modal.contains(e.target as HTMLElement) || closeButton.contains(e.target as HTMLElement))
			closeModal();
	}
</script>

<svelte:window on:keydown={(e) => e.code === "Escape" && closeModal()} />

<div
	on:click={click}
	on:keypress
	class="fixed flex justify-center items-center w-screen h-screen inset-0 backdrop-blur"
>
	<div
		bind:this={modal}
		class="relative flex flex-col gap-4 w-[max(20rem,33vw)] h-3/4 bg-slate-800 border-2 border-gray-400/50 rounded-lg p-4 overflow-scroll "
	>
		<div bind:this={closeButton} class="absolute cursor-pointer right-0 top-0 m-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</div>
		<div class="flex flex-col gap-4 w-fit">
			<h3 class="text-2xl font-bold text-white mr-10">{formattedDate}</h3>
			{#if selectedDate}
				{@const colour = isToday(selectedDate)
					? "green"
					: isPastDay(selectedDate)
					? "red"
					: "slate"}
				{@const text = isYesterday(selectedDate)
					? "Yesterday"
					: isToday(selectedDate)
					? "Today"
					: isTomorrow(selectedDate)
					? "Tomorrow"
					: isFutureDay(selectedDate)
					? `In ${daysOut(selectedDate)} days`
					: `${daysOut(selectedDate)} days ago`}
				<div class="flex items-center gap-2">
					<div class="w-3 h-3 bg-{colour}-500 rounded-full" />
					<p class="text-sm text-{colour}-300 font-bold">{text}</p>
				</div>
			{/if}
		</div>
		<hr />
		<h4 class="text-xl">On this day, I...</h4>

		<div class="flex flex-col gap-4 overflow-scroll rounded p-2 pl-0">
			<div class="grid grid-cols-2 gap-3">
				{#each data.categories as action}
					<p class="text-sm text-white whitespace-nowrap">{action.label}</p>
					<div class="flex flex-row gap-4 justify-self-end">
						<svg
							on:click={() => action.value > 0 && action.value--}
							on:keypress
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
						</svg>
						<p class="select-none">{action.value}</p>
						<svg
							on:click={() => action.value++}
							on:keypress
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
