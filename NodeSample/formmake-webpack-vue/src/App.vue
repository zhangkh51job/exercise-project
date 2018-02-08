<template>
    <div>
        <draw></draw>
        <nodeSet></nodeSet>
        <!--<transition :name="transitionName">
            <keep-alive>
                <router-view class="app-view" :class="{'app-view-hidden':docked}"></router-view>
            </keep-alive>
        </transition>-->
    </div>
</template>
<script>
    import draw from './component/draw.vue'
    import nodeSet from './component/nodeSet.vue'

    export default {
        name: 'App',
        components: {
            draw,
            nodeSet
        }
    }
</script>
