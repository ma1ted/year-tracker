<div id="parent">
    <div id="day-numbers">
        <p>&nbsp;</p>
        {#each Array(31) as _, idx}
            <p>{idx + 1}</p>
        {/each}
    </div>
    {#each Array(12) as _, idx}
        <div class="month">
            <p class="month">month {idx + 1}</p>
            <!-- {#each Array(Math.floor(Math.random() * (31 - 10 + 1) + 10)) as _, idx} -->
            {#each Array(31) as _, idx}
                <div class="day w-4 h-4 rounded-full bg-blue-500"></div>
            {/each}
        </div>
    {/each}
</div>

<style>
    #parent {
        display: grid;
        grid-template-columns: repeat(13, 1fr);
        /* grid-template-rows: [months-start] 1rem [months-end] auto [end];
        grid-template-columns: [dates-start] 1rem [dates-end] auto [end]; */
    }

    .month {
        display: grid;
        justify-items: center;
    }

    #day-numbers {
        display: grid;
        justify-items: center;
        grid-template-rows: repeat(31, 2rem);
    }
</style>