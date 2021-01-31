<template>
  <div class="flow-container">
    <div ref="content" class="containers">
      <Toolbar :toolbar-modeler="modeler" />
      <div id="canvas" ref="canvas" class="canvas" />
      <a-tabs type="card" class="properties" size="large">
        <a-button slot="tabBarExtraContent">
          Extra Action
        </a-button>
        <a-tab-pane key="1" tab="自定义面板">
          <a-tabs size="small">
            <a-tab-pane key="1" tab="常规">
              <General :general-modeler="modeler" :element-id="elementId" />
            </a-tab-pane>
            <a-tab-pane v-if="delFormTab()" key="2" tab="表单">
              <Forms :forms-modeler="modeler" :element-id="elementId" />
            </a-tab-pane>
            <a-tab-pane key="3" tab="监听">
              <Listeners
                :listeners-modeler="modeler"
                :element-id="elementId"
                :element-listeners="elementListeners"
                @change="updateElementListener"
              />
            </a-tab-pane>
          </a-tabs>
        </a-tab-pane>
        <a-tab-pane id="properties" key="2" tab="原生面板" />
      </a-tabs>
    </div>
  </div>
</template>

<script>
import Modeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from '../descriptor/camundaDescriptor.json'
import customTranslate from '../translate/customTranslate'
import translationsCN from '../translate/zh'

import Toolbar from './toolbar'
import General from './tabs/general'
import Forms from './tabs/forms'
import Listeners from './tabs/listeners'

export default {
  name: 'Index',
  components: {
    Toolbar,
    General,
    Forms,
    Listeners
  },
  data() {
    return {
      examples: '这是this',
      activeElementBusiness: {},
      defaultZoom: 1,
      xml: '',
      prefix: 'camunda',
      modeler: null,
      mode: 'top',
      activeKey: [],
      elementListeners: [],
      elementAttributes: []

    }
  },
  computed: {
    elementId() {
      if (this.activeElementBusiness) return this.activeElementBusiness.id
      return null
    },
    elementType() {
      if (this.activeElementBusiness) return this.activeElementBusiness.type
      return null
    }
  },
  watch: {
    elementType(type) {
    },
    elementId(id) {
    },
    elementListeners(listeners) {
      console.log('elementListeners: ', listeners, 'listeners发生了变化')
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    delFormTab() {
      if (this.elementType === 'bpmn:UserTask') {
        return true
      }
    },
    changeActivekey(key) {
      console.log(key)
    },
    init() {
      // 翻译模块
      const TranslateModule = {
        translate: ['value', customTranslate(this.translations || translationsCN)]
      }
      const canvas = this.$refs.canvas
      this.modeler = new Modeler({
        container: canvas,
        propertiesPanel: {
          parent: '#properties'
        },
        additionalModules: [
          propertiesPanelModule,
          propertiesProviderModule,
          TranslateModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
      this.modeler.createDiagram().then(result => {
        const { warnings } = result
        if (warnings && warnings.length) console.warn(warnings)
        this.addModelerListener()
        this.addEventBusListener()
      }).catch(e => {
        console.error(e)
      })
    },
    // 更新事件监听器
    updateElementListener(listeners) {
      debugger
      const element = this.elementRegistry.get(this.elementId)
      const extensionElements = element.businessObject.get('extensionElements')
      // 截取不是监听器的属性
      // const otherExtensions =
      //   extensionElements?.get("values")?.filter(ex => ex.$type !== `${this.prefix}:ExecutionListener`) || [];
      const otherExtensions =
          extensionElements && extensionElements.get('values') && extensionElements.get('values').filter(ex => ex.$type !== `${this.prefix}:ExecutionListener`) || []
      // 重建扩展属性
      const extensions = this.moddle.create('bpmn:ExtensionElements', {
        values: otherExtensions.concat(listeners)
      })
      this.updateElementExtensions(element, extensions)
    },
    // 更新属性到元素
    updateElementExtensions(element, extensions, attributes) {
      this.modeling.updateProperties(element, { extensionElements: extensions })
      // 更新表单
      // this.initFormOnChanged(this.elementId,attributes);
    },
    // 监听 modeler
    addModelerListener() {
      this.modeling = this.modeler.get('modeling')
      this.moddle = this.modeler.get('moddle')
      this.eventBus = this.modeler.get('eventBus')
      this.bpmnFactory = this.modeler.get('bpmnFactory')
      this.elementRegistry = this.modeler.get('elementRegistry')
      this.replace = this.modeler.get('replace')
      this.selection = this.modeler.get('selection')

      const processElement = this.elementRegistry.find(el => el.type === 'bpmn:Process')
      this.activeElementBusiness = Object.assign({}, processElement.businessObject)
      const that = this
      // 注册事件
      const events = ['shape.added', 'shape.move.end', 'shape.removed', 'connect.end', 'connect.move']
      events.forEach(function(event) {
        that.modeler.on(event, e => {})
      })
    },
    addEventBusListener() {
      // 需要监听的事件集合
      const eventTypes = ['element.click', 'element.changed']
      // 需要使用eventBus
      const eventBus = this.modeler.get('eventBus')
      console.log(this.examples)
      const that = this
      eventTypes.forEach(function(eventType) {
        eventBus.on(eventType, 1000, function(e) {
          const elementRegistry = this.modeler.get('elementRegistry')
          // 赋值元素
          const element = elementRegistry.get(e.element.id)
          this.activeElementBusiness = element
          //  赋值监听和扩展属性
          if (element && element.businessObject && element.businessObject.extensionElements && element.businessObject.extensionElements.values) {
            this.elementListeners = element.businessObject.extensionElements.values.filter(
              ex => ex.$type === `${this.prefix}:ExecutionListener`
            )
            this.elementAttributes = element.businessObject.extensionElements.values.filter(
              ex => ex.$type === `${this.prefix}:Properties`
            )
          } else {
            this.elementListeners = []
            this.elementAttributes = []
          }
        }, that)
      })
    }
  }
}
</script>

<style scoped>

	/*左边工具栏以及编辑节点的样式*/
	@import '../../../../node_modules/bpmn-js/dist/assets/diagram-js.css';
	@import '../../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
	@import '../../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
	@import '../../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

	/*右边工具栏样式*/
	@import '../../../../node_modules/bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
	.flow-container {
		display: flex;
	}
	.containers{
		position: absolute;
		background-color: #ffffff;
		width: 100%;
		height: 100%;
	}
	.canvas{
		width: 100%;
		height: 100%;
	}
	.properties{
		position: absolute;
		right: 0;
		top: 0;
		width: 400px;
		height:100%;
		overflow-y:scroll;
	}
</style>

