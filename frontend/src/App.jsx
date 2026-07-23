import { useState } from 'react'
import DotField from './DotField'

function App() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  // NEW: which sidebar section is active
  const [activeTab, setActiveTab] = useState('detection')

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(selectedFile)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error uploading file:", error)
      setResult({ success: false, error: "Failed to connect to server. Is the API running?" })
    } finally {
      setLoading(false)
    }
  }

  const clearSelection = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
  }

  // NEW: sidebar nav items
  const navItems = [
    {
      id: 'prediction',
      label: 'Prediction',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'detection',
      label: 'Detection',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'prevention',
      label: 'Prevention',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-3.04 8.4-7.2 9.618a1.5 1.5 0 01-1.6 0C7.04 20.4 4 16.556 4 12V6.75a1.5 1.5 0 01.9-1.373l6.75-2.7a1.5 1.5 0 011.1 0l6.75 2.7a1.5 1.5 0 01.9 1.373V12z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-[#09090b] flex text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="#A855F7"
          gradientTo="#B497CF"
          glowColor="#120F17"
        />
      </div>

      {/* NEW: Sidebar */}
      <aside className="relative z-10 w-60 shrink-0 bg-[#18181b]/80 backdrop-blur-xl border-r border-white/10 flex flex-col p-4">
        <div className="px-2 py-4 mb-4">
          <h2 className="text-lg font-semibold">Wildfire AI</h2>
          <p className="text-xs text-gray-400 mt-1">Choose a function</p>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                activeTab === item.id
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        {activeTab === 'detection' && (
          <>
            <div className="max-w-md w-full bg-[#18181b]/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              <div className="p-8">
                <h1 className="text-2xl font-semibold text-center mb-2">Wildfire Detection</h1>
                <p className="text-sm text-gray-400 text-center mb-8">Upload an aerial image for analysis</p>

                {!preview ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-white/20 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-white/40 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-300"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-400">PNG, JPG or JPEG (MAX. 5MB)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                  </label>
                ) : (
                  <div className="space-y-6">
                    <div className="relative rounded-xl overflow-hidden shadow-sm border border-white/20 group">
                      <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
                      <button
                        onClick={clearSelection}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                        title="Remove image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>

                    {result && (
                      <div className={`p-4 rounded-xl text-center shadow-sm ${result.success ? (result.fire_detected ? 'bg-red-500/20 text-red-200 border border-red-500/30' : 'bg-green-500/20 text-green-200 border border-green-500/30') : 'bg-gray-800 text-gray-200 border border-gray-700'}`}>
                        {result.success ? (
                          <>
                            <div className="text-lg font-bold mb-1">
                              {result.fire_detected ? '🔥 WILDFIRE DETECTED' : '🌳 CLEAR / NO FIRE'}
                            </div>
                            <div className="text-sm opacity-90">
                              Confidence: {(result.confidence * 100).toFixed(1)}%
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-red-400 font-medium">{result.error}</div>
                        )}
                      </div>
                    )}

                    {!result && (
                      <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-600/50 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all flex justify-center items-center"
                      >
                        {loading ? (
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : "Analyze Image"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-8 text-sm text-gray-400/80">Powered by AI Wildfire Detection Model</p>
          </>
        )}

        {/* NEW: Prediction placeholder panel */}
        {activeTab === 'prediction' && (
          <div className="max-w-md w-full bg-[#18181b]/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-8 text-center">
            <h1 className="text-2xl font-semibold mb-2">Wildfire Prediction</h1>
            <p className="text-sm text-gray-400 mb-6">
              Forecast wildfire risk using weather, terrain, and historical data.
            </p>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm">
              Prediction module coming soon. Hook this panel up to your forecasting model/API.
            </div>
          </div>
        )}

        {/* NEW: Prevention placeholder panel */}
        {activeTab === 'prevention' && (
          <div className="max-w-md w-full bg-[#18181b]/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-8 text-center">
            <h1 className="text-2xl font-semibold mb-2">Wildfire Prevention</h1>
            <p className="text-sm text-gray-400 mb-6">
              Guidance, alerts, and recommended actions to reduce wildfire risk.
            </p>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm">
              Prevention module coming soon. Hook this panel up to your alerts/recommendations API.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App