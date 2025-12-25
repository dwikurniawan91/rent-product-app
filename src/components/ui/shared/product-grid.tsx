"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ui/shared/product-card";
import { Pagination } from "@/components/ui/shared/pagination";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  itemsPerPage?: number;
}

export function ProductGrid({ products, itemsPerPage = 20 }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get current page products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate range display
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, products.length);

  return (
    <div className="space-y-8">
      {/* Products count and range */}
      <div className="text-sm text-muted-foreground">
        Showing {startItem}-{endItem} of {products.length} products
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
