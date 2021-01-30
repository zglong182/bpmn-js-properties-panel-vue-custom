<template>
  <div>

    <a-collapse v-model="activeKey" @change="changeActivekey">
      <template #expandIcon="props">
        <a-icon type="minus" :rotate="props.isActive ? 90 : 0" />
      </template>
      <a-collapse-panel header="常规信息">

        <label v-if="elementType === 'bpmn:StartEvent'">开始</label>
        <label v-else-if="elementType === 'bpmn:Process'">流程</label>
        <label v-else-if="elementType === 'bpmn:SequenceFlow'">连线</label>
        <label v-else-if="elementType === 'bpmn:Task'">任务</label>
        <label v-else-if="elementType === 'bpmn:ExclusiveGateway'">网关</label>
        <label v-else-if="elementType === 'bpmn:EndEvent'">结束</label>标识：
        <a-input
          v-model="activeElementBusiness.id"
          size="small"
          disabled
          @change="updateBaseInfo('id', activeElementBusiness.id)"
        />
        <br><br>
        <label v-if="elementType === 'bpmn:StartEvent'">开始</label>
        <label v-else-if="elementType === 'bpmn:Process'">流程</label>
        <label v-else-if="elementType === 'bpmn:SequenceFlow'">连线</label>
        <label v-else-if="elementType === 'bpmn:Task'">任务</label>
        <label v-else-if="elementType === 'bpmn:ExclusiveGateway'">网关</label>
        <label v-else-if="elementType === 'bpmn:EndEvent'">结束</label>名称：
        <a-input
          v-model="activeElementBusiness.name"
          size="small"

          @change="updateBaseInfo('name', activeElementBusiness.name)"
        />
        <br><br>
        <label v-if="elementType === 'bpmn:Process'">
          流程标签：
          <a-input
            v-model="activeElementBusiness.versionTag"
            size="small"

            @change="updateBaseInfo('versionTag', activeElementBusiness.versionTag)"
          />
          <br><br>
          流程类型：
          <a-input
            v-model="activeElementBusiness.type"
            size="small"

            @change="updateBaseInfo('type', activeElementBusiness.type)"
          />
          <br><br>
          <a-radio-group
            v-model="activeElementBusiness.isExecutable"
            default-value="true"
            @change="updateBaseInfo('isExecutable', activeElementBusiness.isExecutable)"
          >
            可执行：
            <a-space size="large">
              <a-radio value="true">是</a-radio>
              <a-radio value="false">否</a-radio>
            </a-space>
          </a-radio-group>
        </label>
      </a-collapse-panel>
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="任务配置"
      >
        任务优先级：
        <a-input
          v-model="activeElementBusiness.taskPriority"
          size="small"

          @change="updateBaseInfo('taskPriority', activeElementBusiness.taskPriority)"
        />
      </a-collapse-panel>
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="工作配置"
      >
        工作优先级：
        <a-input
          v-model="activeElementBusiness.jobPriority"
          size="small"

          @change="updateBaseInfo('jobPriority', activeElementBusiness.jobPriority)"
        />
      </a-collapse-panel>
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="启动配置"
      >
        候选组：
        <a-input
          v-model="activeElementBusiness.candidateStarterGroups"
          size="small"

          @change="updateBaseInfo('candidateStarterGroups', activeElementBusiness.candidateStarterGroups)"
        />
        <br><br>
        候选人：
        <a-input
          v-model="activeElementBusiness.candidateStarterUsers"
          size="small"

          @change="updateBaseInfo('candidateStarterUsers', activeElementBusiness.candidateStarterUsers)"
        />
      </a-collapse-panel>
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="历史配置"
      >
        历史生存时间：
        <a-input
          v-model="activeElementBusiness.historyTimeToLive"
          size="small"

          @change="updateBaseInfo('historyTimeToLive', activeElementBusiness.historyTimeToLive)"
        />
      </a-collapse-panel>
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="Task配置"
      >
        任务列表启动：
        <a-input
          v-model="activeElementBusiness.isStartableInTasklist"
          size="small"

          @change="updateBaseInfo('isStartableInTasklist', activeElementBusiness.isStartableInTasklist)"
        />
      </a-collapse-panel>
      <a-collapse-panel
        header="备注"
      >
        备注信息：
        <a-input
          v-model="documentation"
          size="small"
          @change="updateDocumentation"
        />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
  name: 'General',
  props: {
    generalModeler: Object,
    elementId: String
  },
  data() {
    return {
      activeElementBusiness: {},
      elementType: '',
      activeKey: [],
      documentation: ''
    }
  },
  computed: {

  },
  watch: {
    elementId(newVal, oldVar) {
      this.elementRegistry = this.generalModeler.get('elementRegistry')
      this.modeling = this.generalModeler.get('modeling')
      this.bpmnFactory = this.generalModeler.get('bpmnFactory')
      const element = this.elementRegistry.get(newVal)
      this.elementType = element.type
      this.activeElementBusiness = Object.assign({}, element.businessObject)
      // 备注
      const shapeDoc = element.businessObject.documentation
      // 设置备注
      // this.documentation = shapeDoc && shapeDoc.length ? shapeDoc[0]?.text : ''
      this.documentation = shapeDoc && shapeDoc.length ? shapeDoc[0] && shapeDoc[0].text : ''
    }
  },
  methods: {
    changeActivekey(key) {
      console.log(key)
    },
    // 更新常规信息
    updateBaseInfo(key, value) {
      debugger
      const shape = this.elementRegistry.get(this.elementId)
      const attrObj = {}
      attrObj[key] = value
      this.modeling.updateProperties(shape, attrObj)
    },
    // 更新元素文档
    updateDocumentation() {
      const element = this.elementRegistry.get(this.elementId)
      const documentation = this.bpmnFactory.create('bpmn:Documentation', { text: this.documentation })
      this.modeling.updateProperties(element, {
        documentation: [documentation]
      })
    }
  }
}
</script>

<style scoped>

</style>
