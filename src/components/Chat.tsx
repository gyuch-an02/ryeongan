"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage, Slot } from "@/game/types";

function formatTime(ts: number): string {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function Chat({
  messages,
  mySlot,
  onSend,
}: {
  messages: ChatMessage[];
  mySlot: Slot | null;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <aside className="flex flex-col min-h-0 bg-[#120d0c]">
      {/* 헤더 */}
      <div className="flex-shrink-0 flex items-center gap-2.5 px-[18px] pt-[13px] pb-[11px] font-mono text-[11px] tracking-[0.2em] uppercase text-ink-dim border-b border-ink-border">
        무전 채널
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-ink-warn animate-breathe-fast" />
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-[18px] py-3.5 flex flex-col gap-3.5 min-h-0">
        {messages.length === 0 && (
          <div className="font-mono text-[11px] text-ink-spirit text-center opacity-80">
            — 채널이 열렸습니다 —
          </div>
        )}
        {messages.map((m) => {
          if (m.slot === "system") {
            return (
              <div key={m.id} className="font-mono text-[11px] tracking-[0.05em] text-ink-spirit text-center opacity-80">
                {m.text}
              </div>
            );
          }
          const mine = m.slot === mySlot;
          return (
            <div key={m.id} className={mine ? "text-right" : "text-left"}>
              <div className="font-mono text-[10px] tracking-[0.12em] text-ink-dim mb-[3px]">
                {mine ? (
                  <><time className="text-[#4d433e]">{formatTime(m.ts)}</time> 나</>
                ) : (
                  <>{m.name} <time className="text-[#4d433e]">{formatTime(m.ts)}</time></>
                )}
              </div>
              <div className={`text-[14.5px] leading-[1.55] ${mine ? "text-ink-text" : "text-ink-soft"}`}>
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* 입력 바 */}
      <div className="flex-shrink-0 flex gap-2 p-3.5 border-t border-ink-border">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="무전 송신…"
          maxLength={500}
          className="flex-1 bg-ink-panel2 border border-ink-border rounded-ink px-3 py-2.5 text-ink-text font-serif text-sm placeholder:text-[#5c514b] focus:border-[#4a3a32] outline-none transition-colors"
        />
        <button
          onClick={send}
          className="flex-shrink-0 border border-ink-border rounded-ink px-3.5 font-mono text-[11px] tracking-[0.14em] text-ink-soft hover:border-ink-accent hover:text-ink-accent transition-colors"
        >
          송신
        </button>
      </div>
    </aside>
  );
}
