export default async function handler(request: Request) {
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "RAWG_API_KEY is missing",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const incomingUrl = new URL(request.url);

    const rawgUrl = new URL(
      "https://api.rawg.io/api/games"
    );

    rawgUrl.searchParams.set("key", apiKey);

    rawgUrl.searchParams.set(
      "page_size",
      incomingUrl.searchParams.get("page_size") || "12"
    );

    rawgUrl.searchParams.set(
      "ordering",
      incomingUrl.searchParams.get("ordering") || "-rating"
    );

    const search =
      incomingUrl.searchParams.get("search");

    const genres =
      incomingUrl.searchParams.get("genres");

    if (search) {
      rawgUrl.searchParams.set(
        "search",
        search
      );
    }

    if (genres) {
      rawgUrl.searchParams.set(
        "genres",
        genres
      );
    }

    const response = await fetch(
      rawgUrl.toString()
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: "RAWG request failed",
          status: response.status,
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "public, max-age=60",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: "Server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}