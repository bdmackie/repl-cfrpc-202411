<script lang="ts">
	import type { PageServerData } from './$types';

	interface Props {
		data: PageServerData;
	}
	const { data }: Props = $props();

</script>
<svelte:head>
	<title>Sum</title>
	<meta name="description" content="Test Sum" />
</svelte:head>

<div class="text-column">
	<h1>Test sum</h1>

	<p>
		Result 1: {data.result1}
	</p>

	<p>
		Result 2: {data.result2}
	</p>
</div>
