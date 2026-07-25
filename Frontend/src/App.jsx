import { useEffect, useState } from "react";

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch(() =>
        setResponse({
          success: false,
          message: "Cannot connect to backend",
        })
      );
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "700px",
          padding: "40px",
          borderRadius: "15px",
          background: "#1e293b",
          textAlign: "center",
        }}
      >
        <h1>🐳 Docker Compose Demo</h1>

        <p>Testing React ↔ Express Connection</p>

        <hr />

        {response ? (
          <>
            <h2>
              {response.success
                ? "✅ Backend Connected"
                : "❌ Connection Failed"}
            </h2>

            <p>
              <strong>Message:</strong> {response.message}
            </p>

            {response.framework && (
              <p>
                <strong>Framework:</strong> {response.framework}
              </p>
            )}

            {response.time && (
              <p>
                <strong>Server Time:</strong> {response.time}
              </p>
            )}
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default App;