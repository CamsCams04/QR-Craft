import React from "react";

export default function QrFrame({
  padding = 12,
  size = 240,
  children,
  content,
}: {
  padding?: number;
  size?: number;
  children: React.ReactNode;
  content: React.ReactNode;
}) {
    
  const frameSize = size + padding * 2;
  
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: frameSize, height: frameSize }}
      >

        <div style={{ width: size, height: size }}>
          {children}
        </div>
          <span className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-black rounded-tl-md" />
          <span className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-black rounded-tr-md" />
          <span className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-black rounded-bl-md" />
          <span className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-black rounded-br-md" />
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}
