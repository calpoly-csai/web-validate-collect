(function(e){function t(t){for(var a,r,i=t[0],u=t[1],c=t[2],l=0,p=[];l<i.length;l++)r=i[l],s[r]&&p.push(s[r][0]),s[r]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);d&&d(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var u=n[r];0!==s[u]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},s={app:0},o=[];function r(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d0b948f":"0b3b1057","chunk-2d0d63f1":"23216dd8","chunk-2d0e8bd5":"261c6e30"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=s[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise(function(t,a){n=s[e]=[t,a]});t.push(n[2]=a);var o,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=r(e),o=function(t){u.onerror=u.onload=null,clearTimeout(c);var n=s[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,r=new Error("Loading chunk "+e+" failed.\n("+a+": "+o+")");r.type=a,r.request=o,n[1](r)}s[e]=void 0}};var c=setTimeout(function(){o({type:"timeout",target:u})},12e4);u.onerror=u.onload=o,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var d=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),s=n.n(a);s.a},"09a2":function(e,t,n){e.exports=n.p+"img/whiteX.c93ff81d.svg"},"20a9":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[e.showMenu?a("div",{staticClass:"menu",class:{open:e.menuOpen},on:{mouseenter:function(t){e.menuOpen=!0},mouseleave:function(t){e.menuOpen=!1}}},[a("router-link",{staticClass:"option",attrs:{tag:"div",to:"/dashboard"}},[a("img",{attrs:{src:n("9b19"),alt:"img"}}),a("h3",{directives:[{name:"show",rawName:"v-show",value:e.menuOpen,expression:"menuOpen"}],staticClass:"menu-desc"},[e._v("Home")])]),a("router-link",{staticClass:"option",attrs:{tag:"div",to:"/dashboard"}},[a("img",{attrs:{src:n("57b5"),alt:"img"}}),a("h3",{directives:[{name:"show",rawName:"v-show",value:e.menuOpen,expression:"menuOpen"}],staticClass:"menu-desc"},[e._v("Record")])]),a("router-link",{staticClass:"option",attrs:{tag:"div",to:"/validate"}},[a("img",{attrs:{src:n("f222"),alt:"img"}}),a("h3",{directives:[{name:"show",rawName:"v-show",value:e.menuOpen,expression:"menuOpen"}],staticClass:"menu-desc"},[e._v("Validate")])]),a("router-link",{staticClass:"option",attrs:{tag:"div",to:"/uploads"}},[a("img",{attrs:{src:n("c118"),alt:"img"}}),a("h3",{directives:[{name:"show",rawName:"v-show",value:e.menuOpen,expression:"menuOpen"}],staticClass:"menu-desc"},[e._v("Upload")])]),a("router-link",{staticClass:"option sign-out",attrs:{tag:"div",to:"/"}},[a("img",{attrs:{src:n("b5fb"),alt:""}}),a("h3",{directives:[{name:"show",rawName:"v-show",value:e.menuOpen,expression:"menuOpen"}],staticClass:"menu-desc"},[e._v("Leave")])])],1):e._e(),a("router-view"),a("transition",{attrs:{name:"show"}},[e.banner.isVisible?a("div",{staticClass:"banner",style:{backgroundColor:e.bannerColor}},[a("h4",[e._v(e._s(e.banner.message))]),a("img",{staticClass:"banner-X",attrs:{src:n("09a2"),alt:"x"},on:{click:e.closeBanner}})]):e._e()])],1)},o=[],r=(n("7f7f"),{data:function(){return{showMenu:!1,menuOpen:!1,currentLocation:"Auth"}},computed:{banner:function(){return this.$store.state.banner},bannerColor:function(){return"error"===this.banner.type?"#eb3333":"#4dbaed"}},watch:{$route:function(e,t){this.currentLocation=e,this.showMenu="Auth"!==this.currentLocation.name}},methods:{closeBanner:function(){this.$store.commit("setBanner",{isVisible:!1})},signOut:function(){this.$store.dispatch("signOut")}}}),i=r,u=(n("034f"),n("2877")),c=Object(u["a"])(i,s,o,!1,null,null,null),l=c.exports,d=n("8c4f"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"auth"},[n("div",{staticClass:"auth-box"},[n("transition-group",{attrs:{tag:"div",name:"fade-drop",mode:"out-in"}},[n("h1",{key:"appName"},[e._v("Data Manager")]),n("h2",{key:"subtitle"},[e._v(e._s(e.title))]),n("form",{key:"form",on:{submit:function(e){e.preventDefault()}}},[n("transition-group",{attrs:{tag:"div",name:"fade-drop",mode:"out-in"}},[e.signupOpen?n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],key:"signUpField",staticClass:"auth-input",attrs:{type:"text",placeholder:"Name"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}):e._e(),n("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.email,expression:"email",modifiers:{lazy:!0}}],key:"email",staticClass:"auth-input",attrs:{type:"email",placeholder:"Email"},domProps:{value:e.email},on:{change:function(t){e.email=t.target.value}}}),n("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.password,expression:"password",modifiers:{lazy:!0}}],key:"password",staticClass:"auth-input",attrs:{type:"password",placeholder:"Password"},domProps:{value:e.password},on:{change:function(t){e.password=t.target.value}}}),e.signupOpen?n("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.confirmPassword,expression:"confirmPassword",modifiers:{lazy:!0}}],key:"confirmPassword",staticClass:"auth-input",attrs:{type:"password",placeholder:"Confirm Password"},domProps:{value:e.confirmPassword},on:{change:function(t){e.confirmPassword=t.target.value}}}):e._e(),e.signupOpen?e._e():n("button",{key:"login",staticClass:"auth-button",on:{click:e.logIn}},[e._v("Go")]),e.signupOpen?n("button",{key:"addUser",staticClass:"auth-button",on:{click:e.signUp}},[e._v("Send")]):e._e(),e.signupOpen?e._e():n("button",{key:"signUpButton",staticClass:"auth-button",on:{click:function(t){e.signupOpen=!e.signupOpen}}},[e._v("Sign Up")]),e.signupOpen?n("button",{key:"backToLogin",staticClass:"auth-button",on:{click:function(t){e.signupOpen=!e.signupOpen}}},[e._v("Back")]):e._e()])],1)])],1)])},m=[],f={data:function(){return{signupOpen:!1,name:"",email:"",password:"",confirmPassword:""}},computed:{title:function(){return this.signupOpen?"Become a Member":"Log In"}},methods:{sendForm:function(){this.signupOpen?this.signUp():this.logIn()},logIn:function(){this.$store.dispatch("logIn",{email:this.email,password:this.password})},signUp:function(){var e=this.name&&this.email&&this.password&&this.confirmPassword,t=this.password===this.confirmPassword,n=e&&t;if(n)this.$store.dispatch("signUp",{email:this.email,password:this.password});else{var a={type:"error",isVisible:!0};e?t||(a.message="Passwords don't match"):a.message="Fill out all of the fields",this.$store.commit("setBanner",a)}}}},h=f,g=(n("7c2d"),Object(u["a"])(h,p,m,!1,null,null,null)),v=g.exports;a["a"].use(d["a"]);var b=new d["a"]({mode:"history",base:"/",routes:[{path:"/",name:"Auth",component:v},{path:"/dashboard",name:"Dashboard",component:function(){return n.e("chunk-2d0d63f1").then(n.bind(null,"7277"))}},{path:"/uploads",name:"Uploads",component:function(){return n.e("chunk-2d0e8bd5").then(n.bind(null,"8b0e"))}},{path:"/validate",name:"Validate",component:function(){return n.e("chunk-2d0b948f").then(n.bind(null,"31fa"))}}]}),w=(n("96cf"),n("3b8d")),y=n("75fc"),k=n("2f62"),O=n("8aa5"),x={apiKey:"AIzaSyDUefAc2fEMu1Uez0Cfo7tkkqvGqdLPL6Y",authDomain:"csai-b408c.firebaseapp.com",databaseURL:"https://csai-b408c.firebaseio.com",projectId:"csai-b408c",storageBucket:"csai-b408c.appspot.com",messagingSenderId:"389831924448",appId:"1:389831924448:web:b6387ec7e4375868"};O.initializeApp(x),O.auth().onAuthStateChanged(function(e){e?console.log("listener passes user",e):b.push("/")});var _=O.firestore(),C=O.auth();a["a"].use(k["a"]);var P=new k["a"].Store({state:{user:{},unvalidatedData:[],validatedData:[],banner:{isVisible:!1,message:"this is my banner",type:"default"}},mutations:{addUnvalidatedData:function(e,t){e.unvalidatedData=[].concat(Object(y["a"])(e.unvalidatedData),Object(y["a"])(t))},setUserInfo:function(e,t){e.user=t},setBanner:function(e,t){t.message=t.message||e.banner.message,t.type=t.type||e.banner.type,t.isVisible=t.isVisible||!0,e.banner.type=t.type,e.banner.message=t.message,e.banner.isVisible=t.isVisible}},actions:{logIn:function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(t,n){var a,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.dispatch,t.commit,e.next=3,C.signInWithEmailAndPassword(n.email,n.password).catch(function(e){console.warn("login failed"),console.log(e)});case 3:s=e.sent,a("getProfile",s.user.uid),a("getUnvalidatedData"),b.push("/dashboard"),console.log("success");case 8:case"end":return e.stop()}},e)}));function t(t,n){return e.apply(this,arguments)}return t}(),getProfile:function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(t,n){var a,s,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.commit,e.next=3,_.collection("Users").doc(n).get();case 3:if(o=e.sent,!o.exists){e.next=8;break}s=o.data(),e.next=10;break;case 8:return console.log("user not found"),e.abrupt("return");case 10:a("setUserInfo",s);case 11:case"end":return e.stop()}},e)}));function t(t,n){return e.apply(this,arguments)}return t}(),getUnvalidatedData:function(e){var t,n=e.commit,a=_.collection("UnvalidatedData").orderBy("timestamp").limit(5);a.exists?(t=a.data(),console.log("data:",t),n("addUnvalidatedData",t),console.log("success")):console.log("getUnvalidatedData failed")},signUp:function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(t,n){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.state,e.next=3,C.createUserWithEmailAndPassword(n.email,n.password).catch(function(e){return console.log(e),e});case 3:return console.log("success"),e.abrupt("return",!0);case 5:case"end":return e.stop()}},e)}));function t(t,n){return e.apply(this,arguments)}return t}(),showBanner:function(e,t){var n=e.commit;n("setBanner",t),setTimeout(function(){console.log("fired"),n("setBanner",{isVisible:!1})},5e3)},signOut:function(){setTimeout(function(){O.auth().signOut(),console.log("signed out")},1e3)}}}),U=n("9483");Object(U["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),a["a"].config.productionTip=!1,new a["a"]({router:b,store:P,render:function(e){return e(l)}}).$mount("#app")},"57b5":function(e,t,n){e.exports=n.p+"img/record.93e21868.svg"},"64a9":function(e,t,n){},"7c2d":function(e,t,n){"use strict";var a=n("20a9"),s=n.n(a);s.a},"9b19":function(e,t,n){e.exports=n.p+"img/logo.5e89e64b.svg"},b5fb:function(e,t,n){e.exports=n.p+"img/arrow-back.08da8299.svg"},c118:function(e,t,n){e.exports=n.p+"img/upload.5ba71922.svg"},f222:function(e,t,n){e.exports=n.p+"img/check.e0dfbec2.svg"}});
//# sourceMappingURL=app.ae9b8198.js.map