import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="privacy-container max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-center text-3xl font-bold">Privacy Policy</h1>
        <p className="text-center text-lg">Effective Date: May 4, 2025</p>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
          </CardHeader>
          <CardContent>
            <p>
              This platform is designed to assist VIT students with STS (Soft Skills) course preparation through MCQ-based training and curated study materials. This Privacy Policy explains how we collect, use, and protect your information when you interact with our services.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          </CardHeader>
          <CardContent>
            <p>
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Information:</strong> Such as your name and email when voluntarily submitted (e.g., leaderboard submissions).</li>
              <li><strong>Usage Data:</strong> Including quiz attempts, scores, and session duration to help improve the platform.</li>
              <li><strong>Cookies:</strong> To remember user preferences and track aggregate performance metrics.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          </CardHeader>
          <CardContent>
            <p>
              Your information is used to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deliver and improve STS MCQ quizzes and related features.</li>
              <li>Track quiz performance and progress over time.</li>
              <li>Maintain leaderboard functionality (if opted in).</li>
              <li>Ensure smooth operation of the platform and its content delivery.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">4. Data Security</h2>
          </CardHeader>
          <CardContent>
            <p>
              We take precautions to safeguard your data and use secure storage and limited access protocols. However, as with all online services, absolute security cannot be guaranteed.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">5. Data Sharing</h2>
          </CardHeader>
          <CardContent>
            <p>
              We do not sell or share your personal data with third parties. Information may be shared only in the following cases:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>With your consent, such as publishing your name on the leaderboard.</li>
              <li>To comply with legal obligations.</li>
              <li>With trusted services necessary for platform hosting and analytics (e.g., Vercel, Supabase).</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">6. User Rights</h2>
          </CardHeader>
          <CardContent>
            <p>
              You may:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Request deletion or modification of your submitted data (e.g., name on leaderboard).</li>
              <li>Withdraw consent for any future data use.</li>
              <li>Contact us for any privacy-related inquiries.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">7. Changes to this Privacy Policy</h2>
          </CardHeader>
          <CardContent>
            <p>
              We may update this Privacy Policy occasionally to reflect changes in the platform or relevant regulations. Please check this page for the most current version.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">8. Contact Us</h2>
          </CardHeader>
          <CardContent>
            <p>
              For any questions or concerns regarding this Privacy Policy or the STS platform, please visit <a href="https://github.com/msnabiel/NabSTS" className="text-blue-600">our GitHub repository</a>.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
