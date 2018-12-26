export interface Item {
  name: string,
  description: string,
  id: string,
  media: MediaItem[],
  tags: string[]
}

export interface MediaItem {
  name: string,
  filename: string,
  date: string,
  type: "image" | "audio" | "video"
}
