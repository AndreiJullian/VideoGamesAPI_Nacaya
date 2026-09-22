import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { motion } from "framer-motion";

import {
  Bookmark,
  Calendar,
  Gamepad2,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

interface Game {
  id: number;
  name: string;
  released: string | null;
  background_image: string | null;
  rating: number;
  metacritic: number | null;

  genres?: {
    id: number;
    name: string;
  }[];

  platforms?: {
    platform: {
      id: number;
      name: string;
    };
  }[];
}

interface GamesResponse {
  results: Game[];
}

function App() {
  const [games, setGames] =
    useState<Game[]>([]);

  const [search, setSearch] =
    useState("");

  const [genre, setGenre] =
    useState("");

  const [ordering, setOrdering] =
    useState("-rating");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [favorites, setFavorites] =
    useState<number[]>(() => {
      const saved =
        localStorage.getItem(
          "gamevault-favorites"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  async function loadGames() {
    try {
      setLoading(true);
      setError("");

      const params =
        new URLSearchParams();

      params.set(
        "page_size",
        "12"
      );

      params.set(
        "ordering",
        ordering
      );

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      if (genre) {
        params.set(
          "genres",
          genre
        );
      }

const response = await fetch(
  "/api/rawg?" + params.toString()
);

if (!response.ok) {
  throw new Error();
}

      if (!response.ok) {
        throw new Error();
      }

      const data: GamesResponse =
        await response.json();

      setGames(data.results);
    } catch {
      setError(
        "Unable to load games. Make sure the Netlify function is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGames();
  }, [ordering, genre]);

  useEffect(() => {
    localStorage.setItem(
      "gamevault-favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();
    loadGames();
  }

  function toggleFavorite(
    id: number
  ) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter(
            (gameId) =>
              gameId !== id
          )
        : [...current, id]
    );
  }

  function scoreColor(
    score: number | null
  ) {
    if (!score) {
      return "bg-slate-500/20 text-slate-300";
    }

    if (score >= 75) {
      return "bg-emerald-500/20 text-emerald-400";
    }

    if (score >= 50) {
      return "bg-yellow-500/20 text-yellow-300";
    }

    return "bg-red-500/20 text-red-400";
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090d16]/85 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/20">

              <Gamepad2 size={23} />

            </div>

            <div>

              <h1 className="font-black">
                GAME
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  VAULT
                </span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.25em] text-slate-500">
                Discover Your Next World
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">

            <Bookmark size={16} />

            {favorites.length}

          </div>

        </div>

      </header>


      {/* HERO */}

      <section className="relative mx-auto flex min-h-[55vh] max-w-7xl items-center overflow-hidden px-5 py-16">

        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative z-10 max-w-3xl"
        >

          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-300">

            <Sparkles size={14} />

            Gaming Universe

          </div>

          <h2 className="text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">

            FIND YOUR
            <br />

            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              NEXT OBSESSION.
            </span>

          </h2>

          <p className="mt-6 max-w-xl text-slate-400">

            Discover top-rated games,
            search thousands of titles,
            filter by genre, and save your
            favorites.

          </p>


          {/* SEARCH */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex max-w-xl items-center rounded-2xl border border-white/10 bg-white/5 p-2"
          >

            <Search
              size={19}
              className="ml-3 text-slate-500"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search games..."
              className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-600"
            />

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-bold"
            >
              Explore
            </button>

          </form>

        </motion.div>

      </section>


      {/* CONTROLS */}

      <section className="sticky top-[77px] z-40 border-y border-white/5 bg-[#090d16]/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row">

          <select
            value={genre}
            onChange={(event) =>
              setGenre(
                event.target.value
              )
            }
            className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm"
          >

            <option value="">
              All Genres
            </option>

            <option value="action">
              Action
            </option>

            <option value="shooter">
              Shooter
            </option>

            <option value="adventure">
              Adventure
            </option>

            <option value="indie">
              Indie
            </option>

            <option value="role-playing-games-rpg">
              RPG
            </option>

          </select>


          <select
            value={ordering}
            onChange={(event) =>
              setOrdering(
                event.target.value
              )
            }
            className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm"
          >

            <option value="-rating">
              Highest Rating
            </option>

            <option value="-metacritic">
              Metacritic
            </option>

            <option value="-released">
              Newest Release
            </option>

            <option value="-added">
              Popular
            </option>

          </select>

        </div>

      </section>


      {/* GRID */}

      <section className="mx-auto max-w-7xl px-5 py-12">

        <div className="mb-8">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Discover
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Explore Games
          </h2>

        </div>


        {loading && (
          <div className="py-20 text-center text-slate-500">
            Loading games...
          </div>
        )}


        {error && (
          <div className="py-20 text-center text-red-400">
            {error}
          </div>
        )}


        {!loading &&
          !error && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {games.map(
                (game, index) => (

                  <motion.article
                    key={game.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.03,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111827] transition hover:border-violet-500/40"
                  >

                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">

                      {game.background_image ? (
                        <img
                          src={
                            game.background_image
                          }
                          alt={
                            game.name
                          }
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-slate-600">
                          No image
                        </div>
                      )}


                      <button
                        onClick={() =>
                          toggleFavorite(
                            game.id
                          )
                        }
                        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-black/60 backdrop-blur"
                      >

                        <Bookmark
                          size={17}
                          className={
                            favorites.includes(
                              game.id
                            )
                              ? "fill-violet-400 text-violet-400"
                              : "text-white"
                          }
                        />

                      </button>


                      {game.metacritic && (
                        <div
                          className={`absolute bottom-3 left-3 rounded-lg px-2 py-1 text-xs font-black ${scoreColor(
                            game.metacritic
                          )}`}
                        >
                          {
                            game.metacritic
                          }
                        </div>
                      )}

                    </div>


                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="font-bold group-hover:text-violet-300">
                          {game.name}
                        </h3>

                        <span className="flex items-center gap-1 text-sm text-yellow-300">

                          <Star
                            size={14}
                            className="fill-yellow-300"
                          />

                          {game.rating.toFixed(
                            1
                          )}

                        </span>

                      </div>


                      <div className="mt-3 flex gap-4 text-xs text-slate-500">

                        {game.released && (
                          <span className="flex items-center gap-1">

                            <Calendar
                              size={13}
                            />

                            {new Date(
                              game.released
                            ).getFullYear()}

                          </span>
                        )}

                        <span>
                          {game.platforms
                            ?.length ||
                            0}{" "}
                          platforms
                        </span>

                      </div>


                      <div className="mt-4 flex flex-wrap gap-2">

                        {game.genres
                          ?.slice(0, 3)
                          .map(
                            (
                              item
                            ) => (
                              <span
                                key={
                                  item.id
                                }
                                className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-slate-400"
                              >
                                {
                                  item.name
                                }
                              </span>
                            )
                          )}

                      </div>

                    </div>

                  </motion.article>

                )
              )}

            </div>
          )}

      </section>


      {/* FOOTER */}

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">

        Game data powered by{" "}

        <a
          href="https://rawg.io/"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-violet-400"
        >
          RAWG
        </a>

      </footer>

    </div>
  );
}

export default App;