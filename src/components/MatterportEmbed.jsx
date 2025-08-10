import React from "react";

export default function MatterportEmbed({
  // your URL (kept as default)
  src = "https://my.matterport.com/show/?m=jm5WwEA3HUN&log=0&help=0&nt=0&play=1&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1",
  title = "Matterport 3D Tour",
  mode = "ratio", // "ratio" | "fill"
  ratio = 56.25   // used only when mode="ratio" (16:9)
}) {
  if (mode === "fill") {
    return (
      <div className="relative w-full h-[100vh] overflow-hidden">
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  // default responsive 16:9
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-lg"
      style={{ paddingBottom: `${ratio}%` }}
    >
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
