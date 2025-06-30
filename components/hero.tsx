import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FileText, HelpingHand, PersonStanding } from "lucide-react";
import Link from "next/link";
import Spline from "@splinetool/react-spline/next";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
      <div className="max-w-screen-xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0">
        <div className="max-w-xl">
          <Badge className="rounded-full py-1 border-none">
            VIT · Student Tools
          </Badge>
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
            Seamless Slot Swapping & Faculty Insights
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Effortlessly exchange class slots with fellow VIT students, and explore detailed faculty cabin info with real student ratings — all in one place.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/browse">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full text-base"
              >
                Browse Slot Requests <ArrowUpRight className="!h-5 !w-5" />
              </Button>
            </Link>
            <Link href="/faculty">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto rounded-full text-base"
              >
                <PersonStanding className="!h-5 !w-5 mr-2" />
                Faculty Ratings
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative lg:max-w-lg xl:max-w-xl w-full bg-accent rounded-xl aspect-square overflow-hidden">
          <Spline scene="https://prod.spline.design/aEiUQHZcIWEDlaxZ/scene.splinecode" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
