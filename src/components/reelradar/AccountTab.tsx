"use client";

import { useState } from "react";
import StatCard from "@/components/StatCard";
import { useLanguage } from "@/lib/i18n";
import { HOOK_STATS } from "@/lib/reelRadarData";

const MY_HITS = [
  { id: "m1", title: "开学季招生优惠", plays: "42K", multiple: 2.4, color: "#fc0c97" },
  { id: "m2", title: "老师专访 Reel", plays: "31K", multiple: 2.1, color: "#7c25d9" },
];

const MY_HOOK_USAGE: Record<string, number> = {
  先亮结果: 3,
  反直觉断言: 0,
  点名痛点: 1,
  直接提问: 2,
  对比: 0,
};

const DIAGNOSIS_TEXT = `总体印象：过去 30 天你发布了 12 条 reels，播放中位数 18K，比领域平均（26K）略低，但你的「先亮结果」类型开场表现突出（平均 42K），说明这个方向值得加码。

强项：老师出镜类内容完播率高于平均 15%，家长信任感强；「先亮结果」开场的 3 条 reels 全部进入你账号前 5 名。

弱点与漏洞：11 种开场里你只用过 3 种，「反直觉断言」和「对比」完全没试过，而这两种在同行数据里播放中位数分别排第 2 和第 5，是明显的空白。剪辑节奏偏慢，前 3 秒信息密度不够。

跟领域规律的差距：领域 Top 5 开场你只覆盖了 2 种，覆盖率 40%，低于建议的 60% 门槛。

接下来 30 天的 3 个行动：
1. 本周内用「反直觉断言」开场拍 1 条，参考 @studyhub.my 那条 84K 播放的结构。
2. 把「先亮结果」类型的发布频率从每月 1 条提高到每月 3 条，这是你目前的最强项。
3. 剪辑时把前 3 秒信息压缩到 1 个画面 + 1 句话，参考本期黑马的开场速度。`;

export default function AccountTab() {
  const { t } = useLanguage();
  const [rescanning, setRescanning] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);

  const handleRescan = () => {
    setRescanning(true);
    setTimeout(() => setRescanning(false), 1200);
  };

  const handleDiagnose = () => {
    setDiagnosing(true);
    setTimeout(() => {
      setDiagnosing(false);
      setDiagnosis(DIAGNOSIS_TEXT);
    }, 1400);
  };

  const top5Hooks = HOOK_STATS.slice(0, 5);

  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-semibold">{t("account.title")}</h2>
          <p className="text-sm text-muted mt-1 max-w-2xl">{t("account.subtitle")}</p>
        </div>
        <button
          onClick={handleRescan}
          disabled={rescanning}
          className="rounded-xl brand-gradient text-white text-sm font-medium px-4 py-2.5 shadow-sm hover:opacity-90 transition disabled:opacity-60 shrink-0"
        >
          {rescanning ? "…" : t("account.rescan")}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label={t("account.statCollected")} value={12} />
        <StatCard label={t("account.statMedian")} value="18K" />
        <StatCard label={t("account.statMax")} value="42K" />
        <StatCard label={t("account.statVoiceover")} value="83%" />
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold mb-1">{t("account.myHits")}</p>
        <p className="text-xs text-muted mb-3">{t("account.myHitsDesc")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MY_HITS.map((hit) => (
            <div key={hit.id} className="rounded-xl border border-border bg-surface p-3.5 flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg shrink-0"
                style={{ background: `linear-gradient(160deg, ${hit.color}, ${hit.color}88)` }}
              >
                ▶
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{hit.title}</p>
                <p className="text-[11px] text-muted">
                  {hit.plays} · <span className="text-yellow-600 font-medium">×{hit.multiple}</span>
                </p>
              </div>
              <button className="text-[11px] font-medium text-brand-pink shrink-0">{t("reelradar.rewrite")}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold mb-1">{t("account.hookComparison")}</p>
        <p className="text-xs text-muted mb-3">{t("account.hookComparisonDesc")}</p>
        <div className="rounded-2xl border border-border bg-surface p-4 space-y-3">
          {top5Hooks.map((h) => {
            const used = MY_HOOK_USAGE[h.hook] ?? 0;
            return (
              <div key={h.hook} className="flex items-center justify-between text-sm">
                <span className="font-medium">{h.hook}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">
                    {used === 0 ? "" : `× ${used}`}
                  </span>
                  {used === 0 && (
                    <span className="rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-semibold px-2 py-0.5">
                      {t("account.notTriedYet")}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold">{t("account.diagnosis")}</p>
          {!diagnosis && (
            <button
              onClick={handleDiagnose}
              disabled={diagnosing}
              className="rounded-lg border border-border text-xs font-medium px-3 py-1.5 hover:bg-background disabled:opacity-60"
            >
              {diagnosing ? t("account.diagnosing") : t("account.generateDiagnosis")}
            </button>
          )}
        </div>
        {diagnosis && (
          <div className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{diagnosis}</p>
          </div>
        )}
      </div>
    </div>
  );
}
