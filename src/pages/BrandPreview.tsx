import Logo from "@/components/Logo";

const faviconSizes = [
  { src: "/favicon.svg", label: "SVG (vector)", size: 64 },
  { src: "/favicon-16.png", label: "16×16", size: 16 },
  { src: "/favicon-32.png", label: "32×32", size: 32 },
  { src: "/favicon-48.png", label: "48×48", size: 48 },
  { src: "/apple-touch-icon.png", label: "180×180 (Apple)", size: 180 },
  { src: "/favicon-192.png", label: "192×192", size: 192 },
  { src: "/favicon-512.png", label: "512×512", size: 512 },
];

const BrandPreview = () => {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">DeployMate — Brand preview</h1>
        <p className="text-muted-foreground">
          Logo light/dark + favicon set. Browser tab icon: nézd meg a fület fent.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Logo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-10 flex items-center justify-center border">
            <img
              src={new URL("../assets/deploymate-logo.png", import.meta.url).href}
              alt="DeployMate logo light"
              className="h-16 w-auto"
            />
          </div>
          <div className="bg-[#030712] rounded-lg p-10 flex items-center justify-center border">
            <img
              src={new URL("../assets/deploymate-logo-dark.png", import.meta.url).href}
              alt="DeployMate logo dark"
              className="h-16 w-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-sm text-gray-600 mb-3">Logo komponens — light</p>
            <div className="not-dark"><Logo className="h-8 w-auto" /></div>
          </div>
          <div className="dark bg-[#030712] rounded-lg p-6 border">
            <p className="text-sm text-white/70 mb-3">Logo komponens — dark</p>
            <Logo className="h-8 w-auto" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Favicon set</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {faviconSizes.map((f) => (
            <div
              key={f.src}
              className="bg-white rounded-lg p-4 border flex flex-col items-center gap-2"
            >
              <div
                className="flex items-center justify-center bg-[#030712] rounded"
                style={{ width: Math.min(f.size, 96), height: Math.min(f.size, 96) }}
              >
                <img
                  src={f.src}
                  alt={f.label}
                  style={{
                    width: Math.min(f.size, 96),
                    height: Math.min(f.size, 96),
                    imageRendering: f.size <= 32 ? "pixelated" : "auto",
                  }}
                />
              </div>
              <span className="text-xs text-gray-700">{f.label}</span>
              <code className="text-[10px] text-gray-500">{f.src}</code>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Tényleges méretben (1:1)</h3>
          <div className="flex flex-wrap items-end gap-6 bg-[#030712] p-6 rounded-lg border">
            {faviconSizes
              .filter((f) => f.src.endsWith(".png"))
              .map((f) => (
                <div key={f.src} className="flex flex-col items-center gap-1">
                  <img
                    src={f.src}
                    alt={f.label}
                    width={f.size}
                    height={f.size}
                    style={{ imageRendering: f.size <= 32 ? "pixelated" : "auto" }}
                  />
                  <span className="text-[10px] text-white/60">{f.label}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Böngésző tab szimuláció</h3>
          <div className="bg-gray-200 rounded-t-lg p-2 flex items-center gap-2 max-w-md border">
            <div className="bg-white rounded px-3 py-1.5 flex items-center gap-2 text-xs shadow">
              <img src="/favicon-32.png" width={16} height={16} alt="" />
              <span>DeployMate — QA-Driven Release…</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandPreview;
