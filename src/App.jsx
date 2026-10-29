import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, Lightbulb, ArrowLeft } from "lucide-react";
import Office, { HOTSPOTS } from "./Office";
import { PANELS, PAGE_ORDER } from "./Panels";
import { profile } from "./data";

const STORE_KEY = "sg-office-found";
const QUICK = [
  ["about", "About"],
  ["projects", "Work"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["resume", "Résumé"],
  ["contact", "Contact"],
];

function timeOfDay(h) {
  if (h >= 5 && h < 12) return "Morning";
  if (h >= 12 && h < 17) return "Afternoon";
  if (h >= 17 && h < 20) return "Evening";
  return "Night";
}

function loadFound() {
  try { return new Set(JSON.parse(localStorage.getItem(STORE_KEY) || "[]")); } catch { return new Set(); }
}

export default function App() {
  const hour = new Date().getHours();
  const [found, setFound] = useState(loadFound);
  const [open, setOpen] = useState(null);
  const [night, setNight] = useState(hour >= 19 || hour < 6);
  const [cool, setCool] = useState(false);
  const [plant, setPlant] = useState(0);
  const [hints, setHints] = useState(false);
  const [menu, setMenu] = useState(false);
  const [page, setPage] = useState(false);
  const [hover, setHover] = useState(null);
  const [toast, setToast] = useState(null);
  const wrapRef = useRef(null);
  const toastTimer = useRef(null);

  const say = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify([...found])); } catch { /* storage unavailable */ }
  }, [found]);

  // Center the scene on phones, where it scrolls sideways.
  useEffect(() => {
    const el = wrapRef.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, [page]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(null); setMenu(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const onOpen = useCallback((id) => {
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      if (next.size === HOTSPOTS.length) setTimeout(() => say("You found everything in the office. Thanks for exploring!"), 400);
      return next;
    });
    if (id === "lamp") {
      setNight((n) => { say(n ? "Lights up. Good morning!" : "Lamp on. Late-night coding mode."); return !n; });
    } else if (id === "shades") {
      setCool((c) => { say(c ? "Shades off." : "Look at the photo. Deal with it."); return !c; });
    } else if (id === "plant") {
      setPlant((p) => { say(p === 3 ? "Trimmed back. It'll grow again." : "Watered. Look, it's growing."); return (p + 1) % 4; });
    } else if (id === "hello") {
      console.log("%chello, world 👋", "font-size:20px;font-weight:bold;color:#0f8a63");
      console.log(`Since you're in the console: I'm ${profile.name}, a Node.js engineer. Let's talk: ${profile.email}`);
      say("Open your browser console. There's a message for you.");
    } else {
      setOpen(id);
    }
  }, [say]);

  const go = (id) => { setMenu(false); setPage(false); onOpen(id); };
  const Panel = open ? PANELS[open] : null;
  const count = found.size;

  if (page) {
    return (
      <div className="page-view">
        <div className="page-bar">
          <button className="bar-btn" onClick={() => setPage(false)}><ArrowLeft size={16} /> Back to the office</button>
          <span className="name">{profile.name}</span>
        </div>
        <main className="page-main">
          {PAGE_ORDER.map((id) => {
            const P = PANELS[id];
            return <section key={id} className="page-sec"><P go={(x) => { setPage(false); onOpen(x); }} /></section>;
          })}
        </main>
      </div>
    );
  }

  return (
    <div className={night ? "app night" : "app"}>
      <header className="bar">
        <div className="who">
          <span className="name">{profile.name}</span>
          <span className="role">{profile.role}</span>
        </div>
        <div className="bar-right">
          <span className="found-count" aria-live="polite"><strong>{count}</strong>/{HOTSPOTS.length} found</span>
          <span className="tod">{night ? "Night" : timeOfDay(hour) === "Night" ? "Evening" : timeOfDay(hour)}</span>
          <button className={hints ? "bar-btn on" : "bar-btn"} onClick={() => setHints((v) => !v)} aria-pressed={hints}>
            <Lightbulb size={16} /> <span className="hide-sm">Hints</span>
          </button>
          <button className="bar-btn" onClick={() => setMenu((v) => !v)} aria-expanded={menu}>
            {menu ? <X size={16} /> : <Menu size={16} />} Menu
          </button>
        </div>
        {menu && (
          <nav className="menu" aria-label="Quick links">
            <p className="eyebrow">Quick links</p>
            {QUICK.map(([id, label]) => (
              <button key={id} onClick={() => go(id)}>{label}</button>
            ))}
            <hr />
            <button onClick={() => { setMenu(false); setPage(true); }}>Read it as a simple page</button>
            <button onClick={() => { setFound(new Set()); setMenu(false); say("Discoveries reset. Explore again!"); }}>Reset discoveries</button>
          </nav>
        )}
      </header>

      <div className="intro-sm">
        <h1>Welcome to my office</h1>
        <p>Tap around to see what you find, or use the menu for a quicker way through.</p>
      </div>

      <div className="scene" ref={wrapRef}>
        <div className="stage">
          <Office found={found} onOpen={onOpen} onHover={setHover} night={night} cool={cool} plantLevel={plant} hints={hints} />
          <div className="intro">
            <h1>Welcome to my office</h1>
            <p>Click around and see what you find, or use the menu for a quicker way through.</p>
          </div>
        </div>
      </div>
      <p className="swipe">Swipe sideways to explore the room →</p>
      <div className={hover ? "hover-tip show" : "hover-tip"} aria-hidden="true">{hover}</div>

      {toast && <div className="toast" role="status">{toast}</div>}

      {Panel && (
        <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="panel" role="dialog" aria-modal="true" aria-label={HOTSPOTS.find((h) => h.id === open)?.label}>
            <button className="close" onClick={() => setOpen(null)} aria-label="Close"><X size={20} /></button>
            <Panel go={go} />
          </div>
        </div>
      )}
    </div>
  );
}
