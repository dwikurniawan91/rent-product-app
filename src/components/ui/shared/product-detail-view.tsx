import type { Product } from "@/types/product";
import { ProductImageGallery } from "./product-image-gallery";
import { PackageContents } from "./package-contents";
import { PriceDisplay } from "./price-display";
import { PriceChartPopover } from "./price-chart-popover";
import { AvailabilitySection } from "./availability-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Info, LayoutDashboard } from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  return (
    <div className="space-y-8">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Image Gallery */}
        <div>
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Product Title & Brand */}
          <div>
            <h1 className="mb-2 text-3xl font-bold leading-tight">
              {product.title || product.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Brand</span>
              <span className="font-semibold text-primary">
                {product.manufacturer.name}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            <PriceDisplay pricePerDay={product.price} />
            <PriceChartPopover
              productName={product.name}
              pricePerDay={product.price}
            />
          </div>

          {/* Availability Section */}
          <AvailabilitySection />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1" size="lg">
              Add to Project
              <LayoutDashboard className="mr-2 h-5 w-5" />
            </Button>
            <Link href={`/products/${product.id}/book`} className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Note */}
          <div className="flex gap-2 rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Place the item in the project to view the estimated rental cost
              and confirm the booking to our Online Customer Service.
            </p>
          </div>
        </div>
      </div>

      {/* Package Contents Section */}
      <PackageContents product={product} />
    </div>
  );
}
