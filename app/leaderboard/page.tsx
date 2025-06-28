"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Medal, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

// ✅ Type for each quiz result
type QuizResult = {
  name: string;
  score: number;
  time_taken: number;
  timestamp: string;
  course: string;
};

// ✅ Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Home = () => {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Function to fetch leaderboard results
  const fetchQuizResults = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("quiz_sts")
        .select("*")
        .eq("course", "sts302p")
        .order("score", { ascending: false })
        .order("time_taken", { ascending: true });

      if (error) throw error;

      setQuizResults(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Error fetching quiz results:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizResults();
  }, []);

  // ✅ Manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchQuizResults();
    setIsRefreshing(false);
  };

  // ✅ Format seconds into MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ✅ Medal color by rank
  const getMedalColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-700";
      default:
        return "text-slate-700";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              STS302P Quiz Leaderboard
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Test your knowledge and see how you rank!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Link href="/ranked-test-sts302p">
              <Button size="lg">Take Quiz Now</Button>
            </Link>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">Loading leaderboard data...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            Error loading leaderboard: {error}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="h-5 w-5" /> Top Performers
                  </CardTitle>
                  <CardDescription>
                    Ranked by highest score and fastest completion time
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-9 w-9"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                  <span className="sr-only">Refresh</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Quiz results for STS302P course</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizResults.map((result, index) => (
                    <TableRow key={index} className={index < 3 ? "font-medium" : ""}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          {index + 1}
                          {index < 3 && (
                            <Medal
                              className={`h-4 w-4 ${getMedalColor(index + 1)}`}
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{result.name}</TableCell>
                      <TableCell className="text-right">{result.score}</TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-1">
                        <Clock className="h-4 w-4 text-slate-500" />
                        {formatTime(result.time_taken)}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(result.timestamp).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {quizResults.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                        No quiz results yet. Be the first to take the quiz!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
