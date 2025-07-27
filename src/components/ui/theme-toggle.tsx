import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ui/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
      <button
        onClick={toggleTheme}
        className={`relative w-16 h-8 sm:w-20 sm:h-10 rounded-full p-1 transition-all duration-500 ease-in-out ${
          theme === "dark" 
            ? "bg-gradient-to-r from-primary via-primary-glow to-primary" 
            : "bg-gradient-to-r from-security via-security-muted to-security"
        }`}
      >
        <div
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-500 ease-in-out transform ${
            theme === "dark" ? "translate-x-8 sm:translate-x-10" : "translate-x-0"
          }`}
        >
          <Sun className={`h-3 w-3 sm:h-4 sm:w-4 text-security transition-all duration-300 ${
            theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
          }`} />
          <Moon className={`absolute h-3 w-3 sm:h-4 sm:w-4 text-primary transition-all duration-300 ${
            theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
          }`} />
        </div>
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  )
}