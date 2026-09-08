export const HOOK_TYPES = [
  "直接提问",
  "反直觉断言",
  "点名痛点",
  "卖关子",
  "先亮结果",
  "承诺教学",
  "蹭热点",
  "故事开场",
  "避坑警告",
  "对比",
  "其他",
] as const;

export type HookType = (typeof HOOK_TYPES)[number];

export interface MockReel {
  id: string;
  account: string;
  hookType: HookType;
  plays: string;
  playsNum: number;
  likes: string;
  score: number;
  viralMultiple: number | null;
  isNew: boolean;
  color: string;
  whyScored: string;
  hook: string;
  structure: string;
  cta: string;
  transcript: string;
  rewrite: string;
  remix: string;
}

export const MOCK_REELS: MockReel[] = [
  {
    id: "r1",
    account: "@smartkids.edu",
    hookType: "先亮结果",
    plays: "128K",
    playsNum: 128000,
    likes: "6.2K",
    score: 9,
    viralMultiple: 3.3,
    isNew: true,
    color: "#fc0c97",
    whyScored: "开场 3 秒直接放出「成绩从 C 变 A」的结果，完播率比该账号平常高 40%，和你的招生定位高度相关。",
    hook: "「我女儿 UPSR 从 C 变 A，只花了 3 个月」— 画面直接切到成绩单特写",
    structure: "亮结果 → 家长口述过程（3 个转折点）→ 老师出镜背书 → CTA 引导私讯",
    cta: "「想知道怎么做到的？私讯我们领取免费学习计划」",
    transcript:
      "（画面：成绩单特写）我女儿 UPSR 从 C 变 A，只花了 3 个月。一开始我们也不相信……（家长口述转折 1：换了学习方法）……（转折 2：老师一对一跟进）……（转折 3：孩子自己开始主动学习）。（老师出镜）我们用的是理解式教学，不是死背。想知道怎么做到的？私讯我们领取免费学习计划。",
    rewrite:
      "🎓「我儿子数学从不及格到全班前五，只用了一个学期」\n\n开场：直接切到成绩单对比画面（3秒内）\n中段：家长口述 3 个关键转折 + 老师现身说法\n结尾：「想让孩子也做到？私讯我们领取免费评估」\n\n#英雄教育 #EduHero #招生 #教育",
    remix:
      "「我女儿 UPSR 从 C 变 A，只花了 3 个月」— 画面直接切到成绩单特写\n\n（照抄结构，换成英雄教育的语气和案例）\n一开始我们也半信半疑……换了学习方法后，老师一对一跟进，孩子自己开始主动学习。\n\n想知道怎么做到的？私讯英雄教育领取免费学习计划。",
  },
  {
    id: "r2",
    account: "@studyhub.my",
    hookType: "反直觉断言",
    plays: "84K",
    playsNum: 84000,
    likes: "4.1K",
    score: 8,
    viralMultiple: 2.1,
    isNew: false,
    color: "#7c25d9",
    whyScored: "用「补习越多成绩越差」这种反直觉说法在前 2 秒抓住注意力，评论区互动率是平常的 5 倍。",
    hook: "「补习补得越多，成绩可能越差 —— 除非你做对这 3 件事」",
    structure: "反直觉断言 → 列出 3 个常见错误 → 给出正确做法 → 软性带出品牌方法论",
    cta: "「想知道正确的学习方法？主页链接免费咨询」",
    transcript:
      "补习补得越多，成绩可能越差——除非你做对这 3 件事。第一，补习不是越多越好，要对症下药。第二，孩子要理解而不是死背。第三，家长的陪伴比补习时数更重要。想知道正确的学习方法？主页链接免费咨询。",
    rewrite:
      "「花钱补习，成绩却没进步？可能是你补错方向了」\n\n开场：反直觉断言（2秒）\n中段：3 个常见误区 + 正确做法对比\n结尾：软性带出品牌 + CTA\n\n#英雄教育 #EduHero #家长必看",
    remix:
      "「补习补得越多，成绩可能越差——除非你做对这 3 件事」\n\n（照抄结构，换成英雄教育案例）\n第一，补习不是越多越好；第二，理解比死背重要；第三，陪伴比时数重要。\n\n想知道正确的学习方法？私讯英雄教育免费咨询。",
  },
  {
    id: "r3",
    account: "@brightpath.tuition",
    hookType: "直接提问",
    plays: "51K",
    playsNum: 51000,
    likes: "2.8K",
    score: 7,
    viralMultiple: null,
    isNew: true,
    color: "#2563EB",
    whyScored: "开场用问句「你的孩子也这样吗？」直接对话目标家长，代入感强，适合你们的家长群体。",
    hook: "「你的孩子写作业也是拖到最后一刻吗？」",
    structure: "提问代入 → 3 个常见场景 → 给出解决方法 → 引导报名试听",
    cta: "「点击了解我们的时间管理课程」",
    transcript:
      "你的孩子写作业也是拖到最后一刻吗？场景一：边写边玩手机。场景二：一直说等一下。场景三：写到很晚才开始。我们的方法是……点击了解我们的时间管理课程。",
    rewrite:
      "「孩子写作业总是拖延？3 个方法帮你解决」\n\n开场：提问代入家长痛点\n中段：3 个真实场景 + 具体解法\n结尾：引导预约免费试听\n\n#英雄教育 #EduHero #时间管理",
    remix:
      "「你的孩子写作业也是拖到最后一刻吗？」\n\n（照抄结构，换成英雄教育案例）场景一、二、三 + 我们的解决方法。\n\n点击了解英雄教育的时间管理课程。",
  },
  {
    id: "r4",
    account: "@examwhiz",
    hookType: "对比",
    plays: "39K",
    playsNum: 39000,
    likes: "1.9K",
    score: 6,
    viralMultiple: null,
    isNew: false,
    color: "#16A34A",
    whyScored: "用「传统补习 vs 我们的方法」左右对比画面，视觉冲击强，但完播率一般，适合当作素材参考而非直接照搬。",
    hook: "画面左右分屏：「死记硬背」vs「理解式学习」",
    structure: "对比画面 → 两种方法的效果差异 → 数据佐证 → 品牌植入",
    cta: "「想体验理解式学习？免费试听名额有限」",
    transcript:
      "（左右分屏）左边：死记硬背，压力大、忘得快。右边：理解式学习，轻松记得久。数据显示理解式学习的学生成绩进步快 2 倍。想体验理解式学习？免费试听名额有限。",
    rewrite:
      "「死记硬背 vs 真正理解 —— 差别有多大？」\n\n开场：左右分屏对比画面\n中段：效果数据对比\n结尾：免费试听 CTA\n\n#英雄教育 #EduHero #学习方法",
    remix:
      "画面左右分屏：「死记硬背」vs「理解式学习」\n\n（照抄结构，换成英雄教育数据）理解式学习学生进步快 2 倍。\n\n想体验？英雄教育免费试听名额有限。",
  },
];

export const HOOK_STATS: { hook: HookType; medianViews: string; samples: number; avgRelevance: number }[] = [
  { hook: "先亮结果", medianViews: "120K", samples: 18, avgRelevance: 8.6 },
  { hook: "反直觉断言", medianViews: "76K", samples: 14, avgRelevance: 8.1 },
  { hook: "点名痛点", medianViews: "68K", samples: 11, avgRelevance: 7.8 },
  { hook: "直接提问", medianViews: "54K", samples: 9, avgRelevance: 7.2 },
  { hook: "对比", medianViews: "47K", samples: 8, avgRelevance: 6.9 },
  { hook: "承诺教学", medianViews: "41K", samples: 7, avgRelevance: 6.5 },
  { hook: "避坑警告", medianViews: "38K", samples: 6, avgRelevance: 6.3 },
  { hook: "卖关子", medianViews: "32K", samples: 5, avgRelevance: 5.9 },
  { hook: "故事开场", medianViews: "29K", samples: 5, avgRelevance: 5.7 },
  { hook: "蹭热点", medianViews: "22K", samples: 3, avgRelevance: 5.1 },
  { hook: "其他", medianViews: "14K", samples: 4, avgRelevance: 4.2 },
];
