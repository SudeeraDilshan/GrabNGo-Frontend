export interface ApiResponse<T> {
    data: T;
    status: boolean;
    message: string;
    errors: string[];
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    role: "ADMINISTRATOR" | "STANDARD_USER"
}