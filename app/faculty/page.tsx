'use client';
import { supabase } from "@/lib/supabase";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

type FacultyEntry = {
  sno: number;
  emp_id: string;
  pfix: string;
  faculty_name: string;
  school: string;
  cabin_detail: string;
};

type Rating = {
  faculty_emp_id: string;
  attendance: number;
  marks: number;
  teaching: number;
  comment?: string;
};

export default function FacultyBrowse() {
  const [data, setData] = useState<FacultyEntry[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [showRatingForm, setShowRatingForm] = useState<string | null>(null);
  const [newRatings, setNewRatings] = useState<Record<string, {
    attendance: number;
    marks: number;
    teaching: number;
    comment: string;
  }>>({});
  const [filter, setFilter] = useState({
    name: "",
    emp_id: "",
    school: "",
    cabin: "",
    ratedOnly: false, // <-- add this here
  });

  const userIdentifier =
    typeof window !== "undefined"
      ? localStorage.getItem("user_identifier")
      : null;
  function generateFallbackUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

  useEffect(() => {
  // 1. Set user identifier if not present
  if (typeof window !== "undefined") {
    let userIdentifier = localStorage.getItem("user_identifier");
    if (!userIdentifier) {
      userIdentifier = crypto?.randomUUID?.() || generateFallbackUUID();
      localStorage.setItem("user_identifier", userIdentifier);
    }
  }

  // 2. Fetch faculty data
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

  // 3. Fetch ratings
  const fetchRatings = async () => {
    const { data: ratingEntries, error } = await supabase
      .from("faculty_ratings")
      .select("*");

    if (error) {
      console.error("Error fetching ratings:", error);
    }

    setRatings(ratingEntries || []);
  };

  fetchData();
  fetchRatings();
}, []);

  const handleSubmitRating = async (empId: string) => {
    if (!userIdentifier) {
      alert("Please set a user identifier first");
      return;
    }

    const currentRating = newRatings[empId] || {
      attendance: 5,
      marks: 5,
      teaching: 5,
      comment: ""
    };

    const { error } = await supabase
  .from("faculty_ratings")
  .upsert({
    faculty_emp_id: empId,
    user_identifier: userIdentifier,
    attendance: currentRating.attendance,
    marks: currentRating.marks,
    teaching: currentRating.teaching,
    comment: currentRating.comment,
    created_at: new Date().toISOString()
  }, {
    onConflict: 'faculty_emp_id,user_identifier'  // match the constraint
  });


    if (error) {
      console.error("Error submitting rating:", error);
      alert("Error submitting rating");
    } else {
      alert("Rating submitted successfully!");
      setShowRatingForm(null);
      
      // Clear the rating for this specific faculty
      setNewRatings(prev => {
        const updated = { ...prev };
        delete updated[empId];
        return updated;
      });
      
      // Refresh ratings
      const { data: ratingEntries } = await supabase
        .from("faculty_ratings")
        .select("*");
      setRatings(ratingEntries || []);
    }
  };

  const getFacultyRatings = (empId: string) => {
    const facultyRatings = ratings.filter(r => r.faculty_emp_id === empId);
    if (facultyRatings.length === 0) return null;

    const avgAttendance = facultyRatings.reduce((sum, r) => sum + r.attendance, 0) / facultyRatings.length;
    const avgMarks = facultyRatings.reduce((sum, r) => sum + r.marks, 0) / facultyRatings.length;
    const avgTeaching = facultyRatings.reduce((sum, r) => sum + r.teaching, 0) / facultyRatings.length;
    const overall = (avgAttendance + avgMarks + avgTeaching) / 3;

    return {
      attendance: avgAttendance,
      marks: avgMarks,
      teaching: avgTeaching,
      overall,
      count: facultyRatings.length
    };
  };

  

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
      fill={i < Math.round(rating) ? "currentColor" : "none"}
    />
  ));
};


  const renderRatingInput = (empId: string, value: number, onChange: (value: number) => void, label: string) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium w-20">{label}:</span>
      {Array.from({ length: 5 }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className={`text-lg ${i < value ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400`}
        >
          ★
        </button>
      ))}
      <span className="text-sm text-gray-600">({value}/5)</span>
    </div>
  );

  const getCurrentRating = (empId: string) => {
    return newRatings[empId] || {
      attendance: 5,
      marks: 5,
      teaching: 5,
      comment: ""
    };
  };

  const updateRating = (empId: string, field: string, value: any) => {
    setNewRatings(prev => ({
      ...prev,
      [empId]: {
        ...getCurrentRating(empId),
        [field]: value
      }
    }));
  };
  
  const filtered = useMemo(() => {
  return data.filter((entry) => {
    const matches =
      (!filter.name || entry.faculty_name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (!filter.emp_id || entry.emp_id.toLowerCase().includes(filter.emp_id.toLowerCase())) &&
      (!filter.school || entry.school.toLowerCase().includes(filter.school.toLowerCase())) &&
      (!filter.cabin || entry.cabin_detail.toLowerCase().includes(filter.cabin.toLowerCase()));

    const hasRating = getFacultyRatings(entry.emp_id) !== null;

    return matches && (!filter.ratedOnly || hasRating);
  });
}, [data, filter, ratings]);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto mt-10 space-y-4 px-4">
        <h2 className="text-2xl font-bold">Faculty Cabin Directory</h2>
        <div className="flex items-center gap-2 mt-2">
  <input
    type="checkbox"
    id="rated-only"
    onChange={(e) =>
      setFilter((prev) => ({ ...prev, ratedOnly: e.target.checked }))
    }
  />
  <label htmlFor="rated-only" className="text-sm text-gray-700">
    Show only rated faculty
  </label>
</div>

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
        {filtered.map((entry, i) => {
          const facultyRating = getFacultyRatings(entry.emp_id);
          
          return (
            <Card key={i}>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
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
                  </div>
                  
                  {facultyRating && (
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {renderStars(facultyRating.overall)}
                        <span className="text-sm text-gray-600 ml-1">
                          {facultyRating.overall.toFixed(1)} ({facultyRating.count} reviews)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {facultyRating && (
                  <div className="mt-2 p-2 border rounded bg-blue-50">
                    <p className="font-medium text-blue-800 mb-2">Ratings:</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">Attendance:</span>
                        <div className="flex items-center gap-1">
                          {renderStars(facultyRating.attendance)}
                          <span className="text-xs">({facultyRating.attendance.toFixed(1)})</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-blue-700">Marks:</span>
                        <div className="flex items-center gap-1">
                          {renderStars(facultyRating.marks)}
                          <span className="text-xs">({facultyRating.marks.toFixed(1)})</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-blue-700">Teaching:</span>
                        <div className="flex items-center gap-1">
                          {renderStars(facultyRating.teaching)}
                          <span className="text-xs">({facultyRating.teaching.toFixed(1)})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-2 p-2 border rounded bg-green-50">
                  <p className="font-medium text-green-800">Cabin Information:</p>
                  <p className="text-sm text-green-700">
                    {entry.cabin_detail}
                  </p>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => setShowRatingForm(showRatingForm === entry.emp_id ? null : entry.emp_id)}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    {showRatingForm === entry.emp_id ? "Cancel" : "Rate Faculty"}
                  </button>
                </div>

                {showRatingForm === entry.emp_id && (
                  <div className="mt-4 p-4 border rounded bg-yellow-50">
                    <h4 className="font-medium text-yellow-800 mb-3">Rate {entry.pfix} {entry.faculty_name}</h4>
                    <div className="space-y-3">
                      {renderRatingInput(
                        entry.emp_id,
                        getCurrentRating(entry.emp_id).attendance,
                        (value) => updateRating(entry.emp_id, 'attendance', value),
                        "Attendance"
                      )}
                      {renderRatingInput(
                        entry.emp_id,
                        getCurrentRating(entry.emp_id).marks,
                        (value) => updateRating(entry.emp_id, 'marks', value),
                        "Marks"
                      )}
                      {renderRatingInput(
                        entry.emp_id,
                        getCurrentRating(entry.emp_id).teaching,
                        (value) => updateRating(entry.emp_id, 'teaching', value),
                        "Teaching"
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Comment (optional):
                        </label>
<Textarea
  value={getCurrentRating(entry.emp_id).comment}
  onChange={(e) => updateRating(entry.emp_id, 'comment', e.target.value)}
  className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 text-base" // 👈 changed from text-sm
  rows={2}
  placeholder="Share your experience..."
/>



                      </div>
                      
                      <div className="flex gap-2">
                        <Button onClick={() => handleSubmitRating(entry.emp_id)}>
  Submit Rating
</Button>
<Button variant="secondary" onClick={() => setShowRatingForm(null)}>
  Cancel
</Button>

                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No matching faculty found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}