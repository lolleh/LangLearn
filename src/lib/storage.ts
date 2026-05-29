import type { Progress, Session } from "./types"

const STORAGE_KEY = "language-learner-progress"

function getDefaultProgress(): Progress {
  return { words: {}, sessions: [], streak: 0, lastActiveDate: null }
}

export function getProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : getDefaultProgress()
  } catch {
    return getDefaultProgress()
  }
}

function saveProgress(p: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

function todayString() {
  return new Date().toISOString().split("T")[0]
}

function yesterdayString() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split("T")[0]
}

export function recordAnswer(wordId: string, correct: boolean) {
  const p = getProgress()
  const now = todayString()

  if (!p.words[wordId]) {
    p.words[wordId] = {
      wordId,
      correct: 0,
      incorrect: 0,
      lastReviewed: null,
      nextReview: null,
    }
  }

  const w = p.words[wordId]
  if (correct) w.correct++
  else w.incorrect++
  w.lastReviewed = now

  const interval = correct ? 1 : 0
  const next = new Date()
  next.setDate(next.getDate() + interval)
  w.nextReview = next.toISOString().split("T")[0]

  saveProgress(p)
}

export function recordSession(language: string, reviewed: number, correct: number) {
  const p = getProgress()
  const now = todayString()
  const incorrect = reviewed - correct

  p.sessions.push({ date: now, language, wordsReviewed: reviewed, correct, incorrect })

  if (p.lastActiveDate === yesterdayString() || p.lastActiveDate === now) {
    if (p.lastActiveDate !== now) p.streak++
  } else {
    p.streak = 1
  }
  p.lastActiveDate = now

  saveProgress(p)
}

export function getLanguageStats(language: string) {
  const p = getProgress()
  const langWords = Object.entries(p.words).filter(([id]) => id.startsWith(language.slice(0, 2)))

  const sessions = p.sessions.filter((s) => s.language === language)
  const totalReviewed = sessions.reduce((sum, s) => sum + s.wordsReviewed, 0)
  const totalCorrect = sessions.reduce((sum, s) => sum + s.correct, 0)

  return {
    wordsLearned: langWords.length,
    totalReviewed,
    totalCorrect,
    sessions: sessions.length,
    accuracy: totalReviewed > 0 ? Math.round((totalCorrect / totalReviewed) * 100) : 0,
  }
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
}
