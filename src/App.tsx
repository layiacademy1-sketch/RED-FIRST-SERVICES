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
    image: 'https://image.noelshack.com/fichiers/2026/17/4/1776905275-chatgpt-image-23-avr-2026-02-47-49.jpg',
  },
  {
    id: 'offices',
    title: 'NETTOYAGE DE BUREAUX',
    description: 'Solutions d\'entretien pour espaces professionnels, garantissant un environnement de travail sain et impeccable.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'construction-apt',
    title: 'NETTOYAGE FIN DE CHANTIER - APPARTEMENTS',
    description: 'Remise en état minutieuse après travaux pour une installation immédiate dans un espace sain.',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'construction-villa',
    title: 'NETTOYAGE FIN DE CHANTIER - VILLAS',
    description: 'Prestation premium pour résidences de luxe en fin de construction ou rénovation majeure.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800',
  }
];

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

const Navbar = ({ onQuoteClick }: { onQuoteClick: () => void }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Avis', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-luxury-navy/90 backdrop-blur-md border-b border-luxury-gold/20 text-white">
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
      <div className="absolute inset-0 z-0 bg-luxury-navy/40"></div>

      <div className="relative z-10 px-4 max-w-4xl">
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
            className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-luxury-gold/40 mb-12 text-luxury-black max-w-5xl mx-auto"
          >
            <div className="space-y-8">
              <p className="text-xl md:text-3xl font-display font-bold leading-tight text-luxury-bordeaux">
                RED FIRST SERVICES est une société spécialisée dans le nettoyage et la conciergerie haut de gamme, dédiée à une clientèle exigeante.
              </p>
              
              <div className="h-px w-24 bg-luxury-gold/30 mx-auto"></div>

              <div className="space-y-6 text-gray-800 font-sans tracking-wide">
                <p className="text-base md:text-xl font-light italic leading-relaxed">
                  Nous utilisons des équipements professionnels de dernière génération et des produits respectueux des matériaux.
                </p>
                <p className="text-base md:text-xl font-light leading-relaxed">
                  Nos équipes sont formées, rigoureuses et encadrées par une direction française garantissant un haut niveau d’exigence.
                </p>
                <p className="text-lg md:text-2xl font-display font-medium text-luxury-gold italic tracking-normal">
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
            { icon: ShieldCheck, text: 'Expertise' },
            { icon: Sparkles, text: 'Haute Précision' },
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
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/40 to-transparent"></div>
              
              {/* Top Title Banner */}
              <div className="absolute top-0 left-0 w-full bg-luxury-bordeaux py-3 px-6 z-10 shadow-lg">
                <h4 className="text-sm md:text-base font-bold text-white text-center tracking-wider uppercase">
                  {service.title}
                </h4>
              </div>

              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col items-center text-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-luxury-gold/20 backdrop-blur-md border border-luxury-gold/30">
                    <service.icon className="text-luxury-gold" size={24} />
                  </div>
                </div>
                <p className="text-white md:text-gray-300 mb-6 font-medium md:font-light leading-relaxed text-sm md:text-base w-full">
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
        <div className="absolute inset-0 bg-luxury-navy/80"></div>
      </div>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar onQuoteClick={() => setIsQuoteModalOpen(true)} />
          <main>
            <Hero onQuoteClick={() => setIsQuoteModalOpen(true)} />
            <Services />
            <Reviews />
          </main>
          <Footer />
          <WhatsAppButton />
          <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
        </motion.div>
      )}
    </div>
  );
}
