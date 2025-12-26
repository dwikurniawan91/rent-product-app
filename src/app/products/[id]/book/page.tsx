import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Product } from "@/types/product";
import productsData from "@/data/products.json";
import { BookingDetailView } from "@/components/ui/shared/booking-detail-view";
import { Button } from "@/components/ui/button";

interface BookingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { id } = await params;
  const products: Product[] = productsData;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/products/${id}`}>
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to product details
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Book Your Rental</h1>
          <p className="text-muted-foreground">
            Select your pickup and return dates to see the total price
          </p>
        </div>

        {/* Booking Detail */}
        <BookingDetailView product={product} />
      </main>
    </div>
  );
}
