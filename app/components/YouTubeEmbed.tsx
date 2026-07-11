import { extractYouTubeId } from "~/utils/youtube";

type YouTubeEmbedProps = {
  url: string;
};

export function YouTubeEmbed({ url }: YouTubeEmbedProps) {
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    return null;
  }

  return (
    <div className="aspect-video w-full overflow-hidden border border-[#e5e5e5]">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
