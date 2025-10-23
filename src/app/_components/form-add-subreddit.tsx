"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { submitFormAddSubreddit } from "../action";

const formSchema = z.object({
  subreddit: z.string().min(2, "subreddit must be at least 2 characters."),
});

type FormAddSubredditProps = {
  onClose?: () => void;
};

const FormAddSubreddit = (props: FormAddSubredditProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subreddit: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.set("subreddit", values.subreddit);

    startTransition(async () => {
      try {
        const data = await submitFormAddSubreddit(formData);

        if (data.success) router.push(`/r/${values.subreddit}`);
      } catch {
        console.log("error");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subreddit"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="h-10" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <div className="flex gap-1 items-center justify-center">
              <Spinner className="size-6" />
              <div>Creating...</div>
            </div>
          ) : (
            "Add Subreddit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormAddSubreddit;
