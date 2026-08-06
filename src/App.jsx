import { useEffect, useState } from "react";

const keychainItems = [
  { id: "06", label: "AI LAB", src: "/assets/keychain-06-ai-lab.png", hit: [0.88, 0.62], className: "piece-ai" },
  { id: "05", label: "EXERCISES", src: "/assets/keychain-05-practice.png", hit: [0.73, 0.68], className: "piece-practice" },
  { id: "04", label: "KUAISHOU", src: "/assets/keychain-04-kuaishou.png", hit: [0.60, 0.65], className: "piece-kuaishou" },
  { id: "03", label: "MEITUAN", src: "/assets/keychain-03-meituan.png", hit: [0.47, 0.66], className: "piece-meituan" },
  { id: "02", label: "DOUYIN", src: "/assets/keychain-02-douyin.png", hit: [0.30, 0.73], className: "piece-douyin" },
  { id: "01", label: "ABOUT ME", src: "/assets/keychain-01-about.png", hit: [0.21, 0.56], className: "piece-about" },
];

const works = [
  { id: "01", title: "DOUYIN", type: "CONTENT & PRODUCT", period: "2025—♾️", color: "lime", preview: "/assets/work-previews/douyin.png", detail: "持续进行中的内容、产品与创意实践。" },
  { id: "02", title: "MEITUAN", type: "PRODUCT WORK", period: "2023—2025", color: "yellow", preview: "/assets/work-previews/meituan.png", detail: "在真实业务场景中完成的产品与内容项目。" },
  { id: "03", title: "KUAISHOU", type: "PRODUCT WORK", period: "2022—2023", color: "blue", preview: "/assets/work-previews/kuaishou.png", detail: "围绕内容体验、产品策略与创作者生态展开的工作。" },
  { id: "04", title: "BRAND", type: "BRAND & IDENTITY", period: "", color: "orange", preview: "/assets/work-previews/exercises.png", detail: "围绕品牌定位、视觉识别与内容表达展开的设计实践。" },
  { id: "05", title: "Exercises I did", type: "EXPERIMENTS", period: "2023", color: "grey", preview: "/assets/work-previews/exercises.png", detail: "曾经做过的设计、内容与视觉练习。" },
  { id: "06", title: "AI LAB", type: "AI EXPERIMENTS", period: "", color: "pink", preview: "/assets/work-previews/ai-lab.png", detail: "探索 AI、视觉、原型与代码之间的新组合。" },
];

const capabilities = [
  ["01", "从模糊想法到清晰方案", "STRATEGY"],
  ["02", "用 AI 加速研究与整理", "RESEARCH"],
  ["03", "视觉概念与内容表达", "CREATIVE"],
  ["04", "原型、代码与快速验证", "BUILD"],
  ["05", "可复用的 AI 工作流", "SYSTEM"],
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeKeychain, setActiveKeychain] = useState(null);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => reveal.observe(node));
    return () => reveal.disconnect();
  }, []);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText("hello@yourname.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
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

  const touchKeychain = (event) => {
    if (event.pointerType !== "touch") return;
    const id = keychainAtPoint(event);
    if (id) toggleKeychain(id);
  };

  const toggleKeychain = (id) => setActiveKeychain((current) => current === id ? null : id);

  return (
    <main className="site-shell">
      <header className={menuOpen ? "topbar menu-active" : "topbar"}>
        <button className="mobile-wordmark" onClick={() => jump("home")}>AGEN</button>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="主导航">
          <button onClick={() => jump("home")}>HOME</button>
          <button onClick={() => jump("works")}>WORKS</button>
          <button onClick={() => jump("about")}>ABOUT</button>
          <button onClick={() => jump("ai-lab")}>AI LAB</button>
          <button onClick={() => jump("contact")}>CONTACT</button>
        </nav>
        <button className="menu-button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "CLOSE" : "MENU"}</button>
      </header>

      <section className="hero" id="home">
        <p className="hero-side hero-side-left">A COLLECTION OF<br />WORKS &amp; EXPERIMENTS</p>
        <p className="hero-side hero-side-right">AGEN WORKSPACE 2026</p>
        <div
          className={activeKeychain ? "keychain-stage has-active" : "keychain-stage"}
          data-active={activeKeychain || ""}
          onPointerMove={moveKeychain}
          onPointerDown={touchKeychain}
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
                onClick={() => toggleKeychain(item.id)}
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

      <section className="about section-pad dot-grid" id="about" data-reveal>
        <p className="section-index">01 / ABOUT</p>
        <div className="about-grid">
          <img src="/assets/creator-folder.png" alt="装有创作档案的蓝色透明文件夹" />
          <div className="about-copy">
            <h2>HELLO.<br />I’M <span>AGEN.</span></h2>
            <div className="status-strip"><span>BASED IN CHINA</span><span>OPEN TO OPPORTUNITIES</span></div>
            <p>我擅长把复杂信息整理成清晰的叙事、体验和执行方案。我正在持续探索 AI 如何改变个人创作、产品设计与内容生产。</p>
            <div className="stats">
              <div><strong>06+</strong><span>PROJECT TYPES</span></div>
              <div><strong>05</strong><span>AI CAPABILITIES</span></div>
              <div><strong>∞</strong><span>CURIOSITY</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="works" id="works">
        <div className="works-head section-pad" data-reveal>
          <h2>Works <i>Archive</i></h2>
        </div>
        <div className="folder-stack">
          {works.map((work, index) => (
            <div className={`work-folder-shell folder-${index + 1}`} key={work.id}>
              <span className="folder-preview" aria-hidden="true">
                <img src={work.preview} alt="" />
                <img src={work.preview} alt="" />
                <i>{work.type}</i>
                <b>{work.id}</b>
              </span>
              <button className={`work-folder ${work.color}`} onClick={() => setSelectedWork(work)}>
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

      <section className="ai-lab section-pad dot-grid" id="ai-lab" data-reveal>
        <p className="section-index">03 / AI LAB</p>
        <div className="lab-hero">
          <div>
            <p className="eyebrow">AI IS NOT A BUTTON</p>
            <h2>我把 AI 当作<br />思考与创作的<span>协作者</span></h2>
            <p className="lab-copy">从研究、文案和信息结构，到视觉生成、原型与前端实现，我关注的不只是“会不会用工具”，而是如何设计一条可靠、可复用的工作流。</p>
          </div>
          <img src="/assets/ai-keychain-hero.png" alt="代表 AI 工作流的实验性三维标签组合" />
        </div>
        <div className="capability-deck">
          {capabilities.map(([id, title, tag], index) => (
            <article className="capability-card" style={{ "--tilt": `${(index - 2) * 2.4}deg` }} key={id}>
              <span>{id}</span><small>{tag}</small><h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-tab">CONTACT</div>
        <div className="contact-inner">
          <p className="section-index dark">04 / SAY HELLO</p>
          <h2>LET’S CREATE<br />SOMETHING <i>USEFUL.</i></h2>
          <p>如果你想进一步了解我、讨论机会，或一起做点有意思的事，欢迎联系。</p>
          <div className="contact-actions">
            <a href="mailto:hello@yourname.com">SEND AN EMAIL</a>
            <button onClick={copyEmail}>{copied ? "EMAIL COPIED" : "COPY EMAIL"}</button>
          </div>
          <footer><span>AGEN WORKSPACE © 2026</span><span>BUILT WITH DESIGN × AI × CODE</span></footer>
        </div>
      </section>

      {selectedWork && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={selectedWork.title} onClick={() => setSelectedWork(null)}>
          <article className={`project-sheet ${selectedWork.color}`} onClick={(event) => event.stopPropagation()}>
            <button className="close-project" onClick={() => setSelectedWork(null)}>CLOSE</button>
            <div className="work-meta"><span>{selectedWork.id}</span><span>{selectedWork.type}</span><span>{selectedWork.period}</span></div>
            <h2>{selectedWork.title}</h2>
            <p>{selectedWork.detail}</p>
            <div className="project-columns"><div><small>ROLE</small><strong>STRATEGY / DESIGN / AI</strong></div><div><small>STATUS</small><strong>CASE STUDY COMING SOON</strong></div></div>
          </article>
        </div>
      )}
    </main>
  );
}
