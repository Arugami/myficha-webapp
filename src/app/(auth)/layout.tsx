'use client';

import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      {/* Auth-specific layout components can go here */}
      <div className="auth-content">
        {children}
      </div>
    </div>
  );
}
