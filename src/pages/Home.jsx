import { Link } from "react-router-dom";
import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import "@/App.css";
import { httpClient } from "@/shared/system/http/axios.js";

function Home() {
  const [count, setCount] = useState(0);
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestApi = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await httpClient.get("/api/test/protected");
      setTestResult({
        success: true,
        data: response.data,
      });
    } catch (error) {
      setTestResult({
        success: false,
        error: error.response?.data || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/Home.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Test API Button */}
      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={handleTestApi}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "테스트 중..." : "토큰 검증 API 테스트"}
        </button>

        {testResult && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: testResult.success ? "#d4edda" : "#f8d7da",
              border: `1px solid ${testResult.success ? "#c3e6cb" : "#f5c6cb"}`,
              borderRadius: "4px",
              color: "#000",
            }}
          >
            <h3>{testResult.success ? "✅ 성공" : "❌ 실패"}</h3>
            <pre
              style={{
                textAlign: "left",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {JSON.stringify(
                testResult.success ? testResult.data : testResult.error,
                null,
                2,
              )}
            </pre>
          </div>
        )}
      </div>

      <nav style={{ marginTop: "2rem" }}>
        <Link to="/about" style={{ marginRight: "1rem" }}>
          Go to About
        </Link>
      </nav>
    </>
  );
}

export default Home;
