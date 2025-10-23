import getDetailReddit from "@/features/detail-reddit/api/get-detail-reddit";
import { formAddSubredditSchema } from "@/schema/schema";

export async function submitFormAddSubreddit(formData: FormData) {
  const subreddit = formData.get("subreddit") as string;

  const parsed = formAddSubredditSchema.safeParse({
    subreddit,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.message || "Fail to create subreddit",
    };
  }

  const data = await getDetailReddit(subreddit);

  console.log("data", data);

  if (data?.error === 404) {
    return {
      success: false,
      error: "Do not found content for subreddit",
    };
  }

  if (!data?.data?.children?.length) {
    return {
      success: true,
      message: "Content for subreddit is empty",
    };
  }

  return { success: true, message: "Create subreddit successfully" };
}
