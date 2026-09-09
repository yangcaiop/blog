<script setup lang="ts">
import { nextTick, onMounted, ref, useId, watch } from 'vue'
import { useData } from 'vitepress'
import { renderMermaid } from './mermaid'

const props = defineProps<{ code: string }>()
const { isDark } = useData()
const id = `mermaid-${useId()}`
const container = ref<HTMLDivElement>()
const svg = ref('')
const error = ref('')
const pending = ref(true)
let renderCount = 0

onMounted(() => {
  watch([() => props.code, isDark], async ([code, dark], _, onCleanup) => {
    let cancelled = false
    onCleanup(() => { cancelled = true })
    pending.value = true
    error.value = ''

    try {
      const result = await renderMermaid(`${id}-${++renderCount}`, code, dark)
      if (cancelled) return

      svg.value = result.svg
      await nextTick()
      if (cancelled || !container.value) return

      const diagram = container.value.querySelector('svg')
      if (diagram?.viewBox.baseVal.width) {
        diagram.style.width = `${diagram.viewBox.baseVal.width}px`
        diagram.style.maxWidth = 'none'
      }

      result.bindFunctions?.(container.value)
    } catch (cause) {
      if (cancelled) return
      svg.value = ''
      error.value = cause instanceof Error ? cause.message : String(cause)
    } finally {
      if (!cancelled) pending.value = false
    }
  }, { immediate: true })
})
</script>

<template>
  <figure class="mermaid-diagram" :aria-busy="pending">
    <figcaption v-if="error" class="mermaid-error" role="alert">
      图表渲染失败：{{ error }}
    </figcaption>
    <div
      v-if="svg"
      ref="container"
      class="mermaid-content"
      role="region"
      aria-label="Mermaid 图表"
      tabindex="0"
      v-html="svg"
    />
    <pre v-else class="mermaid-source"><code>{{ code }}</code></pre>
  </figure>
</template>

<style scoped>
.mermaid-diagram {
  margin: 24px 0;
}

.mermaid-content {
  max-width: 100%;
  overflow-x: auto;
  padding: 16px 0;
}

.mermaid-content :deep(svg) {
  display: block;
  height: auto;
  margin: 0 auto;
}

.mermaid-error {
  margin-bottom: 12px;
  color: var(--vp-c-danger-1);
  font-size: 14px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.mermaid-source {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  border-radius: 6px;
  background: var(--vp-code-block-bg);
}
</style>
