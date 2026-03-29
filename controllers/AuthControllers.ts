import { APIRequestContext } from "@playwright/test";

class AuthControllers {

    async signIn(request: APIRequestContext, email: string, password: string) {
            const response = await request.post('/api/auth/signin', {
                data: {
                  email,
                  password
                    }
            });
        return response;
    }
}

export const authControllers = new AuthControllers();