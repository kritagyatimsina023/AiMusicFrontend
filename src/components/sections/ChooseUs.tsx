import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";

const content = [
  {
    title: "Transform Lyrics Into Music",
    description:
      "Write your lyrics and let our AI turn them into rich, polyphonic music that matches the mood you choose. Bring your words to life instantly and explore endless musical possibilities.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/photos/learn.avif"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-lg"
          alt="AI generating music from lyrics"
        />
      </div>
    ),
  },
  {
    title: "Mood-Based Music Generation",
    description:
      "Set the mood and watch your music evolve. Whether it's upbeat, melancholic, or calm, our AI crafts melodies, harmonies, and rhythms that reflect the emotion behind your lyrics.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/photos/liveMusic.avif"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-lg"
          alt="AI generating music based on mood"
        />
      </div>
    ),
  },
  {
    title: "Save and Remix Creations",
    description:
      "Keep all your AI-generated tracks in one place and revisit them anytime. Remix, adjust moods, or refine melodies to continually evolve your music and track your creative growth.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/photos/progress.avif"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-lg"
          alt="Tracking AI music creations"
        />
      </div>
    ),
  },
  {
    title: "Creative Music Challenges",
    description:
      "Participate in fun challenges by writing lyrics or setting moods. Let AI generate unique compositions, share your tracks, and explore different styles to push your creativity further.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/photos/challange.avif"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-lg"
          alt="AI music creative challenge"
        />
      </div>
    ),
  },
];

const ChooseUs = () => {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
};

export default ChooseUs;
