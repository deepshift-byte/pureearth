import Image from "next/image";
import { img } from "@/content";

export function Pic({ k, sizes = "100vw", priority, className, pos, style }: { k: string; sizes?: string; priority?: boolean; className?: string; pos?: string; style?: React.CSSProperties }) {
  const m = img(k);
  return (
    <div className={`pic ${className ?? ""}`} style={style}>
      <Image src={m.src} width={m.width} height={m.height} alt={m.alt} sizes={sizes} priority={priority} placeholder="blur" blurDataURL={m.blur} style={pos ? { objectPosition: pos } : undefined} />
    </div>
  );
}
