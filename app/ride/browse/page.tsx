'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

type RideRequest = {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  name: string;
  mobile: string;
  timestamp?: string;
  user_identifier?: string;
  status?: string;
};

function formatDateToReadable(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-IN", { month: "long" });
  const year = date.getFullYear();

  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  };

  return `${getOrdinal(day)} ${month} ${year}`;
}

export default function RideBrowsePage() {
  const router = useRouter();
  const [data, setData] = useState<RideRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("open");

  const [filter, setFilter] = useState({
    from: "",
    to: "",
    date: undefined as Date | undefined,
    time: "",
  });

  const userIdentifier =
    typeof window !== "undefined" ? localStorage.getItem("user_identifier") : null;

  useEffect(() => {
    const fetchEntries = async () => {
      const { data: entries } = await supabase
        .from("ride_requests")
        .select("*")
        .order("created_at", { ascending: false });

      setData(entries || []);
    };
    fetchEntries();
  }, []);

  const handleStatusChange = async (id: string, status: "closed" | "open") => {
    const { error } = await supabase
      .from("ride_requests")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setData((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, status } : entry
        )
      );
    }
  };

  const filtered = useMemo(() => {
    return data.filter((entry) => {
      const matchesFilters =
        (!filter.from || entry.from?.toLowerCase().includes(filter.from.toLowerCase())) &&
        (!filter.to || entry.to?.toLowerCase().includes(filter.to.toLowerCase())) &&
        (!filter.date ||
          (entry.date &&
           new Date(entry.date).toISOString().slice(0, 10) === filter.date.toISOString().slice(0, 10))) &&
        (!filter.time || entry.time?.toLowerCase().includes(filter.time.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" || entry.status === statusFilter;

      return matchesFilters && matchesStatus;
    });
  }, [data, filter, statusFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, RideRequest[]>();
    for (const entry of filtered) {
      const key = `${entry.from ?? ""}|${entry.to ?? ""}|${entry.date ?? ""}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(entry);
    }

    return Array.from(map.entries()).map(([key, group]) => {
      const [from, to, date] = key.split("|");
      return { from, to, date, entries: group, count: group.length };
    });
  }, [filtered]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto mt-10 space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Browse Rides</h2>
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => router.push("/ride/ask")}
          >
            Request
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Input
            placeholder="From"
            onChange={(e) => setFilter({ ...filter, from: e.target.value })}
          />
          <Input
            placeholder="To"
            onChange={(e) => setFilter({ ...filter, to: e.target.value })}
          />
          {/* Calendar Popover 
          <div className="flex flex-col gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="justify-between font-normal"
                >
                  {filter.date
                    ? filter.date.toLocaleDateString("en-CA")
                    : "Select date"}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-none" align="start">
                <Calendar
                  mode="single"
                  selected={filter.date}
                  onSelect={(date) => {
                    setFilter({ ...filter, date: date ?? undefined });
                  }}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>*/}

          <Input
            placeholder="Time"
            onChange={(e) => setFilter({ ...filter, time: e.target.value })}
          />
        </div>

        {/* Toggle Group */}
        <ToggleGroup
          type="single"
          value={statusFilter}
          onValueChange={(value) =>
            value && setStatusFilter(value as "all" | "open" | "closed")
          }
          className="mt-2"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="open">Open</ToggleGroupItem>
          <ToggleGroupItem value="closed">Closed</ToggleGroupItem>
        </ToggleGroup>

        {/* Results */}
        {grouped.map((group, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <p>
                <strong>From:</strong> {group.from} → <strong>To:</strong>{" "}
                {group.to}{" "}
                <span className="ml-2 text-green-600 font-semibold">
                  [x {group.count}]
                </span>
              </p>
              <p>
                <strong>Date:</strong> {formatDateToReadable(group.date)}
              </p>
              <div className="mt-2 p-2 border rounded bg-green-50">
                <p className="font-medium text-green-800">Contact Info:</p>
                <ul className="text-sm text-green-700 list-disc list-inside">
                  {group.entries.map((entry, j) => (
                    <li key={j}>
                      {entry.name} - {entry.mobile}
                      <span className="ml-1 text-xs text-gray-600">
                        ({entry.time})
                      </span>
                      {entry.timestamp && (
                        <span className="ml-2 text-xs text-gray-500">
                          • {entry.timestamp}
                        </span>
                      )}
                      {entry.user_identifier === userIdentifier && (
                        <>
                          {entry.status !== "closed" ? (
                            <button
                              className="ml-2 text-xs text-red-600 underline"
                              onClick={() =>
                                handleStatusChange(entry.id, "closed")
                              }
                            >
                              Close
                            </button>
                          ) : (
                            <button
                              className="ml-2 text-xs text-blue-600 underline"
                              onClick={() =>
                                handleStatusChange(entry.id, "open")
                              }
                            >
                              Reopen
                            </button>
                          )}
                        </>
                      )}
                      {entry.status === "closed" && (
                        <span className="ml-2 text-xs text-gray-500">
                          [Closed]
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
      <Footer />
    </div>
  );
}
