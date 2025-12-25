import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { formatPrice, getProductImage } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Get the first product image filename
  const imageFilename = getProductImage(product);

  // Dynamically require the image from local assets
  const imageSrc = require(`@/assets/product-images/${imageFilename}`).default;

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
            {product.manufacturer.name}
          </span>
          <span>•</span>
          <span>{product.category.name}</span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {product.title}
        </p>
      </CardContent>
      <CardFooter>
        <div className="space-y-1">
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              / day
            </span>
          </p>
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.price * 2)}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              / 3 days
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
