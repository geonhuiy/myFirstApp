export interface Pic {
  file_id: number;
  user_id: string;
  filename: string;
  filesize: string;
  title: string;
  description: string;
  media_type: string;
  mine_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnail;
}

export interface Thumbnail {
  w160: string;
  w320?: string;
  w640?: string;
}
