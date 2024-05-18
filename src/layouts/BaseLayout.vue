<template>
    <a-layout class="base-layout">
        <a-layout-header class="base-layout__header" >
            <div class="base-layout__logo" >
                <span>🚀</span>
            </div>
            <a-menu 
                class="base-layout__menu"
                v-model:selectedKeys="selectedKeys"
                mode="horizontal"
                theme="dark"
                :items="menu" 
            />
        </a-layout-header>
        <a-layout>
            <!-- <a-layout-header>
                <h2>Классификация парнокопытных</h2>
            </a-layout-header> -->
            <a-layout-content class="base-layout__content">                
                <RouterView/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import {
    DesktopOutlined,
    FileOutlined
} from '@ant-design/icons-vue'
import { computed, h, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const selectedKeys = computed({
    get() {
        return [route.path]
    },
    set() {}
})

const menu = reactive([
    {
        key: '/',
        icon: () => h(FileOutlined),
        label: 'Загрузка файлов',
        title: 'Загрузка файлов',
        onClick: () => {
            router.push('/')
        }
    },
    {
        key: '/results',
        icon: () => h(DesktopOutlined),
        label: 'Результаты',
        title: 'Результаты',
        onClick: () => {
            router.push('/results')
        }
    },
])

</script>
<style lang="scss">
.base-layout {
    position: relative;
    min-height: 100vh;
    &__logo {
        position: absolute;
        left: 15px;
        span {
            display: block;
            font-size: 2.5rem;
        }
        @media (max-width: 512px) {
            display: none;
        }
    }
    &__header {
        padding: 0 1.5rem!important;
        display: flex;
        justify-content: center;
        @media (max-width: 512px) {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    &__menu {
        .ant-menu-item {
            min-width: 180px!important;
            display: flex;
            justify-content: center;
        }
    }
    &__content {
        padding: 1.5rem;
    }

}
</style>
