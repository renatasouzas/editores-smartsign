import Link from 'next/link';
import React from 'react';

export default function App() {

  return (
    <Link href="/editors">
      <button className="home-btn">Tester Editores</button>
    </Link>
  );
}