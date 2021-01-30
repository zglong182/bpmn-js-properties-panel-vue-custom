<template>
  <div class="flow-container">
    <div ref="content" class="containers">
      <Toolbar :toolbar-modeler="modeler" />
      <div id="canvas" ref="canvas" class="canvas" />
      <a-tabs type="card" class="properties" size="large">
        <a-tab-pane key="1" tab="自定义面板">
          <a-tabs size="small">
            <a-tab-pane key="1" tab="常规">
              <General :general-modeler="modeler" :element-id="elementId" />
            </a-tab-pane>
            <a-tab-pane key="2" tab="表单" force-render>
              <Forms />
            </a-tab-pane>
            <a-tab-pane key="3" tab="扩展">
              这是扩展
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

// import Custom from './custom'
import Toolbar from './toolbar'
import General from './tabs/general'
import Forms from './tabs/forms'

export default {
  name: 'Index',
  components: {
    // Custom,
    Toolbar,
    General,
    Forms
  },
  data() {
    return {
      examples: '这是this',
      activeElementBusiness: {},
      defaultZoom: 1,
      xml: '',
      modeler: null,
      mode: 'top',
      activeKey: [],
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`

    }
  },
  computed: {
    elementId() {
      if (this.activeElementBusiness) return this.activeElementBusiness.id
      return null
    }
  },
  watch: {
    elementType(type) {
      console.log('selectionElementType: ', type)
    },
    elementId(id) {
      console.log('selectionElementId: ', id, '节点id发生了变化')
    }
  },
  mounted() {
    this.init()
  },
  methods: {

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
    // 添加绑定事件
    addBpmnListener() {
      const that = this
      // 获取a标签dom节点
      const downloadLink = this.$refs.saveBpmn
      const downloadSvgLink = this.$refs.saveSvg
      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.modeler.on('commandStack.changed', function() {
        that.saveSVG(function(err, svg) {
          that.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg)
        })
        that.saveDiagram(function(err, xml) {
          that.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
        })
      })
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG(done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.modeler.saveSVG(done)
    },
    // 下载为bpmn格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.modeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml)
      })
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data)
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      //   console.log(link, name, data)
      //   console.log(xmlFile)
      if (data) {
        link.className = 'active'
        link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
        link.download = name
      }
    },
    // 监听 modeler
    addModelerListener() {
      this.modeling = this.modeler.get('modeling')
      /* ElementRegistry 图形注册表
      * 用于追踪所有元素。注入了EventBus事件总线
      * */
      this.elementRegistry = this.modeler.get('elementRegistry')
      const processElement = this.elementRegistry.find(el => el.type === 'bpmn:Process')
      this.activeElementBusiness = Object.assign({}, processElement.businessObject)
      const bpmnjs = this.modeler
      const that = this
      // 这里我是用了一个forEach给modeler上添加要绑定的事件
      const events = ['shape.added', 'shape.move.end', 'shape.removed', 'connect.end', 'connect.move']
      events.forEach(function(event) {
        that.modeler.on(event, e => {
          console.log(event, e)
          var elementRegistry = bpmnjs.get('elementRegistry')
          var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
          console.log(shape)
        })
      })
    },
    addEventBusListener() {
      const eventTypes = ['element.click', 'element.changed'] // 需要监听的事件集合
      const eventBus = this.modeler.get('eventBus') // 需要使用eventBus
      console.log(this.examples)
      const that = this
      eventTypes.forEach(function(eventType) {
        eventBus.on(eventType, 1000, function(e) {
          if (!e || e.element.type === 'bpmn:Process') {
            this.submit(e.element.id)
          } else if (eventType === 'element.click') {
            console.log('点击了element:' + e.element.id)
            this.submit(e.element.id)
          }
        }, that)
      })
    },
    submit(elementId) {
      const ElementRegistry = this.modeler.get('elementRegistry')
      this.activeElementBusiness = ElementRegistry.get(elementId)
      console.log('--------------------+++++++++++++!!!!!!!!!!!', elementId)
    },
    // 更新常规信息
    updateBaseInfo(key, value) {
      const shape = this.elementRegistry.get(this.elementId)
      const attrObj = {}
      attrObj[key] = value
      this.modeling.updateProperties(shape, attrObj)
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

