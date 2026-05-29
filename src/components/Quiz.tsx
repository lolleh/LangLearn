import { useState, useEffect } from "react"
import type { Word } from "@/lib/types"
import SpeakButton from "./SpeakButton"

interface Props {
  words: Word[]
  lang: string
  onComplete: (correct: number, total: number) => void
}

export default function Quiz({ words, onComplete }: Props) {
  const [index, setIndex] = useState(0)
  const [options, setOptions] = useState<Word[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = words[index]

  useEffect(() => {
    if (!current) return
    const others = words.filter((w) => w.id !== current.id).sort(() => Math.random() - 0.5).slice(0, 3)
    setOptions([current, ...others].sort(() => Math.random() - 0.5))
    setSelected(null)
  }, [index, current])

  if (done || !current) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-2xl font-bold text-gray-800">Quiz Complete!</p>
        <p className="text-lg text-gray-600">
          {score} / {words.length} correct
        </p>
        <button
          onClick={() => onComplete(score, words.length)}
          className="rounded-xl bg-sl-green px-6 py-2 text-white hover:bg-sl-green-dark"
        >
          Finish
        </button>
      </div>
    )
  }

  const handleSelect = (word: Word) => {
    if (selected) return
    setSelected(word.id)
    if (word.id === current.id) setScore((s) => s + 1)
  }

  const next = () => {
    if (index + 1 >= words.length) {
      setDone(true)
      onComplete(score, words.length)
    } else {
      setIndex((i) => i + 1)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm text-gray-400">
        {index + 1} / {words.length}
      </p>
      <p className="text-2xl font-semibold text-gray-800">What is "{current.source}"?</p>

      {selected && (
        <SpeakButton text={current.target} lang={lang} />
      )}

      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {options.map((opt) => {
          const isCorrect = opt.id === current.id
          const isSelected = selected === opt.id
          let cls = "rounded-xl border-2 p-4 text-center text-lg font-medium transition cursor-pointer"
          if (isSelected) {
            cls += isCorrect ? " border-green-500 bg-green-50 text-green-700" : " border-red-500 bg-red-50 text-red-700"
          } else if (selected && isCorrect) {
            cls += " border-green-500 bg-green-50 text-green-700"
          } else {
            cls += " border-gray-200 bg-white text-gray-700 hover:border-sl-green"
          }

          return (
            <button key={opt.id} onClick={() => handleSelect(opt)} className={cls}>
              <span className="text-xl">{opt.target}</span>
              {opt.transliteration && <p className="mt-1 text-xs text-gray-400">{opt.transliteration}</p>}
            </button>
          )
        })}
      </div>

      {selected && (
        <button onClick={next} className="rounded-xl bg-sl-green px-8 py-2 text-white hover:bg-sl-green-dark">
          {index + 1 >= words.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  )
}
