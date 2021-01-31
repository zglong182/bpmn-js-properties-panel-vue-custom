<template>
  <div class="forms">
    外部表单：
    <a-input
      v-model="activeElementBusiness.formKey"
      :size="this.size"
      @change="updateBaseInfo('formKey', activeElementBusiness.formKey)"
    />
  </div>
</template>

<script>
export default {
  name: 'Forms',
  props: {
    formsModeler: Object,
    elementId: String
  },
  data() {
    return {
      activeElementBusiness: {},
      elementType: '',
      size: 'small'
    }
  },
  watch: {
    /* 进入之后更改节点时给activeElementBusiness赋值*/
    elementId(newVal, oldVar) {
      console.log('forms的elementId发生了变化')
      this.elementRegistry = this.formsModeler.get('elementRegistry')
      this.modeling = this.formsModeler.get('modeling')
      const element = this.elementRegistry.get(newVal)
      this.elementType = element.type
      this.activeElementBusiness = Object.assign({}, element.businessObject)
    }
  },
  /* 第一次进入给activeElementBusiness赋值*/
  created() {
    this.elementRegistry = this.formsModeler.get('elementRegistry')
    this.modeling = this.formsModeler.get('modeling')
    const element = this.elementRegistry.get(this.elementId)
    this.activeElementBusiness = Object.assign({}, element.businessObject)
  },
  methods: {
    // 更新常规信息
    updateBaseInfo(key, value) {
      const shape = this.elementRegistry.get(this.elementId)
      this.activeElementBusiness = Object.assign({}, shape.businessObject)
      const attrObj = {}
      attrObj[key] = value
      this.modeling.updateProperties(shape, attrObj)
    }
  }
}
</script>

<style scoped>
  .forms  input{
    width: 60%;
  }
</style>
