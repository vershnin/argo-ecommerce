import { Product } from "@/types/product";

interface Props {
  product: Product;
  reviews?: { rating: number; userName: string; comment: string; createdAt: string }[];
}

export function ProductJsonLd({ product, reviews = [] }: Props) {
  const price = product.discountPrice || product.price;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription || product.description,
    image: product.imageUrl,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category.name,
    offers: {
      "@type": "Offer",
      url: `https://argoelectronics.co.ke/product/${product.slug}`,
      priceCurrency: "KES",
      price: price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Argo Electronics" },
    },
    ...(product.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
    ...(reviews.length > 0 && {
      review: reviews.slice(0, 5).map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.userName },
        reviewBody: r.comment,
        reviewRating: { "@type": "Rating", ratingValue: r.rating },
        datePublished: r.createdAt,
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
