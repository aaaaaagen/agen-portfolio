import { Fragment, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { fundNotchContent } from "./fundNotchContent";
import { aiLabVisualSkillContent } from "./aiLabVisualSkillContent";
import { aiDouyinCitySkillContent } from "./aiDouyinCitySkillContent";
import { flowmintContent } from "./flowmintContent";
import { aiLabMultiSizeContent } from "./aiLabMultiSizeContent";
import { douyinUgcContent, douyinUgcSidebarCopy, douyinUgcTopContent } from "./douyinUgcContent";

const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const scrambleTextFrame = (text, progress) => {
  const revealAt = progress * Array.from(text).filter((character) => character !== " " && character !== "\n").length;
  let characterIndex = 0;
  return Array.from(text).map((character) => {
    if (character === " " || character === "\n") return character;
    const resolved = characterIndex < revealAt;
    characterIndex += 1;
    return resolved ? character : scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)];
  }).join("");
};

function ScrambleText({ text, trigger = 0 }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return undefined;
    }

    const holdDuration = 0;
    const scrambleDuration = 1900;
    const settleDuration = 1250;
    const startedAt = performance.now();
    const update = () => {
      const phase = performance.now() - startedAt;
      const nextText = phase < holdDuration || phase >= holdDuration + scrambleDuration
        ? text
        : scrambleTextFrame(text, (phase - holdDuration) / scrambleDuration);
      setDisplayText((currentText) => currentText === nextText ? currentText : nextText);
      if (phase >= holdDuration + scrambleDuration + settleDuration) window.clearInterval(timer);
    };

    setDisplayText(text);
    update();
    const timer = window.setInterval(update, 72);
    return () => window.clearInterval(timer);
  }, [text, trigger]);

  return <span aria-label={text}><span aria-hidden="true">{displayText}</span></span>;
}

const keychainItems = [
  { id: "07", label: "AI LAB", src: "/assets/keychain-07-ai-lab.png", hit: [0.73, 0.48], className: "piece-ai" },
  { id: "06", label: "EXERCISES", src: "/assets/keychain-06-practice.png", hit: [0.66, 0.57], className: "piece-practice" },
  { id: "05", label: "BRAND", src: "/assets/keychain-05-brand.png", hit: [0.62, 0.58], className: "piece-brand" },
  { id: "04", label: "KUAISHOU", src: "/assets/keychain-04-kuaishou.png", hit: [0.53, 0.53], className: "piece-kuaishou" },
  { id: "03", label: "MEITUAN", src: "/assets/keychain-03-meituan.png", hit: [0.41, 0.56], className: "piece-meituan" },
  { id: "02", label: "DOUYIN", src: "/assets/keychain-02-douyin.png", hit: [0.29, 0.60], className: "piece-douyin" },
  { id: "01", label: "ABOUT ME", src: "/assets/keychain-01-about.png", hit: [0.23, 0.43], className: "piece-about" },
];

const workPendants = {
  "01": "/assets/keychain-douyin-collection.png",
  "02": "/assets/keychain-meituan-collection.png",
  "03": "/assets/keychain-kuaishou-collection.png",
  "04": "/assets/keychain-brand-collection.png",
  "05": "/assets/keychain-exercises-collection.png",
  "06": "/assets/keychain-ai-lab-collection.png",
};

const keychainWorkMap = {
  "02": "01",
  "03": "02",
  "04": "03",
  "05": "04",
  "06": "05",
  "07": "06",
};

const works = [
  { id: "01", title: "Douyin", type: "CONTENT & PRODUCT", period: "2025—♾️", color: "lime", preview: "/assets/work-previews/douyin.png", previewImages: [
    "/assets/work-previews/douyin-folder-preview/01-spring-festival.jpg",
    "/assets/work-previews/douyin-folder-preview/02-soda-music.png",
    "/assets/work-previews/douyin-folder-preview/03-dance-competition.png",
  ], detail: "持续进行中的内容、产品与创意实践。", layout: "cases" },
  { id: "02", title: "Meituan", type: "PRODUCT WORK", period: "2023—2025", color: "yellow", preview: "/assets/work-previews/meituan.png", previewImages: [
    "/assets/work-previews/meituan-folder-preview/01.png",
    "/assets/work-previews/meituan-folder-preview/02.png",
    "/assets/work-previews/meituan-folder-preview/03.png",
  ], detail: "负责美团 S/A 级营销活动及亿级曝光项目的视觉设计，能够结合业务目标、用户行为与数据反馈优化设计方案。", role: "平台设计中心 · 营销视觉设计", impact: true, layout: "stream" },
  { id: "03", title: "Kuaishou", type: "PRODUCT WORK", period: "2022—2023", color: "blue", preview: "/assets/work-previews/kuaishou.png", previewImages: [
    "/assets/work-previews/kuaishou-folder-preview/01.png",
    "/assets/work-previews/kuaishou-folder-preview/02.png",
    "/assets/work-previews/kuaishou-folder-preview/03.png",
  ], detail: "围绕内容体验、产品策略与创作者生态展开的工作。", layout: "cases" },
  { id: "04", title: "Brand", type: "BRAND & IDENTITY", period: "", color: "orange", preview: "/assets/work-previews/exercises.png", previewImages: [
    "/assets/work-previews/brand-folder-preview/01.png",
    "/assets/work-previews/brand-folder-preview/02.png",
    "/assets/work-previews/brand-folder-preview/03.png",
  ], detail: "围绕品牌定位、视觉识别与内容表达展开的设计实践。", layout: "stream" },
  { id: "05", title: "Exercises I did", type: "EXPERIMENTS", period: "2023", color: "grey", preview: "/assets/work-previews/exercises.png", previewImages: [
    "/assets/work-previews/exercises-2023-collection-hover/01.png",
    "/assets/work-previews/exercises-2023-collection-hover/02.png",
    "/assets/work-previews/exercises-2023-collection-hover/03.png",
  ], detail: "曾经做过的设计、内容与视觉练习。", layout: "stream" },
  { id: "06", title: "AI Lab", type: "AI EXPERIMENTS", period: "", color: "pink", preview: "/assets/work-previews/ai-lab.png", previewImages: [
    "/assets/work-previews/ai-lab-folder-preview/01.png",
    "/assets/work-previews/ai-lab-folder-preview/02.png",
  ], detail: "探索 AI、视觉、原型与代码之间的新组合。", layout: "stream" },
];

const projectLabels = {
  "01": ["2026抖音欢笑中国年", "汽水音乐项目合辑", "潮流舞蹈大赛", "25国庆&暑期项目合辑", "抖音极速版项目合辑", "UGC激励合辑"],
  "02": ["元旦大促", "节日营销合辑", "神券街&神券节", "88大促"],
  "03": ["运营设计合辑", "2023兔年CNY", "2022设计合辑"],
  "04": ["抖音球王争霸赛", "START HERE. 边玩边创造", "抖音极速版天天免单"],
  "05": ["2023练习合辑"],
  "06": ["FLOWMINT多模态AI创作工具", "主视觉长图延展Skill", "AI 抖音城市图文生成 Skill", "今日基金 FundNotch", "AI 多尺寸延展"],
};

const aboutSocials = [
  { label: "小红书", icon: "/assets/icon-xiaohongshu.svg", href: "https://www.xiaohongshu.com/user/profile/5ca5aa6e000000001000fa54" },
  { label: "Behance", icon: "/assets/icon-behance.svg", href: "https://www.behance.net/agerazk" },
  { label: "站酷", icon: "/assets/icon-zcool.svg", href: "https://www.zcool.com.cn/u/ZNzc2NjE2MDg=" },
  { label: "GitHub", icon: "/assets/icon-github.svg", href: "https://github.com/aaaaaagen" },
];

const douyinSpringAssetOrder = [
  ...Array.from({ length: 13 }, (_, index) => `${String(index + 1).padStart(2, "0")}.${index === 1 || index === 2 ? "jpg" : "png"}`),
  "16.png",
  "17.png",
  "15.png",
  "14.png",
  "18.png",
];

const qishuiMusicAssetOrder = [
  "01.jpg",
  "02.png",
  "03.png",
  "04.png",
  "05.png",
  "06.png",
  "07.png",
  "08.png",
  "10.png",
  "09.png",
  "11.png",
  "12.png",
];

const danceCompetitionAssetOrder = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
const nationalDayAssetOrder = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"];
const speedEditionAssetOrder = ["1.png", "2.png", "3.png", "4.png", "5.png"];
const kuaishouOperationsAssetOrder = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];
const kuaishouRabbitCnyAssetOrder = ["1.png", "2.png", "3.png", "4.png", "5.jpg", "6.jpg", "7.jpg"];
const kuaishouTigerCnyAssetOrder = ["1.jpg", "2.jpg", "3.png", "4.png", "5.png", "6.png", "7.jpg", "8.jpg"];
// 练习项目按源文件名的数字顺序展示，而不是按素材加入时间顺序。
const exercises2023LeadAssetOrder = ["newjeans-dolls.png", "newjeans-album.png"];
const exercises2023AssetOrder = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png", "10.png", "11.png"];
const brandAiCreatorAssetGroups = [
  ["1.png"],
  ["2-1.png", "2-2.png", "2-3.png"],
  ["3-1.png", "3-2.png", "3-3.png"],
  ["4-1.png", "4-2.png", "4-3.png", "4-4.png", "4-5.png"],
  ["5-1.png", "5-2.png", "5-3.png"],
  ["6-1.png", "6-2.png"],
  ["6-3.png", "6-4.png"],
];
const brandDailyFreeAssetGroups = [
  ["1-1.png", "1-2.png"],
  ["2-1.png", "2-2.png"],
  ["3-1.png", "3-2.png"],
  ["4.png"],
  ["2028.png"],
];
const fundNotchAssetGroups = [
  ["1-1.png", "1-2.png", "1-3.png", "1-4.png", "1-5.png"],
  ["2-1.png", "2-2.png", "2-3.png", "2-4.png", "2-5.png"],
];
const flowmintAssetGroups = [
  ["1-1.png", "1-2.png", "1-3.png", "1-4.png"],
  ["2-1.png", "2-2.png", "2-3.png", "2-4.png"],
];

const projectAssets = {
  "06.01": flowmintAssetGroups.flat().map((filename) => {
    const src = `/assets/work-previews/ai-lab-flowmint/${filename}`;
    return { thumb: src, full: src };
  }),
  "01.01": douyinSpringAssetOrder.map((filename, index) => {
    const src = `/assets/work-previews/douyin-spring-2026/${filename}`;
    return { thumb: index === 0 ? "/assets/work-previews/douyin-spring-2026/02.jpg" : src, full: src };
  }),
  "01.02": qishuiMusicAssetOrder.map((filename) => {
    const src = `/assets/work-previews/qishui-music-collection/${filename}`;
    return { thumb: filename === "01.jpg" ? "/assets/work-previews/qishui-music-collection/09.png" : src, full: src };
  }),
  "01.03": danceCompetitionAssetOrder.map((filename) => {
    const src = `/assets/work-previews/douyin-dance-competition/${filename}`;
    return { thumb: src, full: src };
  }),
  "01.04": nationalDayAssetOrder.map((filename) => {
    const src = `/assets/work-previews/douyin-national-day-2025/${filename}`;
    return { thumb: src, full: src };
  }),
  "01.05": speedEditionAssetOrder.map((filename) => {
    const src = `/assets/work-previews/douyin-speed-2025/${filename}`;
    return { thumb: src, full: src };
  }),
  "01.06": [
    { thumb: "/assets/work-previews/douyin-ugc/cover.png", full: "/assets/work-previews/douyin-ugc/01-interaction-flow.png" },
    { thumb: "/assets/work-previews/douyin-ugc/cover.png", full: "/assets/work-previews/douyin-ugc/02-activity-flow.png" },
    { thumb: "/assets/work-previews/douyin-ugc/cover.png", full: "/assets/work-previews/douyin-ugc/03-life-service-flow.png" },
    { thumb: "/assets/work-previews/douyin-ugc/cover.png", full: "/assets/work-previews/douyin-ugc/04-ecommerce-flow.png" },
  ],
  "03.01": kuaishouOperationsAssetOrder.map((filename) => {
    const src = `/assets/work-previews/kuaishou-operations-collection/${filename}`;
    return { thumb: filename === "1.jpg" ? "/assets/work-previews/kuaishou-operations-collection/cover.png" : src, full: src };
  }),
  "03.02": kuaishouRabbitCnyAssetOrder.map((filename) => {
    const src = `/assets/work-previews/kuaishou-2023-rabbit-cny/${filename}`;
    return { thumb: filename === "1.png" ? "/assets/work-previews/kuaishou-2023-rabbit-cny/cover.png" : src, full: src };
  }),
  "03.03": kuaishouTigerCnyAssetOrder.map((filename) => {
    const src = `/assets/work-previews/kuaishou-2022-tiger-cny/${filename}`;
    return { thumb: filename === "1.jpg" ? "/assets/work-previews/kuaishou-2022-tiger-cny/cover.png" : src, full: src };
  }),
  "04.01": Array.from({ length: 12 }, (_, index) => {
    const filename = `${String(index + 1).padStart(2, "0")}.png`;
    const src = `/assets/work-previews/brand-basketball-championship/${filename}`;
    return { thumb: index === 0 ? "/assets/work-previews/brand-basketball-championship/02.png" : src, full: src };
  }),
  "04.02": brandAiCreatorAssetGroups.flat().map((filename) => {
    const src = `/assets/work-previews/brand-ai-creator-program/${filename}`;
    return { thumb: src, full: src };
  }),
  "04.03": brandDailyFreeAssetGroups.flat().map((filename) => {
    const src = `/assets/work-previews/brand-daily-free/${filename}`;
    return { thumb: filename === "1-1.png" ? "/assets/work-previews/brand-daily-free/cover.png" : src, full: src };
  }),
  "05.01": [
    ...exercises2023LeadAssetOrder,
    ...exercises2023AssetOrder,
  ].map((filename) => {
    const src = `/assets/work-previews/exercises-2023-collection/${filename}`;
    return { thumb: src, full: src };
  }).map((asset, index) => index === 0 ? { ...asset, thumb: "/assets/work-previews/exercises-2023-collection/cover.png" } : asset),
  "06.02": [
    { thumb: "/assets/work-previews/ai-lab-main-visual-skill/cover.png", full: "/assets/work-previews/ai-lab-main-visual-skill/01.png" },
    { thumb: "/assets/work-previews/ai-lab.png", full: "/assets/work-previews/ai-lab-main-visual-skill/02.png" },
  ],
  "06.03": [
    { thumb: "/assets/work-previews/ai-lab-city-skill/01.png", full: "/assets/work-previews/ai-lab-city-skill/01.png" },
    { thumb: "/assets/work-previews/ai-lab-city-skill/02.png", full: "/assets/work-previews/ai-lab-city-skill/02.png" },
  ],
  "06.04": fundNotchAssetGroups.flat().map((filename) => {
    const src = `/assets/work-previews/ai-lab-fund-notch/${filename}`;
    return { thumb: src, full: src };
  }),
  "06.05": [],
  "02.01": [
    { thumb: "/assets/work-previews/meituan-project-01-cover.png", full: "/assets/work-previews/meituan-01-new-year-day-01-full.jpg" },
    { thumb: "/assets/work-previews/meituan-01-new-year-day-02-thumb.jpg", full: "/assets/work-previews/meituan-01-new-year-day-02-full.jpg" },
    { thumb: "/assets/work-previews/meituan-01-new-year-day-03-thumb.jpg", full: "/assets/work-previews/meituan-01-new-year-day-03-full.jpg" },
    { thumb: "/assets/work-previews/meituan-01-new-year-day-04-thumb.jpg", full: "/assets/work-previews/meituan-01-new-year-day-04-full.jpg" },
  ],
  "02.02": [
    { thumb: "/assets/work-previews/meituan-project-02-cover.png", full: "/assets/work-previews/meituan-01-new-year-full.jpg" },
    { thumb: "/assets/work-previews/meituan-02-valentines.jpg", full: "/assets/work-previews/meituan-02-valentines-full.jpg" },
    { thumb: "/assets/work-previews/meituan-07-mid-autumn-thumb.jpg", full: "/assets/work-previews/meituan-07-mid-autumn-full.jpg" },
    { thumb: "/assets/work-previews/meituan-05-may-day-full.jpg", full: "/assets/work-previews/meituan-05-may-day-full.jpg" },
    { thumb: "/assets/work-previews/meituan-08-qixi-thumb.jpg", full: "/assets/work-previews/meituan-08-qixi-full.jpg" },
    { thumb: "/assets/work-previews/meituan-09-double-festival-02-full.png", full: "/assets/work-previews/meituan-09-double-festival-02-full.png" },
    { thumb: "/assets/work-previews/meituan-09-double-festival-03-full.png", full: "/assets/work-previews/meituan-09-double-festival-03-full.png" },
    { thumb: "/assets/work-previews/meituan-09-double-festival-04-full.png", full: "/assets/work-previews/meituan-09-double-festival-04-full.png" },
    { thumb: "/assets/work-previews/meituan-09-double-festival-05-full.png", full: "/assets/work-previews/meituan-09-double-festival-05-full.png" },
    { thumb: "/assets/work-previews/meituan-09-double-festival-06-full.png", full: "/assets/work-previews/meituan-09-double-festival-06-full.png" },
    { thumb: "/assets/work-previews/meituan-09-double-festival-01-thumb.jpg", full: "/assets/work-previews/meituan-09-double-festival-01-full.jpg" },
  ],
  "02.03": [
    { thumb: "/assets/work-previews/meituan-project-03-cover.png", full: "/assets/work-previews/meituan-03-hangzhou-coupon-street-full.jpg" },
    { thumb: "/assets/work-previews/meituan-06-coupon-festival-cp-thumb.jpg", full: "/assets/work-previews/meituan-06-coupon-festival-cp-full.jpg" },
    { thumb: "/assets/work-previews/meituan-shenquan-street-collection/04-ab-test.jpg", full: "/assets/work-previews/meituan-shenquan-street-collection/04-ab-test.jpg" },
  ],
  "02.04": [
    { thumb: "/assets/work-previews/meituan-04-88-sale-01.jpg", full: "/assets/work-previews/meituan-04-88-sale-01.png" },
    { thumb: "/assets/work-previews/meituan-04-88-sale-02.jpg", full: "/assets/work-previews/meituan-04-88-sale-02.png" },
    { thumb: "/assets/work-previews/meituan-04-88-sale-03-thumb.jpg", full: "/assets/work-previews/meituan-04-88-sale-03.jpg" },
  ],
};

const douyinSpringCopy = {
  overview: "在2026春节活动中负责集卡主玩法视觉及跃马攀峰分会场。",
  responsibilities: "负责完成集卡中祥马IP、集卡玩法和跃马攀峰活动页等视觉设计。集卡IP融合进各类物料贯穿其他春节玩法，有效推动统一完整的视觉表现。同时顺利交付跃马攀峰相关资源位。",
  collaboration: "交付期间协同PM拉齐信息，辅助开发完成项目适配玩法场景复现落地。后期LR走查期间及时记录反馈问题，并密切与UX侧协作，督促研发调整修改以保证玩法视觉效果。",
  growth: [
    "增长目标超额完成：小端实现千万级拉新，核心玩法完成度最高超目标 2.5 倍；抖音系拉新同比实现大幅增长。",
    "玩法效率显著提升：集卡参与及转化表现优于往年，上线首日拉新拉失活环比提升 250%+，CPA 下降 90%+。",
    "IP 创新验证有效：马年 IP 主线在用户调研中获得正向反馈，互动支线渗透达到双位数，明显高于历年同类玩法。",
    "互动规模突破 2 亿次，有效提升任务曝光与商业化承接能力。",
  ],
};

const douyinSpringImageNotes = {
  3: {
    heading: "集卡设计思路",
    paragraphs: [
      "基于「集祥马」主题，将传统的“卡牌收集”转化为更具角色感的祥马登场体验。用户抽到卡片时，以类似英雄角色亮相的方式展示每匹祥马，弱化“卡”的载体感，重点突出其个性、经历与新年寓意。",
      "通过 IP 造型、动态 Pose 与主题装饰元素强化不同祥马的辨识度，并融入马文化相关视觉符号，形成热烈、有气势且兼具文化韵味的春节氛围。",
      "设计上希望让用户收集的不只是不同卡片，而是具有独立性格与寓意的祥马角色，将功能性的“集卡”转化为更具角色认知、情感投射与收集驱动力的 IP 体验，从而增强玩法记忆点与持续参与意愿。",
    ],
  },
  4: {
    heading: "设计主题｜动能之年",
    paragraphs: [
      "提炼“马”所代表的 动能、势头与向前感，作为整套视觉的核心精神。通过奔腾、蓄势、向前的视觉语言，传递新一年充满动力、一路向前的积极寓意。",
      "关键词： 热烈 气势 动感 欢乐 文化感",
    ],
  },
};

const qishuiMusicCopy = {
  overview: "负责「周杰伦新专辑《太阳之子》上线」「浪漫音符召集令」「汽水音乐Live现场KV」等音乐营销项目的主视觉、活动页及推广资源位设计。围绕专辑宣发、抖汽导流及音乐人促产等目标，完成信息梳理、视觉风格建立及抖音、汽水音乐、应用商店等多场景延展，提升了艺人调性把控、营销视觉表达与多端设计能力。",
};

const danceCompetitionCopy = {
  overview: "在 S 级项目「潮流舞蹈大赛」中，我紧急支援了主视觉设计，并在短时间内完成多版方案竞稿，最终我的方案被选为项目 KV。设计围绕赛事全面升级的定位，兼顾潮流感、竞技感和全舞种包容性，强化年度重磅赛事的整体气势。这次项目体现了我在紧急需求下快速理解项目、探索不同方向并完成高质量交付的能力，也验证了我对大型赛事调性和核心视觉表达的把控。",
};

const speedEditionCopy = {
  overview: "负责「预约融合 2.0」「天天抽现金」「激励投稿打卡任务页」等项目的核心视觉设计，覆盖主视觉、H5 及活动长图等场景。能够在紧急排期下快速理解业务策略并完成高质量交付，其中预约融合项目在 1 天内完成主视觉升级，获得业务侧正向反馈；项目上线后实现抖音系 LT +0.03%，预计带来 DAU +4.6 万/天，促活成本指标显著正向。",
};

const nationalDayCopy = {
  projectName: "2025国庆项目",
  overview: "背景：暑期活动上线后开启小流量实验，与五一活动进行效率对比；国庆活动将选择效率更高的玩法，由算法圈人出活动，目标提升抖极 LT、LTV。",
  responsibilities: "国庆与暑期差异点：IP 区域采用旅行主题，设计四条城市路线，每轮路线包含 3 个红包，对应每个城市里的 3 个小景点。北京：故宫→长城→天坛；上海：东方明珠→静安寺→世博馆；杭州：奥体中心→雷峰塔→三潭映月；成都：武侯祠→339 电视塔→杜甫草堂。",
  collaboration: "活动仅 1 轮，用户完成一条城市路线后自动切换为下一条路线重新开始。作为创意视觉设计前置参与方案共创，协同产品解决多条城市路线中部分城市缺乏代表性地标的视觉表达难题；在多项目并行、排期紧张的情况下，通过流程提效将工时压缩约 50%，高质量完成 16 个景点视觉的设计与交付。",
  growth: "项目收益：ROI：国庆活动 v1 组真值 mROI=2.36（暑期活动 mROI=1.62），广告收入 +0.42%。收入主要来源为 CPM 曝光（70%）与广告收入（30%），源于任务候选池与排序逻辑迭代，部分任务完成率提升：商业化任务完成 +19%。",
  summerProjectName: "2025年暑期项目",
  summerOverview: "前置参与需求与创意共创，协同产品制定视觉方向，完成植物发芽—开花—结果等成长阶段设计，并配合动效完善成长反馈机制，通过持续测试迭代提升玩法趣味性与用户成就感。",
  summerGrowth: "- 项目收益：暑期活动整体实现收入正向，mROI >1；预约任务渗透率提升，气泡曝光显著提高导量拉新效果；在四个商业化任务中，“看视频得金币”渗透提升最大 +0.44pp。增量收入主要来自直播，占比 81.96%，CPM 收入占比 15.90%。直播任务整体完成率小幅上升，其中“看直播开宝箱”提升最高 +0.06pp。",
};

const brandBasketballCopy = {
  overview: "项目背景：是抖音发起的自制篮球赛事。通过搭建一套基于抖音运营体系的互联化的赛事，吸引中国最核心打球的人来参与赛事，成为球员孵化和成长的赛事平台。用户通过抖音报名参赛，系统匹配对阵，通过获胜积累积分晋升段位，根据不同段位打不同级别赛事并获取不同级别奖励，激发参与和分享。",
  responsibilities: "负责项目的核心视觉设计与项目管理，从前期需求拆解、视觉策略制定到赛事整套视觉落地全程推进，并结合不同赛事等级和线下场景完成多轮适配，保证线上传播与线下体验的一致性。",
  growth: "活动阶段共落地 39 场赛事，抖音话题曝光达 7.9 亿，累计产生 32 个热点；其中钻石赛首次落地，到场观众 700+，话题曝光 3.4 亿，球员满意度达 96%。项目验证了我在大型赛事视觉把控、复杂项目统筹及线上线下一体化设计方面的能力。",
};

const brandAiCreatorCopy = {
  overview: "活动目标：作为创变者计划全年比赛的收官赛段，通过表达初赛-复赛-决赛的作品沉淀、抖音校园独有的 AI 黑客松气质、丰富新颖的现场互动玩法来为创变者计划做一个完美收官 ending，作为全年最大的一次活动节点放大品牌声量。",
  responsibilities: "品牌概念：AI 正在打破经验与资历带来的创作门槛，而 AI 创变现场不设门槛，不问出处，让每一位参赛者都拥有把想法变成作品的机会，让每个人都可以 START HERE。在这里，创作不再属于少数人，而属于每一个愿意开始的人。",
  keywords: "关键词：年轻活力、AI创造、有趣味性",
  collaboration: "视觉阐释：不着重强调黑客松的硬核技术感，我们将视角回归大学生真实的创作状态——边玩边创造，边试边发生。整体视觉以校园语境和互联网文化为灵感，融合当下 AI 时代热门梗等熟悉的视觉符号，通过以代码块、抽象化的方式进行重构，让画面保留创作过程中的试错感、生成感与未完成感，仿佛一件作品正在不断被迭代和生成。",
};

const brandDailyFreeCopy = {
  overview: "背景：抖音极速版「天天免单」是平台联合生活服务打造的长期营销活动，以「免费吃大餐」为核心吸引点，用户通过完成浏览、签到、广告等任务获得抽奖机会。项目借助平台核心流量与团购免单权益，连接线上用户与线下商家，在提升用户活跃与到店转化的同时，为商家带来曝光与成交增量。",
  responsibilities: "从 0-1 搭建「天天免单」品牌视觉体系，提取「礼盒开启瞬间的迸发动势」作为核心视觉语言，并融入轻松趣味的 IP 表情，强化奖励感与“轻松赢免单”的活动心智，统一整体视觉规范与品牌表达。",
  highlights: [
    "将 AI 深度应用于视觉生产，主视觉 AI 使用占比达 80%，并沉淀长期可复用素材库，提升设计效率与产出质量。",
    "从业务与用户体验出发优化主会场，重构视觉层级及奖品展示方式，将单奖品轮播调整为全奖品集中展示，降低理解成本，提升信息传达效率、活动吸引力与屏效。",
    "主动与产品、业务协同，以业务目标和核心指标验证设计决策，推动方案高质量落地。",
  ],
  growth: "项目收益：活动曝光 5156 万 UV、参与率 66.7%，带动 132 万+ GMV 与 18 万广告收入，并实现三端留存、新客支付渗透等核心指标显著正向。",
};

const fundNotchSidebarCopy = {
  overview: "一款把 MacBook 刘海变成基金收益灵动岛的原生 macOS 基金工作台，围绕个人持仓提供解释收益、穿透风险和辅助复盘的完整体验。",
};

const flowmintSidebarCopy = {
  overview: "让 AI 创作从一次次孤立的生成，变成可以连接、理解、复用和持续迭代的视觉工作流。",
};

const projectsFor = (work) => projectLabels[work.id].map((title, index) => {
  const id = `${work.id}.${String(index + 1).padStart(2, "0")}`;
  const previewOnlyIds = ["06.01", "06.05"];
  const assets = projectAssets[id] || (id === "06.04" || id === "06.05" ? [] : [{ thumb: work.preview, full: work.preview }]);
  const previewImages = id === "06.05"
    ? ["/assets/work-previews/ai-lab-multi-size-overview.png?v=505a9f30"]
    : previewOnlyIds.includes(id)
    ? ["/assets/work-previews/ai-lab-folder-preview/01.png"]
    : assets.map((image) => image.thumb);
  const images = assets.map((image) => image.full);
  return ({
  id,
  title,
  preview: id === "06.05" ? "/assets/work-previews/ai-lab-multi-size-overview.png?v=505a9f30" : previewOnlyIds.includes(id) ? "/assets/work-previews/ai-lab-folder-preview/01.png" : previewImages[0],
  previewImages,
  images,
  tag: work.layout === "cases" ? "CASE STUDY" : "VISUAL NOTE",
  role: id === "04.01" ? "CORE VISUAL / PROJECT MANAGEMENT" : "ROLE / PROCESS / OUTCOME",
  copy: id === "01.01" ? douyinSpringCopy : id === "01.02" ? qishuiMusicCopy : id === "01.03" ? danceCompetitionCopy : id === "01.04" ? nationalDayCopy : id === "01.05" ? speedEditionCopy : id === "01.06" ? douyinUgcSidebarCopy : id === "04.01" ? brandBasketballCopy : id === "04.02" ? brandAiCreatorCopy : id === "04.03" ? brandDailyFreeCopy : id === "06.01" ? flowmintSidebarCopy : id === "06.04" ? fundNotchSidebarCopy : null,
  imageNotes: id === "01.01" ? douyinSpringImageNotes : null,
  richContent: id === "01.06" ? douyinUgcContent : id === "06.01" ? flowmintContent : id === "06.02" ? aiLabVisualSkillContent : id === "06.03" ? aiDouyinCitySkillContent : id === "06.04" ? fundNotchContent : id === "06.05" ? aiLabMultiSizeContent : null,
  richContentBeforeImages: id === "01.06" ? douyinUgcTopContent : null,
  imageGroups: id === "04.03" ? brandDailyFreeAssetGroups.map((group) => group.length) : id === "04.02" ? brandAiCreatorAssetGroups.map((group) => group.length) : id === "06.04" ? fundNotchAssetGroups.map((group) => group.length) : null,
  document: id === "04.01" ? {
    href: "/assets/work-previews/brand-basketball-championship/basketball-vi-guidelines.pdf",
    cover: "/assets/work-previews/brand-basketball-championship/basketball-vi-guidelines-cover.png",
    title: "抖音球王争霸赛 VI 使用规范",
    meta: "PDF · 26 PAGES · OPEN ↗",
  } : null,
  detailLayout: id === "01.06" ? "douyin-ugc-flow" : id === "01.02" ? "qishui-grid" : id === "01.03" ? "dance-grid" : id === "01.04" ? "national-day-grid" : id === "01.05" ? "speed-grid" : id.startsWith("02.") || id.startsWith("04.") || id.startsWith("05.") || id.startsWith("06.") ? "unified-grid" : id === "03.01" || id === "03.02" || id === "03.03" ? "kuaishou-grid" : null,
  description: id === "01.01" ? "2026 抖音春节项目视觉资料，按原始文件顺序完整展示。" : id === "03.01" ? "快手运营设计视觉素材，按文件命名顺序完整展示。" : id === "03.02" ? "2023 兔年 CNY 视觉素材，按文件命名顺序完整展示。" : id === "03.03" ? "2022 虎年 CNY 视觉素材，按文件命名顺序完整展示。" : "这里将放入真实项目的背景、你的角色、关键判断、产出与结果。",
  });
});

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePan, setImagePan] = useState({ x: 0, y: 0 });
  const imageDrag = useRef(null);
  const badgeDrag = useRef(null);
  const [contactCopied, setContactCopied] = useState("");
  const [badgeDragging, setBadgeDragging] = useState(false);
  const [badgeRetracting, setBadgeRetracting] = useState(false);
  const [badgeOffset, setBadgeOffset] = useState({ x: 0, y: 0 });
  const [activeKeychain, setActiveKeychain] = useState(null);
  const [homeTextTrigger, setHomeTextTrigger] = useState(0);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => reveal.observe(node));
    return () => reveal.disconnect();
  }, []);

  useEffect(() => {
    if (selectedWork) window.scrollTo({ top: 0, behavior: "instant" });
  }, [selectedWork?.id, selectedProject?.id]);

  useEffect(() => {
    if (!zoomedImage) return undefined;
    const handleLightboxKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setZoomedImage(null);
        return;
      }
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const nextIndex = lightboxIndex + (event.key === "ArrowLeft" ? -1 : 1);
      if (nextIndex < 0 || nextIndex >= lightboxImages.length) return;
      event.preventDefault();
      setLightboxIndex(nextIndex);
      setZoomedImage(lightboxImages[nextIndex]);
      setImageZoom(1);
      setImagePan({ x: 0, y: 0 });
    };
    window.addEventListener("keydown", handleLightboxKeyDown);
    return () => window.removeEventListener("keydown", handleLightboxKeyDown);
  }, [zoomedImage, lightboxImages, lightboxIndex]);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const goHome = () => {
    setHomeTextTrigger((trigger) => trigger + 1);
    jump("home");
  };

  const openWork = (id) => {
    const work = works.find((item) => item.id === id);
    if (!work) return;
    setActiveKeychain(null);
    setSelectedWork(work);
    setSelectedProject(null);
    setMenuOpen(false);
  };

  const jumpToContact = () => {
    setContactCopied("");
    setBadgeRetracting(false);
    setBadgeOffset({ x: 0, y: 0 });
    jump("contact");
  };

  const copyContact = async (label, value) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setContactCopied(label);
    window.setTimeout(() => setContactCopied(""), 1600);
  };

  const startAboutCardSway = (event) => {
    const card = event.currentTarget;
    window.clearTimeout(card.__aboutReturnTimer);
    const currentTransform = window.getComputedStyle(card).transform;
    card.style.transition = "none";
    card.style.animation = "none";
    card.style.transform = currentTransform === "none" ? "" : currentTransform;
    window.requestAnimationFrame(() => {
      card.style.transform = "";
      card.style.animation = "about-id-card-sway 1.85s ease-in-out infinite";
    });
  };

  const stopAboutCardSway = (event) => {
    const card = event.currentTarget;
    const currentTransform = window.getComputedStyle(card).transform;
    card.style.animation = "none";
    card.style.transition = "none";
    card.style.transform = currentTransform;
    void card.offsetWidth;
    window.requestAnimationFrame(() => {
      card.style.transition = "transform .68s cubic-bezier(.2,.78,.2,1)";
      card.style.transform = "rotate(0deg)";
    });
    const finishReturn = () => {
      window.clearTimeout(card.__aboutReturnTimer);
      card.style.transition = "";
      card.style.transform = "";
    };
    card.addEventListener("transitionend", finishReturn, { once: true });
    card.__aboutReturnTimer = window.setTimeout(finishReturn, 760);
  };

  const keychainAtPoint = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    let nearest = null;
    let nearestDistance = Infinity;
    keychainItems.forEach((item) => {
      const distance = Math.hypot((x - item.hit[0]) * 1.2, y - item.hit[1]);
      if (distance < nearestDistance) {
        nearest = item.id;
        nearestDistance = distance;
      }
    });
    event.currentTarget.style.setProperty("--pointer-x", `${(x - 0.5) * 10}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${(y - 0.5) * 8}px`);
    return nearestDistance < 0.25 ? nearest : null;
  };

  const moveKeychain = (event) => {
    if (event.pointerType === "touch") return;
    setActiveKeychain(keychainAtPoint(event));
  };

  const clickKeychain = (event) => {
    const id = keychainAtPoint(event);
    if (id) handleKeychainClick(id);
  };

  const handleKeychainClick = (id) => {
    setActiveKeychain(null);
    if (id === "01") {
      jump("about");
      return;
    }
    const workId = keychainWorkMap[id];
    if (workId) openWork(workId);
  };

  const openImage = (src, images = [src]) => {
    const index = Math.max(0, images.indexOf(src));
    setLightboxImages(images);
    setLightboxIndex(index);
    setZoomedImage(src);
    setImageZoom(1);
    setImagePan({ x: 0, y: 0 });
  };

  const showLightboxImage = (index) => {
    setLightboxIndex(index);
    setZoomedImage(lightboxImages[index]);
    setImageZoom(1);
    setImagePan({ x: 0, y: 0 });
  };

  const startImageDrag = (event) => {
    if (event.button !== 0 && event.button !== 1) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    imageDrag.current = { x: event.clientX, y: event.clientY, pan: imagePan };
  };

  const moveImageDrag = (event) => {
    if (!imageDrag.current) return;
    setImagePan({ x: imageDrag.current.pan.x + event.clientX - imageDrag.current.x, y: imageDrag.current.pan.y + event.clientY - imageDrag.current.y });
  };

  const stopImageDrag = () => { imageDrag.current = null; };

  const startContactBadgeDrag = (event) => {
    if (event.button !== 0 || badgeRetracting) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    badgeDrag.current = { x: event.clientX, y: event.clientY, offset: badgeOffset, pointerId: event.pointerId };
    setBadgeDragging(true);
  };

  const moveContactBadgeDrag = (event) => {
    if (!badgeDrag.current) return;
    const x = badgeDrag.current.offset.x + event.clientX - badgeDrag.current.x;
    const y = badgeDrag.current.offset.y + event.clientY - badgeDrag.current.y;
    setBadgeOffset({ x: Math.max(-360, Math.min(360, x)), y: Math.max(-90, Math.min(260, y)) });
  };

  const stopContactBadgeDrag = (event) => {
    if (!badgeDrag.current) return;
    const travel = Math.hypot(event.clientX - badgeDrag.current.x, event.clientY - badgeDrag.current.y);
    const pulledDown = event.clientY - badgeDrag.current.y > 20;
    badgeDrag.current = null;
    setBadgeDragging(false);
    if (pulledDown || travel > 42) {
      setBadgeRetracting(true);
      return;
    }
    setBadgeOffset({ x: 0, y: 0 });
  };

  const cancelContactBadgeDrag = () => {
    badgeDrag.current = null;
    setBadgeDragging(false);
    setBadgeOffset({ x: 0, y: 0 });
  };

  const selectedProjects = selectedWork ? projectsFor(selectedWork) : [];
  const selectedProjectIndex = selectedProject ? selectedProjects.findIndex((project) => project.id === selectedProject.id) : -1;
  const nextProjects = selectedProjectIndex >= 0 ? selectedProjects.slice(selectedProjectIndex + 1, selectedProjectIndex + 3) : [];
  const renderProjectCard = (project, index) => (
    <button className={`project-preview-card project-${project.id.replace(".", "-")} ${project.images.length > 1 ? `has-multiple-images image-count-${project.images.length}` : ""}`} onClick={() => selectedWork.id === "02" ? openImage(project.images[0], project.images) : setSelectedProject(project)} key={project.id}>
      <span className="project-preview-meta"><small>{project.id} · {project.tag}</small><strong>{project.title}</strong><i>VIEW PROJECT ↗</i></span>
      <span className={`project-preview-image ${project.images.length > 1 ? "multi-image-stack" : ""}`}>
        {project.previewImages.map((src, imageIndex) => <img src={src} alt={`${project.title} 项目预览 ${imageIndex + 1}`} key={src} style={selectedWork.id === "02" ? undefined : { transform: `scale(${1.05 + index * .05}) rotate(${(index % 3 - 1) * 3}deg)` }} onLoad={(event) => {
          const ratio = event.currentTarget.naturalHeight / event.currentTarget.naturalWidth;
          event.currentTarget.classList.toggle("is-tall-preview", project.images.length > 1 && ratio > 1.15);
        }} onClick={project.images.length > 1 ? (event) => { event.stopPropagation(); openImage(project.images[imageIndex], project.images); } : undefined} />)}
      </span>
    </button>
  );

  const renderReferenceDetailImage = (src, index) => (
    <button className={`reference-detail-image image-${index + 1}`} onClick={() => openImage(src, selectedProject.images)} key={src} aria-label={`查看${selectedProject.title}第 ${index + 1} 张图片`}>
      <img
        src={src}
        alt={`${selectedProject.title} 项目图片 ${index + 1}`}
        onLoad={(event) => {
          const ratio = event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;
          if (Number.isFinite(ratio) && ratio > 0) event.currentTarget.parentElement.style.setProperty("--image-ratio", ratio);
        }}
      />
    </button>
  );

  const renderReferenceImageNote = (note, key) => (
    <section className="reference-detail-image-note" key={key}>
      <h3>{note.heading}</h3>
      {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>
  );

  const renderFundNotchGallery = () => {
    let fundNotchOffset = 0;
    return <div className="fund-notch-gallery">
      {fundNotchAssetGroups.map((group, rowIndex) => {
        const start = fundNotchOffset;
        const rowImages = selectedProject.images.slice(start, start + group.length);
        fundNotchOffset += group.length;
        return <div className="fund-notch-row" key={rowIndex}>
          {rowImages.map((src, index) => renderReferenceDetailImage(src, start + index))}
        </div>;
      })}
    </div>;
  };

  const renderFlowmintGallery = () => {
    let flowmintOffset = 0;
    return <div className="flowmint-gallery">
      {flowmintAssetGroups.map((group, rowIndex) => {
        const start = flowmintOffset;
        const rowImages = selectedProject.images.slice(start, start + group.length);
        flowmintOffset += group.length;
        return <div className="flowmint-row" key={rowIndex}>
          {rowImages.map((src, index) => renderReferenceDetailImage(src, start + index))}
        </div>;
      })}
    </div>;
  };

  const renderReferenceRichCopy = (content, beforeSections = null) => (
    <article className="reference-detail-rich-copy">
      {content.intro && <p className="reference-detail-rich-intro">{content.intro}</p>}
      {content.meta && <div className="reference-detail-rich-meta">
        {content.meta.map((item) => <p key={item.label}><strong>{item.label}</strong><span>{item.value}</span></p>)}
        {content.repo && <p><strong>{content.repo.label}</strong><a href={content.repo.href} target="_blank" rel="noreferrer">{content.repo.text}</a></p>}
      </div>}
      {beforeSections}
      {content.sections.map((section) => (
        <section key={section.heading}>
          {section.image && <figure className="reference-detail-rich-media"><img src={section.image.src} alt={section.image.alt} /></figure>}
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.equation && <p className="reference-detail-rich-equation">{section.equation}</p>}
          {section.afterEquation && <p className="reference-detail-rich-lead">{section.afterEquation}</p>}
          {section.directions && <div className="reference-detail-rich-directions">
            {section.directions.map((direction) => <div className="reference-detail-rich-direction" key={direction.label}>
              <strong>{direction.label}</strong>
              <p>{direction.description}</p>
            </div>)}
          </div>}
          {section.closing && <p className="reference-detail-rich-closing">{section.closing}</p>}
          {section.subsections?.map((subsection) => (
            <div className="reference-detail-rich-subsection" key={subsection.heading}>
              <h3>{subsection.heading}</h3>
              {subsection.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {subsection.lead && <p className="reference-detail-rich-lead">{subsection.lead}</p>}
              {subsection.bullets && <ul>{subsection.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {subsection.callout && <p className="reference-detail-rich-callout">{subsection.callout}</p>}
              {subsection.paragraphsAfter?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
          {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          {section.labeledBullets && <ul className="reference-detail-rich-labeled-list">{section.labeledBullets.map((item) => <li key={item.label}><strong>{item.label}</strong><span>{item.description}</span></li>)}</ul>}
          {section.numbered && <ol>{section.numbered.map((item) => <li key={item.label}><strong>{item.label}</strong><span>{item.description}</span></li>)}</ol>}
          {section.code && <pre className="reference-detail-rich-code"><code>{section.code}</code></pre>}
          {section.paragraphsAfter?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bulletsAfter && <ul>{section.bulletsAfter.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          {section.finalStatements && <div className="reference-detail-rich-final">{section.finalStatements.map((statement) => <p key={statement}>{statement}</p>)}</div>}
        </section>
      ))}
    </article>
  );

  const exitWorkView = (target = "works") => {
    flushSync(() => {
      if (target === "home") setHomeTextTrigger((trigger) => trigger + 1);
      setSelectedWork(null);
      setSelectedProject(null);
    });
    document.getElementById(target)?.scrollIntoView({ behavior: "instant", block: "start" });
  };

  const renderContactPage = () => (
    <section className="contact-overlay contact-page" id="contact" aria-label="联系 Agen">
      <div className="contact-folder-scene">
        <div className="contact-folder-back" />
        <div className="contact-folder-files">
          {works.map((work) => (
            <button className={`contact-file-card contact-file-${work.id}`} key={work.id} onClick={() => openWork(work.id)} aria-label={`打开 ${work.title} 文件夹`}>
              <small>{work.id}</small>
              <strong>{work.title}</strong>
            </button>
          ))}
        </div>
        <div className="contact-sticky-note"><div className="contact-sticky-note-content"><img src="/assets/contact-sticky-note.png" alt="粉色便签纸与回形针" /><strong>期待一起用AI✨<br />做些有意思的事&gt;_</strong><span>AGEN / 2026</span></div></div>
        <div className="contact-folder-front-shadow" />
        <div className="contact-folder-front" />
      </div>

      <div className="contact-copy-block">
        <p>欢迎与我联系&gt;_</p>
        <h2>LET’S CHAT?</h2>
        <div className="contact-details">
          <button className="contact-qr" onClick={() => copyContact("微信", "agenzZ")} aria-label="复制微信号 agenzZ">
            <img src="/assets/contact-wechat-qr.png" alt="Agen 微信二维码" />
          </button>
          <div>
            {[['电话', 'TEL', '18500636059'], ['邮箱', 'MAIL', 'agenzzk@163.com'], ['微信', 'WECHAT', 'agenzZ']].map(([label, prefix, value]) => <button key={label} title={`点击复制${label === '微信' ? '微信号' : label}`} onClick={() => copyContact(label, value)}><small>{prefix}</small><span>{value}</span><span className="contact-copy-indicator" aria-hidden="true">{contactCopied === label ? <svg viewBox="0 0 16 16"><path d="m3.2 8.3 3 3 6.6-6.6" /></svg> : <svg viewBox="0 0 16 16"><rect x="5.2" y="2.5" width="7.3" height="8.2" rx="1" /><path d="M3.5 5.2v7.1c0 .7.5 1.2 1.2 1.2h6.1" /></svg>}</span></button>)}
          </div>
        </div>
        <span className="contact-copy-status" aria-live="polite">{contactCopied ? `${contactCopied}已复制` : "点击信息即可复制"}</span>
      </div>

      <div
        className={`contact-badge-anchor ${badgeDragging ? "is-dragging" : ""} ${badgeRetracting ? "is-retracting" : ""}`}
        style={{
          "--badge-x": `${badgeOffset.x}px`,
          "--badge-y": `${badgeOffset.y}px`,
          "--badge-tilt": `${Math.max(-9, Math.min(9, badgeOffset.x / 28))}deg`,
        }}
        onPointerDown={startContactBadgeDrag}
        onPointerMove={moveContactBadgeDrag}
        onPointerUp={stopContactBadgeDrag}
        onPointerCancel={cancelContactBadgeDrag}
      >
        <div className="contact-badge-swing">
          <img className="contact-badge-art" src="/assets/contact-work-badge.png" alt="Agen 工卡" draggable="false" />
        </div>
      </div>

      <footer className="contact-overlay-footer"><span>© 2026 AGEN WORKSPACE</span><span>DESIGNED &amp; DEVELOPED BY AGEN</span></footer>
    </section>
  );

  if (selectedWork) return (
    <main className={`reference-view work-${selectedWork.id}`}>
      <header className={menuOpen ? "topbar menu-active" : "topbar"}>
        <button className="mobile-wordmark" onClick={() => exitWorkView("home")}>AGEN</button>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="主导航">
          <button onClick={() => exitWorkView("home")}>HOME</button>
          <button onClick={() => exitWorkView("about")}>ABOUT</button>
          <button onClick={() => exitWorkView("works")}>WORKS</button>
          <button onClick={() => openWork("06")}>AI LAB</button>
          <button onClick={() => exitWorkView("contact")}>CONTACT</button>
        </nav>
        <button className="menu-button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "CLOSE" : "MENU"}</button>
      </header>

      {!selectedProject ? (
        <section className={`reference-collection ${selectedWork.color}`}>
          <aside className="reference-collection-aside">
            <button className="reference-back" onClick={() => exitWorkView("works")}><span>←</span> SEE ALL WORKS</button>
            <img src={workPendants[selectedWork.id] || selectedWork.preview} alt={`${selectedWork.title} 作品钥匙扣`} />
          </aside>
          <div className="reference-folder-list">
            <header>
              <small>{selectedWork.id}</small>
              <h1>{selectedWork.title}</h1>
              <div><span>PROJECT TITLE</span><span>PREVIEW</span></div>
            </header>
            <div className="reference-project-rows">
              {selectedProjects.map((project, index) => (
                <button className="reference-project-row" onClick={() => setSelectedProject(project)} key={project.id}>
                  <span className="reference-project-title">{project.title}</span>
                  <span className="reference-project-extra"><small>{selectedWork.period || "ONGOING"}</small><em>{project.role}</em></span>
                  <img src={project.preview} alt={`${project.title} 预览`} />
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (<>
        <section className="reference-detail">
          <div className="reference-detail-grid">
            <aside className="reference-detail-intro">
              <button className="reference-back" onClick={() => setSelectedProject(null)}><span>←</span> SEE ALL {selectedWork.title} WORKS</button>
              <h1 className={[selectedProject.title.length > 10 && "is-long-project-title", selectedProject.id === "06.01" && "is-flowmint-title"].filter(Boolean).join(" ")}>
                {selectedProject.id === "06.01" ? <>FLOWMINT<br />多模态AI创作工具</> : selectedProject.title}
              </h1>
              <div className="reference-detail-meta"><span>{selectedWork.title} WORKS</span><span>{selectedWork.period}</span></div>
              {selectedProject.copy && (
                <div className="reference-detail-copy">
                  {selectedProject.copy.projectName && <p className="reference-detail-copy-project-name">{selectedProject.copy.projectName}</p>}
                  <p>{selectedProject.copy.overview}</p>
                  {selectedProject.copy.responsibilities && <p>{selectedProject.copy.responsibilities}</p>}
                  {selectedProject.copy.highlights && <ul className="reference-detail-copy-list">
                    {selectedProject.copy.highlights.map((item) => <li key={item}>{item}</li>)}
                  </ul>}
                  {selectedProject.copy.keywords && <p>{selectedProject.copy.keywords}</p>}
                  {selectedProject.copy.collaboration && <p>{selectedProject.copy.collaboration}</p>}
                  {selectedProject.copy.growth && <p className="reference-detail-copy-label">数据总结</p>}
                  {selectedProject.copy.growth && (Array.isArray(selectedProject.copy.growth) ? selectedProject.copy.growth.map((item) => <p key={item}>{item}</p>) : <p>{selectedProject.copy.growth}</p>)}
                  {selectedProject.copy.acquisition && <p>{selectedProject.copy.acquisition}</p>}
                  {selectedProject.copy.innovation && <p>{selectedProject.copy.innovation}</p>}
                </div>
              )}
            </aside>
            <div className={`reference-detail-stream ${selectedProject.detailLayout || ""} project-stream-${selectedProject.id.replace(".", "-")}`}>
              {selectedProject.richContentBeforeImages && renderReferenceRichCopy(selectedProject.richContentBeforeImages)}
              {selectedProject.detailLayout === "douyin-ugc-flow" ? <>
                <div className="douyin-ugc-flow-row">
                  {selectedProject.images.slice(0, 2).map((src, index) => renderReferenceDetailImage(src, index))}
                </div>
                {selectedProject.richContent && renderReferenceRichCopy(selectedProject.richContent)}
                {selectedProject.images.slice(2).map((src, index) => renderReferenceDetailImage(src, index + 2))}
              </> : selectedProject.detailLayout === "qishui-grid" ? <>
                {selectedProject.images.slice(0, 1).map((src) => renderReferenceDetailImage(src, 0))}
                <div className="qishui-row qishui-row-five">{selectedProject.images.slice(1, 6).map((src, index) => renderReferenceDetailImage(src, index + 1))}</div>
                <div className="qishui-row qishui-row-two qishui-row-7-8">{selectedProject.images.slice(6, 8).map((src, index) => renderReferenceDetailImage(src, index + 6))}</div>
                <div className="qishui-row qishui-row-two">{selectedProject.images.slice(8, 10).map((src, index) => renderReferenceDetailImage(src, index + 8))}</div>
                <div className="qishui-row qishui-row-two">{selectedProject.images.slice(10, 12).map((src, index) => renderReferenceDetailImage(src, index + 10))}</div>
              </> : selectedProject.detailLayout === "dance-grid" ? <>
                {selectedProject.images.slice(0, 1).map((src) => renderReferenceDetailImage(src, 0))}
                <div className="dance-row dance-row-two">{selectedProject.images.slice(1, 3).map((src, index) => renderReferenceDetailImage(src, index + 1))}</div>
                <div className="dance-row dance-row-three">{selectedProject.images.slice(3, 6).map((src, index) => renderReferenceDetailImage(src, index + 3))}</div>
              </> : selectedProject.detailLayout === "national-day-grid" ? <>
                {selectedProject.images.slice(0, 1).map((src) => renderReferenceDetailImage(src, 0))}
                {selectedProject.images.slice(1, 2).map((src) => renderReferenceDetailImage(src, 1))}
                {selectedProject.images.slice(2, 3).map((src) => renderReferenceDetailImage(src, 2))}
                {selectedProject.images.slice(3, 4).map((src) => renderReferenceDetailImage(src, 3))}
                {selectedProject.copy?.summerProjectName && <div className="national-day-summer-note">
                  <p className="national-day-summer-name">{selectedProject.copy.summerProjectName}</p>
                  <p>{selectedProject.copy.summerOverview}</p>
                  <p>{selectedProject.copy.summerGrowth}</p>
                </div>}
                <div className="national-day-row national-day-row-three">{selectedProject.images.slice(4, 7).map((src, index) => renderReferenceDetailImage(src, index + 4))}</div>
              </> : selectedProject.detailLayout === "speed-grid" ? <>
                {selectedProject.images.slice(0, 1).map((src) => renderReferenceDetailImage(src, 0))}
                {selectedProject.images.slice(1, 2).map((src) => renderReferenceDetailImage(src, 1))}
                <div className="speed-row speed-row-two">{selectedProject.images.slice(2, 4).map((src, index) => renderReferenceDetailImage(src, index + 2))}</div>
                {selectedProject.images.slice(4, 5).map((src) => renderReferenceDetailImage(src, 4))}
              </> : selectedProject.detailLayout === "kuaishou-grid" ? <>
                <div className="kuaishou-row">{selectedProject.images.slice(0, 2).map((src, index) => renderReferenceDetailImage(src, index))}</div>
                <div className="kuaishou-row">{selectedProject.images.slice(2, 4).map((src, index) => renderReferenceDetailImage(src, index + 2))}</div>
                <div className="kuaishou-row">{selectedProject.images.slice(4, 6).map((src, index) => renderReferenceDetailImage(src, index + 4))}</div>
                <div className="kuaishou-row">{selectedProject.images.slice(6, 8).map((src, index) => renderReferenceDetailImage(src, index + 6))}</div>
                <div className="kuaishou-row kuaishou-row-last">{selectedProject.images.slice(8, 9).map((src) => renderReferenceDetailImage(src, 8))}</div>
              </> : selectedProject.detailLayout === "unified-grid" ? <>
                {selectedProject.id === "06.01" || selectedProject.id === "06.04" ? null : selectedProject.id === "04.01" ? <>
                  <div className="brand-basketball-row brand-basketball-row-single">{selectedProject.images.slice(0, 1).map((src) => renderReferenceDetailImage(src, 0))}</div>
                  <div className="brand-basketball-row">{selectedProject.images.slice(1, 3).map((src, index) => renderReferenceDetailImage(src, index + 1))}</div>
                  <div className="brand-basketball-row brand-basketball-row-single">{selectedProject.images.slice(3, 4).map((src) => renderReferenceDetailImage(src, 3))}</div>
                  {Array.from({ length: Math.ceil((selectedProject.images.length - 4) / 2) }, (_, rowIndex) => {
                    const start = rowIndex * 2 + 4;
                    const rowImages = selectedProject.images.slice(start, start + 2);
                    return <div className={`brand-basketball-row ${rowImages.length === 1 ? "brand-basketball-row-single" : ""}`} key={start}>
                      {rowImages.map((src, index) => renderReferenceDetailImage(src, start + index))}
                    </div>;
                  })}
                </> : selectedProject.id === "04.03" ? (() => {
                  let dailyFreeOffset = 0;
                  return selectedProject.imageGroups.map((length, rowIndex) => {
                    const start = dailyFreeOffset;
                    const rowImages = selectedProject.images.slice(start, start + length);
                    dailyFreeOffset += length;
                    return <div className={`brand-daily-free-row ${rowImages.length === 1 ? "brand-daily-free-row-single" : ""}`} key={rowIndex}>
                      {rowImages.map((src, index) => renderReferenceDetailImage(src, start + index))}
                    </div>;
                  });
                })() : selectedProject.id === "04.02" ? (() => {
                  let aiCreatorOffset = 0;
                  return selectedProject.imageGroups.map((length, rowIndex) => {
                    const start = aiCreatorOffset;
                    const rowImages = selectedProject.images.slice(start, start + length);
                    aiCreatorOffset += length;
                    return <div className={`brand-ai-creator-row ${rowImages.length === 1 ? "brand-ai-creator-row-single" : ""}`} key={rowIndex}>
                      {rowImages.map((src, index) => renderReferenceDetailImage(src, start + index))}
                    </div>;
                  });
                })() : selectedProject.id === "02.02" ? <>
                  <div className="unified-row">{selectedProject.images.slice(0, 2).map((src, index) => renderReferenceDetailImage(src, index))}</div>
                  <div className="unified-row unified-row-single">{selectedProject.images.slice(2, 3).map((src) => renderReferenceDetailImage(src, 2))}</div>
                  <div className="unified-row unified-row-single">{selectedProject.images.slice(3, 4).map((src) => renderReferenceDetailImage(src, 3))}</div>
                  <div className="unified-row unified-row-single">{selectedProject.images.slice(4, 5).map((src) => renderReferenceDetailImage(src, 4))}</div>
                  <div className="unified-row unified-row-five">
                    {selectedProject.images.slice(5, 10).map((src, index) => renderReferenceDetailImage(src, index + 5))}
                  </div>
                  <div className="unified-row unified-row-single">
                    {selectedProject.images.slice(10, 11).map((src) => renderReferenceDetailImage(src, 10))}
                  </div>
                </> : selectedProject.id === "02.03" ? selectedProject.images.map((src, index) => (
                  <div className="unified-row unified-row-single" key={index}>
                    {renderReferenceDetailImage(src, index)}
                  </div>
                )) : Array.from({ length: Math.ceil(selectedProject.images.length / 2) }, (_, rowIndex) => {
                  const rowImages = selectedProject.images.slice(rowIndex * 2, rowIndex * 2 + 2);
                  return <div className={`unified-row ${rowImages.length === 1 ? "unified-row-single" : ""} ${selectedProject.id === "05.01" && rowImages.length === 2 ? "exercise-row" : ""}`} key={rowIndex}>
                    {rowImages.map((src, index) => renderReferenceDetailImage(src, rowIndex * 2 + index))}
                  </div>;
                })}
              </> : <>
                {selectedProject.images.slice(0, 1).map((src) => renderReferenceDetailImage(src, 0))}
                {selectedProject.images.length > 1 && (
                  <div className="reference-detail-pair">
                    {selectedProject.images.slice(1, 3).map((src, pairIndex) => renderReferenceDetailImage(src, pairIndex + 1))}
                  </div>
                )}
                {selectedProject.images.slice(3).map((src, offset) => {
                  const imageIndex = offset + 3;
                  return <Fragment key={src}>
                    {selectedProject.imageNotes?.[imageIndex] && renderReferenceImageNote(selectedProject.imageNotes[imageIndex], `${selectedProject.id}-note-${imageIndex}`)}
                    {renderReferenceDetailImage(src, imageIndex)}
                  </Fragment>;
                })}
              </>}
              {selectedProject.richContent && selectedProject.id !== "01.06" && renderReferenceRichCopy(
                selectedProject.richContent,
                selectedProject.id === "06.01" ? renderFlowmintGallery() : selectedProject.id === "06.04" ? renderFundNotchGallery() : null,
              )}
              {selectedProject.document && <a className="reference-project-document" href={selectedProject.document.href} target="_blank" rel="noreferrer">
                <img src={selectedProject.document.cover} alt={`${selectedProject.document.title} 封面`} />
                <span>
                  <small>PROJECT DOCUMENT</small>
                  <strong>{selectedProject.document.title}</strong>
                  <em>{selectedProject.document.meta}</em>
                </span>
              </a>}
            </div>
          </div>
          {nextProjects.length > 0 && <section className="reference-see-more"><h2>see more.</h2><div>{nextProjects.map((project) => <button key={project.id} onClick={() => setSelectedProject(project)}><img src={project.preview} alt={`${project.title} 预览`} /><span>{project.title}</span></button>)}</div></section>}
      </section>
      </>)}

      {selectedProject && renderContactPage()}

      {zoomedImage && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="作品图片查看器" onClick={() => setZoomedImage(null)} onWheel={(event) => { event.preventDefault(); setImageZoom((zoom) => Math.min(4, Math.max(.65, zoom * Math.exp(-event.deltaY * .001)))); }}>
        {lightboxIndex > 0 && <button className="lightbox-arrow lightbox-arrow-left" onClick={(event) => { event.stopPropagation(); showLightboxImage(lightboxIndex - 1); }} aria-label="查看上一张">←</button>}
        {lightboxIndex < lightboxImages.length - 1 && <button className="lightbox-arrow lightbox-arrow-right" onClick={(event) => { event.stopPropagation(); showLightboxImage(lightboxIndex + 1); }} aria-label="查看下一张">→</button>}
        <div className="image-lightbox-canvas"><img src={zoomedImage} alt="放大的项目作品" draggable="false" style={{ transform: `translate(${imagePan.x}px, ${imagePan.y}px) scale(${imageZoom})` }} onClick={(event) => event.stopPropagation()} onPointerDown={startImageDrag} onPointerMove={moveImageDrag} onPointerUp={stopImageDrag} onPointerCancel={stopImageDrag} /></div>
      </div>}
    </main>
  );

  return (
    <main className="site-shell">
      <header className={menuOpen ? "topbar menu-active" : "topbar"}>
        <button className="mobile-wordmark" onClick={goHome}>AGEN</button>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="主导航">
          <button onClick={goHome}>HOME</button>
          <button onClick={() => jump("about")}>ABOUT</button>
          <button onClick={() => jump("works")}>WORKS</button>
          <button onClick={() => openWork("06")}>AI LAB</button>
          <button onClick={jumpToContact}>CONTACT</button>
        </nav>
        <button className="menu-button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "CLOSE" : "MENU"}</button>
      </header>

      <section className="hero" id="home">
        <p className="hero-side hero-side-left"><ScrambleText text={'A COLLECTION OF\nWORKS & EXPERIMENTS'} trigger={homeTextTrigger} /></p>
        <p className="hero-side hero-side-right"><ScrambleText text="AGEN WORKSPACE 2026" trigger={homeTextTrigger} /></p>
        <div
          className={activeKeychain ? "keychain-stage has-active" : "keychain-stage"}
          data-active={activeKeychain || ""}
          onPointerMove={moveKeychain}
          onClick={clickKeychain}
          onPointerLeave={() => setActiveKeychain(null)}
          aria-label="可交互的作品钥匙挂件"
        >
          <div className="keychain-float">
            <img className="keychain-pin" src="/assets/keychain-pin.png" alt="Agen 金属别针" draggable="false" />
            {keychainItems.map((item) => (
              <button
                className={`keychain-piece ${item.className} ${activeKeychain === item.id ? "is-active" : ""}`}
                data-piece={item.id}
                key={item.id}
                onClick={() => handleKeychainClick(item.id)}
                onFocus={() => setActiveKeychain(item.id)}
                onBlur={() => setActiveKeychain(null)}
                aria-label={`${item.id} ${item.label}`}
              >
                <img src={item.src} alt="" draggable="false" />
                <span>{item.id} / {item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <button className="hero-scroll" onClick={() => jump("about")}>SCROLL DOWN <span>↓</span></button>
      </section>

      <section className="about" id="about">
        <div className="about-resume-layout">
          <aside className="about-resume-folder">
            <div className="about-folder-layers" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="about-resume-profile">
              <figure onPointerEnter={startAboutCardSway} onPointerLeave={stopAboutCardSway}><img src="/assets/about-work-card.png" alt="Agen 个人身份工卡" /></figure>
              <div className="about-resume-copy">
                <p className="about-resume-role">AIGC / <strong>品牌与体验设计师</strong> / <strong>AI Builder</strong> / Behance与站酷推荐设计师</p>
                <p>具备从业务分析、视觉策略、UX/UI 到产品落地的全链路设计能力，长期参与大型增长活动、品牌营销与 UGC 产品设计。持续探索 AI Native 工作流，能够独立构建多模态创作流程、Design Skill、Figma 插件及 AI 产品，将设计经验沉淀为可复用的生产系统。<strong>非程序员背景，借助 AI 两周完成 1.7 万行代码的桌面端产品开发。</strong></p>
              </div>
              <footer className="about-resume-footer">
                <div className="about-resume-contact">
                  <button className="about-resume-qr" title="点击复制微信号" aria-label="复制微信号 agenzZ" onClick={() => copyContact("微信", "agenzZ")}><img src="/assets/contact-wechat-qr.png" alt="Agen 微信二维码" /></button>
                  <div className="about-resume-contact-copy">
                    {[['电话', 'TEL', '18500636059'], ['邮箱', 'MAIL', 'agenzzk@163.com'], ['微信', 'WECHAT', 'agenzZ']].map(([label, prefix, value]) => <button key={label} title={`点击复制${label === '微信' ? '微信号' : label}`} onClick={() => copyContact(label, value)}><small>{prefix}</small><span>{value}</span><span className={`about-copy-indicator${contactCopied === label ? ' is-copied' : ''}`} aria-hidden="true">{contactCopied === label ? <svg viewBox="0 0 16 16"><path d="m3.2 8.3 3 3 6.6-6.6" /></svg> : <svg viewBox="0 0 16 16"><rect x="5.2" y="2.5" width="7.3" height="8.2" rx="1" /><path d="M3.5 5.2v7.1c0 .7.5 1.2 1.2 1.2h6.1" /></svg>}</span></button>)}
                  </div>
                </div>
                <div className="about-resume-socials">
                  {aboutSocials.map((social) => <a key={social.label} href={social.href} aria-label={`打开 ${social.label}`} title={social.label} target="_blank" rel="noreferrer"><img src={social.icon} alt="" /></a>)}
                </div>
              </footer>
            </div>
          </aside>

          <section className="about-resume-career" aria-label="工作经历">
            <div className="about-career-timeline">
              <article style={{ "--career-accent": "#65dfff" }}>
                <span className="about-career-number">01</span>
                <header><h3>抖音｜基础体验 · 品牌设计</h3><time>2025.04—至今</time></header>
                <p>负责抖音主端、极速版、精选及汽水音乐等多端活动视觉与体验设计，覆盖春节、暑期、国庆等大型增长项目及UGC投稿、内容运营、音乐宣发、赛事与生活服务等场景。可独立完成从需求分析到视觉策略、UX/UI设计、多端延展及上线落地的全流程。</p>
                <ul>
                  <li><strong>大型增长项目设计：</strong>参与「2026欢笑中国年」「暑期&国庆活动」「抖音球王争霸赛」等项目视觉与玩法设计，通过IP体系与活动机制设计提升拉新与互动表现，春节集卡玩法拉新1175万，互动2.1亿次。</li>
                  <li><strong>全链路体验设计：</strong>主导「吃喝玩乐评价季」「抖来评好物」等UGC转投稿项目，打通“触达—任务—发布—反馈—激励”链路，优化信息与交互结构，降低参与成本，完成从视觉执行到体验设计的能力升级。</li>
                  <li><strong>品牌与转化优化：</strong>从0到1搭建「抖极天天免单」视觉体系，重构会场信息结构与奖品表达，提升信息效率与用户理解，项目曝光5156万，参与率66.7%，GMV 132.45万。</li>
                  <li><strong>多场景系列设计：</strong>负责「本地人请带路」城市合集、周杰伦新专辑、汽水音乐活动及舞蹈大赛等项目，建立统一视觉框架并实现多主题差异化表达，提升跨内容与跨端设计能力。</li>
                  <li><strong>效率与AI应用：</strong>在高并发项目中提升交付效率，单项目工时最高压缩约50%；在「天天免单」中AI素材占比约80%，构建长期素材库提升产出效率与一致性。</li>
                </ul>
                <p>通过业务实践形成视觉设计 + UX/UI + 业务理解 + 数据意识 + 多端协同 + AI应用的综合能力，可独立承接复杂增长型活动并推动设计结果转化。</p>
              </article>
              <article style={{ "--career-accent": "#ffed7b" }}>
                <span className="about-career-number">02</span>
                <header><h3>美团｜平台设计中心 · 营销视觉设计</h3><time>2023.08—2025.04</time></header>
                <p>负责美团 S/A 级营销活动及亿级曝光项目的视觉设计，能够结合业务目标、用户行为与数据反馈优化设计方案。</p>
                <p>五一大促启动图点击率达 0.53%，创历史新高，较往期提升 0.4pp，为活动导流 15 万+人次。</p>
              </article>
              <article style={{ "--career-accent": "#b0ff62" }}>
                <span className="about-career-number">03</span>
                <header><h3>快手｜运营设计中心 · 视觉设计</h3><time>2022.07—2023.07</time></header>
                <p>参与春节、冬奥会、520、七夕等多个公司级重点项目，负责创意探索、视觉设计及 2D/3D 产出。</p>
                <p>后期主要负责体育与潮流时尚业务，积累了大型活动设计、多风格视觉表达及多项目并行交付经验。</p>
              </article>
            </div>
          </section>
        </div>
      </section>

      <section className="works" id="works">
        <div className="works-head section-pad">
          <h2>Works <i>Archive</i></h2>
        </div>
        <div className="folder-stack">
          {works.map((work, index) => (
            <div className={`work-folder-shell folder-${index + 1}`} key={work.id}>
              <span className="folder-preview" aria-hidden="true">
                {(work.previewImages || [work.preview, work.preview]).map((src, previewIndex) => <img src={src} alt="" key={`${src}-${previewIndex}`} />)}
                <i>{work.type}</i>
                <b>{work.id}</b>
              </span>
              <button className={`work-folder ${work.color}`} onClick={() => { setSelectedWork(work); setSelectedProject(null); }}>
                <span className="folder-number">
                  <b>{work.id}</b>
                  {work.period && <small>{work.period}</small>}
                </span>
                <span className="folder-title-row">
                  <strong>{work.title}</strong>
                </span>
                <span className="folder-open">OPEN FOLDER ↗</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {renderContactPage()}

      {selectedWork && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={selectedWork.title} onClick={() => { setSelectedWork(null); setSelectedProject(null); }}>
          <article className={`folder-browser ${selectedWork.color} ${selectedWork.id === "01" && selectedProject ? "douyin-detail-browser" : ""}`} onClick={(event) => event.stopPropagation()}>
            {selectedWork.id === "01" && selectedProject ? (
              <section className="douyin-project-detail">
                <button className="close-project douyin-detail-close" onClick={() => { setSelectedWork(null); setSelectedProject(null); }}>CLOSE</button>
                <div className="douyin-detail-layout">
                  <aside className="douyin-detail-intro">
                    <button className="douyin-detail-back" onClick={() => setSelectedProject(null)}>← SEE ALL DOUYIN WORKS</button>
                    <p className="douyin-detail-index">{selectedProject.id} / {selectedProject.tag}</p>
                    <h2>{selectedProject.title}</h2>
                    <div className="douyin-detail-meta"><span>DOUYIN WORKS</span><span>2025—♾️</span></div>
                    <p>{selectedProject.description}</p>
                    <small>当前为内容占位结构，待补充真实项目背景、角色、过程与结果。</small>
                  </aside>

                  <div className="douyin-visual-stream">
                    <button className="douyin-visual-card douyin-visual-hero" onClick={() => openImage(selectedProject.preview)} aria-label="放大查看抖音项目视觉">
                      <span>DOUYIN / CONTENT &amp; PRODUCT</span>
                      <img src={selectedProject.preview} alt={`${selectedProject.title} 抖音钥匙扣视觉`} />
                      <strong>CONTENT<br />IN MOTION</strong>
                    </button>
                    <div className="douyin-visual-pair">
                      <figure><img src={selectedProject.preview} alt="抖音项目视觉占位 1" /><figcaption>01 / PRODUCT</figcaption></figure>
                      <figure><img src={selectedProject.preview} alt="抖音项目视觉占位 2" /><figcaption>02 / CREATOR</figcaption></figure>
                    </div>
                    <figure className="douyin-visual-wide"><span>PROJECT VISUAL ARCHIVE</span><img src={selectedProject.preview} alt="抖音项目视觉档案占位" /><b>DOUYIN</b></figure>
                    <div className="douyin-visual-triptych">
                      {["RESEARCH", "EXPERIENCE", "GROWTH"].map((label, index) => <figure key={label}><small>0{index + 1}</small><img src={selectedProject.preview} alt={`${label} 视觉占位`} /><figcaption>{label}</figcaption></figure>)}
                    </div>
                  </div>
                </div>

                {nextProjects.length > 0 && <section className="douyin-see-more"><h3>see more.</h3><div>{nextProjects.map((project) => <button key={project.id} onClick={() => { setSelectedProject(project); setZoomedImage(null); setImageZoom(1); }}><span className="douyin-next-image"><img src={project.preview} alt={`${project.title} 项目预览`} /></span><span><small>{project.id}</small><strong>{project.title}</strong><i>VIEW PROJECT ↗</i></span></button>)}</div></section>}
              </section>
            ) : <>
            <header className="folder-browser-head">
              <button className="close-project" onClick={() => { setSelectedWork(null); setSelectedProject(null); }}>CLOSE</button>
              {!selectedProject ? <>
                <div className="work-meta"><span>{selectedWork.id}</span><span>{selectedWork.type}</span><span>{selectedWork.period}</span>{selectedWork.role && <span>{selectedWork.role}</span>}</div>
                <h2>{selectedWork.title}</h2>
                <p className="folder-description">{selectedWork.detail}</p>
                {selectedWork.impact && <p className="folder-impact">五一大促启动图点击率达 <strong>0.53%</strong>，创历史新高，较往期提升 <strong>0.4pp</strong>，为活动导流 <strong>15 万+人次</strong>。</p>}
              </> : <>
                <div className="work-meta"><span>{selectedProject.id}</span><span>{selectedProject.tag}</span><span>{selectedWork.period}</span></div>
                <h2>{selectedProject.title}</h2>
                <p className="folder-description">{selectedWork.title} · 营销视觉设计项目</p>
              </>}
            </header>

            {!selectedProject ? (
              <div className={`project-gallery ${selectedWork.layout}`}>
                {selectedWork.id === "02" ? (
                  <div className="meituan-flow">
                    <div className="meituan-flow-column">{selectedProjects.filter((_, index) => index % 2 === 0).map(renderProjectCard)}</div>
                    <div className="meituan-flow-column is-offset">{selectedProjects.filter((_, index) => index % 2 === 1).map(renderProjectCard)}</div>
                  </div>
                ) : selectedProjects.map(renderProjectCard)}
              </div>
            ) : (
              <section className="project-detail">
                <button className="back-project" onClick={() => setSelectedProject(null)}>← BACK TO {selectedWork.title}</button>
                <button className={`project-detail-hero ${selectedProject.preview !== selectedWork.preview ? "is-long" : ""}`} onClick={() => openImage(selectedProject.preview)} aria-label={`放大查看${selectedProject.title}项目作品`}><img src={selectedProject.preview} alt={`${selectedProject.title} 项目作品`} /></button>
                {nextProjects.length > 0 && <section className="next-projects"><p className="eyebrow">NEXT PROJECTS</p><div>{nextProjects.map((project) => <button key={project.id} onClick={() => { setSelectedProject(project); setZoomedImage(null); setImageZoom(1); }}><img src={project.preview} alt="" /><span><small>{project.id}</small><strong>{project.title}</strong><i>VIEW PROJECT ↗</i></span></button>)}</div></section>}
              </section>
            )}
            </>}
          </article>
        </div>
      )}
      {zoomedImage && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="作品图片查看器" onClick={() => setZoomedImage(null)} onWheel={(event) => { event.preventDefault(); setImageZoom((zoom) => Math.min(4, Math.max(.65, zoom * Math.exp(-event.deltaY * .001)))); }}>
        {lightboxIndex > 0 && <button className="lightbox-arrow lightbox-arrow-left" onClick={(event) => { event.stopPropagation(); showLightboxImage(lightboxIndex - 1); }} aria-label="查看上一张">←</button>}
        {lightboxIndex < lightboxImages.length - 1 && <button className="lightbox-arrow lightbox-arrow-right" onClick={(event) => { event.stopPropagation(); showLightboxImage(lightboxIndex + 1); }} aria-label="查看下一张">→</button>}
        <div className="image-lightbox-canvas"><img src={zoomedImage} alt="放大的项目作品" draggable="false" style={{ transform: `translate(${imagePan.x}px, ${imagePan.y}px) scale(${imageZoom})` }} onClick={(event) => event.stopPropagation()} onAuxClick={(event) => event.preventDefault()} onPointerDown={startImageDrag} onPointerMove={moveImageDrag} onPointerUp={stopImageDrag} onPointerCancel={stopImageDrag} /></div>
      </div>}
    </main>
  );
}
