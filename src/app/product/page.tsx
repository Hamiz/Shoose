// src/app/product/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductDetail from "../components/ProductDetail";

function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <ProductDetail id={id} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPage />
    </Suspense>
  );
}
