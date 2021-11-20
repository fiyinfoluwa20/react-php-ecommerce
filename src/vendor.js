var Webpack_modules__ = ({
  // "./types/styles.ts":
  function(__unused_webpack_module, exports) {
      var __assign = (this && this.__assign) || function () {
          __assign = Object.assign || function(t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                      t[p] = s[p];
              }
              return t;
          };
          return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", ({ value: true }));
      var Lavalamp = (function () {
          function E(wrapper, customSettings) {
              var _this = this;
              var defaultSettings = {
                easing: 'ease',
                duration: 700,
                margins: false,
                setOnClick: false,
                initActiveQuery: '.active',
                enableHover: true,
                delayOn: 0,
                delayOff: 0,
                enableFocus: false,
                deepFocus: false,
              };
              this.settings = __assign(__assign({}, defaultSettings), customSettings);
              this.wrapper = wrapper;
              if (!this.wrapper) {
                return;
              }
              for (var i = 0; i < this.wrapper.children.length; i++) {
                  this.wrapper.children[i].className += " lavalamp__item";
              }
              this.children = wrapper.querySelectorAll(".lavalamp__item");
              this.activeElement = wrapper.querySelector(this.settings.initActiveQuery);
          
              this.Eo = document.createElement('div');
              this.Eo.className = "lavalamp__object "+customSettings.move;
              this.Eo.style.transitionDuration = this.settings.duration / 1e3 + "s";
              this.wrapper.prepend(this.Eo);
              if (this.settings.enableHover) {
                  this.children.forEach(function (element) {
                      element.addEventListener("mouseenter", _this.mouseEnter.bind(_this));
                      element.addEventListener("mouseleave", _this.mouseLeave.bind(_this));
                  });
              }
              if (this.settings.deepFocus) {
                  this.wrapper.querySelectorAll("*").forEach(function (element) {
                      element.addEventListener("focusin", _this.focusIn.bind(_this));
                      element.addEventListener("focusout", _this.focusOut.bind(_this));
                  });
              }
              else if (this.settings.enableFocus) {
                  this.children.forEach(function (element) {
                      element.addEventListener("focusin", _this.focusIn.bind(_this));
                      element.addEventListener("focusout", _this.focusOut.bind(_this));
                  });
              }
              if (this.settings.setOnClick) {
                  this.children.forEach(function (element) {
                      element.addEventListener("mousedown", _this.setOnClick.bind(_this));
                  });
              }
                  _this.reposition(_this.activeElement);
          }
          E.prototype.setOnClick = function (e) {
              this.activeElement = e.target;
              this.reposition(e.target);
          };
          E.prototype.mouseEnter = function (e) {
              var _this = this;
              this.isHovered = true;
              setTimeout(function () {
                  if (_this.isHovered && !_this.isFocused) {
                      _this.reposition(e.target);
                  }
              }, this.settings.delayOn);
          };
          E.prototype.mouseLeave = function () {
              var _this = this;
              this.isHovered = false;
              setTimeout(function () {
                  if (!_this.isHovered && !_this.isFocused) {
                      _this.reposition(_this.activeElement);
                  }
              }, this.settings.delayOff);
          };
          E.prototype.focusIn = function (e) {
              var _this = this;
              this.isFocused = true;
              var lavalampItem = e.target;
              if (!lavalampItem.hasClass("lavalamp__item")) {
                  lavalampItem = lavalampItem.closest(".lavalamp__item");
              }
              setTimeout(function () {
                  _this.reposition(lavalampItem);
              }, this.settings.delayOn);
          };
          E.prototype.focusOut = function () {
              var _this = this;
              this.isFocused = false;
              setTimeout(function () {
                  _this.reposition(_this.activeElement);
              }, this.settings.delayOff);
          };
          E.prototype.reposition = function (target) {
              var _this = this;
              var style = window.getComputedStyle(target);
              var marginTop = parseFloat(style.marginLeft) || 0;
              var marginLeft = parseFloat(style.marginLeft) || 0;
              var marginRight = parseFloat(style.marginRight) || 0;
              var marginBottom = parseFloat(style.marginBottom) || 0;
              var width = target.offsetWidth;
              var height = target.offsetHeight;
              var offsetTop = target.offsetTop;
              var offsetLeft = target.offsetLeft;
              if (this.settings.margins) {
                  offsetLeft = offsetLeft - marginLeft;
                  offsetTop = offsetTop - marginTop;
                  width = width + marginLeft + marginRight;
                  height = height + marginTop + marginBottom;
              }
              this.isAnimating = true;
              this.Eo.style.width = width + "px";
              this.Eo.style.height = height + "px";
              this.Eo.style.transform = "translate(" + offsetLeft + "px," + offsetTop + "px)";
              setTimeout(function () {
                  _this.isAnimating = false;
              }, this.settings.duration);
          };
          return E;
      }());
      module.exports = Lavalamp;
  }

});
var __webpack_module_cache__ = {};
function Webpack_require__(moduleId) {
    if(__webpack_module_cache__ && __webpack_module_cache__[moduleId]) {
        return __webpack_module_cache__[moduleId].exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
        exports: {}
    };
    Webpack_modules__[moduleId].call(module.exports, module, module.exports, Webpack_require__);
    return module.exports;
}
// Webpack_require__("./types/styles.ts");