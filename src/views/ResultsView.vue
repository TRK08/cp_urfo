<template>
    <div class="results">
        <a-spin v-if="fetchStatus === 'loading'" size="large" style="margin: 0 auto; display: block" />
        <template v-else>
            <EmptyFiles v-if="!results.length" />
            <div v-else>
                <div class="result__charts" v-if="totalCounts">
                    <AppChart :counts="calculatePercentagesByCategories" title="Классификация по видам" />
                    <div class="result__charts-total">
                        <a-statistic title="Всего распознанных изображений" :value="totalCounts" />
                    </div>
                </div>
                <div class="results__wrap">
                    <div class="result__filters">
                        <a-input v-model:value="searchValue" placeholder="Поиск" />
                        <a-select v-model:value="filterByClass" size="large" :options="reformattedClassDict" />
                    </div>
                    <div class="result__table">
                        <AppTable :results="sortedResults" />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import AppChart from '@/components/AppChart.vue'
import AppTable from '@/components/AppTable.vue'
import EmptyFiles from '@/components/EmptyFiles.vue'
import { useResultsStore } from '@/stores/results'
import { CLASS_DICT, type TDictClass } from '@/utilities'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const { fetchAll } = useResultsStore()
const { results, fetchStatus, totalCounts, countsByCategories } = storeToRefs(useResultsStore())

const searchValue = ref('')
const filterByClass = ref<TDictClass | null>(null)

const reformattedClassDict = computed(() => {
    // @ts-ignore
    const array = Object.keys(CLASS_DICT).map((key) => ({ value: key, label: CLASS_DICT[key] }))
    return [{ value: null, label: 'Все' }, ...array]
})

const calculatePercentagesByCategories = computed(() => {
    if (!countsByCategories) return {} as Record<TDictClass, number>

    const result = {...countsByCategories.value}

    Object.entries(countsByCategories.value).forEach(([key, value]) => {
        // @ts-ignore
        result[key] = Math.round((value / totalCounts.value) * 100)
    })

    return result
})

const sortedResults = computed(() => {
    let data = [...results.value].reverse()

    if (searchValue.value) {
        data = data.filter((card) => {
            const searchString = `${card.filename} ${CLASS_DICT[card.class as TDictClass]} ${card.date}`
            return searchString.toLowerCase().includes(searchValue.value.toLowerCase())
        })
    }

    if (filterByClass.value) {
        data = data.filter((card) => card.class === Number(filterByClass.value))
    }

    return data
})

onMounted(async () => {
    await fetchAll()
})
</script>

<style lang="scss">
.result {
    &__charts {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1rem;

        &-total {
            width: 100%;
            background-color: #fff;
            display: flex;
            justify-content: center;
            padding: 1rem;
            align-items: center;
            text-align: center;
        }
    }

    &__filters {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        background-color: #fff;
        margin-bottom: 1rem;
        padding: 1rem;
    }

    &__table {
        border: 2px solid #eee;
    }
}
</style>
