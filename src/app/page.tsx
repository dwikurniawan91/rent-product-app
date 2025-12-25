import { ProductGrid } from "@/components/ui/shared/product-grid";
import type { Product } from "@/types/product";
import productsData from "@/app/data/products.json";

export default function Home() {
  const products: Product[] = productsData;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Camera Rental
          </h1>
          <p className="text-muted-foreground">
            Browse our collection of {products.length} professional cameras
          </p>
        </div>

        <ProductGrid products={products} itemsPerPage={20} />
      </main>
    </div>
  );
}
