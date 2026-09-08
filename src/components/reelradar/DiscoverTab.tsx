"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useConfig } from "@/lib/config";

interface NewAccount {
  id: string;
  handle: string;
  appearances: number;
  avgScore: number;
}

interface FoundReel {
  id: string;
  account: string;
  hookType: string;
  plays: string;
  score: number;
  color: string;
}

const NEW_ACCOUNTS: NewAccount[] = [
  { id: "n1", handle: "@edutech.wave", appearances: 5, avgScore: 8.4 },
  { id: "n2", handle: "@futurelearn.my", appearances: 4, avgScore: 7.9 },
  { id: "n3", handle: "@aiforparents", appearances: 3, avgScore: 7.5 },
];

const FOUND_REELS: FoundReel[] = [
  { id: "f1", account: "@edutech.wave", hookType: "先亮结果", plays: "96K", score: 8, color: "#fc0c97" },
  { id: "f2", account: "@futurelearn.my", hookType: "点名痛点", plays: "62K", score: 7, color: "#2563EB" },
  { id: "f3", account: "@aiforparents", hookType: "承诺教学", plays: "45K", score: 7, color: "#16A34A" },
];

export default function DiscoverTab() {
  const { t } = useLanguage();
  const { discoverKeywords } = useConfig();
  const [exploring, setExploring] = useState(false);
  const [explored, setExplored] = useState(false);
  const [added, setAdded] = useState<Set<string>>(new Set());

  const handleExplore = () => {
    setExploring(true);
    setTimeout(() => {
      setExploring(false);
      setExplored(true);
    }, 1200);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold">{t("discover.title")}</h2>
          <p className="text-sm text-muted mt-1 max-w-2xl">{t("discover.subtitle")}</p>
        </div>
        <button
          onClick={handleExplore}
          disabled={exploring}
          className="rounded-xl brand-gradient text-white text-sm font-medium px-4 py-2.5 shadow-sm hover:opacity-90 transition disabled:opacity-60 shrink-0"
        >
          {exploring ? "…" : t("discover.startButton")}
        </button>
      </div>

      <div className="rounded-xl bg-background border border-border p-3.5 text-xs text-muted leading-relaxed mb-2">
        {t("discover.whyNoHashtag")}
      </div>
      <p className="text-[11px] text-muted mb-6">{t("discover.frequencyNote")}</p>

      <div className="mb-6">
        <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">
          {t("setup.keywordsTitle")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {discoverKeywords.map((k) => (
            <span key={k} className="rounded-full bg-background border border-border px-2.5 py-1 text-xs">
              {k}
            </span>
          ))}
        </div>
      </div>

      {explored && (
        <>
          <div className="mb-8">
            <p className="text-sm font-semibold mb-1">{t("discover.newAccountsTitle")}</p>
            <p className="text-xs text-muted mb-3">{t("discover.newAccountsDesc")}</p>
            <div className="rounded-2xl border border-border bg-surface divide-y divide-border">
              {NEW_ACCOUNTS.map((acc) => (
                <div key={acc.id} className="flex items-center justify-between gap-3 p-3.5">
                  <div>
                    <p className="text-sm font-medium">{acc.handle}</p>
                    <p className="text-[11px] text-muted">
                      {acc.appearances} {t("discover.appearances")} · {t("discover.avgScore")} {acc.avgScore}/10
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs font-medium text-muted hover:text-brand-pink">{t("discover.openIG")}</button>
                    <button
                      onClick={() => setAdded((prev) => new Set(prev).add(acc.id))}
                      disabled={added.has(acc.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium border transition ${
                        added.has(acc.id)
                          ? "border-green-300 text-green-600"
                          : "border-border text-muted hover:bg-background"
                      }`}
                    >
                      {added.has(acc.id) ? t("discover.added") : t("discover.addToList")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">{t("discover.foundReels")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {FOUND_REELS.map((r) => (
                <div key={r.id} className="rounded-2xl border border-border bg-surface overflow-hidden">
                  <div
                    className="h-28 flex items-center justify-center text-white text-2xl"
                    style={{ background: `linear-gradient(160deg, ${r.color}, ${r.color}88)` }}
                  >
                    ▶
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium">{r.account}</p>
                    <p className="text-[11px] text-muted">
                      {r.hookType} · {r.plays} · {r.score}/10
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
