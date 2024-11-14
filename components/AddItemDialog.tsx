import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Burger } from "@/types/Burger";
import { genUploader } from "uploadthing/client";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";

// @ts-expect-error TODO
export const { uploadFiles } = genUploader<unknown>();

export function AddOrEditItem({
  open,
  setOpen,
  burgerData,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  burgerData?: Burger | null; // Optional data prop for edit mode
}) {
  //   const [uploading, setUploading] = useState(false); // Track upload state
  const [imageURL, setImageURL] = useState<string | null>(null); // Store uploaded image URL
  const form = useForm<Burger>({
    defaultValues: {
      name: burgerData?.name || "",
      description: burgerData?.description || "",
    },
  });

  const { handleSubmit, reset } = form;
  const queryClient = useQueryClient();

  const { data: session } = useSession();

  // Reset form when dialog opens/closes or burgerData changes
  useEffect(() => {
    if (burgerData) {
      reset(burgerData);
      setImageURL(burgerData.imageURL);
    } else {
      reset({ name: "", description: "" });
      setImageURL("");
    }
  }, [burgerData, reset]);

  // Mutation function (either POST or PUT based on burgerData presence)
  const mutation = useMutation({
    mutationFn: async (data: Burger) => {
      try {
        const response = await fetch(
          `/api/burgers${burgerData?.id ? `/${burgerData.id}` : ""}`,
          {
            method: burgerData?.id ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify(data),
          }
        );
        const burger = await response.json();
        return burger;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["burgers"] });
      setOpen(false);
    },
  });

  // Submit handler that either updates or creates based on burgerData
  function onSubmit(data: Burger) {
    mutation.mutate({ ...data, imageURL: imageURL as string });
  }

  //   async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       setUploading(true);
  //       try {
  //         const [uploadedFile] = await uploadFiles("burgerImage", {
  //           files: [file],
  //         });
  //         console.log(uploadedFile);
  //         setImageURL(uploadedFile.url); // Save URL in component state
  //         setValue("imageURL", uploadedFile.url); // Update form data with image URL
  //       } catch (error) {
  //         console.error("Upload failed:", error);
  //       } finally {
  //         setUploading(false);
  //       }
  //     }
  //   }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{burgerData ? "Edit Item" : "Add Item"}</DialogTitle>
          <DialogDescription>
            {burgerData
              ? "Edit item details below."
              : "Create a new item here. Click add when done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // console.log("Files: ", res);
                    setImageURL(res[0].url);
                    // alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </FormControl>
              <FormDescription>Upload an image of the item.</FormDescription>
              {imageURL && (
                <Image
                  src={imageURL}
                  alt="Uploaded preview"
                  className="mt-2"
                  width={128}
                  height={128}
                />
              )}
            </FormItem>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Cheese Burger" {...field} />
                  </FormControl>
                  <FormDescription>Item Name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Lorem Ipsum..." {...field} />
                  </FormControl>
                  <FormDescription>Item Description.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            {burgerData ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
