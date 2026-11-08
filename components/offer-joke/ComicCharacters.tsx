import { useId } from "react";

type Prop = "ledger" | "forecast" | "feast" | "report" | "coins" | "handover";

/** Original vector portraits: contemporary cartoon drawing, antique finance setting. */
function Character({ person, x, y = 0, scale = 1 }: { person: "starduix" | "raleurix"; x: number; y?: number; scale?: number }) {
  const bald = person === "starduix";
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#30251f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="0" cy="183" rx="58" ry="9" fill="#30251f" opacity=".12" stroke="none" />
    <path d="M-28 127l-3 44-17 7q-8 9 8 10h27l9-61m22 0 6 44 14 6q12 10-3 11H13L4 128" fill="#4d3a31" />
    <path d="M-34 39q-19 20-23 72l-4 15q6 14 18 4l7-25 8-39M34 39q18 21 25 73l4 14q-4 14-17 5l-10-26-8-39" fill="#efbc94" />
    <path d="M-31 35q31-13 62 0l13 100q-44 20-88 0Z" fill={bald ? "#7d54ba" : "#6e9581"} />
    <path d="M-20 34 0 70l22-36M-40 104q40 11 80 0" fill="none" />
    <path d="M-4 38 7 91" stroke="#f5dfae" strokeWidth="8" />
    <path d="M-12 17v23q12 11 25 0V17" fill="#efbc94" />
    <ellipse cx="-37" cy="-20" rx="8" ry="12" fill="#efbc94" /><ellipse cx="37" cy="-20" rx="8" ry="12" fill="#efbc94" />
    <path d="M-35-37q0-42 35-42t35 42l-1 30q-4 35-34 36-30-2-34-36Z" fill="#f2c9a6" />
    {!bald && <path d="M-36-25q-18-24 0-45l10-3-3-15 18 8 11-15 9 12 17-7-2 14q24 7 17 34L31-24l-5-30q-24 14-49 0l-8 29Z" fill="#51372e" />}
    <path d={bald ? "M-33-9q8 12 12 10 21-17 42 0 8 1 12-10l-2 26Q0 57-31 17Z" : "M-33-4q8 11 13 9 20-14 39 0 10-1 14-9l-4 23Q0 48-29 19Z"} fill={bald ? "#59514b" : "#916044"} stroke="none" />
    <path d="M-26-37q8-5 16-1m20 0q8-5 16 1" fill="none" />
    <ellipse cx="-17" cy="-25" rx="3.5" ry="5" fill="#30251f" stroke="none" /><ellipse cx="17" cy="-25" rx="3.5" ry="5" fill="#30251f" stroke="none" />
    <path d="M0-25-5-9q5 4 10 0" fill="none" strokeWidth="2.5" />
    <path d="M-14 7q14 17 28 0Z" fill="#fff9ef" strokeWidth="2" />
    <path d="M-36 52q-8 5-8 22m80-22q8 5 8 22" fill="none" opacity=".25" />
  </g>;
}

export default function ComicCharacters({ scene = "ledger", hero = false, reverse = false }: { scene?: Prop; hero?: boolean; reverse?: boolean }) {
  const id = useId();
  return <svg viewBox="0 0 600 330" role="img" aria-labelledby={`${id}-title`} xmlns="http://www.w3.org/2000/svg">
    <title id={`${id}-title`}>{hero ? "Starduix, chauve et barbu en tunique violette, et Raleurix, cheveux bruns et barbe rousse en tunique verte, devant leurs comptes antiques" : `Starduix et Raleurix dans leur mission CFO : ${scene === "ledger" ? "le diagnostic" : scene === "forecast" ? "le prévisionnel" : scene === "feast" ? "le budget" : scene === "report" ? "le reporting" : scene === "coins" ? "le financement" : "le passage de relais"}`}</title>
    <g stroke="#30251f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 275h600v55H0Z" fill="#e7c898" stroke="none" />
      <path d="M0 276h600M37 304h145m45 0h124m89 0h85" fill="none" opacity=".3" />
      <path d="M35 263V80q0-22 22-22h68v205M48 58V43h90v15M53 79v180m52-180v180M464 263V82h82v181m-96-181V65h110v17" fill="#efdfbd" opacity=".65" />
      <path d="M181 51q119-60 238 0" fill="none" strokeDasharray="3 10" opacity=".25" />
      <Character person={reverse ? "raleurix" : "starduix"} x={hero ? 198 : 170} y={105} scale={hero ? 1.04 : .98} />
      <Character person={reverse ? "starduix" : "raleurix"} x={hero ? 403 : 430} y={105} scale={hero ? 1.04 : .98} />
      <path d="M220 247h163l-9 18H228Zm15 19-8 51m139-51 9 51" fill="#ac7953" />
      {(scene === "ledger" || scene === "handover") && <g>
        <path d="m246 198 55 9 53-13v47l-53 13-55-9Z" fill="#fff9e5" /><path d="M301 208v45m-44-39 29 5m-29 10 29 5m29-15 25-7m-25 19 25-7" fill="none" />
        <path d="m349 211 24-45m-24 45 7-24 12-7" fill="#9a6abf" />
      </g>}
      {scene === "forecast" && <g>
        <path d="M231 126h133v116H231Z" fill="#fff7dc" /><path d="m246 211 19-22 24 12 29-52 28 18" fill="none" stroke="#7651a4" strokeWidth="6" /><path d="m333 165 14 3-1-15M247 139h47" fill="none" /><circle cx="284" cy="223" r="6" fill="#e6a744" />
      </g>}
      {scene === "feast" && <g>
        <ellipse cx="302" cy="236" rx="60" ry="10" fill="#fff5df" /><path d="M260 230q3-50 36-34 36-15 43 34Z" fill="#b87145" /><path d="M350 223v-34h18v34m-9 0v19m-8 0h16" fill="#ba6580" /><path d="M266 183q-12-12 0-23m32 21q-12-12 0-23" fill="none" opacity=".5" />
      </g>}
      {scene === "report" && <g>
        <path d="M249 147h104v94H249Z" fill="#fff7dc" />
        {[0,1,2].map(n=><g key={n}><circle cx="268" cy={169+n*25} r="7" fill="#73a17f" /><path d={`M286 ${169+n*25}h48`} stroke="#73a17f" strokeWidth="5" /></g>)}
      </g>}
      {scene === "coins" && <g>
        <path d="M268 239q-25-42 11-66l-9-17h48l-10 17q45 31 16 66Z" fill="#d1ad65" /><path d="M276 174h33" /><text x="298" y="221" textAnchor="middle" fill="#30251f" stroke="none" fontSize="32" fontWeight="900">S</text>
      </g>}
      {[0,1,2].map(n=><g key={n}><ellipse cx={228+n*22} cy={245-n*9} rx="12" ry="5" fill="#e5ad45" /><path d={`M${216+n*22} ${245-n*9}v5q12 7 24 0v-5`} fill="#e5ad45" /></g>)}
      {hero && <g><path d="m486 172 40-15 8 38-39 12Z" fill="#ffdd66" /><path d="m496 178 18-6m-16 14 18-6" /><path d="M48 177q-17-17-21 2 1 15 18 14m9-13q18-13 20 5-3 15-19 10" fill="none" stroke="#a26a45" /></g>}
    </g>
  </svg>;
}
