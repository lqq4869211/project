"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

function CoupleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M25.6 47.5c-.7 0-1.4-.25-1.95-.75C20.2 43.5 8 33.1 8 24.15 8 18 12.6 13.5 18.4 13.5c2.9 0 5.6 1.25 7.5 3.4 1.9-2.15 4.6-3.4 7.5-3.4 5.8 0 10.4 4.5 10.4 10.65 0 8.95-12.2 19.35-15.65 22.6-.55.5-1.25.75-1.95.75z"
      />
      <path
        fill="currentColor"
        opacity="0.75"
        d="M43.4 50.5c-.5 0-1-.18-1.4-.54-2.5-2.32-11.2-9.75-11.2-16.15 0-4.4 3.3-7.6 7.4-7.6 2.07 0 4 .9 5.2 2.43 1.2-1.53 3.13-2.43 5.2-2.43 4.1 0 7.4 3.2 7.4 7.6 0 6.4-8.7 13.83-11.2 16.15-.4.36-.9.54-1.4.54z"
      />
    </svg>
  )
}

export function QqCoupleCover() {
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "love-accepted") setAccepted(true)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("message", onMessage)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("message", onMessage)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-qq-bg px-4 py-10">
      <div className="w-full max-w-md">
        {/* 封面卡片 */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="group w-full rounded-2xl border border-qq-line bg-qq-card px-5 pb-4 pt-5 text-left shadow-sm transition-all duration-200 hover:scale-[1.015] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-qq-pink"
        >
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-pretty text-2xl font-bold leading-tight text-qq-text">想和你建立情侣关系</h1>
              <p className="mt-2 text-pretty text-base leading-relaxed text-qq-sub">
                和我成为情侣，让QQ帮我们记录每日点滴
              </p>
            </div>
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-qq-pink shadow-lg shadow-qq-pink/30">
              <CoupleIcon className="size-10 text-qq-on-pink" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-qq-line pt-3">
            <span className="text-sm text-qq-sub/80">其他来源</span>
            <span className="text-sm text-qq-pink opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              点击查看
            </span>
          </div>
        </button>

        <p className="mt-4 text-center text-xs text-qq-sub/70">
          {accepted ? "她已经同意了，恭喜。" : "轻触卡片，打开申请书"}
        </p>
      </div>

      {/* 内嵌 HTML 页面 */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="情侣关系申请书"
          className="fixed inset-0 z-50 flex items-center justify-center bg-qq-text/40 p-3 backdrop-blur-sm sm:p-6"
        >
          <div className="relative flex h-full w-full max-w-md flex-col overflow-hidden rounded-2xl border border-qq-line bg-qq-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-qq-line px-4 py-3">
              <span className="text-sm font-medium text-qq-text">情侣关系申请书</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-qq-sub transition-colors hover:bg-qq-bg hover:text-qq-text"
              >
                <X className="size-4" />
                <span className="sr-only">关闭</span>
              </button>
            </div>
            <iframe
              src="/love-request.html"
              title="情侣关系申请书"
              className="min-h-0 flex-1 w-full border-0"
            />
          </div>
        </div>
      )}
    </main>
  )
}
