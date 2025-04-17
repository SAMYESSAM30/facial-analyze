import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // تغيير القيمة الافتراضية إلى "light"
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // التحقق من وجود تفضيلات المستخدم المخزنة
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // تطبيق التفضيل المخزن إذا وجد، وإلا البقاء على الوضع الفاتح
    if (storedTheme) {
      setTheme(storedTheme);
    }
    // يمكنك حذف هذا الشرط إذا كنت تريد تجاهل تفضيلات النظام
    // else if (prefersDark) {
    //   setTheme("dark");
    // }
  }, []);

  useEffect(() => {
    // تحديث class على عنصر document عند تغيير الموضوع
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // تخزين تفضيلات الموضوع
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
