<script lang="ts">
	import "../app.css";
	import type { LayoutData } from "./$types";
	import { page } from "$app/stores";

	$: console.info($page.url.origin);
</script>

<nav class="flex items-center justify-between px-4 w-full h-12 bg-gray-800">
	<div class="flex items-center gap-4">
		<a href="/">Home</a>
		<a href="/about">About</a>
	</div>
	{#if $page.data.github}
		{@const hours = new Date().getHours()}
		{@const greeting = hours < 12 ? "Good morning" : hours < 17 ? "Good afternoon" : "Good evening"}
		<div class="flex flex-row items-center gap-2">
			<p>{greeting}, {$page.data.github.name}!</p>
			<img src={$page.data.github.avatar_url} alt="github profile" class="w-8 h-8 rounded-full" />
		</div>
		<a href="/signout">Sign out</a>
	{:else}
		<a
			href="https://github.com/login/oauth/authorize?client_id={$page.data
				.GITHUB_ID}&redirect_uri={$page.url.origin}"
		>
			Sign in
		</a>
	{/if}
</nav>

<slot />
