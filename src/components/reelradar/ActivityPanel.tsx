"use client";

import { useLanguage } from "@/lib/i18n";

interface LogEntry {
  id: string;
  time: string;
  summary: string;
}

const LOG: LogEntry[] = [
  {
    id: "l1",
    time: "2026-08-10 09:12",
    summary: "扫描了 16 个竞品账号，新收进 6 条 reels，全部分析成功，花费约 RM0.40。",
  },
  {
    id: "l2",
    time: "2026-08-09 22:40",
    summary: "扫描了 16 个竞品账号，新收进 4 条 reels；@futurekids.center 抓取失败（该账号暂时私密），下次扫描会自动重试。",
  },
  {
    id: "l3",
    time: "2026-08-08 09:05",
    summary: "扫描了 15 个竞品账号，新收进 9 条 reels，全部分析成功，花费约 RM0.55。",
  },
];

export default function ActivityPanel({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-surface shadow-xl flex flex-col">
        <div className="brand-gradient px-5 py-5 text-white">
          <button onClick={onClose} className="text-white/80 hover:text-white text-sm mb-3">
            {t("detail.close")}
          </button>
          <h2 className="text-lg font-semibold">{t("reelradar.activityLog")}</h2>
          <p className="text-xs text-white/80 mt-1">{t("reelradar.activityDesc")}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {LOG.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-border p-3.5">
              <p className="text-[11px] text-muted mb-1">{entry.time}</p>
              <p className="text-sm leading-relaxed">{entry.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
