type SumService = {
	add(a: number, b: number): Promise<number>;
};

type SumWorker = Service<SumService>;


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

