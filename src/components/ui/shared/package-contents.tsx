import Image from "next/image";
import { Info } from "lucide-react";
import type { Product } from "@/types/product";

interface PackageComponent {
  id: string;
  package_id: string;
  order: number;
  product_id: string;
  product_type: string;
  type: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: {
    id: string;
    name: string;
    title: string;
    image?: {
      id: string;
      image: string;
      product_id: string;
      order: number;
      created_at: string;
      updated_at: string;
    };
  };
}

interface PackageContentsProps {
  product: Product;
}

export function PackageContents({ product }: PackageContentsProps) {
  const defaultPackage = product.default_package as
    | {
        components?: PackageComponent[];
      }
    | undefined;

  if (!defaultPackage || !defaultPackage.components) {
    return null;
  }

  const components: PackageComponent[] = defaultPackage.components;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-amber-600">Package</h2>
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="grid grid-cols gap-3 sm:grid-cols-2 md:grid-cols-6">
        {components.map((component) => {
          const imageFilename =
            component.product.image?.image || "_default.jpg";
          const imageSrc = require(
            `@/assets/product-images/${imageFilename}`,
          ).default;

          return (
            <div
              key={component.id}
              className="flex flex-col items-center gap-3 rounded-lg text-center"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={imageSrc}
                  alt={component.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">
                  {component.quantity > 1 && (
                    <span className="mr-1 text-primary">
                      {component.quantity} ×
                    </span>
                  )}
                  {component.product.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
