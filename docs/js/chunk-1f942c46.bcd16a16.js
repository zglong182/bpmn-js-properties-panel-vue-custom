(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f942c46"],{"3b68":function(n,e,t){},"7c33":function(n,e,t){"use strict";t("3b68")},d9ea:function(n,e,t){"use strict";t.r(e);var i=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"flow-container"},[t("div",{ref:"content",staticClass:"containers"},[t("div",{ref:"canvas",staticClass:"canvas",attrs:{id:"canvas"}}),t("div",{staticClass:"properties",attrs:{id:"properties"}})])])},o=[],p=t("7024"),d=t("1cdc"),m=t.n(d),s=t("04be"),r=t.n(s),a=t("73d4"),c={name:"Panel",data(){return{modeler:null}},mounted(){this.init()},methods:{init(){this.modeler&&(this.modeler.get("moddle").ids.clear(),document.querySelector("#canvas").innerHTML="",document.querySelector("#properties").innerHTML="");const n=this.$refs.canvas;this.modeler=new p["a"]({container:n,propertiesPanel:{parent:"#properties"},additionalModules:[m.a,r.a],moddleExtensions:{camunda:a}}),this.modeler.importXML('<?xml version="1.0" encoding="UTF-8"?>\n<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0qmy09o" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.2.0">\n  <bpmn:process id="Process_0w928x2" isExecutable="true">\n    <bpmn:startEvent id="StartEvent_1">\n      <bpmn:outgoing>Flow_0k6ekhf</bpmn:outgoing>\n    </bpmn:startEvent>\n    <bpmn:sequenceFlow id="Flow_0k6ekhf" sourceRef="StartEvent_1" targetRef="Activity_1qz1r5p" />\n    <bpmn:endEvent id="Event_0kub679">\n      <bpmn:incoming>Flow_1bk974r</bpmn:incoming>\n    </bpmn:endEvent>\n    <bpmn:sequenceFlow id="Flow_1bk974r" sourceRef="Activity_1qz1r5p" targetRef="Event_0kub679" />\n    <bpmn:userTask id="Activity_1qz1r5p">\n      <bpmn:incoming>Flow_0k6ekhf</bpmn:incoming>\n      <bpmn:outgoing>Flow_1bk974r</bpmn:outgoing>\n    </bpmn:userTask>\n  </bpmn:process>\n  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0w928x2">\n      <bpmndi:BPMNEdge id="Flow_0k6ekhf_di" bpmnElement="Flow_0k6ekhf">\n        <di:waypoint x="215" y="117" />\n        <di:waypoint x="270" y="117" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id="Flow_1bk974r_di" bpmnElement="Flow_1bk974r">\n        <di:waypoint x="370" y="117" />\n        <di:waypoint x="432" y="117" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n        <dc:Bounds x="179" y="99" width="36" height="36" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id="Event_0kub679_di" bpmnElement="Event_0kub679">\n        <dc:Bounds x="432" y="99" width="36" height="36" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id="Activity_144397h_di" bpmnElement="Activity_1qz1r5p">\n        <dc:Bounds x="270" y="77" width="100" height="80" />\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn:definitions>\n')}}},b=c,l=(t("7c33"),t("2877")),u=Object(l["a"])(b,i,o,!1,null,"850cf1c6",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-1f942c46.bcd16a16.js.map