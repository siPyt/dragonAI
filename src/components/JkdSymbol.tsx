import './JkdSymbol.css';

const JkdSymbol: React.FC = () => {
  return (
    <div className="jkd-symbol-shell" aria-label="Updated Jeet Kune Do symbol">
      <svg className="jkd-symbol" viewBox="0 0 320 320" role="img" aria-hidden="true">
        <defs>
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

        <circle cx="160" cy="160" r="134" fill="rgba(4,4,4,0.92)" stroke="url(#outerRing)" strokeWidth="8" />
        <circle cx="160" cy="160" r="112" fill="none" stroke="rgba(241,208,138,0.22)" strokeWidth="1.5" />

        <path
          d="M160 50C110 50 70 90 70 140c0 23 8 42 25 59 14 14 31 22 51 25-16-13-24-30-24-52 0-40 29-68 64-84 15-7 29-16 39-29-17-6-34-9-55-9Z"
          fill="url(#inkFlow)"
        />
        <path
          d="M160 270c50 0 90-40 90-90 0-23-8-42-25-59-14-14-31-22-51-25 16 13 24 30 24 52 0 40-29 68-64 84-15 7-29 16-39 29 17 6 34 9 55 9Z"
          fill="url(#redFlow)"
        />

        <circle cx="132" cy="122" r="16" fill="#ca9938" />
        <circle cx="188" cy="198" r="16" fill="#050505" stroke="#ca9938" strokeWidth="4" />

        <path d="M61 128c18-42 49-72 93-90" fill="none" stroke="#ca9938" strokeWidth="5" strokeLinecap="round" />
        <path d="M139 30l15 8-8 15" fill="none" stroke="#ca9938" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M259 192c-18 42-49 72-93 90" fill="none" stroke="#ca9938" strokeWidth="5" strokeLinecap="round" />
        <path d="M181 290l-15-8 8-15" fill="none" stroke="#ca9938" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="jkd-symbol-caption">
        <span>DragonAI</span>
        <strong>Updated JKD Symbol</strong>
      </div>
    </div>
  );
};

export default JkdSymbol;
