export const ac = new AbortController();

export const startServer = async () =>
    Deno.serve({
        port: 5555,
        signal: ac.signal,
    }, (req) => {
        const body = JSON.stringify({ message: "NOT FOUND" });
        // TODO: implement your server logic here
        return new Response(body, {
            status: 404,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    });

export const stopServer = async (server) => {
    ac.abort();
    await server.finished;
};
