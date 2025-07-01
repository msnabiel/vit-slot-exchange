'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Grade = "S" | "A" | "B" | "C" | "D" | "E" | "F";

type Subject = {
  grade: Grade;
  credits: number;
};

const gradeToPoint: Record<Grade, number> = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0,
};

export default function CGPACalculatorPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { grade: "A", credits: 0 },
  ]);

  const handleGradeChange = (index: number, grade: Grade) => {
    const updated = [...subjects];
    updated[index].grade = grade;
    setSubjects(updated);
  };

  const handleCreditChange = (index: number, value: number) => {
    const updated = [...subjects];
    updated[index].credits = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { grade: "A", credits: 0 }]);
  };

  const removeSubject = (index: number) => {
    if (subjects.length === 1) return;
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const totalPoints = subjects.reduce(
    (sum, s) => sum + gradeToPoint[s.grade] * s.credits,
    0
  );

  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-center">CGPA Calculator</h1>

        <Card>
          <CardContent className="p-4 space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center gap-2">
                <Select
                  value={subject.grade}
                  onValueChange={(val) => handleGradeChange(index, val as Grade)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradeToPoint).map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  min="1"
                  placeholder="Credits"
                  value={subject.credits}
                  onChange={(e) =>
                    handleCreditChange(index, parseInt(e.target.value) || 0)
                  }
                  className="w-[100px]"
                />

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSubject(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <Button onClick={addSubject}>Add Subject</Button>
              <p className="text-lg font-semibold">
                CGPA: <span className="text-green-600">{cgpa}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
