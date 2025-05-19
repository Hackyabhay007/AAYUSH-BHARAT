"use client";

import AuthForm from "@/components/AuthForm";
import { Suspense } from "react";



export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm type="reset"/>
    </Suspense>
  );
}

