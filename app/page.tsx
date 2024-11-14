"use client";

import SwiperComponent from "@/components/swiper/Swiper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Burger } from "@/types/Burger";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  async function fetchBurgers(): Promise<Burger[]> {
    const response = await fetch(`${window.location.origin}/api/burgers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch burgers");
    return response.json();
  }

  const {
    data: burgers,
    isLoading,
    // error,
  } = useQuery({ queryKey: ["burgers"], queryFn: fetchBurgers });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-hidden">
      <SwiperComponent></SwiperComponent>
      <h1 className="text-center text-9xl font-bold my-[120px] tracking-tighter">
        ITEMS
      </h1>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Burgers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {burgers!.map((burger, index) => (
            <Link href={`/burger/${burger.id}`} key={index}>
              <CardComponent
                name={burger.name}
                imageUrl={burger.imageURL}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProfileCardProps {
  name: string;
  imageUrl: string;
  altText?: string;
}

function CardComponent({
  name,
  imageUrl,
  altText = "Burger picture",
}: ProfileCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="flex items-center justify-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // width={512}
            // height={512}
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-center text-2xl font-bold">{name}</CardTitle>
      </CardContent>
    </Card>
  );
}
