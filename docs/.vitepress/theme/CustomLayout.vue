<script setup>
import DefaultTheme from 'vitepress/theme'
import HeroTerminal from './components/HeroTerminal.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-after>
      <HeroTerminal v-if="frontmatter.layout === 'home'" />
    </template>
  </DefaultTheme.Layout>
</template>
