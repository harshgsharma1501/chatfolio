import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { portfolio } from './data/portfolio';

const NAV = ['About Me', 'Skills', 'Projects', 'Clients', 'Contact'];
const COMMANDS = ['about', 'skills', 'projects', 'clients', 'contact', 'cv', 'education', 'experience', 'awards', 'hobbies'];

const normalize = (s = '') => s.toLowerCase().trim();
const matches = (value, target) => normalize(value).includes(normalize(target)) || normalize(target).includes(normalize(value));

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>,
    moon: <><path d="M20.8 15.3A8.5 8.5 0 0 1 8.7 3.2 8.5 8.5 0 1 0 20.8 15.3Z" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
    external: <><path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function DecorativeCat({ className }) {
  return (
    <span className={className} aria-hidden="true">
      <svg className="cat-shape" viewBox="0 0 64 48" fill="none">
        <path className="cat-coat" d="M11 41c-4 0-6-3-6-7 0-4 3-7 8-10l1-14 10 7c5-2 11-2 16 0l10-8-1 17c5 3 8 8 8 14v1h-9v-5h-8v5h-9v-5H20v5h-9Zm0-15C4 25 2 20 4 16c1-3 4-5 8-5-3 2-4 5-3 8 1 2 2 4 4 5Z" />
        <path className="cat-patch" d="M34 27c4-3 9-2 12 1l3 11H34Z" />
        <path className="cat-stripes" d="m22 19-2 5m9-7-1 5m9-4 1 5M8 21l-3-2" />
        <circle cx="43" cy="22" r="1" className="cat-eye" />
      </svg>
    </span>
  );
}

function App() {
  const [active, setActive] = useState('About Me');
  const [light, setLight] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [flippedProjects, setFlippedProjects] = useState({});
  const [messages, setMessages] = useState(() => [
    { role: 'bot', html: 'Hi there, I’m <strong>Harsh Sharma</strong>.<br/>Ask me about my journey using commands like <code>about</code>, <code>skills</code>, <code>projects</code>, <code>clients</code>, or <code>contact</code>.' },
  ]);
  const chatRef = useRef(null);

  const themeClass = light ? 'theme-light' : 'theme-dark';

  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
  }, [light]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id === 'about' ? 'About Me' : id === 'skills' ? 'Skills' : id === 'projects' ? 'Projects' : id === 'clients' ? 'Clients' : 'Contact');
  };

  const responseFor = (raw) => {
    const value = normalize(raw);
    if (!value) return null;
    if (matches(value, 'about') || matches(value, 'who are you')) return {
      intent: 'about',
      html: `I’m a <strong>Final Year Computer Engineering student at VJTI</strong>, building at the intersection of <strong>AI and software engineering</strong>. I enjoy turning ideas into scalable, intelligent, and impactful products through <strong>full-stack development, AI/GenAI, and problem solving</strong>.`
    };
    if (matches(value, 'skills') || matches(value, 'stack') || matches(value, 'tech')) return { intent: 'skills', html: `My current toolkit spans <strong>${portfolio.skills.frontend.slice(0, 4).join(', ')}</strong> on the frontend, <strong>${portfolio.skills.backend.slice(0, 3).join(', ')}</strong> on the backend, plus ML/GenAI and deployment tooling.` };
    if (matches(value, 'projects') || matches(value, 'work')) return { intent: 'projects', html: `Featured work includes <strong>${portfolio.projects.map(p => p.name).join(', ')}</strong>. The projects section below has the stack and a short description for each.` };
    if (matches(value, 'clients') || matches(value, 'client')) return { intent: 'clients', html: `I’ve built academic and freelance work around products such as <strong>Ashley Global Exim</strong> and internal/project systems. See the client strip below for the visual treatment.` };
    if (matches(value, 'contact') || matches(value, 'email') || matches(value, 'hire')) return {
  intent: 'contact',
  html: `
    <strong>Let’s connect and build something meaningful.</strong>
    <ul>
      <li>📞 <strong>Phone:</strong> +91 7499727939</li>
      <li>✉️ <strong>Email:</strong> harshgsharma1501@gmail.com</li>
      <li>💼 <strong>LinkedIn:</strong> linkedin.com/in/harsh-sharma-003859280</li>
    </ul>
  `
}
    if (matches(value, 'cv') || matches(value, 'resume')) return { intent: 'cv', html: `The CV button is wired as a local file link. Put your PDF at <code>/public/Harsh-Sharma-CV.pdf</code> and it will work without changing the React code.` };
    if (matches(value, 'education')) return { intent: 'education', html: `I’m completing <strong>Computer Engineering at Veermata Jijabai Technological Institute (VJTI), Mumbai</strong>.` };
    if (matches(value, 'experience')) return { intent: 'experience', html: `Experience so far combines college projects, freelance frontend work, deployment, databases, and GenAI learning. The exact timeline is kept editable in the data file so humans can update it, as apparently humans keep changing jobs.` };
    if (matches(value, 'awards')) return { intent: 'awards', html: `Recent learning highlights include the <strong>Google Gen AI Exchange</strong> program and hands-on cloud/GenAI skill work.` };
    if (matches(value, 'hobbies')) return { intent: 'hobbies', html: `Outside code: fitness, music, experimenting with new tech, and building small ideas that have a suspicious habit of turning into projects.` };
    return { intent: 'unknown', html: `I didn’t catch that. Try one of these: <strong>${COMMANDS.join(', ')}</strong>.` };
  };

  const submitValue = (input) => {
    const value = input.trim();
    if (!value) return;
    const result = responseFor(value);
    setMessages(prev => [...prev, { role: 'user', html: escapeHtml(value) }, { role: 'bot', html: result.html, intent: result.intent }]);
    setQuery('');
    const target = result.intent;
    window.setTimeout(() => {
      if (['about', 'skills', 'projects', 'clients', 'contact'].includes(target)) scrollTo(target);
    }, 2000);
  };

  const submit = (e) => {
    e?.preventDefault();
    submitValue(query);
  };

  const handleQuick = (label) => {
    if (label === 'About Me') scrollTo('about');
    if (label === 'Skills') scrollTo('skills');
    if (label === 'Projects') scrollTo('projects');
    if (label === 'Clients') scrollTo('clients');
    if (label === 'Contact') scrollTo('contact');
  };

  const suggested = useMemo(() => ['about', 'skills', 'projects', 'contact'].filter(x => !messages.some(m => m.role === 'user' && normalize(m.html).includes(x))), [messages]);

  return (
    <div className={`site ${themeClass}`}>
      <div className="cat-background" aria-hidden="true">
        <DecorativeCat className="background-cat cat-one" />
        <DecorativeCat className="background-cat cat-two" />
        <DecorativeCat className="background-cat cat-three" />
      </div>
      <header className="topbar shell">
        <a href="#top" className="wordmark" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>HS<span>.</span></a>
        <div className="top-actions">
          <button className="icon-button" onClick={() => setLight(v => !v)} aria-label="Toggle theme"><Icon name={light ? 'moon' : 'sun'} /></button>
          <button className="icon-button mobile-menu" onClick={() => document.body.classList.toggle('nav-open')} aria-label="Open navigation"><Icon name="menu" /></button>
        </div>
      </header>

      <main id="top">
        <section className="hero shell">
          <div className="hero-kicker"><h3>Hello!</h3></div>
          <div className="hero-grid">
            
            <div className="hero-copy">
              <h1>I’m Harsh,<br /><span>Computer Engineering Student @VJTI</span></h1>
              <p className="quote">Building clean interfaces, useful products, and practical AI experiments that survive contact with reality.</p>
              <p className="quote-author">— Personal portfolio</p>
            </div>
            <div className="avatar-wrap">
              <div className="avatar-orbit" />
              <img src="/avatar.svg" alt="Harsh Sharma monogram portrait" className="avatar" />
            </div>
            <div className="hero-actions">
              <button className="pill filled" onClick={() => scrollTo('about')}>More About Me <Icon name="arrow" size={16} /></button>
              <button className="pill outline" onClick={() => scrollTo('projects')}>See My Work <Icon name="arrow" size={16} /></button>
            </div>
          </div>
        </section>

        <section className="chat-zone shell" id="about">
          <div className="chat-shell">
            <div className="chat-head">
              <div>
                <span className="eyebrow">CHATFOLIO</span>
                <h2>Ask me anything.</h2>
              </div>
              <span className="online"><i /> Available for opportunities</span>
            </div>
            <div className="command-strip">
              <span>Try</span>
              {COMMANDS.slice(0, 5).map(c => <button key={c} onClick={() => submitValue(c)}>{c}</button>)}
            </div>
            <div className="chat-window" ref={chatRef}>
              {messages.map((m, i) => <div key={i} className={`message-row ${m.role}`}><div className="message" dangerouslySetInnerHTML={{ __html: m.html }} /></div>)}
              {suggested.length > 0 && <div className="micro-hint">Type a command below. No API key, no backend, no ceremonial cloud architecture required.</div>}
            </div>
            <form className="chat-input" onSubmit={submit}>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Try about, skills, projects, or contact..." aria-label="Ask about Harsh" />
              <button type="submit" aria-label="Send"><Icon name="send" size={17} /></button>
            </form>
          </div>
          <nav className="section-nav" aria-label="Portfolio sections">
            {NAV.map(item => <button key={item} className={active === item ? 'active' : ''} onClick={() => handleQuick(item)}>{item}</button>)}
          </nav>
        </section>

        <section className="content-section shell" id="about-details">
          <div className="section-title"><span>01</span><h2>About Me</h2></div>
          <div className="two-col">
            <div><p className="lead">I’m a final-year Computer Engineering student at VJTI, Mumbai, with a strong interest in frontend engineering, full-stack development, and GenAI.</p><p>I like interfaces that feel simple on the surface and are thoughtfully engineered underneath. My projects move between React, Node/Express, MongoDB, cloud deployment, and AI-enabled experiences.</p></div>
            <div className="stats-grid">
              {portfolio.stats.map(s => <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
            </div>
          </div>
        </section>

        <section className="content-section shell" id="skills">
          <div className="section-title"><span>02</span><h2>Skills</h2></div>
          <div className="skill-columns">
            {Object.entries(portfolio.skills).map(([group, skills]) => <div className="skill-card" key={group}><h3>{group}</h3><div className="skill-list">{skills.map(s => <span className="skill-tag" key={s}>{s}</span>)}</div></div>)}
          </div>
          <div className="section-actions"><button className="pill outline" onClick={() => scrollTo('projects')}>View My Projects <Icon name="arrow" size={16} /></button><a className="pill filled" href="Harsh_Sharma_Resume.pdf" download>Download CV <Icon name="download" size={16} /></a></div>
        </section>

        <section className="content-section shell" id="projects">
          <div className="section-title"><span>03</span><h2>Projects</h2></div>
          <p className="section-intro">A few projects that show the way I like to build: product-first, responsive, and a little obsessive about details.</p>
          <div className="project-grid">
            {portfolio.projects.map((p, index) => <article className={`project-card${flippedProjects[p.name] ? ' is-flipped' : ''}`} key={p.name}>
              <div className="project-card-inner">
                <div className="project-card-face project-card-front">
                  <div className={`project-art art-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span><b>{p.short}</b></div>
                  <div className="project-meta"><span>{p.stack}</span><span>{p.type}</span></div>
                  <h3>{p.name}</h3><p>{p.description}</p>
                  <button className="text-link" aria-pressed={Boolean(flippedProjects[p.name])} onClick={() => setFlippedProjects(prev => ({ ...prev, [p.name]: !prev[p.name] }))}>View Project <Icon name="arrow" size={15} /></button>
                </div>
                <div className="project-card-face project-card-back">
                  <span className="eyebrow">PROJECT LINK</span>
                  <h3>{p.name}</h3>
                  <p>Find more work and updates on GitHub:</p>
                  <a className="github-link" href={portfolio.contact.github} target="_blank" rel="noreferrer">
                    <strong>GitHub profile</strong>
                    <span>{portfolio.contact.github}</span>
                    <Icon name="external" size={15} />
                  </a>
                  <button className="text-link" aria-label={`Return to ${p.name} details`} onClick={() => setFlippedProjects(prev => ({ ...prev, [p.name]: false }))}>Back to details <Icon name="arrow" size={15} /></button>
                </div>
              </div>
            </article>)}
          </div>
        </section>

        <section className="content-section shell" id="clients">
          <div className="section-title"><span>04</span><h2>Clients</h2></div>
          <p className="section-intro">A small, honest client strip instead of the traditional corporate-logo parade.</p>
          <div className="client-grid">
            {portfolio.clients.map(c => <div className="client-card" key={c}><span>{c.slice(0, 2).toUpperCase()}</span><strong>{c}</strong></div>)}
          </div>
        </section>

        <section className="content-section shell contact-section" id="contact">
          <div className="section-title"><span>05</span><h2>Contact</h2></div>
          <div className="contact-grid">
            <div><p className="lead">I’m always open to internships, software engineering roles, freelance builds, and interesting collaborations.</p><div className="contact-details"><a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a><span>{portfolio.contact.location}</span></div></div>
            <div className="contact-box"><p>Send a message</p><a className="pill filled" href={`mailto:${portfolio.contact.email}?subject=Portfolio%20Enquiry`}>Let’s Connect <Icon name="arrow" size={16} /></a><div className="socials"><a href={portfolio.contact.github} target="_blank" rel="noreferrer">GitHub <Icon name="external" size={14} /></a><a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" size={14} /></a></div></div>
          </div>
        </section>
      </main>

      <footer className="footer shell"><span>© {new Date().getFullYear()} Harsh Sharma</span></footer>

      <button className="palette-trigger" onClick={() => setPaletteOpen(v => !v)} aria-label="Open style switcher"><Icon name={paletteOpen ? 'close' : 'plus'} size={18} /></button>
      {paletteOpen && <div className="palette"><div className="palette-title">Select Skin</div><button onClick={() => setLight(false)}><span className="swatch dark" />Dark</button><button onClick={() => setLight(true)}><span className="swatch light" />Light</button><button onClick={() => document.documentElement.style.setProperty('--accent', '#9ae85f')}><span className="swatch lime" />Lime</button><button onClick={() => document.documentElement.style.setProperty('--accent', '#a8a8ff')}><span className="swatch violet" />Violet</button></div>}
    </div>
  );
}

function escapeHtml(s) {
  return s.replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[c]));
}

createRoot(document.getElementById('root')).render(<App />);
