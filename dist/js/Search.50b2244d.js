(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Search"],{"0cb2":function(t,e,n){var r=n("7b0b"),i=Math.floor,a="".replace,s=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,o=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,e,n,c,u,l){var f=n+t.length,d=c.length,h=o;return void 0!==u&&(u=r(u),h=s),a.call(l,h,(function(r,a){var s;switch(a.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(f);case"<":s=u[a.slice(1,-1)];break;default:var o=+a;if(0===o)return r;if(o>d){var l=i(o/10);return 0===l?r:l<=d?void 0===c[l-1]?a.charAt(1):c[l-1]+a.charAt(1):r}s=c[o-1]}return void 0===s?"":s}))}},"107c":function(t,e,n){var r=n("d039");t.exports=r((function(){var t=RegExp("(?<a>b)","string".charAt(5));return"b"!==t.exec("b").groups.a||"bc"!=="b".replace(t,"$<a>c")}))},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"14c3":function(t,e,n){var r=n("c6b6"),i=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var a=n.call(t,e);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},2532:function(t,e,n){"use strict";var r=n("23e7"),i=n("5a34"),a=n("1d80"),s=n("ab13");r({target:"String",proto:!0,forced:!s("includes")},{includes:function(t){return!!~String(a(this)).indexOf(i(t),arguments.length>1?arguments[1]:void 0)}})},"25f0":function(t,e,n){"use strict";var r=n("6eeb"),i=n("825a"),a=n("d039"),s=n("ad6d"),o="toString",c=RegExp.prototype,u=c[o],l=a((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),f=u.name!=o;(l||f)&&r(RegExp.prototype,o,(function(){var t=i(this),e=String(t.source),n=t.flags,r=String(void 0===n&&t instanceof RegExp&&!("flags"in c)?s.call(t):n);return"/"+e+"/"+r}),{unsafe:!0})},"2d3b":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"search-container"},[n("div",{staticClass:"search-head"},[n("van-icon",{staticClass:"arrow-left",attrs:{name:"arrow-left"},on:{touchend:function(e){return t.$router.go(-1)}}}),n("form",{staticClass:"search-content",attrs:{action:"/"}},[n("van-search",{attrs:{"show-action":"","action-text":"搜索",placeholder:t.place},on:{search:t.onSearch,input:t.input,focus:t.focus,clear:t.clear,blur:t.blur},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)],1),n("div",{staticClass:"like-search"},[n("van-list",t._l(t.likeList,(function(e){return n("van-cell",{key:e.id,on:{click:function(n){return t.onSearch(e)}}},[[n("span",{staticClass:"custom-title",domProps:{innerHTML:t._s(t.formatHtml(e))}})]],2)})),1)],1),[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.showGoods,expression:"!showGoods"}],staticClass:"searchHistory"},t._l(t.search,(function(e){return n("div",{key:e,staticClass:"item",on:{touchend:function(n){return t.onSearch(e)}}},[t._v(" "+t._s(e)+" ")])})),0),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showGoods,expression:"showGoods"}],staticClass:"goods-list"},[n("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.goodsList,(function(e){return n("GoodsCard",t._b({key:e.id,attrs:{num:t.counterMap[e.id]}},"GoodsCard",e,!1))})),1)],1)],1)]],2)},i=[],a=(n("ac1f"),n("841c"),n("caad"),n("2532"),n("a434"),n("4d63"),n("25f0"),n("5319"),n("9767"),n("458a")),s=n("5880"),o={data:function(){return{place:"请输入搜索",value:this.place,likeList:[],search:[],time:null,loading:!1,finished:!1,refreshing:!1,page:1,showGoods:!1}},components:{GoodsCard:a["a"]},computed:Object(s["mapState"])(["goodsList","counterMap"]),created:function(){this.$store.commit("setGoodsList",[]),this.search=JSON.parse(localStorage.getItem("search"))||[]},methods:{onSearch:function(t){this.$store.commit("setGoodsList",[]),t?(this.value=t,this.likeList=[],this.$store.dispatch("getGoodsList",{page:this.page,type:t}),this.search.includes(t)?(this.search.splice(this.search.indexOf(t),1),this.search.unshift(t)):this.search.push(t),localStorage.setItem("search",JSON.stringify(this.search))):this.value=this.place,this.showGoods=!0},input:function(t){var e=this;t&&(clearTimeout(this.time),this.time=setTimeout((function(){e.$api.likeSearch({likeValue:t}).then((function(t){e.likeList=t.result,clearTimeout(e.time),e.time=null}))}),300))},focus:function(){this.showGoods=!1},blur:function(){this.showGoods=!0},clear:function(){this.$store.commit("setGoodsList",[])},formatHtml:function(t){var e=new RegExp(this.value,"g");return t.replace(e,this.value.fontcolor("red"))},onLoad:function(){var t=this;setTimeout((function(){t.refreshing?t.refreshing=!1:(t.page+=1,t.$store.dispatch("getGoodsList",{page:t.page,sort:t.type}).then((function(e){e?t.loading=!1:t.finished=!0})))}),1e3)},onRefresh:function(){this.$store.commit("setGoodsList",[]),this.page=1,this.finished=!1,this.$store.dispatch("getGoodsList",{page:this.page,sort:this.type}),this.loading=!1,this.onLoad()}}},c=o,u=(n("a73e"),n("2877")),l=Object(u["a"])(c,r,i,!1,null,"a007b98e",null);e["default"]=l.exports},"385a":function(t,e,n){"use strict";n("b69f")},"3c99":function(t,e,n){},"44e7":function(t,e,n){var r=n("861d"),i=n("c6b6"),a=n("b622"),s=a("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[s])?!!e:"RegExp"==i(t))}},"458a":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card-container van-hairline--bottom"},[n("div",{staticClass:"card-img"},[n("img",{ref:"img",attrs:{src:t.images[0]}})]),n("div",{staticClass:"card-content"},[n("div",{staticClass:"title overflow-hidden"},[t._v(t._s(t.title))]),n("div",{staticClass:"desc overflow-hidden"},[t._v(t._s(t.desc))]),n("div",{staticClass:"tags"},t._l(t.tags,(function(e){return n("div",{key:e},[t._v(t._s(e))])})),0),n("div",{staticClass:"prices"},[t._v("￥"+t._s(t.price))]),n("div",{staticClass:"counter"},[t.num?n("div",[n("img",{attrs:{src:"https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png",alt:""},on:{touchend:function(e){return t.counter(t.id,-1)}}})]):t._e(),t.num?n("div",{staticClass:"num"},[t._v(" "+t._s(t.num)+" ")]):t._e(),n("div",[n("img",{attrs:{src:"https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png",alt:""},on:{touchend:function(e){return t.counter(t.id,1)}}})])])])])},i=[],a=n("8bbf"),s=n.n(a),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.exist?n("div",{staticClass:"item",style:{width:t.width+"px",height:t.height+"px",opacity:t.opacity,transform:"translate("+t.moveX+"px,"+t.moveY+"px) scale("+t.sx+","+t.sy+")"}},[n("img",{attrs:{src:t.src}})]):t._e()},c=[],u=(n("9ad6"),n("2877")),l={},f=Object(u["a"])(l,o,c,!1,null,"15a4b923",null),d=f.exports,h=s.a.extend(d),g=function(t){var e=t.startX,n=t.startY,r=t.endX,i=t.endY,a=t.src,s=t.width,o=t.height,c=new h({el:document.createElement("div"),data:function(){return{moveX:e,moveY:n,src:a,sx:1,sy:1,opacity:1,exist:!0,width:s,height:o}}});document.body.appendChild(c.$el),setTimeout((function(){c.moveX=r,c.moveY=i,c.sx=.1,c.sy=.1,c.opacity=0,setTimeout((function(){c.exist=!1}),1e3)}),0)},p={props:["images","tags","title","desc","price","id","num","onify"],methods:{counter:function(t,e){if(this.$store.commit("storageChange",{id:t,value:e}),-1!=e&&!this.onify){var n=this.$refs.img.getBoundingClientRect(),r=n.top,i=n.left,a=this.$refs.img,s=a.offsetWidth,o=a.offsetHeight,c=document.getElementById("shop-card"),u=c.getBoundingClientRect(),l=u.top,f=u.left,d=c.offsetWidth,h=c.offsetHeight,p=f+d/2,v=l+h/2;g({startY:r,startX:i,width:s,height:o,src:this.$refs.img.src,endX:p,endY:v})}}}},v=p,x=(n("385a"),Object(u["a"])(v,r,i,!1,null,"37e86a2b",null));e["a"]=x.exports},"4d63":function(t,e,n){var r=n("83ab"),i=n("da84"),a=n("94ca"),s=n("7156"),o=n("9112"),c=n("9bf2").f,u=n("241c").f,l=n("44e7"),f=n("ad6d"),d=n("9f7f"),h=n("6eeb"),g=n("d039"),p=n("5135"),v=n("69f3").enforce,x=n("2626"),m=n("b622"),b=n("fce3"),y=n("107c"),w=m("match"),E=i.RegExp,S=E.prototype,R=/^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,$=/a/g,_=/a/g,C=new E($)!==$,k=d.UNSUPPORTED_Y,I=r&&(!C||k||b||y||g((function(){return _[w]=!1,E($)!=$||E(_)==_||"/a/i"!=E($,"i")}))),O=function(t){for(var e,n=t.length,r=0,i="",a=!1;r<=n;r++)e=t.charAt(r),"\\"!==e?a||"."!==e?("["===e?a=!0:"]"===e&&(a=!1),i+=e):i+="[\\s\\S]":i+=e+t.charAt(++r);return i},A=function(t){for(var e,n=t.length,r=0,i="",a=[],s={},o=!1,c=!1,u=0,l="";r<=n;r++){if(e=t.charAt(r),"\\"===e)e+=t.charAt(++r);else if("]"===e)o=!1;else if(!o)switch(!0){case"["===e:o=!0;break;case"("===e:R.test(t.slice(r+1))&&(r+=2,c=!0),i+=e,u++;continue;case">"===e&&c:if(""===l||p(s,l))throw new SyntaxError("Invalid capture group name");s[l]=!0,a.push([l,u]),c=!1,l="";continue}c?l+=e:i+=e}return[i,a]};if(a("RegExp",I)){for(var G=function(t,e){var n,r,i,a,c,u,d=this instanceof G,h=l(t),g=void 0===e,p=[],x=t;if(!d&&h&&g&&t.constructor===G)return t;if((h||t instanceof G)&&(t=t.source,g&&(e="flags"in x?x.flags:f.call(x))),t=void 0===t?"":String(t),e=void 0===e?"":String(e),x=t,b&&"dotAll"in $&&(r=!!e&&e.indexOf("s")>-1,r&&(e=e.replace(/s/g,""))),n=e,k&&"sticky"in $&&(i=!!e&&e.indexOf("y")>-1,i&&(e=e.replace(/y/g,""))),y&&(a=A(t),t=a[0],p=a[1]),c=s(E(t,e),d?this:S,G),(r||i||p.length)&&(u=v(c),r&&(u.dotAll=!0,u.raw=G(O(t),n)),i&&(u.sticky=!0),p.length&&(u.groups=p)),t!==x)try{o(c,"source",""===x?"(?:)":x)}catch(m){}return c},L=function(t){t in G||c(G,t,{configurable:!0,get:function(){return E[t]},set:function(e){E[t]=e}})},T=u(E),Y=0;T.length>Y;)L(T[Y++]);S.constructor=G,G.prototype=S,h(i,"RegExp",G)}x("RegExp")},5319:function(t,e,n){"use strict";var r=n("d784"),i=n("d039"),a=n("825a"),s=n("50c4"),o=n("a691"),c=n("1d80"),u=n("8aa5"),l=n("0cb2"),f=n("14c3"),d=n("b622"),h=d("replace"),g=Math.max,p=Math.min,v=function(t){return void 0===t?t:String(t)},x=function(){return"$0"==="a".replace(/./,"$0")}(),m=function(){return!!/./[h]&&""===/./[h]("a","$0")}(),b=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}));r("replace",(function(t,e,n){var r=m?"$":"$0";return[function(t,n){var r=c(this),i=void 0==t?void 0:t[h];return void 0!==i?i.call(t,r,n):e.call(String(r),t,n)},function(t,i){if("string"===typeof i&&-1===i.indexOf(r)&&-1===i.indexOf("$<")){var c=n(e,this,t,i);if(c.done)return c.value}var d=a(this),h=String(t),x="function"===typeof i;x||(i=String(i));var m=d.global;if(m){var b=d.unicode;d.lastIndex=0}var y=[];while(1){var w=f(d,h);if(null===w)break;if(y.push(w),!m)break;var E=String(w[0]);""===E&&(d.lastIndex=u(h,s(d.lastIndex),b))}for(var S="",R=0,$=0;$<y.length;$++){w=y[$];for(var _=String(w[0]),C=g(p(o(w.index),h.length),0),k=[],I=1;I<w.length;I++)k.push(v(w[I]));var O=w.groups;if(x){var A=[_].concat(k,C,h);void 0!==O&&A.push(O);var G=String(i.apply(void 0,A))}else G=l(_,h,C,k,O,i);C>=R&&(S+=h.slice(R,C)+G,R=C+_.length)}return S+h.slice(R)}]}),!b||!x||m)},"5a34":function(t,e,n){var r=n("44e7");t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},7156:function(t,e,n){var r=n("861d"),i=n("d2bb");t.exports=function(t,e,n){var a,s;return i&&"function"==typeof(a=e.constructor)&&a!==n&&r(s=a.prototype)&&s!==n.prototype&&i(t,s),t}},"841c":function(t,e,n){"use strict";var r=n("d784"),i=n("825a"),a=n("1d80"),s=n("129f"),o=n("14c3");r("search",(function(t,e,n){return[function(e){var n=a(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,n):new RegExp(e)[t](String(n))},function(t){var r=n(e,this,t);if(r.done)return r.value;var a=i(this),c=String(t),u=a.lastIndex;s(u,0)||(a.lastIndex=0);var l=o(a,c);return s(a.lastIndex,u)||(a.lastIndex=u),null===l?-1:l.index}]}))},"857a":function(t,e,n){var r=n("1d80"),i=/"/g;t.exports=function(t,e,n,a){var s=String(r(t)),o="<"+e;return""!==n&&(o+=" "+n+'="'+String(a).replace(i,"&quot;")+'"'),o+">"+s+"</"+e+">"}},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9263:function(t,e,n){"use strict";var r=n("ad6d"),i=n("9f7f"),a=n("5692"),s=n("7c73"),o=n("69f3").get,c=n("fce3"),u=n("107c"),l=RegExp.prototype.exec,f=a("native-string-replace",String.prototype.replace),d=l,h=function(){var t=/a/,e=/b*/g;return l.call(t,"a"),l.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),g=i.UNSUPPORTED_Y||i.BROKEN_CARET,p=void 0!==/()??/.exec("")[1],v=h||p||g||c||u;v&&(d=function(t){var e,n,i,a,c,u,v,x=this,m=o(x),b=m.raw;if(b)return b.lastIndex=x.lastIndex,e=d.call(b,t),x.lastIndex=b.lastIndex,e;var y=m.groups,w=g&&x.sticky,E=r.call(x),S=x.source,R=0,$=t;if(w&&(E=E.replace("y",""),-1===E.indexOf("g")&&(E+="g"),$=String(t).slice(x.lastIndex),x.lastIndex>0&&(!x.multiline||x.multiline&&"\n"!==t[x.lastIndex-1])&&(S="(?: "+S+")",$=" "+$,R++),n=new RegExp("^(?:"+S+")",E)),p&&(n=new RegExp("^"+S+"$(?!\\s)",E)),h&&(i=x.lastIndex),a=l.call(w?n:x,$),w?a?(a.input=a.input.slice(R),a[0]=a[0].slice(R),a.index=x.lastIndex,x.lastIndex+=a[0].length):x.lastIndex=0:h&&a&&(x.lastIndex=x.global?a.index+a[0].length:i),p&&a&&a.length>1&&f.call(a[0],n,(function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(a[c]=void 0)})),a&&y)for(a.groups=u=s(null),c=0;c<y.length;c++)v=y[c],u[v[0]]=a[v[1]];return a}),t.exports=d},9767:function(t,e,n){"use strict";var r=n("23e7"),i=n("857a"),a=n("af03");r({target:"String",proto:!0,forced:a("fontcolor")},{fontcolor:function(t){return i(this,"font","color",t)}})},"9ad6":function(t,e,n){"use strict";n("a9e8")},"9f7f":function(t,e,n){var r=n("d039"),i=function(t,e){return RegExp(t,e)};e.UNSUPPORTED_Y=r((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a434:function(t,e,n){"use strict";var r=n("23e7"),i=n("23cb"),a=n("a691"),s=n("50c4"),o=n("7b0b"),c=n("65f0"),u=n("8418"),l=n("1dde"),f=l("splice"),d=Math.max,h=Math.min,g=9007199254740991,p="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!f},{splice:function(t,e){var n,r,l,f,v,x,m=o(this),b=s(m.length),y=i(t,b),w=arguments.length;if(0===w?n=r=0:1===w?(n=0,r=b-y):(n=w-2,r=h(d(a(e),0),b-y)),b+n-r>g)throw TypeError(p);for(l=c(m,r),f=0;f<r;f++)v=y+f,v in m&&u(l,f,m[v]);if(l.length=r,n<r){for(f=y;f<b-r;f++)v=f+r,x=f+n,v in m?m[x]=m[v]:delete m[x];for(f=b;f>b-r+n;f--)delete m[f-1]}else if(n>r)for(f=b-r;f>y;f--)v=f+r-1,x=f+n-1,v in m?m[x]=m[v]:delete m[x];for(f=0;f<n;f++)m[f+y]=arguments[f+2];return m.length=b-r+n,l}})},a73e:function(t,e,n){"use strict";n("3c99")},a9e8:function(t,e,n){},ab13:function(t,e,n){var r=n("b622"),i=r("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[i]=!1,"/./"[t](e)}catch(r){}}return!1}},ac1f:function(t,e,n){"use strict";var r=n("23e7"),i=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},af03:function(t,e,n){var r=n("d039");t.exports=function(t){return r((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},b69f:function(t,e,n){},caad:function(t,e,n){"use strict";var r=n("23e7"),i=n("4d64").includes,a=n("44d2");r({target:"Array",proto:!0},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a("includes")},d784:function(t,e,n){"use strict";n("ac1f");var r=n("6eeb"),i=n("9263"),a=n("d039"),s=n("b622"),o=n("9112"),c=s("species"),u=RegExp.prototype;t.exports=function(t,e,n,l){var f=s(t),d=!a((function(){var e={};return e[f]=function(){return 7},7!=""[t](e)})),h=d&&!a((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[c]=function(){return n},n.flags="",n[f]=/./[f]),n.exec=function(){return e=!0,null},n[f](""),!e}));if(!d||!h||n){var g=/./[f],p=e(f,""[t],(function(t,e,n,r,a){var s=e.exec;return s===i||s===u.exec?d&&!a?{done:!0,value:g.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}));r(String.prototype,t,p[0]),r(u,f,p[1])}l&&o(u[f],"sham",!0)}},fce3:function(t,e,n){var r=n("d039");t.exports=r((function(){var t=RegExp(".","string".charAt(0));return!(t.dotAll&&t.exec("\n")&&"s"===t.flags)}))}}]);
//# sourceMappingURL=Search.50b2244d.js.map