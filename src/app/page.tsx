import ColorPaletteGenerator from "./components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <ColorPaletteGenerator />
      </div>
    </div>
  );
}
