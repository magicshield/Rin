export async function onRequest(ctx) {
    const request = ctx.request;
    const url = new URL(request.url);
    url.pathname = url.pathname.substring(4);
    return ctx.env.BACKEND.fetch(new Request(url, request));
}