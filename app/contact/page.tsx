import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-center">Contact Us</h1>
        <p className="text-center text-gray-600">
          We&apos;d love to hear from you. Please fill out the form below or reach us via email.
        </p>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block font-medium">Message</label>
                <textarea
                  rows={5}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-gray-600 text-sm">
          Or email us directly at{" "}
          <a href="mailto:msyednabiel@gmail.com" className="text-blue-600 hover:underline">
            msyednabiel@gmail.com
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
