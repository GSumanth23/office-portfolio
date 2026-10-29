import { useEffect, useState } from "react";
import { profile } from "./data";

// Every clickable thing in the room. The order is the order of the "found" list.
export const HOTSPOTS = [
  { id: "about", label: "Photo: about me" },
  { id: "projects", label: "Monitor: things I've built" },
  { id: "experience", label: "Server rack: where I've worked" },
  { id: "skills", label: "Bookshelf: my toolbox" },
  { id: "impact", label: "Corkboard: numbers I'm proud of" },
  { id: "education", label: "Diplomas: where I studied" },
  { id: "journey", label: "Postcard: Hyderabad to Kansas" },
  { id: "lunch", label: "Lunch: a Cheezywich on a Plate" },
  { id: "howiwork", label: "Coffee: how I work" },
  { id: "debug", label: "Rubber duck: how I debug" },
  { id: "resume", label: "Clipboard: my résumé" },
  { id: "contact", label: "Phone: say hello" },
  { id: "clock", label: "Clock: Kansas time" },
  { id: "lamp", label: "Lamp: change the light" },
  { id: "shades", label: "Sunglasses: try them on" },
  { id: "plant", label: "Plant: water it" },
  { id: "hello", label: "Sign: hello, world" },
];

export function useKansasTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", hour: "numeric", minute: "numeric", hour12: false,
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour").value) % 24;
  const m = Number(parts.find((p) => p.type === "minute").value);
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", hour: "numeric", minute: "2-digit",
  }).format(now);
  return { h, m, label };
}

const SHADE_BLACK = [[0, 0, 26], [1, 1, 11], [1, 14, 11], [2, 2, 9], [2, 15, 9], [3, 3, 7], [3, 16, 7], [4, 4, 5], [4, 17, 5]];
const SHADE_WHITE = [[1, 3], [1, 4], [2, 3], [1, 16], [1, 17], [2, 16]];

function PixelShades({ x, y, width }) {
  return (
    <svg x={x} y={y} width={width} height={(width * 5) / 26} viewBox="0 0 26 5" shapeRendering="crispEdges">
      {SHADE_BLACK.map(([r, c, w]) => <rect key={`b${r}-${c}`} x={c} y={r} width={w} height="1" fill="#0b0b0b" />)}
      {SHADE_WHITE.map(([r, c]) => <rect key={`w${r}-${c}`} x={c} y={r} width="1" height="1" fill="#fff" />)}
    </svg>
  );
}

function Hot({ id, label, found, onOpen, onHover, children }) {
  return (
    <g
      className={found ? "hot found" : "hot"}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={() => onOpen(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(id); }
      }}
      onMouseEnter={() => onHover(label)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(label)}
      onBlur={() => onHover(null)}
    >
      <title>{label}</title>
      {children}
    </g>
  );
}

// Deterministic "random" books for the bookshelf.
const BOOK_COLORS = ["#e8644a", "#f2c14e", "#3d7ea6", "#f5efe0", "#8e5ea2", "#1f2a2e", "#e98a3c", "#5fb49c", "#c94f6d"];
function shelfBooks(bottom, seed) {
  const books = [];
  let x = 1436;
  let i = seed;
  while (x < 1566) {
    const w = 9 + ((i * 7) % 9);
    const h = 66 + ((i * 13) % 34);
    if ((i * 5) % 11 === 0) { x += 10; i += 1; continue; }
    if (x + w > 1572) break;
    books.push({ x, w, h, y: bottom - h, c: BOOK_COLORS[(i * 3) % BOOK_COLORS.length] });
    x += w + 1;
    i += 1;
  }
  return books;
}
const BOOK_ROWS = [380, 500, 620, 748].map((b, r) => shelfBooks(b, r * 7 + 2));

const CODE = [
  [0, 46, "#c792ea"], [1, 70, "#82aaff"], [1, 40, "#c3e88d"], [2, 90, "#89ddff"],
  [2, 36, "#f2c14e"], [1, 64, "#82aaff"], [0, 22, "#c792ea"], [0, 0, ""], [0, 58, "#c792ea"],
  [1, 96, "#c3e88d"],
];

export default function Office({ found, onOpen, onHover, night, cool, plantLevel, hints }) {
  const { h, m } = useKansasTime();
  const hourAngle = ((h % 12) + m / 60) * 30;
  const minuteAngle = m * 6;
  const vine = 70 + plantLevel * 40;
  const has = (id) => found.has(id);
  const hp = (id) => ({ id, label: HOTSPOTS.find((x) => x.id === id).label, found: has(id), onOpen, onHover });

  return (
    <svg
      className={`office ${hints ? "hints" : ""} ${night ? "is-night" : ""}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="An illustrated developer office. Each object opens part of Sumanth's portfolio."
    >
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a383d" />
          <stop offset="1" stopColor="#1c262a" />
        </linearGradient>
        <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd0f5" />
          <stop offset="1" stopColor="#f7e3c4" />
        </linearGradient>
        <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1430" />
          <stop offset="1" stopColor="#2a2f5c" />
        </linearGradient>
        <radialGradient id="lampGlow" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#ffd68a" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffd68a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="screenGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7fe3c0" stopOpacity="0.35" />
          <stop offset="1" stopColor="#7fe3c0" stopOpacity="0" />
        </radialGradient>
        <clipPath id="photoClip"><rect x="650" y="128" width="90" height="90" /></clipPath>
      </defs>

      {/* Room */}
      <rect width="1600" height="760" fill="url(#wall)" />
      <rect y="752" width="1600" height="10" fill="#141c1f" />
      <rect y="760" width="1600" height="140" fill="#4a3324" />
      {[800, 845].map((y) => <rect key={y} y={y} width="1600" height="2" fill="#3d2a1d" />)}
      {[[120, 760], [430, 760], [760, 760], [1080, 760], [1400, 760], [260, 802], [600, 802], [940, 802], [1260, 802], [90, 847], [480, 847], [820, 847], [1180, 847], [1500, 847]].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="2" height={y === 847 ? 53 : 40} fill="#3d2a1d" />
      ))}
      <ellipse cx="800" cy="835" rx="330" ry="42" fill="#2c4a46" />
      <ellipse cx="800" cy="835" rx="300" ry="34" fill="none" stroke="#3f6b63" strokeWidth="3" strokeDasharray="10 8" />

      {/* Daylight from the window */}
      <polygon className="daylight" points="130,770 380,770 520,892 170,892" fill="#fff6e0" />

      {/* Window */}
      <rect x="90" y="110" width="280" height="320" rx="6" fill="#e9e2d3" />
      <rect x="102" y="122" width="256" height="296" fill={night ? "url(#skyNight)" : "url(#skyDay)"} />
      {night ? (
        <g>
          <circle cx="300" cy="170" r="18" fill="#f4f1d0" />
          <circle cx="292" cy="165" r="17" fill="#1a2148" />
          {[[130, 150], [170, 200], [210, 140], [150, 240], [260, 220], [330, 250], [240, 180]].map(([x, y]) => (
            <circle key={`${x}${y}`} className="star" cx={x} cy={y} r="1.8" fill="#fff" />
          ))}
        </g>
      ) : (
        <g>
          <circle cx="300" cy="172" r="24" fill="#ffd77a" />
          <ellipse cx="160" cy="190" rx="34" ry="11" fill="#fff" opacity="0.85" />
          <ellipse cx="185" cy="182" rx="20" ry="10" fill="#fff" opacity="0.85" />
        </g>
      )}
      <g fill={night ? "#121a33" : "#6f97ab"}>
        <rect x="104" y="330" width="34" height="88" />
        <rect x="140" y="300" width="28" height="118" />
        <rect x="172" y="350" width="40" height="68" />
        <rect x="214" y="285" width="24" height="133" />
        <rect x="240" y="320" width="44" height="98" />
        <rect x="288" y="345" width="30" height="73" />
        <rect x="320" y="310" width="36" height="108" />
      </g>
      {night && (
        <g fill="#ffd77a">
          {[[112, 345], [124, 370], [148, 315], [156, 360], [182, 365], [196, 390], [220, 300], [226, 340], [250, 335], [266, 370], [296, 360], [330, 330], [340, 380], [152, 390]].map(([x, y]) => (
            <rect key={`${x}${y}`} x={x} y={y} width="5" height="7" />
          ))}
        </g>
      )}
      <rect x="226" y="122" width="8" height="296" fill="#e9e2d3" />
      <rect x="102" y="266" width="256" height="8" fill="#e9e2d3" />
      <rect x="78" y="428" width="304" height="12" rx="3" fill="#d8cfbd" />

      {/* Phone on the window sill */}
      <Hot {...hp("contact")}>
        <rect x="256" y="370" width="104" height="70" fill="transparent" />
        <path d="M282 424 q -8 10 -24 6 q -12 -3 -10 4" fill="none" stroke="#c94444" strokeWidth="2" />
        <rect x="270" y="402" width="76" height="27" rx="8" fill="#e05252" />
        <circle cx="308" cy="415" r="9" fill="#f3efe6" stroke="#b93e3e" strokeWidth="2" />
        <circle cx="308" cy="415" r="2.5" fill="#b93e3e" />
        <path d="M264 402 q 0 -16 16 -16 h56 q 16 0 16 16 v4 h-18 v-5 h-52 v5 h-18 z" fill="#c94444" />
      </Hot>

      {/* Shelf */}
      <rect x="470" y="228" width="440" height="16" rx="3" fill="#3fbf8f" />
      <rect x="500" y="244" width="10" height="22" fill="#2f9a73" />
      <rect x="870" y="244" width="10" height="22" fill="#2f9a73" />

      {/* Plant */}
      <Hot {...hp("plant")}>
        <rect x="486" y="150" width="90" height={90 + vine} fill="transparent" />
        {[[506, 1], [522, 0.75], [552, 0.9]].map(([x, f], i) => {
          const len = vine * f;
          return (
            <g key={x}>
              <path d={`M${x} 226 q ${i % 2 ? 12 : -12} ${len / 2} ${i % 2 ? -4 : 4} ${len}`} fill="none" stroke="#3d7d4a" strokeWidth="2.5" />
              {Array.from({ length: Math.floor(len / 18) }, (_, k) => (
                <ellipse key={k} cx={x + (k % 2 ? 7 : -7)} cy={236 + k * 18} rx="7" ry="4.5" fill={k % 3 ? "#5fb36d" : "#4c9c5b"} transform={`rotate(${k % 2 ? 30 : -30} ${x + (k % 2 ? 7 : -7)} ${236 + k * 18})`} />
              ))}
            </g>
          );
        })}
        {[[-26, -12], [-14, -26], [2, -32], [18, -24], [28, -10], [-4, -18], [12, -14]].map(([dx, dy], i) => (
          <ellipse key={i} cx={530 + dx} cy={190 + dy} rx="13" ry="7" fill={i % 2 ? "#5fb36d" : "#4c9c5b"} transform={`rotate(${dx * 2} ${530 + dx} ${190 + dy})`} />
        ))}
        <path d="M498 190 h64 l-7 38 h-50 z" fill="#c9774a" />
        <rect x="496" y="186" width="68" height="8" rx="2" fill="#b5653c" />
      </Hot>

      {/* Photo frame */}
      <Hot {...hp("about")}>
        <rect x="640" y="118" width="110" height="110" rx="3" fill="#3a2a1e" />
        <rect x="646" y="124" width="98" height="98" fill="#f3efe6" />
        {profile.photo ? (
          <image href={profile.photo} x="650" y="128" width="90" height="90" preserveAspectRatio="xMidYMid slice" clipPath="url(#photoClip)" />
        ) : (
          <rect x="650" y="128" width="90" height="90" fill="#34d399" />
        )}
        {cool && profile.photo && <PixelShades x={650 + 90 * 0.502 - 8.1} y={128 + 90 * 0.203} width={16.2} />}
      </Hot>

      {/* hello, world sign */}
      <Hot {...hp("hello")}>
        <rect x="784" y="160" width="112" height="68" rx="5" fill="#141c1f" stroke="#3fbf8f" strokeWidth="3" />
        <text x="840" y="190" textAnchor="middle" className="mono" fontSize="13" fill="#34d399">hello,</text>
        <text x="840" y="208" textAnchor="middle" className="mono" fontSize="13" fill="#34d399">world_</text>
      </Hot>

      {/* Diplomas */}
      <Hot {...hp("education")}>
        {[[950, "M.S."], [1070, "B.Tech"]].map(([x, t]) => (
          <g key={t}>
            <rect x={x} y="112" width="104" height="124" rx="3" fill="#3a2a1e" />
            <rect x={x + 8} y="120" width="88" height="108" fill="#fbf6ea" />
            <text x={x + 52} y="152" textAnchor="middle" className="serif" fontSize="17" fill="#1d2528">{t}</text>
            <rect x={x + 20} y="164" width="64" height="3" fill="#cfc4ad" />
            <rect x={x + 26} y="174" width="52" height="3" fill="#cfc4ad" />
            <rect x={x + 20} y="184" width="64" height="3" fill="#cfc4ad" />
            <circle cx={x + 52} cy="208" r="11" fill="#e0b84c" />
            <path d={`M${x + 46} 216 l -4 12 l 6 -3 l 4 5 z M${x + 58} 216 l 4 12 l -6 -3 l -4 5 z`} fill="#c94f6d" />
          </g>
        ))}
      </Hot>

      {/* Clock */}
      <Hot {...hp("clock")}>
        <circle cx="1315" cy="176" r="56" fill="#3a2a1e" />
        <circle cx="1315" cy="176" r="48" fill="#fbf6ea" />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="1313.5" y="132" width="3" height={i % 3 ? 5 : 9} fill="#1d2528" transform={`rotate(${i * 30} 1315 176)`} />
        ))}
        <rect x="1312.5" y="148" width="5" height="30" rx="2.5" fill="#1d2528" transform={`rotate(${hourAngle} 1315 176)`} />
        <rect x="1313.5" y="136" width="3" height="42" rx="1.5" fill="#1d2528" transform={`rotate(${minuteAngle} 1315 176)`} />
        <circle cx="1315" cy="176" r="4" fill="#e05252" />
        <text x="1315" y="206" textAnchor="middle" className="mono" fontSize="9" fill="#6b665c">KC</text>
      </Hot>

      {/* Corkboard */}
      <Hot {...hp("impact")}>
        <rect x="560" y="268" width="280" height="160" rx="6" fill="#7a4e2c" />
        <rect x="572" y="280" width="256" height="136" fill="#c8995f" />
        {[[584, 288, "#fbe38e", "4+", "years shipping", -3], [710, 290, "#9ee6c6", "~40%", "faster APIs", 2], [588, 350, "#ffc2c8", "85%+", "test coverage", 2], [712, 348, "#a9d4f5", "10+", "services", -2]].map(([x, y, c, big, small, r]) => (
          <g key={big} transform={`rotate(${r} ${x + 52} ${y + 32})`}>
            <rect x={x} y={y} width="104" height="62" fill={c} />
            <circle cx={x + 52} cy={y + 5} r="4" fill="#e05252" />
            <text x={x + 52} y={y + 34} textAnchor="middle" className="hand" fontSize="24" fill="#1d2528">{big}</text>
            <text x={x + 52} y={y + 53} textAnchor="middle" className="hand" fontSize="15" fill="#1d2528">{small}</text>
          </g>
        ))}
      </Hot>

      {/* Postcard */}
      <Hot {...hp("journey")}>
        <g transform="rotate(6 925 350)">
          <rect x="862" y="300" width="128" height="88" fill="#fbf6ea" stroke="#d9cfba" strokeWidth="2" />
          <rect x="956" y="308" width="24" height="28" fill="#f2c14e" stroke="#e05252" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M880 370 C 900 320, 940 330, 960 352" fill="none" stroke="#3d7ea6" strokeWidth="2.5" strokeDasharray="5 4" />
          <circle cx="880" cy="370" r="5" fill="#e05252" />
          <circle cx="960" cy="352" r="5" fill="#0f8a63" />
          <text x="872" y="384" className="mono" fontSize="10" fill="#1d2528">HYD</text>
          <text x="944" y="372" className="mono" fontSize="10" fill="#1d2528">KS</text>
          <rect x="908" y="292" width="34" height="14" fill="#e9e2d3" opacity="0.8" transform="rotate(-8 925 299)" />
        </g>
      </Hot>

      {/* Desk */}
      <rect x="420" y="600" width="770" height="22" rx="4" fill="#9c6a3f" />
      <rect x="420" y="618" width="770" height="6" fill="#7d5230" />
      <rect x="440" y="622" width="20" height="138" fill="#7d5230" />
      <rect x="1000" y="622" width="170" height="138" fill="#8d5e37" />
      <rect x="1000" y="690" width="170" height="3" fill="#6e4628" />
      <rect x="1068" y="652" width="34" height="6" rx="3" fill="#d7c3a5" />
      <rect x="1068" y="720" width="34" height="6" rx="3" fill="#d7c3a5" />

      {/* Monitor */}
      <Hot {...hp("projects")}>
        <rect x="640" y="440" width="260" height="142" rx="9" fill="#111518" />
        <rect x="652" y="452" width="236" height="118" rx="3" fill="#0f1a20" />
        <text x="664" y="467" className="mono" fontSize="9" fill="#5b7380">~/projects $ ls</text>
        {CODE.map(([ind, w, c], i) => c && <rect key={i} x={664 + ind * 14} y={474 + i * 8.6} width={w} height="5" rx="2" fill={c} />)}
        <rect className="cursor" x="664" y="559" width="7" height="8" fill="#34d399" />
        <rect x="755" y="582" width="30" height="16" fill="#2b3036" />
        <ellipse cx="770" cy="599" rx="58" ry="5" fill="#2b3036" />
        <rect x="690" y="588" width="58" height="10" rx="2" fill="#d9d9d9" opacity="0" />
      </Hot>
      <rect x="814" y="589" width="74" height="10" rx="2" fill="#cfd3d6" />

      {/* Plate with a Cheezywich */}
      <Hot {...hp("lunch")}>
        <rect x="440" y="548" width="112" height="56" fill="transparent" />
        <ellipse cx="495" cy="598" rx="50" ry="7" fill="#f5f5f5" />
        <ellipse cx="495" cy="597" rx="36" ry="4" fill="#e6e6e6" />
        <path d="M466 594 h58 l-8 -10 h-42 z" fill="#d99a52" />
        <path d="M468 585 h54 l-3 -5 h-48 z" fill="#ffd23f" />
        <path d="M478 584 q 2 9 5 0 M500 584 q 2 7 4 0" fill="#ffd23f" stroke="#ffd23f" strokeWidth="2" />
        <path d="M470 580 q 25 -26 50 0 z" fill="#e8b06a" />
        <circle cx="486" cy="572" r="1.6" fill="#b37a3c" />
        <circle cx="500" cy="568" r="1.6" fill="#b37a3c" />
        <circle cx="510" cy="574" r="1.6" fill="#b37a3c" />
      </Hot>

      {/* Rubber duck */}
      <Hot {...hp("debug")}>
        <rect x="566" y="550" width="56" height="52" fill="transparent" />
        <ellipse cx="590" cy="588" rx="19" ry="12" fill="#ffd23f" />
        <circle cx="602" cy="569" r="11" fill="#ffd23f" />
        <path d="M611 568 l 11 3 l -11 4 z" fill="#f08a24" />
        <circle cx="605" cy="566" r="2" fill="#1d2528" />
        <path d="M578 584 q 8 8 18 0" fill="none" stroke="#e6b800" strokeWidth="2" />
      </Hot>

      {/* Coffee mug */}
      <Hot {...hp("howiwork")}>
        <rect x="912" y="526" width="64" height="76" fill="transparent" />
        <path className="steam s1" d="M930 552 q -6 -10 0 -18 q 6 -8 0 -16" fill="none" stroke="#e9e2d3" strokeWidth="2.5" strokeLinecap="round" />
        <path className="steam s2" d="M944 552 q -6 -10 0 -18 q 6 -8 0 -16" fill="none" stroke="#e9e2d3" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M958 568 q 16 0 16 12 q 0 12 -16 12" fill="none" stroke="#f3efe6" strokeWidth="5" />
        <rect x="920" y="558" width="40" height="42" rx="5" fill="#f3efe6" />
        <rect x="920" y="572" width="40" height="8" fill="#34d399" />
      </Hot>

      {/* Sunglasses on the desk */}
      <Hot {...hp("shades")}>
        <rect x="984" y="574" width="76" height="30" fill="transparent" />
        <PixelShades x={986} y={586} width={70} />
      </Hot>

      {/* Desk lamp */}
      <Hot {...hp("lamp")}>
        <rect x="1118" y="460" width="96" height="144" fill="transparent" />
        <ellipse cx="1152" cy="597" rx="26" ry="5" fill="#2b3036" />
        <path d="M1152 596 L 1138 528 L 1168 488" fill="none" stroke="#2b3036" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="1138" cy="528" r="5" fill="#3fbf8f" />
        <polygon points="1152,470 1190,470 1208,504 1136,504" fill="#3fbf8f" />
        <circle cx="1172" cy="506" r="7" fill={night ? "#ffe6a3" : "#d6d0c2"} />
      </Hot>

      {/* Résumé clipboard */}
      <Hot {...hp("resume")}>
        <rect x="1040" y="640" width="92" height="112" rx="4" fill="#a8794f" />
        <rect x="1048" y="652" width="76" height="94" fill="#fbf6ea" />
        <rect x="1072" y="634" width="28" height="13" rx="3" fill="#b8c0c8" />
        <text x="1086" y="672" textAnchor="middle" className="mono" fontSize="10" fontWeight="700" fill="#1d2528">RÉSUMÉ</text>
        {[684, 694, 704, 714, 724, 734].map((y, i) => <rect key={y} x="1056" y={y} width={i % 2 ? 46 : 60} height="3" fill="#cfc4ad" />)}
      </Hot>

      {/* Server rack */}
      <Hot {...hp("experience")}>
        <rect x="1230" y="300" width="170" height="460" rx="8" fill="#22262d" />
        <rect x="1238" y="308" width="154" height="444" rx="4" fill="#2c313a" />
        {[["ORACLE HEALTH", "2025 - NOW"], ["EY GDS", "2022 - 2023"], ["PFIZER", "2021 - 2022"]].map(([name, yrs], i) => {
          const y = 326 + i * 118;
          return (
            <g key={name}>
              <rect x="1246" y={y} width="138" height="98" rx="3" fill="#1b1f25" stroke="#3a404b" strokeWidth="2" />
              <text x="1258" y={y + 24} className="mono" fontSize="11.5" fontWeight="700" fill="#e7eef0">{name}</text>
              <text x="1258" y={y + 40} className="mono" fontSize="9.5" fill="#7f8c93">{yrs}</text>
              {[0, 1, 2].map((k) => (
                <circle key={k} className={`led d${(i + k) % 3}`} cx={1262 + k * 14} cy={y + 60} r="4" fill={k === 2 ? "#f2c14e" : "#34d399"} />
              ))}
              {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={1258 + k * 22} y={y + 78} width="16" height="4" rx="2" fill="#323844" />)}
            </g>
          );
        })}
        <rect x="1246" y="680" width="138" height="62" rx="3" fill="#1b1f25" stroke="#3a404b" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={1256 + k * 21} y="700" width="14" height="22" rx="2" fill="#323844" />)}
      </Hot>

      {/* Bookshelf */}
      <Hot {...hp("skills")}>
        <rect x="1420" y="250" width="170" height="510" rx="4" fill="#3fbf8f" />
        <rect x="1432" y="262" width="146" height="486" fill="#2a8a67" />
        {[380, 500, 620].map((y) => <rect key={y} x="1432" y={y} width="146" height="10" fill="#3fbf8f" />)}
        {BOOK_ROWS.flat().map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} />
            <rect x={b.x + 2} y={b.y + 10} width={b.w - 4} height="3" fill="#000" opacity="0.18" />
          </g>
        ))}
        <path d="M1488 250 h44 l-5 -26 h-34 z" fill="#c9774a" />
        <rect x="1500" y="180" width="20" height="46" rx="10" fill="#5fb36d" />
        <rect x="1486" y="196" width="12" height="22" rx="6" fill="#5fb36d" />
        <rect x="1522" y="190" width="12" height="20" rx="6" fill="#5fb36d" />
      </Hot>

      {/* Night: dim the room, keep the lamp and screen glowing */}
      <rect className="night-shade" width="1600" height="900" fill="#050a18" pointerEvents="none" />
      <g className="night-glow" pointerEvents="none">
        <polygon points="1140,506 1206,506 1290,604 1040,604" fill="url(#lampGlow)" />
        <ellipse cx="770" cy="510" rx="190" ry="110" fill="url(#screenGlow)" />
      </g>
    </svg>
  );
}
