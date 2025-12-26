"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/types/product";
import { ProductImageGallery } from "./product-image-gallery";
import { PackageContents } from "./package-contents";
import { BookingForm, type BookingFormData } from "./booking-form";
import { PriceDisplay } from "./price-display";
import { PriceChartPopover } from "./price-chart-popover";
import { AvailabilitySection } from "./availability-section";
import { Button } from "@/components/ui/button";
import { calculatePriceBreakdown } from "@/lib/price-calculator";
import { TooltipProvider } from "@/components/ui/tooltip";

interface BookingDetailViewProps {
  product: Product;
}

export function BookingDetailView({ product }: BookingDetailViewProps) {
  const [bookingData, setBookingData] = useState<BookingFormData>({
    pickupDate: undefined,
    pickupTime: "09:00",
    pickupCity: "Jakarta",
    returnDate: undefined,
    returnTime: "09:00",
    returnCity: "Jakarta",
    dayCount: 0,
  });

  const priceBreakdown = calculatePriceBreakdown(
    product.price,
    bookingData.dayCount,
  );

  const handleBookingChange = (data: BookingFormData) => {
    setBookingData(data);
  };

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Booking Form Section */}
        <div className="rounded-lg border bg-card p-6">
          <BookingForm onChange={handleBookingChange} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Image Gallery */}
          <div>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Right Column - Product Info & Pricing */}
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

            {/* Booking Price Breakdown */}
            {bookingData.dayCount > 0 && (
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold">Booking Summary</h3>
                <div className="space-y-2 rounded-lg bg-muted/30 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Rent: {priceBreakdown.rentDays} days
                    </span>
                    <span className="font-medium">
                      {formatPrice(priceBreakdown.subtotal)}
                    </span>
                  </div>

                  {priceBreakdown.freeDays > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Free: {priceBreakdown.freeDays} days
                      </span>
                      <span className="font-medium text-green-600">
                        -{formatPrice(product.price * priceBreakdown.freeDays)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(priceBreakdown.subtotal)}
                    </span>
                  </div>

                  {priceBreakdown.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Discount: {priceBreakdown.discountPercentage}%
                      </span>
                      <span className="font-medium text-green-600">
                        -{formatPrice(priceBreakdown.discount)}
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(priceBreakdown.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Special Offer Badge */}
                {priceBreakdown.freeDays > 0 && (
                  <p className="text-xs text-green-600 font-medium">
                    ✓ Rent 2 days, free 1 day applied
                  </p>
                )}
                {priceBreakdown.discountPercentage > 0 && (
                  <p className="text-xs text-green-600 font-medium">
                    ✓ {priceBreakdown.discountPercentage}% discount applied
                  </p>
                )}
              </div>
            )}

            {/* Book Now Button */}
            <Button
              className="w-full"
              size="lg"
              disabled={
                !bookingData.pickupDate ||
                !bookingData.returnDate ||
                bookingData.dayCount === 0
              }
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Package Contents Section */}
        <PackageContents product={product} />
      </div>
    </TooltipProvider>
  );
}
