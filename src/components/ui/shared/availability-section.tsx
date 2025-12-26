import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface AvailabilityLocation {
  name: string;
  status: "available" | "request" | "unavailable";
}

interface AvailabilitySectionProps {
  locations?: AvailabilityLocation[];
}

const defaultLocations: AvailabilityLocation[] = [
  { name: "Jakarta", status: "available" },
  { name: "Surabaya", status: "available" },
];

export function AvailabilitySection({
  locations = defaultLocations,
}: AvailabilitySectionProps) {
  const getStatusColor = (status: AvailabilityLocation["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "request":
        return "bg-amber-500";
      case "unavailable":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold">Availability</h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-primary hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="w-64" align="start">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    Availability info
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-muted-foreground">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span className="text-muted-foreground">
                        Available by request
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      <span className="text-muted-foreground">Unavailable</span>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          {locations.map((location) => (
            <div key={location.name} className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${getStatusColor(location.status)}`}
              ></span>
              <span className="text-muted-foreground">{location.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
