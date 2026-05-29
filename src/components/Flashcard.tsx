import { useState } from "react"
import type { Word } from "@/lib/types"
import SpeakButton from "./SpeakButton"

interface Props {
  word: Word
  lang: string
  onAnswer: (correct: boolean) => void
}

export default function Flashcard({ word, lang, onAnswer }: Props) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={() => setFlipped(!flipped)}
        className="flex h-64 w-80 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-sl-green-light bg-white p-6 shadow-lg transition-transform hover:scale-[1.02]"
      >
        {flipped ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-sl-green-dark">{word.target}</p>
            {word.transliteration && (
              <p className="mt-2 text-lg text-gray-500 italic">{word.transliteration}</p>
            )}
            <div className="mt-4 flex justify-center">
              <SpeakButton text={word.target} lang={lang} />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-3xl font-semibold text-gray-800">{word.source}</p>
            <p className="mt-2 text-sm text-gray-400">Tap to reveal</p>
          </div>
        )}
      </button>

      {flipped && (
        <div className="flex gap-4">
          <button
            onClick={() => {
              setFlipped(false)
              onAnswer(false)
            }}
            className="rounded-xl bg-red-500 px-6 py-2 text-white transition hover:bg-red-600"
          >
            Still Learning
          </button>
          <button
            onClick={() => {
              setFlipped(false)
              onAnswer(true)
            }}
            className="rounded-xl bg-green-500 px-6 py-2 text-white transition hover:bg-green-600"
          >
            Got It
          </button>
        </div>
      )}
    </div>
  )
}
