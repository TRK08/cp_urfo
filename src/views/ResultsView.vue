<template>
    <div class="results">
        <EmptyFiles v-if="!results.length" />
        <div v-else class="results__wrap">
            <div class="result__filters">
                <a-input v-model:value="searchValue" placeholder="Поиск" />
                <a-select 
                    v-model:value="filterByClass"
                    size="large"
                    :options="reformattedClassDict" 
                />
            </div>
            <div>
                Результаты
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import EmptyFiles from '@/components/EmptyFiles.vue'
import { useResultsStore } from '@/stores/results';
import { CLASS_DICT, type TDictClass } from '@/utilities'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'

const {results} = storeToRefs(useResultsStore())

const searchValue = ref('')
const filterByClass = ref<TDictClass | null>(null)

const reformattedClassDict = computed(() => {
    // @ts-ignore
    const array =  Object.keys(CLASS_DICT).map(key => ({ value: key, label: CLASS_DICT[key] }))
    return [
        { value: null, label: 'Все' },
        ...array
    ]
})

</script>

<style lang="scss">
.result {
    &__filters {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        background-color: #fff;
        margin-bottom: 3rem;
        padding: 1rem;
    }
}
</style>