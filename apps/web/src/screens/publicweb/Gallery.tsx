const galleryItems = [
  {
    title: 'Sunrise Departure',
    caption: 'Golden light over the open water and a calm morning breeze.',
    accent: 'from-amber-400 via-orange-500 to-rose-500',
    emoji: '🌅',
  },
  {
    title: 'Humpback Family',
    caption: 'A playful pod surfacing near the reef line.',
    accent: 'from-sky-400 via-cyan-500 to-blue-600',
    emoji: '🐋',
  },
  {
    title: 'Evening Cruise',
    caption: 'Warm sunset views and premium deck seating.',
    accent: 'from-fuchsia-500 via-violet-500 to-indigo-600',
    emoji: '🌇',
  },
  {
    title: 'Blue Water Views',
    caption: 'Wide-angle views from the upper observation deck.',
    accent: 'from-emerald-400 via-teal-500 to-cyan-600',
    emoji: '💧',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-900 px-6 py-24 text-white sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">Gallery</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A glimpse of the experience</h2>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Sample gallery cards are in place for testing layouts, spacing, and image placeholders before real media is added.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {galleryItems.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 shadow-xl shadow-slate-950/40">
              <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${item.accent}`}>
                <span className="text-5xl">{item.emoji}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
