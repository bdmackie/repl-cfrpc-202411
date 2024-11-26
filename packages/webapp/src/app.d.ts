
type SumService = {
	add(a: number, b:number): Promise<number>;
};

export type CloudflareWorkerEntrypoint<T> = {
	[Rpc.__WORKER_ENTRYPOINT_BRAND]: never; // To satisfy the Cloudflare type system.
} & T;

type SumWorker = Service<CloudflareWorkerEntrypoint<SumService>>;

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Env extends Record<string, string> {
			ENVIRONMENT: string;
			SUM_WORKER: SumWorker;
		}
		interface Platform {
			env: Env;
		}
	}
}

export { };

