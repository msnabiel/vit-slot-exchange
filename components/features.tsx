import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClipboardCopy, FileText, Upload, Download, Share, Archive } from "lucide-react"; // New icons

const features = [
  {
    icon: ClipboardCopy,
    title: "Copy Content",
    description:
      "Quickly copy your desired text or code with ease and store it for later use.",
  },
  {
    icon: FileText,
    title: "Save Snippets",
    description:
      "Organize and save important content snippets in an easily accessible format.",
  },
  {
    icon: Upload,
    title: "Upload Files",
    description:
      "Effortlessly upload content from your device and store it securely in your clipboard tool.",
  },
  {
    icon: Download,
    title: "Download Clips",
    description:
      "Download your saved content in various formats for offline use or sharing.",
  },
  {
    icon: Share,
    title: "Share Clips",
    description:
      "Share your saved clips easily with others through various platforms and channels.",
  },
  {
    icon: Archive,
    title: "Archive Clips",
    description:
      "Store old or unused clips in an archive to keep your clipboard organized and tidy.",
  },
];

const NabSTSsFeatures = () => {
  return (
    <div
      id="features"
      className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6"
    >
      <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
        Unlock Powerful Clipboard Features with NabSTSs
      </h2>
      <div className="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col border rounded-xl overflow-hidden shadow-none"
          >
            <CardHeader>
              <feature.icon />
              <h4 className="!mt-3 text-xl font-bold tracking-tight">
                {feature.title}
              </h4>
              <p className="mt-1 text-muted-foreground text-sm xs:text-[17px]">
                {feature.description}
              </p>
            </CardHeader>
            <CardContent className="mt-auto px-0 pb-0">
              <div className="bg-muted h-52 ml-6 rounded-tl-xl" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NabSTSsFeatures;
