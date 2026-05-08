export type LayerInfo = {
  number: number;
  name: string;
  shortDescription: string;
};

export const OSI_LAYERS:
  LayerInfo[] = [

  {
    number: 1,

    name: "Physical",

    shortDescription:
      "Handles electrical, optical and wireless signal transmission across physical communication media.",
  },

  {
    number: 2,

    name: "Data Link",

    shortDescription:
      "Builds frames, performs MAC-based communication and manages local transmission integrity.",
  },

  {
    number: 3,

    name: "Network",

    shortDescription:
      "Controls logical addressing, routing decisions and inter-network packet forwarding.",
  },

  {
    number: 4,

    name: "Transport",

    shortDescription:
      "Ensures reliable end-to-end delivery through segmentation, flow control and retransmission handling.",
  },

  {
    number: 5,

    name: "Session",

    shortDescription:
      "Coordinates communication sessions between distributed applications and maintains synchronization.",
  },

  {
    number: 6,

    name: "Presentation",

    shortDescription:
      "Processes encryption, compression and data format translation before application delivery.",
  },

  {
    number: 7,

    name: "Application",

    shortDescription:
      "Provides the user-facing interface for network services such as HTTP, DNS, SMTP and FTP.",
  },
];

export function getLayerByIndex(
  index: number
): LayerInfo | undefined {

  return OSI_LAYERS[index];
}