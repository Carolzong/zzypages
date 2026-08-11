import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "剧作台 · AI 短剧素材工作台",
  description: "整理短剧素材、拆解叙事、孵化 AI 产品灵感。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
