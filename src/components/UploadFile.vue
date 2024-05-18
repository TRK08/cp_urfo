<template>
    <div class="upload-file">
        <a-upload-dragger
            v-model:fileList="fileList"
            :accept="`image/png, image/jpeg, image/jpg, .zip`"
            name="file"
            :multiple="true"
            :show-upload-list="false"
            :custom-request="sendUploadedFile"
            :disabled="isLoading"
        >
            <div style="height: 200px; display: flex; align-items: center; justify-content: center">
                <div v-if="!isLoading">
                    <p class="ant-upload-drag-icon">
                        <inbox-outlined></inbox-outlined>
                    </p>
                    <p class="ant-upload-text">Кликните или перетащите файл для загрузки</p>
                    <p class="ant-upload-hint">
                        Доступные форматы файлов для загрузки: .png, .jpg, .jpeg, .zip
                    </p>
                </div>
                <a-spin v-else :spinning="isLoading" />
            </div>
        </a-upload-dragger>
    </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import { Button, notification } from 'ant-design-vue'
import axios from 'axios'
import { getFileExt } from '@/utilities'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useResultsStore } from '@/stores/results'

const {results} = storeToRefs(useResultsStore())

const baseUrl = import.meta.env.VITE_BASE_URL;
const router = useRouter()
const fileList = ref([])
const isLoading = ref(false)

const sendUploadedFile = async (file: any) => {
    isLoading.value = true
    const fileExt = getFileExt(file.file.name)

    if (fileExt === 'zip') {
        await loadZipArchive(file)
    } else {
        await loadSingleFile(file)
    }
}

const loadZipArchive = async (file: any) => {
    try {
        const body = new FormData()
        body.append('file', file.file)

        const {data} = await axios.post(`${baseUrl}/uploadzip`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (data.results) {
            results.value = [...data.results, ...results.value]
        }

        isLoading.value = false
        const key = `open${Date.now()}`
        notification.success({
            message: 'Файл успешно загружен',
            duration: 5,
            btn: () =>
                h(
                    Button,
                    {
                        type: 'primary',
                        size: 'small',
                        onClick: () => {
                            router.push('/results')
                            notification.close(key)
                        },
                    },
                    { default: () => 'Перейти к результатам' },
                ),
            key
        })

    } catch (e) {
        isLoading.value = false
        console.log(e)
        notification.error({
            message: 'Ошибка при загрузке файла',
            duration: 2
        })
    }
}

const loadSingleFile = async (file: any) => {
    try {
        const body = new FormData()
        body.append('file', file.file)
        const {data} = await axios.post(`${baseUrl}/uploadfile`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (data) {
            results.value.push(data)
        }

        isLoading.value = false
        const key = `open${Date.now()}`
        notification.success({
            message: 'Файл успешно загружен',
            duration: 5,
            btn: () =>
                h(
                    Button,
                    {
                        type: 'primary',
                        size: 'small',
                        onClick: () => {
                            router.push('/results')
                            notification.close(key)
                        },
                    },
                    { default: () => 'Перейти к результатам' },
                ),
            key
        })

    } catch (e) {
        isLoading.value = false
        console.log(e)
        notification.error({
            message: 'Ошибка при загрузке файла',
            duration: 2
        })
    }
}
</script>

<style lang="scss">
.upload-file {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
