(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(13),c=n.n(o),u=n(2),i=function(e){var t=e.showFilter,n=e.setShowFilter;return a.a.createElement("div",null,"Filter shown with ",a.a.createElement("input",{value:t,onChange:function(e){n(e.target.value)}}))},s=n(14),l=n(3),m=n.n(l),f="/api/persons",d=function(){return m.a.get(f).then((function(e){return e.data}))},b=function(e){return m.a.post(f,e).then((function(e){return e.data}))},g=function(e,t){return console.log("".concat(f,"/").concat(e)),m.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data}))},h=function(e){return m.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))};function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var w=function(e){var t=e.newName,n=e.setNewName,r=e.newNumber,o=e.setNewNumber,c=e.persons,u=e.setPersons,i=e.setnotificationMessage,l=function(e){var t=e.id,n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{number:r});console.log(e),g(t,n).then((function(e){i({messageText:"Updated ".concat(e.name,"'s number"),error:!1}),setTimeout((function(){i({messageText:null})}),3e3),u(c.map((function(n){return n.id!==t?n:e})))})).catch((function(n){i({messageText:"The record for ".concat(e.name," no longer exists on the server."),error:!0}),setTimeout((function(){i({messageText:null})}),3e3),u(c.filter((function(e){return e.id!==t})))}))};return a.a.createElement("form",null,a.a.createElement("div",null,a.a.createElement("div",null,"Name: ",a.a.createElement("input",{value:t,onChange:function(e){n(e.target.value)}})),a.a.createElement("div",null,"Number: ",a.a.createElement("input",{value:r,onChange:function(e){o(e.target.value)}}))),a.a.createElement("div",null,a.a.createElement("button",{type:"submit",onClick:function(e){e.preventDefault();var a=c.filter((function(e){return e.name.toLowerCase()===t.toLowerCase().trim()}));if(a.length&&window.confirm("".concat(t," is already added to the phonebook, replace the old number with a new one?")))return l(a[0]),!0;b({name:t,number:r}).then((function(e){u(c.concat(e)),n(""),o(""),i({messageText:"Added ".concat(e.name),error:!1}),setTimeout((function(){i({messageText:null})}),3e3)})).catch((function(e){i({messageText:e.response.data.error,error:!0}),setTimeout((function(){i({messageText:null})}),3e3)}))}},"Add")))},v=function(e){var t=e.name,n=e.number,r=e.toggleDelete;return a.a.createElement("div",null,t," ",n," ",a.a.createElement("button",{onClick:r},"Delete"))},O=function(e){var t=e.message;return null===t.messageText?null:a.a.createElement("div",{className:t.error?"message error":"message success"},t.messageText)},E=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),s=Object(u.a)(c,2),l=s[0],m=s[1],f=Object(r.useState)(""),b=Object(u.a)(f,2),g=b[0],p=b[1],E=Object(r.useState)(""),j=Object(u.a)(E,2),T=j[0],N=j[1],y=Object(r.useState)({messageText:null,error:!1}),x=Object(u.a)(y,2),P=x[0],k=x[1];Object(r.useEffect)((function(){d().then((function(e){o(e)}))}),[]);var C=function(e){var t=n.find((function(t){return t.id===e}));window.confirm("Delete ".concat(t.name,"?"))&&h(e).then((function(){o(n.filter((function(t){return t.id!==e})))})).catch((function(r){k({messageText:"The number for ".concat(t.name," was already deleted from the server"),error:!0}),setTimeout((function(){k({messageText:null})}),3e3),o(n.filter((function(t){return t.id!==e})))}))};return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(O,{message:P}),a.a.createElement(i,{showFilter:T,setShowFilter:N}),a.a.createElement("h2",null,"Add New"),a.a.createElement(w,{newName:l,setNewName:m,newNumber:g,setNewNumber:p,persons:n,setPersons:o,setnotificationMessage:k}),a.a.createElement("h2",null,"Numbers"),n.filter((function(e){return e.name.toLowerCase().includes(T.toLowerCase())})).map((function(e){return a.a.createElement(v,{key:e.id,name:e.name,number:e.number,toggleDelete:function(){return C(e.id)}})})))};n(37);c.a.render(a.a.createElement(E,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.fb16c183.chunk.js.map