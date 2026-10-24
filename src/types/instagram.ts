export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type InstagramPost = {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption: string;
  permalink: string;
  timestamp: string;
  mediaType: InstagramMediaType;
  likeCount?: number;
};
