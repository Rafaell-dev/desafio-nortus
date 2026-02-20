import { http, HttpResponse } from 'msw';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

export const mockUser = {
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  state: 'SP',
};

export const mockToken = 'mock-access-token-123';

export const authHandlers = [
  // POST /auth/login — success
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'test@example.com' && body.password === '123456') {
      return HttpResponse.json({ access_token: mockToken });
    }

    return new HttpResponse(
      JSON.stringify({ message: 'Credenciais inválidas' }),
      { status: 401 },
    );
  }),

  // GET /users/by-email/:email — success
  http.get(`${API_BASE_URL}/users/by-email/:email`, ({ params, request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    if (params.email === 'test@example.com') {
      return HttpResponse.json(mockUser);
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
