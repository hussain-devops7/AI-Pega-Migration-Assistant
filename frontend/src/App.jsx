import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://100.29.184.59:8000/upload";

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const analyzeMigration = async () => {
    if (!file) {
      alert("Please select an inventory CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please check backend API and CSV file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI-Powered Pega Migration Assistant</h1>
      <p className="subtitle">Hackathon POC for AI-based Pega migration assessment</p>

      <div className="card">
        <h2>Upload Pega Inventory</h2>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        {file && <p>Selected file: <b>{file.name}</b></p>}
        <button onClick={analyzeMigration} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Migration"}
        </button>
      </div>

      {result && (
        <div className="card">
          <h2>Migration Dashboard</h2>
          <div className="grid">
            <div className="metric">
              <h3>Application</h3>
              <p>{result.application}</p>
            </div>
            <div className="metric">
              <h3>Total Components</h3>
              <p>{result.total_components}</p>
            </div>
            <div className="metric">
              <h3>Risk Score</h3>
              <p>{result.risk_score}</p>
            </div>
            <div className="metric">
              <h3>Estimated Cost</h3>
              <p>{result.estimated_cost}</p>
            </div>
            <div className="metric">
              <h3>Estimated Duration</h3>
              <p>{result.estimated_duration}</p>
            </div>
            <div className="metric">
              <h3>Target Platform</h3>
              <p>{result.target_platform}</p>
            </div>
          </div>

          <div className="recommendation">
            <h3>AI Recommendation</h3>
            <p>{result.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
