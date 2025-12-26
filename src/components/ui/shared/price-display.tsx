import { formatPrice } from "@/types/product";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface PriceDisplayProps {
  pricePerDay: number;
  showThreeDayPrice?: boolean;
}

export function PriceDisplay({
  pricePerDay,
  showThreeDayPrice = true,
}: PriceDisplayProps) {
  const price3Days = pricePerDay * 2;

  return (
    <div className="space-y-2 border-t border-b py-4">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">{formatPrice(pricePerDay)}</span>
        <span className="text-sm text-muted-foreground">/ day</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-primary hover:text-foreground transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="w-64" align="start">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">1 day = 24 hours</p>
              <p className="text-sm text-muted-foreground">
                Rent 2 days, free 1 day
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      {showThreeDayPrice && (
        <>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-600">
              {formatPrice(price3Days)}
            </span>
            <span className="text-sm text-muted-foreground">/ 3 days</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Rent 2 days, free 1 day
          </p>
        </>
      )}
    </div>
  );
}
