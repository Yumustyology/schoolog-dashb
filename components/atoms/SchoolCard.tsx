"use client";

import React from "react";
import Image from "next/image";
import type { SchoolPublic } from "@/app/lib/types/school-info.types";
import { poppins_400, poppins_500 } from "@/app/lib/config/font.config";
import { cn } from "@/app/lib/utils";
import Location from "@/components/atoms/icons/AuthTypeIcons/Location";

type Props = {
  school: SchoolPublic;
  onClick?: (s: SchoolPublic) => void;
  small?: boolean;
};

export default function SchoolCard({ school, onClick, small = false }: Props) {
  const size = !small ? 100 : 60;

  const getColorForString = (s?: string) => {
    const colors = [
      { bg: "bg-emerald-600", text: "text-white" },
      { bg: "bg-indigo-600", text: "text-white" },
      { bg: "bg-rose-600", text: "text-white" },
      { bg: "bg-amber-500", text: "text-gray-900" },
      { bg: "bg-sky-600", text: "text-white" },
      { bg: "bg-violet-600", text: "text-white" },
      { bg: "bg-fuchsia-600", text: "text-white" },
      { bg: "bg-teal-600", text: "text-white" },
      { bg: "bg-orange-600", text: "text-white" },
      { bg: "bg-pink-600", text: "text-white" },
      { bg: "bg-cyan-600", text: "text-white" },
      { bg: "bg-purple-600", text: "text-white" },
    ];
    
    if (!s) return colors[0];
    
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    const idx = Math.abs(hash) % colors.length;
    return colors[idx];
  };

  const renderPlaceholder = () => {
    const text = (school.slug || school.name || "").toUpperCase();
    const short = text.length > 12 ? text.slice(0, 11) + "…" : text;
    const colorScheme = getColorForString(school.slug || school.name || "");

    return (
      <div
        className={cn(
          "flex-shrink-0 rounded flex items-center justify-center font-semibold",
          colorScheme.bg,
          !small ? "w-[100px] h-[100px]" : "w-[60px] h-[60px]"
        )}
        aria-hidden
      >
        <span
          className={cn(
            !small ? "text-sm" : "text-xs",
            "drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] font-bold",
            colorScheme.text,
            poppins_500.className
          )}
        >
          {short}
        </span>
      </div>
    );
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(school)}
      className={cn(
        "border border-gray5 w-full rounded-xl mt-3 flex items-center p-4 gap-4 cursor-pointer hover:shadow",
        "max-w-3xl",
        small && "p-3 py-3"
      )}
    >
      {school.school_image && school.school_image !== "" ? (
        <div
          className="flex-shrink-0 flex items-center"
          style={{ width: size, height: size }}
        >
          <Image
            src={school.school_image}
            alt={school.name}
            width={size}
            height={size}
            className="object-cover rounded"
            quality={75}
          />
        </div>
      ) : (
        renderPlaceholder()
      )}

      <div className="flex flex-col gap-3 w-full">
        <h1 className={cn("text-sm mb-1", poppins_500.className)}>
          {school.name}
        </h1>

        <p className="flex items-center gap-2 justify-between w-full">
          <span className="flex items-center gap-2">
            <Location />
            <span
              className={cn("text-sm text-gray3", poppins_400.className)}
            >
              {school.fullAddress || school.address || school.country}
            </span>
          </span>

          {typeof school.studentCount === "number" &&
          school.studentCount > 0 ? (
            <span
              className={cn(
                "bg-[#f4f4f4] text-sm rounded-[44px] h-[22px] text-gray3 px-2"
              )}
            >
              {`+ ${school.studentCount}`}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}