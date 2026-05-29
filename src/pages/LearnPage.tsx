import { useState, useCallback } from "react"
import { Link, useParams } from "react-router-dom"
import { getLanguage } from "@/data"
import { recordAnswer, recordSession } from "@/lib/storage"
import Flashcard from "@/components/Flashcard"

export default function LearnPage() {
  const { slug } = useParams<{ slug: string }>()
  const lang = slug ? getLanguage(slug) : undefined
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  if (!lang || !slug) return <p className="text-center text-gray-500">Language not found</p>

  const words = [...lang.words].sort(() => Math.random() - 0.5)

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      recordAnswer(words[index].id, isCorrect)
      const newCorrect = isCorrect ? correct + 1 : correct

      if (index + 1 >= words.length) {
        recordSession(slug, words.length, newCorrect)
        setCorrect(newCorrect)
        setDone(true)
      } else {
        setCorrect(newCorrect)
        setIndex((i) => i + 1)
      }
    },
    [index, words, correct, slug]
  )

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 py-12">
        <p className="text-3xl font-bold text-gray-800">Session Complete!</p>
        <p className="text-lg text-gray-600">
          {correct} / {words.length} correct
        </p>
        <div className="flex gap-4">
          <Link
            to={`/language/${slug}`}
            className="rounded-xl bg-sl-green px-6 py-2 text-white hover:bg-sl-green-dark"
          >
            Back to Language
          </Link>
          <button
            onClick={() => { setIndex(0); setCorrect(0); setDone(false) }}
            className="rounded-xl border-2 border-sl-green px-6 py-2 text-sl-blue hover:bg-sl-green-light"
          >
            Review Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <Link to={`/language/${slug}`} className="self-start text-sm text-sl-blue hover:underline">
        &larr; Back
      </Link>
      <p className="text-sm text-gray-400">
        {index + 1} / {words.length}
      </p>
      <Flashcard word={words[index]} lang={slug} onAnswer={handleAnswer} />
    </div>
  )
}
