import type {
  GamesResponse,
} from "../types/rawg";

export async function getGames(
  search = ""
): Promise<GamesResponse> {
  const params =
    new URLSearchParams();

  params.set(
    "page_size",
    "12"
  );

  params.set(
    "ordering",
    "-rating"
  );

  if (search.trim()) {
    params.set(
      "search",
      search.trim()
    );
  }

  const response = await fetch(
    /api/rawg?${params.toString()}
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load games"
    );
  }

  return response.json();
}