"use client";

import AuthForm from "@/components/AuthForm";
import PublicRoute from "@/components/PublicRoute";


export default function page() {
  return (
    <PublicRoute>
      <AuthForm type="login"/>
    </PublicRoute>
  );
}
