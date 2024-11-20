"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Burger } from "@/types/Burger";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { AddOrEditItem } from "@/components/AddItemDialog";
import { DeleteDialog } from "@/components/DeleteDialog";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingBurger, setEditingBurger] = useState<Burger | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [burgerIdToDelete, setBurgerIdToDelete] = useState<string | null>(null);

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
    error,
  } = useQuery({ queryKey: ["burgers"], queryFn: fetchBurgers });

  if (isLoading) return <p>Loading burgers...</p>;
  if (error) return <p>Error loading burgers</p>;

  // Open dialog for adding new item
  const handleAddClick = () => {
    setEditingBurger(null);
    setIsAddOpen(true);
  };

  // Open dialog for editing an existing item
  const handleEditClick = (burger: Burger) => {
    setEditingBurger(burger);
    setIsAddOpen(true);
  };

  // Open delete dialog and set burger to be deleted
  const handleDeleteClick = (burgerId: string) => {
    setBurgerIdToDelete(burgerId);
    setIsDeleteOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Burgers Menu</h1>
      <Button className="mb-4" onClick={handleAddClick}>
        Add Item
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {burgers?.map((burger: Burger) => (
            <TableRow key={burger.id}>
              <TableCell>{burger.id}</TableCell>
              <TableCell>{burger.name}</TableCell>
              <TableCell>{burger.description}</TableCell>
              <TableCell>
                <Image
                  src={burger.imageURL || ""}
                  alt={burger.name}
                  className="w-16 h-16 object-cover rounded-full"
                  width={64}
                  height={64}
                />
              </TableCell>
              <TableCell className="flex items-center justify-center h-16 w-16 gap-2">
                <Pencil
                  size={16}
                  className="cursor-pointer"
                  onClick={() => handleEditClick(burger)}
                />
                <Trash
                  size={16}
                  className="cursor-pointer"
                  onClick={() => handleDeleteClick(String(burger.id))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Add or Edit */}
      <AddOrEditItem
        open={isAddOpen}
        setOpen={setIsAddOpen}
        burgerData={editingBurger}
      />

      {/* Delete confirmation dialog */}
      <DeleteDialog
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        burgerId={burgerIdToDelete}
      />
      <Separator className="mb-2"></Separator>
      <h1 className="text-2xl font-semibold my-4">Ads Images</h1>
      <Button className="mb-4" onClick={() => {}}>
        Add Image
      </Button>
    </div>
  );
}
