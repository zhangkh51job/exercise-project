<template>
    <div>
        <el-rate
                v-model="value5"
                disabled
                show-text
                :texts="rateTexts"
                text-color="#ff9900"
                score-template="{value}">
        </el-rate>
        <!--<el-rate show-text v-model="null"></el-rate>-->

        <!--  目标列中的数据项 为 v-model 中绑定的数据项key组成的数组  -->
        <el-transfer
                style="text-align: left; display: inline-block"
                v-model="value3"
                filterable
                :left-default-checked="[2, 3]"
                :right-default-checked="[1]"
                :render-content="renderFunc"
                :titles="['Source', 'Target']"
                :button-texts="['到左边', '到右边']"
                :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
                @change="handleChange"
                :data="data">
            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
        </el-transfer>
    </div>
</template>
<script>
    export default {
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: `备选项 ${ i }`,
                        disabled: i % 4 === 0
                    });
                }
                return data;
            };

            return {
                value5: 4.5
                ,rateTexts:['a', 'b', 'c', 'd', 'e']

                ,transferData: generateData()
                ,value1: [1, 8]

                ,data: generateData(),
                value3: [1],
                value4: [1],
                renderFunc(h, option) {
                    return `<span>{ option.key } - { option.label }</span>`;
                }
            }

        },
        methods: {
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
            }
        }
    }
</script>