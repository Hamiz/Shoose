// src/app/product/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import ProductDetail from "..//components/ProductDetail";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <ProductDetail id={id} />;
}
