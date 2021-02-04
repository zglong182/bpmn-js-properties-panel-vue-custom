<template>
  <div>
    <a-card size="small" title="扩展属性">
      <a slot="extra" type="plus" href="#" @click="showModal('创建')"><a-icon type="plus-circle" /></a>
      <a-table :data-source="ownerAttributes" :pagination="false" size="small">
        <a-table-column key="id" title="类型" data-index="id" width="20%" />
        <a-table-column key="name" title="名称" data-index="name" width="20%" />
        <a-table-column key="value" title="属性值" data-index="value" width="30%" />
        <a-table-column title="操作" width="30%">
          <template slot-scope="text, record,index">
            <label v-show="false">{{ text }}{{ record }}{{ index }}</label>
            <label @click="showModal('编辑',text,index)"><a type="link">编辑 </a></label>
            <a-popconfirm
              title="确认删除?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteListener(text,index)"
            >
              <a type="link"> 删除</a>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
    </a-card>
    <a-modal
      v-model="visible"
      :title="attributeTitle"
      :centered="true"
      :mask-closable="false"
      :keyboard="false"
    >
      <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        :layout="formLayout"
      >
        <a-form-model-item label="类型" prop="id">
          <a-input v-model="form.id" placeholder="请输入类型" />
        </a-form-model-item>
        <a-form-model-item label="名称" prop="name">
          <a-input v-model="form.name" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item label="属性值" prop="value">
          <a-input v-model="form.value" placeholder="请输入属性值" />
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button @click="closeAndReset">关闭</a-button>
        <a-button type="primary" @click="saveAttribute">保存</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>

export default {
  name: 'Expand',
  props: {
    expandModeler: Object,
    elementId: String,
    elementAttributes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      attributeTitle: '',
      attributeList: {},
      attributeIndex: -1,
      attributeForm: {},
      checkNick: false,
      formLayout: 'horizontal',
      form: {},
      rules: {
        id: [{ required: false, message: '类型不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        value: [{ required: true, message: '属性值不能为空', trigger: 'blur' }]
      },
      ownerAttributes: []
    }
  },
  watch: {
    elementAttributes(newVal, oldVar) {
      console.log('Expand的elementAttributes发生了变化')
      if (newVal) {
        this.ownerAttributes = JSON.parse(JSON.stringify(this.elementAttributes[0] && this.elementAttributes[0].values || []))
        // this.ownerAttributes = JSON.parse(JSON.stringify(this.elementAttributes[0]?.values || []))
      }
    },
    elementId(newVal, oldVar) {
      console.log('Expand的elementId发生了变化')
    }
  },
  methods: {
    showModal(type, data, index) {
      if (type === '创建') {
        this.attributeTitle = '创建扩展属性'
      } else if (type === '编辑') {
        this.form = data
        this.attributeTitle = '编辑扩展属性'
        this.attributeIndex = index
      }
      this.visible = true
    },
    saveAttribute() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.attributeIndex === -1)
          if (this.attributeIndex === -1) {
            this.ownerAttributes.push(this.form)
            this.$message.success('新增成功')
          } else {
            this.ownerAttributes.splice(this.attributeIndex, 1, this.form)
            this.attributeIndex = -1
            this.$message.success('保存成功')
          }
          this.$emit('saved', this.attributeForm)
          this.$emit('change', this.ownerAttributes)
          this.closeAndReset()
        }
      })
    },
    deleteListener(text, index) {
      this.ownerAttributes.splice(index, 1)
      this.$emit('saved', this.attributeForm)
      this.$emit('change', this.ownerAttributes)
      this.$message.success('删除成功')
    },
    closeAndReset() {
      this.visible = false
      this.$refs.form.resetFields()
      this.form = {}
      this.ownerAttributes = JSON.parse(JSON.stringify(this.elementAttributes[0] && this.elementAttributes[0].values || []))
    }
  }
}
</script>

<style scoped>

</style>
