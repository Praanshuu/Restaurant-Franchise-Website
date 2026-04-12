import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ChevronRight, 
  Star,
  Calendar,
  Users,
  UtensilsCrossed
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Occasions', href: '#occasions' },
    { name: 'Menu', href: '#menu' },
    { name: 'Experience', href: '#experience' },
    { name: 'Reserve', href: '#reserve' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-parchment/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold tracking-tighter text-ink">
          LUMIÈRE
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest text-ink/70 hover:text-saffron transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#reserve" 
            className="bg-saffron text-white px-6 py-2.5 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-saffron/90 transition-all shadow-lg shadow-saffron/20"
          >
            Book a Table
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-ink"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-parchment border-b border-cream p-6 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-ink"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#reserve" 
                className="bg-saffron text-white py-4 rounded-xl text-center font-bold uppercase tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reserve Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/restaurant-hero/1920/1080" 
          alt="Lumière Atmosphere" 
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white/80 uppercase tracking-[0.3em] text-sm font-medium mb-6"
        >
          Est. 2024 • Fine Dining
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl text-white font-serif mb-8 leading-[1.1] text-balance"
        >
          For nights that deserve more than delivery.
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="#menu" 
            className="w-full sm:w-auto bg-white text-ink px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-saffron hover:text-white transition-all duration-300"
          >
            See the Menu
          </a>
          <a 
            href="#reserve" 
            className="w-full sm:w-auto bg-transparent border border-white/30 text-white backdrop-blur-sm px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
          >
            Reserve a Table
          </a>
        </motion.div>
      </div>

      {/* Ambient Info */}
      <div className="absolute bottom-10 left-0 right-0 z-10 hidden md:flex justify-center space-x-12 text-white/60 text-xs uppercase tracking-widest font-medium">
        <div className="flex items-center gap-2">
          <Clock size={14} />
          <span>Open Daily: 12 PM - 11 PM</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>Civil Lines, Raipur</span>
        </div>
      </div>
    </section>
  );
};

const OccasionsStrip = () => {
  const occasions = [
    { title: 'Date Night', desc: 'Intimate lighting & curated wine pairings.', img: 'date-night' },
    { title: 'Birthday Brunch', desc: 'Celebrate with bubbles and artisanal plates.', img: 'brunch' },
    { title: 'Family Sunday', desc: 'Large tables, shared stories, comfort food.', img: 'family' },
    { title: 'After-Work Unwind', desc: 'Craft cocktails and small plates to reset.', img: 'cocktails' },
  ];

  return (
    <section id="occasions" className="py-24 bg-parchment overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">When would you come here?</h2>
          <p className="text-stone max-w-xl">Real moments, not generic categories. We design experiences for the times that matter most to you.</p>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-6 snap-x no-scrollbar">
          {occasions.map((occ, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="min-w-[280px] md:min-w-[350px] snap-start group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative">
                <img 
                  src={`https://picsum.photos/seed/${occ.img}/600/800`} 
                  alt={occ.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-2xl font-serif mb-2">{occ.title}</h3>
              <p className="text-stone text-sm leading-relaxed">{occ.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SignatureSection = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/chef-working/800/800" 
              alt="Our Process" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden lg:block max-w-xs">
            <p className="font-italic text-xl text-saffron mb-2">"Our dough takes 3 days to reach perfection. We don't rush what nature intended to be slow."</p>
            <p className="text-xs uppercase tracking-widest font-bold text-ink/50">— Chef Julian</p>
          </div>
        </div>
        <div>
          <span className="text-saffron font-bold uppercase tracking-[0.2em] text-xs mb-4 block">The Signature Story</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Why Lumière?</h2>
          <div className="space-y-6 text-stone leading-relaxed">
            <p>We didn't start Lumière to be another restaurant. We started because we missed the kind of slow, intentional dining that makes you forget your phone exists.</p>
            <p>Every morning, we roast our own beans. Every afternoon, we hand-roll pasta using flour stone-ground just miles away. It's not about being the best in town—it's about being the most memorable part of your day.</p>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://picsum.photos/seed/chef-portrait/100/100" alt="Chef" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="font-bold text-ink">Julian Varma</p>
              <p className="text-xs text-stone uppercase tracking-widest">Executive Chef & Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuPreview = () => {
  const items = [
    { name: 'Truffle Arancini', desc: 'Disappear before the main course. Served with roasted garlic aioli.', price: '₹450', img: 'arancini' },
    { name: '3-Day Sourdough', desc: 'Wild yeast, stone-ground flour, served with cultured sea salt butter.', price: '₹320', img: 'bread' },
    { name: 'Burrata & Heirloom', desc: 'Creamy heart, sun-drenched tomatoes, basil oil infusion.', price: '₹680', img: 'burrata' },
    { name: 'Slow-Roasted Lamb', desc: '12-hour braise, red wine reduction, parsnip silk.', price: '₹1,250', img: 'lamb' },
    { name: 'Wild Mushroom Risotto', desc: 'Foraged fungi, 24-month parmesan, hint of thyme.', price: '₹850', img: 'risotto' },
    { name: 'Dark Chocolate Ganache', desc: '70% cocoa, sea salt flakes, olive oil drizzle.', price: '₹420', img: 'dessert' },
  ];

  return (
    <section id="menu" className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Curated for the Craving</h2>
          <p className="text-stone max-w-2xl mx-auto">Not a catalog, but a selection of our most loved creations. Each dish tells a story of season and craft.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6">
                <img 
                  src={`https://picsum.photos/seed/${item.img}/800/600`} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif">{item.name}</h3>
                <span className="text-saffron font-medium">{item.price}</span>
              </div>
              <p className="text-stone text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-ink font-bold uppercase tracking-widest border-b-2 border-saffron pb-1 hover:text-saffron transition-colors"
          >
            View Full Menu <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Real moments, not just ratings.</h2>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-parchment relative">
                <div className="flex gap-1 text-saffron mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg font-italic mb-6">"The kind of place where you lose track of time. The arancini are life-changing, but the atmosphere is what brings us back every anniversary."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream" />
                  <div>
                    <p className="font-bold text-sm">Priya Sharma</p>
                    <p className="text-xs text-stone uppercase tracking-widest">Local Guide • 42 Reviews</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-parchment relative lg:ml-12">
                <div className="flex gap-1 text-saffron mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg font-italic mb-6">"Finally, a spot in Raipur that understands subtlety. No loud music, just great food and even better conversation."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream" />
                  <div>
                    <p className="font-bold text-sm">Rohan Malhotra</p>
                    <p className="text-xs text-stone uppercase tracking-widest">Google Reviewer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://picsum.photos/seed/social-1/400/500" alt="Customer Photo" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/social-2/400/300" alt="Customer Photo" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 pt-8">
              <img src="https://picsum.photos/seed/social-3/400/300" alt="Customer Photo" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/social-4/400/500" alt="Customer Photo" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">The Atmosphere</h2>
          <p className="text-stone max-w-xl">Warm lighting, unhurried pace, music that never competes with conversation. Experience the Lumière vibe.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 aspect-video rounded-3xl overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/interior-1/1200/800" 
              alt="Main Dining Hall" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
          <div className="aspect-square md:aspect-auto rounded-3xl overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/interior-2/600/800" 
              alt="Corner Booth" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-square md:aspect-auto rounded-3xl overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/interior-3/600/800" 
              alt="The Bar" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-2 aspect-video rounded-3xl overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/interior-4/1200/800" 
              alt="Outdoor Terrace" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ReserveSection = () => {
  return (
    <section id="reserve" className="py-24 bg-espresso text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Secure your table.</h2>
          <p className="text-white/60 mb-12 text-lg leading-relaxed">Whether it's a quiet Tuesday or a celebratory Saturday, we'll make sure your spot is waiting. For parties larger than 8, please call us directly.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Phone size={20} className="text-saffron" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-white/40">Direct Line</p>
                <p className="text-lg">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <MessageCircle size={20} className="text-herb" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-white/40">WhatsApp Order</p>
                <p className="text-lg">Chat with us for delivery</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 text-ink shadow-2xl">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-stone">Full Name</label>
                <input type="text" className="w-full bg-parchment border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-saffron outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-stone">Phone Number</label>
                <input type="tel" className="w-full bg-parchment border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-saffron outline-none" placeholder="+91 ..." />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-stone">Date</label>
                <input type="date" className="w-full bg-parchment border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-saffron outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-stone">Time</label>
                <select className="w-full bg-parchment border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-saffron outline-none">
                  <option>7:00 PM</option>
                  <option>7:30 PM</option>
                  <option>8:00 PM</option>
                  <option>8:30 PM</option>
                  <option>9:00 PM</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-stone">Guests</label>
                <select className="w-full bg-parchment border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-saffron outline-none">
                  <option>2 People</option>
                  <option>4 People</option>
                  <option>6 People</option>
                  <option>8 People</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-saffron text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-saffron/90 transition-all shadow-lg shadow-saffron/20">
              Confirm Reservation
            </button>
            <p className="text-center text-[10px] text-stone uppercase tracking-widest">No credit card required for booking</p>
          </form>
        </div>
      </div>
    </section>
  );
};

const CateringSection = () => {
  return (
    <section className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-herb rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Hosting an office lunch or a milestone?</h2>
            <p className="text-white/70 mb-10 text-lg leading-relaxed">Bring the Lumière experience to your venue. From corporate catering to private celebrations, we handle the craft so you can handle the hosting.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="bg-white text-herb px-8 py-4 rounded-full font-bold uppercase tracking-widest text-center hover:bg-parchment transition-colors">Inquire for Events</a>
              <a href="#" className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-center hover:bg-white/10 transition-colors">View Catering Menu</a>
            </div>
          </div>
          <div className="absolute top-0 right-0 bottom-0 w-1/3 hidden lg:block">
            <img 
              src="https://picsum.photos/seed/catering/600/800" 
              alt="Catering" 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  return (
    <section className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-serif mb-8">Find Us</h2>
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-stone mb-2">Address</p>
                <p className="text-lg">12/B, Civil Lines, Near Magneto Mall<br />Raipur, Chhattisgarh 492001</p>
                <p className="text-saffron text-sm mt-2 font-medium italic">Look for the orange awning, opposite HDFC Bank.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-stone mb-2">Hours</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-bold">Mon - Thu</p>
                    <p className="text-stone">12:00 PM - 10:30 PM</p>
                  </div>
                  <div>
                    <p className="font-bold">Fri - Sun</p>
                    <p className="text-stone">12:00 PM - 11:30 PM</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-stone mb-2">Parking</p>
                <p className="text-sm text-stone">Valet parking available daily from 7:00 PM onwards.</p>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-saffron transition-all"
              >
                Open in Google Maps <MapPin size={14} />
              </a>
            </div>
          </div>
          <div className="lg:col-span-2 h-[450px] rounded-[2rem] overflow-hidden shadow-xl grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59483.166164295!2d81.6050285!3d21.2379469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd9063d70ad3%3A0x45dca25605f7748c!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1712940000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-espresso text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="text-3xl font-serif font-bold tracking-tighter mb-6 block">LUMIÈRE</a>
            <p className="text-white/40 text-sm leading-relaxed mb-8">For nights that deserve more than delivery. A premium dining experience in the heart of Raipur.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-saffron transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-saffron transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-white/20 mb-6">Explore</p>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#menu" className="hover:text-white transition-colors">Our Menu</a></li>
              <li><a href="#occasions" className="hover:text-white transition-colors">Occasions</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Experience</a></li>
              <li><a href="#reserve" className="hover:text-white transition-colors">Reservations</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-white/20 mb-6">Contact</p>
            <ul className="space-y-4 text-sm text-white/60">
              <li>+91 98765 43210</li>
              <li>hello@lumiere.com</li>
              <li>Civil Lines, Raipur</li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-white/20 mb-6">Newsletter</p>
            <p className="text-sm text-white/40 mb-4">Get early access to our seasonal menu.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Email Address" className="bg-white/5 border-none rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-saffron w-full" />
              <button className="bg-saffron text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Join</button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-[10px] text-white/20 uppercase tracking-widest">© 2024 Lumière Restaurant. FSSAI Lic No. 12345678901234</p>
          <div className="flex gap-8 text-[10px] text-white/20 uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a 
      href="https://wa.me/919876543210?text=Hi%20Lumiere,%20I'd%20like%20to%20reserve%20a%20table%20for..."
      target="_blank"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50 bg-herb text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <MessageCircle size={28} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-bold uppercase tracking-widest text-xs">
        Chat with us
      </span>
    </motion.a>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-saffron selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <OccasionsStrip />
        <SignatureSection />
        <MenuPreview />
        <SocialProof />
        <ExperienceSection />
        <ReserveSection />
        <CateringSection />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
