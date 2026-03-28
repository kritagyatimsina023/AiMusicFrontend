// import Cookies from "js-cookie";
// import api from "../../utils/api";
// // interface AnimationType {
// //   title: string;
// //   link: object; // JSON FILE TYPE
// // }

// interface MusicGenerationData {
//   confidence: number;

//   downloads: {
//     audio: string;
//     midi: string;
//   };

//   emotion: string;

//   playback: {
//     audio: string;
//     midi: string;
//   };

//   session_id: string;

//   status: "completed" | "pending" | string; // optional union

//   steps: string[];
//   version_used: number;
// }

// // function filterAnimation(data: string) {
// //   const filterEmotion = animations.find((item) => item?.title === data);
// //   return filterEmotion?.link;
// // }
// const BASE = "http://localhost:5000";
// export const saveMusicEmotion = async (
//   data: MusicGenerationData,
//   promptId: string,
// ) => {
//   try {
//     const response = await api.post("/outputPrompts", {
//       emotion: data?.emotion,
//       userId: Cookies.get("userId"),
//       promptId: promptId,
//       // emoji: data?.emotion,
//       session_id: data?.session_id,
//       downloads: {
//         audio: BASE + data?.downloads?.audio,
//         midi: BASE + data?.downloads?.midi,
//       },
//       playback: {
//         audio: BASE + data?.playback?.audio,
//         midi: data?.playback?.midi ? BASE + data?.playback?.midi : null,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

import Cookies from "js-cookie";
import api from "../../utils/api";

interface VariantType {
  downloads: {
    audio: string;
    midi: string;
  };
  playback: {
    audio: string;
    midi: string;
  };
  variant_index: number;
}

interface MusicGenerationData {
  confidence?: number;

  downloads: {
    audio: string;
    midi: string;
  };

  emotion: string;

  playback: {
    audio: string;
    midi: string;
  };

  session_id: string;

  status: "completed" | "pending" | string;

  steps?: string[];
  version_used?: string | number;

  variants?: VariantType[];
}

const BASE = "http://localhost:5000";

export const saveMusicEmotion = async (
  data: MusicGenerationData,
  promptId: string,
) => {
  try {
    const response = await api.post("/outputPrompts", {
      emotion: data?.emotion,
      userId: Cookies.get("userId"),
      promptId: promptId,
      session_id: data?.session_id,
      status: data?.status,
      version_used: data?.version_used,

      downloads: {
        audio: data?.downloads?.audio ? BASE + data.downloads.audio : null,
        midi: data?.downloads?.midi ? BASE + data.downloads.midi : null,
      },

      playback: {
        audio: data?.playback?.audio ? BASE + data.playback.audio : null,
        midi: data?.playback?.midi ? BASE + data.playback.midi : null,
      },

      variants:
        data?.variants?.map((variant) => ({
          variant_index: variant.variant_index,
          downloads: {
            audio: variant?.downloads?.audio
              ? BASE + variant.downloads.audio
              : null,
            midi: variant?.downloads?.midi
              ? BASE + variant.downloads.midi
              : null,
          },
          playback: {
            audio: variant?.playback?.audio
              ? BASE + variant.playback.audio
              : null,
            midi: variant?.playback?.midi ? BASE + variant.playback.midi : null,
          },
        })) || [],
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
