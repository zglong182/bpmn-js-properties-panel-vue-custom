<template>
  <div class="listeners">
    <a-card size="small" title="执行监听">
      <a slot="extra" type="plus" href="#" @click="openListenerDrawer"><a-icon type="plus-circle" /></a>
      <a-empty
        v-if="ownerListenersList.length === 0"
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }"
      >
        <span slot="description">当前监听为空</span>
        <a-button type="primary" @click="openListenerDrawer">
          点击创建
        </a-button>
      </a-empty>
      <a-list
        v-else
        :locale="noData"
        size="small"
        item-layout="horizontal"
        :data-source="ownerListenersList"
      >
        <a-list-item slot="renderItem" slot-scope="item,index">
          <a slot="actions">编辑</a>
          <a slot="actions" @click="removeListener(item,index)">删除</a>
          <a-list-item-meta :title="item.event" class="ant-list-item-meta">
            <template slot="description">
              <label v-if="item.class">Java类<br>{{ item.class }}</label>
              <label v-else-if="item.expression">表达式<br>{{ item.expression }}</label>
              <label v-else-if="item.delegateExpression">代理表达式<br>{{ item.delegateExpression }}</label>
              <label v-else-if="item.script">脚本<br>{{ item.expression }}</label>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
    <br>
    <a-card size="small" title="任务监听">
      <a slot="extra" type="plus" href="#" @click="openListenerDrawer"><a-icon type="plus-circle" /></a>
    </a-card>
    <a-card size="small" title="字段注入">
      <a slot="extra" type="plus" href="#" @click="openListenerDrawer"><a-icon type="plus-circle" /></a>
    </a-card>

    <a-drawer
      title="创建执行监听"
      width="40%"
      placement="right"
      :keyboard="false"
      :mask-closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="closeListenerDrawer"
    >
      <a-form :form="listenerForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="事件类型" required>
          <a-select
            v-decorator="[
              listenerForm.event,
              { rules: [{ required: true, message: '事件类型不能为空' }] },
            ]"
            default-value="start"
            placeholder="请选择事件类型"
          >
            <a-select-option value="start">start</a-select-option>
            <a-select-option value="end">end</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="监听器类型" required>
          <a-select
            v-decorator="[
              listenerForm.listenerType,
              { rules: [{ required: true, message: '监听器类型不能为空' }] },
            ]"
            placeholder="请选择监听器类型"
            @change="handleSelectChange"
          >
            <a-select-option value="Java类">Java类</a-select-option>
            <a-select-option value="表达式">表达式</a-select-option>
            <a-select-option value="代理表达式">代理表达式</a-select-option>
            <a-select-option value="脚本">脚本</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <template slot="label">
            <label>{{ listenerTypeTitle }}</label>
          </template>
          <a-input
            v-if="listenerTypeTitle === 'Java类'"
            v-decorator="[listenerForm.class, { rules: [{ required: true, message: 'Please input your note!' }] }]"
            allow-clear
          />
          <a-input
            v-else-if="listenerTypeTitle === '表达式'"
            v-decorator="[listenerForm.expression, { rules: [{ required: true, message: 'Please input your note!' }] }]"
            allow-clear
          />
          <a-input
            v-else-if="listenerTypeTitle === '代理表达式'"
            v-decorator="[listenerForm.delegateExpression, { rules: [{ required: true, message: 'Please input your note!' }] }]"
            allow-clear
          />
          <a-input
            v-else-if="listenerTypeTitle === '脚本'"
            v-decorator="[listenerForm.script.scriptFormat, { rules: [{ required: true, message: 'Please input your note!' }] }]"
            allow-clear
          />
        </a-form-item>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-popconfirm
          title="当前监听未保存,确认关闭?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="closeListenerDrawer"
          @cancel="closeListenerDrawer"
        >
          <a-button style="marginRight: 8px">关闭</a-button>
        </a-popconfirm>
        <a-button type="primary" @click="handleSubmit">保存</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>

export default {
  name: 'Listeners',
  props: {
    listenersModeler: Object,
    elementId: String,
    elementListeners: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      noData: { emptyText: '暂无监听' },
      elementType: '',
      listenerTypeTitle: 'Java类',
      size: 'small',
      ownerListenersList: [],
      ownerListenersObjectList: [],
      visible: false,
      listenerForm: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  watch: {
    elementListeners(newVal, oldVar) {
      console.log('listeners的listeners发生了变化')
      if (newVal.length) {
        this.ownerListenersObjectList = newVal
        this.ownerListenersList = newVal.map(li => {
          let listenerType
          if (li.class) listenerType = 'classListener'
          if (li.expression) listenerType = 'expressionListener'
          if (li.delegateExpression) listenerType = 'delegateExpressionListener'
          if (li.script) listenerType = 'scriptListener'
          return {
            ...li,
            listenerType: listenerType
          }
        })
      } else {
        this.ownerListenersObjectList = []
        this.ownerListenersList = []
      }
      console.log(this.ownerListenersList)
    },
    /* 进入之后更改节点时给activeElementBusiness赋值*/
    elementId(newVal, oldVar) {
      console.log('listeners的elementId发生了变化')
    }
  },
  /* 第一次进入给activeElementBusiness赋值*/
  created() {
    if (this.elementListeners.length) {
      this.ownerListenersObjectList = this.elementListeners
      this.ownerListenersList = this.elementListeners.map(li => {
        let listenerType
        if (li.class) listenerType = 'classListener'
        if (li.expression) listenerType = 'expressionListener'
        if (li.delegateExpression) listenerType = 'delegateExpressionListener'
        if (li.script) listenerType = 'scriptListener'
        return {
          ...li,
          listenerType: listenerType
        }
      })
    } else {
      this.ownerListenersObjectList = []
      this.ownerListenersList = []
    }
  },
  methods: {
    handleSubmit(e) {
      console.log(1111)
      debugger
      e.preventDefault()
      this.listenerForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleSelectChange(value) {
      if (value === 'Java类') {
        this.listenerTypeTitle = 'Java类'
      } else if (value === '表达式') {
        this.listenerTypeTitle = '表达式'
      } else if (value === '代理表达式') {
        this.listenerTypeTitle = '代理表达式'
      } else {
        this.listenerTypeTitle = '脚本'
      }
    },
    afterVisibleChange(val) {
      console.log('visible', val)
    },
    /* 删除监听*/
    removeListener(listener, index) {
      debugger
      const removedListener = this.ownerListenersList.splice(index, 1)
      this.$emit('remove-listener', removedListener)
      this.$emit('change', this.ownerListenersList)
    },
    /* 打开监听创建抽屉*/
    openListenerDrawer() {
      this.visible = true
    },
    /* 关闭监听创建抽屉*/
    closeListenerDrawer() {
      this.visible = false
    }
  }
}
</script>

<style scoped>
  .listeners  input{
    width: 60%;
  }
  >>> .ant-list-item-meta {
    display: flex;
    flex: 1;
    align-items: flex-start;
    font-size: 0;
    width: 60%;
  }
</style>
