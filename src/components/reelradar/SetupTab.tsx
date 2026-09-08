"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useConfig } from "@/lib/config";

export default function SetupTab() {
  const { t } = useLanguage();
  const {
    competitorAccounts,
    addCompetitorAccount,
    removeCompetitorAccount,
    toggleCompetitorPause,
    discoverKeywords,
    addDiscoverKeyword,
    removeDiscoverKeyword,
    useMyTone,
    setUseMyTone,
    scanSettings,
    updateScanSettings,
  } = useConfig();

  const [newHandle, setNewHandle] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold mb-1">{t("setup.title")}</h2>
        <p className="text-sm text-muted">{t("setup.subtitle")}</p>
      </div>

      <div>
        <p className="text-sm font-semibold mb-1">{t("setup.competitorsTitle")}</p>
        <p className="text-xs text-muted mb-3">
          {t("setup.competitorsDesc", { count: String(competitorAccounts.length) })}
        </p>
        <div className="rounded-2xl border border-border bg-surface divide-y divide-border">
          {competitorAccounts.map((acc) => (
            <div key={acc.id} className="flex items-center justify-between gap-3 p-3.5">
              <div>
                <p className={`text-sm font-medium ${acc.paused ? "text-muted line-through" : ""}`}>{acc.handle}</p>
                <p className="text-[11px] text-muted">
                  {t("setup.lastScan")}: {acc.lastScan}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => toggleCompetitorPause(acc.id)}
                  className="text-xs font-medium text-muted hover:text-brand-pink"
                >
                  {acc.paused ? t("setup.resume") : t("setup.pause")}
                </button>
                <button
                  onClick={() => removeCompetitorAccount(acc.id)}
                  className="text-xs font-medium text-muted hover:text-red-500"
                >
                  {t("action.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input
            value={newHandle}
            onChange={(e) => setNewHandle(e.target.value)}
            placeholder={t("setup.addCompetitor")}
            className="flex-1 rounded-lg border border-border bg-surface text-foreground px-3 py-1.5 text-sm"
          />
          <button
            onClick={() => {
              addCompetitorAccount(newHandle);
              setNewHandle("");
            }}
            disabled={!newHandle.trim()}
            className="rounded-lg brand-gradient text-white text-sm font-medium px-4 py-1.5 disabled:opacity-40"
          >
            {t("action.add")}
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-1">{t("setup.keywordsTitle")}</p>
        <p className="text-xs text-muted mb-3">
          {t("setup.keywordsDesc", { count: String(discoverKeywords.length) })}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {discoverKeywords.map((k) => (
            <span
              key={k}
              className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1.5 text-sm"
            >
              {k}
              <button onClick={() => removeDiscoverKeyword(k)} className="text-muted hover:text-red-500">
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder={t("setup.addKeyword")}
            className="flex-1 max-w-xs rounded-lg border border-border bg-surface text-foreground px-3 py-1.5 text-sm"
          />
          <button
            onClick={() => {
              addDiscoverKeyword(newKeyword);
              setNewKeyword("");
            }}
            disabled={!newKeyword.trim()}
            className="rounded-lg brand-gradient text-white text-sm font-medium px-4 py-1.5 disabled:opacity-40"
          >
            {t("action.add")}
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-1">{t("setup.toneTitle")}</p>
        <p className="text-xs text-muted mb-3">{t("setup.toneDesc")}</p>
        <div className="rounded-2xl border border-border bg-surface p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{t("setup.toneToggle")}</p>
            <p className="text-[11px] text-muted mt-0.5">{t("setup.toneOffNote")}</p>
          </div>
          <button
            onClick={() => setUseMyTone(!useMyTone)}
            className={`w-11 h-6 rounded-full transition relative shrink-0 ${useMyTone ? "brand-gradient" : "bg-border"}`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                useMyTone ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-3">{t("setup.scanTitle")}</p>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">{t("setup.domainLabel")}</label>
            <textarea
              value={scanSettings.domainDescription}
              onChange={(e) => updateScanSettings({ domainDescription: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-border bg-surface text-foreground px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">{t("setup.sellingPointLabel")}</label>
            <textarea
              value={scanSettings.sellingPoint}
              onChange={(e) => updateScanSettings({ sellingPoint: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-border bg-surface text-foreground px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">{t("setup.reelsPerAccountLabel")}</label>
            <input
              type="number"
              value={scanSettings.reelsPerAccount}
              onChange={(e) => updateScanSettings({ reelsPerAccount: Number(e.target.value) || 0 })}
              className="w-24 rounded-lg border border-border bg-surface text-foreground px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
