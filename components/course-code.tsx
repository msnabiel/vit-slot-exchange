import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClipboardCopy} from "lucide-react";
import Link from "next/link"; // Import Link for navigation
import Image from 'next/image';
const features = [
  {
    icon: ClipboardCopy,
    title: "STS302P - 6th Semester Course",
    description:
      "A soft skills course focused on communication, problem-solving, and leadership for professional growth.",
    link: "/practice/sts302p",  // Update this link as needed
  },
];

const NabSTSsCourse = () => {
  return (
    <div
      id="features"
      className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6"
    >
      <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
      Select Your Course to Get Started
      </h2>
      <div className="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {features.map((feature) => (
          <Link key={feature.title} href={feature.link}> {/* Wrap each card with Link */}
            <Card
              className="flex flex-col border rounded-xl overflow-hidden shadow-none transition-transform hover:scale-105"
            >
              <CardHeader className="p-6 flex flex-col items-center">
                <feature.icon className="h-12 w-12 text-blue-500" /> {/* Render icon with size and color */}
                <h4 className="mt-3 text-xl font-bold tracking-tight text-center">{feature.title}</h4>
                <p className="mt-2 text-muted-foreground text-sm xs:text-base text-center">
                  {feature.description}
                </p>
              </CardHeader>
              <CardContent className="mt-auto px-0 pb-0">
                                <div className="relative w-full h-52">
                                  <Image
                                    src="/coding.png" // Replace with the actual image path
                                    alt="Download Resource" // Suitable alt text
                                    layout="fill" // Makes image take up the full container
                                    objectFit="cover" // Ensures the image covers the container properly without distortion
                                    className="rounded-tl-xl" // Tailwind CSS class for rounded top-left corners
                                  />
                                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NabSTSsCourse;
