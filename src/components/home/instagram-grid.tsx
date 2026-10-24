"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CONTACT } from "@/lib/contact";
import type { InstagramPost } from "@/types/instagram";
import { ArrowRight } from "@/components/icons";

type Props = {
  initialPosts?: InstagramPost[];
  limit?: number;
};

export function InstagramGrid({ initialPosts, limit = 9 }: Props) {
  const [posts, setPosts] = useState<InstagramPost[] | null>(initialPosts ?? null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialPosts) return;
    let cancelled = false;
    fetch(`/api/instagram?limit=${limit}`)
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((data: { posts: InstagramPost[] }) => {
        if (!cancelled) setPosts(data.posts ?? []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => { cancelled = true; };
  }, [initialPosts, limit]);

  return (
    <section className="bg-cream-base py-24 md:py-36 relative overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
          <ScrollReveal>
            <p className="text-eyebrow text-ink-subtle mb-3">Instagram'da bizi takip edin</p>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block group"
            >
              <h2 className="text-display-xl font-editorial text-ink-strong">
                {CONTACT.instagram}
              </h2>
              <span className="block w-12 h-px bg-gold mt-3 group-hover:w-24 transition-[width] duration-500" />
            </a>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-[14px] font-medium text-ink-strong hover:text-gold transition-colors"
            >
              <span>Tümünü Gör</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>
        </div>

        {error ? (
          <Fallback />
        ) : posts ? (
          posts.length === 0 ? <EmptyState /> : <Grid posts={posts} />
        ) : (
          <SkeletonGrid />
        )}
      </div>
    </section>
  );
}

function Grid({ posts }: { posts: InstagramPost[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
      {posts.slice(0, 9).map((p, i) => (
        <motion.li
          key={p.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={p.permalink}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-xl aspect-square bg-cream-sunken"
          >
            <Image
              src={p.thumbnailUrl ?? p.mediaUrl}
              alt={p.caption.slice(0, 90)}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-base/85 via-night-base/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-night-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-[12.5px] line-clamp-3 leading-snug">{p.caption}</p>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-night-muted tabular">
                {typeof p.likeCount === "number" && <span>♥ {p.likeCount}</span>}
                <span>{new Date(p.timestamp).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</span>
              </div>
            </div>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}

function SkeletonGrid() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <li
          key={i}
          className="aspect-square rounded-xl bg-cream-sunken relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream-raised/60 to-transparent animate-[shimmer_1.6s_infinite] -translate-x-full" style={{ animation: "shimmer 1.8s linear infinite" }} />
        </li>
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-line bg-cream-raised p-12 md:p-16 text-center">
      <p className="text-display-md font-editorial text-ink-strong">Yakında...</p>
      <p className="text-ink-muted mt-3">Instagram akışımız çok yakında yeni gönderilerle dolacak.</p>
    </div>
  );
}

function Fallback() {
  return (
    <div className="rounded-2xl border border-line bg-cream-raised p-12 md:p-16 text-center">
      <p className="text-display-md font-editorial text-ink-strong">
        Instagram&apos;da bizi takip edin: <span className="text-gold-deep">{CONTACT.instagram}</span>
      </p>
      <a
        href={CONTACT.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 mt-6 text-[14px] font-medium text-gold-deep hover:gap-3 transition-[gap]"
      >
        Profile git <ArrowRight size={14} />
      </a>
    </div>
  );
}
