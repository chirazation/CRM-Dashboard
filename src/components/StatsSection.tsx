'use client';

import { useEffect, useRef, useState } from 'react';

const StatItem = ({
  label,
  value,
  color = 'text-[#0a1f44]',
  duration = 2000,
}: {
  label: string;
  value: number;
  color?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let start = 0;
            const increment = value / (duration / 16);

            const step = () => {
              start += increment;
              if (start < value) {
                setCount(Math.floor(start));
                requestAnimationFrame(step);
              } else {
                setCount(value);
              }
            };
            step();
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl shadow-lg p-10 w-full sm:w-[48%] lg:w-[23%] text-center transition hover:bg-[#0a1f44] group cursor-pointer"
    >
      <p
        className={`text-5xl font-extrabold mb-2 transition duration-300 group-hover:text-white ${color}`}
      >
        {count.toLocaleString()}
      </p>
      <p className="uppercase tracking-widest text-gray-600 text-lg group-hover:text-gray-200">
        {label}
      </p>
    </div>
  );
};

export const StatsSection = () => {
  return (
    <section className=" bg-gray-100 py-20 px-4 min-w-full">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center gap-6">
        <StatItem label="Utilisateurs actifs" value={5200} color="text-blue-600" />
        <StatItem label="Taux de disponibilité (%)" value={99} color="text-green-600" />
        <StatItem label="Support 24/7" value={1} color="text-orange-500" />
        <StatItem label="Projets réalisés" value={320} color="text-purple-600" />
      </div>
    </section>
  );
};
