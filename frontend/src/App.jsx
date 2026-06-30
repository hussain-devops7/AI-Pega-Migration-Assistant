import { useState } from "react";
import "./App.css";

function App() {
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
  };

  const analyzeMigration = () => {
    setResult({
      status: "Completed",
      riskScore: "Medium",
      estimatedCost: "₹25,000/month",
      targetArchitecture: "React + FastAPI + Docker Compose + Bedrock/Mock AI",
      recommendation: "AI recommends starting with a Docker Compose POC and later moving to AWS serverless or EKS."
    });
  };

  return (
    <div className="container">
      <h1>AI-Powered Pega Migration Assistant</h1>
      <p className="subtitle">Hackathon POC for AI-based Pega migration assessment</p>

      <div className="card">
        <h2>Upload Pega Inventory</h2>
        <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} />
        {fileName && <p>Selected file: <b>{fileName}</b></p>}
        <button onClick={analyzeMigration}>Analyze Migration</button>
      </div>

      {result && (
        <div className="card">
          <h2>Migration Dashboard</h2>
          <p><b>Status:</b> {result.status}</p>
          <p><b>Risk Score:</b> {result.riskScore}</p>
          <p><b>Estimated Cost:</b> {result.estimatedCost}</p>
          <p><b>Target Architecture:</b> {result.targetArchitecture}</p>
          <p><b>AI Recommendation:</b> {result.recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
