import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Product } from "@/types/product";
import productsData from "@/data/products.json";
import { ProductDetailView } from "@/components/ui/shared/product-detail-view";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const products: Product[] = productsData;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to products
            </Button>
          </Link>
        </div>

        {/* Product Detail */}
        <ProductDetailView product={product} />
      </main>
    </div>
  );
}
