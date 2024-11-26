import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const result1 = 1 + 2;

    // Call sumworker via RPC.
    const platform = getPlatform(event);
	const result2 = await platform.env.SUM_WORKER.add(1, 2);

	return { result1, result2 };
};

function getPlatform(event: { platform?: App.Platform }): App.Platform {
    let { platform } = event;
    if (!platform) {
        throw new Error('platform not available');
    }
    return platform;
}
