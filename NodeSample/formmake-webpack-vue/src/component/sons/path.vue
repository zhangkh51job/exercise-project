<template>
    <g xmlns="http://www.w3.org/2000/svg">
        <path class="path" :start-anchor="data['start-anchor']"  :startX="data['startX']" :startY="data['startY']" :attachStartId="data['attachStartId']" :end-anchor="data['end-anchor']"
              :attachEndId="data['attachEndId']" :endX="data['endX']" :endY="data['endY']" :d="data['path-str']"></path>
        <path class="lt" :d="data['path-lt']"></path>
        <path class="rb" :d="data['path-rb']"></path>
    </g>
</template>
<script>
    export default{
        name:'pathNode',
        props:{
            data: Object
        },
        mounted: function(){
            console.log('pathNode', this.data['path-str']);
        },
        updated: function () {
            console.log( 'updating...' );
        }
    }

</script>