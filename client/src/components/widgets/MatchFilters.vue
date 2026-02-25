<script setup>
import { storeToRefs } from 'pinia';
import { useMatchStore } from '../../stores/useMatchStore';
import Selector from '../base/Selector.vue';
import { TEAM_OPTS, UTILITY_OPTS } from '../../constants';

const store = useMatchStore();
const { selectedUtility, selectedTeam } = storeToRefs(store);
</script>

<template>
    <div>
        <h3>Filter</h3>
        <table>
            <tbody>
                <tr>
                    <td>Utility Type</td>
                    <td>  
                        <Selector
                            v-model="selectedUtility"
                            :options="UTILITY_OPTS"/>
                    </td>
                </tr>
                <tr>
                    <td>Faction</td>
                    <td>
                        <Selector
                            v-model="selectedTeam"
                            :options="TEAM_OPTS"/>
                    </td>
                </tr>  
            </tbody>
        </table>
    </div>
    
</template>

<style scoped>

</style>