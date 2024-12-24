import { Toaster } from "sonner";
import ColorGenerator from "./palette-generator/ColorGenerator";

export default function Home() {
  return (
    <div className="h-full">
      <div className="container mx-auto py-14">
        <Toaster />
        <ColorGenerator />
      </div>
    </div>
  );
}
