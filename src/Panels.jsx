import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ExternalLink, FileText, Mail, Phone, MapPin, Send } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { profile, stats, experience, projects, skills, education } from "./data";
import { useKansasTime } from "./Office";

// EmailJS: set these in a .env file (VITE_EMAILJS_SERVICE_ID, etc.).
// Without them, the form opens the visitor's email app instead.
const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

function Head({ eyebrow, title, sub }) {
  return (
    <header className="p-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
    </header>
  );
}

function Chips({ items }) {
  return <div className="chips">{items.map((s) => <span key={s} className="chip">{s}</span>)}</div>;
}

function ProjectCard({ p }) {
  const status = p.status === "live" ? "Live" : p.status === "work" ? "Work project" : "In progress";
  return (
    <article className="proj" style={{ "--tint": p.color }}>
      <div className="proj-top">
        <h3>{p.name}</h3>
        <span className={`status ${p.status}`}>{status}</span>
      </div>
      <p className="proj-tag">{p.tagline}</p>
      <p>{p.description}</p>
      <Chips items={p.stack} />
      {(p.live || p.repo) && (
        <div className="links">
          {p.live && <a href={p.live} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Visit site</a>}
          {p.repo && <a href={p.repo} target="_blank" rel="noreferrer"><Github size={15} /> Code</a>}
        </div>
      )}
    </article>
  );
}

function About({ go }) {
  return (
    <>
      <Head eyebrow="Photo on the shelf" title="Hi, I'm Sumanth." />
      <div className="about">
        <img src={profile.photo} alt="Sumanth Gajula in Antelope Canyon" className="about-photo" />
        <div className="stack">
          <p className="lead">{profile.intro}</p>
          {profile.summary.map((p) => <p key={p}>{p}</p>)}
          <p className="meta"><MapPin size={15} /> {profile.location} <span className="open">Open to opportunities</span></p>
          <div className="btns">
            <button className="btn primary" onClick={() => go("contact")}>Say hello</button>
            <a className="btn" href="resume.pdf" target="_blank" rel="noreferrer"><FileText size={15} /> Résumé</a>
            <a className="btn icon" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a className="btn icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          </div>
        </div>
      </div>
    </>
  );
}

function Projects() {
  return (
    <>
      <Head eyebrow="On the screen" title="Things I've built" sub="Production work and side projects I took from idea to deploy." />
      <div className="proj-grid">{projects.map((p) => <ProjectCard key={p.name} p={p} />)}</div>
    </>
  );
}

function Lunch() {
  const two = projects.filter((p) => p.name === "Plate" || p.name.startsWith("Cheezywich"));
  return (
    <>
      <Head eyebrow="Lunch break" title="A Cheezywich on a Plate" sub="Two of my side projects happen to be about food. One counts calories, the other sells sandwiches." />
      <div className="proj-grid">{two.map((p) => <ProjectCard key={p.name} p={p} />)}</div>
    </>
  );
}

function Experience() {
  const [i, setI] = useState(0);
  const job = experience[i];
  return (
    <>
      <Head eyebrow="Server rack" title="Where I've worked" sub="4+ years of production backends, newest first." />
      <div className="tabs" role="tablist">
        {experience.map((e, k) => (
          <button key={e.company} role="tab" aria-selected={k === i} className={k === i ? "tab on" : "tab"} onClick={() => setI(k)}>
            {e.company}
          </button>
        ))}
      </div>
      <div className="job" key={i}>
        <div className="job-top">
          <h3>{job.title}</h3>
          <span className="when">{job.period} · {job.location}</span>
        </div>
        <ul className="dots">{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
        <Chips items={job.stack} />
      </div>
    </>
  );
}

function Skills() {
  return (
    <>
      <Head eyebrow="Bookshelf" title="My toolbox" sub="The tools I reach for every day." />
      <div className="skill-grid">
        {Object.entries(skills).map(([cat, list]) => (
          <div key={cat} className="skill">
            <h3>{cat}</h3>
            <Chips items={list} />
          </div>
        ))}
      </div>
    </>
  );
}

function Impact() {
  return (
    <>
      <Head eyebrow="Corkboard" title="Numbers I'm proud of" />
      <div className="stat-grid">
        {stats.map((s, k) => (
          <div key={s.label} className={`note n${k}`}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <p className="small">Measured on production services at Oracle Health: faster responses from caching, parallel calls, connection pooling and tuned SQL indexes; coverage gated on every merge in CI.</p>
    </>
  );
}

function Education() {
  return (
    <>
      <Head eyebrow="On the wall" title="Where I studied" />
      <div className="edu">
        {education.map((e) => (
          <div key={e.degree} className="edu-card">
            <span className="seal" aria-hidden="true" />
            <div>
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
              <p className="when">{e.period}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Journey() {
  const stops = [
    { place: "Hyderabad, India", when: "2018 – 2023", what: "B.Tech at GITAM University, then my first engineering roles at Pfizer and EY." },
    { place: "Warrensburg, Missouri", when: "2024 – 2025", what: "M.S. in Computer Science at the University of Central Missouri." },
    { place: "Overland Park, Kansas", when: "2025 – now", what: "Node.js Engineer at Oracle Health, building cloud healthcare APIs." },
  ];
  return (
    <>
      <Head eyebrow="Postcard" title="From Hyderabad to Kansas" />
      <ol className="route">
        {stops.map((s) => (
          <li key={s.place}>
            <h3>{s.place}</h3>
            <p className="when">{s.when}</p>
            <p>{s.what}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

function HowIWork() {
  const items = [
    ["Contracts first", "I define versioned OpenAPI specs and GraphQL schemas up front, and keep them backward compatible so partner teams never break."],
    ["Tests gate every merge", "Unit and integration tests with Mocha, Chai and Supertest. I raised API coverage to 85%+ and made CI enforce it."],
    ["Observability built in", "Structured logs, correlation IDs and Kibana dashboards, so one request can be traced across services."],
    ["AI-assisted, review-first", "I use GitHub Copilot and Claude to read legacy code, generate tests and refactor. Nothing AI-written merges without a human review."],
    ["Teaching through reviews", "I mentor teammates in code reviews and walk partner teams through API changes."],
  ];
  return (
    <>
      <Head eyebrow="Coffee mug" title="How I work" />
      <div className="list">
        {items.map(([t, d]) => (
          <div key={t} className="list-item"><h3>{t}</h3><p>{d}</p></div>
        ))}
      </div>
    </>
  );
}

function Debug() {
  return (
    <>
      <Head eyebrow="Rubber duck" title="How I debug" sub="Explaining the problem out loud to a duck works more often than it should." />
      <div className="list">
        <div className="list-item"><h3>Start with the evidence</h3><p>Logs, traces and correlation IDs first. They show where a request actually went, across the API and database layers.</p></div>
        <div className="list-item"><h3>A real one</h3><p>An endpoint was blocking the Node.js event loop under peak load. I found it with the Node.js inspector, moved the CPU-heavy work to worker threads and streamed large exports, and p95 latency stayed stable.</p></div>
        <div className="list-item"><h3>Fix it for everyone</h3><p>When a fix applies broadly, it goes into the shared middleware library so all 10+ services get it.</p></div>
      </div>
    </>
  );
}

function Clock({ go }) {
  const { label } = useKansasTime();
  return (
    <>
      <Head eyebrow="Wall clock" title={`It's ${label} in Kansas.`} />
      <p>I'm based in Overland Park, Kansas, on Central Time, and open to backend and full-stack Node.js roles.</p>
      <div className="btns"><button className="btn primary" onClick={() => go("contact")}>Say hello</button></div>
    </>
  );
}

function Resume() {
  return (
    <>
      <Head eyebrow="Clipboard" title="My résumé" sub="Node.js / Full Stack Engineer · 4+ years · Oracle Health, EY, Pfizer" />
      <div className="btns">
        <a className="btn primary" href="resume.pdf" target="_blank" rel="noreferrer"><FileText size={16} /> Open résumé (PDF)</a>
        <a className="btn" href="resume.pdf" download="Sumanth_Gajula_Resume.pdf">Download</a>
      </div>
    </>
  );
}

function Contact() {
  const formRef = useRef(null);
  const [state, setState] = useState("idle");
  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    if (!EMAILJS.service || !EMAILJS.template || !EMAILJS.key) {
      const subject = encodeURIComponent(`Portfolio message from ${fd.get("from_name")}`);
      const body = encodeURIComponent(`${fd.get("message")}\n\n${fd.get("from_name")} (${fd.get("reply_to")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setState("sending");
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, formRef.current, { publicKey: EMAILJS.key });
      setState("sent");
      formRef.current.reset();
    } catch {
      setState("error");
    }
  };
  return (
    <>
      <Head eyebrow="Telephone" title="Say hello" sub="Hiring for a Node.js or full-stack role, or have a question? Send me a note." />
      <div className="contact">
        <form ref={formRef} onSubmit={onSubmit} className="form">
          <label htmlFor="c-name">Your name</label>
          <input id="c-name" name="from_name" required />
          <label htmlFor="c-email">Your email</label>
          <input id="c-email" name="reply_to" type="email" required />
          <label htmlFor="c-msg">Message</label>
          <textarea id="c-msg" name="message" rows={4} required />
          <button className="btn primary" type="submit" disabled={state === "sending"}>
            <Send size={15} /> {state === "sending" ? "Sending..." : "Send message"}
          </button>
          {state === "sent" && <p className="ok">Sent. I'll get back to you soon.</p>}
          {state === "error" && <p className="err">That didn't send. Email me at {profile.email}.</p>}
        </form>
        <ul className="direct">
          <li><Mail size={16} /> <span>{profile.email}</span></li>
          <li><Phone size={16} /> <span>{profile.phone}</span></li>
          <li><Linkedin size={16} /> <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><Github size={16} /> <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
        </ul>
      </div>
    </>
  );
}

export const PANELS = {
  about: About,
  projects: Projects,
  lunch: Lunch,
  experience: Experience,
  skills: Skills,
  impact: Impact,
  education: Education,
  journey: Journey,
  howiwork: HowIWork,
  debug: Debug,
  clock: Clock,
  resume: Resume,
  contact: Contact,
};

// Order used by the "simple page" view.
export const PAGE_ORDER = ["about", "impact", "experience", "projects", "skills", "howiwork", "debug", "journey", "education", "resume", "contact"];
