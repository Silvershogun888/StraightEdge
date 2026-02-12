import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, Mail, MapPin, ArrowRight, CheckCircle, 
  Ruler, HardHat, Hammer, Truck, ShieldCheck, ChevronDown, 
  Construction, Facebook, Instagram, Zap, Droplet, Wrench
} from 'lucide-react';

// --- Assets from Uploads ---
// Using placeholders for the logic, but mapping to the descriptions of uploaded files
const ASSETS = {
  heroBg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop", // Fallback high-res construction
  logo: "Straight Edge", // Updated Brand Name
};

// --- Theme Constants ---
// Updated to match the Red/Blue Straight Edge logo
const COLORS = {
  primary: "#ef4444", // Red (Straight)
  secondary: "#1d4ed8", // Blue (Edge)
  accent: "#f59e0b", // Construction yellow/orange
  concrete: "#f3f4f6",
  text: "#334155",
};

// --- Animation Variants (The "Global Motion Rules") ---
const transitions = {
  standard: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }, // Smooth/Industrial
  hero: { duration: 1.2, ease: "easeInOut" },
  stagger: { staggerChildren: 0.1 },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.standard },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: transitions.standard },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: transitions.standard },
};

const panelReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ["Home", "Services", "Projects", "Process", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Lock-in */}
        <motion.div 
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-3 font-black text-2xl tracking-tighter"
        >
          {/* Logo Mark Representation (S/E) */}
          <div className="hidden md:flex relative h-8 w-12 items-center justify-center font-sans italic">
             <span className="text-red-600 text-4xl absolute left-0 z-10" style={{ textShadow: '2px 2px 0px white' }}>S</span>
             <span className="text-blue-700 text-4xl absolute right-0 top-1">E</span>
          </div>

          <div className="flex flex-col leading-none">
             <div className="flex gap-1">
                <span className="text-red-600 font-bold">STRAIGHT</span>
                <span className="text-blue-700 font-bold">EDGE</span>
             </div>
             {scrolled && <span className="text-[10px] text-slate-500 tracking-widest font-normal uppercase">Construction</span>}
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <div key={link} className="relative group cursor-pointer">
              <span className={`text-sm font-medium tracking-wide ${scrolled ? 'text-slate-700' : 'text-slate-100'} hover:text-red-500 transition-colors`}>
                {link}
              </span>
              {/* Micro Detail: Measurement Line */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full" />
              <span className="absolute -bottom-1 -right-1 w-0 h-[2px] bg-red-500 transition-all duration-300 delay-75 group-hover:h-1 group-hover:w-[2px]" />
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-700 text-white px-5 py-2 rounded-sm font-medium text-sm border-b-2 border-blue-900 active:border-b-0 active:translate-y-[2px] transition-all hover:bg-blue-600"
          >
            Get Quote
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-slate-900" /> : <Menu className={scrolled ? "text-slate-900" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-3/4 bg-slate-900 text-white shadow-2xl z-50 p-8 flex flex-col gap-6"
          >
            <div className="flex justify-end">
               <button onClick={() => setIsOpen(false)}><X /></button>
            </div>
            {links.map((link, idx) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-xl font-medium border-b border-slate-700 pb-2 hover:text-red-500"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-900 flex items-center">
      {/* Background Image with Mask Reveal */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className="absolute inset-0 z-0"
      >
        <div 
            className="absolute inset-0 bg-cover bg-center"
            // CHANGED: Image updated to feature an African construction professional
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop')` }} 
        />
        <div className="absolute inset-0 bg-slate-900/60" /> {/* Overlay */}
      </motion.div>

      {/* Blueprint Grid Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <motion.rect 
            width="100%" 
            height="100%" 
            fill="url(#grid)" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white mt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="max-w-3xl"
        >
          {/* Blueprint Lines Draw */}
          <motion.div 
             className="w-24 h-1 bg-red-600 mb-6"
             initial={{ width: 0 }}
             animate={{ width: 96 }}
             transition={{ duration: 0.8, delay: 1 }}
          />
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            We Build With <br />
            <span className="text-blue-500">Precision & Power</span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl"
          >
            Straight Edge Construction. From demolition to finishing touches, we deliver excellence in every square meter.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-sm font-bold tracking-wide shadow-lg border-b-4 border-red-800 active:border-b-0 active:translate-y-[4px] transition-all flex items-center gap-2 cursor-pointer"
            >
              Start Your Project <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-sm font-bold tracking-wide backdrop-blur-sm transition-all cursor-pointer"
            >
              View Services
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 bg-blue-500/50" />
      </motion.div>
    </div>
  );
};

const TrustBar = () => {
  return (
    <div className="bg-slate-50 py-10 border-b border-slate-200">
      <div className="container mx-auto px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {["Authorized Supplier", "Safety First", "Premium Materials", "Grade A Contractors", "ISO Certified"].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-900 font-semibold">
              <ShieldCheck className="text-blue-600" size={24} />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, items, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
        visible: { opacity: 1, x: 0, transition: transitions.standard }
      }}
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white p-6 md:p-8 shadow-sm border border-slate-100 relative group overflow-hidden"
    >
      {/* Hover Corner Bracket */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[3px] border-r-[3px] border-red-500 transition-all duration-300 group-hover:w-8 group-hover:h-8" />
      
      <div className="bg-blue-50 w-14 h-14 rounded-sm flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
        <Icon className="text-blue-600 group-hover:text-white transition-colors" size={28} />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Services = () => {
  // Data derived from the new "Straight Edge" services list upload
  const servicesList = [
    {
      title: "Construction & Structure",
      icon: HardHat,
      items: [
        "Building Construction & Design",
        "Road Maintenance & Construction",
        "Steel Portal Frames",
        "Demolition"
      ]
    },
    {
      title: "Interiors & Finishing",
      icon: Ruler,
      items: [
        "Drywall installation",
        "Aluminium & Ceiling Works",
        "Tile work installation",
        "Floor fitting"
      ]
    },
    {
      title: "Systems & Installations",
      icon: Zap, // Electrical symbol
      items: [
        "Electrical Installations",
        "Plumbing",
        "Fan installation",
        "Furniture assembly"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            className="h-1 bg-red-600 mb-4"
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center"
          >
            Our Services
          </motion.h2>
          <p className="text-slate-500 mt-4 text-center max-w-2xl">
            Comprehensive solutions from structural steel to electrical installs.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesList.map((service, idx) => (
            <ServiceCard key={idx} index={idx} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedProject = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Featured Project</h2>
          <p className="text-slate-500">Drag to reveal the finished aluminium installation.</p>
        </div>

        {/* Before/After Slider simulating "Plan" vs "Reality" */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl cursor-col-resize select-none"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* "After" Image (Full Color/Finished) - RIGHT SIDE (Background) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop')` // Finished modern interior
            }}
          />
          <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-1 font-bold text-sm shadow-md z-10">
            FINISHED REALITY
          </div>

          {/* "Before" Image (Construction/Blueprints) - LEFT SIDE (Clipped) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                // UPDATED: African engineer reviewing blueprints on a construction site
                backgroundImage: `url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2574&auto=format&fit=crop')`, 
                filter: "grayscale(100%) brightness(0.9)"
            }}
          >
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" /> {/* Darker tint for better contrast with white text */}
            <div className="absolute top-6 left-6 bg-slate-800 text-white px-4 py-1 font-bold text-sm shadow-md border border-white/20">
              CONSTRUCTION PHASE
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
           {/* Static galleries from uploaded images */}
            <div className="relative group overflow-hidden rounded-lg h-64">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop" alt="Partitions" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-bold">Office Partitions</p>
                </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg h-64">
                <img src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2574&auto=format&fit=crop" alt="Windows" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-bold">Aluminium Windows</p>
                </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg h-64">
                <img src="https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=2670&auto=format&fit=crop" alt="Materials" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-bold">Modern Materials</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const Odometer = ({ value, label }) => {
  const { scrollYProgress } = useScroll();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const springValue = useSpring(0, { stiffness: 50, damping: 20, duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="text-center p-6 border-r border-slate-700/50 last:border-0">
      <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-2">
        {displayValue}+
      </div>
      <div className="text-blue-500 text-sm font-semibold tracking-wider uppercase">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="bg-slate-900 py-16 relative overflow-hidden">
        {/* Background Grid Line */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, transparent 49%, #ffffff 49%, #ffffff 51%, transparent 51%)', backgroundSize: '100px 100%' }}></div>
        
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Odometer value={150} label="Projects Completed" />
          <Odometer value={12} label="Years Experience" />
          <Odometer value={3500} label="Sq. Meters Built" />
          <Odometer value={100} label="Happy Clients" />
        </div>
      </div>
    </section>
  );
};

const Timeline = () => {
  const steps = [
    { num: "01", title: "Consultation", desc: "We meet to discuss your vision, budget, and site requirements." },
    { num: "02", title: "Planning & Design", desc: "Our engineers create detailed blueprints and structural plans." },
    { num: "03", title: "Procurement", desc: "Sourcing premium materials (aluminum, glass, concrete) from our trusted suppliers." },
    { num: "04", title: "Construction", desc: "Precision execution by our skilled team with regular safety checks." },
    { num: "05", title: "Handover", desc: "Final inspection and key handover for your new reality." }
  ];

  return (
    <section id="process" className="py-20 bg-white">
       <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">How We Work</h2>
        
        <div className="relative max-w-4xl mx-auto">
            {/* The Vertical Line */}
            <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="absolute left-[19px] md:left-1/2 top-0 w-[2px] bg-slate-200 -translate-x-1/2 h-full z-0"
            />

            {steps.map((step, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.2 }}
                    className={`flex items-start md:items-center gap-8 mb-12 relative z-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                    {/* Content Box */}
                    <div className={`flex-1 md:text-${i % 2 === 0 ? 'right' : 'left'} pl-12 md:pl-0`}>
                        <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                        <p className="text-slate-500 mt-2">{step.desc}</p>
                    </div>

                    {/* Node/Circle */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-[2px] md:-translate-x-1/2 w-10 h-10 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center font-bold text-xs text-slate-900 shadow-md">
                        {step.num}
                    </div>
                    
                    {/* Spacer for the other side */}
                    <div className="hidden md:block flex-1" />
                </motion.div>
            ))}
        </div>
       </div>
    </section>
  );
};

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Get A Quote</h2>
                        <p className="text-slate-600 mb-8">Ready to start your project? Contact Straight Edge today for modern designs and the best prices in town.</p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Call Us</h4>
                                    <p className="text-slate-600">0211278100</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Email</h4>
                                    <p className="text-slate-600">straightedgeconstructiona@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Location</h4>
                                    <p className="text-slate-600">Mass Media, 38767 Alick Nkata Rd, Lusaka</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="bg-white p-8 shadow-lg rounded-sm border-t-4 border-blue-500">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Service Needed</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-500 transition-colors">
                                    <option>Construction</option>
                                    <option>Aluminium & Glass</option>
                                    <option>Renovation</option>
                                    <option>Materials Supply</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Tell us about your project..."></textarea>
                            </div>
                            <button className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 rounded-sm shadow-md transition-all active:translate-y-1">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
                        <span className="text-red-600">STRAIGHT</span>
                        <span className="text-blue-700">EDGE</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                            <Facebook size={20} />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                            <Instagram size={20} />
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm border-t border-slate-800 pt-8">
                    &copy; {new Date().getFullYear()} Straight Edge Construction. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default function App() {
  return (
    <div className="font-sans bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <FeaturedProject />
      <Stats />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
}