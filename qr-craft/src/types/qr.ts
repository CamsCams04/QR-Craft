export type DotType =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy"
  | "classy-rounded";

export type CornerType =
  | "dot"
  | "square"
  | "extra-rounded"
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded";

export type QrStyleOptions = {
  dotsOptions?: {
    type?: DotType;
  };
  cornersSquareOptions?: {
    type?: CornerType;
  };
  imageSize?: number;
  margin?: number;
};
