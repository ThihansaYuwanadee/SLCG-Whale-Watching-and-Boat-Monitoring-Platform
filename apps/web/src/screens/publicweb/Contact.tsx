import { Clock3, Mail, MapPin, Phone } from 'lucide-react';

const contactDetails = [
  {
    title: 'Call the office',
    value: '+1 (555) 014-2288',
    description: 'Open daily from 7:00 AM to 8:00 PM',
    icon: Phone,
  },
  {
    title: 'Email us',
    value: 'hello@whalewatchdemo.com',
    description: 'Replies within one business day',
    icon: Mail,
  },
  {
    title: 'Visit the dock',
    value: 'Pier 12, Harbor Point',
    description: 'Free parking available for all guests',
    icon: MapPin,
  },
  {
    title: 'Boarding window',
    value: 'Check-in 30 minutes early',
    description: 'Morning and sunset cruises available',
    icon: Clock3,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-slate-950 px-6 py-24 text-white sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">Contact</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Plan your next ocean escape</h2>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            These sample details are ready for UI testing and can be swapped for real booking information later.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {contactDetails.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-100">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
