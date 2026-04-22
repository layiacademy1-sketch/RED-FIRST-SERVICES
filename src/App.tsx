import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Instagram, 
  Car, 
  Home, 
  Compass, 
  Users, 
  Star, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Clock,
  MapPin,
  Calendar
} from 'lucide-react';

// --- Constants ---
const WHATSAPP_NUMBER = "+212725806860";
const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=212725806860&text&type=phone_number&app_absent=0";
const INSTAGRAM_LINK = "https://www.instagram.com/locbykech";

const SERVICES = [
  {
    id: 'transfers',
    title: 'Transferts Privés',
    description: 'Aéroport, Hôtel, Villa. Chauffeurs professionnels et véhicules premium.',
    icon: Car,
    image: 'https://image.noelshack.com/fichiers/2026/14/7/1775426181-capture-d-cran-2026-04-05-235532.jpg',
  },
  {
    id: 'villas',
    title: 'Villas',
    description: 'Une sélection exclusive des plus belles demeures de Marrakech.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'excursions',
    title: 'Excursions & Activités',
    description: 'Désert d\'Agafay, Quad, Buggy, Vallée de l\'Ourika et plus.',
    icon: Compass,
    image: 'https://image.noelshack.com/fichiers/2026/14/7/1775414384-ggfgf.jpg',
  },
  {
    id: 'car-rental',
    title: 'Location de Voiture',
    description: 'Véhicules récents et confortables pour vos déplacements en toute liberté.',
    icon: Users,
    image: 'https://image.noelshack.com/fichiers/2026/14/7/1775414211-67363b665073c-location-voiture-luxe-dubai.jpg',
  }
];

const REVIEWS = [
  {
    name: 'Sophie L.',
    text: 'Service exceptionnel ! Le transfert était parfait et la villa magnifique. Je recommande RED FIRST SERVICES à 100%.',
    rating: 5
  },
  {
    name: 'Marc D.',
    text: 'Une organisation au top pour notre excursion dans le désert. Chauffeur ponctuel et très sympathique.',
    rating: 5
  },
  {
    name: 'Elena R.',
    text: 'La meilleure conciergerie de Marrakech. Ils s\'occupent de tout, on n\'a plus qu\'à profiter.',
    rating: 5
  }
];

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
      className="fixed inset-0 z-[9999] bg-luxury-green flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold gold-text-gradient tracking-[0.2em] mb-8">
          RED FIRST SERVICES
        </h1>
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

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Avis', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-luxury-green/80 backdrop-blur-md border-b border-luxury-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold gold-text-gradient tracking-tighter">RED FIRST SERVICES</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-luxury-gold px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient text-luxury-green px-6 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Phone size={16} />
                Contact Rapide
              </a>
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
            className="md:hidden bg-luxury-green border-b border-luxury-gold/20 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full gold-gradient text-luxury-green px-6 py-3 rounded-full text-center font-bold flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center pt-24 md:pt-32 overflow-hidden text-center">
      {/* Hero Overlay (optional, global one is already there) */}
      <div className="absolute inset-0 z-0 bg-luxury-green/20"></div>

      <div className="relative z-10 px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-luxury-gold uppercase tracking-[0.3em] text-sm font-bold mb-4">Conciergerie & Services Premium</h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            L'excellence à <br />
            <span className="gold-text-gradient italic">chaque détail</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            Organisation complète de votre séjour. Villas de luxe, transferts privés et expériences exclusives au cœur du Maroc.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto gold-gradient text-luxury-green px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              Réserver Maintenant
              <ChevronRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating features */}
      <div className="absolute bottom-10 left-0 w-full hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between gap-8">
          {[
            { icon: ShieldCheck, text: 'Service Professionnel' },
            { icon: Clock, text: 'Disponible 24/7' },
            { icon: Star, text: 'Expérience Premium' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 text-luxury-gold/80"
            >
              <item.icon size={24} />
              <span className="text-sm font-medium tracking-widest uppercase">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-luxury-gold uppercase tracking-widest text-sm font-bold mb-2">Nos Prestations</h2>
          <h3 className="text-4xl md:text-5xl font-bold">Services Sur Mesure</h3>
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
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-green via-luxury-green/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-luxury-gold/20 backdrop-blur-md border border-luxury-gold/30">
                    <service.icon className="text-luxury-gold" size={24} />
                  </div>
                  <h4 className="text-2xl font-bold">{service.title}</h4>
                </div>
                <p className="text-gray-300 mb-6 font-light leading-relaxed">
                  {service.description}
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-luxury-gold font-bold hover:gap-4 transition-all"
                >
                  En savoir plus <ChevronRight size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingSection = () => {
  return (
    <section id="booking" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1920"
          alt="Desert"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-16 max-w-4xl mx-auto border-luxury-gold/40">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Réservation Rapide</h3>
            <p className="text-gray-400">Remplissez ces quelques informations pour un devis instantané via WhatsApp.</p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-luxury-gold uppercase tracking-wider">Service Souhaité</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-luxury-gold outline-none transition-colors">
                <option value="transfer">Transfert Privé</option>
                <option value="villa">Villa / Riad</option>
                <option value="excursion">Excursion</option>
                <option value="car">Location Voiture</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-luxury-gold uppercase tracking-wider">Date de séjour</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="text" placeholder="JJ/MM/AAAA" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-luxury-gold outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-luxury-gold uppercase tracking-wider">Nombre de personnes</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="number" placeholder="1" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-luxury-gold outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-luxury-gold uppercase tracking-wider">Votre Nom</label>
              <input type="text" placeholder="Nom complet" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-luxury-gold outline-none transition-colors" />
            </div>
            
            <div className="md:col-span-2 pt-4">
              <button
                onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                className="w-full gold-gradient text-luxury-green py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
              >
                <MessageCircle size={24} />
                Envoyer ma demande WhatsApp
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">Réponse garantie en moins de 15 minutes.</p>
            </div>
          </form>
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
          <h3 className="text-4xl font-bold">Ce que disent nos clients</h3>
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
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-luxury-green font-bold">
                  {review.name[0]}
                </div>
                <span className="font-bold">{review.name}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="text-3xl font-bold gold-text-gradient tracking-tighter mb-6 block">RED FIRST SERVICES</span>
            <p className="text-gray-400 max-w-md mb-8 font-light leading-relaxed">
              Votre partenaire de confiance pour un séjour inoubliable à Marrakech. Conciergerie de luxe, excursions exclusives et services premium sur mesure.
            </p>
            <div className="flex gap-4">
              <a href={WHATSAPP_LINK} className="p-3 rounded-full bg-white/5 border border-white/10 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-green transition-all">
                <Phone size={20} />
              </a>
              <a href={INSTAGRAM_LINK} className="p-3 rounded-full bg-white/5 border border-white/10 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-green transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-sm mb-6">Navigation</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-luxury-gold transition-colors">Accueil</a></li>
              <li><a href="#services" className="hover:text-luxury-gold transition-colors">Nos Services</a></li>
              <li><a href="#reviews" className="hover:text-luxury-gold transition-colors">Avis Clients</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-luxury-gold" />
                Marrakech, Maroc
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-luxury-gold" />
                {WHATSAPP_NUMBER}
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={18} className="text-luxury-gold" />
                @locbykech
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
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
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="min-h-screen selection:bg-luxury-gold selection:text-luxury-green relative">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Global Desert Background */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1920"
          alt="Desert Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-luxury-green/80"></div>
      </div>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Reviews />
          </main>
          <Footer />
          <WhatsAppButton />
        </motion.div>
      )}
    </div>
  );
}
