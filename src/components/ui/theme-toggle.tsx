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
        className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full p-0.5 transition-all duration-500 ease-in-out ${
          theme === "dark" 
            ? "bg-gradient-to-r from-primary to-primary-glow" 
            : "bg-gradient-to-r from-security to-primary"
        }`}
      >
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-500 ease-in-out transform ${
            theme === "dark" ? "translate-x-6 sm:translate-x-7" : "translate-x-0"
          }`}
        >
          <Sun className={`h-2.5 w-2.5 sm:h-3 sm:w-3 text-security transition-all duration-300 ${
            theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
          }`} />
          <Moon className={`absolute h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary transition-all duration-300 ${
            theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
          }`} />
        </div>
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  )
}