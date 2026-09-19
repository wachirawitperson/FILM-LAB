const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX = 30 * 1024 * 1024;
const LIMIT = 1400;

const STORAGE_KEYS = {
  FAVORITES: "filmlab-favorites",
  RECENT: "filmlab-recent",
  CUSTOM: "filmlab-custom-presets",
  THEME: "filmlab_theme"
};

const cats = [
  ["ALL", "All Looks"],
  ["CUSTOM", "Custom"],
  ["FAVORITES", "★ Favorites"],
  ["WARM", "Warm"],
  ["SOFT", "Soft"],
  ["VINTAGE", "Vintage"],
  ["90S", "90s / 1998"],
  ["JAPANESE", "Japanese"],
  ["FLASH", "Flash"],
  ["NIGHT", "Night"],
  ["CINEMATIC", "Cinematic"],
  ["BW", "B&W"],
  ["KODAK_FILM", "Kodak Film"]
];

const PRIMARY_CATS = [
  ["ALL", "All Looks"],
  ["FAVORITES", "★ Favorites"],
  ["WARM", "Warm"],
  ["SOFT", "Soft"],
  ["VINTAGE", "Vintage"]
];

const MORE_CATS = [
  ["90S", "90s / 1998"],
  ["JAPANESE", "Japanese"],
  ["FLASH", "Flash"],
  ["NIGHT", "Night"],
  ["CINEMATIC", "Cinematic"],
  ["BW", "B&W"],
  ["KODAK_FILM", "Kodak Film"]
];


const moods = [
  ["ALL", "All Moods"],
  ["WARM", "Warm"],
  ["SOFT", "Soft"],
  ["VINTAGE", "Vintage"],
  ["FLASH", "Flash"],
  ["GREEN", "Green"],
  ["NIGHT", "Night"],
  ["CINEMATIC", "Cinematic"],
  ["BW", "B&W"],
  ["KODAK", "Kodak Film"]
];

const base = {
  exposure: 0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  temperature: 0,
  tint: 0,
  saturation: 0,
  fade: 0,
  grain: 0,
  vignette: 0,
  halation: 0,
  bloom: 0,
  colorBias: [0, 0, 0],
  lightLeak: 0,
  border: "none",
  softness: 0
};

const DEFAULT_ADJUSTMENTS = {
  exposure: 0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  temperature: 0,
  tint: 0,
  saturation: 0
};

const DEFAULT_EFFECTS = {
  grain: 0,
  vignette: 0,
  halation: 0,
  bloom: 0,
  fade: 0,
  lightLeak: 0,
  border: "none",
  softness: 0
};

const adjustKeys = ["exposure", "contrast", "highlights", "shadows", "temperature", "tint", "saturation"];
const lightKeys = ["exposure", "contrast", "highlights", "shadows"];
const colorKeys = ["temperature", "tint", "saturation"];
const effectKeys = ["grain", "vignette", "halation", "bloom", "fade", "lightLeak"];


const L = (id, name, category, description, settings, recommendedFor = [], metadata = {}) => ({
  id,
  name,
  category,
  description,
  ...base,
  ...settings,
  recommendedFor,
  thumbnail: { crop: "center" },
  collection: metadata.collection || (category === "1998" ? "1998 CAM" : category === "KODAK_FILM" ? "Kodak Film" : category),
  character: metadata.character || description,
  manufacturer: metadata.manufacturer || "Kodak",
  stock: metadata.stock || null,
  format: metadata.format || "35mm",
  type: metadata.type || "Color Negative",
  balance: metadata.balance || "Daylight",
  iso: metadata.iso || 100,
  era: metadata.era || "Modern",
  stockSubtitle: metadata.stockSubtitle || (metadata.stock ? `${metadata.stock} · ${metadata.balance || metadata.type || "Cinema"}` : null),
  group: metadata.group || "Standard",
  warmthProfile: metadata.warmthProfile || "neutral",
  contrastProfile: metadata.contrastProfile || "medium",
  grainProfile: metadata.grainProfile || "fine",
  softnessProfile: metadata.softnessProfile || "none"
});


const presetLibrary = Object.freeze([
  L("1998-warm", "1998 Warm", "1998", "Nostalgic compact-camera golden daylight", { contrast: 4, highlights: -10, shadows: 6, temperature: 13, tint: 2, saturation: 8, fade: 5, grain: 9, vignette: 6, halation: 4, bloom: 3, colorBias: [8, 3, -5] }, ["everyday", "daylight", "golden-hour"], { group: "FAVORITES" }),
  L("1998-soft", "1998 Soft", "1998", "Gentle contrast with creamy lifted tones", { exposure: 2, contrast: -18, highlights: -16, shadows: 15, temperature: 4, tint: 1, saturation: -14, fade: 12, grain: 4, bloom: 7, colorBias: [4, 2, -1] }, ["portrait", "morning", "indoor"], { group: "FAVORITES" }),
  L("1998-retro", "1998 Retro", "1998", "Faded 90s snapshot with amber tint and matte shadows", { contrast: -6, highlights: -12, shadows: 8, temperature: 9, tint: -3, saturation: -8, fade: 16, grain: 14, vignette: 8, halation: 6, colorBias: [7, 5, -8] }, ["vacation", "vintage", "street"], { group: "FAVORITES" }),
  L("1998-classic", "1998 Classic", "1998", "Balanced point-and-shoot color with crisp natural daylight", { contrast: 8, highlights: -6, shadows: 3, temperature: 3, tint: 0, saturation: 12, fade: 3, grain: 7, vignette: 4, colorBias: [2, 2, -2] }, ["everyday", "street", "travel"], { group: "FAVORITES" }),
  L("1998-portrait", "1998 Portrait", "1998", "Flattering creamy skin tone with soft highlight roll-off", { exposure: 2, contrast: -8, highlights: -18, shadows: 10, temperature: 6, tint: 4, saturation: 2, fade: 6, grain: 5, bloom: 6, colorBias: [6, 1, -3] }, ["portrait", "people", "golden-hour"], { group: "PORTRAIT" }),
  L("1998-portrait-soft", "1998 Portrait Soft", "1998", "Delicate open shadows and luminous soft skin finish", { exposure: 3, contrast: -20, highlights: -22, shadows: 16, temperature: 5, tint: 2, saturation: -10, fade: 14, grain: 3, bloom: 9, colorBias: [5, 3, 0] }, ["portrait", "studio", "indoor"], { group: "PORTRAIT" }),
  L("1998-portrait-warm", "1998 Portrait Warm", "1998", "Golden-hour compact warmth without orange skin cast", { exposure: 1, contrast: -5, highlights: -14, shadows: 8, temperature: 14, tint: 3, saturation: 4, fade: 5, grain: 6, halation: 5, bloom: 4, colorBias: [9, 2, -6] }, ["portrait", "sunset", "lifestyle"], { group: "PORTRAIT" }),
  L("1998-portrait-flash", "1998 Portrait Flash", "1998", "Direct compact flash portrait with crisp pop and dark edges", { exposure: 4, contrast: 12, highlights: -4, shadows: -4, temperature: 2, tint: 5, saturation: 11, grain: 11, vignette: 10, halation: 7, bloom: 4, colorBias: [5, 0, -2] }, ["flash", "party", "night"], { group: "PORTRAIT" }),
  L("1998-green", "1998 Green", "1998", "Lush emerald foliage with nostalgic warm skies", { contrast: 6, highlights: -14, shadows: 6, temperature: -2, tint: -9, saturation: 14, grain: 5, vignette: 4, colorBias: [-4, 12, -2] }, ["nature", "landscape", "outdoor"], { group: "LANDSCAPE" }),
  L("1998-summer", "1998 Summer", "1998", "Sun-warmed vacation landscape with cyan skies and golden earth", { exposure: 3, contrast: 5, highlights: -10, shadows: 8, temperature: 11, tint: -2, saturation: 16, fade: 6, grain: 8, vignette: 7, halation: 6, colorBias: [8, 4, -5] }, ["vacation", "beach", "summer"], { group: "LANDSCAPE" }),
  L("1998-travel", "1998 Travel", "1998", "Vibrant, rich landscape separation with compact-camera depth", { exposure: 1, contrast: 14, highlights: -8, shadows: 2, temperature: 4, tint: -1, saturation: 22, fade: 3, grain: 7, vignette: 6, colorBias: [4, 4, -4] }, ["travel", "city", "outdoor"], { group: "LANDSCAPE" }),
  L("1998-landscape-retro", "1998 Landscape Retro", "1998", "Faded postcard landscape with lifted dynamic range", { contrast: -12, highlights: -12, shadows: 12, temperature: 7, tint: -4, saturation: -6, fade: 15, grain: 10, vignette: 9, colorBias: [4, 7, -2] }, ["vintage", "mountain", "roadtrip"], { group: "LANDSCAPE" }),
  L("1998-quiet", "1998 Quiet", "1998", "Understated calm mood with muted tones and cool morning cast", { contrast: -14, highlights: -10, shadows: 8, temperature: -10, tint: 2, saturation: -24, fade: 10, grain: 4, colorBias: [-3, 1, 8] }, ["morning", "minimal", "street"], { group: "MOOD" }),
  L("1998-dream", "1998 Dream", "1998", "Hazy dreamscape with prominent highlight bloom and nostalgic haze", { exposure: 3, contrast: -16, highlights: -20, shadows: 14, temperature: 7, tint: 6, saturation: -8, fade: 12, grain: 6, bloom: 14, halation: 6, colorBias: [6, 2, 0] }, ["dreamy", "portrait", "nostalgic"], { group: "MOOD" }),
  L("1998-faded", "1998 Faded", "1998", "Sun-bleached matte finish with washed darks and gentle warmth", { exposure: 2, contrast: -22, highlights: -8, shadows: 18, temperature: 5, tint: 1, saturation: -18, fade: 24, grain: 9, vignette: 4, colorBias: [4, 3, -1] }, ["vintage", "daylight", "retro"], { group: "MOOD" }),
  L("1998-blue", "1998 Blue", "1998", "Moody dusk cyan-blue cast with cool shadow tinting", { exposure: -1, contrast: 4, highlights: -12, shadows: 4, temperature: -20, tint: -2, saturation: -8, fade: 5, grain: 6, vignette: 8, colorBias: [-6, -1, 14] }, ["dusk", "city", "overcast"], { group: "MOOD" }),
  L("1998-pop", "1998 Pop", "1998", "Bold saturated 90s commercial color pop with punchy contrast", { exposure: 2, contrast: 16, highlights: -5, shadows: -2, temperature: 3, tint: 4, saturation: 28, grain: 8, vignette: 5, colorBias: [5, 4, -3] }, ["lifestyle", "party", "travel"], { group: "COLOR BOOST" }),
  L("1998-candy", "1998 Candy", "1998", "Playful vibrant magenta-warm tint with bright luminous tones", { exposure: 3, contrast: 8, highlights: -10, shadows: 6, temperature: 4, tint: 14, saturation: 22, fade: 4, grain: 7, bloom: 6, colorBias: [8, 0, 4] }, ["fashion", "portrait", "summer"], { group: "COLOR BOOST" }),
  L("1998-vivid", "1998 Vivid", "1998", "Energetic color separation with striking reds, blues, and yellows", { exposure: 1, contrast: 20, highlights: -2, shadows: -6, temperature: 1, tint: -2, saturation: 32, grain: 6, vignette: 6, colorBias: [4, 6, -5] }, ["travel", "street", "architecture"], { group: "COLOR BOOST" }),
  L("1998-party", "1998 Party", "1998", "Loud snapshot energy with intense saturation and flash halation", { exposure: 4, contrast: 15, highlights: 2, shadows: -4, temperature: 6, tint: 8, saturation: 26, grain: 15, vignette: 12, halation: 10, bloom: 4, colorBias: [6, 2, -4] }, ["party", "night", "event"], { group: "COLOR BOOST" }),
  L("1998-flash", "1998 Flash", "1998", "Direct flash snapshot with high subject pop and deep background falloff", { exposure: 5, contrast: 18, highlights: 4, shadows: -12, temperature: -2, tint: 4, saturation: 10, grain: 18, vignette: 20, halation: 8, bloom: 4, colorBias: [3, 0, -2] }, ["flash", "night", "party"], { group: "PRO / SPECIAL" }),
  L("1998-night", "1998 Night", "1998", "Atmospheric night photography with warm street lamps against cool shadows", { exposure: -2, contrast: 14, highlights: -8, shadows: -8, temperature: -12, tint: 4, saturation: 4, grain: 12, vignette: 16, halation: 12, bloom: 8, colorBias: [-5, 0, 10] }, ["night", "city", "street"], { group: "PRO / SPECIAL" }),
  L("1998-night-color", "1998 Night Color", "1998", "Vibrant neon and street glow with rich contrast and luminous highlights", { exposure: 1, contrast: 16, highlights: -6, shadows: -10, temperature: -8, tint: 9, saturation: 18, grain: 14, vignette: 15, halation: 14, bloom: 9, colorBias: [-2, 2, 8] }, ["neon", "night", "city"], { group: "PRO / SPECIAL" }),
  L("1998-cinema-compact", "1998 Cinema Compact", "1998", "35mm point-and-shoot cinematic grade with teal & amber balance", { contrast: 18, highlights: -18, shadows: -4, temperature: 10, tint: -4, saturation: -6, fade: 4, grain: 7, vignette: 14, halation: 7, bloom: 3, colorBias: [8, 0, -8] }, ["cinematic", "portrait", "golden-hour"], { group: "PRO / SPECIAL" }),
  L("golden-200", "Golden 200", "KODAK", "Warm nostalgic daylight", { contrast: 2, highlights: -13, shadows: 7, temperature: 14, tint: 2, saturation: 10, fade: 4, grain: 8, vignette: 4, halation: 5, bloom: 3, colorBias: [10, 4, -6] }, ["outdoor", "daylight", "portrait"]),
  L("warm-portrait", "Warm Portrait", "KODAK", "Soft warmth for skin tones", { contrast: -12, highlights: -16, shadows: 12, temperature: 10, tint: 6, saturation: 1, fade: 6, bloom: 6, colorBias: [8, 1, -3] }, ["portrait", "golden-hour"]),
  L("soft-portrait", "Soft Portrait", "KODAK", "Gentle contrast and cream light", { contrast: -22, highlights: -20, shadows: 17, temperature: 7, tint: 1, saturation: -12, fade: 14, grain: 2, bloom: 9, colorBias: [6, 3, -1] }, ["portrait", "indoor"]),
  L("classic-color", "Classic Color", "KODAK", "Balanced everyday color", { contrast: 9, highlights: -7, shadows: 2, temperature: 2, saturation: 13, grain: 6, vignette: 2 }, ["everyday", "daylight"]),
  L("fresh-green", "Fresh Green", "FUJI", "Fresh green foliage and clear highlights", { contrast: 7, highlights: -15, shadows: 5, temperature: -2, tint: -8, saturation: 11, grain: 2, colorBias: [-5, 13, -3] }, ["nature", "daylight"]),
  L("cool-natural", "Cool Natural", "FUJI", "Muted editorial coolness", { contrast: -9, highlights: -9, shadows: 3, temperature: -15, tint: 2, saturation: -16, fade: 3, grain: 3, colorBias: [-4, 1, 9] }, ["street", "overcast"]),
  L("pastel-green", "Pastel Green", "FUJI", "Airy lifted pastel greens", { exposure: 3, contrast: -22, highlights: -18, shadows: 18, temperature: 2, tint: -12, saturation: -28, fade: 18, grain: 2, bloom: 7, colorBias: [4, 8, 1] }, ["nature", "portrait"]),
  L("vivid-color", "Vivid Color", "FUJI", "Punchy, energetic color separation", { contrast: 19, highlights: -4, shadows: -9, temperature: -1, tint: -2, saturation: 30, grain: 5, vignette: 4, colorBias: [3, 5, -4] }, ["travel", "daylight"]),
  L("soft-japanese", "Soft Japanese", "JAPANESE", "Airy and understated", { contrast: -18, highlights: -15, shadows: 15, temperature: 2, saturation: -16, fade: 12, bloom: 7, colorBias: [2, 1, 3] }, ["portrait", "morning"]),
  L("cream", "Cream", "JAPANESE", "Warm creamy light", { contrast: -16, highlights: -18, shadows: 10, temperature: 14, tint: 3, saturation: -9, fade: 10, bloom: 8, colorBias: [9, 5, -1] }, ["portrait", "indoor"]),
  L("milk", "Milk", "JAPANESE", "Milky washed color", { exposure: 6, contrast: -27, highlights: -10, shadows: 20, temperature: 1, saturation: -28, fade: 25, bloom: 6, colorBias: [4, 4, 4] }, ["portrait", "overcast"]),
  L("quiet-morning", "Quiet Morning", "JAPANESE", "Cool muted dawn", { contrast: -10, highlights: -13, shadows: 12, temperature: -13, tint: 1, saturation: -22, fade: 12, grain: 3, colorBias: [-3, 0, 9] }, ["morning", "street"]),
  L("90s-disposable", "90s Disposable", "DISPOSABLE", "Bright casual snapshots", { exposure: 3, contrast: 10, temperature: 7, saturation: 14, fade: 5, grain: 14, vignette: 9, halation: 5 }, ["party", "daylight"]),
  L("night-flash", "Night Flash", "DISPOSABLE", "Hard flash with dark edges", { exposure: 4, contrast: 17, shadows: -9, temperature: -3, saturation: 9, grain: 19, vignette: 18, halation: 7, bloom: 5 }, ["night", "party"]),
  L("party-flash", "Party Flash", "DISPOSABLE", "Loud night color", { exposure: 5, contrast: 12, temperature: 5, tint: 9, saturation: 22, grain: 17, vignette: 12, halation: 8 }, ["party", "night"]),
  L("warm-disposable", "Warm Disposable", "DISPOSABLE", "Sun-warmed holiday camera", { exposure: 3, contrast: 5, temperature: 13, saturation: 12, fade: 6, grain: 13, vignette: 9, halation: 8 }, ["vacation", "sunset"]),
  L("90s-warm", "90s Warm", "Y2K", "A familiar warm family album", { contrast: 3, temperature: 11, saturation: 9, fade: 7, grain: 8, vignette: 4 }, ["family", "daylight"]),
  L("90s-flash", "90s Flash", "Y2K", "Direct flash and saturated color", { exposure: 4, contrast: 13, temperature: 4, saturation: 17, grain: 13, vignette: 10, halation: 5 }, ["party", "indoor"]),
  L("y2k-flash", "Y2K Flash", "Y2K", "Cool silver digital flash", { exposure: 3, contrast: 9, temperature: -8, tint: 5, saturation: 10, fade: 4, grain: 8, vignette: 8, bloom: 3 }, ["night", "flash"]),
  L("ccd-cool", "CCD Cool", "Y2K", "Early digital blue cast", { contrast: 8, temperature: -14, saturation: 6, fade: 5, grain: 7 }, ["street", "night"]),
  L("cinema-warm", "Cinema Warm", "CINEMATIC", "Deep warm editorial color", { contrast: 18, highlights: -21, shadows: -2, temperature: 15, saturation: -7, fade: 4, grain: 5, vignette: 14, halation: 5, bloom: 3, colorBias: [10, 2, -8] }, ["portrait", "golden-hour"]),
  L("cinema-cool", "Cinema Cool", "CINEMATIC", "Moody cool contrast", { contrast: 21, highlights: -18, shadows: -10, temperature: -17, tint: -3, saturation: -14, fade: 2, grain: 6, vignette: 15, bloom: 2, colorBias: [-7, 0, 11] }, ["city", "overcast"]),
  L("tungsten", "Tungsten", "CINEMATIC", "Amber lamps against blue shadow", { contrast: 13, highlights: -7, shadows: -12, temperature: -24, tint: 7, saturation: 6, grain: 8, vignette: 12, halation: 12, bloom: 8, colorBias: [-8, 0, 14] }, ["night", "indoor"]),
  L("blue-hour", "Blue Hour", "CINEMATIC", "A soft after-sunset blue", { contrast: -3, highlights: -17, shadows: 8, temperature: -23, tint: 2, saturation: -10, fade: 8, grain: 4, vignette: 7, bloom: 5, colorBias: [-5, 0, 14] }, ["dusk", "city"]),
  L("classic-bw", "Classic B&W", "BW", "Timeless monochrome", { contrast: 13, highlights: -8, shadows: 4, saturation: -100, grain: 7, vignette: 5 }, ["street", "portrait"]),
  L("soft-bw", "Soft B&W", "BW", "Open shadows, gentle gray", { contrast: -15, highlights: -14, shadows: 18, saturation: -100, fade: 12, grain: 3, bloom: 5 }, ["portrait", "overcast"]),
  L("high-contrast-bw", "High Contrast B&W", "BW", "Bold black and white", { contrast: 35, highlights: 4, shadows: -16, saturation: -100, grain: 7, vignette: 12 }, ["architecture", "street"]),
  L("grainy-bw", "Grainy B&W", "BW", "Textured monochrome", { contrast: 18, highlights: -4, shadows: -5, saturation: -100, fade: 3, grain: 35, vignette: 15 }, ["street", "night"]),
  L("pink-dream", "Pink Dream", "CREATIVE", "Soft candy-pink haze", { contrast: -10, shadows: 9, temperature: 6, tint: 18, saturation: 5, fade: 10, grain: 5, bloom: 8 }, ["portrait", "dreamy"]),
  L("faded-color", "Faded Color", "CREATIVE", "Sun-softened color", { contrast: -17, shadows: 12, saturation: -20, fade: 18, grain: 8, vignette: 3 }, ["daylight", "vintage"]),
  L("washed-film", "Washed Film", "CREATIVE", "A pale washed frame", { exposure: 5, contrast: -20, shadows: 15, temperature: 2, saturation: -23, fade: 22, grain: 6, bloom: 5 }, ["summer", "portrait"]),
  L("retro-pop", "Retro Pop", "CREATIVE", "Punchy playful color", { contrast: 16, temperature: 4, tint: 8, saturation: 25, grain: 9, vignette: 6, halation: 4 }, ["party", "travel"]),

  // --- KODAK FILM COLLECTION (13 Digital Interpretations) ---
  L("kodak-vision3-50d", "Kodak Vision3 50D", "KODAK_FILM", "5203 · DAYLIGHT · Fine-grain daylight cinema with clean natural skin tones", { contrast: 6, highlights: -14, shadows: 4, temperature: 4, tint: 0, saturation: 4, fade: 2, grain: 4, vignette: 4, halation: 3, bloom: 2, colorBias: [4, 2, -2] }, ["daylight", "portrait", "landscape", "bright-exterior", "cinematic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5203 / 7203", format: "35mm / 16mm", type: "Color Negative", balance: "Daylight", iso: 50, era: "Modern", character: "Fine-grain daylight cinema with natural skin tones and soft highlight roll-off", stockSubtitle: "5203 · DAYLIGHT" }),
  L("kodak-vision3-250d", "Kodak Vision3 250D", "KODAK_FILM", "5207 · DAYLIGHT · Versatile organic daylight stock with rich latitude", { exposure: 1, contrast: 8, highlights: -12, shadows: 3, temperature: 6, tint: 1, saturation: 7, fade: 3, grain: 7, vignette: 5, halation: 4, bloom: 3, colorBias: [6, 2, -3] }, ["daylight", "portrait", "street", "documentary", "cinematic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5207 / 7207", format: "35mm / 16mm", type: "Color Negative", balance: "Daylight", iso: 250, era: "Modern", character: "Versatile daylight motion picture stock with balanced tonality and organic warmth", stockSubtitle: "5207 · DAYLIGHT" }),
  L("kodak-vision3-200t", "Kodak Vision3 200T", "KODAK_FILM", "5213 · TUNGSTEN · Smooth skin rendition with warm practical highlights and cool shadows", { exposure: 1, contrast: 10, highlights: -10, shadows: -2, temperature: -8, tint: 4, saturation: 5, fade: 3, grain: 8, vignette: 8, halation: 6, bloom: 4, colorBias: [4, 1, 6] }, ["interior", "mixed-light", "golden-hour", "portrait", "cinematic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5213 / 7213", format: "35mm / 16mm", type: "Color Negative", balance: "Tungsten", iso: 200, era: "Modern", character: "Tungsten studio negative with smooth skin rendition and controlled warm highlights", stockSubtitle: "5213 · TUNGSTEN" }),
  L("kodak-vision3-500t", "Kodak Vision3 500T", "KODAK_FILM", "5219 · TUNGSTEN · Flagship low-light cinema look with subtle halation and deep ambient shadows", { exposure: 0, contrast: 14, highlights: -8, shadows: -6, temperature: -14, tint: 6, saturation: 10, fade: 4, grain: 12, vignette: 12, halation: 10, bloom: 6, colorBias: [5, -1, 10] }, ["night", "interior", "low-light", "neon", "cinematic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5219 / 7219", format: "35mm / 16mm", type: "Color Negative", balance: "Tungsten", iso: 500, era: "Modern", character: "Flagship cinematic low-light stock with warm practical highlights and rich cool shadows", stockSubtitle: "5219 · TUNGSTEN" }),
  L("eastman-5248", "Eastman 5248", "KODAK_FILM", "5248 · 1950s · Golden age Hollywood palette with painterly pastel warmth", { exposure: 2, contrast: -10, highlights: -18, shadows: 12, temperature: 14, tint: 4, saturation: -4, fade: 12, grain: 6, bloom: 8, halation: 5, colorBias: [10, 3, -6] }, ["vintage", "portrait", "daylight", "nostalgic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5248", format: "35mm", type: "Color Negative", balance: "Daylight / Tungsten", iso: 25, era: "1950s Golden Era", character: "Golden age Hollywood Technicolor-era stock with lush warm reds and painterly contrast", stockSubtitle: "5248 · 1950s" }),
  L("kodak-5247", "Kodak 5247", "KODAK_FILM", "5247 · 1970s–80s · Expressive shadows with dreamlike golden-hour amber tones", { exposure: 1, contrast: 12, highlights: -14, shadows: 4, temperature: 11, tint: -2, saturation: 8, fade: 6, grain: 10, vignette: 9, halation: 8, bloom: 5, colorBias: [9, 4, -7] }, ["golden-hour", "portrait", "landscape", "dreamy", "vintage"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5247", format: "35mm", type: "Color Negative", balance: "Tungsten", iso: 100, era: "1970s–1980s Cinema", character: "The look of 1970s and 80s cinema with rich expressive shadows and magic-hour amber warmth", stockSubtitle: "5247 · 1970s–80s" }),
  L("kodak-5384", "Kodak 5384", "KODAK_FILM", "5384 · PRINT STOCK · Atmospheric thriller tonality with cool shadows and clinical precision", { exposure: -1, contrast: 18, highlights: -12, shadows: -8, temperature: -20, tint: -4, saturation: -6, fade: 3, grain: 6, vignette: 14, halation: 4, bloom: 3, colorBias: [-7, 2, 12] }, ["night", "urban", "thriller", "cool", "cinematic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5384", format: "35mm", type: "Print Stock", balance: "Neutral / Cool", iso: 6, era: "1980s–1990s Print", character: "Cinematic print stock with clinical coolness, stylized shadows, and atmospheric thriller edge", stockSubtitle: "5384 · PRINT STOCK" }),
  L("kodak-exr", "Kodak EXR", "KODAK_FILM", "EXR 5298 · 1990s · Crisp 90s T-Grain separation with fine low-light clarity", { exposure: 0, contrast: 15, highlights: -10, shadows: -4, temperature: -6, tint: 3, saturation: 6, fade: 4, grain: 9, vignette: 10, halation: 6, bloom: 4, colorBias: [2, 1, 6] }, ["low-light", "cinematic", "interior", "drama"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5296 / 5298", format: "35mm", type: "Color Negative", balance: "Tungsten", iso: 500, era: "1990s Cinema", character: "1990s high-speed negative with T-grain emulsion, fine darks, and crisp tonal separation", stockSubtitle: "EXR 5298 · 1990s" }),
  L("kodak-vision", "Kodak VISION", "KODAK_FILM", "VISION 5279 · 1990s · Clean scan-like digital intermediate tonality with balanced color", { exposure: 1, contrast: 9, highlights: -8, shadows: 2, temperature: 2, tint: 1, saturation: 4, fade: 4, grain: 8, vignette: 6, halation: 5, bloom: 3, colorBias: [3, 1, -1] }, ["everyday", "cinematic", "digital-intermediate", "portrait"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5279 / 7279", format: "35mm / 16mm", type: "Color Negative", balance: "Tungsten", iso: 500, era: "Late 1990s", character: "Late 90s digital intermediate baseline with clean scan tonality and balanced color neutrality", stockSubtitle: "VISION 5279 · 1990s" }),
  L("kodak-vision2-250d", "Kodak VISION2 250D", "KODAK_FILM", "5205 · 2000s DAYLIGHT · Balanced 2000s cinema tonality with smooth highlight headroom", { exposure: 1, contrast: 10, highlights: -14, shadows: 4, temperature: 5, tint: 0, saturation: 6, fade: 3, grain: 7, vignette: 6, halation: 4, bloom: 3, colorBias: [5, 2, -2] }, ["daylight", "exterior", "portrait", "cinematic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5205 / 7205", format: "35mm / 16mm", type: "Color Negative", balance: "Daylight", iso: 250, era: "2000s Cinema", character: "2000s daylight cinema negative with extended highlight headroom and natural exterior skin tones", stockSubtitle: "5205 · 2000s DAYLIGHT" }),
  L("kodak-vision2-500t", "Kodak VISION2 500T", "KODAK_FILM", "5218 · 2000s TUNGSTEN · Iconic 2000s moody low-light grade with deep cinematic shadows", { exposure: 0, contrast: 16, highlights: -9, shadows: -7, temperature: -11, tint: 5, saturation: 8, fade: 4, grain: 11, vignette: 13, halation: 8, bloom: 5, colorBias: [3, 0, 8] }, ["night", "interior", "low-light", "cinematic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5218 / 7218", format: "35mm / 16mm", type: "Color Negative", balance: "Tungsten", iso: 500, era: "2000s Cinema", character: "The defining low-light stock of 2000s cinema with rich contrast and moody shadow depths", stockSubtitle: "5218 · 2000s TUNGSTEN" }),
  L("kodak-ektachrome-100d", "Kodak Ektachrome 100D", "KODAK_FILM", "5285 · COLOR REVERSAL · Vivid slide-film saturation with deep punchy blacks and brilliant highlights", { exposure: 2, contrast: 24, highlights: -4, shadows: -10, temperature: 3, tint: -2, saturation: 34, fade: 2, grain: 5, vignette: 8, halation: 6, bloom: 4, colorBias: [6, 4, -4] }, ["vivid", "daylight", "dreamlike", "special", "cinematic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5285 / 7285", format: "35mm / 16mm", type: "Color Reversal", balance: "Daylight", iso: 100, era: "Slide / Reversal", character: "High-saturation color reversal slide film with intense color pop, deep blacks, and punchy highlights", stockSubtitle: "5285 · COLOR REVERSAL" }),
  L("kodak-double-x-5222", "Kodak Double-X 5222", "KODAK_FILM", "5222 · B&W MOTION PICTURE · Timeless monochrome cinema negative with velvety deep contrast", { exposure: 1, contrast: 22, highlights: -6, shadows: -4, saturation: -100, fade: 3, grain: 18, vignette: 10, halation: 0, bloom: 2, colorBias: [0, 0, 0] }, ["bw", "noir", "street", "documentary", "drama", "cinematic"], { collection: "Kodak Film", manufacturer: "Kodak", stock: "5222 / 7222", format: "35mm / 16mm", type: "Black & White Negative", balance: "Panchromatic", iso: 250, era: "Classic Noir to Modern Cinema", character: "Legendary motion picture black-and-white stock with rich velvety blacks and silver-rich grain", stockSubtitle: "5222 · B&W MOTION PICTURE" })
]);

const lookMoodTags = {
  "1998-warm": ["warm", "vintage"],
  "1998-soft": ["soft", "warm"],
  "1998-retro": ["vintage", "warm"],
  "1998-classic": ["warm", "vintage"],
  "1998-portrait": ["soft", "warm"],
  "1998-portrait-soft": ["soft"],
  "1998-portrait-warm": ["warm", "soft"],
  "1998-portrait-flash": ["flash", "vintage"],
  "1998-green": ["green"],
  "1998-summer": ["warm", "vintage"],
  "1998-travel": ["warm", "vintage"],
  "1998-landscape-retro": ["vintage", "soft"],
  "1998-quiet": ["soft", "night"],
  "1998-dream": ["soft", "warm"],
  "1998-faded": ["vintage", "soft"],
  "1998-blue": ["night", "cinematic"],
  "1998-pop": ["flash", "vintage"],
  "1998-candy": ["warm", "soft"],
  "1998-vivid": ["warm", "vintage"],
  "1998-party": ["flash", "night"],
  "1998-flash": ["flash", "night"],
  "1998-night": ["night", "cinematic"],
  "1998-night-color": ["night", "flash"],
  "1998-cinema-compact": ["cinematic", "warm"],
  "golden-200": ["warm", "vintage"],
  "warm-portrait": ["warm", "soft"],
  "soft-portrait": ["soft", "warm"],
  "classic-color": ["vintage", "warm"],
  "fresh-green": ["green"],
  "cool-natural": ["soft", "cinematic"],
  "pastel-green": ["green", "soft"],
  "vivid-color": ["vintage", "warm"],
  "soft-japanese": ["soft"],
  "cream": ["warm", "soft"],
  "milk": ["soft", "vintage"],
  "quiet-morning": ["soft", "night"],
  "90s-disposable": ["flash", "vintage"],
  "night-flash": ["flash", "night"],
  "party-flash": ["flash", "night"],
  "warm-disposable": ["warm", "vintage"],
  "90s-warm": ["warm", "vintage"],
  "90s-flash": ["flash", "vintage"],
  "y2k-flash": ["flash", "night"],
  "ccd-cool": ["night", "cinematic"],
  "cinema-warm": ["cinematic", "warm"],
  "cinema-cool": ["cinematic", "night"],
  "tungsten": ["cinematic", "night"],
  "blue-hour": ["cinematic", "night"],
  "classic-bw": ["bw", "cinematic"],
  "soft-bw": ["bw", "soft"],
  "high-contrast-bw": ["bw", "cinematic"],
  "grainy-bw": ["bw", "vintage"],
  "pink-dream": ["soft", "warm"],
  "faded-color": ["vintage", "soft"],
  "washed-film": ["soft", "vintage"],
  "retro-pop": ["vintage", "flash"],

  // Kodak Film mood tags
  "kodak-vision3-50d": ["warm", "cinematic", "kodak film"],
  "kodak-vision3-250d": ["warm", "cinematic", "kodak film"],
  "kodak-vision3-200t": ["cinematic", "night", "soft", "kodak film"],
  "kodak-vision3-500t": ["night", "cinematic", "flash", "kodak film"],
  "eastman-5248": ["vintage", "warm", "soft", "kodak film"],
  "kodak-5247": ["vintage", "warm", "cinematic", "kodak film"],
  "kodak-5384": ["cinematic", "night", "kodak film"],
  "kodak-exr": ["cinematic", "night", "kodak film"],
  "kodak-vision": ["cinematic", "soft", "kodak film"],
  "kodak-vision2-250d": ["warm", "cinematic", "soft", "kodak film"],
  "kodak-vision2-500t": ["night", "cinematic", "kodak film"],
  "kodak-ektachrome-100d": ["warm", "vintage", "flash", "cinematic", "kodak film"],
  "kodak-double-x-5222": ["bw", "cinematic", "kodak film"]
};


function loadCustomPresets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    let list = [];
    if (parsed && typeof parsed === "object") {
      if (Array.isArray(parsed.presets)) {
        list = parsed.presets;
      } else if (Array.isArray(parsed)) {
        list = parsed;
      }
    }
    return list.filter(p => (
      p &&
      typeof p === "object" &&
      typeof p.id === "string" &&
      p.id.startsWith("custom:") &&
      typeof p.name === "string" &&
      p.name.trim().length > 0 &&
      p.adjustments &&
      typeof p.adjustments === "object" &&
      p.effects &&
      typeof p.effects === "object"
    )).map(p => {
      const basePreset = presetLibrary.find(x => x.id === p.basePresetId) || presetLibrary[0];
      return {
        ...basePreset,
        id: p.id,
        name: p.name.trim(),
        source: "custom",
        category: "CUSTOM",
        basePresetId: p.basePresetId || basePreset.id,
        basePresetName: p.basePresetName || basePreset.name,
        adjustments: { ...DEFAULT_ADJUSTMENTS, ...p.adjustments },
        effects: { ...DEFAULT_EFFECTS, ...p.effects },
        createdAt: typeof p.createdAt === "number" ? p.createdAt : Date.now(),
        updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : Date.now()
      };
    });
  } catch {
    return [];
  }
}

let customPresets = loadCustomPresets();

function saveCustomPresetsToStorage() {
  try {
    const data = {
      version: 1,
      presets: customPresets.map(p => ({
        id: p.id,
        name: p.name,
        source: "custom",
        basePresetId: p.basePresetId,
        basePresetName: p.basePresetName,
        adjustments: { ...p.adjustments },
        effects: { ...p.effects },
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      }))
    };
    localStorage.setItem(STORAGE_KEYS.CUSTOM, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn("Could not save custom presets:", err);
    return false;
  }
}

function getPresetById(id) {
  if (!id) return null;
  return customPresets.find(p => p.id === id) || presetLibrary.find(p => p.id === id) || null;
}

function getAllPresets() {
  return [...customPresets, ...presetLibrary];
}

function getPresetEffectiveParams(preset) {
  if (preset && preset.source === "custom") {
    const baseP = presetLibrary.find(p => p.id === preset.basePresetId) || presetLibrary[0];
    const adjs = preset.adjustments || DEFAULT_ADJUSTMENTS;
    const effs = preset.effects || DEFAULT_EFFECTS;
    return {
      ...baseP,
      id: preset.id,
      name: preset.name,
      exposure: baseP.exposure + (adjs.exposure || 0),
      contrast: baseP.contrast + (adjs.contrast || 0),
      highlights: baseP.highlights + (adjs.highlights || 0),
      shadows: baseP.shadows + (adjs.shadows || 0),
      temperature: baseP.temperature + (adjs.temperature || 0),
      tint: baseP.tint + (adjs.tint || 0),
      saturation: baseP.saturation + (adjs.saturation || 0),
      grain: Math.max(0, Math.min(100, baseP.grain + (effs.grain || 0))),
      vignette: Math.max(0, Math.min(100, baseP.vignette + (effs.vignette || 0))),
      halation: Math.max(0, Math.min(100, baseP.halation + (effs.halation || 0))),
      bloom: Math.max(0, Math.min(100, baseP.bloom + (effs.bloom || 0))),
      fade: Math.max(0, Math.min(100, baseP.fade + (effs.fade || 0))),
      lightLeak: Math.max(0, Math.min(100, baseP.lightLeak + (effs.lightLeak || 0))),
      border: (effs.border && effs.border !== "none") ? effs.border : baseP.border,
      softness: effs.softness !== undefined ? effs.softness : baseP.softness
    };
  }
  return preset;
}

function loadStorageList(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const validIds = new Set([...presetLibrary.map(p => p.id), ...customPresets.map(p => p.id)]);
    return parsed.filter(id => typeof id === "string" && validIds.has(id));
  } catch {
    return [];
  }
}

function saveStorageList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {}
}

const $ = id => document.getElementById(id);

const el = {
  appShell: $("app-shell"),
  themeToggle: $("theme-toggle"),
  shell: $("editor-shell"),
  introPanel: $("intro-panel"),
  input: $("photo-input"),
  select: $("select-photo"),
  drop: $("drop-zone"),
  error: $("upload-error"),
  
  studioHeaderActions: $("studio-header-actions"),
  historyControls: $("history-controls"),
  btnUndo: $("btn-undo"),
  btnRedo: $("btn-redo"),
  headerReplace: $("header-replace-photo"),
  headerRemove: $("header-remove-photo"),
  fileName: $("file-name"),
  fileDimensions: $("file-dimensions"),
  
  stageSection: document.querySelector(".stage-section"),
  stageToolbar: $("stage-toolbar"),
  previewStage: $("preview-stage"),
  emptyState: $("empty-state"),
  stageViewport: $("stage-viewport"),
  image: $("image-preview"),
  gradedLayer: $("graded-layer"),
  canvas: $("rendered-preview"),
  imageMeta: $("image-meta"),
  renderStatus: $("render-status"),
  
  comparisonBar: $("comparison-bar"),
  compareOriginal: $("compare-original"),
  compareSplit: $("compare-split"),
  compareEdited: $("compare-edited"),
  
  toggleSplit: $("toggle-split"),
  holdCompare: $("hold-compare"),
  splitDivider: $("split-divider"),
  splitHandle: $("split-handle"),
  badgeOriginal: $("badge-original"),
  badgeEdited: $("badge-edited"),
  
  resetMenuBtn: $("reset-menu-btn"),
  resetDropdown: $("reset-dropdown"),
  btnResetAdj: $("btn-reset-adjustments"),
  btnResetEff: $("btn-reset-effects"),
  btnResetLook: $("btn-reset-look"),
  btnResetAll: $("btn-reset-all"),
  resetLookLink: $("reset-look"),
  resetAdjLink: $("reset-adjustments-link"),
  resetEffLink: $("reset-effects-link"),
  resetAllLink: $("reset-all-link"),
  downloadBtn: $("download-photo"),
  downloadText: $("download-btn-text"),

  
  uploadPanel: $("upload-panel"),
  studioDock: $("studio-dock"),
  discoverySection: $("discovery-section"),
  secondaryToolsSection: $("secondary-tools-section"),
  accordionAdjust: $("accordion-adjust"),
  accordionEffects: $("accordion-effects"),
  
  editorTabs: $("editor-tabs"),
  tabLooks: $("tab-looks"),
  tabAdjust: $("tab-adjust"),
  tabFx: $("tab-fx"),
  mobileActionBar: $("mobile-action-bar"),
  mobileReplace: $("mobile-replace-photo"),
  mobileDownload: $("mobile-download-photo"),
  mobileDownloadText: $("mobile-download-btn-text"),

  tabs: $("category-tabs"),
  grid: $("preset-grid"),

  lookSearchBar: $("look-search-bar"),
  filmSearchInput: $("film-search-input"),
  filmSearchClear: $("film-search-clear"),
  discoveryMetaRow: $("discovery-meta-row"),
  discoveryCount: $("discovery-count"),
  discoveryFilterChips: $("discovery-filter-chips"),
  clearAllFilters: $("clear-all-filters"),
  searchEmptyState: $("search-empty-state"),
  searchEmptyClearBtn: $("search-empty-clear-btn"),

  surpriseBtn: $("surprise-me-btn"),
  saveLookBtn: $("save-look-btn"),
  filmIndexAnchor: $("film-index-anchor"),
  moodTabsBar: $("mood-tabs-bar"),
  lookDetailCard: $("look-detail-card"),
  detailPresetName: $("detail-preset-name"),
  detailPresetCollection: $("detail-preset-collection"),
  detailPresetDesc: $("detail-preset-desc"),
  detailPresetBestFor: $("detail-preset-bestfor"),
  detailPresetPills: $("detail-preset-pills"),
  detailFavBtn: $("detail-fav-btn"),
  customDetailActions: $("custom-detail-actions"),
  detailRenameBtn: $("detail-rename-btn"),
  detailDeleteBtn: $("detail-delete-btn"),
  recentSection: $("recent-looks-section"),
  recentRow: $("recent-looks-row"),
  favEmptyState: $("favorites-empty-state"),
  customEmptyState: $("custom-empty-state"),

  customLookDialog: $("custom-look-dialog"),
  customDialogTitle: $("custom-dialog-title"),
  customDialogClose: $("custom-dialog-close"),
  customLookForm: $("custom-look-form"),
  customLookNameInput: $("custom-look-name-input"),
  customDialogError: $("custom-dialog-error"),
  customDialogCancel: $("custom-dialog-cancel"),
  customDialogSubmit: $("custom-dialog-submit"),
  customDeleteDialog: $("custom-delete-dialog"),
  customDeleteTitle: $("custom-delete-title"),
  customDeleteClose: $("custom-delete-close"),
  customDeleteCancel: $("custom-delete-cancel"),
  customDeleteConfirm: $("custom-delete-confirm"),
  
  adjExposure: $("adj-exposure"),
  adjContrast: $("adj-contrast"),
  adjHighlights: $("adj-highlights"),
  adjShadows: $("adj-shadows"),
  adjTemperature: $("adj-temperature"),
  adjTint: $("adj-tint"),
  adjSaturation: $("adj-saturation"),
  valExposure: $("val-exposure"),
  valContrast: $("val-contrast"),
  valHighlights: $("val-highlights"),
  valShadows: $("val-shadows"),
  valTemperature: $("val-temperature"),
  valTint: $("val-tint"),
  valSaturation: $("val-saturation"),
  resetAdjExposure: $("reset-adj-exposure"),
  resetAdjContrast: $("reset-adj-contrast"),
  resetAdjHighlights: $("reset-adj-highlights"),
  resetAdjShadows: $("reset-adj-shadows"),
  resetAdjTemperature: $("reset-adj-temperature"),
  resetAdjTint: $("reset-adj-tint"),
  resetAdjSaturation: $("reset-adj-saturation"),
  resetGroupLight: $("reset-group-light"),
  resetGroupColor: $("reset-group-color"),
  
  effGrain: $("eff-grain"),
  effVignette: $("eff-vignette"),
  effHalation: $("eff-halation"),
  effBloom: $("eff-bloom"),
  effFade: $("eff-fade"),
  effLightLeak: $("eff-lightleak"),
  effBorder: $("eff-border"),
  valGrain: $("val-grain"),
  valVignette: $("val-vignette"),
  valHalation: $("val-halation"),
  valBloom: $("val-bloom"),
  valFade: $("val-fade"),
  valLightLeak: $("val-lightleak"),
  resetEffGrain: $("reset-eff-grain"),
  resetEffVignette: $("reset-eff-vignette"),
  resetEffHalation: $("reset-eff-halation"),
  resetEffBloom: $("reset-eff-bloom"),
  resetEffFade: $("reset-eff-fade"),
  resetEffLightLeak: $("reset-eff-lightleak"),
  resetEffBorder: $("reset-eff-border"),
  filmstripBar: $("filmstrip-bar"),
  filmstripTrack: $("filmstrip-track"),
  filmstripAddBtn: $("filmstrip-add-btn"),
  filmstripClearBtn: $("filmstrip-clear-btn"),

  studioModes: $("studio-modes"),
  modePresets: $("mode-presets"),
  modeAdjust: $("mode-adjust"),
  modeEffects: $("mode-effects"),
  studioModePresets: $("studio-mode-presets"),
  studioLookCard: $("studio-look-card"),
  studioPresetName: $("studio-preset-name"),
  studioPresetBadge: $("studio-preset-badge"),
  studioPresetDesc: $("studio-preset-desc"),
  studioPresetBestFor: $("studio-preset-bestfor"),
  studioFavBtn: $("studio-fav-btn"),
  studioSaveLookBtn: $("studio-save-look-btn"),
  studioSurpriseBtn: $("studio-surprise-btn"),
  studioResetLook: $("studio-reset-look"),
  studioQuickCount: $("studio-quick-count"),
  studioCompactGrid: $("studio-compact-grid")
};

/* ==================================================
   WORKSPACE FOUNDATION (PHASE 6.1)
   ================================================== */
const WORKSPACE_MAX_PHOTOS = 20; // Configurable session safety ceiling

const workspace = {
  photos: [],
  activePhotoId: null,
  maxPhotos: WORKSPACE_MAX_PHOTOS
};

function getActivePhoto() {
  if (!workspace.activePhotoId) return null;
  return workspace.photos.find(p => p.id === workspace.activePhotoId) || null;
}

function createPhotoRecord(file, img, previewUrl) {
  const photoId = `photo:${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const heroPreset = presetLibrary.find(p => p.id === "1998-warm") || presetLibrary[0];
  const heroPresetId = heroPreset ? heroPreset.id : null;
  const initialSnapshot = {
    presetId: heroPresetId,
    adjustments: { ...DEFAULT_ADJUSTMENTS },
    effects: { ...DEFAULT_EFFECTS }
  };
  return {
    id: photoId,
    name: file.name || "Photograph",
    width: img.naturalWidth || 0,
    height: img.naturalHeight || 0,
    fileSize: typeof file.size === "number" ? file.size : 0,
    previewUrl: previewUrl,
    sourceImage: img,
    editState: {
      activePresetId: heroPresetId,
      adjustments: { ...DEFAULT_ADJUSTMENTS },
      effects: { ...DEFAULT_EFFECTS }
    },
    historyState: {
      stack: [initialSnapshot],
      index: 0
    },
    viewState: {
      compareMode: "edited",
      splitPos: 50,
      isSplitActive: false
    },
    createdAt: Date.now()
  };
}

function setActivePhoto(id) {
  if (!id) {
    workspace.activePhotoId = null;
    state.sourceImage = null;
    state.sourceFileName = "";
    state.previewUrl = null;
    return false;
  }
  const nextPhoto = workspace.photos.find(p => p.id === id);
  if (!nextPhoto) return false;

  // If already active, return true immediately
  if (workspace.activePhotoId === id) return true;

  // 1. Flush previous photo state if any
  const prevPhoto = getActivePhoto();
  if (prevPhoto && prevPhoto.id !== id) {
    prevPhoto.editState.activePresetId = state.activePreset ? state.activePreset.id : null;
    prevPhoto.editState.adjustments = { ...state.adjustments };
    prevPhoto.editState.effects = { ...state.effects };
    prevPhoto.viewState.compareMode = state.compareMode;
    prevPhoto.viewState.splitPos = state.splitPos;
    prevPhoto.viewState.isSplitActive = Boolean(state.isSplitActive);
    prevPhoto.historyState.stack = history.map(snap => ({
      presetId: snap.presetId,
      adjustments: { ...snap.adjustments },
      effects: { ...snap.effects }
    }));
    prevPhoto.historyState.index = historyIndex;
  }

  // 2. Set active photo ID
  workspace.activePhotoId = id;

  // 3. Ensure editor mode is active
  if (el.shell && !el.shell.classList.contains("is-editor-mode")) {
    el.shell.classList.add("is-editor-mode");
    if (el.introPanel) el.introPanel.hidden = true;
    if (el.emptyState) el.emptyState.hidden = true;
    if (el.uploadPanel) el.uploadPanel.hidden = true;
    if (el.studioHeaderActions) el.studioHeaderActions.hidden = false;
    if (el.stageToolbar) el.stageToolbar.hidden = false;
    if (el.stageViewport) el.stageViewport.hidden = false;
    if (el.studioDock) el.studioDock.hidden = false;
    if (el.previewStage) el.previewStage.classList.add("has-image");
    if (el.mobileActionBar) el.mobileActionBar.hidden = false;
    if (el.saveLookBtn) el.saveLookBtn.disabled = false;
    if (el.studioSaveLookBtn) el.studioSaveLookBtn.disabled = false;
  }

  // 4. Bind source image & metadata
  state.sourceImage = nextPhoto.sourceImage;
  state.sourceFileName = nextPhoto.name;
  state.previewUrl = nextPhoto.previewUrl;
  if (el.image) {
    el.image.src = nextPhoto.previewUrl;
    el.image.alt = "Preview of " + nextPhoto.name;
  }
  const rawName = nextPhoto.name || "Photograph";
  let displayName = rawName;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const ext = rawName.includes(".") ? rawName.slice(rawName.lastIndexOf(".")) : "";
  const baseWithoutExt = rawName.includes(".") ? rawName.slice(0, rawName.lastIndexOf(".")) : rawName;
  if (uuidRegex.test(baseWithoutExt)) {
    displayName = `Photograph${ext || ".jpg"}`;
  }
  if (el.fileName) {
    el.fileName.textContent = displayName;
    el.fileName.title = `${displayName} (${nextPhoto.width} × ${nextPhoto.height})`;
  }
  if (el.fileDimensions) {
    const dims = `${nextPhoto.width} × ${nextPhoto.height}`;
    el.fileDimensions.textContent = dims;
  }
  if (el.imageMeta) {
    el.imageMeta.textContent = `${nextPhoto.width} × ${nextPhoto.height}`;
    el.imageMeta.hidden = false;
  }
  updatePreviewAspectRatio(nextPhoto.width, nextPhoto.height);

  // 5. Restore edit state
  if (nextPhoto.editState && nextPhoto.editState.activePresetId) {
    state.activePreset = getPresetById(nextPhoto.editState.activePresetId);
  } else {
    state.activePreset = null;
  }
  state.adjustments = { ...DEFAULT_ADJUSTMENTS, ...(nextPhoto.editState?.adjustments || {}) };
  state.effects = { ...DEFAULT_EFFECTS, ...(nextPhoto.editState?.effects || {}) };

  // 6. Restore view state
  state.compareMode = nextPhoto.viewState?.compareMode || "edited";
  state.splitPos = typeof nextPhoto.viewState?.splitPos === "number" ? nextPhoto.viewState.splitPos : 50;
  state.isSplitActive = Boolean(nextPhoto.viewState?.isSplitActive);
  state.previousCompareMode = null;
  state.isPressHolding = false;
  state.preHoldMode = null;

  // 7. Restore history state (NO history entry created on switch!)
  history.length = 0;
  if (nextPhoto.historyState && Array.isArray(nextPhoto.historyState.stack) && nextPhoto.historyState.stack.length > 0) {
    nextPhoto.historyState.stack.forEach(snap => {
      history.push({
        presetId: snap.presetId,
        adjustments: { ...snap.adjustments },
        effects: { ...snap.effects }
      });
    });
    historyIndex = nextPhoto.historyState.index;
  } else {
    const initSnap = {
      presetId: state.activePreset ? state.activePreset.id : null,
      adjustments: { ...state.adjustments },
      effects: { ...state.effects }
    };
    history.push(initSnap);
    historyIndex = 0;
    nextPhoto.historyState = {
      stack: [initSnap],
      index: 0
    };
  }

  // 8. Update UI controls to reflect restored state
  if (el.resetLookLink) el.resetLookLink.disabled = !state.activePreset;
  if (el.btnResetLook) el.btnResetLook.disabled = !state.activePreset;
  updateLookDetail();
  renderRecentRow();
  renderGrid();
  syncAdjustmentSliders();
  syncEffectSliders();
  updateResetBtnStates();
  setCompareMode(state.compareMode);
  updateSplitView();
  updateHistoryUI();

  // 9. Render race condition protection
  state.token++;
  if (state.frame) {
    cancelAnimationFrame(state.frame);
    state.frame = null;
  }
  queue();
  renderFilmstrip();

  return true;
}

function removePhoto(id) {
  if (!id) return false;
  const idx = workspace.photos.findIndex(p => p.id === id);
  if (idx === -1) return false;
  const [removed] = workspace.photos.splice(idx, 1);
  if (removed && removed.previewUrl) {
    try { URL.revokeObjectURL(removed.previewUrl); } catch {}
    removed.previewUrl = null;
  }
  if (removed) {
    removed.sourceImage = null;
    if (removed.historyState) {
      removed.historyState.stack = [];
      removed.historyState.index = -1;
    }
    removed.editState = null;
    removed.viewState = null;
  }
  if (el.input) el.input.value = "";

  if (workspace.activePhotoId === id) {
    if (workspace.photos.length > 0) {
      const nextIdx = Math.min(idx, workspace.photos.length - 1);
      setActivePhoto(workspace.photos[nextIdx].id);
    } else {
      remove();
    }
  } else {
    renderFilmstrip();
  }
  return true;
}

function clearWorkspace(skipConfirm = false) {
  if (workspace.photos.length === 0) return true;
  if (!skipConfirm && typeof window !== "undefined" && typeof window.confirm === "function") {
    const ok = window.confirm("Clear all photos from this workspace?");
    if (!ok) return false;
  }
  remove();
  return true;
}

function renderFilmstrip() {
  if (!el.filmstripBar || !el.filmstripTrack) return;
  const count = workspace.photos.length;
  if (count === 0 || !el.shell?.classList.contains("is-editor-mode")) {
    el.filmstripBar.hidden = true;
    el.filmstripTrack.replaceChildren();
    return;
  }

  el.filmstripBar.hidden = false;

  // Fast path: if track children match existing workspace photo IDs, update active attributes
  const existingItems = Array.from(el.filmstripTrack.children);
  const isMatch = existingItems.length === count &&
    existingItems.every((it, i) => it.dataset.photoId === workspace.photos[i]?.id);

  if (isMatch) {
    existingItems.forEach(it => {
      const isActive = it.dataset.photoId === workspace.activePhotoId;
      it.classList.toggle("is-active", isActive);
      it.setAttribute("aria-pressed", String(isActive));
    });
    const activeBtn = el.filmstripTrack.querySelector(".filmstrip-item.is-active");
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
    return;
  }

  // Rebuild items
  const frag = document.createDocumentFragment();
  workspace.photos.forEach(photo => {
    const isActive = photo.id === workspace.activePhotoId;
    const item = document.createElement("button");
    item.type = "button";
    item.className = `filmstrip-item${isActive ? " is-active" : ""}`;
    item.dataset.photoId = photo.id;
    item.setAttribute("aria-pressed", String(isActive));
    item.setAttribute("aria-label", `Switch to photo: ${photo.name}`);
    item.title = `${photo.name} (${photo.width} × ${photo.height})`;

    const thumbWrap = document.createElement("div");
    thumbWrap.className = "filmstrip-thumb-wrap";

    const img = document.createElement("img");
    img.className = "filmstrip-thumb";
    img.src = photo.previewUrl;
    img.alt = "";
    img.loading = "lazy";

    const fallback = document.createElement("span");
    fallback.className = "filmstrip-thumb-fallback";
    fallback.setAttribute("aria-hidden", "true");
    fallback.textContent = "📷";
    fallback.hidden = true;

    img.onerror = () => {
      img.style.display = "none";
      fallback.hidden = false;
    };

    thumbWrap.appendChild(img);
    thumbWrap.appendChild(fallback);

    // Remove photo affordance
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "filmstrip-remove-btn";
    removeBtn.setAttribute("aria-label", `Remove ${photo.name}`);
    removeBtn.title = `Remove ${photo.name}`;
    removeBtn.innerHTML = `<span aria-hidden="true">✕</span>`;
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      removePhoto(photo.id);
    };
    removeBtn.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.stopPropagation();
        e.preventDefault();
        removePhoto(photo.id);
      }
    };
    thumbWrap.appendChild(removeBtn);

    const label = document.createElement("span");
    label.className = "filmstrip-label";
    label.textContent = photo.name;

    item.appendChild(thumbWrap);
    item.appendChild(label);

    item.onclick = () => {
      if (workspace.activePhotoId !== photo.id) {
        setActivePhoto(photo.id);
      }
    };

    frag.appendChild(item);
  });

  el.filmstripTrack.replaceChildren(frag);

  const activeBtn = el.filmstripTrack.querySelector(".filmstrip-item.is-active");
  if (activeBtn) {
    activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }
}

function setupFilmstripControls() {
  if (el.filmstripAddBtn) {
    el.filmstripAddBtn.onclick = choose;
  }
  if (el.filmstripClearBtn) {
    el.filmstripClearBtn.onclick = () => clearWorkspace(false);
  }
  if (el.filmstripTrack) {
    el.filmstripTrack.addEventListener("keydown", e => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const items = Array.from(el.filmstripTrack.querySelectorAll(".filmstrip-item"));
        const currentItem = document.activeElement ? document.activeElement.closest(".filmstrip-item") : null;
        const currentIdx = items.indexOf(currentItem);
        if (currentIdx !== -1) {
          e.preventDefault();
          const nextIdx = e.key === "ArrowRight"
            ? (currentIdx + 1) % items.length
            : (currentIdx - 1 + items.length) % items.length;
          items[nextIdx].focus();
        }
      }
    });
  }
}

workspace.getActivePhoto = getActivePhoto;
workspace.setActivePhoto = setActivePhoto;
workspace.removePhoto = removePhoto;
workspace.clearWorkspace = clearWorkspace;

const state = {
  sourceImage: null,
  sourceFileName: "",
  previewUrl: null,
  activePreset: null,
  selectedCategory: "ALL",
  searchQuery: "",
  selectedMood: "ALL",
  compareMode: "edited",
  previousCompareMode: null,
  isPressHolding: false,
  preHoldMode: null,
  favorites: new Set(loadStorageList(STORAGE_KEYS.FAVORITES)),
  recentIds: loadStorageList(STORAGE_KEYS.RECENT).slice(0, 8),
  lastSurpriseId: null,
  adjustments: { ...DEFAULT_ADJUSTMENTS },
  effects: { ...DEFAULT_EFFECTS },
  isSplitActive: false,
  splitPos: 50,
  isDraggingSplit: false,
  isMoreOpen: false,
  activePanel: "looks",
  processingStatus: "idle",
  frame: null,
  token: 0,
  isRestoringHistory: false
};


function formatVal(v) {
  if (v > 0) return `+${v}`;
  return String(v);
}

function setProcessingStatus(status) {
  state.processingStatus = status;
  if (!el.renderStatus) return;
  if (status === "rendering") {
    el.renderStatus.textContent = "Rendering...";
    el.renderStatus.classList.add("is-rendering");
  } else if (status === "exporting") {
    el.renderStatus.textContent = "Exporting JPEG...";
    el.renderStatus.classList.add("is-rendering");
  } else {
    el.renderStatus.textContent = "Ready";
    el.renderStatus.classList.remove("is-rendering");
  }
}

function fail(msg) {
  el.error.textContent = msg;
  el.error.hidden = false;
}

function clear() {
  el.error.textContent = "";
  el.error.hidden = true;
}

function revoke() {
  if (state.previewUrl) {
    try { URL.revokeObjectURL(state.previewUrl); } catch {}
    state.previewUrl = null;
  }
}

function getEffectiveParams() {
  const p = state.activePreset || base;
  return {
    ...p,
    id: state.activePreset?.id || "custom",
    name: state.activePreset?.name || "Custom",
    exposure: p.exposure + state.adjustments.exposure,
    contrast: p.contrast + state.adjustments.contrast,
    highlights: p.highlights + state.adjustments.highlights,
    shadows: p.shadows + state.adjustments.shadows,
    temperature: p.temperature + state.adjustments.temperature,
    tint: p.tint + state.adjustments.tint,
    saturation: p.saturation + state.adjustments.saturation,
    grain: Math.max(0, Math.min(100, p.grain + state.effects.grain)),
    vignette: Math.max(0, Math.min(100, p.vignette + state.effects.vignette)),
    halation: Math.max(0, Math.min(100, p.halation + state.effects.halation)),
    bloom: Math.max(0, Math.min(100, p.bloom + state.effects.bloom)),
    fade: Math.max(0, Math.min(100, p.fade + state.effects.fade)),
    lightLeak: Math.max(0, Math.min(100, p.lightLeak + state.effects.lightLeak)),
    border: state.effects.border !== "none" ? state.effects.border : p.border
  };
}

function draw(canvas, src, p, maxEdge = LIMIT) {
  const nw = src.naturalWidth || src.width;
  const nh = src.naturalHeight || src.height;
  let scale = 1;
  if (maxEdge !== Infinity && (nw > maxEdge || nh > maxEdge)) {
    scale = Math.min(maxEdge / nw, maxEdge / nh);
  }
  const w = Math.round(nw * scale);
  const h = Math.round(nh * scale);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const c = canvas.getContext("2d", { willReadFrequently: true });
  c.drawImage(src, 0, 0, w, h);
  const imgData = c.getImageData(0, 0, w, h);
  const d = imgData.data;

  const expMul = Math.pow(2, (p.exposure || 0) / 100);
  const con = p.contrast || 0;
  const conMul = con >= 0 ? (1 + con / 100 * 1.5) : (1 + con / 100 * 0.7);
  const hl = p.highlights || 0;
  const sh = p.shadows || 0;
  const tMul = (p.temperature || 0) / 100;
  const tintMul = (p.tint || 0) / 100;
  const sat = p.saturation || 0;
  const satMul = sat >= 0 ? (1 + sat / 100 * 1.5) : Math.max(0, 1 + sat / 100);
  const fd = (p.fade || 0) / 100 * 45;
  const bias = p.colorBias || [0, 0, 0];
  const gr = p.grain || 0;

  const rTemp = tMul > 0 ? tMul * 35 : tMul * 20;
  const bTemp = tMul > 0 ? -tMul * 35 : -tMul * 20;
  const gTint = -tintMul * 25;
  const rTint = tintMul * 15;
  const bTint = tintMul * 15;

  const totalR = rTemp + rTint + bias[0];
  const totalG = gTint + bias[1];
  const totalB = bTemp + bTint + bias[2];

  for (let i = 0; i < d.length; i += 4) {
    let r = d[i];
    let g = d[i + 1];
    let b = d[i + 2];

    if (expMul !== 1) {
      r *= expMul;
      g *= expMul;
      b *= expMul;
    }

    if (hl !== 0 || sh !== 0) {
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (hl !== 0 && lum > 0.5) {
        const hlFactor = (lum - 0.5) * 2;
        const hlAdj = (hl / 100) * 45 * hlFactor;
        r += hlAdj; g += hlAdj; b += hlAdj;
      }
      if (sh !== 0 && lum < 0.5) {
        const shFactor = (0.5 - lum) * 2;
        const shAdj = (sh / 100) * 45 * shFactor;
        r += shAdj; g += shAdj; b += shAdj;
      }
    }

    if (con !== 0) {
      r = ((r / 255 - 0.5) * conMul + 0.5) * 255;
      g = ((g / 255 - 0.5) * conMul + 0.5) * 255;
      b = ((b / 255 - 0.5) * conMul + 0.5) * 255;
    }

    r += totalR;
    g += totalG;
    b += totalB;

    if (sat !== 0) {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = gray + (r - gray) * satMul;
      g = gray + (g - gray) * satMul;
      b = gray + (b - gray) * satMul;
    }

    if (fd > 0) {
      r = r * (1 - fd / 255) + fd;
      g = g * (1 - fd / 255) + fd;
      b = b * (1 - fd / 255) + fd;
    }

    if (gr > 0) {
      const noise = (Math.random() - 0.5) * (gr / 100) * 55;
      r += noise;
      g += noise;
      b += noise;
    }

    d[i] = r < 0 ? 0 : r > 255 ? 255 : r;
    d[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
    d[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
  }

  c.putImageData(imgData, 0, 0);

  if (p.bloom && p.bloom > 0) {
    c.save();
    c.globalCompositeOperation = "screen";
    c.filter = `blur(${Math.max(2, Math.round(w * 0.015))}px)`;
    c.globalAlpha = (p.bloom / 100) * 0.45;
    c.drawImage(canvas, 0, 0);
    c.restore();
  }

  if (p.halation && p.halation > 0) {
    c.save();
    c.globalCompositeOperation = "screen";
    c.filter = `blur(${Math.max(2, Math.round(w * 0.008))}px)`;
    c.globalAlpha = (p.halation / 100) * 0.35;
    const hCanvas = document.createElement("canvas");
    hCanvas.width = w;
    hCanvas.height = h;
    const hCtx = hCanvas.getContext("2d");
    hCtx.drawImage(canvas, 0, 0);
    hCtx.globalCompositeOperation = "multiply";
    hCtx.fillStyle = "rgb(255, 60, 20)";
    hCtx.fillRect(0, 0, w, h);
    c.drawImage(hCanvas, 0, 0);
    c.restore();
  }

  if (p.vignette && p.vignette > 0) {
    c.save();
    const vigGrad = c.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.7);
    vigGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
    vigGrad.addColorStop(1, `rgba(0, 0, 0, ${(p.vignette / 100) * 0.85})`);
    c.fillStyle = vigGrad;
    c.fillRect(0, 0, w, h);
    c.restore();
  }

  if (p.lightLeak && p.lightLeak > 0) {
    c.save();
    c.globalCompositeOperation = "screen";
    const intensity = p.lightLeak / 100;
    const g1 = c.createRadialGradient(0, 0, 0, 0, 0, Math.max(w, h) * 0.9);
    g1.addColorStop(0, `rgba(255, 235, 175, ${0.75 * intensity})`);
    g1.addColorStop(0.25, `rgba(255, 110, 35, ${0.5 * intensity})`);
    g1.addColorStop(0.6, `rgba(225, 45, 85, ${0.25 * intensity})`);
    g1.addColorStop(1, "rgba(200, 20, 50, 0)");
    c.fillStyle = g1;
    c.fillRect(0, 0, w, h);
    c.restore();
  }

  if (p.border && p.border !== "none") {
    c.save();
    const minDim = Math.min(w, h);
    c.strokeStyle = p.border === "white-film" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)";
    c.lineWidth = Math.max(1, Math.round(minDim * 0.005));
    if (p.border === "black-film" || p.border === "white-film") {
      const bw = Math.max(3, Math.round(minDim * 0.04));
      c.fillStyle = p.border === "black-film" ? "#121210" : "#f7f5f0";
      c.fillRect(0, 0, w, bw);
      c.fillRect(0, h - bw, w, bw);
      c.fillRect(0, 0, bw, h);
      c.fillRect(w - bw, 0, bw, h);
      c.strokeRect(bw, bw, w - 2 * bw, h - 2 * bw);
    } else if (p.border === "35mm-black") {
      const bandH = Math.max(4, Math.round(h * 0.07));
      c.fillStyle = "#0d0d0b";
      c.fillRect(0, 0, w, bandH);
      c.fillRect(0, h - bandH, w, bandH);
      c.fillStyle = "rgba(255, 255, 255, 0.4)";
      c.font = `${Math.max(10, Math.round(bandH * 0.4))}px monospace`;
      c.textBaseline = "middle";
      c.fillText("▶ FILM 1998", Math.round(w * 0.05), Math.round(bandH * 0.5));
      c.fillText("36A", Math.round(w * 0.85), Math.round(bandH * 0.5));
    } else if (p.border === "compact") {
      const bw = Math.max(2, Math.round(minDim * 0.02));
      const r = Math.max(4, Math.round(minDim * 0.05));
      c.fillStyle = "#1e1d1a";
      c.beginPath();
      c.rect(0, 0, w, h);
      c.rect(w - bw, bw, bw, h - 2 * bw);
      c.rect(bw, bw, w - 2 * bw, bw);
      c.rect(bw, h - 2 * bw, w - 2 * bw, bw);
      c.rect(0, bw, bw, h - 2 * bw);
      c.fill("evenodd");
    }
    c.restore();
  }
}

function queue() {
  if (!state.sourceImage) return;
  const activePhoto = getActivePhoto();
  if (activePhoto) {
    activePhoto.editState.activePresetId = state.activePreset ? state.activePreset.id : null;
    activePhoto.editState.adjustments = { ...state.adjustments };
    activePhoto.editState.effects = { ...state.effects };
    activePhoto.viewState.compareMode = state.compareMode;
    activePhoto.viewState.splitPos = state.splitPos;
    activePhoto.viewState.isSplitActive = Boolean(state.isSplitActive);
  }
  if (state.frame) cancelAnimationFrame(state.frame);
  const token = ++state.token;
  setProcessingStatus("rendering");
  state.frame = requestAnimationFrame(() => {
    if (token !== state.token) return;
    const effective = getEffectiveParams();
    draw(el.canvas, state.sourceImage, effective, LIMIT);
    if (token !== state.token) return;
    updateSplitView();
    setProcessingStatus("ready");
  });
}

function setCompareMode(mode) {
  state.compareMode = mode;
  const activePhoto = getActivePhoto();
  if (activePhoto) {
    activePhoto.viewState.compareMode = mode;
    activePhoto.viewState.isSplitActive = (mode === "split");
  }
  if (mode === "original") {
    state.isSplitActive = false;
    el.gradedLayer.classList.add("is-holding-original");
    el.gradedLayer.style.clipPath = "none";
    if (el.splitDivider) el.splitDivider.hidden = true;
    if (el.badgeOriginal) el.badgeOriginal.hidden = false;
    if (el.badgeEdited) el.badgeEdited.hidden = true;
    if (el.compareOriginal) {
      el.compareOriginal.classList.add("is-active");
      el.compareOriginal.setAttribute("aria-pressed", "true");
    }
    if (el.compareSplit) {
      el.compareSplit.classList.remove("is-active");
      el.compareSplit.setAttribute("aria-pressed", "false");
    }
    if (el.compareEdited) {
      el.compareEdited.classList.remove("is-active");
      el.compareEdited.setAttribute("aria-pressed", "false");
    }
  } else if (mode === "split") {
    state.isSplitActive = true;
    el.gradedLayer.classList.remove("is-holding-original");
    if (el.splitDivider) el.splitDivider.hidden = false;
    if (el.badgeOriginal) el.badgeOriginal.hidden = false;
    if (el.badgeEdited) el.badgeEdited.hidden = false;
    if (el.compareOriginal) {
      el.compareOriginal.classList.remove("is-active");
      el.compareOriginal.setAttribute("aria-pressed", "false");
    }
    if (el.compareSplit) {
      el.compareSplit.classList.add("is-active");
      el.compareSplit.setAttribute("aria-pressed", "true");
    }
    if (el.compareEdited) {
      el.compareEdited.classList.remove("is-active");
      el.compareEdited.setAttribute("aria-pressed", "false");
    }
    updateSplitView();
  } else {
    state.compareMode = "edited";
    state.isSplitActive = false;
    el.gradedLayer.classList.remove("is-holding-original");
    el.gradedLayer.style.clipPath = "none";
    if (el.splitDivider) el.splitDivider.hidden = true;
    if (el.badgeOriginal) el.badgeOriginal.hidden = true;
    if (el.badgeEdited) el.badgeEdited.hidden = true;
    if (el.compareOriginal) {
      el.compareOriginal.classList.remove("is-active");
      el.compareOriginal.setAttribute("aria-pressed", "false");
    }
    if (el.compareSplit) {
      el.compareSplit.classList.remove("is-active");
      el.compareSplit.setAttribute("aria-pressed", "false");
    }
    if (el.compareEdited) {
      el.compareEdited.classList.add("is-active");
      el.compareEdited.setAttribute("aria-pressed", "true");
    }
  }
  if (el.toggleSplit) el.toggleSplit.setAttribute("aria-pressed", String(state.isSplitActive));
}

function updatePreviewAspectRatio(width, height) {
  const w = Number(width);
  const h = Number(height);
  if (!w || !h || w <= 0 || h <= 0) return;
  const ratioStr = `${w} / ${h}`;
  const orientation = w > h ? "landscape" : w < h ? "portrait" : "square";
  if (el.stageViewport) {
    el.stageViewport.style.setProperty("--image-aspect-ratio", ratioStr);
    el.stageViewport.style.setProperty("--ratio-w", String(w));
    el.stageViewport.style.setProperty("--ratio-h", String(h));
    el.stageViewport.style.aspectRatio = ratioStr;
    el.stageViewport.dataset.aspectOrientation = orientation;
  }
  if (el.previewStage) {
    el.previewStage.style.setProperty("--image-aspect-ratio", ratioStr);
    el.previewStage.style.setProperty("--ratio-w", String(w));
    el.previewStage.style.setProperty("--ratio-h", String(h));
    el.previewStage.dataset.aspectOrientation = orientation;
  }
}

function updateSplitView() {
  if (!el.stageViewport) return;
  el.stageViewport.style.setProperty("--split-pos", `${state.splitPos}%`);
  if (el.splitHandle) {
    el.splitHandle.setAttribute("aria-valuenow", String(Math.round(state.splitPos)));
  }
  if (state.isSplitActive) {
    if (el.splitDivider) el.splitDivider.hidden = false;
    if (el.badgeOriginal) el.badgeOriginal.hidden = false;
    if (el.badgeEdited) el.badgeEdited.hidden = false;
    if (el.toggleSplit) el.toggleSplit.setAttribute("aria-pressed", "true");
    if (el.compareSplit) {
      el.compareSplit.classList.add("is-active");
      el.compareSplit.setAttribute("aria-pressed", "true");
    }
    el.gradedLayer.classList.remove("is-holding-original");
    el.gradedLayer.style.clipPath = `polygon(${state.splitPos}% 0, 100% 0, 100% 100%, ${state.splitPos}% 100%)`;
  } else if (state.compareMode === "original") {
    if (el.splitDivider) el.splitDivider.hidden = true;
    if (el.badgeOriginal) el.badgeOriginal.hidden = false;
    if (el.badgeEdited) el.badgeEdited.hidden = true;
    el.gradedLayer.classList.add("is-holding-original");
    el.gradedLayer.style.clipPath = "none";
  } else {
    if (el.splitDivider) el.splitDivider.hidden = true;
    if (el.badgeOriginal) el.badgeOriginal.hidden = true;
    if (el.badgeEdited) el.badgeEdited.hidden = true;
    if (el.toggleSplit) el.toggleSplit.setAttribute("aria-pressed", "false");
    el.gradedLayer.classList.remove("is-holding-original");
    el.gradedLayer.style.clipPath = "none";
  }
}

function handleSplitDrag(clientX) {
  const rect = el.stageViewport.getBoundingClientRect();
  if (!rect.width) return;
  const x = clientX - rect.left;
  const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
  state.splitPos = pct;
  const activePhoto = getActivePhoto();
  if (activePhoto) {
    activePhoto.viewState.splitPos = pct;
  }
  updateSplitView();
}

function startStageHold(e) {
  if (!state.sourceImage || !el.shell?.classList.contains("is-editor-mode")) return;
  if (e && e.target && (e.target.closest("#comparison-bar") || e.target.closest("#split-divider"))) return;
  if (state.isPressHolding) return;

  state.isPressHolding = true;
  state.preHoldMode = state.compareMode || "edited";
  el.gradedLayer.classList.add("is-holding-original");
  if (el.badgeOriginal) el.badgeOriginal.hidden = false;
  if (el.badgeEdited) el.badgeEdited.hidden = true;
  if (el.splitDivider) el.splitDivider.hidden = true;
}

function stopStageHold() {
  if (!state.isPressHolding) return;
  state.isPressHolding = false;
  el.gradedLayer.classList.remove("is-holding-original");
  const restoreMode = state.preHoldMode || "edited";
  state.preHoldMode = null;
  setCompareMode(restoreMode);
}

function setupSplitInteractions() {
  if (el.compareOriginal) {
    el.compareOriginal.onclick = () => setCompareMode("original");
  }

  if (el.compareSplit) {
    el.compareSplit.onclick = () => setCompareMode("split");
  }

  if (el.compareEdited) {
    el.compareEdited.onclick = () => setCompareMode("edited");
  }

  if (el.toggleSplit) {
    el.toggleSplit.onclick = () => setCompareMode(state.isSplitActive ? "edited" : "split");
  }

  if (el.holdCompare) {
    el.holdCompare.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      startStageHold();
    });
    el.holdCompare.addEventListener("pointerup", stopStageHold);
    el.holdCompare.addEventListener("pointercancel", stopStageHold);
  }

  // Stage viewport press & hold for temporary Original preview
  if (el.stageViewport) {
    el.stageViewport.addEventListener("pointerdown", startStageHold);
    el.stageViewport.addEventListener("pointerup", stopStageHold);
    el.stageViewport.addEventListener("pointercancel", stopStageHold);
    el.stageViewport.addEventListener("pointerleave", (e) => {
      if (state.isPressHolding && e.target === el.stageViewport) {
        stopStageHold();
      }
    });
  }

  const onPointerMove = e => {
    if (state.isDraggingSplit) handleSplitDrag(e.clientX);
  };

  const onPointerUp = e => {
    if (state.isDraggingSplit) {
      state.isDraggingSplit = false;
      el.splitDivider.classList.remove("is-dragging");
      try { el.splitDivider.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  const onPointerDown = e => {
    e.preventDefault();
    state.isDraggingSplit = true;
    el.splitDivider.classList.add("is-dragging");
    try { el.splitDivider.setPointerCapture(e.pointerId); } catch {}
    handleSplitDrag(e.clientX);
  };

  if (el.splitDivider) {
    el.splitDivider.addEventListener("pointerdown", onPointerDown);
    el.splitDivider.addEventListener("pointermove", onPointerMove);
    el.splitDivider.addEventListener("pointerup", onPointerUp);
    el.splitDivider.addEventListener("pointercancel", onPointerUp);
    el.splitDivider.addEventListener("lostpointercapture", onPointerUp);
  }

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("pointerup", stopStageHold);
  window.addEventListener("pointercancel", stopStageHold);

  if (el.splitHandle) {
    el.splitHandle.addEventListener("keydown", e => {
      const step = e.shiftKey ? 10 : 5;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        state.splitPos = Math.max(0, state.splitPos - step);
        updateSplitView();
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        state.splitPos = Math.min(100, state.splitPos + step);
        updateSplitView();
      } else if (e.key === "Home") {
        e.preventDefault();
        e.stopPropagation();
        state.splitPos = 0;
        updateSplitView();
      } else if (e.key === "End") {
        e.preventDefault();
        e.stopPropagation();
        state.splitPos = 100;
        updateSplitView();
      }
    });
  }
}

/* ==================================================
   EDITOR STATE & UNDO / REDO HISTORY (PHASE 5.0)
   ================================================== */
const MAX_HISTORY = 50;
const history = [];
let historyIndex = -1;

function createSnapshot() {
  return {
    presetId: state.activePreset ? state.activePreset.id : null,
    adjustments: { ...state.adjustments },
    effects: { ...state.effects }
  };
}

function isSnapshotEqual(a, b) {
  if (!a || !b) return false;
  if (a.presetId !== b.presetId) return false;
  for (const k of adjustKeys) {
    if ((a.adjustments?.[k] || 0) !== (b.adjustments?.[k] || 0)) return false;
  }
  for (const k of effectKeys) {
    if ((a.effects?.[k] || 0) !== (b.effects?.[k] || 0)) return false;
  }
  if ((a.effects?.border || "none") !== (b.effects?.border || "none")) return false;
  if ((a.effects?.softness || 0) !== (b.effects?.softness || 0)) return false;
  return true;
}

function updateHistoryUI() {
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex >= 0 && historyIndex < history.length - 1;

  if (el.btnUndo) {
    el.btnUndo.disabled = !canUndo;
    el.btnUndo.setAttribute("aria-disabled", String(!canUndo));
  }
  if (el.btnRedo) {
    el.btnRedo.disabled = !canRedo;
    el.btnRedo.setAttribute("aria-disabled", String(!canRedo));
  }
}

function recordHistory() {
  if (state.isRestoringHistory) return;
  if (!state.sourceImage) return;

  const current = createSnapshot();
  if (history.length > 0 && isSnapshotEqual(current, history[historyIndex])) {
    return;
  }

  // Branching: remove redo entries beyond current pointer
  if (historyIndex < history.length - 1) {
    history.splice(historyIndex + 1);
  }

  history.push(current);
  if (history.length > MAX_HISTORY) {
    history.shift();
    historyIndex = history.length - 1;
  } else {
    historyIndex = history.length - 1;
  }
  updateHistoryUI();

  const activePhoto = getActivePhoto();
  if (activePhoto) {
    activePhoto.editState.activePresetId = current.presetId;
    activePhoto.editState.adjustments = { ...current.adjustments };
    activePhoto.editState.effects = { ...current.effects };
    activePhoto.historyState.stack = history.map(snap => ({
      presetId: snap.presetId,
      adjustments: { ...snap.adjustments },
      effects: { ...snap.effects }
    }));
    activePhoto.historyState.index = historyIndex;
  }
}

function restoreState(snapshot) {
  if (!snapshot) return;
  state.isRestoringHistory = true;
  try {
    // 1. Restore preset
    if (snapshot.presetId) {
      state.activePreset = getPresetById(snapshot.presetId);
    } else {
      state.activePreset = null;
    }
    if (el.resetLookLink) el.resetLookLink.disabled = !state.activePreset;
    if (el.btnResetLook) el.btnResetLook.disabled = !state.activePreset;
    updateLookDetail();
    renderRecentRow();
    renderGrid();

    // 2. Restore adjustments
    state.adjustments = { ...DEFAULT_ADJUSTMENTS, ...snapshot.adjustments };
    syncAdjustmentSliders();

    // 3. Restore effects
    state.effects = { ...DEFAULT_EFFECTS, ...snapshot.effects };
    syncEffectSliders();

    // 4. Update per-control reset buttons and group resets
    updateResetBtnStates();

    // 5. Render to canvas
    queue();

    const activePhoto = getActivePhoto();
    if (activePhoto) {
      activePhoto.editState.activePresetId = snapshot.presetId;
      activePhoto.editState.adjustments = { ...state.adjustments };
      activePhoto.editState.effects = { ...state.effects };
    }
  } finally {
    state.isRestoringHistory = false;
  }
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    restoreState(history[historyIndex]);
    updateHistoryUI();
    const activePhoto = getActivePhoto();
    if (activePhoto) {
      activePhoto.historyState.index = historyIndex;
    }
  }
}

function redo() {
  if (historyIndex >= 0 && historyIndex < history.length - 1) {
    historyIndex++;
    restoreState(history[historyIndex]);
    updateHistoryUI();
    const activePhoto = getActivePhoto();
    if (activePhoto) {
      activePhoto.historyState.index = historyIndex;
    }
  }
}

function clearHistory() {
  history.length = 0;
  historyIndex = -1;
  updateHistoryUI();
  const activePhoto = getActivePhoto();
  if (activePhoto) {
    activePhoto.historyState.stack = [];
    activePhoto.historyState.index = -1;
  }
}

function selectPreset(p) {
  if (typeof p === "string") p = getPresetById(p);
  if (!p) return;
  if (state.activePreset && p.id === state.activePreset.id) {
    if (p.source !== "custom") return;
    const matches = isSnapshotEqual(
      { presetId: p.id, adjustments: state.adjustments, effects: state.effects },
      { presetId: p.id, adjustments: p.adjustments, effects: p.effects }
    );
    if (matches) return;
  }
  state.activePreset = p;
  if (p && p.source === "custom") {
    state.adjustments = { ...DEFAULT_ADJUSTMENTS, ...p.adjustments };
    state.effects = { ...DEFAULT_EFFECTS, ...p.effects };
    syncAdjustmentSliders();
    syncEffectSliders();
  }
  if (el.resetLookLink) el.resetLookLink.disabled = false;
  if (el.btnResetLook) el.btnResetLook.disabled = false;
  state.recentIds = [p.id, ...state.recentIds.filter(id => id !== p.id)].slice(0, 8);
  saveStorageList(STORAGE_KEYS.RECENT, state.recentIds);
  updateLookDetail();
  renderRecentRow();
  renderGrid();
  updateResetBtnStates();
  queue();
  recordHistory();
}

function toggleFavorite(presetId) {
  if (state.favorites.has(presetId)) state.favorites.delete(presetId);
  else state.favorites.add(presetId);
  saveStorageList(STORAGE_KEYS.FAVORITES, Array.from(state.favorites));
  updateLookDetail();
  renderGrid();
}

function updateLookDetail() {
  const p = state.activePreset;
  if (!p || !state.sourceImage) {
    if (el.lookDetailCard) el.lookDetailCard.hidden = true;
    if (el.studioLookCard) el.studioLookCard.hidden = true;
    return;
  }
  if (el.lookDetailCard) el.lookDetailCard.hidden = false;
  if (el.detailPresetName) el.detailPresetName.textContent = p.name;
  if (el.detailPresetCollection) {
    if (p.source === "custom") {
      el.detailPresetCollection.textContent = "CUSTOM LOOK";
    } else if (p.category === "KODAK_FILM" || p.collection === "Kodak Film") {
      el.detailPresetCollection.textContent = "KODAK FILM";
    } else {
      el.detailPresetCollection.textContent = cats.find(a => a[0] === p.category)?.[1] || p.collection || p.category;
    }
  }
  if (el.detailPresetDesc) {
    if (p.source === "custom") {
      el.detailPresetDesc.textContent = p.basePresetName ? `Based on ${p.basePresetName}` : "Custom Film Recipe";
    } else if (p.category === "KODAK_FILM" || p.collection === "Kodak Film") {
      const parts = [];
      if (p.stock) parts.push(p.stock);
      if (p.type) parts.push(p.type.toUpperCase());
      if (p.balance) parts.push(p.balance.toUpperCase());
      if (p.iso) parts.push(`ISO ${p.iso}`);
      const metaLine = parts.length > 0 ? parts.join(" · ") : "";
      el.detailPresetDesc.textContent = metaLine ? `${metaLine}\n${p.character || p.description}` : (p.character || p.description);
    } else {
      el.detailPresetDesc.textContent = p.description || p.character || "Authentic film look";
    }
  }
  if (el.detailPresetBestFor) {
    if (p.source === "custom") {
      const d = p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Custom";
      el.detailPresetBestFor.textContent = `Custom Recipe · Saved ${d}`;
    } else {
      const bestForStr = p.recommendedFor && p.recommendedFor.length > 0 ? `Best for: ${p.recommendedFor.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" · ")}` : "Best for: Daylight · Everyday";
      el.detailPresetBestFor.textContent = bestForStr;
    }
  }
  if (el.customDetailActions) {
    el.customDetailActions.hidden = (p.source !== "custom");
  }
  if (el.detailPresetPills) {
    if (p.source === "custom") {
      const pills = [];
      if (p.basePresetName) {
        const span = document.createElement("span");
        span.className = "detail-pill";
        span.textContent = `BASE: ${p.basePresetName.toUpperCase()}`;
        pills.push(span);
      }
      const spanCustom = document.createElement("span");
      spanCustom.className = "detail-pill";
      spanCustom.textContent = "CUSTOM";
      pills.push(spanCustom);
      el.detailPresetPills.replaceChildren(...pills);
    } else {
      const tags = lookMoodTags[p.id] || [];
      el.detailPresetPills.replaceChildren(...tags.map(t => {
        const span = document.createElement("span");
        span.className = "detail-pill";
        span.textContent = t;
        return span;
      }));
    }
  }
  if (el.detailFavBtn) {
    const isFav = state.favorites.has(p.id);
    el.detailFavBtn.classList.toggle("is-fav", isFav);
    const icon = el.detailFavBtn.querySelector(".detail-fav-icon");
    if (icon) icon.textContent = isFav ? "♥" : "♡";
    el.detailFavBtn.setAttribute("aria-label", isFav ? `Remove ${p.name} from favorites` : `Add ${p.name} to favorites`);
    el.detailFavBtn.onclick = () => toggleFavorite(p.id);
  }

  // Update Desktop Studio Look Card
  if (el.studioLookCard) {
    el.studioLookCard.hidden = false;
    if (el.studioPresetName) el.studioPresetName.textContent = p.name;
    if (el.studioPresetBadge) {
      if (p.source === "custom") {
        el.studioPresetBadge.textContent = "CUSTOM";
      } else if (p.category === "KODAK_FILM" || p.collection === "Kodak Film") {
        el.studioPresetBadge.textContent = "KODAK FILM";
      } else {
        el.studioPresetBadge.textContent = (cats.find(a => a[0] === p.category)?.[1] || p.collection || p.category || "LOOK").toUpperCase();
      }
    }
    if (el.studioPresetDesc) {
      if (p.source === "custom") {
        el.studioPresetDesc.textContent = p.basePresetName ? `Based on ${p.basePresetName}` : "Custom Film Recipe";
      } else {
        el.studioPresetDesc.textContent = p.description || p.character || "Authentic film look";
      }
    }
    if (el.studioPresetBestFor) {
      if (p.source === "custom") {
        const d = p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Custom";
        el.studioPresetBestFor.textContent = `Custom Recipe · Saved ${d}`;
      } else {
        const bestForStr = p.recommendedFor && p.recommendedFor.length > 0
          ? `Best for: ${p.recommendedFor.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" · ")}`
          : "Best for: Daylight · Everyday";
        el.studioPresetBestFor.textContent = bestForStr;
      }
    }
    if (el.studioFavBtn) {
      const isFav = state.favorites.has(p.id);
      el.studioFavBtn.classList.toggle("is-fav", isFav);
      const icon = el.studioFavBtn.querySelector(".detail-fav-icon");
      if (icon) icon.textContent = isFav ? "♥" : "♡";
      el.studioFavBtn.setAttribute("aria-label", isFav ? `Remove ${p.name} from favorites` : `Add ${p.name} to favorites`);
      el.studioFavBtn.onclick = () => toggleFavorite(p.id);
    }
    if (el.studioResetLook) {
      el.studioResetLook.disabled = !state.activePreset;
    }
  }
}

function matchPresetSearch(p, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;

  if (p.source === "custom") {
    const name = (p.name || "").toLowerCase();
    const baseName = (p.basePresetName || "").toLowerCase();
    return name.includes(q) || baseName.includes(q) || "custom".includes(q);
  }

  const name = (p.name || "").toLowerCase();
  const desc = (p.description || "").toLowerCase();
  const char = (p.character || "").toLowerCase();
  const cat = (p.category || "").toLowerCase();
  const coll = (p.collection || "").toLowerCase();
  const rec = (Array.isArray(p.recommendedFor) ? p.recommendedFor.join(" ") : "").toLowerCase();
  const mfg = (p.category === "KODAK_FILM" || p.category === "KODAK" ? (p.manufacturer || "") : "").toLowerCase();
  const stock = (p.stock || "").toLowerCase();
  const stockSub = (p.stockSubtitle || "").toLowerCase();
  const fmt = (p.format || "").toLowerCase();
  const typ = (p.type || "").toLowerCase();
  const bal = (p.balance || "").toLowerCase();
  const iso = p.iso != null ? String(p.iso) : "";
  const era = (p.era || "").toLowerCase();
  const grp = (p.group || "").toLowerCase();
  const moods = (lookMoodTags[p.id] || []).join(" ").toLowerCase();
  const catHuman = (cats.find(a => a[0] === p.category)?.[1] || "").toLowerCase();

  return name.includes(q) ||
    desc.includes(q) ||
    char.includes(q) ||
    cat.includes(q) ||
    coll.includes(q) ||
    rec.includes(q) ||
    mfg.includes(q) ||
    stock.includes(q) ||
    stockSub.includes(q) ||
    fmt.includes(q) ||
    typ.includes(q) ||
    bal.includes(q) ||
    iso.includes(q) ||
    era.includes(q) ||
    grp.includes(q) ||
    moods.includes(q) ||
    catHuman.includes(q);
}

function getFilteredPresets() {
  let list = [];
  if (state.selectedCategory === "FAVORITES") {
    list = getAllPresets().filter(p => state.favorites.has(p.id));
  } else if (state.selectedCategory === "CUSTOM") {
    list = customPresets.slice();
  } else if (state.selectedCategory === "ALL") {
    list = getAllPresets();
  } else if (state.selectedCategory === "90S") {
    list = presetLibrary.filter(p => p.category === "1998" || p.category === "Y2K" || p.category === "DISPOSABLE");
  } else if (state.selectedCategory === "JAPANESE") {
    list = presetLibrary.filter(p => p.category === "JAPANESE");
  } else if (state.selectedCategory === "BW") {
    list = presetLibrary.filter(p => p.category === "BW" || p.id === "kodak-double-x-5222");
  } else if (state.selectedCategory === "KODAK_FILM") {
    list = presetLibrary.filter(p => p.category === "KODAK_FILM" || p.collection === "Kodak Film");
  } else {
    const targetMood = state.selectedCategory.toLowerCase();
    list = presetLibrary.filter(p => (lookMoodTags[p.id] || []).includes(targetMood));
    if (list.length === 0) list = presetLibrary.filter(p => p.category === state.selectedCategory);
  }

  const q = (state.searchQuery || "").trim().toLowerCase();
  if (!q) {
    return list;
  }

  const matches = list.filter(p => matchPresetSearch(p, q));

  // Boost exact and prefix name matches, maintaining relative library order
  return matches.slice().sort((a, b) => {
    const aName = (a.name || "").toLowerCase();
    const bName = (b.name || "").toLowerCase();
    const aPrefix = aName.startsWith(q) ? 2 : aName.includes(q) ? 1 : 0;
    const bPrefix = bName.startsWith(q) ? 2 : bName.includes(q) ? 1 : 0;
    if (aPrefix !== bPrefix) return bPrefix - aPrefix;
    return 0;
  });
}

function updateDiscoveryMeta(filteredCount, totalCount) {
  const totalUniverse = presetLibrary.length + customPresets.length;
  if (el.filmIndexAnchor) {
    el.filmIndexAnchor.textContent = `FILM INDEX · ${totalUniverse} LOOKS`;
  }

  if (el.discoveryCount) {
    if (state.selectedCategory === "ALL" && !state.searchQuery.trim()) {
      el.discoveryCount.textContent = `${totalUniverse} looks`;
    } else {
      el.discoveryCount.textContent = `Showing ${filteredCount} of ${totalUniverse} looks`;
    }
  }

  if (el.discoveryFilterChips) {
    const chips = [];
    const q = state.searchQuery.trim();
    if (q) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "filter-chip";
      chip.setAttribute("aria-label", `Remove search filter: ${q}`);
      chip.innerHTML = `“${q}” <span class="filter-chip-remove" aria-hidden="true">✕</span>`;
      chip.onclick = () => {
        state.searchQuery = "";
        if (el.filmSearchInput) el.filmSearchInput.value = "";
        if (el.filmSearchClear) el.filmSearchClear.hidden = true;
        renderGrid();
        renderRecentRow();
      };
      chips.push(chip);
    }

    if (state.selectedCategory !== "ALL") {
      const catTuple = cats.find(c => c[0] === state.selectedCategory);
      const catLabel = catTuple ? catTuple[1].replace("★ ", "") : state.selectedCategory;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "filter-chip";
      chip.setAttribute("aria-label", `Remove category filter: ${catLabel}`);
      chip.innerHTML = `${catLabel} <span class="filter-chip-remove" aria-hidden="true">✕</span>`;
      chip.onclick = () => {
        state.selectedCategory = "ALL";
        state.isMoreOpen = false;
        renderTabs();
        renderGrid();
      };
      chips.push(chip);
    }

    el.discoveryFilterChips.replaceChildren(...chips);
  }

  const hasActiveFilters = Boolean(state.searchQuery.trim() || state.selectedCategory !== "ALL");
  if (el.clearAllFilters) {
    el.clearAllFilters.hidden = !hasActiveFilters;
  }
}

function renderRecentRow() {
  if (!el.recentSection || !el.recentRow) return;
  // Hide recently used while user is actively searching
  if (state.searchQuery.trim().length > 0 || !state.recentIds || state.recentIds.length === 0 || !state.sourceImage) {
    el.recentSection.hidden = true;
    return;
  }
  el.recentSection.hidden = false;
  const recentPresets = state.recentIds.map(id => getPresetById(id)).filter(Boolean);
  el.recentRow.replaceChildren(...recentPresets.map(p => {
    const btn = document.createElement("button");
    btn.type = "button";
    const isActive = state.activePreset?.id === p.id;
    btn.className = `recent-card${isActive ? " is-active" : ""}`;
    btn.setAttribute("aria-label", `Select recent look ${p.name}`);
    const canvas = document.createElement("canvas");
    draw(canvas, state.sourceImage, getPresetEffectiveParams(p), 80);
    const nameSpan = document.createElement("span");
    nameSpan.textContent = p.name;
    btn.append(canvas, nameSpan);
    btn.onclick = () => selectPreset(p);
    return btn;
  }));
}

function surpriseMe() {
  if (!state.sourceImage) return;
  const filtered = getFilteredPresets();
  if (filtered.length === 0) return;

  // Curated film discovery: filter out custom presets if built-in looks are present
  let pool = filtered.filter(p => p.source !== "custom");
  if (pool.length === 0) pool = filtered;

  let candidates = pool.filter(p => p.id !== state.activePreset?.id && p.id !== state.lastSurpriseId);
  if (candidates.length === 0) candidates = pool.filter(p => p.id !== state.activePreset?.id);
  if (candidates.length === 0) candidates = pool;
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  if (!chosen) return;
  state.lastSurpriseId = chosen.id;
  selectPreset(chosen);
}

function renderTabs() {
  if (!el.tabs) return;

  const isMoreCategoryActive = MORE_CATS.some(([id]) => id === state.selectedCategory);
  const activeMoreCat = MORE_CATS.find(([id]) => id === state.selectedCategory);

  const container = document.createDocumentFragment();

  // 1. Primary Category Tabs
  const visiblePrimary = [...PRIMARY_CATS];
  if (customPresets.length > 0 || state.selectedCategory === "CUSTOM") {
    visiblePrimary.splice(1, 0, ["CUSTOM", "Custom"]);
  }

  visiblePrimary.forEach(([id, n]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "category-tab";
    b.role = "tab";
    b.textContent = n;
    b.setAttribute("data-id", id);
    b.setAttribute("aria-selected", String(state.selectedCategory === id));
    b.onclick = () => {
      state.selectedCategory = id;
      state.isMoreOpen = false;
      renderTabs();
      renderGrid();
    };
    container.appendChild(b);
  });

  // 2. More Dropdown Container
  const moreWrap = document.createElement("div");
  moreWrap.className = "category-more-wrap";

  const moreBtn = document.createElement("button");
  moreBtn.type = "button";
  moreBtn.className = `category-tab category-more-btn${isMoreCategoryActive ? " is-active" : ""}`;
  moreBtn.id = "category-more-btn";
  moreBtn.role = "tab";
  moreBtn.setAttribute("aria-haspopup", "menu");
  moreBtn.setAttribute("aria-expanded", String(Boolean(state.isMoreOpen)));
  moreBtn.setAttribute("aria-selected", String(isMoreCategoryActive));

  const moreLabel = isMoreCategoryActive ? `MORE · ${activeMoreCat[1]} ▾` : "MORE ▾";
  moreBtn.textContent = moreLabel;

  moreBtn.onclick = (e) => {
    e.stopPropagation();
    state.isMoreOpen = !state.isMoreOpen;
    renderTabs();
  };

  moreWrap.appendChild(moreBtn);

  // 3. Dropdown Menu
  const dropdown = document.createElement("div");
  dropdown.className = `category-more-dropdown${state.isMoreOpen ? " is-open" : ""}`;
  dropdown.id = "category-more-dropdown";
  dropdown.role = "menu";
  dropdown.setAttribute("aria-label", "Additional film categories");
  if (!state.isMoreOpen) {
    dropdown.hidden = true;
  }

  MORE_CATS.forEach(([id, n]) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `category-dropdown-item${state.selectedCategory === id ? " is-active" : ""}`;
    item.setAttribute("data-id", id);
    item.role = "menuitem";
    item.setAttribute("aria-selected", String(state.selectedCategory === id));

    const nameSpan = document.createElement("span");
    nameSpan.className = "dropdown-item-name";
    nameSpan.textContent = n;
    item.appendChild(nameSpan);

    if (state.selectedCategory === id) {
      const checkSpan = document.createElement("span");
      checkSpan.className = "dropdown-item-check";
      checkSpan.textContent = "✓";
      checkSpan.setAttribute("aria-hidden", "true");
      item.appendChild(checkSpan);
    }

    item.onclick = (e) => {
      e.stopPropagation();
      state.selectedCategory = id;
      state.isMoreOpen = false;
      renderTabs();
      renderGrid();
    };

    dropdown.appendChild(item);
  });

  moreWrap.appendChild(dropdown);
  container.appendChild(moreWrap);

  el.tabs.replaceChildren(container);

  if (state.isMoreOpen) {
    requestAnimationFrame(() => {
      if (!dropdown.isConnected) return;
      const rect = dropdown.getBoundingClientRect();
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      if (rect.right > viewportWidth - 12) {
        const overflowX = rect.right - (viewportWidth - 12);
        dropdown.style.transform = `translateX(-${overflowX}px)`;
      } else if (rect.left < 12) {
        const underflowX = 12 - rect.left;
        dropdown.style.transform = `translateX(${underflowX}px)`;
      } else {
        dropdown.style.transform = "none";
      }
    });
  }
}


function renderGrid() {
  if (!el.grid) return;
  const list = getFilteredPresets();

  const isSearching = Boolean(state.searchQuery.trim());
  const isFavoritesCategory = state.selectedCategory === "FAVORITES";
  const isCustomCategory = state.selectedCategory === "CUSTOM";

  if (list.length === 0) {
    if (isFavoritesCategory && !isSearching && state.favorites.size === 0) {
      if (el.favEmptyState) el.favEmptyState.hidden = false;
      if (el.customEmptyState) el.customEmptyState.hidden = true;
      if (el.searchEmptyState) el.searchEmptyState.hidden = true;
    } else if (isCustomCategory && !isSearching && customPresets.length === 0) {
      if (el.favEmptyState) el.favEmptyState.hidden = true;
      if (el.customEmptyState) el.customEmptyState.hidden = false;
      if (el.searchEmptyState) el.searchEmptyState.hidden = true;
    } else {
      if (el.favEmptyState) el.favEmptyState.hidden = true;
      if (el.customEmptyState) el.customEmptyState.hidden = true;
      if (el.searchEmptyState) {
        el.searchEmptyState.hidden = false;
        if (el.searchEmptyClearBtn) {
          if (isSearching && state.selectedCategory !== "ALL") {
            el.searchEmptyClearBtn.textContent = "Clear search & filter";
          } else if (isSearching) {
            el.searchEmptyClearBtn.textContent = "Clear search";
          } else {
            el.searchEmptyClearBtn.textContent = "Show all looks";
          }
        }
      }
    }
  } else {
    if (el.favEmptyState) el.favEmptyState.hidden = true;
    if (el.customEmptyState) el.customEmptyState.hidden = true;
    if (el.searchEmptyState) el.searchEmptyState.hidden = true;
  }

  el.grid.replaceChildren(...list.map(p => {
    const b = document.createElement("button");
    const wrap = document.createElement("div");
    wrap.className = "preset-thumb-wrap";
    const t = document.createElement("canvas");
    const favBtn = document.createElement("button");
    favBtn.type = "button";
    const isFav = state.favorites.has(p.id);
    favBtn.className = `preset-fav-btn${isFav ? " is-fav" : ""}`;
    favBtn.setAttribute("aria-label", isFav ? `Remove ${p.name} from favorites` : `Add ${p.name} to favorites`);
    favBtn.textContent = isFav ? "♥" : "♡";
    favBtn.onclick = e => { e.stopPropagation(); toggleFavorite(p.id); };
    wrap.append(t, favBtn);

    if (p.source === "custom") {
      const badge = document.createElement("span");
      badge.className = "custom-badge";
      badge.textContent = "Custom";
      wrap.append(badge);

      const actions = document.createElement("div");
      actions.className = "preset-card-custom-actions";

      const renameBtn = document.createElement("button");
      renameBtn.type = "button";
      renameBtn.className = "card-action-btn";
      renameBtn.title = "Rename custom look";
      renameBtn.setAttribute("aria-label", `Rename ${p.name}`);
      renameBtn.textContent = "✎";
      renameBtn.onclick = e => {
        e.stopPropagation();
        openCustomLookModal("rename", p.id, p.name);
      };

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "card-action-btn is-delete";
      delBtn.title = "Delete custom look";
      delBtn.setAttribute("aria-label", `Delete ${p.name}`);
      delBtn.textContent = "✕";
      delBtn.onclick = e => {
        e.stopPropagation();
        openCustomDeleteModal(p.id, p.name);
      };

      actions.append(renameBtn, delBtn);
      wrap.append(actions);
    }

    const n = document.createElement("strong");
    const c = document.createElement("small");
    const isActive = state.activePreset?.id === p.id;
    b.type = "button";
    b.className = `preset-card${isActive ? " is-active" : ""}${p.source === "custom" ? " is-custom" : ""}`;
    b.setAttribute("aria-pressed", String(isActive));
    b.setAttribute("aria-label", p.source === "custom" ? `${p.name}, Custom film recipe based on ${p.basePresetName || "built-in look"}` : `${p.name}, ${p.description}`);
    if (state.sourceImage) draw(t, state.sourceImage, getPresetEffectiveParams(p), 320);
    n.textContent = p.name;
    if (p.source === "custom") {
      c.textContent = p.basePresetName ? `Based on ${p.basePresetName}` : "Custom Look";
    } else if (p.category === "KODAK_FILM" || p.collection === "Kodak Film") {
      c.textContent = p.stockSubtitle || p.character || p.description;
    } else {
      c.textContent = cats.find(a => a[0] === p.category)?.[1] || p.character || p.description || p.category;
    }
    b.append(wrap, n, c);
    b.onclick = () => selectPreset(p);
    return b;
  }));

  updateDiscoveryMeta(list.length, presetLibrary.length + customPresets.length);
  renderStudioPresets();
}

function renderStudioPresets() {
  if (!el.studioCompactGrid) return;
  const presets = getAllPresets();
  if (el.studioQuickCount) {
    el.studioQuickCount.textContent = `${presets.length} looks`;
  }

  el.studioCompactGrid.replaceChildren(...presets.map(p => {
    const btn = document.createElement("button");
    btn.type = "button";
    const isActive = state.activePreset?.id === p.id;
    btn.className = `compact-preset-card${isActive ? " is-active" : ""}${p.source === "custom" ? " is-custom" : ""}`;
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", String(isActive));
    btn.setAttribute("aria-label", p.name);

    const nameSpan = document.createElement("span");
    nameSpan.className = "compact-preset-name";
    nameSpan.textContent = p.name;

    const catSpan = document.createElement("span");
    catSpan.className = "compact-preset-cat";
    catSpan.textContent = p.source === "custom" ? "Custom" : (p.category === "KODAK_FILM" ? "Kodak" : (p.category || "Look"));

    btn.append(nameSpan, catSpan);
    btn.onclick = () => selectPreset(p);
    return btn;
  }));
}

function updateResetBtnStates() {
  adjustKeys.forEach(k => {
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    const btn = el[`resetAdj${cap}`];
    const isDirty = (state.adjustments[k] || 0) !== DEFAULT_ADJUSTMENTS[k];
    if (btn) btn.disabled = !isDirty;
  });

  effectKeys.forEach(k => {
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    const btn = el[`resetEff${cap}`];
    const isDirty = (state.effects[k] || 0) !== DEFAULT_EFFECTS[k];
    if (btn) btn.disabled = !isDirty;
  });

  if (el.resetEffBorder) {
    el.resetEffBorder.disabled = (state.effects.border || "none") === DEFAULT_EFFECTS.border;
  }

  const hasAdjChanges = adjustKeys.some(k => (state.adjustments[k] || 0) !== DEFAULT_ADJUSTMENTS[k]);
  if (el.resetAdjLink) el.resetAdjLink.disabled = !hasAdjChanges;
  if (el.btnResetAdj) el.btnResetAdj.disabled = !hasAdjChanges;

  const hasLightChanges = lightKeys.some(k => (state.adjustments[k] || 0) !== DEFAULT_ADJUSTMENTS[k]);
  if (el.resetGroupLight) el.resetGroupLight.disabled = !hasLightChanges;

  const hasColorChanges = colorKeys.some(k => (state.adjustments[k] || 0) !== DEFAULT_ADJUSTMENTS[k]);
  if (el.resetGroupColor) el.resetGroupColor.disabled = !hasColorChanges;

  const hasEffChanges = effectKeys.some(k => (state.effects[k] || 0) !== DEFAULT_EFFECTS[k]) || (state.effects.border || "none") !== DEFAULT_EFFECTS.border;
  if (el.resetEffLink) el.resetEffLink.disabled = !hasEffChanges;
  if (el.btnResetEff) el.btnResetEff.disabled = !hasEffChanges;

  const hasAnyChanges = state.activePreset !== null || hasAdjChanges || hasEffChanges;
  if (el.resetAllLink) el.resetAllLink.disabled = !hasAnyChanges;
  if (el.btnResetAll) el.btnResetAll.disabled = !hasAnyChanges;
}

function syncAdjustmentSliders() {
  adjustKeys.forEach(k => {
    const val = state.adjustments[k] || 0;
    const input = el[`adj${k.charAt(0).toUpperCase() + k.slice(1)}`];
    const badge = el[`val${k.charAt(0).toUpperCase() + k.slice(1)}`];
    if (input) input.value = val;
    if (badge) badge.textContent = formatVal(val);
  });
  updateResetBtnStates();
}

function syncEffectSliders() {
  effectKeys.forEach(k => {
    const val = state.effects[k] || 0;
    const input = el[`eff${k.charAt(0).toUpperCase() + k.slice(1)}`];
    const badge = el[`val${k.charAt(0).toUpperCase() + k.slice(1)}`];
    if (input) input.value = val;
    if (badge) badge.textContent = formatVal(val);
  });
  if (el.effBorder) el.effBorder.value = state.effects.border || "none";
  updateResetBtnStates();
}

function resetSingleAdjustment(k) {
  if (state.adjustments[k] === DEFAULT_ADJUSTMENTS[k]) return;
  state.adjustments[k] = DEFAULT_ADJUSTMENTS[k];
  const cap = k.charAt(0).toUpperCase() + k.slice(1);
  const input = el[`adj${cap}`];
  const badge = el[`val${cap}`];
  if (input) input.value = DEFAULT_ADJUSTMENTS[k];
  if (badge) badge.textContent = formatVal(DEFAULT_ADJUSTMENTS[k]);
  updateResetBtnStates();
  queue();
  recordHistory();
}

function resetSingleEffect(k) {
  if (state.effects[k] === DEFAULT_EFFECTS[k]) return;
  state.effects[k] = DEFAULT_EFFECTS[k];
  const cap = k.charAt(0).toUpperCase() + k.slice(1);
  const input = el[`eff${cap}`];
  const badge = el[`val${cap}`];
  if (input) input.value = DEFAULT_EFFECTS[k];
  if (badge) badge.textContent = formatVal(DEFAULT_EFFECTS[k]);
  updateResetBtnStates();
  queue();
  recordHistory();
}

function resetSingleBorder() {
  if (state.effects.border === DEFAULT_EFFECTS.border) return;
  state.effects.border = DEFAULT_EFFECTS.border;
  if (el.effBorder) el.effBorder.value = DEFAULT_EFFECTS.border;
  updateResetBtnStates();
  queue();
  recordHistory();
}

function setupSliders() {
  adjustKeys.forEach(k => {
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    const input = el[`adj${cap}`];
    const badge = el[`val${cap}`];
    if (!input) return;
    input.oninput = e => {
      const v = parseInt(e.target.value, 10) || 0;
      state.adjustments[k] = v;
      if (badge) badge.textContent = formatVal(v);
      updateResetBtnStates();
      queue();
    };
    input.onchange = () => recordHistory();
    input.addEventListener("pointerup", () => recordHistory());
    input.ondblclick = () => resetSingleAdjustment(k);
  });

  effectKeys.forEach(k => {
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    const input = el[`eff${cap}`];
    const badge = el[`val${cap}`];
    if (!input) return;
    input.oninput = e => {
      const v = parseInt(e.target.value, 10) || 0;
      state.effects[k] = v;
      if (badge) badge.textContent = formatVal(v);
      updateResetBtnStates();
      queue();
    };
    input.onchange = () => recordHistory();
    input.addEventListener("pointerup", () => recordHistory());
    input.ondblclick = () => resetSingleEffect(k);
  });

  if (el.effBorder) {
    el.effBorder.onchange = e => {
      state.effects.border = e.target.value;
      updateResetBtnStates();
      queue();
      recordHistory();
    };
  }
}

function resetLook() {
  state.activePreset = null;
  el.resetLookLink.disabled = true;
  if (el.btnResetLook) el.btnResetLook.disabled = true;
  updateLookDetail();
  renderRecentRow();
  renderGrid();
  updateResetBtnStates();
  queue();
  recordHistory();
}

function resetLightGroup() {
  const hasChanges = lightKeys.some(k => (state.adjustments[k] || 0) !== DEFAULT_ADJUSTMENTS[k]);
  if (!hasChanges) return;
  lightKeys.forEach(k => {
    state.adjustments[k] = DEFAULT_ADJUSTMENTS[k];
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    const input = el[`adj${cap}`];
    const badge = el[`val${cap}`];
    if (input) input.value = DEFAULT_ADJUSTMENTS[k];
    if (badge) badge.textContent = formatVal(DEFAULT_ADJUSTMENTS[k]);
  });
  updateResetBtnStates();
  queue();
  recordHistory();
}

function resetColorGroup() {
  const hasChanges = colorKeys.some(k => (state.adjustments[k] || 0) !== DEFAULT_ADJUSTMENTS[k]);
  if (!hasChanges) return;
  colorKeys.forEach(k => {
    state.adjustments[k] = DEFAULT_ADJUSTMENTS[k];
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    const input = el[`adj${cap}`];
    const badge = el[`val${cap}`];
    if (input) input.value = DEFAULT_ADJUSTMENTS[k];
    if (badge) badge.textContent = formatVal(DEFAULT_ADJUSTMENTS[k]);
  });
  updateResetBtnStates();
  queue();
  recordHistory();
}

function resetAdjustments() {
  const hasChanges = adjustKeys.some(k => (state.adjustments[k] || 0) !== DEFAULT_ADJUSTMENTS[k]);
  if (!hasChanges) return;
  state.adjustments = { ...DEFAULT_ADJUSTMENTS };
  syncAdjustmentSliders();
  queue();
  recordHistory();
}

function resetEffects() {
  state.effects = { ...DEFAULT_EFFECTS };
  syncEffectSliders();
  queue();
  recordHistory();
}

function resetAll() {
  state.activePreset = null;
  state.adjustments = { ...DEFAULT_ADJUSTMENTS };
  state.effects = { ...DEFAULT_EFFECTS };
  el.resetLookLink.disabled = true;
  if (el.btnResetLook) el.btnResetLook.disabled = true;
  syncAdjustmentSliders();
  syncEffectSliders();
  updateLookDetail();
  renderRecentRow();
  renderGrid();
  queue();
  recordHistory();
}

function setupResetControls() {
  if (el.resetLookLink) el.resetLookLink.onclick = resetLook;
  if (el.resetAdjLink) el.resetAdjLink.onclick = resetAdjustments;
  if (el.resetGroupLight) el.resetGroupLight.onclick = resetLightGroup;
  if (el.resetGroupColor) el.resetGroupColor.onclick = resetColorGroup;
  if (el.resetEffLink) el.resetEffLink.onclick = resetEffects;
  if (el.resetAllLink) el.resetAllLink.onclick = resetAll;

  // Individual Per-Control Resets
  adjustKeys.forEach(k => {
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    const btn = el[`resetAdj${cap}`];
    if (btn) {
      btn.onclick = e => {
        e.stopPropagation();
        resetSingleAdjustment(k);
      };
    }
  });

  effectKeys.forEach(k => {
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    const btn = el[`resetEff${cap}`];
    if (btn) {
      btn.onclick = e => {
        e.stopPropagation();
        resetSingleEffect(k);
      };
    }
  });

  if (el.resetEffBorder) {
    el.resetEffBorder.onclick = e => {
      e.stopPropagation();
      resetSingleBorder();
    };
  }

  if (el.resetMenuBtn) {
    el.resetMenuBtn.onclick = e => { e.stopPropagation(); if (el.resetDropdown) { el.resetDropdown.hidden = !el.resetDropdown.hidden; el.resetMenuBtn.setAttribute("aria-expanded", String(!el.resetDropdown.hidden)); } };
    document.addEventListener("click", () => { if (el.resetDropdown && !el.resetDropdown.hidden) { el.resetDropdown.hidden = true; el.resetMenuBtn.setAttribute("aria-expanded", "false"); } });
  }
  if (el.btnResetLook) el.btnResetLook.onclick = () => { resetLook(); if (el.resetDropdown) el.resetDropdown.hidden = true; };
  if (el.btnResetAdj) el.btnResetAdj.onclick = () => { resetAdjustments(); if (el.resetDropdown) el.resetDropdown.hidden = true; };
  if (el.btnResetEff) el.btnResetEff.onclick = () => { resetEffects(); if (el.resetDropdown) el.resetDropdown.hidden = true; };
  if (el.btnResetAll) el.btnResetAll.onclick = () => { resetAll(); if (el.resetDropdown) el.resetDropdown.hidden = true; };
}


async function downloadPhoto() {
  if (!state.sourceImage) return;
  el.downloadBtn.disabled = true;
  if (el.mobileDownload) el.mobileDownload.disabled = true;
  const origText = el.downloadText ? el.downloadText.textContent : "Download";
  if (el.downloadText) el.downloadText.textContent = "Exporting JPEG...";
  if (el.mobileDownloadText) el.mobileDownloadText.textContent = "Exporting...";
  setProcessingStatus("exporting");
  try {
    await new Promise(resolve => setTimeout(resolve, 20));
    const exportCanvas = document.createElement("canvas");
    const effective = getEffectiveParams();
    draw(exportCanvas, state.sourceImage, effective, Infinity);
    await new Promise((resolve, reject) => {
      exportCanvas.toBlob(blob => {
        if (!blob) { reject(new Error("Blob generation failed")); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const rawName = (state.sourceFileName || "photo").replace(/\.[^/.]+$/, "");
        const lookSlug = effective.id !== "custom" && effective.id !== "look" ? effective.id : "edited";
        a.download = `filmlab-${rawName}-${lookSlug}.jpg`;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        resolve();
      }, "image/jpeg", 0.95);
    });
    setProcessingStatus("ready");
  } catch (err) {
    console.error("Export error:", err);
    fail("Export failed. The image may exceed available browser memory.");
  } finally {
    el.downloadBtn.disabled = false;
    if (el.mobileDownload) el.mobileDownload.disabled = false;
    if (el.downloadText) el.downloadText.textContent = origText;
    if (el.mobileDownloadText) el.mobileDownloadText.textContent = "Download";
  }
}

function enterEditorMode(file) {
  el.shell.classList.add("is-editor-mode");
  if (el.appShell) el.appShell.classList.add("is-editor-mode");
  document.body.classList.add("is-editor-mode");
  el.introPanel.hidden = true;
  el.emptyState.hidden = true;
  el.uploadPanel.hidden = true;
  el.studioHeaderActions.hidden = false;
  if (el.stageToolbar) el.stageToolbar.hidden = false;
  el.stageViewport.hidden = false;
  el.studioDock.hidden = false;
  el.previewStage.classList.add("has-image");
  const rawName = file.name || "Photograph";
  let displayName = rawName;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const ext = rawName.includes(".") ? rawName.slice(rawName.lastIndexOf(".")) : "";
  const baseWithoutExt = rawName.includes(".") ? rawName.slice(0, rawName.lastIndexOf(".")) : rawName;
  if (uuidRegex.test(baseWithoutExt)) {
    displayName = `Photograph${ext || ".jpg"}`;
  }
  el.fileName.textContent = displayName;
  el.fileName.title = `${displayName} (${state.sourceImage.naturalWidth} × ${state.sourceImage.naturalHeight})`;
  const dims = `${state.sourceImage.naturalWidth} × ${state.sourceImage.naturalHeight}`;
  el.fileDimensions.textContent = dims;
  el.imageMeta.textContent = dims;
  el.imageMeta.hidden = false;
  updatePreviewAspectRatio(state.sourceImage.naturalWidth, state.sourceImage.naturalHeight);


  // P0.2: Instant Film Experience after upload
  const heroPreset = presetLibrary.find(p => p.id === "1998-warm") || presetLibrary[0];
  state.activePreset = heroPreset;
  if (heroPreset && !state.recentIds.includes(heroPreset.id)) {
    state.recentIds = [heroPreset.id, ...state.recentIds].slice(0, 8);
    saveStorageList(STORAGE_KEYS.RECENT, state.recentIds);
  }
  if (el.resetLookLink) el.resetLookLink.disabled = false;
  if (el.btnResetLook) el.btnResetLook.disabled = false;
  if (el.saveLookBtn) el.saveLookBtn.disabled = false;
  if (el.studioSaveLookBtn) el.studioSaveLookBtn.disabled = false;

  renderTabs();
  renderRecentRow();
  updateLookDetail();
  renderGrid();
  syncAdjustmentSliders();
  syncEffectSliders();
  state.splitPos = 50;
  state.previousCompareMode = null;
  state.isPressHolding = false;
  state.preHoldMode = null;
  setCompareMode("edited");
  if (el.mobileActionBar) el.mobileActionBar.hidden = false;
  setActivePanel("looks");
  setStudioMode("presets");
  renderStudioPresets();
  queue();
  renderFilmstrip();

  // Phase 5.0: Initialize fresh history stack with initial state
  clearHistory();
  recordHistory();
}


function remove() {
  for (const p of workspace.photos) {
    if (p.previewUrl) {
      try { URL.revokeObjectURL(p.previewUrl); } catch {}
      p.previewUrl = null;
    }
  }
  workspace.photos = [];
  workspace.activePhotoId = null;
  if (el.filmstripBar) el.filmstripBar.hidden = true;
  if (el.filmstripTrack) el.filmstripTrack.replaceChildren();

  revoke();
  state.sourceImage = null;
  state.sourceFileName = "";
  state.activePreset = null;
  state.adjustments = { ...DEFAULT_ADJUSTMENTS };
  state.effects = { ...DEFAULT_EFFECTS };
  state.isSplitActive = false;
  state.compareMode = "edited";
  state.previousCompareMode = null;
  state.isPressHolding = false;
  state.preHoldMode = null;
  state.splitPos = 50;
  setCompareMode("edited");
  state.token++;
  if (state.frame) cancelAnimationFrame(state.frame);
  el.image.removeAttribute("src");
  el.shell.classList.remove("is-editor-mode");
  if (el.appShell) el.appShell.classList.remove("is-editor-mode");
  document.body.classList.remove("is-editor-mode");
  el.introPanel.hidden = false;
  el.emptyState.hidden = false;
  el.uploadPanel.hidden = false;
  el.studioHeaderActions.hidden = true;
  if (el.stageToolbar) el.stageToolbar.hidden = true;
  el.stageViewport.hidden = true;
  el.studioDock.hidden = true;
  if (el.studioDock) delete el.studioDock.dataset.studioMode;
  el.imageMeta.hidden = true;
  el.previewStage.classList.remove("has-image");
  if (el.stageViewport) {
    el.stageViewport.style.removeProperty("--image-aspect-ratio");
    el.stageViewport.style.removeProperty("--ratio-w");
    el.stageViewport.style.removeProperty("--ratio-h");
    el.stageViewport.style.aspectRatio = "";
    delete el.stageViewport.dataset.aspectOrientation;
  }
  if (el.previewStage) {
    el.previewStage.style.removeProperty("--image-aspect-ratio");
    el.previewStage.style.removeProperty("--ratio-w");
    el.previewStage.style.removeProperty("--ratio-h");
    delete el.previewStage.dataset.aspectOrientation;
  }
  if (el.lookDetailCard) el.lookDetailCard.hidden = true;
  if (el.studioLookCard) el.studioLookCard.hidden = true;
  if (el.recentSection) el.recentSection.hidden = true;
  if (el.mobileActionBar) el.mobileActionBar.hidden = true;
  if (el.saveLookBtn) el.saveLookBtn.disabled = true;
  if (el.studioSaveLookBtn) el.studioSaveLookBtn.disabled = true;
  if (el.shell) delete el.shell.dataset.activePanel;
  setActivePanel("looks");
  clear();
  if (el.input) el.input.value = "";
  state.searchQuery = "";
  state.selectedCategory = "ALL";
  if (el.filmSearchInput) el.filmSearchInput.value = "";
  if (el.filmSearchClear) el.filmSearchClear.hidden = true;
  if (el.searchEmptyState) el.searchEmptyState.hidden = true;
  if (el.customEmptyState) el.customEmptyState.hidden = true;
  updateResetBtnStates();
  clearHistory();
  setProcessingStatus("idle");
}

const wait = (img, url) => new Promise((ok, no) => { img.onload = ok; img.onerror = () => state.previewUrl === url && no(); });

async function ingestFiles(files, options = {}) {
  clear();
  const fileList = Array.from(files || []);
  if (fileList.length === 0) return { success: false, ingested: 0 };

  const validFiles = [];
  for (const file of fileList) {
    if (!TYPES.has(file.type)) {
      if (fileList.length === 1) {
        fail("Choose a JPEG, PNG, or WebP image. HEIC files are not supported in this browser version.");
        if (el.input) el.input.value = "";
        return { success: false, ingested: 0 };
      }
      console.warn(`[FILM LAB] Skipped unsupported file: ${file.name}`);
      continue;
    }
    if (file.size > MAX) {
      if (fileList.length === 1) {
        fail("This photo is larger than 30 MB. Choose a smaller image to keep the editor responsive.");
        if (el.input) el.input.value = "";
        return { success: false, ingested: 0 };
      }
      console.warn(`[FILM LAB] Skipped file exceeding 30MB: ${file.name}`);
      continue;
    }
    validFiles.push(file);
  }

  if (validFiles.length === 0) {
    fail("None of the selected files could be processed. Please choose JPEG, PNG, or WebP images under 30 MB.");
    if (el.input) el.input.value = "";
    return { success: false, ingested: 0 };
  }

  const availableSlots = workspace.maxPhotos - workspace.photos.length;
  if (availableSlots <= 0) {
    console.warn(`[FILM LAB] Workspace limit of ${workspace.maxPhotos} photos reached.`);
    return { success: false, ingested: 0, reason: "limit_reached" };
  }
  const filesToIngest = validFiles.slice(0, availableSlots);

  const newRecords = [];
  for (const file of filesToIngest) {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => {
          try { URL.revokeObjectURL(url); } catch {}
          reject(new Error(`Failed to load ${file.name}`));
        };
        img.src = url;
      });
      const record = createPhotoRecord(file, img, url);
      newRecords.push({ record, file });
    } catch (err) {
      console.warn(`[FILM LAB] Could not load image: ${file.name}`, err);
    }
  }

  if (newRecords.length === 0) {
    fail("This image could not be opened. Try another photo or save it again before uploading.");
    if (el.input) el.input.value = "";
    return { success: false, ingested: 0 };
  }

  const wasEmpty = workspace.photos.length === 0;
  for (const item of newRecords) {
    workspace.photos.push(item.record);
  }

  if (wasEmpty) {
    const firstItem = newRecords[0];
    workspace.activePhotoId = firstItem.record.id;
    state.sourceImage = firstItem.record.sourceImage;
    state.sourceFileName = firstItem.record.name;
    state.previewUrl = firstItem.record.previewUrl;
    el.image.src = firstItem.record.previewUrl;
    el.image.alt = "Preview of " + firstItem.record.name;
    enterEditorMode(firstItem.file);
  } else if (options.forceActive && newRecords.length > 0) {
    setActivePhoto(newRecords[0].record.id);
  } else {
    renderFilmstrip();
  }

  if (el.input) el.input.value = "";
  return { success: true, ingested: newRecords.length };
}

async function show(file) {
  return ingestFiles([file]);
}

const choose = () => { clear(); if (el.input) el.input.value = ""; if (el.input) el.input.click(); };
const files = f => { if (f && f.length) void ingestFiles(f); };
el.select.onclick = choose;
el.headerReplace.onclick = choose;
el.headerRemove.onclick = remove;
el.downloadBtn.onclick = downloadPhoto;
if (el.surpriseBtn) el.surpriseBtn.onclick = surpriseMe;
el.input.onchange = e => files(e.target.files);
["dragenter", "dragover"].forEach(n => el.drop.addEventListener(n, e => { e.preventDefault(); el.drop.classList.add("is-dragging"); }));
["dragleave", "drop"].forEach(n => el.drop.addEventListener(n, e => { e.preventDefault(); el.drop.classList.remove("is-dragging"); }));
el.drop.addEventListener("drop", e => files(e.dataTransfer.files));

// Full Light Table (empty state & preview stage) upload zone
if (el.previewStage) {
  el.previewStage.addEventListener("click", () => {
    if (el.shell && !el.shell.classList.contains("is-editor-mode")) {
      choose();
    }
  });

  const setStageDrag = (isDragging) => {
    if (el.previewStage) el.previewStage.classList.toggle("is-dragging", isDragging);
    if (el.emptyState) el.emptyState.classList.toggle("is-dragging", isDragging);
  };

  ["dragenter", "dragover"].forEach(n => {
    el.previewStage.addEventListener(n, (e) => {
      e.preventDefault();
      setStageDrag(true);
    });
  });

  ["dragleave", "drop"].forEach(n => {
    el.previewStage.addEventListener(n, (e) => {
      e.preventDefault();
      setStageDrag(false);
    });
  });

  el.previewStage.addEventListener("drop", (e) => {
    e.preventDefault();
    setStageDrag(false);
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
      files(e.dataTransfer.files);
    }
  });
}

if (el.emptyState) {
  el.emptyState.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && el.shell && !el.shell.classList.contains("is-editor-mode")) {
      e.preventDefault();
      choose();
    }
  });
}

// Global paste listener: paste image files anywhere on page
window.addEventListener("paste", (e) => {
  const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
  if (activeTag === "input" || activeTag === "textarea") return;

  const items = e.clipboardData && e.clipboardData.items;
  if (!items) return;

  const pastedFiles = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].type && items[i].type.startsWith("image/")) {
      const file = items[i].getAsFile();
      if (file) pastedFiles.push(file);
    }
  }

  if (pastedFiles.length > 0) {
    e.preventDefault();
    files(pastedFiles);
  }
});
function setupCategoryEvents() {
  document.addEventListener("click", (e) => {
    if (state.isMoreOpen && !e.target.closest(".category-more-wrap")) {
      state.isMoreOpen = false;
      renderTabs();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.isMoreOpen) {
      state.isMoreOpen = false;
      renderTabs();
      const btn = document.getElementById("category-more-btn");
      if (btn) btn.focus();
    }
  });
}

function setActivePanel(panel) {
  if (!["looks", "adjust", "fx"].includes(panel)) panel = "looks";
  state.activePanel = panel;
  if (el.shell) el.shell.dataset.activePanel = panel;
  
  const tabs = [
    { btn: el.tabLooks, name: "looks" },
    { btn: el.tabAdjust, name: "adjust" },
    { btn: el.tabFx, name: "fx" }
  ];
  for (const t of tabs) {
    if (t.btn) {
      const isActive = t.name === panel;
      t.btn.classList.toggle("is-active", isActive);
      t.btn.setAttribute("aria-selected", isActive ? "true" : "false");
    }
  }

  // Sync studio mode on desktop
  const targetStudioMode = panel === "adjust" ? "adjust" : (panel === "fx" ? "effects" : "presets");
  setStudioMode(targetStudioMode);

  // Open corresponding accordion when switching to Adjust or FX
  if (panel === "adjust" && el.accordionAdjust && !el.accordionAdjust.open) {
    el.accordionAdjust.open = true;
  }
  if (panel === "fx" && el.accordionEffects && !el.accordionEffects.open) {
    el.accordionEffects.open = true;
  }

  // Ensure scrollable panel starts at top when switching tabs
  if (el.studioDock) {
    el.studioDock.scrollTop = 0;
  }
}

function setupEditorTabs() {
  if (el.editorTabs) {
    el.editorTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".editor-tab");
      if (!tab || !tab.dataset.panel) return;
      setActivePanel(tab.dataset.panel);
    });
  }

  if (el.mobileReplace) {
    el.mobileReplace.onclick = choose;
  }
  if (el.mobileDownload) {
    el.mobileDownload.onclick = downloadPhoto;
  }
}

function setStudioMode(mode) {
  if (!["presets", "adjust", "effects"].includes(mode)) mode = "presets";
  state.studioMode = mode;
  if (el.studioDock) el.studioDock.dataset.studioMode = mode;

  const modeBtns = [
    { btn: el.modePresets, mode: "presets" },
    { btn: el.modeAdjust, mode: "adjust" },
    { btn: el.modeEffects, mode: "effects" }
  ];

  for (const mb of modeBtns) {
    if (mb.btn) {
      const isActive = mb.mode === mode;
      mb.btn.classList.toggle("is-active", isActive);
      mb.btn.setAttribute("aria-selected", isActive ? "true" : "false");
    }
  }

  if (mode === "adjust" && el.accordionAdjust && !el.accordionAdjust.open) {
    el.accordionAdjust.open = true;
  }
  if (mode === "effects" && el.accordionEffects && !el.accordionEffects.open) {
    el.accordionEffects.open = true;
  }
}

function setupStudioModes() {
  if (el.studioModes) {
    el.studioModes.addEventListener("click", (e) => {
      const btn = e.target.closest(".studio-mode-btn");
      if (!btn || !btn.dataset.mode) return;
      setStudioMode(btn.dataset.mode);
    });
  }

  if (el.studioSaveLookBtn) {
    el.studioSaveLookBtn.onclick = () => {
      if (!state.sourceImage) return;
      openCustomLookModal("save");
    };
  }
  if (el.studioSurpriseBtn) {
    el.studioSurpriseBtn.onclick = surpriseMe;
  }
  if (el.studioResetLook) {
    el.studioResetLook.onclick = resetLook;
  }
}

function setupHistory() {
  if (el.btnUndo) el.btnUndo.onclick = undo;
  if (el.btnRedo) el.btnRedo.onclick = redo;

  window.addEventListener("keydown", (e) => {
    // Only handle shortcuts when in active editor mode with an image loaded
    if (!state.sourceImage || !el.shell?.classList.contains("is-editor-mode")) {
      return;
    }

    // Do not intercept if focus is inside a text-editable element
    const target = e.target;
    const isTextInput = target && (
      (target.tagName === "INPUT" && target.type !== "range" && target.type !== "button" && target.type !== "submit" && target.type !== "reset") ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable
    );
    if (isTextInput) {
      return;
    }

    // Phase 5.2: Comparison shortcut Backslash (\)
    if (e.key === "\\") {
      e.preventDefault();
      if (state.compareMode === "original") {
        setCompareMode(state.previousCompareMode || "edited");
        state.previousCompareMode = null;
      } else {
        state.previousCompareMode = state.compareMode || "edited";
        setCompareMode("original");
      }
      return;
    }

    // Phase 5.2: Split keyboard navigation when split is active and focus not on other inputs/buttons
    if (state.isSplitActive && !e.target?.closest("#split-divider")) {
      const activeTag = document.activeElement ? document.activeElement.tagName : "";
      const isInputOrButton = activeTag === "INPUT" || activeTag === "BUTTON" || activeTag === "SELECT" || activeTag === "TEXTAREA";
      if (!isInputOrButton && document.activeElement !== el.splitHandle) {
        const step = e.shiftKey ? 10 : 5;
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          state.splitPos = Math.max(0, state.splitPos - step);
          updateSplitView();
          return;
        } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          state.splitPos = Math.min(100, state.splitPos + step);
          updateSplitView();
          return;
        } else if (e.key === "Home") {
          e.preventDefault();
          state.splitPos = 0;
          updateSplitView();
          return;
        } else if (e.key === "End") {
          e.preventDefault();
          state.splitPos = 100;
          updateSplitView();
          return;
        }
      }
    }

    const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const modifier = isMac ? e.metaKey : e.ctrlKey;

    if (!modifier) return;

    // Undo: Ctrl/Cmd + Z (without Shift)
    if (e.key.toLowerCase() === "z" && !e.shiftKey) {
      e.preventDefault();
      undo();
      return;
    }

    // Redo: Ctrl/Cmd + Shift + Z
    if (e.key.toLowerCase() === "z" && e.shiftKey) {
      e.preventDefault();
      redo();
      return;
    }

    // Redo: Ctrl/Cmd + Y
    if (e.key.toLowerCase() === "y" && !e.shiftKey) {
      e.preventDefault();
      redo();
      return;
    }
  });
}

function setupSearch() {
  if (el.filmSearchInput) {
    el.filmSearchInput.addEventListener("input", () => {
      state.searchQuery = el.filmSearchInput.value;
      if (el.filmSearchClear) {
        el.filmSearchClear.hidden = !state.searchQuery.trim();
      }
      renderGrid();
      renderRecentRow();
    });

    el.filmSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.filmSearchInput.value) {
        el.filmSearchInput.value = "";
        state.searchQuery = "";
        if (el.filmSearchClear) el.filmSearchClear.hidden = true;
        renderGrid();
        renderRecentRow();
      }
    });
  }

  if (el.filmSearchClear) {
    el.filmSearchClear.addEventListener("click", () => {
      state.searchQuery = "";
      if (el.filmSearchInput) {
        el.filmSearchInput.value = "";
        el.filmSearchInput.focus();
      }
      el.filmSearchClear.hidden = true;
      renderGrid();
      renderRecentRow();
    });
  }

  if (el.clearAllFilters) {
    el.clearAllFilters.addEventListener("click", () => {
      state.searchQuery = "";
      state.selectedCategory = "ALL";
      state.isMoreOpen = false;
      if (el.filmSearchInput) el.filmSearchInput.value = "";
      if (el.filmSearchClear) el.filmSearchClear.hidden = true;
      renderTabs();
      renderGrid();
      renderRecentRow();
    });
  }

  if (el.searchEmptyClearBtn) {
    el.searchEmptyClearBtn.addEventListener("click", () => {
      state.searchQuery = "";
      state.selectedCategory = "ALL";
      state.isMoreOpen = false;
      if (el.filmSearchInput) el.filmSearchInput.value = "";
      if (el.filmSearchClear) el.filmSearchClear.hidden = true;
      renderTabs();
      renderGrid();
      renderRecentRow();
    });
  }
}

let customModalMode = "save";
let customTargetId = null;
let customDeleteTargetId = null;

function saveCustomLook(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) {
    return { success: false, error: "Please enter a name for your custom look." };
  }
  if (trimmed.length > 50) {
    return { success: false, error: "Name must be 50 characters or fewer." };
  }
  if (!state.sourceImage) {
    return { success: false, error: "No photo loaded to save recipe from." };
  }

  const baseP = (state.activePreset && state.activePreset.source === "custom")
    ? (presetLibrary.find(x => x.id === state.activePreset.basePresetId) || presetLibrary[0])
    : (state.activePreset || presetLibrary[0]);

  const id = `custom:${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const now = Date.now();
  const custom = {
    ...baseP,
    id,
    name: trimmed,
    source: "custom",
    category: "CUSTOM",
    basePresetId: baseP.id,
    basePresetName: baseP.name,
    adjustments: { ...state.adjustments },
    effects: { ...state.effects },
    createdAt: now,
    updatedAt: now
  };

  customPresets.unshift(custom);
  const saved = saveCustomPresetsToStorage();
  if (!saved) {
    customPresets.shift(); // rollback
    return { success: false, error: "Storage quota exceeded. Could not save look." };
  }

  renderTabs();
  renderGrid();
  renderRecentRow();

  return { success: true, preset: custom };
}

function renameCustomLook(id, newName) {
  const trimmed = (newName || "").trim();
  if (!trimmed) {
    return { success: false, error: "Please enter a non-empty name." };
  }
  if (trimmed.length > 40) {
    return { success: false, error: "Name must be 40 characters or fewer." };
  }
  const found = customPresets.find(p => p.id === id);
  if (!found) return { success: false, error: "Custom look not found." };

  found.name = trimmed;
  found.updatedAt = Date.now();
  saveCustomPresetsToStorage();

  if (state.activePreset?.id === id) {
    state.activePreset.name = trimmed;
  }
  updateLookDetail();
  renderGrid();
  renderRecentRow();
  return { success: true };
}

function deleteCustomLook(id) {
  const idx = customPresets.findIndex(p => p.id === id);
  if (idx === -1) return false;

  customPresets.splice(idx, 1);
  saveCustomPresetsToStorage();

  // Clean Favorites & Recently Used
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
    saveStorageList(STORAGE_KEYS.FAVORITES, Array.from(state.favorites));
  }
  if (state.recentIds.includes(id)) {
    state.recentIds = state.recentIds.filter(x => x !== id);
    saveStorageList(STORAGE_KEYS.RECENT, state.recentIds);
  }

  updateLookDetail();
  renderTabs();
  renderGrid();
  renderRecentRow();
  return true;
}

function openCustomLookModal(mode = "save", targetId = null, currentName = "") {
  customModalMode = mode;
  customTargetId = targetId;
  if (!el.customLookDialog) return;

  if (mode === "save") {
    if (el.customDialogTitle) el.customDialogTitle.textContent = "Save Custom Look";
    if (el.customDialogSubmit) el.customDialogSubmit.textContent = "Save Look";
    const defaultName = state.activePreset ? `${state.activePreset.name} Custom` : "My Film Look";
    if (el.customLookNameInput) el.customLookNameInput.value = defaultName;
  } else {
    if (el.customDialogTitle) el.customDialogTitle.textContent = "Rename Custom Look";
    if (el.customDialogSubmit) el.customDialogSubmit.textContent = "Rename";
    if (el.customLookNameInput) el.customLookNameInput.value = currentName || "";
  }
  if (el.customDialogError) {
    el.customDialogError.textContent = "";
    el.customDialogError.hidden = true;
  }
  el.customLookDialog.hidden = false;
  setTimeout(() => {
    if (el.customLookNameInput) {
      el.customLookNameInput.focus();
      el.customLookNameInput.select();
    }
  }, 50);
}

function closeCustomLookModal() {
  if (el.customLookDialog) el.customLookDialog.hidden = true;
  customTargetId = null;
}

function openCustomDeleteModal(id, name) {
  customDeleteTargetId = id;
  if (!el.customDeleteDialog) return;
  const desc = el.customDeleteDialog.querySelector(".dialog-desc");
  if (desc) desc.textContent = `Are you sure you want to delete “${name}”? This cannot be undone.`;
  el.customDeleteDialog.hidden = false;
}

function closeCustomDeleteModal() {
  if (el.customDeleteDialog) el.customDeleteDialog.hidden = true;
  customDeleteTargetId = null;
}

function setupCustomPresets() {
  if (el.saveLookBtn) {
    el.saveLookBtn.onclick = () => {
      if (!state.sourceImage) return;
      openCustomLookModal("save");
    };
  }

  if (el.detailRenameBtn) {
    el.detailRenameBtn.onclick = () => {
      if (state.activePreset && state.activePreset.source === "custom") {
        openCustomLookModal("rename", state.activePreset.id, state.activePreset.name);
      }
    };
  }

  if (el.detailDeleteBtn) {
    el.detailDeleteBtn.onclick = () => {
      if (state.activePreset && state.activePreset.source === "custom") {
        openCustomDeleteModal(state.activePreset.id, state.activePreset.name);
      }
    };
  }

  if (el.customLookForm) {
    el.customLookForm.onsubmit = (e) => {
      e.preventDefault();
      const name = el.customLookNameInput ? el.customLookNameInput.value : "";
      if (customModalMode === "save") {
        const res = saveCustomLook(name);
        if (res.success) {
          closeCustomLookModal();
        } else {
          if (el.customDialogError) {
            el.customDialogError.textContent = res.error;
            el.customDialogError.hidden = false;
          }
        }
      } else {
        const res = renameCustomLook(customTargetId, name);
        if (res.success) {
          closeCustomLookModal();
        } else {
          if (el.customDialogError) {
            el.customDialogError.textContent = res.error;
            el.customDialogError.hidden = false;
          }
        }
      }
    };
  }

  if (el.customDialogClose) el.customDialogClose.onclick = closeCustomLookModal;
  if (el.customDialogCancel) el.customDialogCancel.onclick = closeCustomLookModal;

  if (el.customDeleteClose) el.customDeleteClose.onclick = closeCustomDeleteModal;
  if (el.customDeleteCancel) el.customDeleteCancel.onclick = closeCustomDeleteModal;
  if (el.customDeleteConfirm) {
    el.customDeleteConfirm.onclick = () => {
      if (customDeleteTargetId) {
        deleteCustomLook(customDeleteTargetId);
        closeCustomDeleteModal();
      }
    };
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (el.customLookDialog && !el.customLookDialog.hidden) {
        closeCustomLookModal();
      } else if (el.customDeleteDialog && !el.customDeleteDialog.hidden) {
        closeCustomDeleteModal();
      }
    }
  });
}

function applyTheme(theme, save = true) {
  const isLight = theme === "light";
  document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");
  if (save) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, isLight ? "light" : "dark");
    } catch {}
  }
  const toggleBtn = el.themeToggle || document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-checked", isLight ? "true" : "false");
    toggleBtn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    toggleBtn.title = isLight ? "Switch to dark theme (Current: Light)" : "Switch to light theme (Current: Dark)";
  }
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", isLight ? "#f7f5f0" : "#141412");
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next, true);
  return next;
}

function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEYS.THEME);
  } catch {}
  const theme = (saved === "light" || saved === "dark") ? saved : "dark";
  applyTheme(theme, false);

  const toggleBtn = el.themeToggle || document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      toggleTheme();
    });
  }
}

setupSplitInteractions();
setupSliders();
setupResetControls();
setupCategoryEvents();
setupEditorTabs();
setupStudioModes();
setupHistory();
setupSearch();
setupCustomPresets();
setupFilmstripControls();
initTheme();

if (typeof window !== "undefined") {
  window.__filmlab = {
    state,
    el,
    presetLibrary,
    customPresets,
    loadCustomPresets,
    saveCustomPresetsToStorage,
    saveCustomLook,
    renameCustomLook,
    deleteCustomLook,
    getPresetById,
    getAllPresets,
    getPresetEffectiveParams,
    openCustomLookModal,
    closeCustomLookModal,
    openCustomDeleteModal,
    closeCustomDeleteModal,
    lookMoodTags,
    STORAGE_KEYS,
    loadStorageList,
    saveStorageList,
    getEffectiveParams,
    draw,
    resetLook,
    resetAdjustments,
    resetLightGroup,
    resetColorGroup,
    resetEffects,
    resetAll,
    setCompareMode,
    updateSplitView,
    updatePreviewAspectRatio,
    handleSplitDrag,
    startStageHold,
    stopStageHold,
    queue,
    show,
    ingestFiles,
    workspace,
    getActivePhoto,
    setActivePhoto,
    removePhoto,
    clearWorkspace,
    renderFilmstrip,
    setupFilmstripControls,
    setStudioMode,
    setupStudioModes,
    renderStudioPresets,
    remove,
    downloadPhoto,
    selectPreset,
    toggleFavorite,
    surpriseMe,
    renderTabs,
    renderGrid,
    renderRecentRow,
    updateLookDetail,
    setActivePanel,
    undo,
    redo,
    history,
    getHistoryIndex: () => historyIndex,
    createSnapshot,
    restoreState,
    clearHistory,
    recordHistory,
    matchPresetSearch,
    getFilteredPresets,
    updateDiscoveryMeta,
    setSearchQuery: (q) => {
      state.searchQuery = q || "";
      if (el.filmSearchInput) el.filmSearchInput.value = state.searchQuery;
      if (el.filmSearchClear) el.filmSearchClear.hidden = !state.searchQuery.trim();
      renderGrid();
      renderRecentRow();
    },
    initTheme,
    applyTheme,
    toggleTheme,
    getTheme: () => document.documentElement.getAttribute("data-theme") || "dark"
  };
  window.__FILM_LAB__ = window.__filmlab;
}

