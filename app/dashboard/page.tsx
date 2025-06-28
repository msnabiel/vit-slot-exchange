'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  UsersIcon,
  BarChart3Icon,
  RefreshCcwIcon,
  StarIcon,
  BookOpenCheckIcon,
  RepeatIcon,
} from "lucide-react";

type SlotEntry = {
  name: string;
  mobile: string;
  have_slot: string;
  want_slot: string;
  professor: string;
  course: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<SlotEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data: entries, error } = await supabase.from("slot_requests").select("*");
      if (entries) setData(entries);
      setLoading(false);
    };
    fetchEntries();
  }, []);

  const getMostFrequent = (items: string[]) => {
    const counts = items.reduce((acc: Record<string, number>, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0] || ["None", 0];
  };

  const totalRequests = data.length;
  const uniqueUsers = new Set(data.map((d) => d.mobile)).size;
  const mostRequestedSlot = getMostFrequent(data.map((d) => d.have_slot));
  const mostWantedSlot = getMostFrequent(data.map((d) => d.want_slot));
  const mostWantedProfessor = getMostFrequent(data.map((d) => d.professor));
  const mostCommonPair = getMostFrequent(data.map((d) => `${d.have_slot} → ${d.want_slot}`));

  const statCards = [
    {
      title: "Total Requests",
      value: totalRequests,
      icon: <RefreshCcwIcon className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Unique Users",
      value: uniqueUsers,
      icon: <UsersIcon className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      title: "Most Requested Slot",
      value: `${mostRequestedSlot[0]} (${mostRequestedSlot[1]})`,
      icon: <StarIcon className="w-6 h-6 text-yellow-500" />,
      color: "bg-yellow-50",
    },
    {
      title: "Most Wanted Slot",
      value: `${mostWantedSlot[0]} (${mostWantedSlot[1]})`,
      icon: <BarChart3Icon className="w-6 h-6 text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "Most Wanted Professor",
      value: `${mostWantedProfessor[0]} (${mostWantedProfessor[1]})`,
      icon: <BookOpenCheckIcon className="w-6 h-6 text-pink-500" />,
      color: "bg-pink-50",
    },
    {
      title: "Most Common Exchange",
      value: `${mostCommonPair[0]} (${mostCommonPair[1]})`,
      icon: <RepeatIcon className="w-6 h-6 text-indigo-500" />,
      color: "bg-indigo-50",
    },
  ];

  return (
    <ContentLayout title="Dashboard">
      <main className="max-w-5xl mx-auto mt-10 space-y-6">
        <h2 className="text-3xl font-bold">Overview</h2>

        {loading ? (
          <p className="text-muted-foreground">Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {statCards.map((card, index) => (
              <Card key={index} className={`rounded-2xl shadow-sm border-0 ${card.color}`}>
                <CardContent className="p-5 flex items-start space-x-4">
                  <div>{card.icon}</div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">{card.title}</p>
<p className="text-lg font-semibold text-gray-900">{card.value}</p>

                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </ContentLayout>
  );
}
