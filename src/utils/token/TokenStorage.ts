export class TokenStorage {
	static #instance: TokenStorage;
	private static tokens: Map<string, string>;

	private constructor() {
		TokenStorage.tokens = new Map();
	}

	public static get instance(): TokenStorage {
		if (!TokenStorage.#instance) {
			TokenStorage.#instance = new TokenStorage();
		}
		return TokenStorage.#instance;
	}

	public static setTokens(accessToken: string, refreshToken: string): void {
		TokenStorage.tokens.set(accessToken, refreshToken);
	}

	public static getRefreshToken(accessToken: string): string | undefined {
		return TokenStorage.tokens.get(accessToken);
	}

	public static deleteTokens(accessToken: string): void {
		TokenStorage.tokens.delete(accessToken);
	}
}
