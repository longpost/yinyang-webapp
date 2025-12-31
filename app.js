// Yin-Yang WebApp — no deps, static
(() => {
  const $ = (q, el=document) => el.querySelector(q);
  const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

  const i18n = {
    zh: {
      langName: "中文",
      tabs: ["太极核心","分层拆解","四种失衡","转化模拟","真假判断","术语词典","联动五行"],
      ratio: "阴阳比例",
      balanced: "平衡区",
      warnYang: "阳偏盛",
      warnYin: "阴偏盛",
      extremeYang: "阳极：可能转化（阳极生阴）",
      extremeYin: "阴极：可能转化（阴极生阳）",
      hintBalanced: "不是固定 50/50；平衡是一段动态区间。",
      hintYang: "阳在上升，阴相对下降；继续推高会触发“极则反”。",
      hintYin: "阴在上升，阳相对下降；继续推高会触发“极则反”。",
      exportOk: "已生成 JSON（可复制保存）：",
      yinLabel:"阴",
      yangLabel:"阳"
    },
    en: {
      langName: "English",
      tabs: ["Taiji Core","Layered View","4 Imbalances","Transformation","Illusion Drill","Glossary","Bridge to Wuxing"],
      ratio: "Yin–Yang Ratio",
      balanced: "Balanced band",
      warnYang: "Yang-leaning",
      warnYin: "Yin-leaning",
      extremeYang: "Yang extreme: likely turning (Yang→Yin)",
      extremeYin: "Yin extreme: likely turning (Yin→Yang)",
      hintBalanced: "Balance is a dynamic band, not a fixed 50/50 point.",
      hintYang: "Yang rising, Yin relatively falling; pushing to an extreme tends to flip.",
      hintYin: "Yin rising, Yang relatively falling; pushing to an extreme tends to flip.",
      exportOk: "JSON generated (copy & save):",
      yinLabel:"Yin",
      yangLabel:"Yang"
    }
  };

  let LANG = localStorage.getItem("yy_lang") || "zh";
  function t(key){ return (i18n[LANG]||i18n.zh)[key] ?? key; }

  function applyLangUI(){
    $("#btnLang").textContent = i18n[LANG].langName;

    // Tabs (kept for keyboard 1~7)
    const names = i18n[LANG].tabs;
    $$(".tab").forEach((btn, i) => btn.textContent = names[i] || btn.textContent);

    // Static headings/subtitles (so EN mode won't show lots of Chinese)
    const map = (LANG === "zh") ? {
      brandTitle:"阴阳理论 · 互动学习 WebApp",
      brandSub:"动态太极 · 分层拆解 · 失衡判断 · 转化模拟 · 假象训练",
      hCoreTaiji:"动态太极（可拖动）",
      tCoreTaijiSub:"拖动滑块，观察阴阳消长与“极则反”的提示。",
      hCoreQuick:"关系速记",
      tCoreQuickSub:"把阴阳当作“运行规则”，不是一张静态标签图。",
      hCoreLearn:"你在这里学到什么？",
      noteDisclaimer1:"提示：本 App 为学习/科普用途，不提供医疗诊断或处方建议。",
      hLayers:"分层拆解：同一事物可再分阴阳",
      tLayersSub:"选择一个维度，观察“同一对象”的阴面与阳面如何同时成立。",
      hLayersExamples:"常见分层例子（速查）",
      tLayersExamplesSub:"点一下就能把“阴阳不是二选一”刻进脑子。",
      hImb:"四种基本失衡：盛 vs 虚",
      tImbSub:"“盛”是多了；“虚”是少了。别混。",
      hImbTable:"快速对照表",
      tImbTableSub:"记忆用，背完就丢，关键是理解机制。",
      hTrans:"转化模拟：极则反",
      tTransSub:"用阈值理解“为什么会反转”，而不是当口号。",
      hTransQuote:"转化四句（可背可不背）",
      tTransQuoteSub:"写得很直白，避免玄学腔。",
      hIllus:"真假判断训练（高级）",
      tIllusSub:"给你“表面信息”，你选本质状态。重点是避免被表象骗。",
      hIllusIndex:"常见假象速查",
      tIllusIndexSub:"这一页做得好，你的 App 立刻比普通科普高一档。",
      hGloss:"术语词典",
      tGlossSub:"支持搜索；中英切换。",
      hAbout:"About & 部署",
      tAboutSub:"静态站点：GitHub → Vercel 直接部署。",
      hBridge:"阴阳 × 五行（概念联动）",
      tBridgeSub:"阴阳是“总规则”，五行是“分系统关系网”。这里做逻辑联动，不做处方。",
      hBridgeTpl:"对照模板（学习用句式）",
      tBridgeTplSub:"给你一套“讲给别人听”的句式，避免玄学。"
    } : {
      brandTitle:"Yin–Yang Theory · Interactive Learning WebApp",
      brandSub:"Taiji · Layered analysis · Imbalance logic · Transformation · Illusion drills",
      hCoreTaiji:"Interactive Taiji (rotate)",
      tCoreTaijiSub:"Move the slider to rotate the Taiji and see balance/extreme cues.",
      hCoreQuick:"Quick relationships",
      tCoreQuickSub:"Treat Yin–Yang as operating rules, not static labels.",
      hCoreLearn:"What you learn here",
      noteDisclaimer1:"Note: for learning only. No diagnosis or prescriptions.",
      hLayers:"Layered view: Yin/Yang within the same thing",
      tLayersSub:"Pick a dimension and see how both sides can be true at once.",
      hLayersExamples:"Common examples (tap to view)",
      tLayersExamplesSub:"A fast way to internalize that this isn't a binary choice.",
      hImb:"Four imbalances: Excess vs Deficiency",
      tImbSub:"Excess = too much. Deficiency = too little. Don’t mix them up.",
      hImbTable:"Quick comparison table",
      tImbTableSub:"For memory only — the mechanism matters.",
      hTrans:"Transformation simulation: extremes flip",
      tTransSub:"Use thresholds to understand why reversal happens.",
      hTransQuote:"Four lines (optional)",
      tTransQuoteSub:"Plain language, no mysticism.",
      hIllus:"Illusion drill (advanced)",
      tIllusSub:"Given surface clues, choose the underlying state.",
      hIllusIndex:"Common illusions (quick lookup)",
      tIllusIndexSub:"Nail this page and your app instantly feels more professional.",
      hGloss:"Glossary",
      tGlossSub:"Searchable; bilingual.",
      hAbout:"About & deployment",
      tAboutSub:"Static site: deploy from GitHub to Vercel.",
      hBridge:"Yin–Yang × Five Elements (concept bridge)",
      tBridgeSub:"Yin–Yang is the overarching rule; Five Elements is a network model. This page is conceptual only.",
      hBridgeTpl:"Explanation template",
      tBridgeTplSub:"A simple script to explain without hand-waving."
    };

    Object.entries(map).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (id === "noteDisclaimer1") {
        // keep <b> label, only replace rest
        el.innerHTML = `<b>${LANG==="zh"?"提示":"Note"}：</b>${text.replace(/^提示：|^Note:\s*/,'')}`;
      } else el.textContent = text;
    });


    // Core page blocks (lists/cards) — switch fully to avoid leftover mixed language
    const mini = document.getElementById("coreMiniGrid");
    if (mini){
      mini.innerHTML = (LANG==="zh") ? `
            <div class="mini"><div class="mini-title">阴阳对待</div><div class="mini-body">对立但相互依存：没有纯粹孤立的阴或阳。</div></div>
            <div class="mini"><div class="mini-title">互根互用</div><div class="mini-body">阴为阳之基；阳为阴之用。缺一就失去意义。</div></div>
            <div class="mini"><div class="mini-title">消长平衡</div><div class="mini-body">此消彼长，动态调整；平衡是“区间”，不是“点”。</div></div>
            <div class="mini"><div class="mini-title">转化</div><div class="mini-body">到极端会发生反转：阴极生阳、阳极生阴。</div></div>
      ` : `
            <div class="mini"><div class="mini-title">Opposition</div><div class="mini-body">Opposite yet interdependent: no Yin or Yang exists in isolation.</div></div>
            <div class="mini"><div class="mini-title">Mutual rooting</div><div class="mini-body">Yin is the basis of Yang; Yang is the function of Yin.</div></div>
            <div class="mini"><div class="mini-title">Waxing & waning</div><div class="mini-body">One rises as the other falls; balance is a band, not a point.</div></div>
            <div class="mini"><div class="mini-title">Transformation</div><div class="mini-body">At extremes the system reverses: Yin→Yang, Yang→Yin.</div></div>
      `;
    }

    const callouts = document.getElementById("coreCallouts");
    if (callouts){
      callouts.innerHTML = (LANG==="zh") ? `
            <div class="callout">
              <div class="callout-title">四个信息层（看懂太极图）</div>
              <ul class="list">
                <li><b>对立</b>：黑白相对，彼此制约。</li>
                <li><b>消长</b>：比例可变，系统在变化中求稳。</li>
                <li><b>互根</b>：阴中有阳、阳中有阴（鱼眼）。</li>
                <li><b>转化</b>：阴极生阳、阳极生阴（过界会反转）。</li>
              </ul>
            </div>
            <div class="callout">
              <div class="callout-title">快捷操作</div>
              <ul class="list">
                <li><span class="kbd">←</span>/<span class="kbd">→</span> 调整滑块</li>
                <li><span class="kbd">1</span>~<span class="kbd">7</span> 切换页面</li>
                <li><span class="kbd">?</span> 打开帮助</li>
              </ul>
            </div>
      ` : `
            <div class="callout">
              <div class="callout-title">Four layers of meaning</div>
              <ul class="list">
                <li><b>Opposition</b>: mutual restraint.</li>
                <li><b>Waxing/waning</b>: proportions change over time.</li>
                <li><b>Mutual rooting</b>: Yin within Yang, Yang within Yin (dots).</li>
                <li><b>Transformation</b>: extremes reverse (cross the boundary → flip).</li>
              </ul>
            </div>
            <div class="callout">
              <div class="callout-title">Shortcuts</div>
              <ul class="list">
                <li><span class="kbd">←</span>/<span class="kbd">→</span> adjust slider</li>
                <li><span class="kbd">1</span>–<span class="kbd">7</span> switch sections</li>
                <li><span class="kbd">?</span> open help</li>
              </ul>
            </div>
      `;
    }

    const learn = document.getElementById("coreLearnList");
    if (learn){
      learn.innerHTML = (LANG==="zh") ? `
            <li>如何用“比例”理解阴阳，而不是背概念。</li>
            <li>如何用“分层”避免一句话把人搞糊涂。</li>
            <li>四种失衡（阴盛/阳盛/阴虚/阳虚）的差别。</li>
            <li>为什么会有“看起来热其实虚”的假象。</li>
      ` : `
            <li>Understand Yin–Yang via proportions (not rote labels).</li>
            <li>Use layering to avoid one-sentence confusion.</li>
            <li>Differentiate 4 imbalances (excess/deficiency of Yin/Yang).</li>
            <li>Recognize illusions like “looks hot but rooted in deficiency”.</li>
      `;
    }

    $("#lblRatio").textContent = t("ratio");
    const ly = $("#lblYang"); const ln = $("#lblYin");
    if (ly) ly.textContent = t("yangLabel");
    if (ln) ln.textContent = t("yinLabel");
    const q = $("#q");
    if (q) q.placeholder = (LANG==="zh") ? "搜索：如 阴虚 / 消长 / 真寒假热 ..." : "Search: e.g., Yin deficiency / waxing-waning / true cold false heat ...";
  }

  const viewIds = ["core","layers","imbalance","transform","illusions","glossary","bridge"];
  function showView(name){
    $$(".tab").forEach(b => b.classList.toggle("active", b.dataset.view === name));
    $$(".view").forEach(v => v.classList.toggle("active", v.id === `view-${name}`));
    localStorage.setItem("yy_view", name);
    const el = document.getElementById(`view-${name}`);
    if (el) el.scrollIntoView({behavior:"smooth", block:"start"});
  }
  $$(".tab").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
  const savedView = localStorage.getItem("yy_view");
  if (savedView && viewIds.includes(savedView)) showView(savedView);

  window.addEventListener("keydown", (e) => {
    if (e.key === "?"){
      e.preventDefault();
      $("#helpDlg").showModal();
    }
    if (e.key >= "1" && e.key <= "7"){
      showView(viewIds[Number(e.key)-1]);
    }
    if (["ArrowLeft","ArrowRight"].includes(e.key) && $("#view-core").classList.contains("active")){
      const r = $("#ratio");
      const step = e.shiftKey ? 5 : 1;
      const v = Number(r.value);
      r.value = String(Math.max(0, Math.min(100, v + (e.key==="ArrowRight"?step:-step))));
      updateTaiji();
    }
  });

  $("#btnHelp").addEventListener("click", () => $("#helpDlg").showModal());
  $("#btnCloseHelp").addEventListener("click", () => $("#helpDlg").close());

  $("#btnLang").addEventListener("click", () => {
    LANG = (LANG === "zh") ? "en" : "zh";
    localStorage.setItem("yy_lang", LANG);
    applyLangUI();
    renderGlossary();
    renderImbalance();
    renderIllusionsIndex();
    renderLayers();
    renderBridge();
    updateTaiji();
  });

  function arc(cx, cy, r, a0, a1){
    const p0 = polar(cx, cy, r, a0);
    const p1 = polar(cx, cy, r, a1);
    const large = (Math.abs(a1-a0) % (Math.PI*2)) > Math.PI ? 1 : 0;
    const sweep = a1 > a0 ? 1 : 0;
    return `A ${r} ${r} 0 ${large} ${sweep} ${p1.x} ${p1.y}`;
  }
  function polar(cx, cy, r, a){
    return {x: cx + r*Math.cos(a), y: cy + r*Math.sin(a)};
  }
  function clamp(x,a,b){return Math.max(a, Math.min(b, x));}

  const C = {cx:120, cy:120, R:100};
  function buildTaijiPaths(yangPct){
    const y = yangPct/100;
    const R = C.R;
    const cx = C.cx, cy = C.cy;
    const r = R/2;

    const k = (y - 0.5) * 2 * R * 0.80; // [-0.8R, 0.8R]
    const cuY = cy - r + k;
    const clY = cy + r + k;

    const big = `M ${cx+R} ${cy} ${arc(cx,cy,R,0,Math.PI)} ${arc(cx,cy,R,Math.PI,Math.PI*2)} Z`;
    const upper = `M ${cx+r} ${cuY} ${arc(cx,cuY,r,0,Math.PI)} ${arc(cx,cuY,r,Math.PI,Math.PI*2)} Z`;
    const lower = `M ${cx+r} ${clY} ${arc(cx,clY,r,0,Math.PI)} ${arc(cx,clY,r,Math.PI,Math.PI*2)} Z`;

    const leftHalf = (() => {
      const pTop = polar(cx,cy,R,-Math.PI/2);
      return `M ${pTop.x} ${pTop.y} ${arc(cx,cy,R,-Math.PI/2,Math.PI/2)} L ${cx} ${cy} Z`;
    })();

    const m = clamp(Math.abs(y-0.5)*2, 0, 1);
    const leakAngle = m * Math.PI * 0.48;
    const leak = (() => {
      const side = y >= 0.5 ? -1 : 1;
      const a0 = -Math.PI/2;
      const a1 = -Math.PI/2 + side*leakAngle;
      const p0 = polar(cx,cy,R,a0);
      const p1 = polar(cx,cy,R,a1);
      const sweep = side===-1 ? 0 : 1;
      return `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${R} ${R} 0 0 ${sweep} ${p1.x} ${p1.y} Z`;
    })();

    const yinParts = [leftHalf, lower];
    if (y < 0.5) yinParts.push(leak);
    yinParts.push(upper); // hole via evenodd
    const yinPath = yinParts.join(" ");
    const yangPath = [big, yinPath].join(" ");

    const dot1 = {x: cx, y: cuY};
    const dot2 = {x: cx, y: clY};
    return {yinPath, yangPath, dot1, dot2};
  }

  function computeState(yangPct){
    if (yangPct >= 40 && yangPct <= 60) return {tag:"balanced", label:t("balanced")};
    if (yangPct >= 90) return {tag:"extremeYang", label:t("extremeYang")};
    if (yangPct <= 10) return {tag:"extremeYin", label:t("extremeYin")};
    if (yangPct > 60) return {tag:"yang", label:t("warnYang")};
    return {tag:"yin", label:t("warnYin")};
  }

  function updateTaiji(){
    const r = $("#ratio");
    const yangPct = Number(r.value);
    $("#ratioVal").textContent = String(yangPct);

    const yinPct = 100 - yangPct;
    const pctYang = $("#pctYang"); const pctYin = $("#pctYin");
    if (pctYang) pctYang.textContent = String(yangPct);
    if (pctYin) pctYin.textContent = String(yinPct);
    const barYang = $("#barYang"); const barYin = $("#barYin");
    if (barYang) barYang.style.height = `${yangPct}%`;
    if (barYin) barYin.style.height = `${yinPct}%`;

    // Keep a correct (standard) Taiji and rotate it for interactivity.
    const g = $("#taijiG");
    if (g){
      const deg = (yangPct - 50) * 1.8; // -90..+90
      g.setAttribute("transform", `rotate(${deg} 120 120)`);
    }

    // Make the dots subtly respond (optional visual cue)
    const yinDot = $("#dotYinInYang");
    const yangDot = $("#dotYangInYin");
    if (yinDot && yangDot){
      const yinR = 8 + Math.max(0, (50 - yangPct)) / 50 * 6;
      const yangR = 8 + Math.max(0, (yangPct - 50)) / 50 * 6;
      yinDot.setAttribute("r", String(yinR));
      yangDot.setAttribute("r", String(yangR));
    }

    const st = computeState(yangPct);
    $("#badgeState").textContent = st.label;
    const hint = st.tag === "balanced" ? t("hintBalanced") :
                 st.tag === "yang" ? t("hintYang") :
                 st.tag === "yin" ? t("hintYin") :
                 (st.tag === "extremeYang" ? t("hintYang") : t("hintYin"));
    $("#hintState").textContent = hint;

    localStorage.setItem("yy_ratio", String(yangPct));
  }

  const savedRatio = localStorage.getItem("yy_ratio");
  if (savedRatio !== null) $("#ratio").value = savedRatio;
  $("#ratio").addEventListener("input", updateTaiji);
  updateTaiji();

  const layerData = {
    surface: {
      zh: {left:{t:"表（阳）", b:"外在、功能表现、活动层面更偏阳。"}, right:{t:"里（阴）", b:"内在、物质基础、深层结构更偏阴。"}},
      en: {left:{t:"Exterior (Yang)", b:"Outward expression, activity and function tend to be Yang."}, right:{t:"Interior (Yin)", b:"Inner foundation, structure and substance tend to be Yin."}}
    },
    motion: {
      zh: {left:{t:"动（阳）", b:"推动、升发、变化更偏阳。"}, right:{t:"静（阴）", b:"收敛、凝聚、稳定更偏阴。"}},
      en: {left:{t:"Movement (Yang)", b:"Pushing, rising and change tend to be Yang."}, right:{t:"Stillness (Yin)", b:"Consolidation, restraint and stability tend to be Yin."}}
    },
    substance: {
      zh: {left:{t:"功能（阳）", b:"温煦、推动、转化等“作用面”偏阳。"}, right:{t:"物质（阴）", b:"津液、血、精等“承载面”偏阴。"}},
      en: {left:{t:"Function (Yang)", b:"Warming, driving and transforming are Yang aspects."}, right:{t:"Substance (Yin)", b:"Fluids, blood and material carriers are Yin aspects."}}
    },
    updown: {
      zh: {left:{t:"上（阳）", b:"上升、外达、头面胸更偏阳。"}, right:{t:"下（阴）", b:"下降、内守、腹腰下肢更偏阴。"}},
      en: {left:{t:"Up (Yang)", b:"Rising and outward; upper body tends to be Yang."}, right:{t:"Down (Yin)", b:"Descending and inward; lower body tends to be Yin."}}
    },
    temp: {
      zh: {left:{t:"热（阳）", b:"温热、兴奋、消耗偏阳。"}, right:{t:"寒（阴）", b:"寒凉、迟缓、凝滞偏阴。"}},
      en: {left:{t:"Heat (Yang)", b:"Warmth/excitation/consumption are Yang tendencies."}, right:{t:"Cold (Yin)", b:"Cold/slowness/congealing are Yin tendencies."}}
    }
  };

  const layerExamples = [
    {
      zh:{k:"上热下寒（分层矛盾）", d:"同一人可以出现“上偏阳、下偏阴”。提示：先分层再判断。"},
      en:{k:"Heat above, cold below", d:"One system can show opposite tendencies across layers. Split layers first."}
    },
    {
      zh:{k:"功能亢 vs 物质不足", d:"表现像“热”，但根子可能是“阴不足不能制阳”。"},
      en:{k:"Hyper-function vs low substance", d:"Looks like ‘heat’, yet root can be low Yin failing to restrain Yang."}
    },
    {
      zh:{k:"昼阳夜阴（相对性）", d:"白天更偏动/外，夜晚更偏静/内。换参照就换划分。"},
      en:{k:"Day Yang, night Yin", d:"Day tends outward activity; night tends inward rest. Yin/Yang are relative."}
    },
    {
      zh:{k:"外静内动", d:"表面安静（阴），内在焦躁/冲动（阳）。别只看表象。"},
      en:{k:"Still outside, driven inside", d:"Quiet exterior (Yin) may hide inner drive (Yang)."}
    }
  ];

  function renderLayers(){
    const dim = $("#layerDim").value;
    const L = layerData[dim][LANG];
    $("#layerCards").innerHTML = `
      <div class="lcard y"><div class="t">${L.left.t}</div><div class="b">${L.left.b}</div></div>
      <div class="lcard n"><div class="t">${L.right.t}</div><div class="b">${L.right.b}</div></div>
    `;
    const host = $("#layerExamples");
    host.innerHTML = "";
    layerExamples.forEach(ex => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.textContent = ex[LANG].k;
      btn.addEventListener("click", () => {
        $$("#layerExamples .chip").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        $("#layerExampleDetail").innerHTML = `<b>${ex[LANG].k}</b><div style="margin-top:6px">${ex[LANG].d}</div>`;
      });
      host.appendChild(btn);
    });
  }
  $("#layerDim").addEventListener("change", renderLayers);
  $("#layerObj").addEventListener("change", renderLayers);

  const imbalances = [
    {
      id:"yinExcess",
      zh:{name:"阴盛", mech:"阴偏多，制约/压制阳", pit:"容易把“阴盛”误当成“阴虚”", points:["偏寒、收敛、凝滞倾向","阳的推动受限","常见于“多了”的阴性因素占优势"]},
      en:{name:"Yin Excess", mech:"Too much Yin suppresses Yang", pit:"Mistaken as Yin deficiency", points:["Cold/constraint tendency","Yang’s drive is restricted","Often ‘too much’ rather than ‘too little’"]}
    },
    {
      id:"yangExcess",
      zh:{name:"阳盛", mech:"阳偏多，消耗阴、亢动外越", pit:"容易忽略“过盛会转化”", points:["偏热、外越、躁动倾向","阴的承载被消耗","到极端可能出现反转（阳极生阴）"]},
      en:{name:"Yang Excess", mech:"Too much Yang consumes Yin and over-drives", pit:"Ignoring potential flip at extremes", points:["Heat/overactivity tendency","Yin carrier gets consumed","At extreme, system tends to flip (Yang→Yin)"]}
    },
    {
      id:"yinDef",
      zh:{name:"阴虚", mech:"阴偏少，不能制约阳（虚热倾向）", pit:"表面像热，容易误判为阳盛", points:["物质基础不足（承载面少）","阳相对显得亢（但未必真多）","常见“虚热”“内热”解释框架"]},
      en:{name:"Yin Deficiency", mech:"Too little Yin fails to restrain Yang (empty heat)", pit:"Looks like heat, mistaken as Yang excess", points:["Low material foundation","Yang appears relatively hyper (not necessarily truly excess)","Framework for ‘empty heat’"]}
    },
    {
      id:"yangDef",
      zh:{name:"阳虚", mech:"阳偏少，不能温化推动（虚寒倾向）", pit:"把“阳虚”误当成“阴盛”", points:["功能推动不足（作用面弱）","寒、乏力、迟缓倾向（模型层面）","常与“气化不足”这类表述相关"]},
      en:{name:"Yang Deficiency", mech:"Too little Yang fails to warm/drive (empty cold)", pit:"Mistaken as Yin excess", points:["Low functional drive","Cold/low-energy tendency (as a model)","Often framed as weak transformation"]}
    }
  ];

  function renderImbalance(){
    const host = $("#imbalanceChips");
    host.innerHTML = "";
    imbalances.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.textContent = item[LANG].name;
      btn.addEventListener("click", () => {
        $$("#imbalanceChips .chip").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        renderImbalancePanel(item.id);
        localStorage.setItem("yy_imb", item.id);
      });
      host.appendChild(btn);
    });

    $("#imbalanceTable").innerHTML = imbalances.map(x => {
      const a = x[LANG];
      return `<tr><td><b>${a.name}</b></td><td>${a.mech}</td><td>${a.pit}</td></tr>`;
    }).join("");

    const saved = localStorage.getItem("yy_imb") || "yinExcess";
    const idx = Math.max(0, imbalances.findIndex(x => x.id===saved));
    const btn = $$("#imbalanceChips .chip")[idx] || $$("#imbalanceChips .chip")[0];
    if (btn) btn.click();
  }

  function renderImbalancePanel(id){
    const item = imbalances.find(x => x.id === id) || imbalances[0];
    const a = item[LANG];
    $("#imbalancePanel").innerHTML = `
      <h3>${a.name}</h3>
      <div class="muted">${a.mech}</div>
      <div class="divider"></div>
      <b>${LANG==="zh"?"要点":"Key points"}：</b>
      <ul>${a.points.map(p => `<li>${p}</li>`).join("")}</ul>
      <div class="divider"></div>
      <b>${LANG==="zh"?"最容易误判":"Most common pitfall"}：</b>
      <div class="muted">${a.pit}</div>
    `;
  }

  let simTimer = null;
  let simVal = 50;
  let simDir = 1;

  function simStateText(v){
    const st = computeState(v);
    $("#simState").textContent = st.label;
    if (st.tag === "balanced") $("#simText").textContent = (LANG==="zh")
      ? "当前处于相对平衡区间：允许波动，但避免无限偏离。"
      : "Within a relative balance band: fluctuations are ok, but not unlimited drift.";
    else if (st.tag === "yang" || st.tag === "extremeYang") $("#simText").textContent = (LANG==="zh")
      ? "阳偏高：推动更强，消耗与外越倾向上升；接近阈值将提示反转。"
      : "Higher Yang: drive increases; near threshold it may flip.";
    else $("#simText").textContent = (LANG==="zh")
      ? "阴偏高：收敛更强，凝滞与抑制倾向上升；接近阈值将提示反转。"
      : "Higher Yin: consolidation/constraint rises; near threshold it may flip.";
  }

  function renderSim(){
    $("#meterBar").style.width = `${simVal}%`;
    simStateText(simVal);
  }

  function simTick(){
    const mode = $("#simStart").value;
    const th = Number($("#simTh").value);
    $("#simThVal").textContent = String(th);
    $("#meterTh").style.left = `${th}%`;

    if (mode === "swing"){
      simVal += simDir * 1.2;
      if (simVal >= 78) simDir = -1;
      if (simVal <= 22) simDir = 1;
    } else if (mode === "yangUp"){
      simVal += 1.1;
    } else {
      simVal -= 1.1;
    }

    if (simVal >= 100) simVal = 100;
    if (simVal <= 0) simVal = 0;

    if (mode === "yangUp" && simVal >= th){
      $("#simState").textContent = t("extremeYang");
      simDir = -1;
      simVal -= 6;
    }
    if (mode === "yinUp" && simVal <= (100-th)){
      $("#simState").textContent = t("extremeYin");
      simDir = 1;
      simVal += 6;
    }

    renderSim();
  }

  $("#btnSim").addEventListener("click", () => {
    if (simTimer){ clearInterval(simTimer); simTimer = null; }
    else { simTimer = setInterval(simTick, 120); }
  });
  $("#btnReset").addEventListener("click", () => { simVal = 50; simDir = 1; renderSim(); });
  $("#simTh").addEventListener("input", () => {
    $("#simThVal").textContent = $("#simTh").value;
    $("#meterTh").style.left = `${$("#simTh").value}%`;
  });
  renderSim();

  const illusionIndex = [
    {
      zh:{title:"真寒假热", body:"本质偏寒（阴偏盛/阳偏虚），但出现表面“热象”（如面红、烦躁等）。理解：外越/上浮并不等于真热。"},
      en:{title:"True cold, false heat", body:"Root is cold, yet shows superficial ‘heat’ signs. Outward signs ≠ true heat."}
    },
    {
      zh:{title:"真热假寒", body:"本质偏热（阳偏盛/阴偏虚），但出现表面“寒象”（如四肢冷等）。理解：末梢表现可能与本质不一致。"},
      en:{title:"True heat, false cold", body:"Root is heat, but shows superficial ‘cold’ signs. Peripheral signs can mislead."}
    },
    {
      zh:{title:"真虚假实", body:"本质是虚（阴/阳不足），但表面像实（局部壅滞、上冲等）。理解：‘堵’也可能来自推动不足或承载不足。"},
      en:{title:"True deficiency, false excess", body:"Root deficient but looks excessive. ‘Blockage’ can arise from weak drive or low carriers."}
    },
    {
      zh:{title:"真实假虚", body:"本质是实（邪盛/过度亢动），但表面像虚（短暂乏力等）。理解：被消耗/被压制后出现的假象。"},
      en:{title:"True excess, false deficiency", body:"Root excessive but looks deficient temporarily due to consumption/suppression."}
    }
  ];

  const cases = [
    {
      level:"easy",
      zh:{stem:"整体偏冷、动作迟缓，但偶尔短暂面红与烦躁。", opts:["阴盛（真寒）","阳盛（真热）","真寒假热","真热假寒"], ans:2,
          explain:"主轴偏冷；短暂面红烦躁可为表象外越。模型上贴近“真寒假热”。"},
      en:{stem:"Overall cold and sluggish, yet occasional flushing and restlessness.", opts:["Yin excess","Yang excess","True cold, false heat","True heat, false cold"], ans:2,
          explain:"Cold is the main axis; brief flushing can be superficial outward signs. Fits ‘true cold, false heat’."}
    },
    {
      level:"mid",
      zh:{stem:"表面像热：口干、烦躁、睡不好；但整体像物质不足。", opts:["阳盛","阴虚","真热假寒","阴盛"], ans:1,
          explain:"表面热象但根在不足：阴不足不能制阳 → 阴虚更贴近。"},
      en:{stem:"Looks hot: thirst, restlessness, poor sleep; but seems low carriers overall.", opts:["Yang excess","Yin deficiency","True heat, false cold","Yin excess"], ans:1,
          explain:"Heat-like appearance from low Yin failing to restrain. Yin deficiency fits."}
    },
    {
      level:"hard",
      zh:{stem:"局部像实：胀、堵；但整体推动力不足，越急越卡。", opts:["真虚假实","真实假虚","阳盛","阴盛"], ans:0,
          explain:"局部像实，但根在不足（推动弱）。学习上归入“真虚假实”。"},
      en:{stem:"Local distention/blockage, yet overall drive is weak; pushing makes it worse.", opts:["True deficiency, false excess","True excess, false deficiency","Yang excess","Yin excess"], ans:0,
          explain:"Looks excessive locally but rooted in weak drive. True deficiency, false excess."}
    },
    {
      level:"mid",
      zh:{stem:"整体偏热、消耗大；但四肢末端反而发冷。", opts:["真热假寒","真寒假热","阳虚","阴盛"], ans:0,
          explain:"主轴偏热消耗，末端冷可能是分布/末梢表现造成的假象：更贴近“真热假寒”。"},
      en:{stem:"Overall hot/consuming, yet extremities feel cold.", opts:["True heat, false cold","True cold, false heat","Yang deficiency","Yin excess"], ans:0,
          explain:"Main axis is heat/consumption; cold extremities can mislead. True heat, false cold."}
    }
  ];

  function renderIllusionsIndex(){
    const host = $("#illusAccordion");
    host.innerHTML = "";
    illusionIndex.forEach(item => {
      const a = item[LANG];
      const div = document.createElement("div");
      div.className = "acc";
      div.innerHTML = `
        <button type="button"><span>${a.title}</span><span class="chev">▾</span></button>
        <div class="body">${a.body}</div>
      `;
      $("button", div).addEventListener("click", () => div.classList.toggle("open"));
      host.appendChild(div);
    });
  }

  function pickCase(){
    const lvl = $("#caseLevel").value;
    let pool = cases;
    if (lvl === "easy") pool = cases.filter(c => c.level === "easy");
    if (lvl === "mid") pool = cases.filter(c => c.level !== "easy");
    if (lvl === "hard") pool = cases.filter(c => c.level !== "easy");
    if (pool.length === 0) pool = cases;
    return pool[Math.floor(Math.random()*pool.length)];
  }

  let currentCase = null;
  function renderCase(){
    currentCase = pickCase();
    const c = currentCase[LANG];
    $("#caseBox").innerHTML = `<b>${LANG==="zh"?"题目":"Case"}：</b> ${c.stem}`;
    const optsHost = $("#caseOptions");
    optsHost.innerHTML = "";
    $("#caseResult").innerHTML = "";
    $("#caseResult").className = "result";
    c.opts.forEach((txt, idx) => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.textContent = txt;
      btn.addEventListener("click", () => {
        const ok = idx === c.ans;
        $("#caseResult").className = "result " + (ok ? "good" : "bad");
        $("#caseResult").innerHTML = (ok ? `<b>${LANG==="zh"?"正确":"Correct"}。</b> ` : `<b>${LANG==="zh"?"不对":"Not quite"}。</b> `) + c.explain;
      });
      optsHost.appendChild(btn);
    });
  }
  $("#btnNewCase").addEventListener("click", renderCase);
  $("#caseLevel").addEventListener("change", renderCase);

  const glossary = [
    {k:"阴阳对待", zh:"阴阳相对、相反而相成：彼此制约但不分离。", en:"Opposition yet co-existence: restrain each other but form a whole."},
    {k:"互根互用", zh:"阴为阳之基、阳为阴之用；缺一则另一失去意义。", en:"Yin is the basis of Yang; Yang is the function of Yin."},
    {k:"消长", zh:"此消彼长，比例随时间与条件变化，系统以动态求稳。", en:"Waxing/waning: proportions change over time as the system self-adjusts."},
    {k:"转化", zh:"在一定条件下阴阳可以相互转化；极端处更易发生反转。", en:"Under conditions, Yin and Yang transform; extremes tend to flip."},
    {k:"阴盛", zh:"阴偏多，抑制阳；偏寒、收敛、凝滞倾向（模型层面）。", en:"Too much Yin suppresses Yang; cold/constraint tendency (as a model)."},
    {k:"阳盛", zh:"阳偏多，消耗阴；偏热、外越、躁动倾向（模型层面）。", en:"Too much Yang consumes Yin; heat/overactivity tendency (as a model)."},
    {k:"阴虚", zh:"阴偏少，不能制阳；常出现“虚热”解释框架。", en:"Too little Yin fails to restrain Yang; often framed as ‘empty heat’."},
    {k:"阳虚", zh:"阳偏少，温化推动不足；常出现“虚寒”解释框架。", en:"Too little Yang fails to warm/drive; often framed as ‘empty cold’."},
    {k:"真寒假热", zh:"本质寒，但表面现热象；需分层辨本质。", en:"Root cold with superficial heat-like signs; use layered analysis."},
    {k:"真热假寒", zh:"本质热，但表面现寒象；末梢/分布可能误导。", en:"Root heat with superficial cold-like signs; peripheral signs can mislead."},
    {k:"真虚假实", zh:"根在不足，但表面像实（局部壅滞等）。", en:"Root deficient but looks excessive (e.g., local blockage)."},
    {k:"真实假虚", zh:"根在过盛，但表面像虚（被消耗/被压制后的假象）。", en:"Root excessive but looks deficient temporarily due to consumption/suppression."},
    {k:"表里", zh:"外/内的分层：表多偏阳，里多偏阴（相对）。", en:"Exterior/interior layering; exterior tends to Yang, interior tends to Yin (relative)."},
    {k:"动静", zh:"动偏阳，静偏阴（相对，随参照变化）。", en:"Movement tends to Yang; stillness tends to Yin (relative)."},
    {k:"物质/功能", zh:"物质承载偏阴；功能推动偏阳（相对）。", en:"Substance as carrier tends to Yin; function/drive tends to Yang (relative)."}
  ];

  function renderGlossary(){
    const q = ($("#q").value || "").trim().toLowerCase();
    const items = glossary.filter(it => {
      if (!q) return true;
      return it.k.toLowerCase().includes(q) || it.zh.toLowerCase().includes(q) || it.en.toLowerCase().includes(q);
    });
    $("#glossaryList").innerHTML = items.map(it => `
      <div class="item">
        <div class="k">${it.k}</div>
        <div class="d">${LANG==="zh" ? it.zh : it.en}</div>
        <div class="en">${LANG==="zh" ? it.en : it.zh}</div>
      </div>
    `).join("") || `<div class="muted">${LANG==="zh" ? "无匹配结果。" : "No matches."}</div>`;
  }
  $("#q").addEventListener("input", renderGlossary);
  $("#btnClear").addEventListener("click", () => { $("#q").value=""; renderGlossary(); });

  const bridgeText = {
    balanced: {
      zh: ["相对平衡：五行层面更强调“制化有度”。", "学习提示：先看整体动态，再看关系网中的偏移。"],
      en: ["Relatively balanced: in Wuxing terms, regulation stays within bounds.", "Tip: observe dynamics first, then network shifts."]
    },
    yangExcess: {
      zh: ["阳盛：亢动外越、消耗承载。", "联动提示：容易放大“推动/升发”倾向，继而牵动制约链。"],
      en: ["Yang excess: over-drive and consumption.", "Bridge: amplifies driving/rising tendencies across the network."]
    },
    yinExcess: {
      zh: ["阴盛：收敛抑制占优。", "联动提示：像“制约”过强导致推动不足与停滞。"],
      en: ["Yin excess: consolidation/constraint dominates.", "Bridge: over-constraint reduces drive and increases stagnation."]
    },
    yangDef: {
      zh: ["阳虚：功能推动不足（模型层面）。", "联动提示：从“动力不足的连锁”去理解，而不是一概当成‘阴多’。"],
      en: ["Yang deficiency: low functional drive (model).", "Bridge: interpret as a drive-shortage cascade, not simply ‘more Yin’."]
    },
    yinDef: {
      zh: ["阴虚：承载不足，不能制阳（模型层面）。", "联动提示：看似亢，可能是缺乏制衡导致的相对显露。"],
      en: ["Yin deficiency: low carriers fail to restrain (model).", "Bridge: apparent hyper-ness may be relative due to missing restraint."]
    }
  };

  function renderBridge(){
    const st = $("#bridgeState").value;
    const arr = bridgeText[st][LANG];
    $("#bridgeBox").innerHTML = `<ul class="list"><li>${arr[0]}</li><li>${arr[1]}</li></ul>`;
    localStorage.setItem("yy_bridge", st);
  }
  $("#btnBridgeExplain").addEventListener("click", renderBridge);
  const savedBridge = localStorage.getItem("yy_bridge");
  if (savedBridge && $("#bridgeState")) $("#bridgeState").value = savedBridge;
  $("#bridgeState").addEventListener("change", renderBridge);

  $("#btnExport").addEventListener("click", () => {
    const state = {
      lang: LANG,
      view: localStorage.getItem("yy_view") || "core",
      ratio: Number(localStorage.getItem("yy_ratio") || 50),
      lastImbalance: localStorage.getItem("yy_imb") || "yinExcess",
      layerDim: $("#layerDim")?.value || "surface",
      layerObj: $("#layerObj")?.value || "bodyState",
      bridge: $("#bridgeState")?.value || "balanced",
      ts: new Date().toISOString()
    };
    $("#exportOut").textContent = `${t("exportOk")}\n\n` + JSON.stringify(state, null, 2);
  });

  applyLangUI();
  renderLayers();
  renderImbalance();
  renderIllusionsIndex();
  renderCase();
  renderGlossary();
  renderBridge();

})();