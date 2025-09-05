import { Palette, Moon, Eye, Droplets, Cloud, Sparkles, Leaf, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";

const themes = [
  {
    name: "Default",
    value: "default" as const,
    icon: Sparkles,
    description: "Financial Blue theme"
  },
  {
    name: "Dark Mode",
    value: "dark" as const,
    icon: Moon,
    description: "Classic dark theme"
  },
  {
    name: "Night Mode",
    value: "night" as const,
    icon: Moon,
    description: "Deep black for night reading"
  },
  {
    name: "Eye Saver",
    value: "eye-saver" as const,
    icon: Eye,
    description: "Warm, low-strain colors"
  },
  {
    name: "Teal Theme",
    value: "teal" as const,
    icon: Droplets,
    description: "Calming teal and mint"
  },
  {
    name: "Sky Blue",
    value: "sky-blue" as const,
    icon: Cloud,
    description: "Light blue and white"
  },
  {
    name: "Purple",
    value: "purple" as const,
    icon: Sparkles,
    description: "Royal purple theme"
  },
  {
    name: "Green",
    value: "green" as const,
    icon: Leaf,
    description: "Nature-inspired green"
  },
  {
    name: "Orange",
    value: "orange" as const,
    icon: Sun,
    description: "Energetic orange theme"
  },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {currentTheme?.icon && <currentTheme.icon className="h-4 w-4" />}
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">{themeOption.name}</span>
                <span className="text-xs text-muted-foreground">
                  {themeOption.description}
                </span>
              </div>
              {theme === themeOption.value && (
                <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}