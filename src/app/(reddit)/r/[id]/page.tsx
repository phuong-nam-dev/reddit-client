import getDetailReddit from "@/features/detail-reddit/api/get-detail-reddit";
import RedditCard from "@/features/detail-reddit/template/reddit-card";
import React, { Suspense } from "react";

const DetailReddit = async ({ subreddit }: { subreddit: string }) => {
  const data = await getDetailReddit(subreddit);

  if (!data?.data?.children?.length)
    return <div>Not found content for subreddit</div>;

  return (
    <div className="size-full flex items-center flex-col py-4 gap-2">
      {data.data.children.map((item) => (
        <RedditCard key={item.data.id} post={item.data} />
      ))}
    </div>
  );
};

const DetailRedditPage = async (props: PageProps<"/r/[id]">) => {
  const subreddit = (await props.params).id;

  return (
    <Suspense fallback={<div>Loading detail reddit...</div>}>
      <DetailReddit subreddit={subreddit as string} />
    </Suspense>
  );
};

export default DetailRedditPage;
