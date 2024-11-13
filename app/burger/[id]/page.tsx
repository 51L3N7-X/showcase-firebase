"use client";

import { Burger } from "@/types/Burger";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  async function fetchBurger(): Promise<Burger> {
    const response = await fetch(
      `${window.location.origin}/api/burgers/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error("Failed to fetch burgers");
    return response.json();
  }

  const {
    data: burger,
    isLoading,
    error,
  } = useQuery({ queryKey: ["burger"], queryFn: fetchBurger });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex justify-center h-[89vw] items-center mx-auto mt-6 flex-col w-1/2">
      <Image
        src={burger?.imageURL || ""}
        width={512}
        height={512}
        className="rounded-full"
        alt="burger"
      ></Image>
      <h1 className="font-bold text-5xl text-left my-8">{burger?.name}</h1>
      <p className="text-3xl text-left my-6">{burger?.description}</p>
    </div>
  );
}
