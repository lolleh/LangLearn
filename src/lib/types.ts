export interface Word {
  id: string
  source: string
  target: string
  transliteration?: string
  category: string
}

export interface Sentence {
  id: string
  source: string
  target: string
  transliteration?: string
}

export interface Language {
  slug: string
  name: string
  flag: string
  words: Word[]
  sentences: Sentence[]
}

export interface WordProgress {
  wordId: string
  correct: number
  incorrect: number
  lastReviewed: string | null
  nextReview: string | null
}

export interface Session {
  date: string
  language: string
  wordsReviewed: number
  correct: number
  incorrect: number
}

export interface Progress {
  words: Record<string, WordProgress>
  sessions: Session[]
  streak: number
  lastActiveDate: string | null
}
