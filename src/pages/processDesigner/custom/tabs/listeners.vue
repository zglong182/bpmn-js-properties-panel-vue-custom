<template>
  <div class="listeners">
    <a-card size="small" title="执行监听">
      <a slot="extra" type="plus" href="#" @click="openListenerDrawer('创建','','')"><a-icon type="plus-circle" /></a>
      <a-empty
        v-if="ownerListenersList.length === 0"
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }"
      >
        <span slot="description">当前监听为空</span>
        <a-button type="primary" @click="openListenerDrawer('创建','','')">
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
          <a slot="actions" @click="openListenerDrawer('编辑',item,index)">编辑</a>
          <a slot="actions"> <a-popconfirm
            title="确认删除?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deleteListener(item,index)"
          >
            删除
          </a-popconfirm>
          </a>
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
      :title="listenerTitle"
      width="30%"
      placement="right"
      :keyboard="false"
      :mask-closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="closeListenerDrawer"
    >
      <a-form-model
        ref="listenerForm"
        :model="listenerForm"
        :rules="rules"
      >
        <a-form-model-item label="事件类型" prop="event">
          <a-select
            v-model="listenerForm.event"
            placeholder="请选择事件类型"
          >
            <a-select-option value="start">start</a-select-option>
            <a-select-option value="end">end</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="监听器类型" prop="listenerType">
          <a-select
            v-model="listenerForm.listenerType"
            placeholder="请选择监听器类型"
            @change="handleSelectChange"
          >
            <a-select-option value="class">Java类</a-select-option>
            <a-select-option value="expression">表达式</a-select-option>
            <a-select-option value="delegateExpression">代理表达式</a-select-option>
            <!--<a-select-option value="脚本">脚本</a-select-option>-->
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="listenerTypeTitle === 'Java类'" label="Java类" prop="class">
          <a-input
            v-model="listenerForm.class"
            allow-clear
          />
        </a-form-model-item>
        <a-form-model-item v-else-if="listenerTypeTitle === '表达式'" label="表达式" prop="expression">
          <a-input
            v-model="listenerForm.expression"
            allow-clear
          />
        </a-form-model-item>
        <a-form-model-item v-else-if="listenerTypeTitle === '代理表达式'" label="代理表达式" prop="delegateExpression">
          <a-input
            v-model="listenerForm.delegateExpression"
            allow-clear
          />
        </a-form-model-item>
        <a-form-model-item v-else-if="listenerTypeTitle === '脚本'" label="脚本">
          <a-input
            allow-clear
          />
        </a-form-model-item>
      </a-form-model>
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
        <a-button type="primary" @click="saveListener">保存</a-button>
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
      prefix: 'camunda',
      noData: { emptyText: '暂无监听' },
      elementType: '',
      listenerTypeTitle: 'Java类',
      listenerTitle: '',
      listenerIndex: -1,
      size: 'small',
      ownerListenersList: [],
      ownerListenersObjectList: [],
      visible: false,
      listenerForm: {},
      rules: {
        event: [{ required: true, message: '事件类型不能为空', trigger: 'blur' }],
        listenerType: [{ required: true, message: '监听器类型不能为空', trigger: 'blur' }],
        class: [{ required: true, message: 'Java不能为空不能为空' }],
        expression: [{ required: true, message: '表达式不能为空不能为空' }],
        delegateExpression: [{ required: true, message: '代理表达式不能为空不能为空' }]
      }
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
    saveListener() {
      this.$refs.listenerForm.validate((valid) => {
        if (valid) {
          // 组装数据
          const listenerObj = this.initListenerObject(this.listenerForm)
          this.moddle = this.listenersModeler.get('moddle')
          const listenerModel = this.moddle.create(`${this.prefix}:ExecutionListener`, listenerObj)
          console.log(listenerModel)
          // 插入
          if (this.listenerIndex === -1) {
            this.ownerListenersObjectList.push(listenerModel)
            this.ownerListenersList.push(this.listenerForm)
          } else {
            this.ownerListenersObjectList.splice(this.listenerIndex, 1, listenerModel)
            this.ownerListenersList.push(this.listenerIndex, 1, this.listenerForm)
          }
          // 更新
          this.$emit('saved', this.listenerForm)
          this.$emit('change', this.ownerListenersObjectList)
          this.$message.success('新增成功')
          this.closeListenerDrawer()
        }
      })
    },
    handleSelectChange(value) {
      if (value === 'class') {
        this.listenerTypeTitle = 'Java类'
      } else if (value === 'expression') {
        this.listenerTypeTitle = '表达式'
      } else if (value === 'delegateExpression') {
        this.listenerTypeTitle = '代理表达式'
      } else {
        this.listenerTypeTitle = '脚本'
      }
    },
    afterVisibleChange(val) {
      console.log('visible', val)
    },
    /* 删除监听*/
    deleteListener(listener, index) {
      const removedListener = this.ownerListenersList.splice(index, 1)
      this.$emit('remove-listener', removedListener)
      this.$emit('change', this.ownerListenersList)
    },
    /* 打开监听创建抽屉*/
    openListenerDrawer(type, data, index) {
      debugger
      console.log(data, index)
      if (type === '创建') {
        this.listenerTitle = '创建执行监听'
      } else {
        this.listenerTitle = '编辑执行监听'
        this.listenerForm = data
        this.listenerIndex = index
      }
      this.visible = true
    },
    /* 关闭监听创建抽屉*/
    closeListenerDrawer() {
      this.visible = false
      this.$refs.listenerForm.resetFields()
    },
    initListenerObject(options) {
      const listenerObj = {}
      listenerObj.event = options.event
      switch (options.listenerType) {
        case 'expression':
          listenerObj.expression = options.expression
          break
        case 'delegateExpression':
          listenerObj.delegateExpression = options.delegateExpression
          break
        default:
          listenerObj.class = options.class
      }
      if (options.fields) {
        listenerObj.fields = options.fields.map(field => {
          return this.moddle.create(`${this.prefix}:Field`, field)
        })
      }
      return listenerObj
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
