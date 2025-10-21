"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  ArrowUp,
  MessageSquare,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { RedditPost } from "../api/get-detail-reddit";

function timeAgo(seconds?: number) {
  if (!seconds) return "";
  const ms = seconds * 1000;
  const diff = Date.now() - ms;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  const w = Math.floor(d / 7);
  if (w < 4) return `${w}w`;
  const date = new Date(ms);
  return date.toLocaleDateString();
}

export default function RedditCard({ post }: { post: RedditPost }) {
  const {
    subreddit_name_prefixed,
    title,
    author,
    selftext,
    ups = 0,
    upvote_ratio,
    num_comments = 0,
    permalink,
    thumbnail,
    created_utc,
    is_self,
    locked,
    distinguished,
  } = post;

  const url = permalink
    ? `https://www.reddit.com${permalink}`
    : post.url || "#";

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <div className="flex items-center justify-center bg-slate-100 text-slate-700 uppercase">
            {subreddit_name_prefixed.replace("r/", "").slice(0, 2)}
          </div>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-semibold truncate">
              {title}
            </CardTitle>
            {distinguished && <Badge className="ml-2">{distinguished}</Badge>}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-3 mt-1">
            <span>{subreddit_name_prefixed}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>
              by <strong className="text-slate-700">u/{author}</strong>
            </span>
            <Separator orientation="vertical" className="h-4" />
            <div className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{timeAgo(created_utc)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-sm">
            <ArrowUp className="h-4 w-4" />
            <span className="font-medium">{ups}</span>
          </div>
          <span className="text-xs text-slate-500">
            {upvote_ratio ? `${Math.round(upvote_ratio * 100)}%` : ""}
          </span>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4">
          <div>
            {selftext ? (
              <p className="text-sm text-slate-700 leading-relaxed max-h-40 overflow-hidden">
                {selftext}
              </p>
            ) : (
              <p className="text-sm text-slate-500 italic">(No text content)</p>
            )}
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span>{num_comments} comments</span>
              {locked && <Badge>locked</Badge>}
            </div>
          </div>

          {thumbnail ? (
            <div className="hidden md:block">
              <img
                src={thumbnail}
                alt="thumbnail"
                className="object-cover w-full h-40 rounded-md border"
              />
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center h-40 rounded-md bg-slate-50 border">
              <span className="text-xs text-slate-400">No preview</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 md:flex-auto"
          onClick={() => window.open(url, "_blank")}
        >
          <MessageSquare className="mr-2 h-4 w-4" /> {num_comments} Comments
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigator.clipboard?.writeText(url)}
        >
          <ExternalLink className="mr-2 h-4 w-4" /> Share
        </Button>

        <Tooltip>
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4" />
          </Button>
        </Tooltip>

        <div className="ml-auto text-xs text-slate-500">
          {is_self ? "Self post" : "Link post"}
        </div>
      </CardFooter>
    </Card>
  );
}
