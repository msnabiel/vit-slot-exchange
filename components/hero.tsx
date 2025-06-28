import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FileText } from "lucide-react";
//import Image from "next/image";
import Link from "next/link";
import Spline from '@splinetool/react-spline/next';

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
      <div className="max-w-screen-xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0">
        <div className="max-w-xl">
          <Badge className="rounded-full py-1 border-none">
            STS Soft Skills · VIT
          </Badge>
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
            Ace Your Soft Skills Course with NabSTS
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Practice curated MCQs, track your progress, and master the STS syllabus with focused study material—all built by a VIT student for VIT students.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/practice">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full text-base"
              >
                Start Practicing <ArrowUpRight className="!h-5 !w-5" />
              </Button>
            </Link>
            <Link href="/cheat-sheet">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base shadow-none"
            >
              <FileText className="!h-5 !w-5" /> Docs
            </Button>
            </Link>
          </div>
        </div>
        <div className="relative lg:max-w-lg xl:max-w-xl w-full bg-accent rounded-xl aspect-square overflow-hidden">

          {/*<Image
            src="/placeholder.svg" // Replace with a relevant image if available
            fill
            alt="NabSTS Preview"
            className="object-cover rounded-xl"
          />*/}
          <Spline
        scene="https://prod.spline.design/aEiUQHZcIWEDlaxZ/scene.splinecode" 
      />
        </div>
      </div>
    </div>
  );
};

export default Hero;
