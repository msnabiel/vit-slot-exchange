'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
type SlotEntry = {
  have_slot: string;
  want_slot: string;
  professor_have: string;
  professor_need: string;
  course: string;
  name: string;
  mobile: string;
  timestamp?: string; // Add this line
};

export default function BrowsePage() {
  const [data, setData] = useState<SlotEntry[]>([]);
  const [filter, setFilter] = useState({ have: "", want: "", professor_have: "", professor_need: "", course: "" });

  useEffect(() => {
    const fetchEntries = async () => {
      let { data: entries } = await supabase.from("slot_requests").select("*").order("created_at", { ascending: false });
      setData(entries || []);
    };
    fetchEntries();
  }, []);

  const filtered = data.filter(entry =>
    (!filter.have || entry.have_slot.toLowerCase().includes(filter.have.toLowerCase())) &&
    (!filter.want || entry.want_slot.toLowerCase().includes(filter.want.toLowerCase())) &&
    (!filter.professor_have || entry.professor_have.toLowerCase().includes(filter.professor_have.toLowerCase())) &&
    (!filter.professor_need || entry.professor_need.toLowerCase().includes(filter.professor_need.toLowerCase())) &&
    (!filter.course || entry.course.toLowerCase().includes(filter.course.toLowerCase()))
  );

  const groupEntries = (entries: SlotEntry[]) => {
    const map = new Map<string, SlotEntry[]>();

    for (const entry of entries) {
      const key = `${entry.have_slot}|${entry.want_slot}|${entry.professor_have}|${entry.professor_need}|${entry.course}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(entry);
    }

    return Array.from(map.entries()).map(([key, group]) => {
      const [have_slot, want_slot, professor_have, professor_need, course] = key.split("|");
      return {
        have_slot,
        want_slot,
        professor_have,
        professor_need,
        course,
        entries: group,
        count: group.length
      };
    });
  };

  const grouped = groupEntries(filtered);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto mt-10 space-y-4">
        <h2 className="text-2xl font-bold">Browse Requests</h2>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Input placeholder="Have Slot" onChange={(e) => setFilter({ ...filter, have: e.target.value })} />
          <Input placeholder="Want Slot" onChange={(e) => setFilter({ ...filter, want: e.target.value })} />
          <Input placeholder="Professor (Have)" onChange={(e) => setFilter({ ...filter, professor_have: e.target.value })} />
          <Input placeholder="Professor (Need)" onChange={(e) => setFilter({ ...filter, professor_need: e.target.value })} />
          <Input placeholder="Course" onChange={(e) => setFilter({ ...filter, course: e.target.value })} />
        </div>

        {/* Grouped Listings */}
        {grouped.map((group, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <p>
                <strong>Have:</strong> {group.have_slot} (<span className="text-blue-700">{group.professor_have}</span>)
                &nbsp;→&nbsp;
                <strong>Want:</strong> {group.want_slot} (<span className="text-blue-700">{group.professor_need}</span>)
                <span className="ml-2 text-green-600 font-semibold">[x {group.count}]</span>
              </p>
              <p><strong>Course:</strong> {group.course}</p>

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
