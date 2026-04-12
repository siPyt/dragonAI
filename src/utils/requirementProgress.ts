// Tracks completion of promotion requirements (sessions, fitness, drills, etc.)
// Usage: import and update from session generator, ledger, etc.

export interface RequirementProgress {
  [requirement: string]: number | boolean; // e.g. 'focus mitt sessions': 3, 'fitness baseline': true
}

const storageKey = 'dragon_ai-requirement-progress';

export function getRequirementProgress(): RequirementProgress {
  const saved = window.localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : {};
}

export function setRequirementProgress(progress: RequirementProgress) {
  window.localStorage.setItem(storageKey, JSON.stringify(progress));
}

export function incrementRequirement(requirement: string, amount = 1) {
  const progress = getRequirementProgress();
  if (typeof progress[requirement] === 'number') {
    progress[requirement] += amount;
  } else {
    progress[requirement] = amount;
  }
  setRequirementProgress(progress);
}

export function completeRequirement(requirement: string) {
  const progress = getRequirementProgress();
  progress[requirement] = true;
  setRequirementProgress(progress);
}
