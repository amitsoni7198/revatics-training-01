import { ImageResponse } from "next/og";
import { getAllArticles, getArticle } from "@/lib/content";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? site.name;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#ffffff",
        color: "#18181b",
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 600, color: "#1e4b4b" }}>
        {`${site.footerName} · Journal`}
      </div>
      <div style={{ fontSize: 64, fontWeight: 600 }}>{title}</div>
    </div>,
    { ...size },
  );
}
