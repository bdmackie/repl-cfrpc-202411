import type { PageServerLoad } from './$types';

// -----------------------------------------------------------------------------
// page load
// -----------------------------------------------------------------------------
export const load: PageServerLoad = async (event) => {
	// Init forms
	const result1 = 1 + 2;

    const platform = await getPlatform(event);        
        
	const result2 = await platform.env.SUM_WORKER.add(1, 2);

	return { result1, result2 };
};


async function getPlatform(event: { platform?: App.Platform }) {
    let { platform } = event;
    // if (!platform && dev) {
    //     console.warn('platform not available in dev mode -> use getPlatformProxy');
    //     const { getPlatformProxy } = await import('wrangler');
    //     platform = (await getPlatformProxy()) as unknown as App.Platform;
    // }
    if (!platform) {
        throw new Error('platform not available');
    }
    return platform;
}
