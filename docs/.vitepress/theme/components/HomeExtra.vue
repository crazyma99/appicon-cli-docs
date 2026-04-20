<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isZh = ref(false)

const commands = [
  'appicon search "WeChat" --store apple',
  'appicon download com.tencent.xin --size 512',
  'appicon setup --all',
  'appicon batch apps.json --output ./icons',
]

const displayText = ref('')
const commandIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
let timer = null

function tick() {
  const cmd = commands[commandIndex.value]
  if (!isDeleting.value) {
    displayText.value = cmd.slice(0, charIndex.value + 1)
    charIndex.value++
    if (charIndex.value >= cmd.length) {
      setTimeout(() => { isDeleting.value = true; tick() }, 2000)
      return
    }
    timer = setTimeout(tick, 50 + Math.random() * 40)
  } else {
    displayText.value = cmd.slice(0, charIndex.value)
    charIndex.value--
    if (charIndex.value < 0) {
      isDeleting.value = false
      charIndex.value = 0
      commandIndex.value = (commandIndex.value + 1) % commands.length
      timer = setTimeout(tick, 400)
      return
    }
    timer = setTimeout(tick, 25)
  }
}

onMounted(() => {
  isZh.value = lang.value?.startsWith('zh')
  tick()
})
onUnmounted(() => { if (timer) clearTimeout(timer) })

const ides = [
  { name: 'Claude Code', icon: 'https://cdn.simpleicons.org/anthropic/f0f0f2' },
  { name: 'Cursor', icon: 'https://cdn.simpleicons.org/cursor/f0f0f2' },
  { name: 'Windsurf', icon: 'https://cdn.simpleicons.org/codeium/f0f0f2' },
  { name: 'GitHub Copilot', icon: 'https://cdn.simpleicons.org/githubcopilot/f0f0f2' },
  { name: 'Kiro', icon: 'https://cdn.simpleicons.org/amazonwebservices/f0f0f2' },
  { name: 'Codex', icon: 'https://cdn.simpleicons.org/openai/f0f0f2' },
  { name: 'Qoder', icon: 'https://cdn.simpleicons.org/qwiklabs/f0f0f2' },
  { name: 'Antigravity', icon: 'https://cdn.simpleicons.org/rocket/f0f0f2' },
]
</script>

<template>
  <div class="home-extra">
    <!-- Terminal Typewriter -->
    <section class="terminal-section">
      <div class="terminal">
        <div class="terminal-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="terminal-title">Terminal</span>
        </div>
        <div class="terminal-body">
          <span class="prompt">$</span>
          <span class="command">{{ displayText }}</span>
          <span class="cursor">▌</span>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="how-section">
      <h2 class="section-title">{{ isZh ? '工作原理' : 'How it Works' }}</h2>
      <div class="flow">
        <div class="flow-step">
          <div class="step-num">1</div>
          <div class="step-icon">🔍</div>
          <div class="step-title">{{ isZh ? '搜索' : 'Search' }}</div>
          <div class="step-desc">
            <code>appicon search "WeChat"</code>
            <p>{{ isZh ? '跨 Apple / Google / 自建服务器搜索' : 'Query Apple, Google Play & custom servers' }}</p>
          </div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-num">2</div>
          <div class="step-icon">⬇️</div>
          <div class="step-title">{{ isZh ? '下载' : 'Download' }}</div>
          <div class="step-desc">
            <code>appicon download com.tencent.xin --size 512</code>
            <p>{{ isZh ? '多尺寸 PNG/JPG/WebP，Sharp 自动缩放' : 'Multi-size PNG/JPG/WebP, Sharp auto-resize' }}</p>
          </div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-num">3</div>
          <div class="step-icon">🎨</div>
          <div class="step-title">{{ isZh ? '填充到 Figma' : 'Fill in Figma' }}</div>
          <div class="step-desc">
            <code>Figma MCP → use_figma</code>
            <p>{{ isZh ? 'Claude Code 自动将图标填入设计稿' : 'Claude Code places icons into your design' }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Claude Code + Figma MCP Workflow -->
    <section class="workflow-section">
      <h2 class="section-title">{{ isZh ? 'Claude Code + Figma MCP 联动' : 'Claude Code + Figma MCP Workflow' }}</h2>
      <div class="workflow-diagram">
        <div class="workflow-box user">
          <div class="box-label">{{ isZh ? '用户提示词' : 'User Prompt' }}</div>
          <div class="box-content">"{{ isZh ? '帮我设计一个展示微信、抖音图标的页面' : 'Design a page showcasing WeChat & TikTok icons' }}"</div>
        </div>
        <div class="workflow-connector">↓</div>
        <div class="workflow-box claude">
          <div class="box-label">Claude Code</div>
          <div class="box-content">
            <code>appicon search "微信" --json</code><br>
            <code>appicon download com.tencent.xin --size 512 --json</code>
          </div>
        </div>
        <div class="workflow-connector">↓</div>
        <div class="workflow-box figma">
          <div class="box-label">Figma MCP</div>
          <div class="box-content">
            <code>use_figma → {{ isZh ? '创建画板并填充图标' : 'Create frame & fill icons' }}</code>
          </div>
        </div>
      </div>
    </section>

    <!-- Supported AI IDEs -->
    <section class="ide-section">
      <h2 class="section-title">{{ isZh ? '支持的 AI 编码工具' : 'Supported AI Coding Tools' }}</h2>
      <p class="ide-subtitle">
        <code>appicon setup --all</code>
        {{ isZh ? ' 一键配置所有平台' : ' — one command to configure all' }}
      </p>
      <div class="ide-grid">
        <div v-for="ide in ides" :key="ide.name" class="ide-card">
          <img :src="ide.icon" :alt="ide.name" class="ide-icon" loading="lazy" />
          <span class="ide-name">{{ ide.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-extra {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

.section-title {
  font-family: 'Source Serif 4', serif;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: -0.02em;
}

/* Terminal */
.terminal-section {
  margin: 60px 0 80px;
}

.terminal {
  max-width: 640px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--vp-c-divider);
}

.terminal-header {
  background: #1a1a1f;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot.red { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #28ca42; }

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #707078;
  font-family: 'JetBrains Mono', monospace;
}

.terminal-body {
  background: #0a0a0c;
  padding: 20px 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  line-height: 1.6;
  min-height: 56px;
}

.prompt {
  color: #22c55e;
  margin-right: 8px;
}

.command {
  color: #f0f0f2;
}

.cursor {
  color: var(--vp-c-brand-1);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* How it Works */
.how-section {
  margin: 80px 0;
}

.flow {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
}

.flow-step {
  flex: 1;
  max-width: 280px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  position: relative;
}

.step-num {
  position: absolute;
  top: -12px;
  left: 16px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.step-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
}

.step-desc code {
  font-size: 11px;
  background: var(--vp-c-bg-alt);
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 6px;
  word-break: break-all;
}

.step-desc p {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}

.flow-arrow {
  font-size: 24px;
  color: var(--vp-c-text-3);
  margin-top: 60px;
  flex-shrink: 0;
}

/* Workflow Diagram */
.workflow-section {
  margin: 80px 0;
}

.workflow-diagram {
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.workflow-box {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
}

.workflow-box.user { border-left: 3px solid #8b5cf6; }
.workflow-box.claude { border-left: 3px solid var(--vp-c-brand-1); }
.workflow-box.figma { border-left: 3px solid #0acf83; }

.box-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
  font-family: 'JetBrains Mono', monospace;
}

.box-content {
  font-size: 14px;
  line-height: 1.7;
}

.box-content code {
  font-size: 12px;
  background: var(--vp-c-bg-alt);
  padding: 1px 5px;
  border-radius: 3px;
}

.workflow-connector {
  font-size: 20px;
  color: var(--vp-c-text-3);
  padding: 4px 0;
}

/* AI IDEs */
.ide-section {
  margin: 80px 0;
}

.ide-subtitle {
  text-align: center;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
  font-size: 15px;
}

.ide-subtitle code {
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.ide-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 640px;
  margin: 0 auto;
}

.ide-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 12px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s, transform 0.2s;
}

.ide-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.ide-icon {
  width: 32px;
  height: 32px;
  opacity: 0.8;
}

:root:not(.dark) .ide-icon {
  filter: invert(1);
}

.ide-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-align: center;
}

@media (max-width: 640px) {
  .flow { flex-direction: column; align-items: center; }
  .flow-arrow { transform: rotate(90deg); margin: 0; }
  .ide-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
