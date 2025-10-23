import z from "zod";

export const formAddSubredditSchema = z.object({
  subreddit: z.string().min(2, "subreddit must be at least 2 characters."),
});

export type FormAddSubreddit = z.infer<typeof formAddSubredditSchema>;
