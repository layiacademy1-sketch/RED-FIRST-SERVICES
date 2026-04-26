import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Home, 
  Star, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Mail,
  Building2,
  Briefcase,
  Sparkles
} from 'lucide-react';

// --- Constants ---
const WHATSAPP_NUMBER = "+212779521483";
const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=212779521483&text&type=phone_number&app_absent=0";
const EMAIL_RECIPIENT = "direction@redfirstservices.com";

const SERVICES = [
  {
    id: 'residential',
    title: 'SERVICES RÉSIDENTIELS & CONCIERGERIE',
    description: 'Entretien complet et gestion de votre résidence avec une discrétion absolue et un sens du détail inégalé.',
    icon: Sparkles,
    image: 'https://image.noelshack.com/fichiers/2026/17/4/1776965669-chatgpt-image-23-avr-2026-19-33-30.jpg',
  },
  {
    id: 'offices',
    title: 'NETTOYAGE DE BUREAUX',
    description: 'Solutions d\'entretien pour pro,\ngarantissant un environnement\nsain et impeccable.',
    icon: Building2,
    image: 'https://image.noelshack.com/fichiers/2026/17/4/1776966372-chatgpt-image-23-avr-2026-19-46-01.jpg',
  },
  {
    id: 'construction-apt',
    title: 'NETTOYAGE FIN DE CHANTIER - APPARTEMENTS',
    description: 'Remise en état minutieuse après travaux pour une installation immédiate dans un espace sain.',
    icon: Briefcase,
    image: 'https://image.noelshack.com/fichiers/2026/17/4/1776965970-chatgpt-image-23-avr-2026-19-39-16.jpg',
  },
  {
    id: 'construction-villa',
    title: 'NETTOYAGE FIN DE CHANTIER - VILLAS',
    description: 'Prestation premium pour résidences de luxe en fin de construction ou rénovation majeure.',
    icon: Home,
    image: 'https://image.noelshack.com/fichiers/2026/17/7/1777204043-chatgpt-image-26-avr-2026-13-46-31.jpg',
  }
];

const SERVICE_DETAILS_DATA: Record<string, any> = {
  'residential': {
    title: 'L\'Excellence Résidentielle',
    tagline: 'Service de conciergerie et nettoyage résidentiel redéfinissant l\'art de vivre.',
    description: 'Chaque intervention est pensée comme une expérience de luxe, où la discrétion de nos équipes rencontre une rigueur française sans compromis.',
    strongText: 'Nous ne nous contentons pas de nettoyer, nous prenons soin de votre patrimoine avec les meilleurs produits et techniques existantes.',
    carousel: [
      'https://image.noelshack.com/fichiers/2026/17/4/1776965669-chatgpt-image-23-avr-2026-19-33-30.jpg',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'
    ],
    pricing: [
      { service: 'Appartements et villas Premium', freq: '3 fois / semaine\n2h par passage', prets: 'Nettoyage complet\nChangement des draps\nLavage de la vaisselle', price: '2000 MAD / mois' },
      { service: 'Airbnb < 80m2 et/ou 2 chambres', freq: 'Selon réservation\n2h par passage', prets: 'Remise en état\nStandard hôtel', price: '350 MAD / 2h' },
      { service: 'Airbnb 80-100m2 et/ou 3 chambres', freq: 'Selon réservation\n2h par passage', prets: 'Remise en état\nStandard hôtel', price: '400 MAD / 2h' },
      { service: 'Airbnb Villa ( moyenne surface )', freq: 'Selon réservation', prets: 'Remise en état complète', price: '500 MAD / 2h' },
      { service: 'Airbnb Villa (grande surface)', freq: 'Selon réservation', prets: 'Remise en état complète', price: '550 MAD / 2h' },
      { service: 'Airbnb Villa > 450m2', freq: 'Sur mesure', prets: 'Service premium', price: 'Sur devis' },
      { service: 'Femme de ménage', freq: 'Du lundi au vendredi 9h-17h\nSamedi 9h-15h', prets: 'Entretien complet\nOrganisation de la maison', price: '4000 MAD / mois' },
      { service: 'Femme de ménage / Cuisinière', freq: 'Du lundi au vendredi 9h-17h\nSamedi 9h-15h', prets: 'Ménage + repas\n(Petit déjeuner, déjeuner, dîner)', price: '5000 MAD / mois' }
    ]
  },
  'offices': {
    title: 'Espaces Professionnels',
    tagline: 'Un environnement de travail impeccable pour la performance de vos équipes.',
    description: 'Nous intervenons avec agilité pour maintenir vos bureaux dans un état de propreté constant. Nos méthodes s\'adaptent au rythme de votre entreprise.',
    strongText: 'La propreté de vos locaux est le premier reflet de votre professionnalisme envers vos clients et partenaires.',
    carousel: [
      'https://image.noelshack.com/fichiers/2026/17/4/1776966372-chatgpt-image-23-avr-2026-19-46-01.jpg',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=800'
    ],
    pricing: [
      { service: '<60m2', freq: 'Du lundi au vendredi', prets: 'Nettoyage complet et renforcé', price: '3 000 MAD / mois' },
      { service: '60-79m2', freq: 'Du lundi au vendredi', prets: 'Nettoyage complet et renforcé', price: '4 000 MAD / mois' },
      { service: '80-99m2', freq: 'Du lundi au vendredi', prets: 'Nettoyage complet et renforcé', price: '4 500 MAD / mois' },
      { service: '100-149m2', freq: 'Du lundi au vendredi', prets: 'Nettoyage complet et renforcé', price: '5 000 MAD / mois' },
      { service: '150-199m2', freq: 'Du lundi au vendredi', prets: 'Nettoyage complet et renforcé', price: '5 500 MAD / mois' },
      { service: '200-250m2', freq: 'Du lundi au vendredi', prets: 'Nettoyage complet et renforcé', price: '6 000 MAD / mois' },
      { service: '>250m2', freq: 'Sur mesure', prets: 'Nettoyage complet et renforcé', price: 'Sur devis' }
    ]
  },
  'construction-apt': {
    title: 'Fin de Chantier Appartements',
    tagline: 'Effacer toute trace de travaux pour une installation dans un espace pur.',
    description: 'Poussière résiduelle, traces de peinture, nettoyage des vitres après pose... Nous redonnons vie à votre intérieur après le passage des artisans.',
    strongText: 'Une remise en état minutieuse qui garantit un emménagement immédiat dans un environnement sain et sans résidus.',
    carousel: [
      'https://image.noelshack.com/fichiers/2026/17/4/1776965970-chatgpt-image-23-avr-2026-19-39-16.jpg',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800'
    ],
    pricing: [
      { service: '<60m2', freq: '', prets: 'Nettoyage complet', price: '1 500 MAD' },
      { service: '60-80m2', freq: '', prets: 'Nettoyage complet', price: '2 000 MAD' },
      { service: '80-100m2', freq: '', prets: 'Nettoyage complet', price: '2 500 MAD' },
      { service: '>100m2', freq: '', prets: 'Sur mesure', price: 'Sur devis' }
    ]
  },
  'construction-villa': {
    title: 'Fin de Chantier Villas',
    tagline: 'Le luxe de la perfection pour vos résidences les plus prestigieuses.',
    description: 'Grands volumes, vitrages monumentaux, matériaux précieux... Nos équipes interviennent avec des équipements spécifiques pour les villas de haut standing.',
    strongText: 'Nous maîtrisons les contraintes des chantiers d\'exception pour vous livrer une villa prête à vivre, parfaitement étincelante.',
    carousel: [
      'https://image.noelshack.com/fichiers/2026/17/7/1777204043-chatgpt-image-26-avr-2026-13-46-31.jpg',
      'https://image.noelshack.com/fichiers/2026/17/7/1777204153-chatgpt-image-26-avr-2026-13-48-20.jpg',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800'
    ],
    pricing: [
      { service: '100-150m2', freq: '', prets: 'Nettoyage complet', price: '4 500 MAD' },
      { service: '150-200m2', freq: '', prets: 'Nettoyage complet', price: '5 500 MAD' },
      { service: '200-250m2', freq: '', prets: 'Nettoyage complet', price: '6 500 MAD' },
      { service: '250-300m2', freq: '', prets: 'Nettoyage complet', price: '7 500 MAD' },
      { service: '300-350m2', freq: '', prets: 'Nettoyage complet', price: '8 500 MAD' },
      { service: '350-400 m2', freq: '', prets: 'Nettoyage complet', price: '9 500 MAD' },
      { service: '> 400 m2', freq: '', prets: 'Nettoyage complet', price: 'Sur devis' }
    ]
  }
};

const REVIEWS = [
  {
    name: 'Karim B.',
    text: 'Un nettoyage de fin de chantier exemplaire pour notre nouvelle villa. Rigueur et professionnalisme impressionnants.',
    rating: 5
  },
  {
    name: 'Sarah M.',
    text: 'Le service de conciergerie résidentielle est parfait. Ma maison est toujours impeccable, avec un souci du détail rare.',
    rating: 5
  },
  {
    name: 'Julien T.',
    text: 'Nous confions l\'entretien de nos bureaux à RED FIRST SERVICES depuis un an. La qualité est constante et le suivi irréprochable.',
    rating: 5
  }
];

// --- Sub-components for Details and Pricing ---

const ServiceDetailView = ({ serviceId, onBack, onPricingClick }: { serviceId: string, onBack: () => void, onPricingClick: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const data = SERVICE_DETAILS_DATA[serviceId];

  if (!data) return null;

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} className="text-luxury-gold flex items-center gap-2 mb-8 hover:gap-4 transition-all uppercase tracking-widest font-bold">
          <ChevronRight className="rotate-180" size={20} /> Retour
        </button>

        <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 md:p-14 shadow-2xl border-2 border-luxury-gold mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-luxury-bordeaux mb-8 text-center italic">
            {data.title}
          </h2>
          <div className="space-y-6 text-gray-800 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            <p className="font-bold text-xl md:text-2xl italic text-luxury-bordeaux opacity-90">
              {data.tagline}
            </p>
            <p>
              {data.description}
            </p>
            <p className="font-medium text-luxury-gold">
              {data.strongText}
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden py-10 mb-12">
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...data.carousel, ...data.carousel].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(img)}
                className="w-[300px] h-[200px] md:w-[450px] md:h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border-2 border-luxury-gold"
              >
                <img src={img} alt="Prestation Luxe" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="text-center">
          <button 
            onClick={onPricingClick}
            className="gold-gradient text-luxury-black px-6 py-3 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-lg shadow-luxury-gold/10 uppercase tracking-wider"
          >
            CONSULTER NOTRE GRILLE TARIFAIRE
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-luxury-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-6xl w-full h-full flex items-center justify-center"
            >
              <img src={selectedImage} alt="Large view" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
              <button className="absolute top-4 right-4 text-white p-2 hover:text-luxury-gold transition-colors">
                <X size={40} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingView = ({ serviceId, onBack, onQuoteClick }: { serviceId: string, onBack: () => void, onQuoteClick: () => void }) => {
  const data = SERVICE_DETAILS_DATA[serviceId];

  if (!data) return null;

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="text-luxury-gold flex items-center gap-2 mb-8 hover:gap-4 transition-all uppercase tracking-widest font-bold">
          <ChevronRight className="rotate-180" size={20} /> Retour aux détails
        </button>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold gold-text-gradient mb-4 uppercase tracking-tighter text-balance">
            {serviceId === 'offices' 
              ? 'NETTOYAGE DE BUREAUX (PRIX MENSUELS - DU LUNDI AU VENDREDI)' 
              : `GRILLE TARIFAIRE - ${data.title.toUpperCase()}`
            }
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto mb-8"></div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border-2 border-luxury-gold shadow-2xl bg-white mb-16">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-luxury-bordeaux text-white">
                <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm border-r border-white/10">{(serviceId === 'offices' || serviceId === 'construction-apt' || serviceId === 'construction-villa') ? 'Superficie' : 'Service'}</th>
                {serviceId !== 'construction-apt' && serviceId !== 'construction-villa' && (
                  <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm border-r border-white/10">Fréquence / Horaires</th>
                )}
                <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm border-r border-white/10">Prestations</th>
                <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm">{serviceId === 'offices' ? 'Prix mensuel' : 'Prix'}</th>
              </tr>
            </thead>
            <tbody className="text-luxury-black">
              {data.pricing.map((row: any, i: number) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-6 px-6 font-bold border-r border-gray-100">{row.service}</td>
                  {serviceId !== 'construction-apt' && serviceId !== 'construction-villa' && (
                    <td className="py-6 px-6 whitespace-pre-line border-r border-gray-100">{row.freq}</td>
                  )}
                  <td className="py-6 px-6 whitespace-pre-line border-r border-gray-100">{row.prets}</td>
                  <td className="py-6 px-6 font-bold text-luxury-bordeaux">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-6 mb-16">
          {data.pricing.map((row: any, i: number) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-luxury-gold">
              <div className="bg-luxury-bordeaux p-4 text-white font-bold text-center">
                {row.service}
              </div>
              <div className="p-6 space-y-4 text-luxury-black">
                {serviceId !== 'construction-apt' && serviceId !== 'construction-villa' && (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Fréquence / Horaires</span>
                    <p className="whitespace-pre-line">{row.freq}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Prestations</span>
                  <p className="whitespace-pre-line">{row.prets}</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">{serviceId === 'offices' ? 'Prix mensuel' : 'Prix'}</span>
                  <p className="text-xl font-bold text-luxury-bordeaux">{row.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12 mb-8">
           <motion.button 
             onClick={onQuoteClick}
             whileHover={{ scale: 1.05 }}
             animate={{ boxShadow: ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 15px rgba(212,175,55,0.4)", "0px 0px 0px rgba(212,175,55,0)"] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="gold-gradient text-luxury-black px-8 py-3.5 rounded-full font-bold text-lg shadow-xl flex items-center gap-2 text-center uppercase tracking-wide"
           >
             DEMANDER UN DEVIS
             <Sparkles size={18} />
           </motion.button>
        </div>
      </div>
    </div>
  );
};

// --- Quote Modal Component ---
const QuoteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'SERVICES RÉSIDENTIELS & CONCIERGERIE',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `Demande de Devis - ${formData.service}`;
    const body = `
Demande de Devis - RED FIRST SERVICES

Nom Complet : ${formData.name}
Entreprise : ${formData.company || 'N/A'}
E-mail : ${formData.email}
Téléphone : ${formData.phone}
Nature de la demande : ${formData.service}

Message :
${formData.message}
    `.trim();

    const mailtoUrl = `mailto:${EMAIL_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-luxury-navy/95 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="bg-luxury-navy p-6 flex justify-between items-center border-b border-luxury-gold/20 text-white">
              <h3 className="text-xl md:text-2xl font-bold gold-text-gradient">Demander un Devis</h3>
              <button onClick={onClose} className="text-white hover:text-luxury-gold transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-luxury-black">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Nom Complet *</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Jean Dupont"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-luxury-gold outline-none text-luxury-black"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Entreprise</label>
                  <input 
                    type="text" 
                    placeholder="Nom de la société"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-luxury-gold outline-none text-luxury-black"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">E-mail *</label>
                  <input 
                    required
                    type="email" 
                    placeholder="contact@exemple.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-luxury-gold outline-none text-luxury-black"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Téléphone *</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+212 6 00 00 00 00"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-luxury-gold outline-none text-luxury-black"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Nature de la demande *</label>
                <select 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-luxury-gold outline-none text-luxury-black appearance-none"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="SERVICES RÉSIDENTIELS & CONCIERGERIE">SERVICES RÉSIDENTIELS & CONCIERGERIE</option>
                  <option value="NETTOYAGE DE BUREAUX">NETTOYAGE DE BUREAUX</option>
                  <option value="NETTOYAGE FIN DE CHANTIER - APPARTEMENTS">NETTOYAGE FIN DE CHANTIER - APPARTEMENTS</option>
                  <option value="NETTOYAGE FIN DE CHANTIER - VILLAS">NETTOYAGE FIN DE CHANTIER - VILLAS</option>
                </select>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Votre message</label>
                <textarea 
                  rows={4}
                  placeholder="Détaillez votre demande pour un devis précis..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-luxury-gold outline-none text-luxury-black"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-luxury-navy text-white font-bold py-4 rounded-xl hover:bg-luxury-gold hover:text-luxury-black transition-all border border-luxury-gold shadow-lg flex items-center justify-center gap-2"
              >
                Envoyer ma demande
                <Mail size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Preloader Component ---
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-luxury-navy flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-10 rounded-full overflow-hidden border-2 border-luxury-gold shadow-2xl bg-white flex items-center justify-center p-0">
          <img 
            src="https://image.noelshack.com/fichiers/2026/17/4/1776895799-chatgpt-image-23-avr-2026-00-02-42.jpg" 
            alt="Logo RED FIRST SERVICES" 
            className="w-full h-full object-contain scale-125"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="absolute top-0 left-0 h-full gold-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-luxury-gold font-mono text-xl tracking-widest">
          {Math.min(progress, 100)}%
        </p>
      </motion.div>
    </motion.div>
  );
};

// --- Components ---

const Navbar = ({ onQuoteClick, onHomeClick }: { onQuoteClick: () => void, onHomeClick: () => void }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#home', click: onHomeClick },
    { name: 'Services', href: '#services', click: onHomeClick },
    { name: 'Avis', href: '#reviews', click: onHomeClick },
    { name: 'Contact', href: '#contact', click: onHomeClick },
  ];

  return (
    <nav className="fixed w-full z-50 bg-luxury-navy/90 backdrop-blur-md border-b border-luxury-gold/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={onHomeClick}>
            <span className="text-xl md:text-2xl font-bold gold-text-gradient tracking-tighter">RED FIRST SERVICES</span>
            <div className="w-10 h-10 rounded-full border border-luxury-gold shadow-lg bg-white/10 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
              <Home size={20} className="text-luxury-gold" />
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={link.click}
                  className="text-gray-300 hover:text-luxury-gold px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={onQuoteClick}
                className="gold-gradient text-luxury-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-md"
              >
                DEMANDER UN DEVIS
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-gold p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-luxury-navy border-b border-luxury-gold/20 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-left">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-luxury-gold block px-3 py-4 text-base font-medium border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 pb-2 px-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onQuoteClick();
                  }}
                  className="w-full gold-gradient text-luxury-black px-6 py-3 rounded-full text-center font-bold flex items-center justify-center gap-2"
                >
                  DEMANDER UN DEVIS
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onQuoteClick }: { onQuoteClick: () => void }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center pt-24 md:pt-32 overflow-hidden text-center">
      {/* Hero Overlay */}
      <div className="absolute inset-0 z-0 bg-luxury-navy/20"></div>

      <div className="relative z-10 px-4 max-w-7xl lg:max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-6 rounded-full overflow-hidden border-4 border-luxury-gold shadow-2xl bg-white flex items-center justify-center p-0"
          >
            <img 
              src="https://image.noelshack.com/fichiers/2026/17/4/1776895799-chatgpt-image-23-avr-2026-00-02-42.jpg" 
              alt="Logo RED FIRST SERVICES" 
              className="w-full h-full object-contain scale-125"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-white font-medium italic text-lg md:text-xl tracking-wide opacity-90">
              L’excellence du service, au cœur de votre quotidien.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/95 backdrop-blur-md rounded-[2.5rem] py-6 px-8 md:py-10 md:px-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-2 border-luxury-gold mb-12 text-luxury-black mx-auto w-full max-w-[95%] lg:max-w-4xl"
          >
            <div className="space-y-6">
              <p className="text-xl md:text-2xl lg:text-3xl font-display font-bold leading-tight text-luxury-bordeaux">
                RED FIRST SERVICES est une société spécialisée dans le nettoyage et la conciergerie haut de gamme, dédiée à une clientèle exigeante.
              </p>
              
              <div className="h-px w-24 bg-luxury-gold/30 mx-auto"></div>

              <div className="space-y-4 text-gray-800 font-sans tracking-wide">
                <p className="text-base md:text-lg lg:text-xl font-light italic leading-relaxed">
                  Nous utilisons des équipements professionnels de dernière génération et des produits respectueux des matériaux.
                </p>
                <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed">
                  Nos équipes sont formées, rigoureuses et encadrées par une direction française garantissant un haut niveau d’exigence.
                </p>
                <p className="text-lg md:text-xl lg:text-2xl font-display font-medium text-luxury-gold italic tracking-normal">
                  " Chaque prestation est réalisée avec précision, discrétion et souci du détail. "
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onQuoteClick}
              className="w-full sm:w-auto gold-gradient text-luxury-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              DEMANDER UN DEVIS
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating features */}
      <div className="absolute bottom-10 left-0 w-full hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between gap-8 text-center">
          {[
            { text: 'Expertise' },
            { text: 'Haute Précision' },
            { text: 'Expérience Premium' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 text-luxury-gold/80"
            >
              <span className="text-sm font-medium tracking-widest uppercase">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = ({ onServiceDetail }: { onServiceDetail: (id: string) => void }) => {
  return (
    <section id="services" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-luxury-gold uppercase tracking-widest text-sm font-bold mb-2">Nos Prestations</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">Services Sur Mesure</h3>
          <div className="w-24 h-1 gold-gradient mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-2xl overflow-hidden glass-card"
            >
              <img
                src={service.image}
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${service.id === 'residential' ? 'object-[center_15%]' : ''}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-white/100 via-white/80 to-transparent"></div>
              
              {/* Top Title Banner */}
              <div className="absolute top-0 left-0 w-full bg-luxury-bordeaux py-3 px-6 z-10 shadow-lg">
                <h4 className="text-sm md:text-base font-bold text-white text-center tracking-wider uppercase">
                  {service.title}
                </h4>
              </div>

              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col items-center text-center">
                <p className="text-luxury-black mb-6 font-semibold leading-relaxed text-sm md:text-base w-full whitespace-pre-line">
                  {service.description}
                </p>
                <button
                  onClick={() => onServiceDetail(service.id)}
                  className="inline-flex items-center gap-2 text-luxury-bordeaux font-extrabold hover:gap-4 transition-all uppercase tracking-tight text-sm"
                >
                  En savoir plus <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-luxury-gold uppercase tracking-widest text-sm font-bold mb-2">Témoignages</h2>
          <h3 className="text-4xl font-bold text-white">Ce que disent nos clients</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-luxury-gold text-luxury-gold" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6 font-light">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-luxury-black font-bold">
                  {review.name[0]}
                </div>
                <span className="font-bold text-white">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-transparent pt-24 pb-12 border-t border-luxury-gold/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <span className="text-3xl font-bold gold-text-gradient tracking-tighter mb-6 block">RED FIRST SERVICES</span>
            <p className="text-white max-w-md mb-8 font-light leading-relaxed">
              Spécialiste du nettoyage et de la conciergerie de luxe à Marrakech. Équipements de pointe, équipes hautement qualifiées et direction française pour un niveau d’exigence absolu.
            </p>
            <div className="flex gap-4">
              <a href={WHATSAPP_LINK} className="p-3 rounded-full bg-white/5 border border-white/10 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all">
                <Phone size={20} />
              </a>
              <a href={`mailto:${EMAIL_RECIPIENT}`} className="p-3 rounded-full bg-white/5 border border-white/10 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Navigation</h4>
            <ul className="space-y-4 text-white font-medium">
              <li><a href="#home" className="hover:text-luxury-gold transition-colors">Accueil</a></li>
              <li><a href="#services" className="hover:text-luxury-gold transition-colors">Nos Services</a></li>
              <li><a href="#reviews" className="hover:text-luxury-gold transition-colors">Avis Clients</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4 text-white font-medium">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-luxury-gold" />
                Marrakech, Maroc
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-luxury-gold" />
                {WHATSAPP_NUMBER}
              </li>
              <li className="flex items-center gap-3 text-xs lowercase">
                <Mail size={18} className="text-luxury-gold" />
                {EMAIL_RECIPIENT}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-white text-sm">
          <p>&copy; {new Date().getFullYear()} RED FIRST SERVICES. Tous droits réservés. Fait par MELLI CREATION</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
    >
      <MessageCircle size={32} />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
        EN LIGNE
      </span>
    </motion.a>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'service-detail' | 'pricing'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('residential');

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceDetail = (id: string) => {
    setSelectedServiceId(id);
    setCurrentView('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePricing = () => {
    setCurrentView('pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-luxury-gold selection:text-white relative">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Global Desert Background */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src="https://image.noelshack.com/fichiers/2026/17/4/1776949478-royal-mansour-marrakech-sets-the-standard-for-moroccan-luxury-with-its-private-riads-iconic-spa.jpg"
          alt="Desert Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-luxury-navy/50"></div>
      </div>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar onQuoteClick={() => setIsQuoteModalOpen(true)} onHomeClick={handleBackToHome} />
          
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <main>
                  <Hero onQuoteClick={() => setIsQuoteModalOpen(true)} />
                  <Services onServiceDetail={handleServiceDetail} />
                  <Reviews />
                </main>
              </motion.div>
            )}

            {currentView === 'service-detail' && (
              <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <ServiceDetailView 
                  serviceId={selectedServiceId}
                  onBack={handleBackToHome} 
                  onPricingClick={handlePricing} 
                />
              </motion.div>
            )}

            {currentView === 'pricing' && (
              <motion.div key="pricing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <PricingView 
                  serviceId={selectedServiceId}
                  onBack={() => setCurrentView('service-detail')} 
                  onQuoteClick={() => setIsQuoteModalOpen(true)} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Footer />
          <WhatsAppButton />
          <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
        </motion.div>
      )}
    </div>
  );
}
