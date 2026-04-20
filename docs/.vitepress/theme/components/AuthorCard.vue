<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { lang } = useData()
const isZh = computed(() => lang.value?.startsWith('zh'))
</script>

<template>
  <div class="author-card">
    <img
      src="https://avatars.githubusercontent.com/u/251626627?v=4"
      alt="Crazy Ma"
      class="avatar"
    />
    <div class="info">
      <div class="name-row">
        <a href="https://github.com/crazyma99" target="_blank" class="name">Crazy Ma</a>
        <span class="tag">@crazyma99</span>
      </div>
      <p class="bio">AI Contribution & Coding Builder</p>
      <div class="meta">
        <span>📍 China</span>
        <span>🏢 Xiaomi Corp.</span>
        <a href="https://github.com/crazyma99" target="_blank">
          <svg class="gh-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.author-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  margin-bottom: 32px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.info {
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.name {
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.name:hover { color: var(--vp-c-brand-1); }

.tag {
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--vp-c-text-3);
}

.bio {
  margin: 4px 0 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.meta {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.meta a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-text-3);
  text-decoration: none;
}
.meta a:hover { color: var(--vp-c-brand-1); }

.gh-icon {
  width: 14px;
  height: 14px;
}
</style>
