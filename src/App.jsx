import { useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Menu as MenuIcon, X, MapPin, Clock3, Instagram, Star, Coffee, ChevronLeft, ChevronRight } from "lucide-react";
import { menuCategories, menuItems, galleryImages } from "./data";

const photo = {
  hero: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=2200&q=90",
  about: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
  craft: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=85",
  close: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=85",
  final: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2200&q=85"
};

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

function Reveal({ children, className = "", delay = 0 }) {
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.16 }} transition={{ delay }}>{children}</motion.div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 40));
  const links = [["Story", "#story"], ["Menu", "#menu"], ["The space", "#gallery"], ["Reviews", "#reviews"], ["Visit", "#visit"]];
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <nav className="container nav-wrap">
      <a className="brand" href="#home" onClick={() => setOpen(false)}><span className="brand-mark">C.</span><span>collective<span className="brand-sub">COFFEE HOUSE</span></span></a>
      <div className={`nav-links ${open ? "nav-open" : ""}`}>
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#menu" onClick={() => setOpen(false)}>Explore menu <ArrowUpRight size={15}/></a>
      </div>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <MenuIcon/>}</button>
    </nav>
  </header>;
}

function Hero() {
  return <section id="home" className="hero" aria-label="Collective Coffee House welcome" style={{ backgroundImage: `linear-gradient(90deg, rgba(20,16,14,.76), rgba(20,16,14,.2) 70%), url(${photo.hero})` }}>
    <div className="container hero-inner">
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: .13 } } }}>
        <motion.p variants={reveal} className="eyebrow light"><span className="eyebrow-line"/> SPECIALTY COFFEE · NAGPUR</motion.p>
        <motion.h1 variants={reveal}>Good coffee.<br/><em>Better</em> conversations.</motion.h1>
        <motion.p variants={reveal} className="hero-copy">A space to slow down, discover beautiful coffee, and enjoy the moments that matter.</motion.p>
        <motion.div variants={reveal} className="hero-actions">
          <a href="#menu" className="button button-cream">Explore our menu <ArrowUpRight size={16}/></a>
          <a href="#story" className="text-link light-link">Discover our story <ArrowRight size={16}/></a>
        </motion.div>
      </motion.div>
      <div className="hero-bottom"><span>GOOD THINGS BREW HERE</span><a href="#story"><ArrowDown size={16}/> SCROLL TO EXPLORE</a><span>21°08' N · NAGPUR</span></div>
    </div>
    <div className="hero-index">01 <span/> 06</div>
  </section>;
}

function Intro() {
  return <section id="story" className="section-pad intro-section">
    <div className="container">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <Reveal><p className="eyebrow"><span className="eyebrow-line"/> A LITTLE ABOUT US</p><h2 className="display-heading">More than just<br/>your everyday <em>coffee.</em></h2><p className="body-copy mt-4">Some places just make a day feel better. The familiar warmth, the first sip, the conversation that lasts a little longer. Collective is imagined as a neighbourhood pause — a place to meet, make room for ideas, or simply enjoy a moment to yourself.</p><a href="#visit" className="underlined-link">Come find your corner <ArrowUpRight size={16}/></a></Reveal>
        </div>
        <div className="col-lg-6">
          <Reveal delay={.15} className="intro-visual"><img src={photo.about} alt="Barista preparing a coffee" loading="lazy"/><div className="image-note"><span>01 / THE EVERYDAY RITUAL</span><span>Made for lingering.</span></div><div className="round-stamp">GOOD<br/>COFFEE<br/><span>GOOD COMPANY</span></div></Reveal>
        </div>
      </div>
    </div>
  </section>;
}

function MenuSection() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? menuItems : menuItems.filter(item => item.category === active);
  return <section id="menu" className="menu-section section-pad">
    <div className="container">
      <Reveal className="section-heading-row"><div><p className="eyebrow light"><span className="eyebrow-line"/> SOMETHING TO SAVOR</p><h2 className="display-heading light-heading">A menu worth<br/><em>slowing down for.</em></h2></div><p className="menu-intro">Thoughtful little pick-me-ups, familiar favourites and a few new things to fall for.</p></Reveal>
      <div className="menu-tabs" role="tablist" aria-label="Menu categories">{menuCategories.map(cat => <button key={cat} className={active === cat ? "active" : ""} onClick={() => setActive(cat)}>{cat}</button>)}</div>
      <motion.div layout className="row g-4 menu-grid">
        <AnimatePresence mode="popLayout">{filtered.map((item, i) => <motion.div layout key={item.name} className="col-md-6 col-lg-4" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}} transition={{duration:.35}}>
          <article className="menu-card"><div className="menu-image"><img src={item.image} alt={item.name} loading="lazy"/><span>{item.tag}</span></div><div className="menu-meta"><div><h3>{item.name}</h3><p>{item.note}</p></div><strong>{item.price}</strong></div></article>
        </motion.div>)}</AnimatePresence>
      </motion.div>
      <p className="menu-disclaimer">A sample menu for this website concept. Items and prices are subject to owner confirmation.</p>
    </div>
  </section>;
}

function Craft() {
  return <section className="craft-section section-pad">
    <div className="container">
      <div className="row align-items-center g-5">
        <div className="col-lg-7"><Reveal className="craft-image"><img src={photo.craft} alt="Fresh coffee being poured" loading="lazy"/><div className="photo-caption">THE ART OF THE EVERYDAY</div></Reveal></div>
        <div className="col-lg-5"><Reveal><p className="eyebrow"><span className="eyebrow-line"/> THE LITTLE DETAILS</p><h2 className="display-heading">Crafted with passion.<br/><em>Served with purpose.</em></h2><p className="body-copy mt-4">From the aroma that greets you to the final sip, the best coffee moments are made of small details. Take your time. Find your favourite. Make it a ritual.</p><div className="craft-points"><div><span>01</span><p><b>Thoughtful cups</b><br/>A little care in every pour.</p></div><div><span>02</span><p><b>Room to reconnect</b><br/>Good spaces make good moments.</p></div></div></Reveal></div>
      </div>
    </div>
  </section>;
}

function Gallery() {
  const [selected, setSelected] = useState(null);
  return <section id="gallery" className="gallery-section section-pad">
    <div className="container">
      <Reveal className="gallery-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> STEP INSIDE</p><h2 className="display-heading">A space to <em>stay awhile.</em></h2></div><p className="body-copy">A good corner, a familiar table, a little pause in the middle of it all.</p></Reveal>
      <div className="gallery-grid">{galleryImages.map((item, i) => <Reveal key={item.src} className={`gallery-item ${item.className}`} delay={i*.06}><button onClick={() => setSelected(item)} aria-label={`View ${item.alt}`}><img src={item.src} alt={item.alt} loading="lazy"/><span className="gallery-plus">+</span></button></Reveal>)}</div>
    </div>
    <AnimatePresence>{selected && <motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)}><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image"><X/></button><motion.img src={selected.src} alt={selected.alt} initial={{scale:.94}} animate={{scale:1}} onClick={e => e.stopPropagation()}/></motion.div>}</AnimatePresence>
  </section>;
}

function Reviews() {
  const [index, setIndex] = useState(0);
  const quotes = [
    { text: "A lovely spot to take a breather, catch up and enjoy a good cup. The atmosphere is what makes a coffee break feel special.", name: "A note from the neighbourhood", label: "Sample testimonial" },
    { text: "Warm interiors, an easy-going feel and the kind of place where one coffee can turn into a long conversation.", name: "A coffee moment", label: "Sample testimonial" },
    { text: "A little pause from the busy day. Come in for a cup, settle into a corner and stay a while.", name: "A familiar ritual", label: "Sample testimonial" }
  ];
  return <section id="reviews" className="reviews-section section-pad"><div className="container"><Reveal className="text-center"><p className="eyebrow light justify-center"><span className="eyebrow-line"/> KIND WORDS & GOOD COMPANY</p><div className="rating"><strong>4.3</strong><span><span className="stars">★★★★★</span><small>764 Google reviews · Business profile reference</small></span></div></Reveal><div className="quote-wrap"><button className="slider-arrow" onClick={() => setIndex((index+2)%3)} aria-label="Previous testimonial"><ChevronLeft/></button><AnimatePresence mode="wait"><motion.div key={index} className="quote-content" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} transition={{duration:.3}}><div className="quote-mark">“</div><blockquote>{quotes[index].text}</blockquote><p>{quotes[index].name}</p><small>{quotes[index].label}</small></motion.div></AnimatePresence><button className="slider-arrow" onClick={() => setIndex((index+1)%3)} aria-label="Next testimonial"><ChevronRight/></button></div><p className="review-note">Testimonials above are illustrative website-demo copy, not verified customer reviews.</p></div></section>;
}

function Visit() {
  const address = "23B, opposite Hare Krishna Enclave, Om Sai Nagar, Shivaji Nagar, Nagpur, Maharashtra 440010";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  return <section id="visit" className="visit-section section-pad"><div className="container"><div className="row g-5 align-items-stretch"><div className="col-lg-5"><Reveal><p className="eyebrow"><span className="eyebrow-line"/> YOUR COFFEE CORNER</p><h2 className="display-heading">Find your<br/><em>way to us.</em></h2><p className="body-copy mt-4">The next good coffee moment might be closer than you think. Drop by, take a seat and make yourself at home.</p><div className="visit-detail"><MapPin/><div><small>FIND US</small><p>23B, opposite Hare Krishna Enclave,<br/>Om Sai Nagar, Shivaji Nagar,<br/>Nagpur, Maharashtra 440010</p></div></div><div className="visit-detail"><Clock3/><div><small>OPENING HOURS</small><p>Hours to be confirmed with the business.</p></div></div><a className="button button-dark mt-3" href={mapUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16}/></a></Reveal></div><div className="col-lg-7"><Reveal className="map-card"><div className="map-art"><div className="map-grid-lines"/><div className="map-label map-label-one">SHIVAJI NAGAR</div><div className="map-label map-label-two">OM SAI NAGAR</div><div className="map-road road-one"/><div className="map-road road-two"/><div className="map-pin"><MapPin size={25}/></div><div className="map-card-caption"><span>COLLECTIVE COFFEE HOUSE</span><small>NAGPUR · MAHARASHTRA · ILLUSTRATIVE ARTWORK</small></div></div></Reveal></div></div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><a className="brand footer-brand" href="#home"><span className="brand-mark">C.</span><span>collective<span className="brand-sub">COFFEE HOUSE</span></span></a><p>Good coffee. Better conversations.<br/>A little more time for the things that matter.</p><a className="back-top" href="#home">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Collective Coffee House · Website concept</span><span>NAGPUR, INDIA</span><span>MADE TO MAKE YOU PAUSE.</span></div></div></footer>;
}

function App() {
  return <><Navbar/><main><Hero/><Intro/><section className="brand-ribbon" aria-label="Collective coffee house values"><div className="container ribbon-inner"><span>COFFEE, WITHOUT THE RUSH</span><i>✳</i><span>ROOM FOR GOOD CONVERSATIONS</span><i>✳</i><span>YOUR EVERYDAY PAUSE</span></div></section><MenuSection/><Craft/><Gallery/><Reviews/><Visit/><section className="closing-cta" style={{backgroundImage:`linear-gradient(rgba(26,20,17,.58),rgba(26,20,17,.58)),url(${photo.final})`}}><div className="container"><Reveal><p className="eyebrow light justify-center"><span className="eyebrow-line"/> YOUR TABLE IS WAITING</p><h2>Your next favourite<br/><em>coffee moment</em> awaits.</h2><a href="#menu" className="button button-cream">Explore the menu <ArrowUpRight size={16}/></a></Reveal></div></section></main><Footer/></>;
}

export default App;
