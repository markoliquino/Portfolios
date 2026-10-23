import { useEffect, useRef } from 'react'
import './App.css'

const skills = ['Desktop & laptop repair', 'Windows support', 'Hardware diagnostics', 'PC imaging & deployment', 'Networking basics', 'Microsoft 365', 'Printer support', 'Ticket documentation']

const projects = [
  { number: '01', name: 'PC Build & Deployment', type: 'HARDWARE · ENDPOINTS', description: 'Prepared desktop workstations from component verification and BIOS setup through OS installation, driver updates, and user handoff.', stack: 'Windows 11 · UEFI · Imaging', image: '/1.jpg' },
  { number: '02', name: 'Hardware Troubleshooting', type: 'DIAGNOSTICS · REPAIR', description: 'A repeatable diagnostic workflow for boot failures, overheating, storage issues, memory errors, and common laptop hardware faults.', stack: 'POST · SMART · MemTest', image: '/2.jpeg' },
  { number: '03', name: 'CCTV Installation and Configuration', type: 'CCTV · NVR SYSTEMS', description: 'Installed and configured CCTV cameras and NVR systems, set up recording and network access, and tested camera feeds and system operation.', stack: 'CCTV · NVR · Network Setup', image: '/3.jpg' },
]

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
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
        <div className="wordmark"><a className="mark" href="#home" aria-label="Mark Anthony Oliquino home"><img src="/mark-anthony-photo.jpg" alt="" /></a><div className="wordmark-copy"><a className="wordmark-name" href="#home">Mark Anthony Oliquino</a><div className="wordmark-contact"><a href="tel:09185507126">09185507126</a><a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noreferrer">markanthonyoliquino45@gmail.com</a></div></div></div>
        <nav aria-label="Main navigation">
          <a href="#about">Profile</a><a href="#experience">Experience</a><a href="#work">Technical work</a>
        </nav>
        <a className="top-contact" href="#viber-contact">Message on Viber <Arrow diagonal /></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="availability-dot" /> IT SUPPORT · HARDWARE</p>
            <h1>Reliable systems.<br />Practical fixes.<br /><em>People first.</em></h1>
            <p className="hero-intro">I’m Mark Anthony Oliquino — an IT technical support specialist focused on hardware, endpoint setup, and clear, dependable user support.</p>
            <div className="hero-actions"><a className="button button-dark" href="#experience">View my experience <Arrow /></a><a className="text-link" href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noreferrer">Contact me <Arrow diagonal /></a></div>
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
          <div className="intro-content"><p className="section-kicker">TECHNICAL SUPPORT PROFILE</p><h2>Keep the tech working.<br />Make support feel<br /><em>straightforward.</em></h2>
            <div className="intro-bottom"><p>I troubleshoot and maintain computers, peripherals, and workplace technology. I work methodically: understand the issue, isolate the cause, explain the fix, and document the result. I’m comfortable supporting users with different levels of technical experience.</p><div className="skills"><span className="mini-label">CORE TECHNICAL SKILLS</span><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></div>
          </div>
        </section>

        <section className="experience section-grid" id="experience">
          <div className="section-label"><span>02 / EXPERIENCE</span><span className="label-rule" /></div>
          <div className="experience-content"><div className="section-heading-row"><div><p className="section-kicker">SUPPORT & OPERATIONS</p><h2>Hands-on help.<br /><em>Solid follow-through.</em></h2></div><p className="heading-aside">Replace these sample roles and duties with your actual employment history and measurable results.</p></div>
            <div className="role-list">
              <article className="role"><span className="role-date">MAR 2026 — PRESENT</span><div><h3>IT Technical Support</h3><p className="role-company">Globalhome Tile Corporation</p><p className="role-desc">Install and support CCTV/NVR systems; troubleshoot computers, printers, LAN/Wi-Fi, SAP connectivity, and other IT equipment.</p></div><span className="role-type">FULL TIME</span></article>
              <article className="role"><span className="role-date">JAN 2025 — JAN 2026</span><div><h3>IT Help Desk</h3><p className="role-company">Flexis Lab</p><p className="role-desc">Provided technical support for hardware, software, and network concerns; helped users troubleshoot and maintain systems; resolved IT issues to support business operations.</p></div><span className="role-type">FULL TIME</span></article>
              <article className="role"><span className="role-date">MAR 2023 — JAN 2025</span><div><h3>Account Executive</h3><p className="role-company">American Technologist Inc.</p><p className="role-desc">Managed client accounts, recommended technology solutions, conducted sales presentations and consultations, and maintained customer relationships.</p></div><span className="role-type">FULL TIME</span></article>
              <article className="role"><span className="role-date">SEP 2022 — JAN 2023</span><div><h3>Store Associate</h3><p className="role-company">UNIQLO</p><p className="role-desc">Delivered customer service and product assistance, supported sales operations, and maintained store standards.</p></div><span className="role-type">FULL TIME</span></article>
              <article className="role"><span className="role-date">AUG 2019 — NOV 2019</span><div><h3>IT Help Desk Intern</h3><p className="role-company">Fusion BPO Services Philippines Inc.</p><p className="role-desc">Assisted with LAN/WAN troubleshooting and basic network configuration; supported end users with hardware and software issues and gained hands-on service desk experience.</p></div><span className="role-type">INTERN</span></article>
            </div>
          </div>
        </section>

        <section className="work" id="work"><div className="work-heading"><div><p className="section-kicker">03 / TECHNICAL WORK</p><h2>Diagnose. Repair. <em>Deploy.</em></h2></div><a className="text-link" href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noreferrer">Discuss a support role <Arrow diagonal /></a></div>
          <div className="project-list">{projects.map((project, index) => <article className={`project project-${index + 1}`} key={project.number}><div className={`project-visual${project.image ? ' project-photo' : ''}`}>{project.image ? <img className="project-photo-image" src={project.image} alt={`${project.name} technical work`} /> : <div className="project-shape"><span>{project.number}</span><b>{index === 0 ? 'N' : index === 1 ? 'g.' : 'f'}</b></div>}<span className="visual-tag">{project.type}</span></div><div className="project-info"><div><span className="project-number">{project.number} / 03</span><h3>{project.name} <Arrow diagonal /></h3><p>{project.description}</p></div><span className="project-stack">{project.stack}</span></div></article>)}</div>
        </section>

        <section className="contact" id="contact"><p className="section-kicker">05 / CONTACT</p><div className="contact-main"><h2>Need reliable<br /><em>IT support?</em></h2><a className="contact-circle" href="#viber-contact" aria-label="Message Mark Anthony Oliquino on Viber"><span>MESSAGE ME<br />ON VIBER</span><b>↗</b></a></div><div className="contact-bottom"><p>I’m ready to help keep your people and systems productive.<br />Let’s talk about your support needs.</p><a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noreferrer">markanthonyoliquino45@gmail.com <Arrow diagonal /></a></div><div className="viber-card" id="viber-contact"><div className="viber-copy"><p className="section-kicker">VIBER · DIRECT CONTACT</p><h3>Scan to add me<br />and start a chat.</h3><p>Open Viber and scan this code to add my number, then message me directly.</p><a href="tel:09185507126">09185507126 <Arrow diagonal /></a></div><a className="viber-qr-link" href="/viber-qr.jpg" target="_blank" rel="noreferrer" aria-label="Open the Viber QR code"><img className="viber-qr" src="/viber-qr.jpg" alt="Viber QR code for Mark Anthony Oliquino" /></a></div></section>
      </main>

      <footer className="footer"><div className="wordmark"><a className="mark" href="#home" aria-label="Mark Anthony Oliquino home"><img src="/mark-anthony-photo.jpg" alt="" /></a><div className="wordmark-copy"><a className="wordmark-name" href="#home">Mark Anthony Oliquino</a><div className="wordmark-contact"><a href="tel:09185507126">09185507126</a><a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noreferrer">markanthonyoliquino45@gmail.com</a></div></div></div><span>IT TECHNICAL SUPPORT · © 2025</span><div><a href="https://www.linkedin.com/">LINKEDIN <Arrow diagonal /></a><a href="https://github.com/">GITHUB <Arrow diagonal /></a></div></footer>
      </div>
    </>
  )
}

export default App
