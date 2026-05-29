import type { Language } from "@/lib/types"
import { chineseWords, chineseSentences } from "./chinese"
import { spanishWords, spanishSentences } from "./spanish"
import { arabicWords, arabicSentences } from "./arabic"

export const languages: Language[] = [
  { slug: "chinese", name: "中文", flag: "🇨🇳", words: chineseWords, sentences: chineseSentences },
  { slug: "spanish", name: "Español", flag: "🇪🇸", words: spanishWords, sentences: spanishSentences },
  { slug: "arabic", name: "العربية", flag: "🇸🇦", words: arabicWords, sentences: arabicSentences },
]

export function getLanguage(slug: string) {
  return languages.find((l) => l.slug === slug)
}
