/* =========================================================
   ISWARYA DODDIPATLA — PORTFOLIO JS
   Every feature below is isolated inside its own try/catch
   so a failure in one section (missing element, blocked
   network request, etc.) can never prevent the rest of the
   page from rendering and working.
   ========================================================= */

(() => {
"use strict";

function safe(name, fn){
  try{ fn(); }
  catch(err){ console.error(`[portfolio] "${name}" failed to initialize:`, err); }
}

/* ---------- CUSTOM ILLUSTRATION ICONS (not in lucide's standard set) ---------- */
const ICONS = {
  'user-illustration': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a7 7 0 0 1 14 0v1"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>',
  'about-illustration': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="18" height="14" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/><path d="M7 21h10"/></svg>'
};

function applyIcons(){
  document.querySelectorAll("[data-icon]").forEach(el => {
    const name = el.getAttribute("data-icon");
    const svg = ICONS[name];
    if(!svg) return;
    const encoded = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
    el.style.webkitMaskImage = `url("${encoded}")`;
    el.style.maskImage = `url("${encoded}")`;
    el.style.webkitMaskRepeat = "no-repeat";
    el.style.maskRepeat = "no-repeat";
    el.style.webkitMaskSize = "contain";
    el.style.maskSize = "contain";
    el.style.webkitMaskPosition = "center";
    el.style.maskPosition = "center";
  });
}

/* ---------- LUCIDE ICON RENDERING (with inline SVG fallback if CDN is blocked) ---------- */
const FALLBACK_ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91.5S17.73.15 15 2a13.38 13.38 0 0 0-7 0C5.27.15 4.09.5 4.09.5A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22"/><path d="M9 19c-5 1.5-5-2.5-7-3"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  'code-2': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>',
  cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>',
  'graduation-cap': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.66 3 3 6 3s6-1.34 6-3v-5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3a2 2 0 0 1-2 4M7 5H4a2 2 0 0 0 2 4"/></svg>',
  'badge-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M9 13.5 7 21l5-3 5 3-2-7.5"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17a2.5 2.5 0 0 0 2.5-2.5c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7.5 7.5 0 1 1-15 0c0-1.153.433-2.294 1-3 1.072-1.143 2.5-2 2.5-2Z"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M9 13.5 7 21l5-3 5 3-2-7.5"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><path d="M12 15V3"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>',
  'arrow-up': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.5A2.5 2.5 0 0 1 4 17.5v-2A2.5 2.5 0 0 1 2.5 13 2.5 2.5 0 0 1 4 8.5 2.5 2.5 0 0 1 5.5 4 2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.5A2.5 2.5 0 0 0 20 17.5v-2a2.5 2.5 0 0 0 1.5-4.5A2.5 2.5 0 0 0 20 8.5 2.5 2.5 0 0 0 18.5 4 2.5 2.5 0 0 0 14.5 2Z"/></svg>',
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 1 0-5.66 5.66l-5.66 5.66a2 2 0 1 0 2.83 2.83l5.66-5.66a4 4 0 0 0 5.66-5.66l-2.12 2.12-2.83-2.83Z"/></svg>',
  'book-open': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z"/></svg>',
  'external-link': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'
};

function renderFallbackIcon(el){
  const name = el.getAttribute("data-lucide");
  const svg = FALLBACK_ICONS[name];
  if(!svg) return;
  el.innerHTML = svg;
  el.querySelector("svg").style.width = "100%";
  el.querySelector("svg").style.height = "100%";
}

function initLucideIcons(){
  if(window.lucide && typeof window.lucide.createIcons === "function"){
    try{ window.lucide.createIcons(); return; } catch(e){ /* fall through to inline fallback */ }
  }
  // CDN unavailable or failed — render inline fallback SVGs so icons are never blank.
  document.querySelectorAll("[data-lucide]").forEach(el => {
    if(el.querySelector("svg")) return; // lucide already rendered this one
    renderFallbackIcon(el);
  });
}

/* ============================================================
   SECTION INITIALIZERS — each wrapped in safe() so a failure
   in one never blocks any other section of the page.
   ============================================================ */

safe("custom-illustration-icons", applyIcons);

safe("lucide-icons-initial", () => {
  initLucideIcons();
  window.addEventListener("load", initLucideIcons);
  // Retry once shortly after load in case the CDN script was still parsing.
  setTimeout(initLucideIcons, 1200);
});

safe("loader", () => {
  const loader = document.getElementById("loader");
  if(!loader) return;
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 500);
  });
  // Safety net: never let the loader get stuck on screen.
  setTimeout(() => loader.classList.add("hidden"), 4000);
});

safe("theme-toggle", () => {
  const themeToggle = document.getElementById("themeToggle");
  if(!themeToggle) return;
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  if(savedTheme === "light") root.setAttribute("data-theme", "light");
  themeToggle.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    if(isLight){ root.removeAttribute("data-theme"); localStorage.setItem("portfolio-theme","dark"); }
    else { root.setAttribute("data-theme","light"); localStorage.setItem("portfolio-theme","light"); }
  });
});

safe("navbar", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const scrollProgress = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("backToTop");
  if(!navbar) return;
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 30);
    if(y > lastScroll && y > 200){ navbar.classList.add("hide-nav"); }
    else { navbar.classList.remove("hide-nav"); }
    lastScroll = y;

    if(scrollProgress){
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = (docH > 0 ? (y / docH * 100) : 0) + "%";
    }
    if(backToTop) backToTop.classList.toggle("show", y > 600);
  }, { passive: true });

  if(navToggle){
    navToggle.addEventListener("click", () => {
      navbar.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", String(navbar.classList.contains("menu-open")));
    });
  }
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("menu-open");
      if(navToggle) navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if(sections.length && navLinks.length){
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          navLinks.forEach(l => l.classList.toggle("active", l.dataset.section === entry.target.id));
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach(s => navObserver.observe(s));
  }

  if(backToTop){
    backToTop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
  }
});

safe("cursor-glow", () => {
  const cursorGlow = document.getElementById("cursor-glow");
  if(!cursorGlow) return;
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  }, { passive: true });
});

safe("particles", () => {
  const particlesEl = document.getElementById("particles");
  if(!particlesEl) return;
  const PARTICLE_COUNT = window.innerWidth < 768 ? 18 : 36;
  const frag = document.createDocumentFragment();
  for(let i=0; i<PARTICLE_COUNT; i++){
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random()*100 + "%";
    p.style.bottom = "-10px";
    const size = (Math.random()*2 + 1.5).toFixed(1);
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.animationDuration = (Math.random()*14 + 10) + "s";
    p.style.animationDelay = (Math.random()*14) + "s";
    p.style.opacity = (Math.random()*0.4 + 0.3).toFixed(2);
    frag.appendChild(p);
  }
  particlesEl.appendChild(frag);
});

safe("typing-animation", () => {
  const roles = ["AI Engineer","Software Developer","LLM Developer","RAG Engineer","Full Stack Developer","Open Source Contributor"];
  const typedEl = document.getElementById("typedRole");
  if(!typedEl) return;
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typeLoop(){
    const current = roles[roleIdx];
    if(!deleting){
      charIdx++;
      typedEl.textContent = current.slice(0, charIdx);
      if(charIdx === current.length){
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIdx--;
      typedEl.textContent = current.slice(0, charIdx);
      if(charIdx === 0){
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 75);
  }
  typeLoop();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveal(el){
  if(el) revealObserver.observe(el);
}

safe("reveal-on-scroll", () => {
  document.querySelectorAll(".reveal").forEach(observeReveal);
});

safe("animated-counters", () => {
  function animateCounter(el){
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const isDecimal = el.dataset.decimal === "true";
    const duration = 1600;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (isDecimal ? value.toFixed(2) : Math.round(value)) + suffix;
      if(progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-number, .lc-number").forEach(el => counterObserver.observe(el));
});

/* ---------- SKILLS ---------- */
safe("skills-section", () => {
  const skillsGrid = document.getElementById("skillsGrid");
  if(!skillsGrid) return;

  const SKILLS = [
    { icon:"terminal", title:"Programming", items:[
      {name:"Java", level:88},{name:"Python", level:92},{name:"C", level:80}
    ]},
    { icon:"layers", title:"Frontend", items:[
      {name:"HTML", level:90},{name:"CSS", level:86},{name:"JavaScript", level:84}
    ]},
    { icon:"server", title:"Backend", items:[
      {name:"Flask", level:85}
    ]},
    { icon:"brain", title:"AI / LLM", items:[
      {name:"LangChain", level:88},{name:"LLMs", level:87},{name:"Prompt Engineering", level:90},
      {name:"FAISS / Semantic Search", level:82},{name:"RAG", level:90},{name:"Machine Learning", level:85}
    ]},
    { icon:"database", title:"Databases", items:[
      {name:"MySQL", level:84}
    ]},
    { icon:"wrench", title:"Developer Tools", items:[
      {name:"Git", level:88},{name:"GitHub", level:90},{name:"VS Code", level:92},{name:"Postman", level:80}
    ]},
    { icon:"book-open", title:"Core Subjects", items:[
      {name:"DSA", level:90},{name:"DBMS", level:85},{name:"OOP", level:87},
      {name:"Operating Systems", level:80},{name:"Problem Solving", level:92}
    ]}
  ];

  SKILLS.forEach(cat => {
    const card = document.createElement("div");
    card.className = "skill-category reveal";
    card.innerHTML = `
      <div class="skill-cat-head">
        <span data-lucide="${cat.icon}"></span>
        <h3>${cat.title}</h3>
      </div>
      ${cat.items.map(s => `
        <div class="skill-row">
          <div class="skill-row-top"><span>${s.name}</span><span>${s.level}%</span></div>
          <div class="skill-bar"><div class="skill-bar-fill" data-level="${s.level}"></div></div>
        </div>`).join("")}
    `;
    skillsGrid.appendChild(card);
  });
  initLucideIcons();

  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.querySelectorAll(".skill-bar-fill").forEach(bar => {
          bar.style.width = bar.dataset.level + "%";
        });
        skillBarObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll(".skill-category").forEach(el => {
    observeReveal(el);
    skillBarObserver.observe(el);
  });
});

/* ---------- PROJECTS ---------- */
safe("projects-section", () => {
  const projectsGrid = document.getElementById("projectsGrid");
  if(!projectsGrid) return;

  const PROJECTS = [
    {
      title:"Placement Intelligence AI Assistant",
      desc:"An AI-powered placement assistant using RAG, enabling semantic search across 500+ placement documents with sub-second retrieval latency, dynamic MySQL querying and real-time web search for multi-source answers.",
      tags:["Python","LangChain","FAISS","Flask","MySQL","Prompt Engineering"],
      icon:"brain", image:"assets/projects/project1.png",
      github:"https://github.com/Iswarya952/placement-intelligence-rag",
      demo:null
    },
    {
      title:"Advanced RAG Chatbot",
      desc:"A document question-answering chatbot with advanced RAG pipelines achieving high-accuracy semantic retrieval via FAISS, multi-tool orchestration through LangChain tool-calling and a production-ready streaming Flask interface.",
      tags:["Python","LangChain","FAISS","Flask"],
      icon:"cpu", image:"assets/projects/project2.png",
      github:"https://github.com/Iswarya952/advanced-rag-chatbot",
      demo:null
    },
    {
      title:"UPI Fraud Detection System",
      desc:"A classification model trained to detect fraudulent UPI transactions with optimized precision-recall balance, evaluated using F1-score and ROC-AUC, deployed as a real-time fraud prediction Flask web app.",
      tags:["Python","Scikit-learn","Flask","Machine Learning"],
      icon:"server", image:"assets/projects/project3.png",
      github:"https://github.com/Iswarya952",
      demo:null
    },
    {
      title:"Smart Attendance Management System",
      desc:"An automated face-recognition attendance system built with OpenCV, eliminating manual roll-call and achieving high accuracy with persistent backend database storage for audit-ready records.",
      tags:["Python","OpenCV","Flask"],
      icon:"layers", image:"assets/projects/project4.png",
      github:"https://github.com/Iswarya952",
      demo:null
    }
  ];

  PROJECTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card reveal";
    card.innerHTML = `
      <div class="project-image">
        <img src="${p.image}" alt="${p.title} preview" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <span data-lucide="${p.icon}" style="display:none;"></span>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="project-actions">
          <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" aria-label="View ${p.title} on GitHub"><span data-lucide="github" style="width:14px;height:14px;display:inline-block;margin-right:4px;"></span>GitHub</a>
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" aria-label="View live demo of ${p.title}"><span data-lucide="external-link" style="width:14px;height:14px;display:inline-block;margin-right:4px;"></span>Live Demo</a>` : ""}
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
    observeReveal(card);
  });
  initLucideIcons();

  /* Tilt effect on project cards */
  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".project-card").forEach(card => {
      const rect = card.getBoundingClientRect();
      if(e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -8;
      const ry = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
  }, { passive: true });
  document.addEventListener("mouseleave", () => {
    document.querySelectorAll(".project-card").forEach(card => { card.style.transform = ""; });
  });
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
});

/* ---------- ACHIEVEMENTS ---------- */
safe("achievements-section", () => {
  const achievementsGrid = document.getElementById("achievementsGrid");
  if(!achievementsGrid) return;

  const ACHIEVEMENTS = [
    { icon:"trophy", title:"Top 1500 — Global BigCode Challenge 2026", desc:"Ranked in the top 1500 globally in the BigCode Challenge 2026." },
    { icon:"github", title:"6 Open Source PRs — Hacktoberfest 2025", desc:"Contributed 6 merged pull requests to open source repositories during Hacktoberfest 2025." },
    { icon:"code", title:"200+ Coding Problems Solved", desc:"Solved 200+ coding problems across LeetCode and other competitive programming platforms." },
    { icon:"badge-check", title:"LeetCode 200+ Days Badge", desc:"Earned the LeetCode 200+ Days Coding Challenge Badge for consistent daily practice." },
    { icon:"award", title:"Hackathon Team Lead", desc:"Led cross-functional teams through the Adobe Hackathon, HP Hackathon and Smart India Hackathon — from ideation to final delivery." }
  ];

  ACHIEVEMENTS.forEach(a => {
    const card = document.createElement("div");
    card.className = "achievement-card reveal";
    card.innerHTML = `
      <div class="achievement-icon"><span data-lucide="${a.icon}"></span></div>
      <div><h3>${a.title}</h3><p>${a.desc}</p></div>
    `;
    achievementsGrid.appendChild(card);
    observeReveal(card);
  });
  initLucideIcons();
});

/* ---------- CERTIFICATIONS / RECOGNITIONS ---------- */
safe("certifications-section", () => {
  const certGrid = document.getElementById("certGrid");
  if(!certGrid) return;

  const CERTS = [
    { title:"BigCode Challenge 2026", issuer:"Top 1500 Global Rank", icon:"trophy" },
    { title:"Hacktoberfest 2025", issuer:"Open Source Contributor", icon:"github" },
    { title:"LeetCode 200+ Days Badge", issuer:"Consistency Recognition", icon:"badge-check" },
    { title:"Smart India Hackathon", issuer:"Team Lead", icon:"award" }
  ];

  CERTS.forEach(c => {
    const card = document.createElement("div");
    card.className = "cert-card reveal";
    card.innerHTML = `
      <div class="cert-icon"><span data-lucide="${c.icon}"></span></div>
      <h3>${c.title}</h3>
      <p>${c.issuer}</p>
      <div class="cert-actions">
        <a href="assets/Iswarya_Doddipatla_Resume.pdf" target="_blank" rel="noopener" class="btn btn-secondary btn-sm"><span data-lucide="eye" style="width:14px;height:14px;display:inline-block;margin-right:4px;"></span>Preview</a>
        <a href="assets/Iswarya_Doddipatla_Resume.pdf" download class="btn btn-primary btn-sm"><span data-lucide="download" style="width:14px;height:14px;display:inline-block;margin-right:4px;"></span>Download</a>
      </div>
    `;
    certGrid.appendChild(card);
    observeReveal(card);
  });
  initLucideIcons();
});

/* ---------- HEATMAP (LeetCode-style) ---------- */
safe("leetcode-heatmap", () => {
  const heatmap = document.getElementById("heatmap");
  if(!heatmap) return;
  const frag = document.createDocumentFragment();
  for(let i=0; i<182; i++){
    const cell = document.createElement("div");
    cell.className = "heat-cell";
    const intensity = Math.random();
    if(intensity > 0.85) cell.style.background = "var(--violet)";
    else if(intensity > 0.65) cell.style.background = "var(--violet-light)";
    else if(intensity > 0.4) cell.style.background = "rgba(139,92,246,0.35)";
    frag.appendChild(cell);
  }
  heatmap.appendChild(frag);
});

/* ---------- GITHUB API ---------- */
safe("github-section", () => {
  const GH_USER = "Iswarya952";

  fetch(`https://api.github.com/users/${GH_USER}`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(data => {
      const avatar = document.getElementById("ghAvatar");
      const name = document.getElementById("ghName");
      const bio = document.getElementById("ghBio");
      const followers = document.getElementById("ghFollowers");
      const following = document.getElementById("ghFollowing");
      const repos = document.getElementById("ghRepos");
      if(avatar) avatar.src = data.avatar_url;
      if(name) name.textContent = data.name || "Iswarya Doddipatla";
      if(bio) bio.textContent = data.bio || "AI Engineer & Software Developer building intelligent systems.";
      if(followers) followers.textContent = data.followers ?? "–";
      if(following) following.textContent = data.following ?? "–";
      if(repos) repos.textContent = data.public_repos ?? "–";
    })
    .catch(() => {
      const bio = document.getElementById("ghBio");
      if(bio) bio.textContent = "AI Engineer & Software Developer building intelligent systems.";
    });

  fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=6`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(repos => {
      const container = document.getElementById("ghPinned");
      if(!container) return;
      if(!Array.isArray(repos) || repos.length === 0){
        container.innerHTML = `<p class="gh-loading">No public repositories found yet.</p>`;
        return;
      }
      container.innerHTML = repos.map(r => `
        <div class="gh-repo-card">
          <h4>${r.name}</h4>
          <p>${r.description ? r.description : "No description provided."}</p>
          <div class="gh-repo-meta">
            <span><span class="gh-dot"></span>${r.language || "—"}</span>
            <span>★ ${r.stargazers_count}</span>
            <span>⑂ ${r.forks_count}</span>
          </div>
        </div>
      `).join("");
    })
    .catch(() => {
      const container = document.getElementById("ghPinned");
      if(container) container.innerHTML = `<p class="gh-loading">GitHub data is temporarily unavailable. Visit the profile link above.</p>`;
    });
});

/* ---------- CONTACT FORM ---------- */
safe("contact-form", () => {
  const contactForm = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  if(!contactForm || !toast) return;
  let toastTimer;

  function showToast(msg, type="success"){
    toast.textContent = msg;
    toast.className = `toast show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.classList.remove("show"); }, 3200);
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

    if(!name || !email || !message){
      showToast("Please fill in all fields.", "error");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
      showToast("Please enter a valid email address.", "error");
      return;
    }

    showToast(`Thanks, ${name}! Your message has been sent.`, "success");
    contactForm.reset();
  });
});

/* ---------- IN-PAGE ANCHOR SMOOTH SCROLL ---------- */
safe("smooth-scroll-anchors", () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if(id.length > 1){
        const target = document.querySelector(id);
        if(target){
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
});

})();
