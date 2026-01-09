/**
 * Simple error logging utility for production
 * Can be expanded to send to Sentry, Datadog, etc.
 */
export const logError = (context: string, error: any, metadata: any = {}) => {
    const timestamp = new Date().toISOString();
    const errorMsg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;

    console.error(`[${timestamp}] [ERROR] [${context}] ${errorMsg}`, {
        ...metadata,
        stack
    });

    // In a real Vercel environment, console.error is captured in the function logs.
    // We could add alerting logic here later.
};
