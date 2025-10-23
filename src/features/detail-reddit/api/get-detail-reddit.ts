export type RedditPost = {
  id: string;
  subreddit: string;
  subreddit_name_prefixed: string;
  title: string;
  author: string;
  author_fullname?: string;
  selftext?: string;
  ups?: number;
  upvote_ratio?: number;
  num_comments?: number;
  permalink?: string;
  url?: string;
  thumbnail?: string;
  created_utc?: number; // seconds
  is_self?: boolean;
  locked?: boolean;
  distinguished?: string | null;
};

export type DetailRedditResponse = {
  data: {
    after: string;
    before: string;
    dist: number;
    geo_filter: any;
    modhash: string;
    children: {
      data: RedditPost;
      kind: string;
    }[];
  };
  kind: string;
  error?: number;
  message?: string;
  reason?: string;
};

export default async function getDetailReddit(subreddit: string) {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`, {
    cache: "no-store",
  });

  const data: DetailRedditResponse = await response.json();

  return data;
}
