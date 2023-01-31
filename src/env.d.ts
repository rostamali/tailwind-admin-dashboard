declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URL: string;
			JWT_SECRET: string;
			JWT_EXPIRES_IN: string;
		}
	}
}

export {};
