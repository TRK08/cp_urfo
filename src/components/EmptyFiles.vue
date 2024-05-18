<template>
    <a-result title="Архив результатов пуст. Загрузите файлы">
    <template #icon>
        <UploadOutlined />
    </template>
    <template #extra>
      <a-button type="primary" size="large" @click="router.push('/')">Перейти к странице загрузки</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {UploadOutlined} from '@ant-design/icons-vue'

const router = useRouter()

</script>

<style lang="scss">

</style>