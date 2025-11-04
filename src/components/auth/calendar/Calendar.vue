<template>
<div>
    <div class="row px-3">
        <div class="col-12 text-center pt-10">
            <strong>{{ $t('message.my_calendar') }}</strong>
        </div>
    </div>

    <div class="row px-3">
        <div class="col-12">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                {{ $t('message.course') }}
                            </th>
                            <th class="text-left">
                                {{ $t('message.remaining_days') }}
                            </th>
                            <th class="text-left">
                                {{ $t('message.start_date') }}
                            </th>
                            <th class="text-left">
                                {{ $t('message.end_date') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in fechas" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.days }}</td>
                            <td>{{ item.start }}</td>
                            <td>{{ item.end }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>

    <div class="row px-3">
        <div class="col-12">
            <v-sheet height="400">
                <v-calendar ref="calendar" :now="today" :value="today" :events="fechas" color="primary" type="week"></v-calendar>
            </v-sheet>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            fechas: [],
        }
    },
    methods: {
        async getFechas() {
            await this.$axios.post(`/sst-clients/user/fechas`).then((response) => {
                this.fechas = response.data;
            })
        },
    },
    mounted() {
        this.getFechas();
    }
}
</script>
