<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Test Table and Chart</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen scroll-events>
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Test Table and Chart</ion-title>
                </ion-toolbar>
            </ion-header>

            <TablePinned
                ref="refTable"
                :refresh-reference="list"
            >
                <table class="table table-bordered table-striped table-hover table-header-gradient w-100 mt-2 fix-column-table">
                    <thead>
                        <tr>
                            <th
                                fixed-columns-left
                                fixed-corners-left
                            >
                                #
                            </th>
                            <th
                                fixed-columns-left
                                fixed-corners-left
                            >
                                col1
                            </th>
                            <th>
                                col2
                            </th>
                            <th>
                                col3
                            </th>
                            <th>
                                col4
                            </th>
                            <th>
                                col5
                            </th>
                            <th>
                                col6
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in list" :key="i.id">
                            <td fixed-columns-left>
                                {{i.id}}
                            </td >
                            <td fixed-columns-left>
                                {{i.col1}}
                            </td>
                            <td>
                                {{i.col2}}
                            </td>
                            <td>
                                {{i.col3}}
                            </td>
                            <td>
                                {{i.col4}}
                            </td>
                            <td>
                                {{i.col5}}
                            </td>
                            <td>
                                {{i.col6}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </TablePinned>
            <div class="mt-2" id="chart-container">
                <canvas ref="chartElem" />
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
    ref,
    watch,
} from 'vue';
import _ from 'lodash';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/vue';
import TablePinned from '@/components/TablePinned.vue';
import Chart from 'chart.js/auto';

const list = ref(_.times(10).map(row => ({
    id: `row ${row}`,
    col1: `${row}: 1`.repeat(2),
    col2: `${row}: 2`.repeat(2),
    col3: `${row}: 3`.repeat(2),
    col4: `${row}: 4`.repeat(2),
    col5: `${row}: 5`.repeat(2),
    col6: `${row}: 6`.repeat(2),
})));

const data = [
    {year: 2010, count: 10},
    {year: 2011, count: 20},
    {year: 2012, count: 15},
    {year: 2013, count: 25},
    {year: 2014, count: 22},
    {year: 2015, count: 30},
    {year: 2016, count: 28},
];

const chartElem = ref();
watch(chartElem, () => {
    // const ctx = chartElem.value.getContext('2d');
    console.log('new chart');

    new Chart(
        chartElem.value,
        {
            type: 'bar',
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count)
                    }
                ]
            }
        }
    );
});
</script>
<style lang="scss" scoped>
table.fix-column-table {
    td {
        width: 15rem;
        white-space: nowrap;
        word-break: keep-all;
    }
}
div#chart {
    height: 30rem;
}
</style>
