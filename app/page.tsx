import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import MainCanvas from "./components/canvas/MainCanvas";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainCanvas />
    </div>
  );
}
