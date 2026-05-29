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
      <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/language/:slug" element={<LanguagePage />} />
            <Route path="/language/:slug/learn" element={<LearnPage />} />
            <Route path="/language/:slug/quiz" element={<QuizPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-200 bg-white py-4 text-center text-sm text-gray-400">
          Developed by <a href="https://github.com/lolleh" className="font-medium text-sl-green hover:text-sl-green-dark transition-colors">Vamba Lolleh</a>
        </footer>
      </div>
    </BrowserRouter>
  )
}
