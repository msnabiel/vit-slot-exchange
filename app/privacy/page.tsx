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
              This platform facilitates anonymous slot exchange among VIT students. We value your privacy and this policy outlines how we handle the information you provide while using the service.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">2. What We Collect</h2>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Slot Exchange Data:</strong> Your submitted slot preferences, course name, and professor names.</li>
              <li><strong>Contact Info:</strong> Optional details like name or mobile number, if provided by you for others to contact you.</li>
              <li><strong>User Identifier:</strong> A unique ID stored locally in your browser to manage your own requests (without requiring login).</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">3. How We Use Your Data</h2>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>To display and group your slot exchange requests.</li>
              <li>To detect mutual matches between users' preferences.</li>
              <li>To allow you to close or reopen your own listings.</li>
              <li>To maintain platform integrity without requiring accounts or logins.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">4. Data Visibility</h2>
          </CardHeader>
          <CardContent>
            <p>
              Your exchange request details (slot names, course, professor) are publicly visible to all users. Contact info is only visible if you choose to provide it. Your user identifier remains private in your local storage.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">5. Data Sharing</h2>
          </CardHeader>
          <CardContent>
            <p>
              We do not sell or share personal data. Data is only shared in the following cases:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>With infrastructure providers (e.g., Supabase, Vercel) for hosting and database operations.</li>
              <li>If legally required to do so.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">6. User Controls</h2>
          </CardHeader>
          <CardContent>
            <p>
              You can close or reopen your entries at any time using the same browser. If you wish to fully delete your request or have questions, contact us via the GitHub repository below.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">7. Changes to Policy</h2>
          </CardHeader>
          <CardContent>
            <p>
              We may update this Privacy Policy as the platform evolves. Updates will be reflected on this page with a revised effective date.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">8. Contact</h2>
          </CardHeader>
          <CardContent>
            <p>
              For questions or concerns, visit <a href="https://github.com/msnabiel/" className="text-blue-600">our GitHub repository</a>.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
