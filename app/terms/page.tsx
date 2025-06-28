import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="terms-container max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-center text-3xl font-bold">Terms of Service</h1>
        <p className="text-center text-lg">Effective Date: May 4, 2025</p>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          </CardHeader>
          <CardContent>
            <p>
              By accessing or using this platform, you agree to be bound by these Terms of Service. If you do not agree with any part of the terms, you must discontinue use immediately.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">2. Purpose of the Platform</h2>
          </CardHeader>
          <CardContent>
            <p>
              This website is intended solely for academic support, offering multiple-choice question (MCQ) practice and study resources for the STS (Soft Skills) course at VIT. It is not affiliated with or officially endorsed by VIT University.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">3. User Conduct</h2>
          </CardHeader>
          <CardContent>
            <p>
              You agree to use the platform only for lawful purposes. You must not:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the platform in a way that may damage or impair the service.</li>
              <li>Attempt to gain unauthorized access to the backend or databases.</li>
              <li>Upload malicious code or engage in disruptive activities.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
          </CardHeader>
          <CardContent>
            <p>
              All content, including quizzes, explanations, and study guides, is the intellectual property of the platform owner unless stated otherwise. You may not copy, reproduce, or distribute materials without permission.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">5. Disclaimer</h2>
          </CardHeader>
          <CardContent>
            <p>
              The platform is provided “as is” without warranties of any kind. While we strive for accuracy and relevance, we do not guarantee that the content will be error-free or up-to-date.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
          </CardHeader>
          <CardContent>
            <p>
              We are not liable for any damages arising from your use of the platform, including but not limited to data loss, system errors, or performance outcomes in your course.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">7. Termination</h2>
          </CardHeader>
          <CardContent>
            <p>
              We reserve the right to suspend or terminate access to the platform for any user who violates these terms or engages in suspicious activity.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
          </CardHeader>
          <CardContent>
            <p>
              These Terms of Service may be updated periodically. Continued use of the platform after changes implies your acceptance of the revised terms.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">9. Contact</h2>
          </CardHeader>
          <CardContent>
            <p>
              For questions regarding these terms, please contact us via <a href="https://github.com/msnabiel/NabSTS" className="text-blue-600">our GitHub repository</a>.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
