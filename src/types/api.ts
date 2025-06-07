export interface ApiErrorResponse {
    message: string;
    code?: string;
    response?: unknown;
    stack?: string;
}
