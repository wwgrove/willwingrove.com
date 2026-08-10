import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return mobile
}

// ─── Palette ─────────────────────────────────────────────────────────────────
const SILVER = '#d2d2d2'
const LIGHT = '#e8e8e8'
const DARK_GRAY = '#707070'
const MID_GRAY = '#9a9a9a'
const OFF_WHITE = '#f4f4f4'
const BLACK = '#0f0f0f'
const ACCENT = '#FF8F5E'
const ACCENT_DARK = '#c25e2a'
const PAGE_DARK = '#111111'
const CHROME = "'Tahoma', 'MS Sans Serif', Arial, sans-serif"
const BODY = "'Inter', sans-serif"

// ─── Bevel helpers ────────────────────────────────────────────────────────────
const raised: CSSProperties = {
  borderWidth: 2, borderStyle: 'solid',
  borderTopColor: OFF_WHITE, borderLeftColor: OFF_WHITE,
  borderBottomColor: DARK_GRAY, borderRightColor: DARK_GRAY,
  boxSizing: 'border-box',
}
const sunken: CSSProperties = {
  borderWidth: 2, borderStyle: 'solid',
  borderTopColor: DARK_GRAY, borderLeftColor: DARK_GRAY,
  borderBottomColor: OFF_WHITE, borderRightColor: OFF_WHITE,
  boxSizing: 'border-box',
}
const raisedSm: CSSProperties = {
  borderWidth: 1, borderStyle: 'solid',
  borderTopColor: OFF_WHITE, borderLeftColor: OFF_WHITE,
  borderBottomColor: DARK_GRAY, borderRightColor: DARK_GRAY,
  boxSizing: 'border-box',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Spec { label: string; value: string }
interface Project {
  id: string; icon: string; title: string; subtitle: string; summary: string
  boardCount: number
  processUrls: string[]; captions: string[]; specs: Spec[]
}

const PLACEHOLDER_PROCESS = [
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format',
]

const PLACEHOLDER_SPECS: Spec[] = [
  { label: 'Type', value: '—' },
  { label: 'Year', value: '—' },
  { label: 'Tools', value: '—' },
  { label: 'Status', value: '—' },
  { label: 'Context', value: '—' },
  { label: 'Team', value: '—' },
]

const PLACEHOLDER_SUMMARY =
  'Project description goes here. Describe the design challenge, your process, key decisions, and the final outcome.'

const PROJECTS: Project[] = [
  { id: 'p01', icon: '📐', title: 'Project 01', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
  { id: 'p02', icon: '📐', title: 'Project 02', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
  { id: 'p03', icon: '📐', title: 'Project 03', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
  { id: 'p04', icon: '📐', title: 'Project 04', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
  { id: 'p05', icon: '📐', title: 'Project 05', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
  { id: 'p06', icon: '📐', title: 'Project 06', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
  { id: 'p07', icon: '📐', title: 'Project 07', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
  { id: 'p08', icon: '📐', title: 'Project 08', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
  { id: 'p09', icon: '📐', title: 'Project 09', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
  { id: 'p10', icon: '📐', title: 'Project 10', subtitle: 'Project Type · Year', boardCount: 4, summary: PLACEHOLDER_SUMMARY, processUrls: PLACEHOLDER_PROCESS, captions: ['Sketch Exploration', 'Development', 'Final Render'], specs: PLACEHOLDER_SPECS },
]

// ─── BoardPlaceholder — 17×11 in ratio ───────────────────────────────────────
function BoardPlaceholder({ title, index }: { title: string; index: number }) {
  const num = String(index + 1).padStart(2, '0')
  const c = (s: CSSProperties) => <div style={{ position: 'absolute', width: 14, height: 14, ...s }} />
  return (
    <div style={{ width: '100%', aspectRatio: '17/11', background: '#f7f7f5', ...sunken, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #d0d0cc 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5 }} />
      {c({ top: 10, left: 10, borderTop: '1.5px solid #c4c4c0', borderLeft: '1.5px solid #c4c4c0' })}
      {c({ top: 10, right: 10, borderTop: '1.5px solid #c4c4c0', borderRight: '1.5px solid #c4c4c0' })}
      {c({ bottom: 10, left: 10, borderBottom: '1.5px solid #c4c4c0', borderLeft: '1.5px solid #c4c4c0' })}
      {c({ bottom: 10, right: 10, borderBottom: '1.5px solid #c4c4c0', borderRight: '1.5px solid #c4c4c0' })}
      <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontFamily: CHROME, fontSize: 9, color: '#b0b0aa', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Board {num}</div>
        <div style={{ fontFamily: BODY, fontSize: 17, fontWeight: 600, color: '#c4c4c0', letterSpacing: '-0.02em', marginBottom: 10 }}>{title}</div>
        <div style={{ display: 'inline-block', ...raisedSm, background: LIGHT, padding: '3px 10px', fontFamily: CHROME, fontSize: 9, color: MID_GRAY, letterSpacing: '0.1em' }}>17 × 11 IN · 300 DPI</div>
      </div>
      <div style={{ position: 'absolute', top: 10, left: 10, fontFamily: CHROME, fontSize: 8, color: '#c0c0bc', letterSpacing: '0.1em' }}>{num}</div>
    </div>
  )
}

// ─── ChromeBar ────────────────────────────────────────────────────────────────
function ChromeBar({ icon = '', label, onClose }: { icon?: string; label: string; onClose?: () => void }) {
  const mobile = useIsMobile()
  return (
    <div style={{ height: mobile ? 36 : 22, flexShrink: 0, background: `linear-gradient(to right, ${ACCENT_DARK} 0%, ${ACCENT} 100%)`, display: 'flex', alignItems: 'center', padding: '0 6px 0 8px', gap: 6 }}>
      {icon && <span style={{ fontSize: mobile ? 16 : 13 }}>{icon}</span>}
      <span style={{ fontFamily: CHROME, fontSize: mobile ? 13 : 11, fontWeight: 700, color: OFF_WHITE, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      {onClose ? (
        <button onClick={onClose} style={{ ...raised, width: mobile ? 32 : 16, height: mobile ? 28 : 14, background: SILVER, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', padding: 0, fontSize: mobile ? 13 : 8, fontFamily: CHROME, fontWeight: 'bold', color: ACCENT_DARK, flexShrink: 0 }}>✕</button>
      ) : (
        <div style={{ display: 'flex', gap: 3 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: mobile ? 10 : 8, height: mobile ? 10 : 8, background: SILVER, ...raisedSm }} />)}
        </div>
      )}
    </div>
  )
}

// ─── BoardViewer modal ────────────────────────────────────────────────────────
function BoardViewer({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div onClick={e => e.stopPropagation()} style={{ ...raised, background: SILVER, width: '100%', maxWidth: 760, height: '100%', maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '10px 14px 48px rgba(0,0,0,0.8)' }}>
        <ChromeBar icon={project.icon} label={`${project.title} — ${project.boardCount} Boards`} onClose={onClose} />
        <div style={{ background: LIGHT, borderBottom: `1px solid ${DARK_GRAY}`, display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px', flexShrink: 0 }}>
          <div style={{ ...raisedSm, background: SILVER, padding: '1px 8px', fontFamily: CHROME, fontSize: 10, color: '#555' }}>{project.boardCount} boards</div>
          <div style={{ ...raisedSm, background: SILVER, padding: '1px 8px', fontFamily: CHROME, fontSize: 10, color: '#555' }}>17 × 11 IN</div>
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: CHROME, fontSize: 9, color: MID_GRAY }}>scroll to view all ↓</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '24px 24px 32px', display: 'flex', flexDirection: 'column', gap: 20, background: '#1a1a1a', scrollbarWidth: 'thin' as const, scrollbarColor: `${DARK_GRAY} #111` }}>
          {Array.from({ length: project.boardCount }).map((_, i) => (
            <div key={i} style={{ flexShrink: 0 }}>
              <BoardPlaceholder title={project.title} index={i} />
              <div style={{ background: '#111', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: CHROME, fontSize: 9, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Board {String(i + 1).padStart(2, '0')}</span>
                <div style={{ flex: 1, height: 0, borderTop: '1px solid #222' }} />
                <span style={{ fontFamily: CHROME, fontSize: 9, color: '#333' }}>{project.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: SILVER, borderTop: `1px solid ${DARK_GRAY}`, display: 'flex', gap: 4, padding: '3px 4px', flexShrink: 0 }}>
          <div style={{ ...raisedSm, padding: '1px 8px', fontSize: 10, fontFamily: CHROME, color: '#555' }}>Ready</div>
          <div style={{ ...raisedSm, padding: '1px 8px', fontSize: 10, fontFamily: CHROME, color: ACCENT_DARK }}>{project.subtitle}</div>
        </div>
      </div>
    </div>
  )
}

// ─── ProfileModal ─────────────────────────────────────────────────────────────
function ProfileModal({ onClose }: { onClose: () => void }) {
  const mobile = useIsMobile()
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: mobile ? 12 : 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ ...raised, background: SILVER, width: '100%', maxWidth: 680, display: 'flex', flexDirection: 'column', boxShadow: '8px 12px 40px rgba(0,0,0,0.7)', maxHeight: '92vh', overflow: 'hidden' }}>
        <ChromeBar icon="👤" label="Will Wingrove — Profile.exe" onClose={onClose} />
        <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', overflow: 'auto', background: OFF_WHITE }}>
          <div style={{ width: mobile ? '100%' : 220, flexShrink: 0, background: PAGE_DARK, display: 'flex', flexDirection: mobile ? 'row' : 'column', alignItems: 'center', padding: mobile ? '16px' : '32px 20px 24px', gap: 16 }}>
            <div style={{ width: mobile ? 72 : 140, height: mobile ? 72 : 140, ...sunken, overflow: 'hidden', background: '#2a2a2a', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: mobile ? 28 : 48 }}>👤</span>
            </div>
            <div style={{ textAlign: mobile ? 'left' : 'center' }}>
              <div style={{ fontFamily: BODY, fontSize: 15, fontWeight: 600, color: OFF_WHITE, marginBottom: 4 }}>Will Wingrove</div>
              <div style={{ fontFamily: CHROME, fontSize: 9, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Industrial Design Student</div>
            </div>
            {!mobile && <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
              {[{ label: 'University', val: 'Carleton University' }, { label: 'Year', val: 'Fourth Year' }, { label: 'Location', val: 'Ottawa, CA · Greenwich, CT' }].map(({ label, val }) => (
                <div key={label} style={{ ...raisedSm, background: '#1e1e1e', padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: CHROME, fontSize: 9, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontFamily: BODY, fontSize: 10, color: MID_GRAY, fontWeight: 500, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>}
          </div>
          <div style={{ flex: 1, padding: mobile ? '16px' : '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
            <div>
              <div style={{ fontFamily: CHROME, fontSize: 9, color: MID_GRAY, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>About</div>
              <p style={{ fontFamily: BODY, fontSize: mobile ? 15 : 13, color: '#2a2a2a', lineHeight: 1.8, margin: '0 0 12px' }}>
                Fourth year Industrial Design student at Carleton University in Ottawa, Canada. Passionate about applying my skills to create innovative products.
              </p>
              <p style={{ fontFamily: BODY, fontSize: mobile ? 15 : 13, color: '#555', lineHeight: 1.8, margin: 0 }}>
                Outside of school, you can find me in and around Greenwich, CT bass fishing, boating, stringing lacrosse sticks, and working as a lifeguard and bartender.
              </p>
            </div>
            <div style={{ height: 0, borderTop: `1px solid ${DARK_GRAY}`, borderBottom: `1px solid ${OFF_WHITE}` }} />
            <div>
              <div style={{ fontFamily: CHROME, fontSize: 9, color: MID_GRAY, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Contact</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { label: '✉', val: 'will@thewingroves.com' },
                  { label: '✉', val: 'will.wingrove@cmail.carleton.ca' },
                  { label: '🔗', val: 'linkedin.com/in/will-wingrove' },
                ].map(({ label, val }) => (
                  <div key={val} style={{ ...raisedSm, background: LIGHT, padding: mobile ? '10px 10px' : '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 11, flexShrink: 0 }}>{label}</span>
                    <span style={{ fontFamily: BODY, fontSize: mobile ? 14 : 12, color: '#333' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: 0, borderTop: `1px solid ${DARK_GRAY}`, borderBottom: `1px solid ${OFF_WHITE}` }} />
            <div>
              <div style={{ fontFamily: CHROME, fontSize: 9, color: MID_GRAY, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>About this portfolio</div>
              <p style={{ fontFamily: BODY, fontSize: 13, color: '#555', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
                "A curated mix of academic and personal work, this collection demonstrates my design process from early sketch exploration to refined CAD and rendering, with strong emphasis on teamwork, iteration, and real-world usability."
              </p>
            </div>
          </div>
        </div>
        <div style={{ background: SILVER, borderTop: `1px solid ${DARK_GRAY}`, display: 'flex', gap: 4, padding: '3px 4px' }}>
          <div style={{ ...raisedSm, padding: '1px 8px', fontSize: 10, fontFamily: CHROME, color: '#555' }}>Ready</div>
          <div style={{ ...raisedSm, padding: '1px 8px', fontSize: 10, fontFamily: CHROME, color: ACCENT_DARK }}>Carleton University · Ottawa, CA</div>
        </div>
      </div>
    </div>
  )
}

// ─── ProfileHero ─────────────────────────────────────────────────────────────
function ProfileHero({ onOpen }: { onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)
  const mobile = useIsMobile()
  return (
    <div onClick={onOpen} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'stretch' : 'center', cursor: 'default', marginBottom: 40, ...raised, background: SILVER, overflow: 'hidden' }}
    >
      <div style={{ width: mobile ? '100%' : 120, height: mobile ? 100 : 120, flexShrink: 0, background: '#2a2a2a', position: 'relative', ...sunken, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 48, filter: hovered ? 'brightness(1.2)' : 'none', transition: 'filter 0.15s' }}>👤</span>
        {hovered && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,143,94,0.15)' }} />}
      </div>
      <div style={{ flex: 1, padding: mobile ? '12px 14px' : '14px 20px' }}>
        <div style={{ fontFamily: CHROME, fontSize: 9, color: MID_GRAY, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Industrial Design · Carleton University</div>
        <div style={{ fontFamily: BODY, fontSize: mobile ? 17 : 20, fontWeight: 600, color: BLACK, letterSpacing: '-0.02em', marginBottom: 4 }}>Will Wingrove</div>
        <div style={{ fontFamily: BODY, fontSize: 12, color: '#555', lineHeight: 1.6 }}>Ottawa, CA · Greenwich, CT · Fourth Year ID</div>
      </div>
      <div style={{ padding: mobile ? '10px 14px' : '0 20px', display: 'flex', flexDirection: mobile ? 'row' : 'column', alignItems: 'center', justifyContent: mobile ? 'flex-start' : 'center', gap: 6, borderLeft: mobile ? 'none' : `2px solid ${hovered ? ACCENT : DARK_GRAY}`, borderTop: mobile ? `1px solid ${DARK_GRAY}` : 'none', transition: 'border-color 0.15s' }}>
        <div style={{ ...raised, background: hovered ? ACCENT : SILVER, padding: '5px 14px', fontFamily: CHROME, fontSize: 10, fontWeight: 700, color: hovered ? OFF_WHITE : '#444', transition: 'background 0.1s, color 0.1s' }}>
          View Profile
        </div>
        {!mobile && <div style={{ fontFamily: CHROME, fontSize: 9, color: hovered ? ACCENT : MID_GRAY, transition: 'color 0.15s' }}>click to open</div>}
      </div>
    </div>
  )
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
type Tab = 'overview' | 'process' | 'specs'

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const [tab, setTab] = useState<Tab>('overview')
  const [boardHovered, setBoardHovered] = useState(false)
  const mobile = useIsMobile()
  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'process', label: 'Process' },
    { key: 'specs', label: 'Specs' },
  ]

  return (
    <div style={{ ...raised, background: SILVER, display: 'flex', flexDirection: 'column' }}>
      <ChromeBar icon={project.icon} label={`${project.title} — ${project.subtitle}`} />
      <div onClick={onOpen} onMouseEnter={() => setBoardHovered(true)} onMouseLeave={() => setBoardHovered(false)} style={{ position: 'relative', cursor: 'pointer' }}>
        <BoardPlaceholder title={project.title} index={index} />
        <div style={{ position: 'absolute', inset: 0, background: boardHovered ? 'rgba(194,94,42,0.12)' : 'transparent', transition: 'background 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          {boardHovered && (
            <div style={{ ...raised, background: ACCENT, padding: mobile ? '12px 24px' : '7px 18px', fontFamily: CHROME, fontSize: mobile ? 14 : 11, fontWeight: 700, color: OFF_WHITE, letterSpacing: '0.04em' }}>
              View {project.boardCount} Boards →
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', borderBottom: `1px solid ${DARK_GRAY}`, background: LIGHT, padding: '4px 4px 0' }}>
        {tabs.map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)} style={{ ...(tab === key ? sunken : raised), background: tab === key ? OFF_WHITE : SILVER, fontFamily: CHROME, fontSize: mobile ? 13 : 11, color: tab === key ? ACCENT_DARK : '#333', fontWeight: tab === key ? 700 : 400, padding: mobile ? '10px 18px' : '3px 14px', cursor: 'default', marginRight: 3, position: 'relative', top: tab === key ? 1 : 0 }}>{label}</button>
        ))}
      </div>
      <div style={{ background: OFF_WHITE, flex: 1, padding: mobile ? 20 : 16 }}>
        {tab === 'overview' && (
          <div>
            <h3 style={{ fontFamily: BODY, fontSize: mobile ? 18 : 16, fontWeight: 600, color: BLACK, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{project.title}</h3>
            <p style={{ fontFamily: CHROME, fontSize: mobile ? 11 : 9, fontWeight: 700, color: MID_GRAY, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.subtitle}</p>
            <p style={{ fontFamily: BODY, fontSize: mobile ? 15 : 13, color: '#888', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>{project.summary}</p>
          </div>
        )}
        {tab === 'process' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {project.processUrls.map((url, i) => (
              <div key={i}>
                <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#ccc', marginBottom: 5, ...sunken }}>
                  <img src={url} alt={project.captions[i]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <p style={{ fontFamily: CHROME, fontSize: 9, color: '#aaa', margin: 0, textAlign: 'center', fontStyle: 'italic' }}>{project.captions[i]}</p>
              </div>
            ))}
          </div>
        )}
        {tab === 'specs' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {project.specs.map((spec, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '6px 8px', background: Math.floor(i / 2) % 2 === 0 ? LIGHT : OFF_WHITE, borderBottom: '1px solid #e0e0e0' }}>
                <span style={{ fontFamily: CHROME, fontSize: 9, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', width: 72, flexShrink: 0 }}>{spec.label}</span>
                <span style={{ fontFamily: BODY, fontSize: 12, color: '#aaa' }}>{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 4, padding: '3px 4px', background: SILVER, borderTop: `1px solid ${DARK_GRAY}` }}>
        <div style={{ ...raisedSm, padding: '1px 8px', fontSize: 10, fontFamily: CHROME, color: '#555' }}>{project.subtitle}</div>
      </div>
    </div>
  )
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
      <span style={{ fontFamily: CHROME, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT }}>{children}</span>
      <div style={{ flex: 1, height: 0, borderTop: '1px solid #2a2a2a' }} />
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const mobile = useIsMobile()
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: SILVER, borderBottom: `2px solid ${DARK_GRAY}`, borderTop: `2px solid ${OFF_WHITE}`, boxSizing: 'border-box', display: 'flex', alignItems: 'flex-end', padding: mobile ? `env(safe-area-inset-top) 12px 0` : '0 40px', height: mobile ? 'calc(48px + env(safe-area-inset-top))' : 40, gap: 0, paddingBottom: mobile ? 0 : undefined } as CSSProperties}>
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: 6, ...raisedSm, background: PAGE_DARK, padding: mobile ? '6px 12px' : '3px 10px', marginRight: mobile ? 8 : 20, cursor: 'default', flexShrink: 0, marginBottom: mobile ? 4 : 0 }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ACCENT_DARK }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = PAGE_DARK }}
      >
        <div style={{ width: 7, height: 7, background: ACCENT, flexShrink: 0 }} />
        <span style={{ fontFamily: CHROME, fontSize: mobile ? 13 : 11, fontWeight: 700, color: OFF_WHITE, letterSpacing: '0.08em' }}>Will Wingrove</span>
      </div>
      {['Work', 'About', 'Contact'].map(item => (
        <a key={item} href={`#${item.toLowerCase()}`} style={{ fontFamily: CHROME, fontSize: mobile ? 13 : 11, color: '#333', padding: mobile ? '14px 10px' : '4px 12px', textDecoration: 'none', cursor: 'default' }}
          onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = OFF_WHITE }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#333' }}
        >{item}</a>
      ))}
      <div style={{ flex: 1 }} />
      {!mobile && (
        <div style={{ ...sunken, padding: '2px 10px', fontFamily: CHROME, fontSize: 10, color: MID_GRAY, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: ACCENT }}>●</span> Carleton University · Year 4
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const mobile = useIsMobile()
  return (
    <section style={{ background: PAGE_DARK, padding: mobile ? '60px 20px 60px' : '120px 80px 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -40, top: 60, width: 340, height: 220, opacity: 0.04, ...raised, background: SILVER }} />
      <div style={{ position: 'absolute', right: 60, bottom: 20, width: 200, height: 120, opacity: 0.06, ...raised, background: SILVER }} />
      <div style={{ maxWidth: 900, position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28, ...raisedSm, background: '#1e1e1e', padding: '4px 12px' }}>
          <span style={{ width: 6, height: 6, background: ACCENT, display: 'block' }} />
          <span style={{ fontFamily: CHROME, fontSize: 9, color: MID_GRAY, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Industrial Design · Carleton University · Ottawa</span>
        </div>
        <h1 style={{ fontFamily: BODY, fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 700, color: OFF_WHITE, margin: 0, lineHeight: 0.95, letterSpacing: '-0.04em' }}>
          Will<br /><span style={{ color: SILVER, fontWeight: 300 }}>Wingrove</span>
        </h1>
        <div style={{ width: 80, height: 3, background: ACCENT, margin: '28px 0' }} />
        <div style={{ ...sunken, background: '#1a1a1a', padding: '14px 20px', maxWidth: 580 }}>
          <p style={{ fontFamily: BODY, fontSize: 15, color: '#aaa', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>
            "A curated mix of academic and personal work, this collection demonstrates my design process from early sketch exploration to refined CAD and rendering, with strong emphasis on teamwork, iteration, and real-world usability."
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 40, flexWrap: 'wrap' }}>
          {['Fourth Year ID', 'Ottawa · Greenwich CT', 'Open to Opportunities'].map((item, i) => (
            <div key={item} style={{ ...raisedSm, background: i === 2 ? ACCENT_DARK : '#1e1e1e', padding: '4px 12px', fontFamily: CHROME, fontSize: 10, color: i === 2 ? OFF_WHITE : MID_GRAY }}>{item}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Projects section ─────────────────────────────────────────────────────────
function ProjectsSection() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [openProjectId, setOpenProjectId] = useState<string | null>(null)
  const openProject = PROJECTS.find(p => p.id === openProjectId) ?? null
  const mobile = useIsMobile()

  return (
    <>
      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
      {openProject && <BoardViewer project={openProject} onClose={() => setOpenProjectId(null)} />}

      <section id="work" style={{ background: PAGE_DARK, padding: mobile ? '40px 16px 60px' : '80px 80px 100px' }}>
        <SectionLabel>Selected Work</SectionLabel>
        <ProfileHero onOpen={() => setProfileOpen(true)} />

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(460px, 1fr))', gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setOpenProjectId(p.id)} />
          ))}
        </div>
      </section>
    </>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
const SKILLS = [
  { label: 'Sketch & Ideation', value: 'Strong' },
  { label: 'CAD Modelling', value: 'Strong' },
  { label: 'Rendering', value: 'Developing' },
  { label: 'Physical Prototyping', value: 'Strong' },
  { label: 'Design Research', value: 'Strong' },
  { label: 'Team Collaboration', value: 'Strong' },
]

function AboutSection() {
  const mobile = useIsMobile()
  return (
    <section id="about" style={{ background: LIGHT, padding: mobile ? '40px 16px 60px' : '80px 80px 100px' }}>
      <SectionLabel>About</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ ...raised, background: SILVER, padding: 0, overflow: 'hidden' }}>
          <ChromeBar icon="📄" label="about.txt — Notepad" />
          <div style={{ padding: mobile ? '20px 16px 24px' : '20px 22px 24px', background: OFF_WHITE }}>
            <p style={{ fontFamily: BODY, fontSize: mobile ? 16 : 14, color: '#222', lineHeight: 1.8, margin: '0 0 16px' }}>
              Fourth year Industrial Design student at Carleton University in Ottawa, Canada. Passionate about applying my skills to create innovative products.
            </p>
            <p style={{ fontFamily: BODY, fontSize: mobile ? 16 : 14, color: '#444', lineHeight: 1.8, margin: 0 }}>
              Outside of school, you can find me in and around Greenwich, CT bass fishing, boating, stringing lacrosse sticks, and working as a lifeguard and bartender.
            </p>
          </div>
          <div style={{ borderTop: `1px solid ${DARK_GRAY}`, display: 'flex', gap: 4, padding: 4, background: SILVER }}>
            <div style={{ ...raisedSm, padding: '1px 8px', fontSize: 10, fontFamily: CHROME, color: '#555' }}>Ready</div>
            <div style={{ ...raisedSm, padding: '1px 8px', fontSize: 10, fontFamily: CHROME, color: '#555' }}>Carleton University · Ottawa, CA</div>
          </div>
        </div>
        <div style={{ ...raised, background: SILVER, padding: 0, overflow: 'hidden' }}>
          <ChromeBar icon="⚙️" label="System Properties — Skills" />
          <div style={{ background: SILVER, padding: '10px 8px' }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${DARK_GRAY}`, marginBottom: 12 }}>
              {['Skills', 'Software', 'General'].map((t, i) => (
                <div key={t} style={{ ...(i === 0 ? sunken : raisedSm), fontFamily: CHROME, fontSize: 11, color: i === 0 ? ACCENT_DARK : '#444', fontWeight: i === 0 ? 700 : 400, background: i === 0 ? OFF_WHITE : SILVER, padding: '3px 14px', cursor: 'default', marginRight: 3, position: 'relative', top: i === 0 ? 1 : 0 }}>{t}</div>
              ))}
            </div>
            <div style={{ background: OFF_WHITE, ...sunken, padding: 0 }}>
              {SKILLS.map((s, i) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', padding: mobile ? '10px 10px' : '6px 10px', background: i % 2 === 0 ? OFF_WHITE : LIGHT, borderBottom: '1px solid #e0e0e0', gap: 8 }}>
                  <span style={{ fontFamily: CHROME, fontSize: mobile ? 12 : 10, color: '#555', width: mobile ? 180 : 160, flexShrink: 0 }}>{s.label}</span>
                  <div style={{ flex: 1, height: mobile ? 16 : 12, ...sunken, background: LIGHT, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: s.value === 'Strong' ? '82%' : '55%', background: `linear-gradient(to right, ${ACCENT_DARK}, ${ACCENT})` }} />
                  </div>
                  <span style={{ fontFamily: CHROME, fontSize: mobile ? 11 : 9, color: ACCENT_DARK, width: mobile ? 84 : 76, flexShrink: 0 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${DARK_GRAY}`, display: 'flex', gap: 4, padding: '6px 8px', background: SILVER, justifyContent: 'flex-end' }}>
            <button style={{ ...raised, background: SILVER, padding: '3px 20px', fontFamily: CHROME, fontSize: 11, cursor: 'default' }}>OK</button>
            <button style={{ ...raised, background: SILVER, padding: '3px 20px', fontFamily: CHROME, fontSize: 11, cursor: 'default' }}>Close</button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact / Footer ─────────────────────────────────────────────────────────
function ContactFooter() {
  const mobile = useIsMobile()
  return (
    <footer id="contact" style={{ background: PAGE_DARK, padding: mobile ? '40px 16px 0' : '80px 80px 0' }}>
      <SectionLabel>Contact</SectionLabel>
      <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 20, marginBottom: 60, alignItems: 'flex-start' }}>
        <div style={{ ...raised, background: SILVER, flex: 1, padding: 0, overflow: 'hidden' }}>
          <ChromeBar icon="✉️" label="New Message — Will Wingrove" />
          <div style={{ padding: '20px 20px 24px', background: OFF_WHITE }}>
            <p style={{ fontFamily: BODY, fontSize: mobile ? 16 : 14, color: '#444', lineHeight: 1.7, margin: '0 0 20px' }}>
              Open to internships, co-ops, freelance projects, and collaborative work in industrial design and product development.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: '✉ Personal', val: 'will@thewingroves.com' },
                { label: '✉ School', val: 'will.wingrove@cmail.carleton.ca' },
                { label: '🔗 LinkedIn', val: 'linkedin.com/in/will-wingrove' },
              ].map(({ label, val }) => (
                <div key={val} style={{ ...raised, background: SILVER, padding: mobile ? '10px 12px' : '6px 12px', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontFamily: CHROME, fontSize: mobile ? 12 : 10, color: ACCENT_DARK, flexShrink: 0, width: mobile ? 90 : 80 }}>{label}</span>
                  <span style={{ fontFamily: BODY, fontSize: mobile ? 14 : 13, color: '#333' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ width: mobile ? '100%' : 240, display: 'flex', flexDirection: mobile ? 'row' : 'column', flexWrap: 'wrap', gap: 12 }}>
          {[{ label: 'University', value: 'Carleton University' }, { label: 'Program', value: 'Industrial Design' }, { label: 'Year', value: 'Fourth Year' }, { label: 'Location', value: 'Ottawa, CA · Greenwich, CT' }].map(({ label, value }) => (
            <div key={label} style={{ ...raised, background: SILVER, padding: '8px 12px', flex: mobile ? '1 1 40%' : 'none' }}>
              <div style={{ fontFamily: CHROME, fontSize: 9, color: MID_GRAY, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>{label}</div>
              <div style={{ fontFamily: BODY, fontSize: 13, color: BLACK, fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '2px solid #2a2a2a', background: '#1a1a1a', display: 'flex', alignItems: 'center', height: 26 }}>
        <div style={{ ...raisedSm, background: '#222', padding: '0 16px', height: '100%', display: 'flex', alignItems: 'center', fontFamily: CHROME, fontSize: 10, color: OFF_WHITE, fontWeight: 700 }}>
          <span style={{ color: ACCENT, marginRight: 6 }}>▪</span> WINGROVE.EXE
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ ...raisedSm, background: '#222', padding: '0 12px', height: '100%', display: mobile ? 'none' : 'flex', alignItems: 'center', gap: 8, fontFamily: CHROME, fontSize: 10, color: MID_GRAY }}>
          <span>Will Wingrove · Industrial Design · Carleton University</span>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const mobile = useIsMobile()
  return (
    <div style={{ minHeight: '100vh', background: PAGE_DARK, overflowX: 'hidden', paddingTop: mobile ? 'calc(48px + env(safe-area-inset-top))' : 40 } as CSSProperties}>
      <Nav />
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ContactFooter />
    </div>
  )
}
