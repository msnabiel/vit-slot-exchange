import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Correct component names

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <div className="cookies-container max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-center text-3xl font-bold">Cookies Policy</h1>
        <p className="text-center text-lg">Effective Date: April 29, 2025</p>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
          </CardHeader>
          <CardContent>
            <p>
              This Cookies Policy explains how NabSTSs uses cookies and similar technologies to recognize you when you visit our platform. It outlines the types of cookies we use, the information they collect, and your choices regarding cookies.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">2. What Are Cookies?</h2>
          </CardHeader>
          <CardContent>
            <p>
              Cookies are small data files that are placed on your device when you visit a website. These files are used to store information such as your preferences, settings, and browsing activity, which helps improve your user experience.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">3. Types of Cookies We Use</h2>
          </CardHeader>
          <CardContent>
            <p>
              We use different types of cookies for various purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly, such as for login sessions and cart functionalities.</li>
              <li><strong>Performance Cookies:</strong> These cookies help us understand how users interact with our platform, enabling us to improve performance.</li>
              <li><strong>Functionality Cookies:</strong> These cookies allow us to remember your preferences and settings, providing a personalized experience.</li>
              <li><strong>Advertising Cookies:</strong> These cookies are used to display relevant ads to users based on their browsing activity.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">4. Managing Cookies</h2>
          </CardHeader>
          <CardContent>
            <p>
              You have the option to accept or decline cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to refuse cookies if you prefer. However, doing so may affect your ability to use certain features of the platform.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">5. Third-Party Cookies</h2>
          </CardHeader>
          <CardContent>
            <p>
              We may allow third-party service providers to place cookies on our platform for purposes such as analytics, advertising, and improving our services. These third parties may collect information about your browsing activities across different websites.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">6. Your Consent</h2>
          </CardHeader>
          <CardContent>
            <p>
              By using our platform, you consent to the use of cookies as outlined in this Cookies Policy. If you do not agree to our use of cookies, you can manage your preferences or stop using the platform.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">7. Changes to This Cookies Policy</h2>
          </CardHeader>
          <CardContent>
            <p>
              We may update this Cookies Policy from time to time. Any changes will be posted on this page, and the updated effective date will be noted. Continued use of the platform after any changes to the Cookies Policy constitutes acceptance of those changes.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">8. Contact Us</h2>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions or concerns about this Cookies Policy or how we use cookies, please contact us at <a href="https://github.com/msnabiel/NabSTS" className="text-blue-600">our GitHub repository</a>.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
