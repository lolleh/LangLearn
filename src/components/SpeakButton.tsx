import { useState, useCallback, useEffect } from "react"

interface Props {
  text: string
  lang?: string
  label?: string
}

const VOICE_LANG_MAP: Record<string, string> = {
  chinese: "zh-CN",
  spanish: "es-ES",
  arabic: "ar-SA",
}

export default function SpeakButton({ text, lang, label }: Props) {
  const [speaking, setSpeaking] = useState(false)
  const [voicesReady, setVoicesReady] = useState(false)

  useEffect(() => {
    if (!("speechSynthesis" in window)) return
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      setVoicesReady(true)
      return
    }
    const handler = () => {
      setVoicesReady(true)
    }
    window.speechSynthesis.addEventListener("voiceschanged", handler)
    return () => window.speechSynthesis.removeEventListener("voiceschanged", handler)
  }, [])

  const speak = useCallback(() => {
    if (speaking) return
    if (!("speechSynthesis" in window)) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    const voiceLang = lang ? VOICE_LANG_MAP[lang] || lang : undefined
    if (voiceLang) utterance.lang = voiceLang

    utterance.rate = 0.7
    utterance.pitch = 0.9
    utterance.volume = 1

    const voices = window.speechSynthesis.getVoices()
    const maleVoice =
      voices.find(
        (v) =>
          (voiceLang ? v.lang.startsWith(voiceLang.split("-")[0]) : true) &&
          /male/i.test(v.name),
      ) || voices.find((v) => (voiceLang ? v.lang.startsWith(voiceLang.split("-")[0]) : true))
    if (maleVoice) utterance.voice = maleVoice

    setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [text, lang, speaking])

  if (!("speechSynthesis" in window)) return null

  return (
    <button
      onClick={speak}
      disabled={speaking}
      className="inline-flex items-center gap-1 rounded-lg bg-sl-blue-light px-2.5 py-1.5 text-sm font-medium text-sl-blue transition hover:bg-sl-blue hover:text-white disabled:opacity-50"
      title={`Listen to pronunciation`}
    >
      {speaking ? (
        <svg className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-8.485-1.657a8 8 0 010-11.314" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m-2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
      {label || (speaking ? "Playing..." : "Listen")}
    </button>
  )
}
