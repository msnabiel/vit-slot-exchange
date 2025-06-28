"use client";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ClipboardCopy, XCircle, Download, Upload, ArrowUpCircle, ArrowDownCircle } from "lucide-react"; // Add ArrowUpCircle and ArrowDownCircle icons

const Clipboard = () => {
  const [text, setText] = useState("");
  const [clips, setClips] = useState<{ code: string; content: string; time: string }[]>([]);
  const [inputCode, setInputCode] = useState<string>(""); // Input field for code retrieval
  const [retrievedText, setRetrievedText] = useState<string | null>(null); // Display the retrieved text
  const { toast } = useToast();
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // Ref for text area
  const inputSectionRef = useRef<HTMLDivElement>(null); // Ref for the section where text is entered

  const generateCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Text copied to clipboard."
      });
    });
  };

  const handleSave = () => {
    if (!text.trim()) return;
    const timestamp = new Date().toLocaleString();
    const code = generateCode();
    setClips([{ code, content: text, time: timestamp }, ...clips]);
    setText("");
    toast({
      title: "Saved!",
      description: `Clip saved with code: ${code}`
    });
  };

  const handleClearText = () => {
    setText(""); // Clears the text area
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "clipboard.txt";
    link.click();
  };

  const handleRetrieve = () => {
    const clip = clips.find((clip) => clip.code === inputCode);
    if (clip) {
      setRetrievedText(clip.content);
    } else {
      setRetrievedText(null);
      toast({
        title: "Error",
        description: "Invalid code. Please try again."
      });
    }
  };

  // Auto-scroll to the top section when new clip is retrieved
  useEffect(() => {
    if (retrievedText) {
      setText(retrievedText); // Set the retrieved text into the text area
      window.scrollTo(0, 0); // Scroll to the very top of the page
    }
  }, [retrievedText]);

  // Scroll to top of the text area
  const scrollToTop = () => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = 0;
    }
  };

  // Scroll to bottom of the text area
  const scrollToBottom = () => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <div className="pt-8 px-4 md:px-8 max-w-3xl mx-auto space-y-8">
          {/* Clipboard Input Area */}
          <div ref={inputSectionRef}>
            <Card className="p-6 space-y-4 relative">
              <Textarea
                ref={textAreaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="min-h-[450px] pr-10" // Increased height for better text input and added right padding for icons
              />
              {/* Scroll Buttons positioned near the scrollbar */}
              <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex flex-col gap-2">
                <Button
                  onClick={scrollToTop}
                  className="bg-blue-800 hover:bg-blue-900 text-white p-1 rounded-full"
                >
                  <ArrowUpCircle className="h-6 w-6" />
                </Button>
                <Button
                  onClick={scrollToBottom}
                  className="bg-blue-800 hover:bg-blue-900 text-white p-1 rounded-full"
                >
                  <ArrowDownCircle className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex gap-3 flex-wrap mt-4">
                <Button onClick={handleCopy} className="bg-sky-800 hover:bg-sky-900 text-white">
                  <ClipboardCopy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={handleSave} className="bg-emerald-800 hover:bg-emerald-900 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button onClick={handleClearText} className="bg-red-800 hover:bg-red-900 text-white">
                  <XCircle className="h-4 w-4 mr-2" />
                  Clear Text
                </Button>
                <Button onClick={handleDownload} className="bg-gray-800 hover:bg-gray-900 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          </div>

          {/* Code Retrieval Section */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-3">Retrieve Saved Clip by Code</h2>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Enter 4-digit code"
                  className="border px-3 py-2 text-base rounded-md h-10"
                  maxLength={4}
                />
                <Button onClick={handleRetrieve} variant="outline" className="h-10">
                  Retrieve
                </Button>
              </div>
            </div>
          </Card>
        </div> 
        {/* Toast Notifications */}
        <Toaster />

      {/* Footer spans full width */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Clipboard;