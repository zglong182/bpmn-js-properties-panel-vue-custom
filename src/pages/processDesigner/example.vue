<template>
  <div class="canvas">
    <a-row>
      <a-col :span="23">
        <a-button type="primary">
          <a-icon type="home" /> Primary
        </a-button>
        <a-button>Default</a-button>
        <a-button type="dashed">
          Dashed
        </a-button>
        <a-button type="danger">
          Danger
        </a-button>
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button type="primary">
            按钮
          </a-button>
        </a-config-provider>
        <a-button type="primary">
          按钮
        </a-button>
        <a-button type="link">
          Link
        </a-button>
        <div>
          <a-tabs @change="callback">
            <a-tab-pane key="1" tab="Tab 1">
              <div class="icons-list" />
            </a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" force-render>
              Content of Tab Pane 2
            </a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3">
              Content of Tab Pane 3
            </a-tab-pane>
          </a-tabs>
        </div>
        <div>
          <div style="width: 500px">
            <a-radio-group v-model="mode" :style="{ marginBottom: '8px' }">
              <a-radio-button value="top">
                Horizontal
              </a-radio-button>
              <a-radio-button value="left">
                Vertical
              </a-radio-button>
            </a-radio-group>
            <a-tabs
              :tab-position="mode"
              :style="{ height: '200px' }"
              @prevClick="callback"
              @nextClick="callback"
            >
              <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`"> Content of tab {{ i }} </a-tab-pane>
            </a-tabs>
          </div>
        </div>
        <div>
          <a-collapse v-model="activeKey" @change="changeActivekey">
            <a-collapse-panel key="1" header="This is panel header 1">
              <a-collapse default-active-key="4">
                <a-collapse-panel key="4" header="This is panel nest panel">
                  <p>{{ text }}</p>
                </a-collapse-panel>
              </a-collapse>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
              <p>{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="This is panel header 3">
              <p>{{ text }}</p>
            </a-collapse-panel>
          </a-collapse>
        </div>
        <a-row>
          <a-col :span="12">
            col-12
          </a-col>
          <a-col :span="12">
            col-12
          </a-col>
        </a-row>
        <a-drawer
          title="Basic Drawer"
          placement="right"
          :closable="false"
          :visible="visible"
          :after-visible-change="afterVisibleChange"
          @close="onClose"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-drawer>
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
              description="Ant Design"
            >
              <a slot="title" href="https://www.antdv.com/">{{ item.title }}{{ index }}</a>
              <p>12</p>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="1">
        <a-button type="primary" @click="showDrawer">
          Open
        </a-button></a-col>

    </a-row>

  </div>
</template>

<script>
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
export default {
  name: 'Example',
  components: {

  },
  data() {
    return {
      mode: 'top',
      visible: false,
      activeKey: [],
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      data
    }
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val)
    },
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    changeActivekey(key) {
      console.log(key)
    },
    callback(key) {
      console.log(key)
    }
  }
}
</script>

<style scoped>
  .canvas{
    width: 100%;
    height: 100%;
    background-color: azure;
  }
  .icons-list ::v-deep(.anticon) {
    margin-right: 6px;
    font-size: 24px;
  }
</style>
