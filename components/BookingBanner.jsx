"use client";

import { usePathname } from "next/navigation";

const CALENDLY_URL = "https://calendly.com/pljw-financial/30min";

export default function BookingBanner() {
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e5e7eb",
        padding: "2.5rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <p style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", color: "#2563eb", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          {isChinese ? "免費咨詢" : "Free Consultation"}
        </p>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem", lineHeight: 1.4 }}>
          {isChinese ? "準備好開始規劃您的財務未來了嗎？" : "Ready to plan your financial future?"}
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "#6b7280", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          {isChinese
            ? "預約一次免費的 30 分鐘咨詢。"
            : "Book a free 30-minute consultation."}
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            padding: "0.65rem 1.75rem",
            borderRadius: "0.5rem",
            fontWeight: 600,
            fontSize: "0.9375rem",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2563eb"; }}
        >
          {isChinese ? "立即預約 →" : "Book Now →"}
        </a>
      </div>
    </section>
  );
}
