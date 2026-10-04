import Image from "next/image";

interface BrowserMockupProps {
  imageSrc: string;
  alt: string;
  priority?: boolean;
}

export function BrowserMockup({ imageSrc, alt, priority = false }: BrowserMockupProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 sm:p-8">
      
      <div className="relative flex w-full max-w-4xl flex-col items-center">
        
        {/* Macbook Screen Bezel */}
        <div className="relative z-10 w-[90%] md:w-[85%] rounded-[1rem] border-[12px] md:border-[16px] border-[#1c1c1e] bg-[#1c1c1e] shadow-2xl transition-transform duration-700 ease-out group-hover:-translate-y-1">
          
          {/* Camera Dot */}
          <div className="absolute left-1/2 top-[-8px] md:top-[-10px] h-1.5 w-1.5 md:h-2 md:w-2 -translate-x-1/2 rounded-full bg-[#3a3a3c] shadow-inner" />
          
          {/* Screen Display Area (16:10 aspect ratio) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm md:rounded-md bg-background">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          </div>
        </div>

        {/* Macbook Base / Deck */}
        <div className="relative z-0 -mt-1 flex w-full flex-col items-center">
          {/* Top of base (Hinge) */}
          <div className="h-2 md:h-3 w-[94%] md:w-[89%] rounded-t-sm bg-gradient-to-b from-[#8e8e93] to-[#c7c7cc] shadow-inner" />
          
          {/* Main Base */}
          <div className="relative h-2 md:h-3 w-full rounded-b-xl md:rounded-b-2xl bg-gradient-to-b from-[#e5e5ea] to-[#d1d1d6] shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
            {/* Thumb notch */}
            <div className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-md bg-[#c7c7cc] shadow-inner" />
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
