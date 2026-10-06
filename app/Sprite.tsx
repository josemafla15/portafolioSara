export default function Sprite({
  src,
  frames,
  frameW,
  frameH,
  scale = 4,
  fps = 10,
  className = "",
}: {
  src: string;
  frames: number;
  frameW: number;
  frameH: number;
  scale?: number;
  fps?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={
        {
          width: frameW * scale,
          height: frameH * scale,
          backgroundImage: `url("${src}")`,
          backgroundSize: `${frames * 100}% 100%`,
          imageRendering: "pixelated",
          animation: `sprite ${frames / fps}s steps(${frames}) infinite`,
          "--sprite-end": `${(frames / (frames - 1)) * 100}%`,
        } as React.CSSProperties
      }
    />
  );
}