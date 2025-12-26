import { formatPrice } from "@/types/product";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface PriceChartPopoverProps {
  productName: string;
  pricePerDay: number;
}

export function PriceChartPopover({
  productName,
  pricePerDay,
}: PriceChartPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-auto">
          Price Chart
          <Menu className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px]" align="end">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Price Chart - {productName}</h4>
          <div className="overflow-hidden rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Days</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Rental Price
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Price per day
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 3, 7, 10, 12, 15].map((days, idx) => {
                  // Calculate total price
                  let totalPrice = pricePerDay * days;

                  // Rent 2 days, free 1 day (applies on day 3)
                  if (days === 3) {
                    totalPrice = pricePerDay * 2;
                  }
                  // 10% discount for 7-13 days
                  else if (days >= 7 && days <= 13) {
                    totalPrice = pricePerDay * days * 0.9;
                  }
                  // 20% discount for 14+ days
                  else if (days >= 14) {
                    totalPrice = pricePerDay * days * 0.8;
                  }

                  const pricePerDayCalculated = totalPrice / days;

                  return (
                    <tr
                      key={days}
                      className={
                        idx % 2 === 0 ? "bg-muted/30" : "bg-background"
                      }
                    >
                      <td className="px-4 py-2">{days}</td>
                      <td className="px-4 py-2 font-medium">
                        {formatPrice(totalPrice)}
                      </td>
                      <td className="px-4 py-2 text-muted-foreground">
                        {formatPrice(pricePerDayCalculated)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Rent 2 days, free 1 day</p>
            <p>• 10% discount for 7-13 days rental</p>
            <p>• 20% discount for 14+ days rental</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
