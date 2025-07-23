// app/features/page.tsx

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Gestion des leads',
    description: 'Ajoutez, modifiez et suivez vos prospects dans un pipeline clair.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: 'Gestion des contacts',
    description: 'Centralisez toutes les informations de vos clients et prospects.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: 'Suivi des entreprises',
    description: 'Associez plusieurs contacts à une même entreprise facilement.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: 'Rappels & calendrier',
    description: 'Créez des rappels liés à vos leads, et affichez-les dans un calendrier interactif.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: 'Statistiques en temps réel',
    description: 'Visualisez vos performances et suivez l’évolution de vos ventes.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: 'Sécurité et rôles',
    description: 'Gérez les autorisations selon les rôles : admin, sales, viewer.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: 'Export de données',
    description: 'Exportez vos leads et contacts en formats CSV ou Excel.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: 'Notifications par e-mail',
    description: 'Recevez automatiquement des rappels dans votre boîte mail.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-base text-[#0A1F44] font-semibold tracking-wide uppercase">
          Fonctionnalités
        </h2>
        <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Tout ce dont vous avez besoin pour gérer vos relations client
        </p>
        <p className="mt-4 text-lg text-gray-600">
          Notre CRM simple, intuitif et puissant vous aide à suivre, gérer et développer votre activité.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            {feature.icon}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/signup"
          className="inline-block bg-[#0A1F44] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Commencer maintenant
        </Link>
      </div>
    </div>
  );
}
