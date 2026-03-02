"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DebugSession() {
  const { data: session, status } = useSession();
  const [apiTest, setApiTest] = useState<any>(null);

  useEffect(() => {
    // Test the API
    fetch("/api/chats", { credentials: "include" })
      .then(async (res) => {
        const data = await res.json();
        setApiTest({ status: res.status, data });
      })
      .catch((err) => {
        setApiTest({ error: err.message });
      });
  }, []);

  return (
    <div className="p-8 bg-[#0a0a0a] text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Session Debug</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Status: {status}</h2>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Session Data:</h2>
        <pre className="bg-gray-900 p-4 rounded overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">API Test (/api/chats):</h2>
        <pre className="bg-gray-900 p-4 rounded overflow-auto">
          {JSON.stringify(apiTest, null, 2)}
        </pre>
      </div>
    </div>
  );
}
