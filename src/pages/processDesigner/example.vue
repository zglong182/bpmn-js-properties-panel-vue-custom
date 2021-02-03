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
      12312313
      <heart-icon :style="{ color: 'hotpink' }" />
      <panda-icon :style="{ fontSize: '32px' }" />

  </div>
</template>

<script>
const HeartSvg = {
  template: `
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  `
}
const PandaSvg = {
  template: `
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z" fill="#6B676E" p-id="1143" />
      <path d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z" fill="#FFEBD2" p-id="1144" />
      <path d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z" fill="#E9D7C3" p-id="1145" />
      <path d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z" fill="#FFFFFF" p-id="1146" />
      <path d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z" fill="#6B676E" p-id="1147" />
      <path d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z" fill="#464655" p-id="1148" />
      <path d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1149" />
      <path d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1150" />
    </svg>
  `
}
const HeartIcon = {
  template: `
    <a-icon :component="HeartSvg" />
  `,
  data() {
    return {
      HeartSvg
    }
  }
}

const PandaIcon = {
  template: `
    <a-icon :component="PandaSvg" />
  `,
  data() {
    return {
      PandaSvg
    }
  }
}
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
    HeartIcon,
    PandaIcon
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
  .custom-icons-list >>> .anticon {
    margin-right: 6px;
  }
</style>
