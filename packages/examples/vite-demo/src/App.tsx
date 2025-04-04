import { useState } from "react"
import { PDFViewer } from "@react-pdf/renderer"
import TailwindPDFExample from "./components/TailwindPDFExample"
import "./App.css"

function App() {
  const [showPDF, setShowPDF] = useState(false)

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        <header className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            tw-pdf Example
          </h1>
          <p className='text-gray-600'>
            A demonstration of using Tailwind CSS with react-pdf
          </p>
        </header>

        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <h2 className='text-xl font-semibold mb-4'>About this Example</h2>
          <p className='mb-4'>
            This example demonstrates how to use the tw-pdf library to create
            PDF documents with Tailwind CSS classes. The library allows you to
            use Tailwind classes directly in your react-pdf components through a{" "}
            <code>className</code> prop, just like you would in a regular React
            application.
          </p>
          <button
            onClick={() => setShowPDF(!showPDF)}
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors'
          >
            {showPDF ? "Hide PDF Example" : "Show PDF Example"}
          </button>
        </div>

        {showPDF && (
          <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
            <h2 className='text-xl font-semibold mb-4'>PDF Preview</h2>
            <div className='border border-gray-300 rounded-lg overflow-hidden'>
              <PDFViewer width='100%' height={600} className='border-0'>
                <TailwindPDFExample />
              </PDFViewer>
            </div>
          </div>
        )}

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-semibold mb-4'>How it Works</h2>
          <ol className='list-decimal pl-5 space-y-2'>
            <li>
              Import components from <code>tw-pdf</code>
            </li>
            <li>
              Use Tailwind classes with the <code>className</code> prop
            </li>
            <li>The library uses pre-processed Tailwind styles</li>
            <li>The styles are applied to your PDF components</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App
