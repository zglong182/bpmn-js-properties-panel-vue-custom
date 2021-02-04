<template>
  <div class="general">
    <a-collapse v-model="activeKey" @change="changeActivekey">
      <template #expandIcon="props">
        <a-icon type="minus" style="color: #40a9ff" :rotate="props.isActive ? 90 : 0" />
      </template>
      <!-- 常规信息-->
      <a-collapse-panel header="常规信息">
        <label v-if="elementType === 'bpmn:StartEvent'">开始</label>
        <label v-else-if="elementType === 'bpmn:Process'">流程</label>
        <label v-else-if="elementType === 'bpmn:SequenceFlow'">连线</label>
        <label v-else-if="elementType === 'bpmn:Task'">任务</label>
        <label v-else-if="elementType === 'bpmn:UserTask'">任务</label>
        <label v-else-if="elementType === 'bpmn:ExclusiveGateway'">网关</label>
        <label v-else-if="elementType === 'bpmn:EndEvent'">结束</label>标识：
        <a-input
          v-model="activeElementBusiness.id"
          :size="this.size"
          disabled
          @change="updateBaseInfo('id', activeElementBusiness.id)"
        />
        <br><br>
        <label v-if="elementType === 'bpmn:StartEvent'">开始</label>
        <label v-else-if="elementType === 'bpmn:Process'">流程</label>
        <label v-else-if="elementType === 'bpmn:SequenceFlow'">连线</label>
        <label v-else-if="elementType === 'bpmn:Task'">任务</label>
        <label v-else-if="elementType === 'bpmn:UserTask'">任务</label>
        <label v-else-if="elementType === 'bpmn:ExclusiveGateway'">网关</label>
        <label v-else-if="elementType === 'bpmn:EndEvent'">结束</label>名称：
        <a-input
          v-model="activeElementBusiness.name"
          :size="this.size"
          @change="updateBaseInfo('name', activeElementBusiness.name)"
        />
        <label v-if="elementType === 'bpmn:Process'">
          <br><br>
          流程标签：
          <a-input
            v-model="activeElementBusiness.versionTag"
            :size="this.size"
            @change="updateBaseInfo('versionTag', activeElementBusiness.versionTag)"
          />
          <br><br>
          流程类型：
          <a-input
            v-model="activeElementBusiness.type"
            :size="this.size"
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
      <!-- 详细信息 -->
      <a-collapse-panel
        v-if="elementType === 'bpmn:UserTask'"
        header="详细信息"
      >
        处理人：
        <a-input
          v-model="activeElementBusiness.assignee"
          :size="this.size"
          @change="updateBaseInfo('assignee', activeElementBusiness.assignee)"
        />
        <br><br>
        候选人：
        <a-input
          v-model="activeElementBusiness.candidateUsers"
          :size="this.size"
          @change="updateBaseInfo('candidateUsers', activeElementBusiness.candidateUsers)"
        />
        <br><br>
        候选组：
        <a-input
          v-model="activeElementBusiness.candidateGroups"
          :size="this.size"
          @change="updateBaseInfo('candidateGroups', activeElementBusiness.candidateGroups)"
        />
        <br><br>
        优先级：
        <a-input
          v-model="activeElementBusiness.priority"
          :size="this.size"
          @change="updateBaseInfo('priority', activeElementBusiness.priority)"
        />
        <br><br>
        到期时间：
        <a-input
          v-model="activeElementBusiness.dueDate"
          :size="this.size"
          @change="updateBaseInfo('dueDate', activeElementBusiness.dueDate)"
        />
        <br><br>
        跟踪日期：
        <a-input
          v-model="activeElementBusiness.followUpDate"
          :size="this.size"
          @change="updateBaseInfo('followUpDate', activeElementBusiness.followUpDate)"
        />

      </a-collapse-panel>
      <!-- 持续异步-->
      <a-collapse-panel
        v-if="elementType === 'bpmn:Task' || elementType === 'bpmn:UserTask'"
        header="持续异步"
      >
        <a-radio-group
          v-model="activeElementBusiness.asyncBefore"
          default-value="true"
          @change="updateBaseInfo('asyncBefore', activeElementBusiness.asyncBefore)"
        >
          异步前：
          <a-space size="large">
            <a-radio value="true">是</a-radio>
            <a-radio value="false">否</a-radio>
          </a-space>
        </a-radio-group>
        <a-radio-group
          v-model="activeElementBusiness.asyncAfter"
          default-value="true"
          @change="updateBaseInfo('asyncAfter', activeElementBusiness.asyncAfter)"
        >
          异步后：
          <a-space size="large">
            <a-radio value="true">是</a-radio>
            <a-radio value="false">否</a-radio>
          </a-space>
        </a-radio-group>
        <a-radio-group
          v-if="activeElementBusiness.asyncAfter === 'true' || activeElementBusiness.asyncBefore === 'true'"
          v-model="activeElementBusiness.exclusive"
          default-value="true"
          @change="updateBaseInfo('exclusive', activeElementBusiness.exclusive)"
        >
          排除：
          <a-space size="large">
            <a-radio value="true">是</a-radio>
            <a-radio value="false">否</a-radio>
          </a-space>
        </a-radio-group>
      </a-collapse-panel>
      <!-- 任务配置-->
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="任务配置"
      >
        任务优先级：
        <a-input
          v-model="activeElementBusiness.taskPriority"
          :size="this.size"

          @change="updateBaseInfo('taskPriority', activeElementBusiness.taskPriority)"
        />
      </a-collapse-panel>
      <!-- 工作配置-->
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="工作配置"
      >
        工作优先级：
        <a-input
          v-model="activeElementBusiness.jobPriority"
          :size="this.size"

          @change="updateBaseInfo('jobPriority', activeElementBusiness.jobPriority)"
        />
      <!-- TODO 重试周期 extensionElements -->
      </a-collapse-panel>
      <!-- 启动配置-->
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="启动配置"
      >
        启动候选组：
        <a-input
          v-model="activeElementBusiness.candidateStarterGroups"
          :size="this.size"

          @change="updateBaseInfo('candidateStarterGroups', activeElementBusiness.candidateStarterGroups)"
        />
        <br><br>
        启动候选人：
        <a-input
          v-model="activeElementBusiness.candidateStarterUsers"
          :size="this.size"

          @change="updateBaseInfo('candidateStarterUsers', activeElementBusiness.candidateStarterUsers)"
        />
      </a-collapse-panel>
      <!-- 历史配置-->
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="历史配置"
      >
        历史生存时间：
        <a-input
          v-model="activeElementBusiness.historyTimeToLive"
          :size="this.size"

          @change="updateBaseInfo('historyTimeToLive', activeElementBusiness.historyTimeToLive)"
        />
      </a-collapse-panel>
      <!-- Task配置-->
      <a-collapse-panel
        v-if="elementType === 'bpmn:Process'"
        header="Task配置"
      >
        任务列表启动：
        <a-input
          v-model="activeElementBusiness.isStartableInTasklist"
          :size="this.size"

          @change="updateBaseInfo('isStartableInTasklist', activeElementBusiness.isStartableInTasklist)"
        />
      </a-collapse-panel>
      <!-- 备注信息-->
      <a-collapse-panel
        header="备注信息"
      >
        备注内容：
        <a-textarea
          pv-model="documentation"
          auto-size
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
      documentation: '',
      size: 'small'
    }
  },
  computed: {

  },
  watch: {
    elementId(newVal, oldVar) {
      console.log('general的elementId发生了变化')
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
  .general  input{
      width: 60%;
  }
</style>
