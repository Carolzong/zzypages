"use client";

import { useEffect, useMemo, useState } from "react";

type Material = {
  id: number;
  title: string;
  type: string;
  tag: string;
  status: string;
  note: string;
  color: string;
  episode: string;
  source: string;
};

const seedMaterials: Material[] = [
  { id: 1, title: "穿进公司后我成了老板的AI秘书", type: "剧情拆解", tag: "职场 / 反转", status: "已拆解", note: "第 03 集：用‘误发会议纪要’制造身份错位，结尾再抛出老板也重生的钩子。", color: "coral", episode: "03", source: "番茄短剧 · 热门榜" },
  { id: 2, title: "便利店夜班的第 17 个秘密", type: "镜头参考", tag: "悬疑 / 低成本", status: "待复看", note: "单场景也能持续升级：收银台 → 监控画面 → 冰柜倒影，空间信息承担叙事。", color: "lavender", episode: "01", source: "抖音短剧 · 朋友推荐" },
  { id: 3, title: "她把离婚协议改成了融资条款", type: "产品灵感", tag: "女性 / 爽感", status: "已归档", note: "爽点不是打脸本身，而是把情感关系翻译成可量化的商业谈判。", color: "mint", episode: "08", source: "小红书 · 评论区" },
  { id: 4, title: "AI 生成短剧的角色一致性", type: "竞品观察", tag: "AI 工作流", status: "行动中", note: "值得验证：角色卡是否能减少多镜头重绘？需要记录提示词、参考图与返工次数。", color: "blue", episode: "—", source: "可灵 / 即梦" },
];

const navItems = [
  ["⌂", "今日工作台", "home"],
  ["▣", "素材库", "library"],
  ["✦", "产品拆解", "breakdown"],
  ["◇", "灵感孵化", "ideas"],
  ["◉", "红果观察", "hongguo"],
  ["✓", "行动清单", "tasks"],
];

export default function Home() {
  const [active, setActive] = useState("home");
  const [materials, setMaterials] = useState(seedMaterials);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("全部");
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const isHome = active === "home";

  useEffect(() => {
    const stored = window.localStorage.getItem("ai-short-drama-materials");
    if (stored) setMaterials(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ai-short-drama-materials", JSON.stringify(materials));
  }, [materials]);

  const visibleMaterials = useMemo(() => materials.filter((item) => {
    const matchQuery = `${item.title}${item.tag}${item.note}`.toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === "全部" || item.type === filter;
    return matchQuery && matchFilter;
  }), [materials, query, filter]);

  function addMaterial() {
    if (!newTitle.trim()) return;
    setMaterials([{ id: Date.now(), title: newTitle.trim(), type: "待整理", tag: "新素材", status: "待拆解", note: "先记下你为什么保存它：人物、钩子、镜头，或某个值得做成产品的瞬间。", color: "yellow", episode: "—", source: "我的收藏" }, ...materials]);
    setNewTitle("");
    setShowForm(false);
  }

  function markReviewed() {
    if (!selectedMaterial) return;
    setMaterials(materials.map((item) => item.id === selectedMaterial.id ? { ...item, status: "已拆解" } : item));
    setSelectedMaterial(null);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">✦</div><div><strong>剧作台</strong><span>AI SHORT DRAMA LAB</span></div></div>
        <div className="workspace-switch"><span className="avatar">M</span><div><b>我的创作空间</b><small>个人工作台</small></div><span className="chevron">⌄</span></div>
        <nav className="nav-list" aria-label="主导航">
          {navItems.map(([icon, label, id]) => <button key={id} className={active === id ? "nav-item active" : "nav-item"} onClick={() => setActive(id)}><span>{icon}</span>{label}{id === "tasks" && <em>4</em>}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="progress-label"><span>本周进度</span><b>62%</b></div><div className="progress"><i /></div><p>已完成 8 / 13 个小目标</p><button className="help" onClick={() => setActive("breakdown")}>？ 使用指南 <span>↗</span></button></div>
      </aside>

      <section className="content-area">
        <header className="topbar"><div className="breadcrumbs">我的空间 <span>/</span> <b>{active === "home" ? "今日工作台" : navItems.find((item) => item[2] === active)?.[1]}</b></div><div className="top-actions"><button className="icon-button" onClick={() => setActive("library")} aria-label="搜索">⌕</button><button className="icon-button" onClick={() => setActive("tasks")} aria-label="通知">♧<i className="dot" /></button><div className="profile">林小满 <span className="avatar mini">LM</span></div></div></header>

        <div className={`main-inner ${isHome ? "home-page" : "subpage"}`}>
          <div className="home-dashboard">
          <div className="welcome-row"><div><p className="eyebrow">TUESDAY · AUG 11, 2026</p><h1>今天也来捕捉一点<br /><span>好故事。</span></h1><p className="welcome-copy">把看过的、想做的、正在验证的，放在一个地方慢慢长出来。</p></div><div className="streak"><span>✹</span><div><b>连续记录 6 天</b><small>再坚持 1 天解锁新徽章</small></div></div></div>

          <div className="stat-grid"><div className="stat-card accent-coral"><span>素材总数</span><strong>{materials.length}<small>条</small></strong><p>↑ 3 <em>较上周</em></p><div className="sparkline coral-line">╱╲╱╲╱╲╱</div></div><div className="stat-card accent-lavender"><span>正在拆解</span><strong>06<small>个</small></strong><p>本周新增 2 个</p><div className="mini-bars"><i /><i /><i /><i /><i /></div></div><div className="stat-card accent-mint"><span>待验证想法</span><strong>12<small>个</small></strong><p>其中 4 个高潜</p><div className="sparkline mint-line">╲╱╲╱╲╱╲</div></div></div>

          <div className="section-heading"><div><p className="eyebrow">CAPTURE & ORGANIZE</p><h2>最近捕捉</h2></div><button className="text-button" onClick={() => setActive("library")}>查看全部 <span>→</span></button></div>
          <div className="toolbar"><div className="search-box"><span>⌕</span><input aria-label="搜索素材" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索标题、标签或笔记..." /></div><div className="filter-tabs">{["全部", "剧情拆解", "镜头参考", "产品灵感", "竞品观察"].map((item) => <button className={filter === item ? "selected" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><button className="add-button" onClick={() => setShowForm(!showForm)}>＋ 新建素材</button></div>
          {showForm && <div className="quick-form"><input autoFocus value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addMaterial()} placeholder="输入素材标题，例如：三分钟看懂一集短剧的节奏" /><button onClick={addMaterial}>保存素材</button></div>}
          <div className="material-list">{visibleMaterials.map((item) => <article className="material-card" key={item.id} onDoubleClick={() => setSelectedMaterial(item)}><div className={`cover ${item.color}`}><span>{item.type === "剧情拆解" ? "剧" : item.type === "镜头参考" ? "镜" : item.type === "产品灵感" ? "想" : "AI"}</span><small>EP<br />{item.episode}</small></div><div className="material-body"><div className="material-meta"><span>{item.type}</span><time>今天 09:42</time></div><h3>{item.title}</h3><div className="tag-row"><b>{item.tag}</b><span className={`status status-${item.status}`}>{item.status}</span></div><p>{item.note}</p><div className="card-footer"><span>来源：{item.source}</span><button onClick={() => setSelectedMaterial(item)} aria-label={`打开${item.title}`}>打开拆解 <span>↗</span></button></div></div><button className="more" onClick={() => setSelectedMaterial(item)} aria-label="更多操作">•••</button></article>)}</div>
          {visibleMaterials.length === 0 && <div className="empty-state">没有匹配的素材。试试换个关键词，或新建一条记录。</div>}
          </div>
          {!isHome && <WorkspaceView active={active} materials={materials} onOpenMaterial={setSelectedMaterial} onAdd={() => { setActive("home"); setShowForm(true); }} />}
        </div>
      </section>

      <aside className="right-rail"><div className="rail-head"><h3>本周聚焦</h3><button onClick={() => setActive("ideas")}>•••</button></div><div className="focus-card"><div className="focus-icon">◒</div><div><strong>做出一个可验证的<br />AI 短剧产品假设</strong><p>还剩 4 天 · 产品探索</p></div><span className="check">✓</span></div><div className="rail-section"><div className="rail-title"><h3>行动清单 <em>4</em></h3><button onClick={() => setActive("tasks")}>管理</button></div><label className="check-row"><input type="checkbox" defaultChecked /><span>整理《便利店夜班》镜头笔记</span></label><label className="check-row"><input type="checkbox" /><span>补齐角色卡字段：欲望 / 秘密</span></label><label className="check-row"><input type="checkbox" /><span>试跑一次角色一致性工作流</span></label><label className="check-row"><input type="checkbox" /><span>把 3 个爽点写成产品需求</span></label></div><div className="quote-card"><span>“</span><p>先积累能解释的样本，<br />再谈能复制的方法。</p><small>— 给未来产品经理的提醒</small></div><div className="rail-section mini-calendar"><div className="rail-title"><h3>记录热力</h3><button onClick={() => setActive("home")}>8 月 ↗</button></div><div className="heatmap">{Array.from({ length: 35 }, (_, i) => <i key={i} className={i % 7 === 0 || i % 11 === 0 ? "hot" : i % 4 === 0 ? "warm" : ""} />)}</div><div className="heat-legend"><span>少</span><i /><i className="warm" /><i className="hot" /><span>多</span></div></div></aside>
      {selectedMaterial && <div className="detail-backdrop" onClick={() => setSelectedMaterial(null)}><section className="detail-panel" onClick={(e) => e.stopPropagation()}><button className="detail-close" onClick={() => setSelectedMaterial(null)}>×</button><div className={`detail-cover cover ${selectedMaterial.color}`}><span>{selectedMaterial.type === "剧情拆解" ? "剧" : selectedMaterial.type === "镜头参考" ? "镜" : selectedMaterial.type === "产品灵感" ? "想" : "AI"}</span><small>EP<br />{selectedMaterial.episode}</small></div><p className="eyebrow">{selectedMaterial.type} · {selectedMaterial.source}</p><h2>{selectedMaterial.title}</h2><div className="tag-row"><b>{selectedMaterial.tag}</b><span className={`status status-${selectedMaterial.status}`}>{selectedMaterial.status}</span></div><div className="detail-block"><span>我的观察</span><p>{selectedMaterial.note}</p></div><div className="detail-block"><span>下一步建议</span><p>把这个样本转成一个可验证的问题：它为什么有效？如果交给 AI 产品来做，哪个环节最值得先验证？</p></div><button className="primary-wide" onClick={() => setSelectedMaterial(null)}>标记为已复盘</button></section></div>}
      {showForm && <div className="detail-backdrop" onClick={() => setShowForm(false)}><section className="detail-panel new-material-modal" onClick={(e) => e.stopPropagation()}><button className="detail-close" onClick={() => setShowForm(false)}>×</button><p className="eyebrow">NEW MATERIAL · CAPTURE</p><h2>新建素材</h2><p className="modal-hint">先记下标题，保存后再慢慢补标签、来源和拆解笔记。</p><input autoFocus className="modal-input" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addMaterial()} placeholder="例如：红果热门短剧的前三集钩子" /><button className="primary-wide" onClick={addMaterial}>保存到素材库</button></section></div>}
    </main>
  );
}

function WorkspaceView({ active, materials, onOpenMaterial, onAdd }: { active: string; materials: Material[]; onOpenMaterial: (item: Material) => void; onAdd: () => void }) {
  const titles: Record<string, [string, string]> = { library: ["素材库", "所有看过的内容，都可以变成下一次产品判断的样本。"], breakdown: ["产品拆解", "把短剧里的爽点、节奏和角色机制，翻译成产品语言。"], ideas: ["灵感孵化", "先记录一个假设，再用素材和用户反馈把它养大。"], hongguo: ["红果观察", "把平台趋势、剧集样本和 AI 机会放在一起看。"], tasks: ["行动清单", "让每一条素材都走到下一步，而不是停在收藏夹里。"] };
  const [title, description] = titles[active] || titles.library;
  return <section className="workspace-view"><div className="workspace-hero"><div><p className="eyebrow">{active.toUpperCase()} · WORKSPACE</p><h1>{title}</h1><p>{description}</p></div><button className="add-button" onClick={onAdd}>＋ 新建素材</button></div>{active === "library" && <div className="library-grid">{materials.map((item) => <button className="library-tile" key={item.id} onClick={() => onOpenMaterial(item)}><div className={`cover ${item.color}`}><span>{item.type === "剧情拆解" ? "剧" : item.type === "镜头参考" ? "镜" : item.type === "产品灵感" ? "想" : "AI"}</span><small>EP<br />{item.episode}</small></div><div><span className="tile-type">{item.type}</span><h3>{item.title}</h3><p>{item.tag} · {item.status}</p></div><span className="tile-arrow">↗</span></button>)}</div>}{active === "breakdown" && <div className="breakdown-grid"><div className="method-card"><span>01</span><h3>钩子强度</h3><p>前 3 秒是否出现明确冲突？用户为什么会继续看？</p><button onClick={onAdd}>开始记录 →</button></div><div className="method-card"><span>02</span><h3>爽点节奏</h3><p>反转、奖励和悬念如何分布？能否形成可复用结构？</p><button onClick={onAdd}>开始记录 →</button></div><div className="method-card"><span>03</span><h3>AI 可介入点</h3><p>哪些步骤适合用角色卡、分镜或生成式工具提效？</p><button onClick={onAdd}>开始记录 →</button></div></div>}{active === "ideas" && <div className="idea-board"><div className="idea-input"><span>✦</span><input placeholder="写下一个还不完整的产品想法..." /><button onClick={onAdd}>保存灵感</button></div><div className="idea-columns"><div><b>待验证</b><p>角色卡能否减少 AI 短剧返工次数？</p><p>短剧拆解是否可以自动生成 PRD 初稿？</p></div><div><b>验证中</b><p>单场景镜头的空间信息标注方法</p></div><div><b>值得做</b><p>面向创作者的 AI 短剧素材共创库</p></div></div></div>}{active === "hongguo" && <div className="hongguo-board"><div className="trend-strip"><div><span>平台观察</span><b>免费内容 + 广告分账</b><p>沉浸式上下滑、剧场找剧、评论互动、追剧与预约，构成完整观看闭环。</p></div><div><span>题材信号</span><b>现实 / 国风 / 漫剧</b><p>公开资料显示，现实题材和传统文化热度上升，AIGC 漫剧仍是潜力方向。</p></div><div><span>拆解方法</span><b>57 个细分标签</b><p>不要只记录“古装/现代”，还要记录情感、重生、权谋、地域和场景机制。</p></div></div><div className="hongguo-section-title"><h2>值得追踪的样本</h2><span>从榜单与行业公开资料整理</span></div><div className="hongguo-samples"><article><span className="sample-no">01</span><div><h3>《东北爱情故事》</h3><b>现实题材 · 地域生活</b><p>观察普通人奋斗、年代场景和地域情绪如何形成真实感。</p></div></article><article><span className="sample-no">02</span><div><h3>《冒姓琅琊》</h3><b>传统文化 · 国风美学</b><p>观察服饰、建筑、书法等视觉资产如何进入剧情，而不是停留在展示。</p></div></article><article><span className="sample-no">03</span><div><h3>番茄 IP 改编样本</h3><b>《盛夏芬德拉》·《云渺》·《念念有词》·《老千》</b><p>观察小说 IP 如何提供世界观、初始受众和短剧改编入口。</p></div></article><article><span className="sample-no">04</span><div><h3>AI 漫剧生产链</h3><b>角色一致性 · 批量分镜 · 成本控制</b><p>优先验证角色卡、镜头复用和返工记录，而不是只追求画面风格。</p></div></article></div><div className="opportunity-card"><span>AI PRODUCT OPPORTUNITY</span><h2>先做一个“短剧拆解到产品假设”的工作流</h2><p>输入一部剧或一集，输出：题材标签、前 3 集钩子、爽点节奏、角色关系、可复用场景和一个待验证的产品机会。</p><button onClick={onAdd}>把这个机会加入行动清单 →</button></div></div>}{active === "tasks" && <div className="task-board">{["整理《便利店夜班》镜头笔记", "补齐角色卡字段：欲望 / 秘密", "试跑一次角色一致性工作流", "把 3 个爽点写成产品需求"].map((task, i) => <label className="task-item" key={task}><input type="checkbox" defaultChecked={i === 0} /><span><b>{task}</b><small>{i === 0 ? "素材库 · 今天" : i === 1 ? "产品拆解 · 明天" : "灵感孵化 · 本周"}</small></span><em>{i === 0 ? "已完成" : "待处理"}</em></label>)}</div>}</section>;
}
