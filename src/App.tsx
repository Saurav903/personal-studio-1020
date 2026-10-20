import { useMemo, useState } from 'react'
import { ArrowUpRight, Bell, ChevronRight, CircleHelp, Command, Menu, MoreHorizontal, Plus, Sparkles, X } from 'lucide-react'
import { demoEnvelopes, healthLabel, money } from './finance'

const feed: [string, string, string, number][] = [
  ['Today, 12:42', 'Lunch with team', 'Food & coffee', -420],
  ['Today, 09:16', 'Metro recharge', 'City moves', -300],
  ['Yesterday', 'NPS contribution', 'Future you', -2500],
  ['Mon, 14 Oct', 'Salary · Luma Works', 'Income', 74200],
]

export default function App() {
  const [active, setActive] = useState('Studio')
  const [extra, setExtra] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [toast, setToast] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const available = 15900 - extra
  const daily = Math.max(0, Math.round(available / 9))
  const saveScenario = () => { setToast('Scenario saved to your rehearsal shelf'); window.setTimeout(() => setToast(''), 3000) }
  const nav = ['Studio', 'Plan', 'Patterns', 'Archive']
  const activity: [string, string, string, number][] = useMemo(() => [...feed, ...(extra ? [['Just now', 'Weekend rehearsal', 'Small joys', -extra] as [string, string, string, number]] : [])], [extra])

  return <main className={isDark ? 'app dark' : 'app'}>
    <aside className={mobileNav ? 'sidebar open' : 'sidebar'} aria-label="Primary navigation">
      <div className="brand"><span className="brand-mark">1020</span><span>personal<br/><i>Studio</i></span><button className="mobile-close" aria-label="Close menu" onClick={() => setMobileNav(false)}><X size={18}/></button></div>
      <nav>{nav.map(item => <button key={item} className={active === item ? 'nav-item selected' : 'nav-item'} onClick={() => { setActive(item); setMobileNav(false) }}><span>{item === 'Studio' ? '◉' : item === 'Plan' ? '◫' : item === 'Patterns' ? '⌁' : '□'}</span>{item}</button>)}</nav>
      <div className="sidebar-bottom"><button className="nav-item"><CircleHelp size={17}/>Guide</button><div className="profile"><span className="avatar">SP</span><span><b>Saurav Patel</b><small>Personal space</small></span><MoreHorizontal size={17}/></div></div>
    </aside>
    {mobileNav && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
    <section className="page">
      <header><button className="menu" aria-label="Open menu" onClick={() => setMobileNav(true)}><Menu/></button><div><p className="eyebrow">TUESDAY · 20 OCTOBER</p><h1>{active === 'Studio' ? <>Good morning, <em>Saurav.</em></> : active}</h1></div><div className="header-actions"><button aria-label="Toggle color mode" onClick={() => setIsDark(!isDark)}><span className="theme-dot"/></button><button aria-label="Notifications" className="notification"><Bell size={19}/><i/></button><button className="command"><Command size={16}/> K</button></div></header>
      {active !== 'Studio' ? <EmptyView name={active} onReturn={() => setActive('Studio')} /> : <>
      <section className="intro"><div><p className="intro-copy">Your next pay day is in <b>9 days.</b> Here’s your gentle plan for the space between.</p><div className="runway"><span>YOUR DAILY RUNWAY</span><strong>{money(daily)}</strong><small>for the next 9 days</small><div className="runway-bar"><i style={{ width: `${Math.min(100, (daily / 2500) * 100)}%` }}/></div></div></div><button className="add-button" onClick={() => setShowAdd(true)}><Plus size={18}/>Rehearse a spend</button></section>
      <section className="cards">
        <article className="balance-card"><div className="card-label"><span>AVAILABLE TO YOU</span><button aria-label="More balance actions"><MoreHorizontal size={18}/></button></div><div className="balance">{money(available)}</div><div className="balance-foot"><span className="status-dot"/>On track for this cycle <ArrowUpRight size={16}/></div><div className="orbit o1"/><div className="orbit o2"/><div className="wave"/></article>
        <article className="focus-card"><div className="card-label"><span>THIS WEEK’S FOCUS</span><Sparkles size={17}/></div><h2>Keep Saturday<br/>light &amp; lovely.</h2><p>You’ve kept enough room for a slow weekend. Try a ₹1,800 rehearsal.</p><button onClick={() => { setExtra(1800); setToast('Saturday rehearsal applied') }}>Try it <ChevronRight size={16}/></button><div className="sun"/></article>
      </section>
      <section className="workspace"><div className="section-title"><div><p className="eyebrow">YOUR SPACES</p><h2>Money, with a little more meaning.</h2></div><button className="text-button" onClick={() => setToast('All spaces are already in view')}>See all <ChevronRight size={16}/></button></div><div className="envelopes">{demoEnvelopes.map(item => { const left = item.allocated - item.spent; return <article key={item.name} className="envelope"><div className={`envelope-icon ${item.tone}`}>{item.icon}</div><div className="envelope-main"><h3>{item.name}</h3><p>{money(left)} left of {money(item.allocated)}</p><div className="progress"><i style={{ width: `${item.spent / item.allocated * 100}%` }}/></div></div><button aria-label={`Open ${item.name}`}><ChevronRight size={17}/></button></article>})}</div></section>
      <section className="activity"><div className="section-title"><div><p className="eyebrow">A LITTLE HISTORY</p><h2>Recent movement</h2></div><button className="text-button">View archive <ChevronRight size={16}/></button></div><div className="feed">{activity.map(([date, title, category, amount], idx) => <div className="feed-row" key={`${title}-${idx}`}><div className={`feed-icon ${amount > 0 ? 'income' : ''}`}>{amount > 0 ? '↓' : idx === 0 ? '◒' : idx === 1 ? '↗' : '◌'}</div><div><b>{title}</b><p>{date} · {category}</p></div><strong className={amount > 0 ? 'positive' : ''}>{amount > 0 ? '+' : '−'}{money(Math.abs(amount))}</strong></div>)}</div></section>
      <footer><span>Made for real life, not perfect spreadsheets.</span><span>Cycle 14 Oct — 13 Nov</span></footer>
      </>}
    </section>
    {showAdd && <div className="modal-wrap" role="dialog" aria-modal="true" aria-labelledby="rehearse-title"><div className="modal"><button className="modal-close" aria-label="Close dialog" onClick={() => setShowAdd(false)}><X size={19}/></button><p className="eyebrow">SPEND REHEARSAL</p><h2 id="rehearse-title">Give the weekend a number.</h2><p>Move the dial to see what a planned moment changes in your daily runway.</p><label htmlFor="spend">Planned spend <output>{money(extra)}</output></label><input id="spend" type="range" min="0" max="6000" step="100" value={extra} onChange={e => setExtra(Number(e.target.value))}/><div className="modal-result"><span>New daily runway</span><b>{money(daily)} <small>/ day</small></b><em>{healthLabel(daily)}</em></div><button className="save-button" onClick={() => { setShowAdd(false); saveScenario() }}>Save rehearsal</button></div></div>}
    {toast && <div className="toast" role="status">✦ {toast}</div>}
  </main>
}

function EmptyView({ name, onReturn }: { name: string; onReturn: () => void }) { return <div className="empty"><span>✦</span><h2>{name} is taking shape.</h2><p>This quiet corner is ready for your next finance ritual.</p><button className="add-button" onClick={onReturn}>Back to Studio</button></div> }
