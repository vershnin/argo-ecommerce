import { Product, Review } from '@/types/product';
import { products as rawProducts } from './products';
import { productImagesMap } from './productImages';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const descriptions: Record<string, string> = {
  Audio: 'Premium audio experience with superior sound quality, noise cancellation, and all-day comfort. Designed for music lovers and professionals alike.',
  Wearables: 'Stay connected and track your fitness with advanced health monitoring, GPS, and smart notifications right on your wrist.',
  Storage: 'Reliable, high-speed storage solutions for all your data needs. From portable SSDs to memory cards, keep your files safe and accessible.',
  Computing: 'Boost your productivity with ergonomic peripherals and accessories designed for comfort during long work sessions.',
  Gaming: 'Immerse yourself in next-gen gaming with powerful consoles, controllers, and accessories built for the ultimate gaming experience.',
  Cameras: 'Capture every moment in stunning detail with action cameras, gimbals, and creative tools for content creators.',
  Chargers: 'Fast, safe, and reliable charging solutions. From wall adapters to power banks, keep your devices powered all day.',
  Games: 'Explore the latest and greatest game titles across all genres. From action to sports, find your next favorite game.',
};

const featuresByCategory: Record<string, string[]> = {
  Audio: ['Premium Sound Quality', 'Active Noise Cancellation', 'Long Battery Life', 'Comfortable Fit', 'Bluetooth 5.3'],
  Wearables: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Sleep Tracking', 'Smart Notifications'],
  Storage: ['High-Speed Transfer', 'Durable Design', 'Plug & Play', 'Cross-Platform Compatible'],
  Computing: ['Ergonomic Design', 'Wireless Connectivity', 'Long Battery Life', 'Multi-Device Support'],
  Gaming: ['Next-Gen Performance', 'Immersive Experience', 'Multiplayer Ready', 'Premium Build Quality'],
  Cameras: ['4K Video Recording', 'Image Stabilization', 'Waterproof', 'Compact Design'],
  Chargers: ['Fast Charging', 'Multi-Device Support', 'Compact Design', 'Safety Protection'],
  Games: ['Single Player Campaign', 'Online Multiplayer', 'Stunning Graphics', 'Hours of Gameplay'],
};

const specsByCategory: Record<string, Record<string, string>> = {
  Audio: { 'Driver Size': '40mm', 'Frequency Response': '20Hz - 20kHz', 'Battery Life': 'Up to 30 hours', 'Connectivity': 'Bluetooth 5.3' },
  Wearables: { 'Display': 'AMOLED', 'Water Resistance': '5ATM', 'Battery Life': 'Up to 7 days', 'Sensors': 'Heart Rate, SpO2, GPS' },
  Storage: { 'Interface': 'USB 3.2', 'Read Speed': 'Up to 1050MB/s', 'Write Speed': 'Up to 1000MB/s', 'Durability': 'Drop & Water Resistant' },
  Computing: { 'Connectivity': 'Bluetooth / USB', 'Battery Life': 'Up to 24 months', 'DPI': '1000-4000', 'Compatible': 'Windows, Mac, Chrome OS' },
  Gaming: { 'Resolution': '4K UHD', 'Storage': '1TB SSD', 'RAM': '16GB', 'Connectivity': 'WiFi 6E, Bluetooth 5.1' },
  Cameras: { 'Resolution': '5.7K', 'Stabilization': '6-axis Gyroscope', 'Battery': '1800mAh', 'Storage': 'MicroSD up to 1TB' },
  Chargers: { 'Output': '65W Max', 'Ports': 'USB-C, USB-A', 'Protocol': 'PD 3.0, QC 4.0', 'Safety': 'Over-current, Over-voltage Protection' },
  Games: { 'Platform': 'PlayStation 5', 'Genre': 'Action/Adventure', 'Players': '1-4', 'Rating': 'T - Teen' },
};

export const mockProducts: Product[] = rawProducts.map((p, i) => {
  const images = productImagesMap[p.id] || ['/placeholder.svg'];
  const categorySlug = slugify(p.category);
  const discountPrice = i % 7 === 0 ? Math.round(p.price * 0.85) : undefined;
  return {
    id: p.id,
    name: p.name,
    slug: slugify(p.name),
    category: { id: categorySlug, name: p.category, slug: categorySlug },
    brand: p.brand,
    price: p.price,
    discountPrice,
    effectivePrice: discountPrice ?? p.price,
    description: descriptions[p.category] || 'Quality electronics from a trusted brand.',
    shortDescription: `${p.brand} ${p.name} — premium quality, authorized retailer.`,
    imageUrl: images[0],
    additionalImages: images.slice(1),
    specifications: specsByCategory[p.category] || {},
    features: featuresByCategory[p.category] || [],
    sku: `ARG-${p.id.toUpperCase()}`,
    stockQuantity: p.inStock ? Math.floor(Math.random() * 20) + 1 : 0,
    inStock: p.inStock,
    badge: p.badge,
    rating: +(3.5 + Math.random() * 1.5).toFixed(1),
    reviewCount: Math.floor(Math.random() * 50) + 1,
    warranty: p.category === 'Games' ? undefined : '1 Year Manufacturer Warranty',
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  };
});

export const mockReviews: Review[] = [
  { id: 'r1', productId: 'sam-w7-44', userId: 'u1', userName: 'James M.', rating: 5, title: 'Excellent watch!', comment: 'Great build quality and battery life. Worth every shilling.', verified: true, helpful: 12, createdAt: '2026-01-15T10:00:00Z' },
  { id: 'r2', productId: 'sam-w7-44', userId: 'u2', userName: 'Grace W.', rating: 4, title: 'Very good', comment: 'Love the design. GPS tracking is accurate.', verified: true, helpful: 8, createdAt: '2026-02-01T14:00:00Z' },
  { id: 'r3', productId: 'app-airpodspro2', userId: 'u3', userName: 'Kevin O.', rating: 5, title: 'Best earbuds', comment: 'Noise cancellation is incredible. Crystal clear audio.', verified: true, helpful: 20, createdAt: '2026-01-20T09:00:00Z' },
  { id: 'r4', productId: 'ps5-pro', userId: 'u4', userName: 'Brian K.', rating: 5, title: 'Next-gen gaming', comment: 'The performance is unbelievable. Load times are instant.', verified: true, helpful: 15, createdAt: '2026-02-10T16:00:00Z' },
];
