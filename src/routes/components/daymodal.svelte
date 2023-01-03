<script lang="ts">
	//@ts-ignore
	import { selectedDay } from "$lib/stores";

	const isPastDay = (date: Date) => date < new Date();
	const isYesterday = (date: Date) =>
		date.toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString();
	const isToday = (date: Date) => date.toDateString() === new Date().toDateString();
	const isTomorrow = (date: Date) =>
		date.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString();
	const isFutureDay = (date: Date) => date > new Date();

	const daysOut = (date: Date) =>
		(isPastDay(date) ? Math.floor : Math.ceil)(
			Math.abs(new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
		);

	let selectedDate: Date,
		formattedDate: string | null = null;
	selectedDay.subscribe((value: any) => {
		if (!value) return;
		selectedDate = new Date(new Date().getFullYear(), value.month, value.date + 1);
		const formatter = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" });
		formattedDate = formatter.format(
			new Date(new Date().getFullYear(), value.month, value.date + 1)
		);
	});

	let modal: HTMLElement, closeButton: HTMLElement;
	function click(e: MouseEvent) {
		if (
			(e.target !== modal && !modal.contains(e.target as HTMLElement)) ||
			e.target === closeButton ||
			closeButton.contains(e.target as HTMLElement)
		) {
			selectedDay.set(null);
			formattedDate = null;
		}
	}

	const actions = [
		"Went outside",
		"Pooped",
		"Urinated",
		"Vomited",
		"Cried",
		"Read quality material",
		"Finished a podcast",
		"Creatively wrote",
		"Socialised",
		"Gamed",
		"Showered",
		"Ate a substantial meal",
		"Took perscription drugs",
		"Took recreational drugs",
		"Drank Alcohol",
		"Had sex",
		"Solo sexed"
	];
</script>

{#if formattedDate}
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
					{#each actions as action}
						<p class="text-sm text-white whitespace-nowrap">{action}</p>

						<div class="flex flex-row gap-4 justify-self-end">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
							</svg>
							<p>0</p>
							<svg
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
{/if}
