import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Daniel Gómez — FullStack Developer";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #1e1033 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, display: "flex" }}>
          Daniel <span style={{ color: "#c084fc", marginLeft: 18 }}>Gómez</span>
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#a1a1aa",
            marginTop: 20,
            maxWidth: 900,
            textAlign: "center",
            display: "flex",
          }}
        >
          {t("openGraphDescription")}
        </div>
      </div>
    ),
    { ...size },
  );
}
