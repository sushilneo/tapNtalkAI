// File: src/components/MessageLog.tsx
'use client';

import { useEffect, useState } from 'react';

export default function MessageLog() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch('/api/log');
      const data = await res.json();
      setLogs(data.logs);
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const formatTime = (iso: string) => new Date(iso).toLocaleString();

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">🧾 Message Log</h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Time</th>
            <th className="p-2">Message</th>
            <th className="p-2">Source</th>
            <th className="p-2">Context</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2 text-gray-600">{formatTime(log.timestamp)}</td>
              <td className="p-2 font-medium text-blue-800">{log.message}</td>
              <td className="p-2">{sourceEmoji(log.source)} {capitalize(log.source)}</td>
              <td className="p-2">{contextEmoji(log.context)} {capitalize(log.context)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sourceEmoji(source: string) {
  switch (source) {
    case 'gesture': return '✋';
    case 'typed': return '💬';
    case 'emergency': return '⚠️';
    case 'checkin': return '🧠';
    default: return '';
  }
}

function contextEmoji(context: string) {
  switch (context) {
    case 'classroom': return '🎓';
    case 'nurse': return '🏥';
    case 'home': return '🏠';
    case 'counselor': return '🧠';
    default: return '';
  }
}
