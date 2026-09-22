import {
  Calendar,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";

import type {
  Game,
} from "../types/rawg";

interface GameCardProps {
  game: Game;
}

function getScoreStyle(
  score: number | null
) {
  if (!score) {
    return "bg-slate-700 text-slate-300";
  }

  if (score >= 75) {
    return "bg-emerald-500/20 text-emerald-400";
  }

  if (score >= 50) {
    return "bg-yellow-500/20 text-yellow-300";
  }

  return "bg-red-500/20 text-red-400";
}

export function GameCard({
  game,
}: GameCardProps) {
  return (
    <motion.article
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111827]/80 shadow-xl transition hover:border-violet-500/40"
    >

      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">

        {game.background_image ? (
          <img
            src={
              game.background_image
            }
            alt={game.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="grid h-full place-items-center text-slate-600">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

        {game.metacritic && (
          <div
            className={`absolute bottom-3 left-3 rounded-lg px-2.5 py-1 text-xs font-black backdrop-blur-xl ${getScoreStyle(
              game.metacritic
            )}`}
          >
            {game.metacritic}
          </div>
        )}

      </div>

      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          <h3 className="line-clamp-2 text-lg font-bold tracking-tight group-hover:text-violet-300">
            {game.name}
          </h3>

          <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-yellow-300">
            <Star
              size={14}
              className="fill-yellow-300"
            />

            {game.rating.toFixed(
              1
            )}
          </div>

        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">

          {game.released && (
            <span className="flex items-center gap-1.5">
              <Calendar
                size={13}
              />

              {new Date(
                game.released
              ).getFullYear()}
            </span>
          )}

          <span>
            {game.platforms?.length ??
              0}{" "}
            platforms
          </span>

        </div>

        <div className="mt-4 flex flex-wrap gap-2">

          {game.genres
            ?.slice(0, 3)
            .map((genre) => (
              <span
                key={genre.id}
                className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-slate-400"
              >
                {genre.name}
              </span>
            ))}

        </div>

      </div>

    </motion.article>
  );
}