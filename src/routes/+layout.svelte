<script lang="ts">
	import "../app.css";
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: console.log(data);

	const GH_CLIENT = "Iv1.2a14da99fe656939";
</script>

<nav class="flex items-center justify-between px-4 w-full h-12 bg-gray-800">
	<div class="flex items-center gap-4">
		<a href="/">Home</a>
		<a href="/about">About</a>
	</div>
	{#if data.id}
		{@const hours = new Date().getHours()}
		{@const greeting = hours < 12 ? "Good morning" : hours < 17 ? "Good afternoon" : "Good evening"}
		<div class="flex flex-row items-center gap-2">
			<p>{greeting}, {data.name}!</p>
			<img src={data.avatar_url} alt="github profile" class="w-8 h-8 rounded-full" />
		</div>
		<a href="/signout">Sign out</a>
	{:else}
		<a href="https://github.com/login/oauth/authorize?client_id={GH_CLIENT}">Sign in</a>
	{/if} 
</nav>

<slot />
