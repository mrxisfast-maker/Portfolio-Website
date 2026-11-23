import { useEffect, useRef, useState, type ReactNode, type SyntheticEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  GraduationCap,
  Mail,
  Menu,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  X,
} from 'lucide-react'
import { portfolio } from './data/portfolio'
import './App.css'

const navItems = [
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Experience', 'experience'],
  ['Services', 'services'],
  ['Contact', 'contact'],
] as const
const currentYear = new Date().getFullYear()

function Reveal({ children, className = '', delay = 0 }: { readonly children: ReactNode; readonly className?: string; readonly delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, note }: { readonly eyebrow: string; readonly title: string; readonly note?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <div className="section-heading-row">
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
    </div>
  )
}

function ProjectPreview({ kind, screenshot, title }: { readonly kind: string; readonly screenshot: string; readonly title: string }) {
  return (
    <div className={`project-preview preview-${kind}`} aria-hidden="true">
      {screenshot && <img className="project-screenshot" src={screenshot} alt="" />}
      {!screenshot && <>
      <div className="preview-window-bar"><span /><span /><span /><i /></div>
      {kind === 'compliance' && (
        <div className="compliance-window">
          <div className="preview-sidebar"><b>S</b><span /><span /><span /><span /></div>
          <div className="preview-content">
            <div className="preview-kicker">SECURITY WORKSPACE</div>
            <div className="preview-title-row"><strong>Compliance overview</strong><small>● All systems healthy</small></div>
            <div className="preview-metrics"><i /><i /><i /></div>
            <div className="preview-report"><span /><span /><span /><span /></div>
          </div>
        </div>
      )}
      {kind === 'portfolio' && (
        <div className="portfolio-window">
          <div className="portfolio-mini-nav"><b>SS.</b><span>ABOUT&nbsp;&nbsp;&nbsp; WORK&nbsp;&nbsp;&nbsp; CONTACT</span></div>
          <div className="portfolio-mini-copy"><small>DEVELOPER / DESIGNER</small><strong>Crafting digital<br />experiences.</strong><i>Selected work&nbsp; ↗</i></div>
          <div className="portfolio-mini-orbit"><span /><b>01</b></div>
        </div>
      )}
      {kind === 'web' && (
        <div className="web-window">
          <div className="web-mini-nav"><b>STUDIO</b><span>Work&nbsp;&nbsp;&nbsp; About&nbsp;&nbsp;&nbsp; Contact</span></div>
          <div className="web-mini-hero"><small>DESIGN FOR WHAT'S NEXT</small><strong>Ideas into<br />interfaces.</strong><i /></div>
          <div className="web-mini-tiles"><span /><span /><span /></div>
        </div>
      )}
      <span className="preview-placeholder-label">{title} / ADD SCREENSHOT</span>
      </>}
    </div>
  )
}

function ArrowUpRightIcon() {
  return <ArrowUp size={14} className="arrow-up-right-icon" />
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('suhail-theme') === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [typedRole, setTypedRole] = useState('')
  const [showTop, setShowTop] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('suhail-theme', theme)
    } catch {
      // Theme still works for this session when storage is unavailable.
    }
  }, [theme])

  useEffect(() => {
    let roleIndex = 0
    let characterIndex = 0
    let deleting = false
    let timer = 0

    const typeNext = () => {
      const currentRole = portfolio.roles[roleIndex]
      if (!deleting) {
        characterIndex += 1
        setTypedRole(currentRole.slice(0, characterIndex))
        if (characterIndex === currentRole.length) {
          deleting = true
          timer = window.setTimeout(typeNext, 1200)
          return
        }
      } else {
        characterIndex -= 1
        setTypedRole(currentRole.slice(0, characterIndex))
        if (characterIndex === 0) {
          deleting = false
          roleIndex = (roleIndex + 1) % portfolio.roles.length
        }
      }
      timer = window.setTimeout(typeNext, deleting ? 38 : 82)
    }

    timer = window.setTimeout(typeNext, 420)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 560)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const moveCursor = (event: PointerEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX - 115}px, ${event.clientY - 115}px, 0)`
        cursorRef.current.style.opacity = '1'
      }
    }
    window.addEventListener('pointermove', moveCursor, { passive: true })
    return () => window.removeEventListener('pointermove', moveCursor)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const handleContactSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!portfolio.email) {
      setFormMessage('Add your email address in src/data/portfolio.ts to enable email delivery.')
      return
    }
    const formData = new FormData(event.currentTarget)
    const getField = (name: string) => {
      const value = formData.get(name)
      return typeof value === 'string' ? value : ''
    }
    const subject = encodeURIComponent(getField('subject') || 'Portfolio enquiry')
    const body = encodeURIComponent(`From: ${getField('name')} (${getField('email')})\n\n${getField('message')}`)
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`
    setFormMessage('Your email app should open with the message ready to send.')
  }

  return (
    <>
      <div className="cursor-aura" ref={cursorRef} aria-hidden="true" />
      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="brand-mark" href="#home" onClick={closeMenu} aria-label={`${portfolio.name}, home`}>
            <span className="brand-monogram">SS</span><span className="brand-name">Suhail<span>.</span></span>
          </a>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
          </div>
          <div className="nav-actions">
            <button className="icon-button theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a className="nav-contact" href="#contact">Let's talk <ArrowUpRightIcon /></a>
            <button className="icon-button menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-grid" />
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-shell page-shell">
            <div className="hero-copy">
              <motion.div className="availability" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}><span className="availability-dot" /> JAVA · WEB · SECURITY</motion.div>
              <motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}>HELLO, I'M</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.32 }}>
                M.F. Sultan<br /><span>Suhail Ahamed</span>
              </motion.h1>
              <div className="hero-role-line"><span className="role-prefix">I build as a</span><span className="typed-role">{typedRole}<i className="typing-caret" /></span></div>
              <p className="hero-description">Building practical digital solutions through software development, modern web technologies, and cybersecurity knowledge. Passionate about learning, creating, and solving real-world problems.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a>
                <a className="button button-outline" href={portfolio.resumeUrl} download>Download resume <ArrowDown size={16} /></a>
              </div>
              <a className="hero-contact-link" href="#contact"><span>Have a project in mind?</span> Contact me <ArrowRight size={14} /></a>
              <div className="hero-socials">
                <a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Code2 size={17} /></a>
                <a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><BriefcaseBusiness size={17} /></a>
                <span className="social-rule" /><span>{portfolio.location}</span>
              </div>
            </div>
            <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}>
              <div className="visual-orbit orbit-outer" /><div className="visual-orbit orbit-inner" />
              <div className="visual-crosshair crosshair-top" /><div className="visual-crosshair crosshair-bottom" />
              <div className="profile-placeholder">
                <div className="profile-placeholder-top"><span>PROFILE / 001</span><span>CHENNAI, IN</span></div>
                {portfolio.profileImage ? <img className="profile-photo" src={portfolio.profileImage} alt={portfolio.name} /> : <div className="profile-monogram">S<span>.</span></div>}
                <div className="profile-placeholder-bottom"><span>{portfolio.profileImage ? 'PROFILE IMAGE' : 'IMAGE PLACEHOLDER'}</span><span>{portfolio.profileImage ? portfolio.name : 'REPLACE WITH YOUR PHOTO'}</span></div>
              </div>
              <div className="float-tag tag-java"><Code2 size={15} /><span>Java</span></div>
              <div className="float-tag tag-shield"><ShieldCheck size={15} /><span>Security</span></div>
              <div className="float-tag tag-react"><Sparkles size={14} /><span>Web</span></div>
              <div className="visual-caption"><span>01</span><span>DEVELOPER / BUILDER</span><span>{currentYear}</span></div>
            </motion.div>
            <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></a>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="page-shell">
            <SectionHeading eyebrow="A LITTLE ABOUT ME" title="Curiosity, turned into code." note="A thoughtful builder, always learning." />
            <div className="about-layout">
              <Reveal className="about-copy">
                <p className="about-lead">I am a Computer Science and Engineering student specializing in <span>Cyber Security</span>, with a strong interest in Java development, web technologies, and information security.</p>
                <p>I enjoy developing practical applications, exploring new technologies, and continuously improving my programming and problem-solving abilities.</p>
                <p>My goal is to become a skilled software developer and contribute to meaningful technology projects.</p>
                <a className="text-link" href="#contact">Let's connect <ArrowRight size={16} /></a>
              </Reveal>
              <div className="highlight-grid">
                {portfolio.highlights.map((item, index) => {
                  const Icon = [GraduationCap, Code2, Terminal, ShieldCheck][index]
                  return <Reveal className="highlight-card" key={item.title} delay={index * 0.07}>
                    <span className="highlight-icon"><Icon size={19} /></span><span className="highlight-index">0{index + 1}</span>
                    <h3>{item.title}</h3><p>{item.detail}</p>
                  </Reveal>
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section section-pad" id="skills">
          <div className="page-shell">
            <SectionHeading eyebrow="WHAT I WORK WITH" title="Skills & technologies." note="Tools I've learned and continue to explore." />
            <div className="skills-layout">
              <Reveal className="skills-aside">
                <div className="skills-aside-icon"><Terminal size={20} /></div><p className="skills-aside-label">PRACTICAL TOOLKIT</p>
                <h3>Built through<br />practice, shaped<br />by curiosity.</h3>
                <p className="skills-aside-copy">A growing set of tools across software, web, and security. No scores, just the work and learning behind them.</p>
                <span className="skills-aside-mark">S<span>.</span></span>
              </Reveal>
              <div className="skill-groups">
                {portfolio.skillGroups.map((group, index) => <Reveal className="skill-group" key={group.title} delay={index * 0.05}>
                  <div className="skill-group-heading"><span>0{index + 1}</span><h3>{group.title}</h3><span className="skill-count">{String(group.skills.length).padStart(2, '0')} TOOLS</span></div>
                  <div className="skill-chips">{group.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
                </Reveal>)}
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <div className="page-shell">
            <SectionHeading eyebrow="SELECTED WORK" title="Projects with purpose." note="Academic and personal explorations in technology." />
            <div className="projects-grid">
              {portfolio.projects.map((project, index) => <Reveal className={`project-card project-card-${project.kind}`} key={project.title} delay={index * 0.08}>
                <div className="project-visual"><ProjectPreview kind={project.kind} screenshot={project.screenshot} title={project.title} /><span className="project-number">0{index + 1}</span></div>
                <div className="project-info">
                  <div className="project-title-line"><h3>{project.title}</h3><ArrowUpRightIcon /></div>
                  <p>{project.description}</p>
                  <div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                  <div className="project-footer">
                    {project.repoUrl ? <a className="project-link" href={project.repoUrl} target="_blank" rel="noreferrer"><Code2 size={15} /> View repository <ExternalLink size={13} /></a> : <span className="project-pending"><Code2 size={15} /> Repository link not added</span>}
                    <span className="project-type">{project.type}</span>
                  </div>
                </div>
              </Reveal>)}
            </div>
            <div className="projects-note"><span className="note-line" /> Project repository links can be added in <code>src/data/portfolio.ts</code>.</div>
          </div>
        </section>

        <section className="experience-section section-pad" id="experience">
          <div className="page-shell">
            <SectionHeading eyebrow="WHERE I'VE LEARNED" title="Experience & education." note="Learning through internships, training, and study." />
            <div className="experience-layout">
              <div className="timeline-column">
                <Reveal className="timeline-label"><BriefcaseBusiness size={17} /><span>INTERNSHIPS & TRAINING</span></Reveal>
                <div className="timeline-list">
                  {portfolio.experience.map((item, index) => <Reveal className="timeline-item" key={item.title} delay={index * 0.06}>
                    <span className="timeline-marker" /><div className="timeline-item-head"><h3>{item.title}</h3><span>{item.duration}</span></div>
                    <p className="timeline-company">{item.organization}</p><p className="timeline-description">{item.description}</p>
                  </Reveal>)}
                </div>
              </div>
              <div className="education-column">
                <Reveal className="timeline-label"><GraduationCap size={18} /><span>EDUCATION</span></Reveal>
                <Reveal className="education-card">
                  <div className="education-card-top"><span className="education-icon"><GraduationCap size={21} /></span><span className="education-status">IN PROGRESS</span></div>
                  <span className="education-period">EXPECTED GRADUATION</span>
                  <h3>{portfolio.education.degree}</h3><p>{portfolio.education.institution}</p>
                  <div className="education-footer"><span>Expected graduation</span><strong>{portfolio.education.graduation}</strong></div>
                </Reveal>
                <Reveal className="education-note" delay={0.1}><span className="education-note-icon"><Check size={15} /></span><p>Currently building a foundation in computer science, with a focus on cyber security.</p></Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="page-shell">
            <SectionHeading eyebrow="WAYS I CAN HELP" title="Good ideas, built well." note="Freelance services for people and small businesses." />
            <div className="services-grid">
              {portfolio.services.map((service, index) => <Reveal className="service-card" key={service.title} delay={index * 0.05}>
                <span className="service-index">0{index + 1}</span><span className="service-icon"><service.Icon size={20} /></span>
                <h3>{service.title}</h3><p>{service.description}</p><a href="#contact" aria-label={`Contact me about ${service.title}`}><ArrowUpRightIcon /></a>
              </Reveal>)}
            </div>
            <Reveal className="services-cta"><p>Have an idea you're ready to make real?</p><a className="button button-primary" href="#contact">Let's talk <ArrowRight size={16} /></a></Reveal>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="page-shell">
            <SectionHeading eyebrow="START A CONVERSATION" title="Let's build something together." note="Have a project, question, or opportunity? Send a note." />
            <div className="contact-layout">
              <Reveal className="contact-copy">
                <p className="contact-lead">Every good project starts with a conversation.</p>
                <p className="contact-description">I'm open to connecting with teams, recruiters, and people building thoughtful things. Tell me what you have in mind.</p>
                <div className="contact-details">
                  <a className="contact-detail" href={portfolio.email ? `mailto:${portfolio.email}` : '#contact-form'}><span className="contact-detail-icon"><Mail size={18} /></span><span><small>EMAIL</small><strong>{portfolio.email || 'Email address to be added'}</strong></span><ArrowUpRightIcon /></a>
                  <a className="contact-detail" href={portfolio.linkedin} target="_blank" rel="noreferrer"><span className="contact-detail-icon"><BriefcaseBusiness size={18} /></span><span><small>LINKEDIN</small><strong>Connect professionally</strong></span><ArrowUpRightIcon /></a>
                  <a className="contact-detail" href={portfolio.github} target="_blank" rel="noreferrer"><span className="contact-detail-icon"><Code2 size={18} /></span><span><small>GITHUB</small><strong>Explore my code</strong></span><ArrowUpRightIcon /></a>
                </div>
              </Reveal>
              <Reveal className="contact-form-wrap" delay={0.08}>
                <form id="contact-form" className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-row"><label>Name<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label><label>Email<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label></div>
                  <label>Subject<input name="subject" type="text" placeholder="What's this about?" required /></label>
                  <label>Message<textarea name="message" placeholder="Tell me a little about it..." rows={5} required /></label>
                  <div className="form-submit-row"><button className="button button-primary" type="submit">Prepare email <ArrowRight size={16} /></button><span>Opens your default email app</span></div>
                  {formMessage && <output className="form-message">{formMessage}</output>}
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-shell">
          <a className="brand-mark footer-brand" href="#home"><span className="brand-monogram">SS</span><span className="brand-name">Suhail<span>.</span></span></a>
          <p>Building thoughtfully, learning constantly.</p>
          <div className="footer-nav">{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
          <div className="footer-bottom"><span>© {currentYear} {portfolio.name}</span><span className="footer-location">MADE IN CHENNAI, INDIA <span>↗</span></span><div className="footer-socials"><a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={16} /></a><a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={16} /></a></div></div>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && <motion.button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><ArrowUp size={18} /></motion.button>}
      </AnimatePresence>
    </>
  )
}

export default App