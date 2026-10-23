import { useEffect, useRef } from 'react'
import './App.css'

const skills = ['Desktop & laptop repair', 'Windows support', 'Hardware diagnostics', 'PC imaging & deployment', 'Networking basics', 'Microsoft 365', 'Printer support', 'Ticket documentation']

const technicalGroups = [
  { title: 'Hardware support', tag: 'ENDPOINTS', items: ['PC and laptop troubleshooting', 'Hardware diagnostics and repair', 'Component upgrades and deployment'] },
  { title: 'Networking', tag: 'CONNECTIVITY', items: ['LAN and TCP/IP fundamentals', 'DNS and DHCP troubleshooting', 'Router, switch, and Wi-Fi support'] },
  { title: 'Server support', tag: 'SYSTEMS', items: ['Windows Server support', 'Backup and recovery', 'Basic server administration'] },
  { title: 'CCTV and peripherals', tag: 'FIELD SUPPORT', items: ['NVR and IP camera setup', 'PoE camera connectivity', 'Printer and peripheral troubleshooting'] },
]

const training = [
  { name: 'CCNA', status: 'Training', detail: 'Networking concepts and configuration; certification not claimed' },
  { name: 'Cybersecurity', status: 'Training', detail: 'Security fundamentals; certification not claimed' },
]

const projects = [
  { number: '01', name: 'PC Build & Deployment', type: 'HARDWARE · ENDPOINTS', description: 'Prepared desktop workstations from component verification and BIOS setup through OS installation, driver updates, and user handoff.', stack: 'Windows 11 · UEFI · Imaging', image: '/1.jpg' },
  { number: '02', name: 'Hardware Troubleshooting', type: 'DIAGNOSTICS · REPAIR', description: 'A repeatable diagnostic workflow for boot failures, overheating, storage issues, memory errors, and common laptop hardware faults.', stack: 'POST · SMART · MemTest', image: '/2.jpeg' },
  { number: '03', name: 'CCTV Installation and Configuration', type: 'CCTV · NVR SYSTEMS', description: 'Installed and configured CCTV cameras and NVR systems, set up recording and network access, and tested camera feeds and system operation.', stack: 'CCTV · NVR · Network Setup', image: '/3.jpg' },
]

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function ServiceIcon({ type }) {
  const paths = {
    hardware: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /><circle cx="12" cy="12" r="2" /></>,
    network: <><circle cx="12" cy="5" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m10.8 7.2-3.5 8.6m5.9-8.6 3.5 8.6M8.5 18h7" /></>,
    server: <><rect x="4" y="3" width="16" height="8" rx="1.5" /><rect x="4" y="13" width="16" height="8" rx="1.5" /><path d="M8 7h.01M8 17h.01M12 7h5m-5 10h5" /></>,
    cctv: <><path d="m4 8 12-4 4 8-12 4z" /><path d="m8 15 1 5m6-7 4 4m-7-6 2 5" /><circle cx="15" cy="8" r="1" /></>,
  }
  return <svg className="hero-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

function ParticleBackdrop() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let particles = []
    let frameId

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * ratio)
      canvas.height = Math.round(window.innerHeight * ratio)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const count = Math.min(78, Math.max(28, Math.round(window.innerWidth * window.innerHeight / 18000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius: Math.random() * 1.6 + 0.6,
      }))
      draw(false)
    }

    const draw = (move) => {
      const width = window.innerWidth
      const height = window.innerHeight
      context.clearRect(0, 0, width, height)
      particles.forEach((particle, index) => {
        if (move) {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < -5 || particle.x > width + 5) particle.vx *= -1
          if (particle.y < -5 || particle.y > height + 5) particle.vy *= -1
        }
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(91, 190, 255, 0.72)'
        context.fill()
        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const other = particles[otherIndex]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance < 142) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(48, 142, 255, ${(1 - distance / 142) * 0.3})`
            context.lineWidth = 0.7
            context.stroke()
          }
        }
      })
      if (move) frameId = window.requestAnimationFrame(() => draw(true))
    }

    resize()
    if (!reducedMotion) frameId = window.requestAnimationFrame(() => draw(true))
    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-backdrop" aria-hidden="true" />
}

function App() {
  return (
    <>
      <ParticleBackdrop />
      <div className="site-shell">
      <header className="topbar">
        <a className="portfolio-brand" href="#home">IT PORTFOLIO<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a><a href="#about">About</a><a href="#skills">Skills</a><a href="#work">Projects</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="availability-dot" /> IT SUPPORT & INFRASTRUCTURE | MARK ANTHONY OLIQUINO</p>
            <h1>Hardware Specialist &amp;<br />IT Technical Support</h1>
            <p className="hero-intro">Focused on computer hardware, network troubleshooting, system maintenance, and reliable IT infrastructure.</p>
            <div className="hero-actions"><a className="button button-dark" href="#work">View IT projects <Arrow /></a><a className="button button-outline" href="#contact">Contact me <Arrow diagonal /></a></div>
            <div className="hero-services" aria-label="Technical support specialties">
              <a className="hero-service-card" href="#skills"><ServiceIcon type="hardware" /><span>Hardware support</span></a>
              <a className="hero-service-card" href="#skills"><ServiceIcon type="network" /><span>Networking</span></a>
              <a className="hero-service-card" href="#skills"><ServiceIcon type="server" /><span>Server maintenance</span></a>
              <a className="hero-service-card" href="#skills"><ServiceIcon type="cctv" /><span>CCTV &amp; security</span></a>
            </div>
          </div>
          <div className="hero-art terminal-art" aria-label="Illustrated computer hardware diagnostic screen">
            <div className="terminal-top"><span><i /> SYSTEM STATUS</span><span>WORKSTATION_01</span></div>
            <div className="terminal-content"><span className="terminal-prompt">&gt; running diagnostics...</span><p><b>CPU</b><span>PASS</span><small>32°C · NORMAL</small></p><p><b>MEMORY</b><span>PASS</span><small>16 GB · OK</small></p><p><b>STORAGE</b><span>PASS</span><small>NVMe · HEALTHY</small></p><p><b>NETWORK</b><span className="status-check">READY</span><small>CONNECTED</small></p></div>
            <div className="terminal-footer"><span>ALL SYSTEMS OPERATIONAL</span><span>● ONLINE</span></div>
          </div>
          <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /><span>01 — 04</span></div>
        </section>

        <section className="intro section-grid" id="about">
          <div className="section-label"><span>01 / PROFILE</span><span className="label-rule" /></div>
          <div className="intro-content"><p className="section-kicker">PROFESSIONAL SUMMARY</p><h2>Practical support<br />for reliable<br /><em>technology.</em></h2>
            <div className="intro-bottom"><p>I troubleshoot and maintain computers, peripherals, and workplace technology. I work methodically: understand the issue, isolate the cause, explain the fix, and document the result. I’m comfortable supporting users with different levels of technical experience.</p><div className="skills"><span className="mini-label">CORE TECHNICAL SKILLS</span><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></div>
          </div>
        </section>

        <section className="technical-skills section-grid" id="skills">
          <div className="section-label"><span>02 / HARDWARE & IT SKILLS</span><span className="label-rule" /></div>
          <div className="technical-content"><p className="section-kicker">TECHNICAL CAPABILITIES</p><h2>From endpoints<br />to <em>infrastructure.</em></h2>
            <div className="technical-grid">{technicalGroups.map((group) => <article className="technical-card" key={group.title}><span className="technical-tag">{group.tag}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
          </div>
        </section>

        <section className="experience section-grid" id="experience">
          <div className="section-label"><span>03 / EXPERIENCE</span><span className="label-rule" /></div>
          <div className="experience-content"><div className="section-heading-row"><div><p className="section-kicker">SUPPORT & OPERATIONS</p><h2>Hands-on help.<br /><em>Solid follow-through.</em></h2></div><p className="heading-aside">Work across IT support, service desk, client solutions, and end-user service.</p></div>
            <div className="role-list">
              <article className="role"><span className="role-date">MAR 2026 — PRESENT</span><div><h3>IT Technical Support</h3><p className="role-company">Globalhome Tile Corporation</p><p className="role-desc">Install and support CCTV/NVR systems; troubleshoot computers, printers, LAN/Wi-Fi, SAP connectivity, and other IT equipment.</p></div><span className="role-type">FULL TIME</span></article>
              <article className="role"><span className="role-date">JAN 2025 — JAN 2026</span><div><h3>IT Help Desk</h3><p className="role-company">Flexis Lab</p><p className="role-desc">Provided technical support for hardware, software, and network concerns; helped users troubleshoot and maintain systems; resolved IT issues to support business operations.</p></div><span className="role-type">FULL TIME</span></article>
              <article className="role"><span className="role-date">MAR 2023 — JAN 2025</span><div><h3>Account Executive</h3><p className="role-company">American Technologist Inc.</p><p className="role-desc">Managed client accounts, recommended technology solutions, conducted sales presentations and consultations, and maintained customer relationships.</p></div><span className="role-type">FULL TIME</span></article>
              <article className="role"><span className="role-date">SEP 2022 — JAN 2023</span><div><h3>Store Associate</h3><p className="role-company">UNIQLO</p><p className="role-desc">Delivered customer service and product assistance, supported sales operations, and maintained store standards.</p></div><span className="role-type">FULL TIME</span></article>
              <article className="role"><span className="role-date">AUG 2019 — NOV 2019</span><div><h3>IT Help Desk Intern</h3><p className="role-company">Fusion BPO Services Philippines Inc.</p><p className="role-desc">Assisted with LAN/WAN troubleshooting and basic network configuration; supported end users with hardware and software issues and gained hands-on service desk experience.</p></div><span className="role-type">INTERN</span></article>
            </div>
          </div>
        </section>

        <section className="work" id="work"><div className="work-heading"><div><p className="section-kicker">04 / IT PROJECTS</p><h2>Diagnose. Repair. <em>Deploy.</em></h2></div><a className="text-link" href="mailto:markanthonyoliquino45@gmail.com?subject=IT%20support%20opportunity">Discuss a support role <Arrow diagonal /></a></div>
          <div className="project-list">{projects.map((project, index) => <article className={`project project-${index + 1}`} key={project.number}><div className={`project-visual${project.image ? ' project-photo' : ''}`}>{project.image ? <img className="project-photo-image" src={project.image} alt={`${project.name} technical work`} /> : <div className="project-shape"><span>{project.number}</span><b>{index === 0 ? 'N' : index === 1 ? 'g.' : 'f'}</b></div>}<span className="visual-tag">{project.type}</span></div><div className="project-info"><div><span className="project-number">{project.number} / 03</span><h3>{project.name} <Arrow diagonal /></h3><p>{project.description}</p></div><span className="project-stack">{project.stack}</span></div></article>)}</div>
        </section>

        <section className="credentials section-grid" id="credentials">
          <div className="section-label"><span>05 / CERTIFICATIONS & TRAINING</span><span className="label-rule" /></div>
          <div className="credentials-content"><p className="section-kicker">PROFESSIONAL DEVELOPMENT</p><h2>Building skills<br />with <em>focused training.</em></h2><p className="credentials-note">Training is listed below; no certification is claimed.</p><div className="training-list">{training.map((item) => <article className="training-item" key={item.name}><div><h3>{item.name}</h3><p>{item.detail}</p></div><span>{item.status}</span></article>)}</div></div>
        </section>

        <section className="resume section-grid" id="resume">
          <div className="section-label"><span>06 / RESUME</span><span className="label-rule" /></div>
          <div className="resume-content"><div className="resume-heading"><div><p className="section-kicker">DOWNLOADABLE PDF</p><h2>Resume & experience.</h2></div><a className="button button-dark" href="/Mark-Anthony-Oliquino-Resume.pdf" download>Download resume <Arrow diagonal /></a></div><p className="resume-note">A concise PDF copy of my technical support experience, skills, and contact details.</p></div>
        </section>

        <section className="contact" id="contact"><p className="section-kicker">07 / CONTACT</p><div className="contact-main"><h2>Need reliable<br /><em>IT support?</em></h2><a className="contact-circle" href="#viber-contact" aria-label="Message Mark Anthony Oliquino on Viber"><span>MESSAGE ME<br />ON VIBER</span><b>↗</b></a></div><div className="contact-bottom"><p>I’m ready to help keep your people and systems productive.<br />Let’s talk about your support needs.</p><a href="mailto:markanthonyoliquino45@gmail.com?subject=IT%20support%20opportunity">markanthonyoliquino45@gmail.com <Arrow diagonal /></a></div><div className="viber-card" id="viber-contact"><div className="viber-copy"><p className="section-kicker">VIBER · DIRECT CONTACT</p><h3>Scan to add me<br />and start a chat.</h3><p>Open Viber and scan this code to add my number, then message me directly.</p><a href="tel:09185507126">Call 09185507126 <Arrow diagonal /></a><a className="viber-text-link" href="/viber-qr.jpg" target="_blank" rel="noreferrer">Open my Viber QR <Arrow diagonal /></a></div><a className="viber-qr-link" href="/viber-qr.jpg" target="_blank" rel="noreferrer" aria-label="Open the Viber QR code"><img className="viber-qr" src="/viber-qr.jpg" alt="Viber QR code for Mark Anthony Oliquino" /></a></div></section>
      </main>

      <footer className="footer"><div className="wordmark"><a className="mark" href="#home" aria-label="Mark Anthony Oliquino home"><img src="/mark-anthony-photo.jpg" alt="" /></a><div className="wordmark-copy"><a className="wordmark-name" href="#home">Mark Anthony Oliquino</a><div className="wordmark-contact"><a href="tel:09185507126">09185507126</a><a href="mailto:markanthonyoliquino45@gmail.com">markanthonyoliquino45@gmail.com</a></div></div></div><span>IT TECHNICAL SUPPORT · © 2026</span><div><a href="https://github.com/markoliquino" target="_blank" rel="noreferrer">GITHUB <Arrow diagonal /></a></div></footer>
      </div>
    </>
  )
}

export default App
