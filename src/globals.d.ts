export as namespace api;

export interface Item {
  name: string,
  description: string,
  id: string,
  media: MediaItem[]
}

export interface MediaItem {
  name: string,
  filename: string,
  type: number
}