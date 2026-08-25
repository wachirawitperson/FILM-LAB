const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX = 30 * 1024 * 1024;
const LIMIT = 1400;

const STORAGE_KEYS = {
  FAVORITES: "filmlab-favorites",
  RECENT: "filmlab-recent"
};

const cats = [
  ["ALL", "All Looks"],
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


function loadStorageList(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const validIds = new Set(presetLibrary.map(p => p.id));
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
  shell: $("editor-shell"),
  introPanel: $("intro-panel"),
  input: $("photo-input"),
  select: $("select-photo"),
  drop: $("drop-zone"),
  error: $("upload-error"),
  
  studioHeaderActions: $("studio-header-actions"),
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
  
  tabs: $("category-tabs"),
  grid: $("preset-grid"),

  surpriseBtn: $("surprise-me-btn"),
  moodTabsBar: $("mood-tabs-bar"),
  lookDetailCard: $("look-detail-card"),
  detailPresetName: $("detail-preset-name"),
  detailPresetCollection: $("detail-preset-collection"),
  detailPresetDesc: $("detail-preset-desc"),
  detailPresetBestFor: $("detail-preset-bestfor"),
  detailPresetPills: $("detail-preset-pills"),
  detailFavBtn: $("detail-fav-btn"),
  recentSection: $("recent-looks-section"),
  recentRow: $("recent-looks-row"),
  favEmptyState: $("favorites-empty-state"),
  
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
  resetEffBorder: $("reset-eff-border")
};


const state = {
  sourceImage: null,
  sourceFileName: "",
  previewUrl: null,
  activePreset: null,
  selectedCategory: "ALL",
  selectedMood: "ALL",
  compareMode: "edited",
  previousCompareMode: null,
  favorites: new Set(loadStorageList(STORAGE_KEYS.FAVORITES)),
  recentIds: loadStorageList(STORAGE_KEYS.RECENT).slice(0, 8),
  lastSurpriseId: null,
  adjustments: { ...DEFAULT_ADJUSTMENTS },
  effects: { ...DEFAULT_EFFECTS },
  isSplitActive: false,
  splitPos: 50,
  isDraggingSplit: false,
  processingStatus: "idle",
  frame: null,
  token: 0
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
    URL.revokeObjectURL(state.previewUrl);
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
  if (mode === "original") {
    state.isSplitActive = false;
    el.gradedLayer.classList.add("is-holding-original");
    el.splitDivider.hidden = true;
    el.badgeOriginal.hidden = false;
    el.badgeEdited.hidden = true;
    if (el.compareOriginal) el.compareOriginal.classList.add("is-active");
    if (el.compareSplit) el.compareSplit.classList.remove("is-active");
    if (el.compareEdited) el.compareEdited.classList.remove("is-active");
  } else if (mode === "split") {
    state.isSplitActive = true;
    el.gradedLayer.classList.remove("is-holding-original");
    el.splitDivider.hidden = false;
    el.badgeOriginal.hidden = false;
    el.badgeEdited.hidden = false;
    if (el.compareOriginal) el.compareOriginal.classList.remove("is-active");
    if (el.compareSplit) el.compareSplit.classList.add("is-active");
    if (el.compareEdited) el.compareEdited.classList.remove("is-active");
    updateSplitView();
  } else {
    state.isSplitActive = false;
    el.gradedLayer.classList.remove("is-holding-original");
    el.gradedLayer.style.clipPath = "none";
    el.splitDivider.hidden = true;
    el.badgeOriginal.hidden = true;
    el.badgeEdited.hidden = true;
    if (el.compareOriginal) el.compareOriginal.classList.remove("is-active");
    if (el.compareSplit) el.compareSplit.classList.remove("is-active");
    if (el.compareEdited) el.compareEdited.classList.add("is-active");
  }
  if (el.toggleSplit) el.toggleSplit.setAttribute("aria-pressed", String(state.isSplitActive));
}

function updateSplitView() {
  if (!el.stageViewport) return;
  el.stageViewport.style.setProperty("--split-pos", `${state.splitPos}%`);
  if (el.splitHandle) {
    el.splitHandle.setAttribute("aria-valuenow", String(Math.round(state.splitPos)));
  }
  if (state.isSplitActive) {
    el.splitDivider.hidden = false;
    el.badgeOriginal.hidden = false;
    el.badgeEdited.hidden = false;
    if (el.toggleSplit) el.toggleSplit.setAttribute("aria-pressed", "true");
    if (el.compareSplit) el.compareSplit.classList.add("is-active");
    el.gradedLayer.classList.remove("is-holding-original");
    el.gradedLayer.style.clipPath = `polygon(${state.splitPos}% 0, 100% 0, 100% 100%, ${state.splitPos}% 100%)`;
  } else if (state.compareMode === "original") {
    el.splitDivider.hidden = true;
    el.badgeOriginal.hidden = false;
    el.badgeEdited.hidden = true;
    el.gradedLayer.classList.add("is-holding-original");
  } else {
    el.splitDivider.hidden = true;
    el.badgeOriginal.hidden = true;
    el.badgeEdited.hidden = true;
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
  updateSplitView();
}

function setupSplitInteractions() {
  if (el.compareOriginal) {
    el.compareOriginal.onclick = () => setCompareMode(state.compareMode === "original" ? "edited" : "original");
    el.compareOriginal.addEventListener("pointerdown", e => {
      e.preventDefault();
      state.previousCompareMode = state.compareMode || "edited";
      setCompareMode("original");
    });
    const releaseOriginal = () => {
      if (state.previousCompareMode && state.compareMode === "original") {
        setCompareMode(state.previousCompareMode);
        state.previousCompareMode = null;
      }
    };
    window.addEventListener("pointerup", releaseOriginal);
    window.addEventListener("pointercancel", releaseOriginal);
  }

  if (el.compareSplit) {
    el.compareSplit.onclick = () => setCompareMode(state.isSplitActive ? "edited" : "split");
  }

  if (el.compareEdited) {
    el.compareEdited.onclick = () => setCompareMode("edited");
  }

  if (el.toggleSplit) {
    el.toggleSplit.onclick = () => setCompareMode(state.isSplitActive ? "edited" : "split");
  }

  if (el.holdCompare) {
    const startHold = e => { e.preventDefault(); el.gradedLayer.classList.add("is-holding-original"); };
    const stopHold = e => { e.preventDefault(); el.gradedLayer.classList.remove("is-holding-original"); };
    el.holdCompare.addEventListener("pointerdown", startHold);
    window.addEventListener("pointerup", stopHold);
    window.addEventListener("pointercancel", stopHold);
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

  if (el.splitHandle) {
    el.splitHandle.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        state.splitPos = Math.max(0, state.splitPos - 5);
        updateSplitView();
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        state.splitPos = Math.min(100, state.splitPos + 5);
        updateSplitView();
      } else if (e.key === "Home") {
        e.preventDefault();
        state.splitPos = 0;
        updateSplitView();
      } else if (e.key === "End") {
        e.preventDefault();
        state.splitPos = 100;
        updateSplitView();
      }
    });
  }
}

function selectPreset(p) {
  state.activePreset = p;
  el.resetLookLink.disabled = false;
  if (el.btnResetLook) el.btnResetLook.disabled = false;
  if (p) {
    state.recentIds = [p.id, ...state.recentIds.filter(id => id !== p.id)].slice(0, 8);
    saveStorageList(STORAGE_KEYS.RECENT, state.recentIds);
  }
  updateLookDetail();
  renderRecentRow();
  renderGrid();
  updateResetBtnStates();
  queue();
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
    return;
  }
  if (el.lookDetailCard) el.lookDetailCard.hidden = false;
  if (el.detailPresetName) el.detailPresetName.textContent = p.name;
  if (el.detailPresetCollection) {
    if (p.category === "KODAK_FILM" || p.collection === "Kodak Film") {
      el.detailPresetCollection.textContent = "KODAK FILM";
    } else {
      el.detailPresetCollection.textContent = cats.find(a => a[0] === p.category)?.[1] || p.collection || p.category;
    }
  }
  if (el.detailPresetDesc) {
    if (p.category === "KODAK_FILM" || p.collection === "Kodak Film") {
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
    const bestForStr = p.recommendedFor && p.recommendedFor.length > 0 ? `Best for: ${p.recommendedFor.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" · ")}` : "Best for: Daylight · Everyday";
    el.detailPresetBestFor.textContent = bestForStr;
  }
  if (el.detailPresetPills) {
    const tags = lookMoodTags[p.id] || [];
    el.detailPresetPills.replaceChildren(...tags.map(t => {
      const span = document.createElement("span");
      span.className = "detail-pill";
      span.textContent = t;
      return span;
    }));
  }
  if (el.detailFavBtn) {
    const isFav = state.favorites.has(p.id);
    el.detailFavBtn.classList.toggle("is-fav", isFav);
    const icon = el.detailFavBtn.querySelector(".detail-fav-icon");
    if (icon) icon.textContent = isFav ? "♥" : "♡";
    el.detailFavBtn.setAttribute("aria-label", isFav ? `Remove ${p.name} from favorites` : `Add ${p.name} to favorites`);
    el.detailFavBtn.onclick = () => toggleFavorite(p.id);
  }
}

function renderRecentRow() {
  if (!el.recentSection || !el.recentRow) return;
  if (!state.recentIds || state.recentIds.length === 0 || !state.sourceImage) {
    el.recentSection.hidden = true;
    return;
  }
  el.recentSection.hidden = false;
  const recentPresets = state.recentIds.map(id => presetLibrary.find(p => p.id === id)).filter(Boolean);
  el.recentRow.replaceChildren(...recentPresets.map(p => {
    const btn = document.createElement("button");
    btn.type = "button";
    const isActive = state.activePreset?.id === p.id;
    btn.className = `recent-card${isActive ? " is-active" : ""}`;
    btn.setAttribute("aria-label", `Select recent look ${p.name}`);
    const canvas = document.createElement("canvas");
    draw(canvas, state.sourceImage, p, 80);
    const nameSpan = document.createElement("span");
    nameSpan.textContent = p.name;
    btn.append(canvas, nameSpan);
    btn.onclick = () => selectPreset(p);
    return btn;
  }));
}

function surpriseMe() {
  if (!state.sourceImage) return;
  let pool = [];
  if (state.selectedCategory === "FAVORITES") {
    pool = presetLibrary.filter(p => state.favorites.has(p.id));
  } else if (state.selectedCategory === "90S") {
    pool = presetLibrary.filter(p => p.category === "1998" || p.category === "Y2K" || p.category === "DISPOSABLE");
  } else if (state.selectedCategory === "JAPANESE") {
    pool = presetLibrary.filter(p => p.category === "JAPANESE");
  } else if (state.selectedCategory === "BW") {
    pool = presetLibrary.filter(p => p.category === "BW" || p.id === "kodak-double-x-5222");
  } else if (state.selectedCategory === "KODAK_FILM") {
    pool = presetLibrary.filter(p => p.category === "KODAK_FILM" || p.collection === "Kodak Film");
  } else if (state.selectedCategory !== "ALL") {
    const targetMood = state.selectedCategory.toLowerCase();
    pool = presetLibrary.filter(p => (lookMoodTags[p.id] || []).includes(targetMood));
  }
  if (pool.length === 0) pool = presetLibrary;
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
  el.tabs.replaceChildren(...cats.map(([id, n]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "category-tab";
    b.role = "tab";
    b.textContent = n;
    b.setAttribute("aria-selected", String(state.selectedCategory === id));
    b.onclick = () => {
      state.selectedCategory = id;
      renderTabs();
      renderGrid();
    };
    return b;
  }));
}

function renderGrid() {
  if (!el.grid) return;
  let list = [];
  if (state.selectedCategory === "FAVORITES") {
    list = presetLibrary.filter(p => state.favorites.has(p.id));
    if (el.favEmptyState) el.favEmptyState.hidden = list.length > 0;
  } else if (state.selectedCategory === "ALL") {
    if (el.favEmptyState) el.favEmptyState.hidden = true;
    list = presetLibrary;
  } else if (state.selectedCategory === "90S") {
    if (el.favEmptyState) el.favEmptyState.hidden = true;
    list = presetLibrary.filter(p => p.category === "1998" || p.category === "Y2K" || p.category === "DISPOSABLE");
  } else if (state.selectedCategory === "JAPANESE") {
    if (el.favEmptyState) el.favEmptyState.hidden = true;
    list = presetLibrary.filter(p => p.category === "JAPANESE");
  } else if (state.selectedCategory === "BW") {
    if (el.favEmptyState) el.favEmptyState.hidden = true;
    list = presetLibrary.filter(p => p.category === "BW" || p.id === "kodak-double-x-5222");
  } else if (state.selectedCategory === "KODAK_FILM") {
    if (el.favEmptyState) el.favEmptyState.hidden = true;
    list = presetLibrary.filter(p => p.category === "KODAK_FILM" || p.collection === "Kodak Film");
  } else {
    if (el.favEmptyState) el.favEmptyState.hidden = true;
    const targetMood = state.selectedCategory.toLowerCase();
    list = presetLibrary.filter(p => (lookMoodTags[p.id] || []).includes(targetMood));
    if (list.length === 0) list = presetLibrary.filter(p => p.category === state.selectedCategory);
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
    const n = document.createElement("strong");
    const c = document.createElement("small");
    const isActive = state.activePreset?.id === p.id;
    b.type = "button";
    b.className = `preset-card${isActive ? " is-active" : ""}`;
    b.setAttribute("aria-pressed", String(isActive));
    b.setAttribute("aria-label", `${p.name}, ${p.description}`);
    if (state.sourceImage) draw(t, state.sourceImage, p, 320);
    n.textContent = p.name;
    if (p.category === "KODAK_FILM" || p.collection === "Kodak Film") {
      c.textContent = p.stockSubtitle || p.character || p.description;
    } else {
      c.textContent = cats.find(a => a[0] === p.category)?.[1] || p.character || p.description || p.category;
    }
    b.append(wrap, n, c);
    b.onclick = () => selectPreset(p);
    return b;
  }));
}


const adjustKeys = ["exposure", "contrast", "highlights", "shadows", "temperature", "tint", "saturation"];
const effectKeys = ["grain", "vignette", "halation", "bloom", "fade", "lightLeak"];

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
  state.adjustments[k] = DEFAULT_ADJUSTMENTS[k];
  const cap = k.charAt(0).toUpperCase() + k.slice(1);
  const input = el[`adj${cap}`];
  const badge = el[`val${cap}`];
  if (input) input.value = DEFAULT_ADJUSTMENTS[k];
  if (badge) badge.textContent = formatVal(DEFAULT_ADJUSTMENTS[k]);
  updateResetBtnStates();
  queue();
}

function resetSingleEffect(k) {
  state.effects[k] = DEFAULT_EFFECTS[k];
  const cap = k.charAt(0).toUpperCase() + k.slice(1);
  const input = el[`eff${cap}`];
  const badge = el[`val${cap}`];
  if (input) input.value = DEFAULT_EFFECTS[k];
  if (badge) badge.textContent = formatVal(DEFAULT_EFFECTS[k]);
  updateResetBtnStates();
  queue();
}

function resetSingleBorder() {
  state.effects.border = DEFAULT_EFFECTS.border;
  if (el.effBorder) el.effBorder.value = DEFAULT_EFFECTS.border;
  updateResetBtnStates();
  queue();
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
    input.ondblclick = () => resetSingleEffect(k);
  });

  if (el.effBorder) {
    el.effBorder.onchange = e => {
      state.effects.border = e.target.value;
      updateResetBtnStates();
      queue();
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
}

function resetAdjustments() {
  state.adjustments = { ...DEFAULT_ADJUSTMENTS };
  syncAdjustmentSliders();
  queue();
}

function resetEffects() {
  state.effects = { ...DEFAULT_EFFECTS };
  syncEffectSliders();
  queue();
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
}

function setupResetControls() {
  if (el.resetLookLink) el.resetLookLink.onclick = resetLook;
  if (el.resetAdjLink) el.resetAdjLink.onclick = resetAdjustments;
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
  const origText = el.downloadText ? el.downloadText.textContent : "Download";
  if (el.downloadText) el.downloadText.textContent = "Exporting JPEG...";
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
    if (el.downloadText) el.downloadText.textContent = origText;
  }
}

function enterEditorMode(file) {
  el.shell.classList.add("is-editor-mode");
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


  // P0.2: Instant Film Experience after upload
  const heroPreset = presetLibrary.find(p => p.id === "1998-warm") || presetLibrary[0];
  state.activePreset = heroPreset;
  if (heroPreset && !state.recentIds.includes(heroPreset.id)) {
    state.recentIds = [heroPreset.id, ...state.recentIds].slice(0, 8);
    saveStorageList(STORAGE_KEYS.RECENT, state.recentIds);
  }
  if (el.resetLookLink) el.resetLookLink.disabled = false;
  if (el.btnResetLook) el.btnResetLook.disabled = false;

  renderTabs();
  renderRecentRow();
  updateLookDetail();
  renderGrid();
  syncAdjustmentSliders();
  syncEffectSliders();
  setCompareMode("edited");
  queue();
}


function remove() {
  revoke();
  state.sourceImage = null;
  state.sourceFileName = "";
  state.activePreset = null;
  state.adjustments = { ...DEFAULT_ADJUSTMENTS };
  state.effects = { ...DEFAULT_EFFECTS };
  state.isSplitActive = false;
  state.compareMode = "edited";
  state.token++;
  if (state.frame) cancelAnimationFrame(state.frame);
  el.image.removeAttribute("src");
  el.shell.classList.remove("is-editor-mode");
  el.introPanel.hidden = false;
  el.emptyState.hidden = false;
  el.uploadPanel.hidden = false;
  el.studioHeaderActions.hidden = true;
  if (el.stageToolbar) el.stageToolbar.hidden = true;
  el.stageViewport.hidden = true;
  el.studioDock.hidden = true;
  el.imageMeta.hidden = true;
  el.previewStage.classList.remove("has-image");
  if (el.lookDetailCard) el.lookDetailCard.hidden = true;
  if (el.recentSection) el.recentSection.hidden = true;
  clear();
  el.input.value = "";
  updateResetBtnStates();
  setProcessingStatus("idle");
}

const wait = (img, url) => new Promise((ok, no) => { img.onload = ok; img.onerror = () => state.previewUrl === url && no(); });

async function show(file) {
  clear();
  if (!TYPES.has(file.type)) { fail("Choose a JPEG, PNG, or WebP image. HEIC files are not supported in this browser version."); el.input.value = ""; return; }
  if (file.size > MAX) { fail("This photo is larger than 30 MB. Choose a smaller image to keep the editor responsive."); el.input.value = ""; return; }
  revoke();
  const url = URL.createObjectURL(file);
  state.previewUrl = url;
  state.sourceFileName = file.name;
  el.image.src = url;
  try { await wait(el.image, url); } catch { if (state.previewUrl === url) { remove(); fail("This image could not be opened. Try another photo or save it again before uploading."); } return; }
  if (state.previewUrl !== url) return;
  state.sourceImage = el.image;
  el.image.alt = "Preview of " + file.name;
  enterEditorMode(file);
}

const choose = () => { clear(); el.input.click(); };
const files = f => { if (f && f[0]) void show(f[0]); };
el.select.onclick = choose;
el.headerReplace.onclick = choose;
el.headerRemove.onclick = remove;
el.downloadBtn.onclick = downloadPhoto;
if (el.surpriseBtn) el.surpriseBtn.onclick = surpriseMe;
el.input.onchange = e => files(e.target.files);
["dragenter", "dragover"].forEach(n => el.drop.addEventListener(n, e => { e.preventDefault(); el.drop.classList.add("is-dragging"); }));
["dragleave", "drop"].forEach(n => el.drop.addEventListener(n, e => { e.preventDefault(); el.drop.classList.remove("is-dragging"); }));
el.drop.addEventListener("drop", e => files(e.dataTransfer.files));
window.addEventListener("beforeunload", revoke);

setupSplitInteractions();
setupSliders();
setupResetControls();

if (typeof window !== "undefined") {
  window.__filmlab = {
    state,
    el,
    presetLibrary,
    lookMoodTags,
    STORAGE_KEYS,
    loadStorageList,
    saveStorageList,
    getEffectiveParams,
    draw,
    resetLook,
    resetAdjustments,
    resetEffects,
    resetAll,
    setCompareMode,
    updateSplitView,
    queue,
    show,
    downloadPhoto,
    selectPreset,
    toggleFavorite,
    surpriseMe,
    renderTabs,
    renderGrid,
    renderRecentRow,
    updateLookDetail
  };
}

