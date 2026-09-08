"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

type ScriptStatus = "draft" | "shot" | "archived";

interface Beat {
  text: string;
  shot: string;
  seconds: number;
}

interface Script {
  id: string;
  title: string;
  hook: string;
  date: string;
  status: ScriptStatus;
  beats: Beat[];
  cta: string;
  caption: string;
}

function totalDuration(script: Script) {
  return script.beats.reduce((s, b) => s + b.seconds, 3);
}

const SAMPLE_SCRIPTS: Script[] = [
  {
    id: "s1",
    title: "3 个月成绩翻倍的秘密",
    hook: "「我儿子数学从不及格到全班前五，只用了一个学期」— 直接切到成绩单对比画面",
    date: "2026-08-11",
    status: "draft",
    beats: [
      { text: "家长口述第一个转折：换了学习方法", shot: "家长面对镜头说话，手持成绩单", seconds: 6 },
      { text: "第二个转折：老师一对一跟进", shot: "老师和孩子一起看作业的画面", seconds: 5 },
      { text: "第三个转折：孩子主动学习", shot: "孩子自己在书桌前学习的空镜", seconds: 5 },
    ],
    cta: "想让孩子也做到？私讯我们领取免费评估",
    caption: "AI 工具 帮孩子找到学习盲点，3 个月看到进步。#英雄教育 #EduHero #招生 #教育",
  },
  {
    id: "s2",
    title: "补错方向，越补越差？",
    hook: "「补习补得越多，成绩可能越差 —— 除非你做对这 3 件事」",
    date: "2026-08-11",
    status: "draft",
    beats: [
      { text: "误区一：盲目增加补习时数", shot: "日历画面，密密麻麻的补习安排", seconds: 5 },
      { text: "误区二：只背不理解", shot: "孩子对着课本发呆的画面", seconds: 5 },
      { text: "正确做法：理解式教学 + 家长陪伴", shot: "老师引导孩子思考的画面", seconds: 6 },
    ],
    cta: "想知道正确的学习方法？私讯我们免费咨询",
    caption: "AI tools for business 也能用在教育上。#英雄教育 #EduHero #家长必看",
  },
  {
    id: "s3",
    title: "孩子写作业总拖延？",
    hook: "「你的孩子写作业也是拖到最后一刻吗？」",
    date: "2026-08-11",
    status: "draft",
    beats: [
      { text: "场景一：边写边玩手机", shot: "孩子桌上手机+作业本", seconds: 4 },
      { text: "场景二：一直说等一下", shot: "妈妈催促的对话画面", seconds: 4 },
      { text: "解决方法：番茄钟 + 明确奖励", shot: "计时器 + 孩子专注写作业", seconds: 6 },
    ],
    cta: "点击了解我们的时间管理课程",
    caption: "ChatGPT 教学 也能帮孩子规划时间。#英雄教育 #EduHero #时间管理",
  },
];

const STATUS_META: Record<ScriptStatus, { labelKey: string; color: string; bg: string }> = {
  draft: { labelKey: "scripts.statusDraft", color: "#B45309", bg: "#FEF3C7" },
  shot: { labelKey: "scripts.statusShot", color: "#16A34A", bg: "#DCFCE7" },
  archived: { labelKey: "scripts.statusArchived", color: "#837C8D", bg: "#F1EFF3" },
};

export default function ScriptsTab() {
  const { t } = useLanguage();
  const [scripts, setScripts] = useState<Script[]>([]);
  const [generating, setGenerating] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setScripts(SAMPLE_SCRIPTS);
      setGenerating(false);
    }, 1000);
  };

  const updateScript = (id: string, patch: Partial<Script>) => {
    setScripts((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const setStatus = (id: string, status: ScriptStatus) => updateScript(id, { status });
  const removeScript = (id: string) => {
    setScripts((prev) => prev.filter((s) => s.id !== id));
    if (openId === id) setOpenId(null);
  };

  const open = scripts.find((s) => s.id === openId) ?? null;

  if (open) {
    const fullText = [
      open.title,
      "",
      t("scripts.hook") + "：" + open.hook,
      "",
      ...open.beats.map((b, i) => `${i + 1}. ${b.text}（${t("scripts.shotLabel")}：${b.shot}，${b.seconds}秒）`),
      "",
      t("scripts.ctaEnding") + "：" + open.cta,
      "",
      open.caption,
    ].join("\n");

    return (
      <div>
        <button
          onClick={() => {
            setOpenId(null);
            setEditing(false);
          }}
          className="text-sm font-medium text-muted hover:text-brand-pink mb-4"
        >
          {t("scripts.back")}
        </button>

        <div className="rounded-2xl border border-border bg-surface p-5 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] text-muted uppercase tracking-wide">{t("scripts.coverTitle")}</p>
              {editing ? (
                <input
                  value={open.title}
                  onChange={(e) => updateScript(open.id, { title: e.target.value })}
                  className="text-xl font-semibold mt-1 w-full rounded-lg border border-border bg-surface px-2 py-1"
                />
              ) : (
                <h2 className="text-xl font-semibold mt-1">{open.title}</h2>
              )}
              <p className="text-xs text-muted mt-1">
                {t("scripts.duration")}: {totalDuration(open)}s · {open.date}
              </p>
            </div>
            <button
              onClick={() => setEditing((e) => !e)}
              className="rounded-lg border border-border text-xs font-medium px-3 py-1.5 hover:bg-background shrink-0"
            >
              {editing ? t("action.save") : t("scripts.edit")}
            </button>
          </div>

          <div>
            <p className="text-xs font-medium text-muted mb-1">{t("scripts.hook")}</p>
            {editing ? (
              <textarea
                value={open.hook}
                onChange={(e) => updateScript(open.id, { hook: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-sm"
              />
            ) : (
              <p className="text-sm">{open.hook}</p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-muted mb-2">{t("scripts.beats")}</p>
            <div className="space-y-2">
              {open.beats.map((beat, idx) => (
                <div key={idx} className="rounded-lg border border-border p-3 text-sm">
                  {editing ? (
                    <>
                      <textarea
                        value={beat.text}
                        onChange={(e) => {
                          const beats = [...open.beats];
                          beats[idx] = { ...beat, text: e.target.value };
                          updateScript(open.id, { beats });
                        }}
                        rows={2}
                        className="w-full rounded-md border border-border bg-surface px-2 py-1 text-sm mb-1.5"
                      />
                      <div className="flex gap-2">
                        <input
                          value={beat.shot}
                          onChange={(e) => {
                            const beats = [...open.beats];
                            beats[idx] = { ...beat, shot: e.target.value };
                            updateScript(open.id, { beats });
                          }}
                          className="flex-1 rounded-md border border-border bg-surface px-2 py-1 text-xs"
                        />
                        <input
                          type="number"
                          value={beat.seconds}
                          onChange={(e) => {
                            const beats = [...open.beats];
                            beats[idx] = { ...beat, seconds: Number(e.target.value) || 0 };
                            updateScript(open.id, { beats });
                          }}
                          className="w-16 rounded-md border border-border bg-surface px-2 py-1 text-xs"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{beat.text}</p>
                      <p className="text-[11px] text-muted mt-1">
                        {t("scripts.shotLabel")}：{beat.shot} · {beat.seconds}s
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted mb-1">{t("scripts.ctaEnding")}</p>
            {editing ? (
              <textarea
                value={open.cta}
                onChange={(e) => updateScript(open.id, { cta: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-sm"
              />
            ) : (
              <p className="text-sm">{open.cta}</p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-muted mb-1">{t("scripts.captionHashtags")}</p>
            {editing ? (
              <textarea
                value={open.caption}
                onChange={(e) => updateScript(open.id, { caption: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-sm"
              />
            ) : (
              <p className="text-sm">{open.caption}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <p className="text-[11px] text-muted max-w-xs">{t("scripts.autosaveNote")}</p>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(fullText).catch(() => {});
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="rounded-xl brand-gradient text-white text-sm font-medium px-4 py-2.5 shrink-0"
            >
              {copied ? t("scripts.copied") : t("scripts.copyAll")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-semibold">{t("scripts.title")}</h2>
          <p className="text-sm text-muted mt-1 max-w-2xl">{t("scripts.subtitle")}</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="rounded-xl brand-gradient text-white text-sm font-medium px-4 py-2.5 shadow-sm hover:opacity-90 transition disabled:opacity-60 shrink-0"
        >
          {generating ? t("scripts.generating") : t("scripts.generate")}
        </button>
      </div>

      {scripts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 flex items-center justify-center text-sm text-muted text-center px-8">
          {t("common.comingSoonNote")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scripts.map((s) => {
            const meta = STATUS_META[s.status];
            return (
              <div key={s.id} className="rounded-2xl border border-border bg-surface p-4 space-y-2">
                <button onClick={() => setOpenId(s.id)} className="text-left w-full">
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium mb-2"
                    style={{ color: meta.color, backgroundColor: meta.bg }}
                  >
                    {t(meta.labelKey)}
                  </span>
                  <p className="text-sm font-semibold leading-snug">{s.title}</p>
                  <p className="text-xs text-muted mt-1 line-clamp-2">{s.hook}</p>
                  <p className="text-[11px] text-muted mt-2">
                    {totalDuration(s)}s · {s.date}
                  </p>
                </button>
                <div className="flex items-center gap-1 pt-2 border-t border-border text-[11px]">
                  <button onClick={() => setOpenId(s.id)} className="flex-1 text-muted hover:text-brand-pink py-1">
                    {t("scripts.edit")}
                  </button>
                  <button
                    onClick={() => setStatus(s.id, "shot")}
                    className="flex-1 text-muted hover:text-brand-pink py-1"
                  >
                    {t("scripts.markShot")}
                  </button>
                  <button
                    onClick={() => setStatus(s.id, "archived")}
                    className="flex-1 text-muted hover:text-brand-pink py-1"
                  >
                    {t("scripts.archive")}
                  </button>
                  <button onClick={() => removeScript(s.id)} className="flex-1 text-muted hover:text-red-500 py-1">
                    {t("scripts.delete")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
