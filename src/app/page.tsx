"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import FormAddSubreddit from "./_components/form-add-subreddit";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="size-full flex items-center justify-center min-h-screen">
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogTrigger className="border border-solid border-black rounded-full p-2 cursor-pointer">
          <Plus />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter the name of subreddit</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <FormAddSubreddit onClose={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
