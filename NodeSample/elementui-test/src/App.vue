<template>
    <div>

        <buttons></buttons>
        <checkbox :style="styleObject"></checkbox>
        <cascader></cascader>

        <uploads></uploads>
        <rates></rates>

        <tables></tables>

        <paginations></paginations>
    </div>

</template>
<script>
    import buttons from './test/buttons.vue'
    import checkbox from './test/checkbox.vue'
    import cascader from './test/cascader.vue'
    import uploads from './test/uploads.vue'
    import rates from './test/rates.vue'
    import tables from './test/tables.vue'
    import paginations from './test/paginations.vue'

    export default {
        name: 'App',
        data(){
            return{
                styleObject: {"margin-top": "20px"}
            }
        },
        components: {
            buttons,
            checkbox,
            cascader,
            uploads,
            rates,
            tables,
            paginations
        }
    }
</script>
