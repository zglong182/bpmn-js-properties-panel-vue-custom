<template>
  <div>
    <a-row>
      <a-col :span="1" />
      <a-col :span="23">
        <a-space :size="40">
          <a-button-group>
            <a-button size="small" type="primary" @click="importModal">
              <a-icon type="left" /><a-icon type="upload" />导入
            </a-button>
            <a-dropdown>
              <a-button size="small" type="primary">
                <a-icon type="download" />下载
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="saveBpmn('svg')">下载SVG</a-menu-item>
                  <a-menu-item @click="saveBpmn('bpmn')">下载BPMN</a-menu-item>
                  <a-menu-item @click="saveBpmn('xml')">下载XML</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-button size="small" type="primary" @click="showModal">
              <a-icon type="code" />预览<a-icon type="right" />
            </a-button>
          </a-button-group>
          <a-button-group>
            <a-button size="small" type="primary" @click="processZoomIn">
              <a-icon type="left" /><a-icon type="zoom-in" />放大
            </a-button>
            <a-button size="small" type="primary" @click="processReZoom">
              <a-icon type="reload" />
            </a-button>
            <a-button size="small" type="primary" @click="processZoomOut">
              缩小<a-icon type="zoom-out" /><a-icon type="right" />
            </a-button>
          </a-button-group>
          <a-button-group>
            <a-button size="small" type="primary" @click="importModal">
              <a-icon type="left" /> <a-icon type="save" />暂存
            </a-button>
            <a-button size="small" type="primary" @click="importModal">
              <a-icon type="deployment-unit" />部署
            </a-button>
            <a-button size="small" type="primary" @click="importModal">
              <a-icon type="sync" />同步
            </a-button>
            <a-button size="small" type="primary" @click="importModal">
              <a-icon type="history" />回退
            </a-button>
            <a-button ghost size="small" type="primary" @click="importModal">
              <a-icon type="delete" />清空<a-icon type="right" />
            </a-button>
          </a-button-group>
        </a-space>
      </a-col>
    </a-row>

    <!--预览home-->
    <a-modal
      v-model="visible"
      title="预览XML"
      keyboard
      centered
      width="80%"
    >
      <pre v-highlightjs="this.showXml"><code class="application/javascript" /></pre>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">关闭</a-button>
      </template>
    </a-modal>
    <!--预览end-->
  </div>
</template>

<script>
// import 'highlight.js/styles/gradient-light.css'
// import 'highlight.js/styles/dracula.css'
import 'highlight.js/styles/monokai-sublime.css'
import { message } from 'ant-design-vue'
export default {
  name: 'Toolbar',
  components: {
  },
  props: {
    toolbarModeler: Object
  },
  data() {
    return {
      defaultZoom: 1,
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      showXml: ''
    }
  },
  methods: {
    /* 打开modal*/
    showModal() {
      this.visible = true
      this.previewProcessXML()
    },
    handleCancel() {
      this.visible = false
    },
    importModal() {
      message.warning('敬请期待')
    },
    /* 放大视图*/
    processZoomIn() {
      this.defaultZoom = Math.floor(this.defaultZoom * 10 + 1) / 10
      this.toolbarModeler.get('canvas').zoom(this.defaultZoom)
    },
    /* 缩小视图*/
    processZoomOut() {
      this.defaultZoom = Math.floor(this.defaultZoom * 10 - 1) / 10
      this.toolbarModeler.get('canvas').zoom(this.defaultZoom)
    },
    /* 重置视图*/
    processReZoom() {
      this.defaultZoom = 1
      this.toolbarModeler.get('canvas').zoom('fit-viewport', 'auto')
    },
    /* 预览xml*/
    previewProcessXML() {
      this.toolbarModeler.saveXML({ format: true }).then(({ xml }) => {
        console.log(xml)
        this.showXml = xml
      })
    },
    /* 载为SVG*/
    saveSVG(done) {
      this.toolbarModeler.saveSVG(done)
    },
    /* 下载为bpmn*/
    async saveBpmn(type) {
      if (type === 'xml' || type === 'bpmn') {
        const { err, xml } = await this.toolbarModeler.saveXML()
        // 读取异常时抛出异常
        if (err) {
          return console.error(err)
        }
        const { href, filename } = this.setEncoded(type.toUpperCase(), xml)
        this.downloadFunc(href, filename)
      } else {
        const { err, svg } = await this.toolbarModeler.saveSVG()
        // 读取异常时抛出异常
        if (err) {
          return console.error(err)
        }
        const { href, filename } = this.setEncoded('SVG', svg)
        this.downloadFunc(href, filename)
      }
    },
    /* 根据所需类型进行转码并返回下载地址*/
    setEncoded(type, data) {
      const encodedData = encodeURIComponent(data)
      const businessObject = this.toolbarModeler.get('elementRegistry').find(el => el.type === 'bpmn:Process').businessObject
      console.log()
      return {
        filename: businessObject.id + `.${type}`,
        href: `data:application/${type === 'svg' ? 'text/xml' : 'bpmn20-xml'};charset=UTF-8,${encodedData}`,
        data: data
      }
    },
    /* 下载文件 */
    downloadFunc(href, filename) {
      if (href && filename) {
        const a = document.createElement('a')
        a.download = filename // 指定下载的文件名
        a.href = href //  URL对象
        a.click() // 模拟点击
        URL.revokeObjectURL(a.href) // 释放URL 对象
      }
    }
  }
}
</script>

<style scoped>

</style>
