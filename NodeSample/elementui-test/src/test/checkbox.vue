<template>
    <div>
        <el-checkbox-group v-model="checkList" >
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" disabled></el-checkbox>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>

            <!--
            带输入建议的 文本输入组件： el-autocomplete

            -->

            <el-input-number v-model="num3" :step="2" size="mini"></el-input-number><br>

            <el-select v-model="value6" placeholder="请选择">
                <el-option
                        v-for="item in cities"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
            </el-select>
        </el-checkbox-group>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                checkList: ['选中且禁用','复选框 A']
                ,num3: 2
                ,cities: [{
                    value: 'Beijing',
                    label: '北京'
                }, {
                    value: 'Shanghai',
                    label: '上海'
                }, {
                    value: 'Nanjing',
                    label: '南京'
                }, {
                    value: 'Chengdu',
                    label: '成都'
                }, {
                    value: 'Shenzhen',
                    label: '深圳'
                }, {
                    value: 'Guangzhou',
                    label: '广州'
                }]
                ,value6: ''
            };
        }
    };
</script>