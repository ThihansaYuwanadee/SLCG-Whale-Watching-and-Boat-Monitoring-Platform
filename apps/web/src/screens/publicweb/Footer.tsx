import { Globe, Mail, Phone, Send } from 'lucide-react';

const quickLinks = ['About us', 'Fleet', 'Booking', 'Safety'];
const socialLinks = [
  { label: 'Instagram', icon: Send },
  { label: 'Facebook', icon: Globe },
  { label: 'Email', icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-16 text-slate-300 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">Harbor Breeze</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Luxury whale watching, made simple.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            This footer block is populated with sample content for testing the public landing page layout and navigation.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Quick links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="transition hover:text-amber-500">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-500" />
                +1 (555) 014-2288
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-500" />
                hello@whalewatchdemo.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Harbor Breeze. Demo content for UI testing.</p>
        <div className="flex gap-4">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href="#" className="flex items-center gap-2 transition hover:text-amber-500">
                <Icon size={16} />
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
