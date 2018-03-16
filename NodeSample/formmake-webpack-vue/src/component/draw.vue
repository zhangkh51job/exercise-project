<template>
    <div id="draw_area" >

        <!--<operate-area></operate-area>-->
        <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <pathNode v-for="data in getPaths"
                :data="data"></pathNode>
        </svg>

        <div class="operate_area">
            <node v-for="data in getNodes"
                  :data="data"></node>
        </div>

        <drawToolBar></drawToolBar>

    </div>
</template>
<script>
    import drawToolBar from './sons/drawToolBar.vue'
    import node from './sons/node.vue';
    import pathNode from './sons/path.vue';
    import { mapGetters } from 'vuex';

    export default {
        name: 'draw',
        components:{
            drawToolBar,
            node,
            pathNode
        },
        methods: {

        },
        computed: {
            /*...mapGetters({
                'nodes':getNodes
                })*/
            getNodes () {
                return this.$store.state.nodes;
            }
            ,getPaths:{
                get:function() {
                    return this.$store.state.paths;
                }
            }
        }
    }
</script>