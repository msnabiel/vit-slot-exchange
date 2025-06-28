"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function Page() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 py-6 max-w-4xl mx-auto w-full">
        {editor ? (
          <EditorContent editor={editor} className="border p-4" />
        ) : (
          <div>Loading editor...</div>
        )}
      </main>

      <Footer />
    </div>
  )
}
