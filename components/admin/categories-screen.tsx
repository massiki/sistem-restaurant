"use client";

import { Tags } from "lucide-react";
import { categories, products } from "@/lib/mock-data";

export function CategoriesScreen() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl font-extrabold">Kategori</h1>
        <p className="text-sm text-muted-foreground">
          Kelompokkan menu agar mudah dijelajahi tamu.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.categoryId === c.id).length;
          return (
            <li
              key={c.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Tags className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-heading font-bold">{c.name}</p>
                <p className="tnum text-xs text-muted-foreground">
                  {count} produk
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
