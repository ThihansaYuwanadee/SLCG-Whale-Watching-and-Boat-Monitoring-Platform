import { Icon } from '../../components/ui/icon';

export default function About() {
  return (
    <div className="bg-slate-950 py-24 sm:py-32 text-white border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-amber-500 tracking-wide uppercase">
            Our Standard
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            More than a tour. A commitment to the ocean.
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Operating the most advanced fleet in the region, we combine luxury hospitality with live telemetry to ensure a safe, breathtaking, and eco-friendly experience.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            
            {/* Feature 1 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-white">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 border border-slate-700">
                  <Icon name="search" size={20} className="text-amber-500" />
                </div>
                Expert Navigation
              </dt>
              <dd className="mt-2 text-base leading-7 text-slate-400">
                Our captains use state-of-the-art GPS and live sanctuary data to locate marine life without disrupting natural habitats.
              </dd>
            </div>

            {/* Feature 2 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-white">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 border border-slate-700">
                  <Icon name="vessel" size={20} className="text-amber-500" />
                </div>
                Premium Vessels
              </dt>
              <dd className="mt-2 text-base leading-7 text-slate-400">
                Experience the ocean in unparalleled comfort. Our modern fleet offers smooth rides, panoramic viewing decks, and luxury amenities.
              </dd>
            </div>

            {/* Feature 3 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-white">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 border border-slate-700">
                  <Icon name="confirm" size={20} className="text-amber-500" /> 
                </div>
                Conservation First
              </dt>
              <dd className="mt-2 text-base leading-7 text-slate-400">
                We partner with local marine biologists, ensuring every voyage contributes to active ocean preservation and data collection.
              </dd>
            </div>
            
          </dl>
        </div>
      </div>
    </div>
  );
}