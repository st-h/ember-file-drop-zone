"use strict"
define("dummy/app",["exports","dummy/resolver","ember-load-initializers","dummy/config/environment"],function(e,t,n,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i=Ember.Application.extend({modulePrefix:o.default.modulePrefix,podModulePrefix:o.default.podModulePrefix,Resolver:t.default});(0,n.default)(i,o.default.modulePrefix)
var a=i
e.default=a}),define("dummy/components/file-drop-zone",["exports","ember-file-drop-zone/components/file-drop-zone"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({dropZoneDisabled:!1,init:function(){this._super.apply(this,arguments),this.set("files",Ember.A())},actions:{addFiles:function(e){var t=this
e.forEach(function(e){t.files.pushObject(e)})}}})
e.default=t}),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n}),define("dummy/initializers/export-application-global",["exports","dummy/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var o,i=t.default.exportApplicationGlobal
o="string"==typeof i?i:Ember.String.classify(t.default.modulePrefix),n[o]||(n[o]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[o]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default=void 0
var o={name:"export-application-global",initialize:n}
e.default=o}),define("dummy/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("dummy/router",["exports","dummy/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){})
var o=n
e.default=o}),define("dummy/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"2Wyj1dZU",block:'{"symbols":["file","dragging"],"statements":[[7,"h2"],[11,"id","title"],[9],[0,"ember-file-drop-zone"],[10],[0,"\\n\\n"],[7,"input"],[11,"id","dropzone-active-checkbox"],[12,"checked",[27,"readonly",[[23,["dropZoneDisabled"]]],null]],[12,"onchange",[27,"action",[[22,0,[]],[27,"mut",[[23,["dropZoneDisabled"]]],null]],[["value"],["target.checked"]]]],[11,"type","checkbox"],[9],[10],[0,"\\n"],[7,"label"],[11,"for","dropzone-active-checkbox"],[9],[0,"dropzone disabled"],[10],[0,"\\n\\n"],[4,"file-drop-zone",null,[["onDrop","disabled"],[[27,"action",[[22,0,[]],"addFiles"],null],[23,["dropZoneDisabled"]]]],{"statements":[[4,"if",[[23,["dropZoneDisabled"]]],null,{"statements":[[0,"    dropping files is currently disabled...\\n"]],"parameters":[]},{"statements":[[4,"if",[[22,2,[]]],null,{"statements":[[0,"      and let it all go...\\n"]],"parameters":[]},{"statements":[[0,"      just drop your files here...\\n"]],"parameters":[]}]],"parameters":[]}]],"parameters":[2]},null],[0,"\\n"],[7,"h3"],[9],[0,"file drop history"],[10],[0,"\\n"],[7,"ul"],[9],[0,"\\n"],[4,"each",[[23,["files"]]],null,{"statements":[[0,"    "],[7,"li"],[9],[1,[22,1,["name"]],false],[0," - "],[1,[22,1,["size"]],false],[0," bytes"],[10],[0,"\\n"]],"parameters":[1]},null],[10],[0,"\\n\\n"],[1,[21,"outlet"],false]],"hasEval":false}',meta:{moduleName:"dummy/templates/application.hbs"}})
e.default=t}),define("dummy/config/environment",[],function(){try{var e="dummy/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(unescape(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(o){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("dummy/app").default.create({})
