<template>
    <div id="node_set_id">
        <div class="tab-select">
            <div class="node-tab active">节点设置</div>
            <div class="flow-tab">流程设置</div>
        </div>
        <div class="set-tab node-set">
            <label for="stepName">步骤名称</label>
            <input type="text" id="stepName" name="stepName">

            <label for="approveName">审批人</label>
            <input type="text" id="approveName" name="approveName">

            <label for="approvePost">审批岗位</label>
            <input type="text" id="approvePost" name="approvePost">

            <label for="copyName">抄送人</label>
            <input type="text" id="copyName" name="copyName">

            <label for="copyPost">抄送岗位</label>
            <input type="text" id="copyPost" name="copyPost">

            <label for="copyVarible">抄送变量</label>
            <textarea id="copyVarible" name="copyVarible"></textarea>

            <label for="countersign">是否会签步骤</label>
            <select id="countersign" name="countersign">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>

            <label for="minCountersign">最少会签人数</label>
            <input type="text" id="minCountersign" name="minCountersign">

            <label for="isSave">无审批人是否保留</label>
            <select id="isSave" name="minCountersign">
                <option>保留1</option>
                <option>不保留2</option>
            </select>
        </div>
        <div class="set-tab line-set">
            <label for="conditionExpression">步骤条件表达式</label>
            <textarea id="conditionExpression" name="conditionExpression"></textarea>

            <label for="conditionDescribe">条件描述</label>
            <input type="text" id="conditionDescribe" name="conditionDescribe">
        </div>
        <div class="set-tab flow-set">

        </div>
    </div>
</template>
<script>
    export default {
        name: 'nodeSet'

    }
</script>