function triggerCheckout(payload) {
  var ifrm = document.createElement("iframe");
  ifrm.id = "growwx-iframe";
  ifrm.setAttribute("src", getIframeUrl());
  if (isMobile()) {
    console.log("Mobile");
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";
    ifrm.style.border = "none";
    ifrm.allowFullscreen = true;
    ifrm.style.position = "fixed";
    ifrm.style.top = "0px";
    ifrm.style.left = "0px";
    ifrm.style.bottom = "0px";
    ifrm.style.right = "0px";
    ifrm.style.overflow = "unset";
    ifrm.style.zIndex = "9999999999";
  } else {
    console.log("Desktop view not supported");
  }
  document.body.appendChild(ifrm);
  document.body.style.overflow = "hidden";
  window.addEventListener("message", function (e) {
    if (e.data && e.data.event === "unload-iframe") {
      var iframe = document.getElementById("growwx-iframe");
      iframe.parentNode.removeChild(iframe);
      document.body.style.overflow = "auto";
    }
    if (e.data && e.data.event === "navigate") {
      this.window.location.replace(e.data.location);
    }
    if (e.data && e.data.event === "setItem") {
      this.localStorage.setItem(e.data.key, e.data.value);
    }
    if (e.data && e.data.event === "removeItem") {
      this.localStorage.removeItem(e.data.key);
    }
  });
  ifrm.onload = function () {
    publishLocalStorage();
  };
}

function publishLocalStorage() {
  console.log("publishLocalStorage");
  var localStorageMap = {};
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageMap[key] = localStorage.getItem(key);
  }
  var iframe = document.getElementById("growwx-iframe");
  iframe.contentWindow.postMessage(
    { event: "storageSync", dataMap: localStorageMap },
    "*"
  );
}

function isMobile() {
  return screen.width <= 480;
}

function getPayload1() {
  const prev = "eyJjYXJ0Ijp7InRvdGFsX3ByaWNlIjoxLCJ0b3RhbF9kaXNjb3VudCI6MCwiaXRlbV9jb3VudCI6MSwiaXRlbXMiOlt7ImlkIjoiNzg0ODA4OTY0OTM5OCIsInF1YW50aXR5IjoxLCJ2YXJpYW50X2lkIjoiNDQ0NTk2MjM3NzY1MDIiLCJ0aXRsZSI6IlByb2R1Y3QtMiIsInByaWNlIjoxLCJvcmlnaW5hbF9wcmljZSI6MSwiZGlzY291bnRlZF9wcmljZSI6MSwidG90YWxfZGlzY291bnQiOjAsImRpc2NvdW50cyI6W10sInNrdSI6Ijg5MDQxMzA4OTc5NTUiLCJ1cmwiOiIvcHJvZHVjdHMvcHJvZHVjdC0yIiwiaW1hZ2UiOiJodHRwczovL2Nkbi5zaG9waWZ5LmNvbS9zL2ZpbGVzLzEvMDY2Ni84NDU1LzE0MTQvcHJvZHVjdHMvNjF5QkNNbXVJNEwuX1VMMTQ0MC5qcGcifV0sInJlcXVpcmVzX3NoaXBwaW5nIjp0cnVlLCJjdXJyZW5jeSI6IklOUiIsIml0ZW1zX3N1YnRvdGFsX3ByaWNlIjoxLCJjYXJ0X2xldmVsX2Rpc2NvdW50X2FwcGxpY2F0aW9ucyI6W119LCJtaWQiOiIxNzY5Y2RhYy0xOGEzLTRhZDctYWI3MS1hMjZlNWQ2M2ViOGEifQ==";
  const current = "ewogICAgImNhcnQiOiB7CiAgICAgICAgInRvdGFsX3ByaWNlIjogMiwKICAgICAgICAidG90YWxfZGlzY291bnQiOiAwLAogICAgICAgICJpdGVtX2NvdW50IjogMSwKICAgICAgICAiaXRlbXMiOiBbCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJpZCI6IDQzOTQ5Nzg3NzQyNDMwLAogICAgICAgICAgICAgICAgInF1YW50aXR5IjogMSwKICAgICAgICAgICAgICAgICJ2YXJpYW50X2lkIjogNDM5NDk3ODc3NDI0MzAsCiAgICAgICAgICAgICAgICAidGl0bGUiOiAiQXJ0aWZpY2lhbCBmbG93ZXIgLSBBbXV5YSIsCiAgICAgICAgICAgICAgICAicHJpY2UiOiAyLAogICAgICAgICAgICAgICAgIm9yaWdpbmFsX3ByaWNlIjogMiwKICAgICAgICAgICAgICAgICJkaXNjb3VudGVkX3ByaWNlIjogMiwKICAgICAgICAgICAgICAgICJ0b3RhbF9kaXNjb3VudCI6IDAsCiAgICAgICAgICAgICAgICAiZGlzY291bnRzIjogW10sCiAgICAgICAgICAgICAgICAic2t1IjogIiIsCiAgICAgICAgICAgICAgICAiZ3JhbXMiOiAyMDAsCiAgICAgICAgICAgICAgICAidXJsIjogImh0dHBzOi8vY2RuLnNob3BpZnkuY29tL3MvZmlsZXMvMS8wNjY0LzE1MTYvNTY2Mi9wcm9kdWN0cy9GbG93ZXItYXJ0aWZpY2lhbC5qcGc/dj0xNjc1MDc5NDI3IiwKICAgICAgICAgICAgICAgICJpbWFnZSI6ICJodHRwczovL2Nkbi5zaG9waWZ5LmNvbS9zL2ZpbGVzLzEvMDY2NC8xNTE2LzU2NjIvcHJvZHVjdHMvRmxvd2VyLWFydGlmaWNpYWwuanBnP3Y9MTY3NTA3OTQyNyIKICAgICAgICAgICAgfQogICAgICAgIF0sCiAgICAgICAgInJlcXVpcmVzX3NoaXBwaW5nIjogdHJ1ZSwKICAgICAgICAiY3VycmVuY3kiOiAiSU5SIiwKICAgICAgICAiaXRlbXNfc3VidG90YWxfcHJpY2UiOiAyLAogICAgICAgICJjYXJ0X2xldmVsX2Rpc2NvdW50X2FwcGxpY2F0aW9ucyI6IFtdCiAgICB9LAogICAgIm1pZCI6ICI2MTg5NGI2Yy0xNTg0LTRmMjItODFiOS05NTdjMGU4NTA0YzMiCn0="
  return current
}

function newPayload8_5() {
  return "ewogICAgImNhcnQiOiB7CiAgICAgICAgInRvdGFsX3ByaWNlIjogOSwKICAgICAgICAidG90YWxfZGlzY291bnQiOiAwLAogICAgICAgICJpdGVtX2NvdW50IjogMiwKICAgICAgICAiaXRlbXMiOiBbCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJpZCI6IDQzOTQ5Nzg5Njc1NzQyLAogICAgICAgICAgICAgICAgInF1YW50aXR5IjogMSwKICAgICAgICAgICAgICAgICJ2YXJpYW50X2lkIjogNDM5NDk3ODk2NzU3NDIsCiAgICAgICAgICAgICAgICAidGl0bGUiOiAiQXJ0aWZpY2lhbCBmbG93ZXIgLSBBcm9tYSIsCiAgICAgICAgICAgICAgICAicHJpY2UiOiA0LAogICAgICAgICAgICAgICAgIm9yaWdpbmFsX3ByaWNlIjogNCwKICAgICAgICAgICAgICAgICJkaXNjb3VudGVkX3ByaWNlIjogNCwKICAgICAgICAgICAgICAgICJ0b3RhbF9kaXNjb3VudCI6IDAsCiAgICAgICAgICAgICAgICAiZGlzY291bnRzIjogW10sCiAgICAgICAgICAgICAgICAic2t1IjogIiIsCiAgICAgICAgICAgICAgICAiZ3JhbXMiOiAyMDAsCiAgICAgICAgICAgICAgICAidXJsIjogImh0dHBzOi8vY2RuLnNob3BpZnkuY29tL3MvZmlsZXMvMS8wNjY0LzE1MTYvNTY2Mi9wcm9kdWN0cy9GbG93ZXItYXJ0aWZpY2lhbC0zLmpwZz92PTE2NzUwNzk0NjgiLAogICAgICAgICAgICAgICAgImltYWdlIjogImh0dHBzOi8vY2RuLnNob3BpZnkuY29tL3MvZmlsZXMvMS8wNjY0LzE1MTYvNTY2Mi9wcm9kdWN0cy9GbG93ZXItYXJ0aWZpY2lhbC0zLmpwZz92PTE2NzUwNzk0NjgiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJpZCI6IDQzNzE0NDgzMDkzNzI2LAogICAgICAgICAgICAgICAgInF1YW50aXR5IjogMSwKICAgICAgICAgICAgICAgICJ2YXJpYW50X2lkIjogNDM3MTQ0ODMwOTM3MjYsCiAgICAgICAgICAgICAgICAidGl0bGUiOiAiQXJ0aWZpY2lhbCBmbG93ZXIgLSBFeG90aWNhIiwKICAgICAgICAgICAgICAgICJwcmljZSI6IDUsCiAgICAgICAgICAgICAgICAib3JpZ2luYWxfcHJpY2UiOiA1LAogICAgICAgICAgICAgICAgImRpc2NvdW50ZWRfcHJpY2UiOiA1LAogICAgICAgICAgICAgICAgInRvdGFsX2Rpc2NvdW50IjogMCwKICAgICAgICAgICAgICAgICJkaXNjb3VudHMiOiBbXSwKICAgICAgICAgICAgICAgICJza3UiOiAiMTIyMiIsCiAgICAgICAgICAgICAgICAiZ3JhbXMiOiAyMDAsCiAgICAgICAgICAgICAgICAidXJsIjogImh0dHBzOi8vY2RuLnNob3BpZnkuY29tL3MvZmlsZXMvMS8wNjY0LzE1MTYvNTY2Mi9wcm9kdWN0cy9hcnRpZmljaWFsZmxvd2VyLmpwZz92PTE2NzUwNzkzNzkiLAogICAgICAgICAgICAgICAgImltYWdlIjogImh0dHBzOi8vY2RuLnNob3BpZnkuY29tL3MvZmlsZXMvMS8wNjY0LzE1MTYvNTY2Mi9wcm9kdWN0cy9hcnRpZmljaWFsZmxvd2VyLmpwZz92PTE2NzUwNzkzNzkiCiAgICAgICAgICAgIH0KICAgICAgICBdLAogICAgICAgICJyZXF1aXJlc19zaGlwcGluZyI6IHRydWUsCiAgICAgICAgImN1cnJlbmN5IjogIklOUiIsCiAgICAgICAgIml0ZW1zX3N1YnRvdGFsX3ByaWNlIjogOSwKICAgICAgICAiY2FydF9sZXZlbF9kaXNjb3VudF9hcHBsaWNhdGlvbnMiOiBbXQogICAgfSwKICAgICJtaWQiOiAiNjE4OTRiNmMtMTU4NC00ZjIyLTgxYjktOTU3YzBlODUwNGMzIgp9"
}

function getIframeUrl() {
  const NGROK = "https://b223-175-100-183-105.ngrok.io"
  const LOCALHOST = "http://localhost:3000"
  return NGROK + "/?payload=" + getPayload1();
}
