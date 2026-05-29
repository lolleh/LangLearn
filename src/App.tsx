import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Home from "@/pages/Home"
import LanguagePage from "@/pages/LanguagePage"
import LearnPage from "@/pages/LearnPage"
import QuizPage from "@/pages/QuizPage"
import ProgressPage from "@/pages/ProgressPage"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/language/:slug" element={<LanguagePage />} />
            <Route path="/language/:slug/learn" element={<LearnPage />} />
            <Route path="/language/:slug/quiz" element={<QuizPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
