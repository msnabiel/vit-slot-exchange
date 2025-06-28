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

type SlotEntry = {
  id: string;
  have_slot: string;
  want_slot: string;
  professor_have: string;
  professor_need: string;
  course: string;
  name: string;
  mobile: string;
  timestamp?: string;
  user_identifier?: string;
  status?: string;
};

export default function BrowsePage() {
  const router = useRouter();
  const [data, setData] = useState<SlotEntry[]>([]);
  const [filter, setFilter] = useState({
    have: "",
    want: "",
    professor_have: "",
    professor_need: "",
    course: "",
  });
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("open");

  const userIdentifier =
    typeof window !== "undefined"
      ? localStorage.getItem("user_identifier")
      : null;

  useEffect(() => {
    const fetchEntries = async () => {
      const { data: entries } = await supabase
        .from("slot_requests")
        .select("*")
        .order("created_at", { ascending: false });

      setData(entries || []);
    };
    fetchEntries();
  }, []);

  const handleStatusChange = async (id: string, status: "closed" | "open") => {
    const { error } = await supabase
      .from("slot_requests")
      .update({ status })
      .eq("id", id);

    console.log(`Trying to change status to "${status}" for ID:`, id);
    console.log("Supabase error:", error);

    if (error) {
      console.error(`Failed to update status to "${status}":`, error);
    } else {
      console.log(`Request successfully marked as ${status}`);
      setData((prevData) =>
        prevData.map((entry) =>
          entry.id === id ? { ...entry, status } : entry
        )
      );
    }
  };

  const filtered = useMemo(() => {
    return data.filter((entry) => {
      const matchesFilters =
  (!filter.have || (entry.have_slot ?? "").toLowerCase().includes(filter.have.toLowerCase())) &&
  (!filter.want || (entry.want_slot ?? "").toLowerCase().includes(filter.want.toLowerCase())) &&
  (!filter.professor_have || (entry.professor_have ?? "").toLowerCase().includes(filter.professor_have.toLowerCase())) &&
  (!filter.professor_need || (entry.professor_need ?? "").toLowerCase().includes(filter.professor_need.toLowerCase())) &&
  (!filter.course || (entry.course ?? "").toLowerCase().includes(filter.course.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" || entry.status === statusFilter;

      return matchesFilters && matchesStatus;
    });
  }, [data, filter, statusFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, SlotEntry[]>();
    for (const entry of filtered) {
      const key = `${entry.have_slot ?? ""}|${entry.want_slot ?? ""}|${entry.professor_have ?? ""}|${entry.professor_need ?? ""}|${entry.course ?? ""}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(entry);
    }

    return Array.from(map.entries()).map(([key, group]) => {
      const [have_slot, want_slot, professor_have, professor_need, course] =
        key.split("|");
      return {
        have_slot,
        want_slot,
        professor_have,
        professor_need,
        course,
        entries: group,
        count: group.length,
      };
    });
  }, [filtered]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto mt-10 space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Browse Requests</h2>
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => router.push("/ask")}
          >
            Ask
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Input placeholder="Have Slot" onChange={(e) => setFilter({ ...filter, have: e.target.value })} />
          <Input placeholder="Want Slot" onChange={(e) => setFilter({ ...filter, want: e.target.value })} />
          <Input placeholder="Professor (Have)" onChange={(e) => setFilter({ ...filter, professor_have: e.target.value })} />
          <Input placeholder="Professor (Need)" onChange={(e) => setFilter({ ...filter, professor_need: e.target.value })} />
          <Input placeholder="Course" onChange={(e) => setFilter({ ...filter, course: e.target.value })} />
        </div>

        {/* Status Filter Toggle Group */}
<ToggleGroup
  type="single"
  value={statusFilter}
  onValueChange={(value) => {
    if (value) setStatusFilter(value as "all" | "open" | "closed");
  }}
  className="mt-2"
>
  <ToggleGroupItem value="all">All</ToggleGroupItem>
  <ToggleGroupItem value="open">Open</ToggleGroupItem>
  <ToggleGroupItem value="closed">Closed</ToggleGroupItem>
</ToggleGroup>

        

        {/* Grouped Listings */}
        {grouped.map((group, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <p>
                <strong>Have:</strong> {group.have_slot} (
                <span className="text-blue-700">{group.professor_have}</span>)
                &nbsp;→&nbsp;
                <strong>Want:</strong> {group.want_slot} (
                <span className="text-blue-700">{group.professor_need}</span>)
                <span className="ml-2 text-green-600 font-semibold">
                  [x {group.count}]
                </span>
              </p>
              <p>
                <strong>Course:</strong> {group.course}
              </p>

              <div className="mt-2 p-2 border rounded bg-green-50">
                <p className="font-medium text-green-800">Contact Info:</p>
                <ul className="text-sm text-green-700 list-disc list-inside">
                  {group.entries.map((entry, j) => (
                    <li key={j}>
                      {entry.name} - {entry.mobile}
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
                              onClick={() => handleStatusChange(entry.id, "closed")}
                            >
                              Close
                            </button>
                          ) : (
                            <button
                              className="ml-2 text-xs text-blue-600 underline"
                              onClick={() => handleStatusChange(entry.id, "open")}
                            >
                              Reopen
                            </button>
                          )}
                        </>
                      )}
                      {entry.status === "closed" && (
                        <span className="ml-2 text-xs text-gray-500">[Closed]</span>
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
