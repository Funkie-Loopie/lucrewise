"use client";

import { usePathname } from "next/navigation";

const CALENDLY_URL = "https://calendly.com/pljw-financial/30min";

export default function BookingBanner() {
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");

  return (
    <section className="booking-banner">
      <div className="booking-banner-inner">
        <p className="section-label section-label--light">
          {isChinese ? "免費咨詢" : "Free Consultation"}
        </p>
        <h2 style={{
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "0.875rem",
          lineHeight: 1.25,
        }}>
          {isChinese
            ? "準備好開始規劃您的財務未來了嗎？"
            : "Ready to plan your financial future?"}
        </h2>
        <p style={{
          fontSize: "1rem",
          color: "rgba(255,255,255,0.68)",
          marginBottom: "2.25rem",
          lineHeight: 1.7,
          maxWidth: 480,
          marginInline: "auto",
        }}>
          {isChinese
            ? "預約一次免費的 30 分鐘咨詢。"
            : "Book a free 30-minute consultation and take the first step toward financial clarity."}
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--lg btn-white"
        >
          {isChinese ? "立即預約 →" : "Book Now →"}
        </a>
      </div>
    </section>
  );
}
