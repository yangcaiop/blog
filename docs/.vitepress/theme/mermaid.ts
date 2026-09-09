import type { RenderResult } from 'mermaid'

let renderQueue: Promise<unknown> = Promise.resolve()

export function renderMermaid(
  id: string,
  source: string,
  dark: boolean
): Promise<RenderResult> {
  // Mermaid shares global configuration, so initialize and render together.
  const result = renderQueue.then(async () => {
    const { default: mermaid } = await import('mermaid')

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      suppressErrorRendering: true,
      theme: dark ? 'dark' : 'default',
      fontFamily: 'var(--vp-font-family-base)'
    })

    return mermaid.render(id, source)
  })

  renderQueue = result.catch(() => undefined)
  return result
}
