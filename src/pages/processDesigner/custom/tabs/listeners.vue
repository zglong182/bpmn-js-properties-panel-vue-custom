<template>
  <div class="listeners">
    <a-card>
      <template slot="title">执行监听 <a-icon type="question-circle" /></template>
      <a-button slot="extra" title="创建监听" type="primary" shape="circle" @click="openListenerDrawer">
        <a-icon type="plus" @click="openListenerDrawer" />
      </a-button>
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
      <a slot="extra" href="#">more</a>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>
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
      size: 'small',
      ownerListenersList: [],
      ownerListenersObjectList: []
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
    /* 删除监听*/
    removeListener(listener, index) {
      debugger
      const removedListener = this.ownerListenersList.splice(index, 1)
      this.$emit('remove-listener', removedListener)
      this.$emit('change', this.ownerListenersList)
    },
    /* 打开监听创建抽屉*/
    openListenerDrawer() {
      this.$message.success('打开抽屉')
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
