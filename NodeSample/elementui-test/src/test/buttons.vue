<template>
    <div>

        <!--
            1， icon注意值：el-icon-arrow-left
            2， :loading 的方式
            3， el-radio选中意味着变量的值为相应 el-radio label属性的值
        -->
        <el-button type="primary" icon="el-icon-search">搜索</el-button>

        <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button type="primary" icon="el-icon-arrow-left">上一页<i class="el-icon-search el-icon--right"></i></el-button>

        <el-button type="primary" :loading="true">加载中</el-button>

        <el-button type="primary">上传<i class="el-icon-search el-icon--right"></i></el-button>
    </div>
</template>

<script>
    export default {
        name: 'buttons'
    }

</script>