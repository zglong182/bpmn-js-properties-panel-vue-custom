<template>
  <div class="containers">
    <div ref="canvas" class="canvas" />
  </div>
</template>

<script>
import Modeler from 'bpmn-js/lib/Modeler'
export default {
  name: 'Modeler',
  data() {
    return {
      modeler: null
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.modeler) {
        this.modeler.get('moddle').ids.clear()
        document.querySelector('#canvas').innerHTML = ''
      }
      const canvas = this.$refs.canvas
      this.modeler = new Modeler({
        container: canvas
      })
      this.modeler.importXML('<?xml version="1.0" encoding="UTF-8"?>\n' +
                    '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0qmy09o" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.2.0">\n' +
                    '  <bpmn:process id="Process_0w928x2" isExecutable="true">\n' +
                    '    <bpmn:startEvent id="StartEvent_1">\n' +
                    '      <bpmn:outgoing>Flow_0k6ekhf</bpmn:outgoing>\n' +
                    '    </bpmn:startEvent>\n' +
                    '    <bpmn:sequenceFlow id="Flow_0k6ekhf" sourceRef="StartEvent_1" targetRef="Activity_1qz1r5p" />\n' +
                    '    <bpmn:endEvent id="Event_0kub679">\n' +
                    '      <bpmn:incoming>Flow_1bk974r</bpmn:incoming>\n' +
                    '    </bpmn:endEvent>\n' +
                    '    <bpmn:sequenceFlow id="Flow_1bk974r" sourceRef="Activity_1qz1r5p" targetRef="Event_0kub679" />\n' +
                    '    <bpmn:userTask id="Activity_1qz1r5p">\n' +
                    '      <bpmn:incoming>Flow_0k6ekhf</bpmn:incoming>\n' +
                    '      <bpmn:outgoing>Flow_1bk974r</bpmn:outgoing>\n' +
                    '    </bpmn:userTask>\n' +
                    '  </bpmn:process>\n' +
                    '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
                    '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0w928x2">\n' +
                    '      <bpmndi:BPMNEdge id="Flow_0k6ekhf_di" bpmnElement="Flow_0k6ekhf">\n' +
                    '        <di:waypoint x="215" y="117" />\n' +
                    '        <di:waypoint x="270" y="117" />\n' +
                    '      </bpmndi:BPMNEdge>\n' +
                    '      <bpmndi:BPMNEdge id="Flow_1bk974r_di" bpmnElement="Flow_1bk974r">\n' +
                    '        <di:waypoint x="370" y="117" />\n' +
                    '        <di:waypoint x="432" y="117" />\n' +
                    '      </bpmndi:BPMNEdge>\n' +
                    '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
                    '        <dc:Bounds x="179" y="99" width="36" height="36" />\n' +
                    '      </bpmndi:BPMNShape>\n' +
                    '      <bpmndi:BPMNShape id="Event_0kub679_di" bpmnElement="Event_0kub679">\n' +
                    '        <dc:Bounds x="432" y="99" width="36" height="36" />\n' +
                    '      </bpmndi:BPMNShape>\n' +
                    '      <bpmndi:BPMNShape id="Activity_144397h_di" bpmnElement="Activity_1qz1r5p">\n' +
                    '        <dc:Bounds x="270" y="77" width="100" height="80" />\n' +
                    '      </bpmndi:BPMNShape>\n' +
                    '    </bpmndi:BPMNPlane>\n' +
                    '  </bpmndi:BPMNDiagram>\n' +
                    '</bpmn:definitions>\n')
    }
  }
}
</script>

<style scoped>
  /*左边工具栏以及编辑节点的样式*/
  @import '~bpmn-js/dist/assets/diagram-js.css' ;
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
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
</style>
