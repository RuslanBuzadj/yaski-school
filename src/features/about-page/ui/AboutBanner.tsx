import { BookOpen, GraduationCap, Pencil, Ruler, Sparkles, Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const floatingIcons = [
  {
    Icon: BookOpen,
    className: "left-[6%] top-[22%] h-9 w-9 sm:h-11 sm:w-11",
    duration: "13s",
    delay: "0s",
    rotateFrom: "-10deg",
    rotateMid: "6deg",
    rotateTo: "12deg",
    x: ["34px", "58px", "18px"],
    y: ["-30px", "10px", "36px"],
  },
  {
    Icon: GraduationCap,
    className: "left-[16%] top-[62%] h-8 w-8 sm:h-10 sm:w-10",
    duration: "16s",
    delay: "1.2s",
    rotateFrom: "8deg",
    rotateMid: "-4deg",
    rotateTo: "-14deg",
    x: ["-28px", "-46px", "-12px"],
    y: ["-24px", "8px", "26px"],
  },
  {
    Icon: Pencil,
    className: "right-[24%] top-[16%] h-7 w-7 sm:h-9 sm:w-9",
    duration: "10s",
    delay: "0.4s",
    rotateFrom: "-24deg",
    rotateMid: "10deg",
    rotateTo: "26deg",
    x: ["-22px", "-40px", "-8px"],
    y: ["18px", "38px", "10px"],
  },
  {
    Icon: Ruler,
    className: "right-[8%] top-[52%] h-8 w-8 sm:h-10 sm:w-10",
    duration: "18s",
    delay: "2s",
    rotateFrom: "14deg",
    rotateMid: "-6deg",
    rotateTo: "-16deg",
    x: ["-30px", "-52px", "-16px"],
    y: ["-20px", "14px", "32px"],
  },
  {
    Icon: BookOpen,
    className: "right-[38%] top-[70%] h-6 w-6 sm:h-8 sm:w-8",
    duration: "14s",
    delay: "0.8s",
    rotateFrom: "-8deg",
    rotateMid: "6deg",
    rotateTo: "16deg",
    x: ["24px", "44px", "10px"],
    y: ["-26px", "-4px", "20px"],
  },
  {
    Icon: Star,
    className: "left-[38%] top-[14%] h-5 w-5 sm:h-6 sm:w-6",
    duration: "9s",
    delay: "1.6s",
    rotateFrom: "0deg",
    rotateMid: "30deg",
    rotateTo: "60deg",
    x: ["16px", "30px", "6px"],
    y: ["20px", "34px", "12px"],
  },
] as const;

export function AboutBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-indigo-600 dark:to-indigo-900">
      <div className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full bg-yellow-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {floatingIcons.map(({ Icon, className, duration, delay, rotateFrom, rotateMid, rotateTo, x, y }, index) => (
          <Icon
            key={index}
            className={cn("absolute animate-float text-white/25", className)}
            style={{
              animationDuration: duration,
              animationDelay: delay,
              ["--float-rotate-from" as string]: rotateFrom,
              ["--float-rotate-mid" as string]: rotateMid,
              ["--float-rotate-to" as string]: rotateTo,
              ["--float-x1" as string]: x[0],
              ["--float-x2" as string]: x[1],
              ["--float-x3" as string]: x[2],
              ["--float-y1" as string]: y[0],
              ["--float-y2" as string]: y[1],
              ["--float-y3" as string]: y[2],
            }}
          />
        ))}
        <Sparkles className="absolute top-[36%] left-[52%] h-5 w-5 text-yellow-200/50 animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="mt-2 font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
          Про заклад
        </h1>
        <p className="mt-3 max-w-xl text-sm text-primary-foreground/80 sm:text-base">
          Історія, структура управління, досягнення та нормативні документи нашого закладу освіти.
        </p>
      </div>
    </div>
  );
}
