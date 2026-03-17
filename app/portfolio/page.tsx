import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export const metadata: Metadata = generateSEO({
  title: 'Portfolio - Mes Projets & Réalisations',
  description: 'Découvrez mes projets en Finance Digitale, développement web, applications mobiles et automatisation. Sites WordPress, iziCard, DMP et plus.',
  keywords: ['Portfolio', 'Projets Web', 'Applications', 'WordPress', 'Finance', 'Automatisation'],
  canonical: '/portfolio',
});

export default function PortfolioPage() {
  const projects = [
    {
      title: 'Site Vitrine USA - WordPress',
      category: 'Développement Web',
      description: 'Création d\'un site vitrine professionnel pour le marché américain avec WordPress et Elementor. Optimisation SEO internationale, multi-langues et intégration payment gateway.',
      image: 'https://sspark.genspark.ai/cfimages?u1=00F59DItlOMe0RQMwuNTgTigPO8mP2vaduLjz9FJ7mC8QDubIat05B50rrCQxml4TBGxQqayKuuH%2FN8Xq6llv326uslj%2FfQlUCuwdJjsc96nEGuWnu6UVQyjt8ELWXo5%2F2jWCz7Gifkg%2F%2Fgld7v9wqxEL%2FrBhhaDPQ%3D%3D&u2=fZ9E291TLFI97lDs&width=2560',
      tags: ['WordPress', 'Elementor', 'SEO', 'E-commerce'],
      link: '#',
      status: 'Complété'
    },
    {
      title: 'iziCard - Carte de Visite Digitale',
      category: 'Application Web',
      description: 'Plateforme de création de cartes de visite numériques avec QR code, partage instantané et analytics. Interface admin complète pour gestion des utilisateurs.',
      image: 'https://sspark.genspark.ai/cfimages?u1=9zDJOzZmExJWkwCVH1qHfHfHaZDeegdMBDkb57SzbOyrax5U0gOgtDwP8V7Fo0PXwYH6keZ70C6SKAPBUE%2FQxj%2BLHMXjadhC5HdjtSeocmXxGIn%2BLgTDxf2x1nIaxpDQ%2FLGjeKY%2B2%2BZ03GU4ZgIVQVjzsdSxOBUPXOMw%3D%3D&u2=THDCzM4LTZIz8bMP&width=2560',
      tags: ['Next.js', 'TypeScript', 'QR Code', 'SaaS'],
      link: '#',
      status: 'Complété'
    },
    {
      title: 'DMP - Data Management Platform',
      category: 'Finance & Data',
      description: 'Plateforme de gestion de données financières en cours de développement. Collecte, analyse et visualisation de données de marché en temps réel.',
      image: 'https://sspark.genspark.ai/cfimages?u1=6cn%2F5Att5dHEgS71M9w%2BAHh9cic%2FVEYpxZN9TUY7CEBc6MEW0QBZqArKKzLLRyC6Nc0SkMWRwlREgR3Hte3hPPxD7co2gK8igVl%2BUCUAZVQVt2S2ePM76h1l%2B4g15KRwOinGpiFr%2F%2BJoafCqh6b%2BLOspWon7tEltJM51c%2Bth3wxFSFs2ChUZTdMcGEH5wUR79QpcyWYrLQ%3D%3D&u2=uFeBf8PxaAgVyLA4&width=2560',
      tags: ['Python', 'React', 'PostgreSQL', 'Analytics'],
      link: '#',
      status: 'En cours'
    },
    {
      title: 'Application Mobile Android',
      category: 'Mobile',
      description: 'Application mobile native Android pour la gestion de finances personnelles avec synchronisation cloud et notifications intelligentes.',
      image: 'https://sspark.genspark.ai/cfimages?u1=sokljToTPZGpVPiqa8fEiX7%2BZKTSjikFLKf9fOdV%2FU4zwkHSsw5QBsmFZETsRmaQh%2BRN1y0km6iV%2FG20dxfO3mxsQhc3ZgqgBtOTz259iMlzOBB7P%2Fc%2FZyTlI%2B93fuNlB25%2FAdieyoI%2B5F5EazInWI9FlDGfURiEVw%3D%3D&u2=Zpv2lW5y5rygpiKm&width=2560',
      tags: ['Android', 'Kotlin', 'Firebase', 'Material Design'],
      link: '#',
      status: 'Complété'
    },
    {
      title: 'Système d\'Automatisation Lead Gen',
      category: 'Automatisation',
      description: 'Système intelligent de génération de leads avec scraping web, qualification automatique et envoi d\'emails personnalisés. Dashboard analytics complet.',
      image: 'https://sspark.genspark.ai/cfimages?u1=jzLLOeox3V5vNaaU7%2FvUXzbNyVJBizifZ3UVoULmxh%2Fp2%2FAUKE6lEGklVi5KVh%2BjUiH5fMigd84v0S7nSRe%2BqJhsWcfTG40G62AnRVjeY997VgilwYA4dvs2to25nrwSZO2AELdCvKXdXB1%2FvfZi8C5fx99M7qcX2Q%3D%3D&u2=9KI4m4yOKFB9zn3w&width=2560',
      tags: ['Python', 'Scrapy', 'AI', 'Automation'],
      link: '#',
      status: 'Actif'
    },
    {
      title: 'Blog Auto-Publishing System',
      category: 'Content Marketing',
      description: 'Système de publication automatique d\'articles de blog basé sur les tendances du moment. Scraping, rédaction IA et publication multi-plateformes.',
      image: 'https://sspark.genspark.ai/cfimages?u1=ve9Z8NGv4Sl1k5VHTgxWNwL%2BRGzgMpgGsCDQHeoLmZP5%2BHB98LvAl5Lbtl5TsB5AWOqQXSCvs5heFdoULuetn3UtIWIQbuvlsG7pCf2v0k0fJzMvKWHD%2BnnfwnCHjnkFa%2BY2Liu0zPPweL36msCxQ5RcXI7fPDrU6g%3D%3D&u2=uaVT0lMvtaHP6G6%2B&width=2560',
      tags: ['Node.js', 'OpenAI', 'SEO', 'Marketing'],
      link: '#',
      status: 'Actif'
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Mon Portfolio</h1>
            <div className="w-24 h-1 bg-blue-900 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez mes réalisations en Finance Digitale, développement web, applications mobiles et automatisation.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">15+</div>
              <div className="text-gray-600">Projets Complétés</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">10+</div>
              <div className="text-gray-600">Clients Satisfaits</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">3</div>
              <div className="text-gray-600">Projets Actifs</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">100%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Complété' ? 'bg-green-500 text-white' :
                      project.status === 'En cours' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="text-sm text-blue-900 font-semibold mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-900 px-2 py-1 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a 
                      href={project.link} 
                      className="flex items-center gap-2 text-blue-900 hover:text-blue-700 font-medium text-sm"
                    >
                      <FaExternalLinkAlt /> Voir le projet
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Vous avez un projet ?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discutons de vos besoins en Finance Digitale, développement web ou automatisation.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Me Contacter
            </a>
          </div>
        </div>
      </main>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Portfolio - Samuel POODA",
            "description": "Projets et réalisations en Finance Digitale et Transformation Digitale",
            "url": "https://poodasamuel.com/portfolio"
          })
        }}
      />
    </>
  );
}
