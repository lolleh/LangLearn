import { useEffect, useState } from "react"
import { languages } from "@/data"
import { getProgress, getLanguageStats } from "@/lib/storage"
import ProgressCard from "@/components/ProgressCard"

export default function ProgressPage() {
  const [stats, setStats] = useState<Record<string, ReturnType<typeof getLanguageStats>>>({})
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const s: Record<string, ReturnType<typeof getLanguageStats>> = {}
    for (const lang of languages) {
      s[lang.slug] = getLanguageStats(lang.slug)
    }
    setStats(s)
    setStreak(getProgress().streak)
  }, [])

  const totalReviewed = Object.values(stats).reduce((sum, s) => sum + s.totalReviewed, 0)
  const totalCorrect = Object.values(stats).reduce((sum, s) => sum + s.totalCorrect, 0)
  const overallAccuracy = totalReviewed > 0 ? Math.round((totalCorrect / totalReviewed) * 100) : 0

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <ProgressCard title="Total Reviews" value={totalReviewed} />
        <ProgressCard title="Overall Accuracy" value={`${overallAccuracy}%`} />
        <ProgressCard title="Day Streak" value={streak} subtitle="consecutive days" />
        <ProgressCard title="Languages" value={Object.keys(stats).length} />
      </div>

      <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Per-Language Breakdown</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {languages.map((lang) => {
            const s = stats[lang.slug]
            if (!s) return null
            return (
              <div key={lang.slug} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-lg font-bold text-gray-800">
                  {lang.flag} {lang.name}
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Words Seen</span>
                    <span className="font-semibold">{s.wordsLearned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sessions</span>
                    <span className="font-semibold">{s.sessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reviews</span>
                    <span className="font-semibold">{s.totalReviewed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Accuracy</span>
                    <span className="font-semibold">{s.accuracy}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Recent Activity</h2>
        {getProgress().sessions.length === 0 ? (
          <p className="text-gray-400">No sessions yet. Start learning!</p>
        ) : (
          <div className="space-y-2">
            {[...getProgress().sessions].reverse().slice(0, 10).map((s, i) => {
              const lang = languages.find((l) => l.slug === s.language)
              return (
                <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span>{lang?.flag || "?"}</span>
                    <span className="font-medium text-gray-700">{s.language}</span>
                    <span className="text-gray-400">{s.date}</span>
                  </div>
                  <span className="text-gray-600">
                    {s.correct}/{s.wordsReviewed} correct
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
