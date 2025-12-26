"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { INDONESIA_CITIES } from "@/data/indonesia-cities";
import { calculateDayCount } from "@/lib/price-calculator";
import { cn } from "@/lib/utils";

export interface BookingFormData {
  pickupDate: Date | undefined;
  pickupTime: string;
  pickupCity: string;
  returnDate: Date | undefined;
  returnTime: string;
  returnCity: string;
  dayCount: number;
}

interface BookingFormProps {
  onChange: (data: BookingFormData) => void;
}

const TIME_OPTIONS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export function BookingForm({ onChange }: BookingFormProps) {
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [pickupTime, setPickupTime] = useState("09:00");
  const [pickupCity, setPickupCity] = useState("Jakarta");
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [returnTime, setReturnTime] = useState("09:00");
  const [returnCity, setReturnCity] = useState("Jakarta");
  const [dayCount, setDayCount] = useState(0);

  // Calculate day count whenever dates change
  useEffect(() => {
    if (pickupDate && returnDate) {
      const count = calculateDayCount(pickupDate, returnDate);
      setDayCount(count);

      // Notify parent component
      onChange({
        pickupDate,
        pickupTime,
        pickupCity,
        returnDate,
        returnTime,
        returnCity,
        dayCount: count,
      });
    }
  }, [
    pickupDate,
    pickupTime,
    pickupCity,
    returnDate,
    returnTime,
    returnCity,
    onChange,
  ]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Pickup Date */}
        <div className="space-y-2">
          <span className="text-sm font-medium block">
            Pickup <span className="text-destructive">*</span>
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !pickupDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDate ? format(pickupDate, "dd-MMM-yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Pickup Time */}
        <div className="space-y-2">
          <span className="text-sm font-medium block">Time</span>
          <Select value={pickupTime} onValueChange={setPickupTime}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_OPTIONS.map((time) => (
                <SelectItem key={time} value={time}>
                  WIB {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pickup City */}
        <div className="space-y-2">
          <span className="text-sm font-medium block">City</span>
          <Select value={pickupCity} onValueChange={setPickupCity}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INDONESIA_CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Return Date */}
        <div className="space-y-2">
          <span className="text-sm font-medium block">
            Return <span className="text-destructive">*</span>
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !returnDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate ? format(returnDate, "dd-MMM-yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                disabled={(date) => {
                  if (!pickupDate) return date < new Date();
                  return date <= pickupDate;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Return Time */}
        <div className="space-y-2">
          <span className="text-sm font-medium block">Time</span>
          <Select value={returnTime} onValueChange={setReturnTime}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_OPTIONS.map((time) => (
                <SelectItem key={time} value={time}>
                  WIB {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Return City */}
        <div className="space-y-2">
          <span className="text-sm font-medium block">City</span>
          <Select value={returnCity} onValueChange={setReturnCity}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INDONESIA_CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Day Count Display */}
      {pickupDate && returnDate && dayCount > 0 && (
        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-muted-foreground">Day Count:</span>
          <span className="font-semibold text-lg">{dayCount}</span>
        </div>
      )}
    </div>
  );
}
