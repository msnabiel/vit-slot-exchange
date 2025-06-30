'use client';
import { supabase } from "@/lib/supabase";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

type FacultyEntry = {
  sno: number;
  emp_id: string;
  pfix: string;
  faculty_name: string;
  school: string;
  cabin_detail: string;
};

export default function FacultyBrowse() {
  const [data, setData] = useState<FacultyEntry[]>([]);
  const [filter, setFilter] = useState({
    name: "",
    emp_id: "",
    school: "",
    cabin: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: entries, error } = await supabase
        .from("faculty_cabins")
        .select("*")
        .order("faculty_name", { ascending: true });
      
      if (error) {
        console.error("Error fetching faculty:", error);
      }
      setData(entries || []);
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return data.filter((entry) =>
      (!filter.name || entry.faculty_name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (!filter.emp_id || entry.emp_id.toLowerCase().includes(filter.emp_id.toLowerCase())) &&
      (!filter.school || entry.school.toLowerCase().includes(filter.school.toLowerCase())) &&
      (!filter.cabin || entry.cabin_detail.toLowerCase().includes(filter.cabin.toLowerCase()))
    );
  }, [data, filter]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto mt-10 space-y-4 px-4">
        <h2 className="text-2xl font-bold">Faculty Cabin Directory</h2>
        
        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Input
            placeholder="Name"
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />
          <Input
            placeholder="Employee ID"
            onChange={(e) => setFilter({ ...filter, emp_id: e.target.value })}
          />
          <Input
            placeholder="School"
            onChange={(e) => setFilter({ ...filter, school: e.target.value })}
          />
          <Input
            placeholder="Cabin Detail"
            onChange={(e) => setFilter({ ...filter, cabin: e.target.value })}
          />
        </div>

        {/* Results */}
        {filtered.map((entry, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <p>
                <strong>Faculty:</strong>{" "}
                <span className="text-blue-700 font-semibold">
                  {entry.pfix} {entry.faculty_name}
                </span>
              </p>
              <p>
                <strong>Employee ID:</strong> {entry.emp_id}
              </p>
              <p>
                <strong>School:</strong> {entry.school}
              </p>

              <div className="mt-2 p-2 border rounded bg-green-50">
                <p className="font-medium text-green-800">Cabin Information:</p>
                <p className="text-sm text-green-700">
                  {entry.cabin_detail}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No matching faculty found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}