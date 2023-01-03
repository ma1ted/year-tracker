<script lang="ts">
	import "../app.css";
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<nav class="flex items-center justify-between px-4 w-full h-12 bg-gray-800">
	<div class="flex items-center gap-4">
		<a href="/">Home</a>
		<a href="/about">About</a>
	</div>
	{#if data.github}
		{@const hours = new Date().getHours()}
		{@const greeting = hours < 12 ? "Good morning" : hours < 17 ? "Good afternoon" : "Good evening"}
		<div class="flex flex-row items-center gap-2">
			<p>{greeting}, {data.github.name}!</p>
			<img src={data.github.avatar_url} alt="github profile" class="w-8 h-8 rounded-full" />
		</div>
		<a href="/signout">Sign out</a>
	{:else}
		<a href="https://github.com/login/oauth/authorize?client_id={data.GITHUB_ID}">Sign in</a>
	{/if} 
</nav>

<slot />
