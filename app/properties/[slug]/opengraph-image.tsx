import { ImageResponse } from "next/og";
import { getAllProperties, getProperty } from "@/lib/content";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProperties().map((property) => ({ slug: property.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  const title = property?.name ?? site.name;
  const location = property ? `${property.town}, ${property.county}` : "";

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
        {site.footerName}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 64, fontWeight: 600 }}>{title}</div>
        {location && (
          <div style={{ fontSize: 32, marginTop: 16, color: "#71717a" }}>
            {location}
          </div>
        )}
      </div>
    </div>,
    { ...size },
  );
}
