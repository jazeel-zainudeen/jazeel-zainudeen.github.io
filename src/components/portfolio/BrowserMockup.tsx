import Image from "next/image";

interface BrowserMockupProps {
  imageSrc: string;
  mobileImageSrc?: string;
  alt: string;
  priority?: boolean;
}

export function BrowserMockup({ imageSrc, mobileImageSrc, alt, priority = false }: BrowserMockupProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 sm:p-8">
      
      <div className="relative flex w-full max-w-4xl flex-col items-center">
        
        {/* Macbook Screen Bezel */}
        <div className="relative z-10 w-[90%] md:w-[85%] rounded-[0.75rem] md:rounded-[1rem] border-[6px] md:border-[8px] border-[#1c1c1e] bg-[#1c1c1e] shadow-xl transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
          
          {/* Camera Dot */}
          <div className="absolute left-1/2 top-[-4px] md:top-[-6px] h-1 w-1 md:h-1.5 md:w-1.5 -translate-x-1/2 rounded-full bg-[#3a3a3c] shadow-inner" />
          
          {/* Screen Display Area (16:10 aspect ratio) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm md:rounded-md bg-background">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-cover object-top"
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
          <div className="relative h-2 md:h-3 w-full rounded-b-xl md:rounded-b-2xl bg-gradient-to-b from-[#e5e5ea] to-[#d1d1d6] shadow-[0_8px_16px_rgba(0,0,0,0.12)]">
            {/* Thumb notch */}
            <div className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-md bg-[#c7c7cc] shadow-inner" />
          </div>
        </div>
        
        {/* Mobile/App Frame (iPhone style) */}
        {mobileImageSrc && (
          <div className="absolute -bottom-2 -right-2 md:-right-6 z-20 w-[24%] md:w-[22%] min-w-[70px] max-w-[120px] rounded-[1rem] border-[3px] md:border-[4px] border-[#1c1c1e] bg-[#1c1c1e] shadow-xl transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-105">
            {/* Dynamic Island / Notch */}
            <div className="absolute left-1/2 top-1 z-30 h-1 md:h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
            
            {/* Mobile Screen Display Area (19.5:9 aspect ratio) */}
            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[0.8rem] bg-background">
              <Image
                src={mobileImageSrc}
                alt={`${alt} mobile view`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 30vw, 20vw"
              />
            </div>
          </div>
        )}
        
      </div>
      
    </div>
  );
}
