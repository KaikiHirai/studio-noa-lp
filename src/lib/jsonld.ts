import { enrollmentFee, plans, studio } from "@/lib/content";

// schema.org HealthClub の構造化データ
export function healthClubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: studio.name,
    description:
      "東京・自由が丘の女性専用パーソナルジム。完全個室・女性トレーナーのみ・食事指導つき。無料カウンセリング＋体験60分を受付中。",
    url: studio.url,
    telephone: studio.telForSchema,
    priceRange: "¥¥",
    image: `${studio.url}/img/ogp.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: studio.streetAddress,
      addressLocality: studio.addressLocality,
      addressRegion: studio.addressRegion,
      postalCode: studio.postalCode,
      addressCountry: "JP",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "21:00",
    },
    makesOffer: plans.map((p) => ({
      "@type": "Offer",
      name: `${p.name}（${p.count}）`,
      price: p.price.replace(/[^0-9]/g, ""),
      priceCurrency: "JPY",
    })),
    // 入会金（参考情報）
    additionalProperty: {
      "@type": "PropertyValue",
      name: "入会金",
      value: enrollmentFee,
    },
  };
}
