import './JkdSymbol.css';


const JkdSymbol: React.FC = () => {
  return (
    <div className="jkd-symbol-shell" aria-label="Premium Jeet Kune Do symbol">
      <svg className="jkd-symbol" viewBox="0 0 320 320" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#f1d08a" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#ca9938" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0.01" />
          </radialGradient>
          <linearGradient id="outerRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1d08a" />
            <stop offset="50%" stopColor="#ca9938" />
            <stop offset="100%" stopColor="#7c5318" />
          </linearGradient>
          <linearGradient id="redFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e23434" />
            <stop offset="100%" stopColor="#7f0e0e" />
          </linearGradient>
          <linearGradient id="inkFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="100%" stopColor="#030303" />
          </linearGradient>
        </defs>

        {/* Outer gold ring */}
        <circle cx="160" cy="160" r="134" fill="url(#centerGlow)" stroke="url(#outerRing)" strokeWidth="8" />
        {/* Subtle inner ring */}
        <circle cx="160" cy="160" r="112" fill="none" stroke="rgba(241,208,138,0.22)" strokeWidth="1.5" />

        {/* Dynamic brush strokes: yin/yang flow, more energy */}
        <path
          d="M160 50C110 50 70 90 70 140c0 23 8 42 25 59 14 14 31 22 51 25-16-13-24-30-24-52 0-40 29-68 64-84 15-7 29-16 39-29-17-6-34-9-55-9Z"
          fill="url(#inkFlow)"
          opacity="0.92"
        />
        <path
          d="M160 270c50 0 90-40 90-90 0-23-8-42-25-59-14-14-31-22-51-25 16 13 24 30 24 52 0 40-29 68-64 84-15 7-29 16-39 29 17 6 34 9 55 9Z"
          fill="url(#redFlow)"
          opacity="0.92"
        />

        {/* Center gold and black dots: balance, focus */}
        <circle cx="132" cy="122" r="16" fill="#ca9938" filter="url(#centerGlow)" />
        <circle cx="188" cy="198" r="16" fill="#050505" stroke="#ca9938" strokeWidth="4" />

        {/* Arrow motifs: directness, interception */}
        <path d="M61 128c18-42 49-72 93-90" fill="none" stroke="#ca9938" strokeWidth="5" strokeLinecap="round" />
        <path d="M139 30l15 8-8 15" fill="none" stroke="#ca9938" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M259 192c-18 42-49 72-93 90" fill="none" stroke="#ca9938" strokeWidth="5" strokeLinecap="round" />
        <path d="M181 290l-15-8 8-15" fill="none" stroke="#ca9938" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

        {/* New: subtle dragon silhouette for DragonAI identity */}
        <path d="M110 160c0-28 40-28 40 0s40 28 40 0" fill="none" stroke="#b61a1a" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
        <ellipse cx="160" cy="160" rx="18" ry="6" fill="#b61a1a" opacity="0.12" />
      </svg>

      <div className="jkd-symbol-caption">
        <span>DragonAI</span>
        <strong>Premium JKD Symbol</strong>
      </div>
    </div>
  );
};

export default JkdSymbol;