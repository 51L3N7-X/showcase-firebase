import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface DeleteDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  burgerId: string | null;
}

export function DeleteDialog({ open, setOpen, burgerId }: DeleteDialogProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await fetch(`/api/burgers/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to delete burger");
      } catch (e) {
        console.error(e);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["burgers"] });
      setOpen(false);
    },
  });

  // Handle delete confirmation
  const handleDelete = () => {
    if (burgerId) {
      deleteMutation.mutate(burgerId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
