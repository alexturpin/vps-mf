import { renderPage } from "vite-plugin-ssr/server"

export default {
  fetch: async (request: Request) => {
    // return new Response("Hello, world!")

    const pageContextInit = { urlOriginal: request.url }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return new Response("", { status: 500 })

    const { body, statusCode, contentType } = httpResponse
    return new Response(body, {
      headers: { "content-type": contentType },
      status: statusCode,
    })
  },
}
