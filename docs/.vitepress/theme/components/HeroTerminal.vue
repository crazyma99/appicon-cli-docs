<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

onMounted(() => { tick() })
onUnmounted(() => { if (timer) clearTimeout(timer) })
</script>

<template>
  <div class="hero-terminal-wrapper">
    <div class="terminal">
      <div class="terminal-bar">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="terminal-title">Terminal</span>
      </div>
      <div class="terminal-body">
        <span class="prompt">$</span>
        <span class="typed">{{ displayText }}</span>
        <span class="caret">▌</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-terminal-wrapper {
  max-width: 640px;
  margin: 24px auto 64px;
  padding: 0 24px;
}

.terminal {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

/* shadow adapts */
.dark .terminal { box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45); }
:root:not(.dark) .terminal { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10); }

/* bar */
.terminal-bar {
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 7px;
  background: #2a2a30;
}
:root:not(.dark) .terminal-bar { background: #e4e4e8; }

.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot.red { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #28ca42; }

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: #606068;
}
:root:not(.dark) .terminal-title { color: #9a9aa0; }

/* body — always dark like a real terminal */
.terminal-body {
  background: #0e0e12;
  padding: 18px 22px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14.5px;
  line-height: 1.6;
  min-height: 52px;
}
:root:not(.dark) .terminal-body { background: #1a1a24; }

.prompt { color: #22c55e; margin-right: 8px; }
.typed { color: #e8e8ec; }
.caret { color: var(--vp-c-brand-1); animation: blink 1s step-end infinite; }

@keyframes blink { 50% { opacity: 0; } }
</style>
