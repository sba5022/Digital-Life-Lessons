"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import { CalendarDays, ArrowUpRight } from "lucide-react";

const LessonsCard = ({ lesson }) => {
  const {
    _id,
    title,
    description,
    category,
    emotionalTone,
    creatorName,
    creatorPhoto,
    accessLevel,
    createdAt,
  } = lesson;

  return (
    <Card
      radius="none"
      className="group overflow-hidden border border-white/10 bg-zinc-950 text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="p-6">

        {/* Category + Access Level */}
        <div className="flex items-center justify-between gap-3 mb-5">

          <Chip
            size="sm"
            variant="flat"
            color="secondary"
          >
            {category}
          </Chip>

          <Chip
            size="sm"
            variant="flat"
            color={
              accessLevel === "Public"
                ? "success"
                : "warning"
            }
          >
            {accessLevel}
          </Chip>

        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold leading-tight line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-white/50 line-clamp-3">
          {description}
        </p>

        {/* Emotional Tone */}
        <div className="mt-5">
          <p className="text-xs uppercase tracking-wider text-white/30">
            Emotional Tone
          </p>

          <span className="mt-2 inline-block text-sm text-white/80">
            {emotionalTone}
          </span>
        </div>

        {/* Creator */}
        <div className="mt-6 flex items-center gap-3">

          {creatorPhoto ? (
            <Image
              src={creatorPhoto}
              width={40}
              height={40}
              alt={creatorName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              {creatorName?.charAt(0)?.toUpperCase()}
            </div>
          )}

          <div>
            <p className="text-xs text-white/30">
              Created by
            </p>

            <p className="text-sm font-medium">
              {creatorName}
            </p>
          </div>

        </div>

        {/* Date */}
        <div className="mt-5 flex items-center gap-2 text-xs text-white/40">
          <CalendarDays size={15} />

          <span>
            {new Date(createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}
          </span>
        </div>

        {/* Details Button */}
        <div className="mt-6 border-t border-white/10 pt-5">

          <Link
  href={`/lessons/${_id}`}
  className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black"
>
  <span className="tracking-wide">
    See Details
  </span>

  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-black/10 group-hover:translate-x-1">
    <ArrowUpRight
      size={17}
      strokeWidth={2}
      className="transition-transform duration-300 group-hover:rotate-12"
    />
  </span>
</Link>

        </div>

      </div>
    </Card>
  );
};

export default LessonsCard;