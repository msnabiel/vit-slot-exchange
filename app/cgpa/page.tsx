'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Grade = "S" | "A" | "B" | "C" | "D" | "E" | "F";
type Subject = { grade: Grade; credits: number; };

const gradeToPoint: Record<Grade, number> = {
  S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, F: 0,
};

export default function CGPACalculatorPage() {
  const [subjects, setSubjects] = useState<Subject[]>([{ grade: "A", credits: 0 }]);

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
  const totalPoints = subjects.reduce((sum, s) => sum + gradeToPoint[s.grade] * s.credits, 0);
  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto mt-10 space-y-4 px-4">
        <h2 className="text-2xl font-bold mb-4">CGPA Calculator</h2>
        {subjects.map((subject, index) => (
          <Card key={index} className="mb-2">
            <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <label className="text-sm font-medium">Grade:</label>
                <Select
                  value={subject.grade}
                  onValueChange={val => handleGradeChange(index, val as Grade)}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradeToPoint).map((grade) => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <label className="text-sm font-medium">Credits:</label>
                <Input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={0}
                  value={subject.credits}
                  onChange={e => handleCreditChange(index, parseInt(e.target.value) || 0)}
                  className="w-[100px] no-spinner"
                      style={{ MozAppearance: "textfield" } as React.CSSProperties}
                />
              </div>
              <Button
                variant="destructive"
                onClick={() => removeSubject(index)}
                className="ml-auto"
                disabled={subjects.length === 1}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
        <Button className="mt-2" onClick={addSubject}>
          Add Subject
        </Button>
        <Card className="mt-4">
          <CardContent className="p-4 flex items-center justify-between">
            <span className="text-lg font-semibold">CGPA:</span>
            <span className="text-2xl font-bold text-green-700">{cgpa}</span>
          </CardContent>
        </Card>
      </main>
      <Footer />
      <style jsx global>{`
        /* Hide number input arrows for all browsers */
        input[type=number].no-spinner::-webkit-inner-spin-button,
        input[type=number].no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number].no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}