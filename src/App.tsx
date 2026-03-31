import './App.css'

import { useEffect, useMemo, useRef, useState } from 'react'

type CountdownPreset = 0 | 3 | 5

type Settings = {
  speed: number // 0.5x - 2.0x
  fontSizePx: number // 28 - 72
  lineHeight: number // 1.2 - 2.0
  widthPercent: number // 60 - 100
  countdown: CountdownPreset
  mirror: boolean
}

const STORAGE_KEYS = {
  script: 'teleprompter.script.v1',
  settings: 'teleprompter.settings.v1',
} as const

const DEFAULT_SCRIPT = `大家好，歡迎使用提詞器。

這是一個純前端 MVP：可貼上稿件、倒數後開始滾動、可調速度與字級。

快捷鍵：Space 暫停/播放、↑/↓ 調速度、F 焦點模式、M 鏡像、Esc 退出焦點模式。`

const DEFAULT_SETTINGS: Settings = {
  speed: 1.0,
  fontSizePx: 48,
  lineHeight: 1.5,
  widthPercent: 80,
  countdown: 3,
  mirror: false,
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function parseStoredSettings(raw: string | null): Settings | null {
  if (!raw) return null
  try {
    const v = JSON.parse(raw) as Partial<Settings>
    const countdown =
      v.countdown === 0 || v.countdown === 3 || v.countdown === 5 ? v.countdown : null
    if (countdown === null) return null
    return {
      speed: clamp(Number(v.speed ?? DEFAULT_SETTINGS.speed), 0.5, 2.0),
      fontSizePx: clamp(Number(v.fontSizePx ?? DEFAULT_SETTINGS.fontSizePx), 28, 72),
      lineHeight: clamp(Number(v.lineHeight ?? DEFAULT_SETTINGS.lineHeight), 1.2, 2.0),
      widthPercent: clamp(Number(v.widthPercent ?? DEFAULT_SETTINGS.widthPercent), 60, 100),
      countdown,
      mirror: Boolean(v.mirror ?? DEFAULT_SETTINGS.mirror),
    }
  } catch {
    return null
  }
}

function App() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const teleprompterViewportRef = useRef<HTMLDivElement | null>(null)
  const focusViewportRef = useRef<HTMLDivElement | null>(null)
  const paragraphRefs = useRef<Array<HTMLParagraphElement | null>>([])

  const [script, setScript] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.script)
    return stored && stored.trim().length > 0 ? stored : DEFAULT_SCRIPT
  })

  const [settings, setSettings] = useState<Settings>(() => {
    const stored = parseStoredSettings(localStorage.getItem(STORAGE_KEYS.settings))
    return stored ?? DEFAULT_SETTINGS
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [countdownLeft, setCountdownLeft] = useState<number | null>(null)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [activeParagraphIdx, setActiveParagraphIdx] = useState<number>(0)
  const [progress, setProgress] = useState(0)

  const paragraphs = useMemo(() => {
    const normalized = script.replace(/\r\n/g, '\n')
    const parts = normalized
      .split(/\n\s*\n/g)
      .map((s) => s.trim())
      .filter(Boolean)
    return parts.length > 0 ? parts : ['']
  }, [script])

  const computeAndSetProgress = () => {
    const el = (isFocusMode ? focusViewportRef.current : teleprompterViewportRef.current) ?? null
    if (!el) return
    const max = Math.max(1, el.scrollHeight - el.clientHeight)
    setProgress(clamp((el.scrollTop / max) * 100, 0, 100))
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.script, script)
  }, [script])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    if (!isFocusMode) return
    const onFsChange = () => {
      const fsEl = document.fullscreenElement
      if (!fsEl) setIsFocusMode(false)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [isFocusMode])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key
      if (key === ' ') {
        e.preventDefault()
        togglePlay()
        return
      }
      if (key === 'ArrowUp') {
        e.preventDefault()
        setSettings((s) => ({ ...s, speed: clamp(Number((s.speed + 0.1).toFixed(1)), 0.5, 2.0) }))
        return
      }
      if (key === 'ArrowDown') {
        e.preventDefault()
        setSettings((s) => ({ ...s, speed: clamp(Number((s.speed - 0.1).toFixed(1)), 0.5, 2.0) }))
        return
      }
      if (key === 'f' || key === 'F') {
        e.preventDefault()
        void enterOrExitFocus()
        return
      }
      if (key === 'm' || key === 'M') {
        e.preventDefault()
        setSettings((s) => ({ ...s, mirror: !s.mirror }))
        return
      }
      if (key === 'Escape' && isFocusMode) {
        e.preventDefault()
        void exitFocus()
      }
    }
    window.addEventListener('keydown', onKeyDown, { passive: false })
    return () => window.removeEventListener('keydown', onKeyDown as EventListener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocusMode, isPlaying, settings.countdown])

  useEffect(() => {
    if (countdownLeft === null) return
    if (countdownLeft <= 0) {
      setCountdownLeft(null)
      setIsPlaying(true)
      return
    }
    const t = window.setTimeout(() => setCountdownLeft((n) => (n === null ? null : n - 1)), 1000)
    return () => window.clearTimeout(t)
  }, [countdownLeft])

  useEffect(() => {
    if (!isPlaying) return
    const el = (isFocusMode ? focusViewportRef.current : teleprompterViewportRef.current) ?? null
    if (!el) return

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.max(0, (now - last) / 1000)
      last = now

      const max = Math.max(0, el.scrollHeight - el.clientHeight)
      if (el.scrollTop >= max - 1) {
        setIsPlaying(false)
        return
      }

      const pxPerSec = 40 * settings.speed
      el.scrollTop = Math.min(max, el.scrollTop + pxPerSec * dt)
      updateActiveParagraph()
      computeAndSetProgress()
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, settings.speed, paragraphs.length, settings.fontSizePx, settings.lineHeight])

  const updateActiveParagraph = () => {
    const viewport = (isFocusMode ? focusViewportRef.current : teleprompterViewportRef.current) ?? null
    if (!viewport) return
    const midY = viewport.scrollTop + viewport.clientHeight * 0.35

    const refs = paragraphRefs.current
    for (let i = 0; i < refs.length; i++) {
      const p = refs[i]
      if (!p) continue
      const top = p.offsetTop
      const bottom = top + p.offsetHeight
      if (midY >= top && midY <= bottom) {
        setActiveParagraphIdx(i)
        return
      }
    }
  }

  const requestImport = () => fileInputRef.current?.click()

  const onImportFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    setScript(text)
    e.target.value = ''
  }

  const onClear = () => setScript('')

  const restart = () => {
    const el = (isFocusMode ? focusViewportRef.current : teleprompterViewportRef.current) ?? null
    if (el) el.scrollTop = 0
    setActiveParagraphIdx(0)
    setIsPlaying(false)
    setCountdownLeft(null)
    setProgress(0)
  }

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      setCountdownLeft(null)
      return
    }
    if (countdownLeft !== null) {
      setCountdownLeft(null)
      return
    }
    const c = settings.countdown
    if (c > 0) {
      setCountdownLeft(c)
      return
    }
    setIsPlaying(true)
  }

  const enterFocus = async () => {
    setIsFocusMode(true)
    const root = document.documentElement
    if (!document.fullscreenElement && root.requestFullscreen) {
      try {
        await root.requestFullscreen()
      } catch {
        // ignore
      }
    }
  }

  const exitFocus = async () => {
    setIsFocusMode(false)
    if (document.fullscreenElement && document.exitFullscreen) {
      try {
        await document.exitFullscreen()
      } catch {
        // ignore
      }
    }
  }

  const enterOrExitFocus = async () => {
    if (isFocusMode) return exitFocus()
    return enterFocus()
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__title">Teleprompter</div>
        <div className="topbar__actions">
          <button className={`btn ${isFocusMode ? 'btn--primary' : ''}`} onClick={() => void enterOrExitFocus()}>
            焦點模式
          </button>
          <button
            className={`btn ${settings.mirror ? 'btn--secondary' : ''}`}
            onClick={() => setSettings((s) => ({ ...s, mirror: !s.mirror }))}
          >
            鏡像
          </button>
        </div>
      </header>

      <div className="status">
        <div className="countdown">{countdownLeft !== null ? `倒數 ${countdownLeft}s` : ''}</div>
        <div className="progress" aria-label="播放進度">
          <div className="progress__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <main className="content">
        <section className="panel" aria-label="稿件編輯">
          <div className="panel__header">
            <div className="panel__title">稿件</div>
            <div className="panel__headerActions">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,text/plain"
                onChange={onImportFile}
                style={{ display: 'none' }}
              />
              <button className="btn" onClick={requestImport}>
                匯入TXT
              </button>
              <button className="btn btn--secondary" onClick={() => localStorage.setItem(STORAGE_KEYS.script, script)}>
                儲存本機
              </button>
              <button className="btn" onClick={onClear}>
                清空
              </button>
            </div>
          </div>
          <textarea
            className="editor"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="在此貼上或輸入你的稿件…"
          />
        </section>

        <section className="panel panel--teleprompter" aria-label="提詞器預覽">
          <div className="panel__header">
            <div className="panel__title">提詞器</div>
            <div className="panel__headerActions">
              <div className="valuePill">{isPlaying ? '播放中' : countdownLeft !== null ? '倒數中' : '已暫停'}</div>
            </div>
          </div>
          <div
            className="teleprompterViewport"
            ref={teleprompterViewportRef}
            onScroll={() => {
              if (!isPlaying) updateActiveParagraph()
              computeAndSetProgress()
            }}
          >
            <div
              className={`teleprompterSurface ${settings.mirror ? 'teleprompterSurface--mirror' : ''}`}
              style={{
                maxWidth: `${settings.widthPercent}%`,
              }}
            >
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  ref={(el) => {
                    paragraphRefs.current[idx] = el
                  }}
                  className={`tpParagraph ${idx === activeParagraphIdx ? 'tpParagraph--active' : ''}`}
                  style={{
                    fontSize: `${settings.fontSizePx}px`,
                    lineHeight: settings.lineHeight,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section className="controls" aria-label="設定與控制">
        <div className="controlGrid">
          <div className="field">
            <label htmlFor="speed">速度</label>
            <div className="fieldRow">
              <input
                id="speed"
                type="range"
                min={0.5}
                max={2.0}
                step={0.1}
                value={settings.speed}
                onChange={(e) => setSettings((s) => ({ ...s, speed: Number(e.target.value) }))}
              />
              <div className="valuePill">{settings.speed.toFixed(1)}x</div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="fontSize">字級</label>
            <div className="fieldRow">
              <input
                id="fontSize"
                type="range"
                min={28}
                max={72}
                step={1}
                value={settings.fontSizePx}
                onChange={(e) => setSettings((s) => ({ ...s, fontSizePx: Number(e.target.value) }))}
              />
              <div className="valuePill">{settings.fontSizePx}px</div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="lineHeight">行距</label>
            <div className="fieldRow">
              <input
                id="lineHeight"
                type="range"
                min={1.2}
                max={2.0}
                step={0.05}
                value={settings.lineHeight}
                onChange={(e) => setSettings((s) => ({ ...s, lineHeight: Number(e.target.value) }))}
              />
              <div className="valuePill">{settings.lineHeight.toFixed(2)}</div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="width">寬度</label>
            <div className="fieldRow">
              <input
                id="width"
                type="range"
                min={60}
                max={100}
                step={1}
                value={settings.widthPercent}
                onChange={(e) => setSettings((s) => ({ ...s, widthPercent: Number(e.target.value) }))}
              />
              <div className="valuePill">{settings.widthPercent}%</div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="countdown">倒數</label>
            <div className="fieldRow">
              <select
                id="countdown"
                value={settings.countdown}
                onChange={(e) => setSettings((s) => ({ ...s, countdown: Number(e.target.value) as CountdownPreset }))}
              >
                <option value={0}>0s</option>
                <option value={3}>3s</option>
                <option value={5}>5s</option>
              </select>
              <div className="valuePill">預設</div>
            </div>
          </div>
        </div>

        <div className="buttons">
          <button className={`btn btn--big ${isPlaying ? 'btn--warning' : 'btn--secondary'}`} onClick={togglePlay}>
            {isPlaying ? '暫停' : '開始'}
          </button>
          <button className="btn btn--big" onClick={restart}>
            重新開始
          </button>
        </div>
      </section>

      <footer className="shortcut" aria-label="快捷鍵提示">
        <span className="kbd">Space</span>開始/暫停
        <span className="kbd">↑</span>/<span className="kbd">↓</span>速度
        <span className="kbd">F</span>焦點模式
        <span className="kbd">M</span>鏡像
        <span className="kbd">Esc</span>退出
      </footer>

      {isFocusMode ? (
        <div className="focusOverlay" role="dialog" aria-label="焦點模式">
          <div className="focusOverlay__top">
            <div className="valuePill">{isPlaying ? '播放中' : countdownLeft !== null ? '倒數中' : '已暫停'}</div>
            <button className="btn focusOverlay__exit" onClick={() => void exitFocus()}>
              退出
            </button>
          </div>
          <div
            className="teleprompterViewport"
            ref={focusViewportRef}
            onScroll={() => {
              if (!isPlaying) updateActiveParagraph()
              computeAndSetProgress()
            }}
            style={{ padding: '46px 22px' }}
          >
            <div
              className={`teleprompterSurface ${settings.mirror ? 'teleprompterSurface--mirror' : ''}`}
              style={{
                maxWidth: `${settings.widthPercent}%`,
              }}
            >
              {paragraphs.map((p, idx) => (
                <p
                  key={`focus-${idx}`}
                  ref={(el) => {
                    paragraphRefs.current[idx] = el
                  }}
                  className={`tpParagraph ${idx === activeParagraphIdx ? 'tpParagraph--active' : ''}`}
                  style={{
                    fontSize: `${settings.fontSizePx}px`,
                    lineHeight: settings.lineHeight,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
