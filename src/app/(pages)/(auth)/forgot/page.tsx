"use client";

import AuthForm from "@/components/AuthForm";
import { Suspense } from "react";


export default function page() {
  return (
    <Suspense  fallback={<div>Loading...</div>}>

    <div className="pb-20 pt-8 bg-beige">
      <AuthForm type="forgot"/>
    </div>
    </Suspense>
  );
}
