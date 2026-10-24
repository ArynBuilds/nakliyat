// TODO: wire to Meta Graph API — replace placeholder posts with real fetch using
// IG_USER_ID + IG_ACCESS_TOKEN env vars. Endpoint contract:
//   GET /api/instagram?limit=9 → { posts: InstagramPost[] }
// The frontend never knows whether the data is real or stubbed.

import { NextResponse } from "next/server";
import type { InstagramPost } from "@/types/instagram";

const PLACEHOLDER_CAPTIONS = [
  "Beşiktaş'tan Bahçeşehir'e 4+1 taşıma · sigortalı, asansörlü servis.",
  "Piyano taşıma — özel ekipmanlarla, sıfır çiziksiz.",
  "Şehirlerarası uzun mesafe seferi: İstanbul → İzmir, GPS takipli.",
  "Yeni filomuza katılan kapalı kasa kamyonumuz hizmette.",
  "Ofis taşıma — pazartesi sabahı çalışmaya başlamaya hazır.",
  "Cam ve porselen için özel ambalaj uygulaması.",
  "Mobil dış cephe asansörümüz, beşinci kattan saatte 18 ton iniş.",
  "Müşteri yorumu: «Eşyalarımızı bizden iyi paketlediler.»",
  "Ekibimiz bir keşif görüşmesinin ardından, Sarıyer'de bir taşımayı tamamladıktan sonra.",
];

function placeholderPosts(limit: number): InstagramPost[] {
  const now = Date.now();
  const posts: InstagramPost[] = Array.from({ length: 9 }).map((_, i) => {
    const idx = (i % PLACEHOLDER_CAPTIONS.length);
    return {
      id: `stub-${i + 1}`,
      mediaUrl: `https://picsum.photos/seed/yusufoglu-${i + 1}/720/720`,
      thumbnailUrl: `https://picsum.photos/seed/yusufoglu-${i + 1}/360/360`,
      caption: PLACEHOLDER_CAPTIONS[idx] ?? "",
      permalink: "https://instagram.com/yusufoglunklyt",
      timestamp: new Date(now - i * 1000 * 60 * 60 * 24 * 4).toISOString(),
      mediaType: "IMAGE",
      likeCount: 80 + ((i * 37) % 220),
    };
  });
  return posts.slice(0, Math.max(1, Math.min(limit, posts.length)));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? "9");

  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;

  if (userId && token) {
    // — Live mode (placeholder for future Meta Graph wiring) —
    // const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count";
    // const r = await fetch(`https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`, { next: { revalidate: 1800 } });
    // const data = await r.json();
    // return NextResponse.json({ posts: data.data });
  }

  return NextResponse.json(
    { posts: placeholderPosts(limit) },
    { headers: { "Cache-Control": "s-maxage=900, stale-while-revalidate=1800" } }
  );
}
