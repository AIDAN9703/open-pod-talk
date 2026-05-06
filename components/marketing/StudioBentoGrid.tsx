import Image from "next/image";

const photos = [
  {
    src: "/open-pod-talk-studio.png",
    alt: "Wide view of the Open Pod Talk studio set and decor",
    objectPosition: "object-center",
    priority: true,
  },
  {
    src: "/studio-bento-wall-art.png",
    alt: "Neon Open Pod Talk speech-bubble sign with microphone on wood wall",
    objectPosition: "object-right",
    priority: false,
  },
  {
    src: "/studio-bento-neon.png",
    alt: "Studio accent wall with posters and signs behind the set",
    objectPosition: "object-center",
    priority: false,
  },
  {
    src: "/studio-bento-conversation.png",
    alt: "Open Pod Talk studio with two leather chairs facing each other for conversation",
    objectPosition: "object-center",
    priority: false,
  },
] as const;

const topicPhotos = [
  {
    src: "/topic-corruption.png",
    alt: "Corruption topic graphic",
  },
  {
    src: "/topic-sports-trash-talk.png",
    alt: "Sports Trash Talk topic sign",
  },
  {
    src: "/topic-mainstream-media.png",
    alt: "Mainstream media topic sign",
  },
  {
    src: "/topic-police-ice.png",
    alt: "Police and ICE topic graphic",
  },
  {
    src: "/topic-left-right-wing.png",
    alt: "Left wing and right wing topic sign",
  },
  {
    src: "/topic-gender-question.png",
    alt: "Gender question topic sign",
  },
] as const;

function BentoCell({
  src,
  alt,
  objectPosition,
  priority,
}: (typeof photos)[number]) {
  return (
    <figure
      className="group relative z-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.04]"
    >
      <div className="relative aspect-square w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 31vw, 380px"
          className={[
            "object-cover transition duration-700 ease-out group-hover:scale-[1.025]",
            objectPosition,
          ].join(" ")}
          priority={priority}
        />
      </div>
    </figure>
  );
}

export function StudioBentoGrid() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#ff6600]/15 blur-3xl lg:-inset-10" />
      <div
        className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6"
      >
        {photos.map((photo) => (
          <BentoCell key={photo.src} {...photo} />
        ))}
      </div>
    </div>
  );
}

export function TopicThumbnailGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-full lg:grid-rows-3 lg:gap-5">
      {topicPhotos.map(({ src, alt }) => (
        <figure
          key={src}
          className="group relative min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_14px_30px_rgba(0,0,0,0.28)] ring-1 ring-white/[0.04]"
        >
          <div className="relative aspect-[4/3] w-full lg:h-full lg:aspect-auto">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 50vw, 210px"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
