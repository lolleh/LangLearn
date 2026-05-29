import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getLanguage } from "@/data"
import { recordAnswer, recordSession } from "@/lib/storage"
import Quiz from "@/components/Quiz"

export default function QuizPage() {
  const { slug } = useParams<{ slug: string }>()
  const lang = slug ? getLanguage(slug) : undefined
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)

  if (!lang || !slug) return <p className="text-center text-gray-500">Language not found</p>

  const words = [...lang.words].sort(() => Math.random() - 0.5).slice(0, 10)

  const handleComplete = (correct: number, total: number) => {
    for (const w of words.slice(0, total)) {
      recordAnswer(w.id, true)
    }
    recordSession(slug, total, correct)
    setScore(correct)
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 py-12">
        <p className="text-3xl font-bold text-gray-800">Quiz Complete!</p>
        <p className="text-lg text-gray-600">
          {score} / {words.length} correct
        </p>
        <Link
          to={`/language/${slug}`}
          className="rounded-xl bg-sl-green px-6 py-2 text-white hover:bg-sl-green-dark"
        >
          Back to Language
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <Link to={`/language/${slug}`} className="self-start text-sm text-sl-blue hover:underline">
        &larr; Back
      </Link>
      <Quiz words={words} lang={slug} onComplete={handleComplete} />
    </div>
  )
}
