import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getLanguage } from "@/data"
import { getLanguageStats } from "@/lib/storage"
import ProgressCard from "@/components/ProgressCard"
import SpeakButton from "@/components/SpeakButton"

export default function LanguagePage() {
  const { slug } = useParams<{ slug: string }>()
  const lang = slug ? getLanguage(slug) : undefined
  const [stats, setStats] = useState<ReturnType<typeof getLanguageStats> | null>(null)

  useEffect(() => {
    if (slug) setStats(getLanguageStats(slug))
  }, [slug])

  if (!lang || !slug) return <p className="text-center text-gray-500">Language not found</p>

  const categories = [...new Set(lang.words.map((w) => w.category))]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link to="/" className="text-sm text-sl-blue hover:underline">&larr; Back</Link>
        <h1 className="mt-2 text-3xl font-bold">
          {lang.flag} {lang.name}
        </h1>
        <p className="text-gray-500 capitalize">{slug}</p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <ProgressCard title="Words Seen" value={stats.wordsLearned} />
          <ProgressCard title="Accuracy" value={`${stats.accuracy}%`} />
          <ProgressCard title="Sessions" value={stats.sessions} />
          <ProgressCard title="Total Reviews" value={stats.totalReviewed} />
        </div>
      )}

      <div className="flex gap-4">
        <Link
          to={`/language/${slug}/learn`}
          className="flex-1 rounded-xl bg-sl-green py-3 text-center text-white transition hover:bg-sl-green-dark"
        >
          Flashcards
        </Link>
        <Link
          to={`/language/${slug}/quiz`}
          className="flex-1 rounded-xl bg-green-600 py-3 text-center text-white transition hover:bg-green-700"
        >
          Quiz
        </Link>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Vocabulary</h2>
        {categories.map((cat) => (
          <div key={cat} className="mb-6">
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-400">{cat}</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {lang.words
                .filter((w) => w.category === cat)
                .map((w) => (
                  <div key={w.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                    <div>
                      <p className="font-medium text-gray-800">{w.source}</p>
                      <p className="text-lg text-sl-green-dark">{w.target}</p>
                      {w.transliteration && (
                        <p className="text-sm italic text-gray-400">{w.transliteration}</p>
                      )}
                    </div>
                    <SpeakButton text={w.target} lang={slug} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Example Sentences</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {lang.sentences.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
              <div>
                <p className="font-medium text-gray-800">{s.source}</p>
                <p className="text-lg text-sl-green-dark">{s.target}</p>
                {s.transliteration && (
                  <p className="text-sm italic text-gray-400">{s.transliteration}</p>
                )}
              </div>
              <SpeakButton text={s.target} lang={slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
