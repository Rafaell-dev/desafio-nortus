import { LoginCredentials, AuthResponse } from "../types/auth.types";

export class AuthApi {
    private baseUrl: string

    constructor(baseUrl: string = '/api') {
        this.baseUrl = baseUrl
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        if (!response.ok) {
            throw new Error('Falha ao realizar login')
        }

        return response.json()
    }
}