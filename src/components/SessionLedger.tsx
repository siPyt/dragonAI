import { FormEvent, useEffect, useState } from 'react';

interface LedgerEntry {
  id: string;
  createdAt: string;
  intent: string;
  notes: string;
  refinement: string;
}

const storageKey = 'dragonai-session-ledger';

function buildId() {
  return `ledger-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const SessionLedger: React.FC = () => {
  const [intent, setIntent] = useState('');
  const [notes, setNotes] = useState('');
  const [refinement, setRefinement] = useState('');
  const [entries, setEntries] = useState<LedgerEntry[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as LedgerEntry[];
      setEntries(parsed);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!intent.trim() || !notes.trim() || !refinement.trim()) {
      return;
    }

    const nextEntry: LedgerEntry = {
      id: buildId(),
      createdAt: new Date().toISOString(),
      intent: intent.trim(),
      notes: notes.trim(),
      refinement: refinement.trim()
    };

    setEntries((currentEntries) => [nextEntry, ...currentEntries].slice(0, 8));
    setIntent('');
    setNotes('');
    setRefinement('');
  };

  return (
    <section className="martial-card session-ledger component-full-width">
      <div>
        <p className="section-kicker">Session Ledger</p>
        <h2>Keep the record like a practitioner</h2>
        <p className="ledger-hint">Entries are stored locally in the browser so each session leaves a concise working record.</p>
      </div>

      <form className="ledger-form" onSubmit={handleSubmit}>
        <div className="session-field-grid">
          <input
            className="ledger-input"
            value={intent}
            onChange={(event) => setIntent(event.target.value)}
            placeholder="Session intention"
          />
          <input
            className="ledger-input"
            value={refinement}
            onChange={(event) => setRefinement(event.target.value)}
            placeholder="Next refinement"
          />
        </div>
        <textarea
          className="ledger-textarea"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Record what was direct, what was wasteful, and what needs another repetition."
        />
        <div className="ledger-actions">
          <span className="ledger-hint">Keep each note specific enough to shape the next session.</span>
          <button className="ledger-button" type="submit" disabled={!intent.trim() || !notes.trim() || !refinement.trim()}>
            Save Entry
          </button>
        </div>
      </form>

      <div className="session-entry-list">
        {entries.length === 0 ? (
          <div className="empty-state">No session entries saved yet.</div>
        ) : (
          entries.map((entry) => (
            <article key={entry.id} className="ledger-entry">
              <div className="ledger-entry-header">
                <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                <span>{new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="ledger-entry-body">
                <p>{entry.notes}</p>
              </div>
              <div className="ledger-tags">
                <span className="ledger-tag">Intent: {entry.intent}</span>
                <span className="ledger-tag">Refinement: {entry.refinement}</span>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default SessionLedger;