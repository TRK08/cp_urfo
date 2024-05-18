<template>
    <div>
        <a-table :columns="columns" :dataSource="results" :scroll="{ y: '75vh' }" :pagination="false" size="small">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'path'">
                    <span>{{column.name}}</span>
                </template>
            </template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'path' ">
                    <img :src="record.path" :alt="CLASS_DICT[record.class as TDictClass]" style="width: 40px; height: 40px;">
                </template>
                <template v-if="column.key === 'class' ">
                    {{ CLASS_DICT[record.class as TDictClass] }}
                </template>
                <template v-if="column.key === 'date' ">
                    {{ record.date.toLocaleString('ru-RU') }}
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
import type { IResult } from '@/types';
import { CLASS_DICT, type TDictClass } from '@/utilities';

type TProps = {
    results: IResult[]
}

defineProps<TProps>()

const columns = [
  {
    name: 'Фото',
    dataIndex: 'path',
    key: 'path',
    align: 'end',
    width: 100
  },
  {
    title: 'Класс',
    dataIndex: 'class',
    key: 'class',
    align: 'center'
  },
  {
    title: 'Название файла',
    dataIndex: 'filename',
    key: 'filename',
    align: 'center'
  },
  {
    title: 'Дата',
    key: 'date',
    dataIndex: 'date',
    align: 'center'
  },
];

</script>

<style lang="scss">
.ant-table-cell {
    vertical-align: middle!important;
}
</style>