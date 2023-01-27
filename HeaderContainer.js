"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobxReact = require("mobx-react");

var _react = _interopRequireWildcard(require("react"));

var _mobx = require("mobx");

var _ServiceRegistry = _interopRequireDefault(require("../../../../util/ServiceRegistry"));

var _Events = _interopRequireDefault(require("../../../../constants/Events"));

var _TopBarAction = _interopRequireDefault(require("../../icons/top-bar-action/TopBarAction"));

var _AppUtil = require("../../../../util/AppUtil");

var _ComponentRegistry = _interopRequireDefault(require("../../../../util/ComponentRegistry"));

var _ConfigStoreConstants = require("../../../../constants/ConfigStoreConstants");

var _class, _class2, _descriptor, _descriptor2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const mergeActions = (topBarActions, sideMenuActions, numOfTopBarAction) => {
  const topBarActionsAsJSON = !!(topBarActions && topBarActions.length > 0 && topBarActions[0].label);
  const sideMenuActionsAsJSON = !!(sideMenuActions && sideMenuActions.length > 0 && sideMenuActions[0].label);

  if (topBarActionsAsJSON && sideMenuActionsAsJSON) {
    /** Both containing JSON objects */
    const mergedTempActions = [...topBarActions, ...sideMenuActions];

    if (topBarActions.length > numOfTopBarAction) {
      /** merge and filter */
      return {
        topBarActions: mergedTempActions.slice(0, numOfTopBarAction),
        sideMenuActions: mergedTempActions.slice(numOfTopBarAction)
      };
    }
  }

  if (sideMenuActionsAsJSON) {
    /** Only side menu actions as JSON objects or
    filter condition above not satisfied */
    return {
      topBarActions,
      sideMenuActions
    };
  }

  if (topBarActionsAsJSON) {
    /** Only top bar actions as JSON objects */
    return {
      topBarActions,
      sideMenuActions
    };
  }

  return {
    /** Both NOT containing JSON objects, can't merge with header config actions */
    topBarActions,
    sideMenuActions
  };
};

const NUMBER_OF_TOP_BAR_ACTIONS = {
  HIGH_RESOLUTION: 6,
  MEDIUM_RESOLUTION: 6,
  LOW_RESOLUTION: 3
};
const SCREEN_SIZE = {
  MEDIUM: 800,
  LOW: 750
};
/**
 * Container component for header
 */

let HeaderContainer = (0, _mobxReact.observer)(_class = (_class2 = class HeaderContainer extends _react.Component {
  constructor() {
    super();

    _initializerDefineProperty(this, "numOfTopBarAction", _descriptor, this);

    this.config = {};

    _initializerDefineProperty(this, "navConfig", _descriptor2, this);

    this._loggingService = _ServiceRegistry.default.getService("LoggingService");
    this._uiHandler = _ServiceRegistry.default.getService("UIHandler");
    this._appStore = _ServiceRegistry.default.getService("AppStore");
    this._headerRef = _react.default.createRef();
    this._handleMouseOut = this._handleMouseOut.bind(this);
    this._handleMouseMoveOver = this._handleMouseMoveOver.bind(this);
    this._getNumOfTopBarAction = this._getNumOfTopBarAction.bind(this);
    this._touchStart = this._touchStart.bind(this);
    this._touchMove = this._touchMove.bind(this);
    this._touchEnd = this._touchEnd.bind(this);
    this._tapOnDevice = this._tapOnDevice.bind(this);

    this._getNumOfTopBarAction();
  }

  getEventForAction() {
    return _Events.default.ACTION_ICONS;
  }

  getDOMElementForEvent() {
    return (0, _AppUtil.getDOMElement)();
  }

  componentDidMount() {
    _ServiceRegistry.default.getService("EventsService").registerEventListener(this.getEventForAction(), eventData => {
      const sortedTopbarActionsList = (0, _AppUtil.sortTopbarActionsList)(eventData.topbarConfig, _ConfigStoreConstants.TOPBAR_ACTION_LIST);
      this.setNavConfig({
        topBarActions: sortedTopbarActionsList,
        sideMenuActions: eventData.sideMenuConfig
      });
    });

    window.addEventListener("resize", this._getNumOfTopBarAction);

    if (this._appStore.isHidingHeader) {
      this.getDOMElementForEvent().addEventListener("mousemove", this._handleMouseMoveOver);
      this.getDOMElementForEvent().addEventListener("mouseout", this._handleMouseOut);

      if (this._appStore.isOnDevice) {
        // getDOMElement().addEventListener("click", this._tapOnDevice);
        this.getDOMElementForEvent().addEventListener("touchstart", this._touchStart);
        this.getDOMElementForEvent().addEventListener("touchmove", this._touchMove);
        this.getDOMElementForEvent().addEventListener("touchend", this._touchEnd);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._getNumOfTopBarAction);

    if (this._appStore.isHidingHeader) {
      this.getDOMElementForEvent().removeEventListener("mousemove", this._handleMouseMoveOver);
      this.getDOMElementForEvent().removeEventListener("mouseout", this._handleMouseOut);

      if (this._appStore.isOnDevice) {
        // window.document.removeEventListener("click", this._tapOnDevice);
        this.getDOMElementForEvent().removeEventListener("touchstart", this._touchStart);
        this.getDOMElementForEvent().removeEventListener("touchmove", this._touchMove);
        this.getDOMElementForEvent().removeEventListener("touchend", this._touchEnd);
      }
    }
  }

  setNavConfig(value) {
    this.navConfig = value;
  }

  setNumOfTopBarAction(value) {
    let numOfTopBarAction = value;

    if (numOfTopBarAction > 3) {
      const commentsApi = _ServiceRegistry.default.getService("CommentsApi");

      if (commentsApi.isFreetextEnabled()) numOfTopBarAction += 1;
      if (commentsApi.isEraserToolEnabled()) numOfTopBarAction += 1;
    }

    this.numOfTopBarAction = numOfTopBarAction;
  }

  _getNumOfTopBarAction() {
    if (window.innerWidth >= SCREEN_SIZE.MEDIUM) {
      this.setNumOfTopBarAction(NUMBER_OF_TOP_BAR_ACTIONS.HIGH_RESOLUTION);
    } else if (window.innerWidth >= SCREEN_SIZE.LOW) {
      this.setNumOfTopBarAction(NUMBER_OF_TOP_BAR_ACTIONS.MEDIUM_RESOLUTION);
    } else {
      this.setNumOfTopBarAction(NUMBER_OF_TOP_BAR_ACTIONS.LOW_RESOLUTION);
    }
  }

  _touchStart() {
    // Reset any touch move
    this._noTouchMovement = true;
  }

  _touchMove() {
    this._noTouchMovement = false;
  }

  _touchEnd() {
    if (this._noTouchMovement) {
      this._tapOnDevice();
    }
  }

  _tapOnDevice() {
    this._uiHandler.showHeaderAndHUD((0, _AppUtil.getDOMElement)().clientHeight);
  }

  _handleMouseOut() {
    if (!this._headerRef || !this._headerRef.style) {
      return;
    }

    this._uiHandler.fadeHeaderAndHUD((0, _AppUtil.getDOMElement)().clientHeight);
  }

  _handleMouseMoveOver(event) {
    if (!event || this._appStore.searchOpen) {
      return;
    }

    const reactElement = (0, _AppUtil.getDOMElement)().getBoundingClientRect();
    const normalisedClientY = event.clientY - reactElement.top;

    if (this._uiHandler.inHoverRangeOfHeaderAndHUD(normalisedClientY)) {
      this._uiHandler.showHeaderAndHUD(normalisedClientY);
    }
  }

  shouldHideAnnotationTools() {
    return (0, _AppUtil.isMobileBrowser)() || !this._appStore.isEditAllowed || !this._appStore.configStore.showCommentingToolbar || !this._appStore.getActionConfig("preview").showAnnotationTools;
  }

  getProps() {
    return {};
  }

  _adjustSearchUI() {}

  render() {
    if (this._appStore.isHidingHeader) {
      if (this._appStore.searchOpen) {
        if (this._headerRef && this._headerRef.style) this._headerRef.style.opacity = 0.8;
      } else {
        // Make sure header auto hide, as search might close due to keyboard action
        this._uiHandler.showHeaderAndHUD(100);
      }
    }

    if (this._appStore.searchOpen) {
      this._adjustSearchUI(this._setToTop);
    }

    Object.assign(this.config, this.navConfig);
    const {
      /** List of actions which will be placed in the top bar */
      topBarActions,

      /** List of actions which will be placed in the side menu */
      sideMenuActions
    } = this.config;
    const mergedActions = mergeActions(topBarActions, sideMenuActions, this.numOfTopBarAction);
    let topBarMenus = [];

    if (mergedActions.topBarActions) {
      topBarMenus = [...mergedActions.topBarActions];
    }

    let sideMenus = [];

    if (mergedActions.sideMenuActions) {
      sideMenus = [...mergedActions.sideMenuActions];
    }

    let searchAction;
    topBarMenus.forEach(val => {
      if (val.id === "documentSearch") {
        searchAction = val;
      }
    });

    if (!searchAction) {
      sideMenus.forEach(val => {
        if (val.id === "documentSearch") {
          searchAction = val;
        }
      });
    }

    if (!this._appStore.getConfig().showTopBar) {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "none"
        }
      }, searchAction && /*#__PURE__*/_react.default.createElement(_TopBarAction.default, {
        action: searchAction
      }));
    }

    if (searchAction) {
      this.searchAction = searchAction;
    }

    if (this.searchAction && this._appStore.searchOpen && this._appStore.adjustSearchUI) {
      topBarMenus = topBarMenus.filter(val => val.id !== "documentSearch");
      topBarMenus.push(_objectSpread(_objectSpread({}, this.searchAction), {}, {
        onClick: () => {}
      }));
      setTimeout(() => {
        const documentSearch = document.getElementById("documentSearch");

        if (documentSearch && documentSearch.childNodes && documentSearch.childNodes.length > 0 && documentSearch.childNodes[0].childNodes && documentSearch.childNodes[0].childNodes.length > 0) {
          documentSearch.childNodes[0].childNodes[0].style.fill = "#1473e6";
        }
      }, 10);
    } else if (this.searchAction) {
      const search = topBarMenus.find(menu => menu.id === "documentSearch") || sideMenus.find(menu => menu.id === "documentSearch"); // Handling post conversion cases

      if (!search) {
        topBarMenus.push(this.searchAction);
      }
    }

    const printAction = topBarMenus.filter(val => val.id === "documentPrint");

    if (printAction && printAction.length === 1) {
      topBarMenus = topBarMenus.filter(val => val.id !== "documentPrint");
      sideMenus.push(printAction[0]);
    }

    if (!this._appStore.configStore.showDownload) {
      if (sideMenus) {
        sideMenus = sideMenus.filter(val => val.id !== "documentDownload");
      }
    }

    if (!this._appStore.configStore.showPrint) {
      if (sideMenus) {
        sideMenus = sideMenus.filter(val => val.id !== "documentPrint");
      }
    }

    if (sideMenus && sideMenus.length > 1) {
      // make sure print is not the first
      const printA = sideMenus.filter(val => val.id === "documentPrint");

      if (printA && printA.length === 1) {
        sideMenus = sideMenus.filter(val => val.id !== "documentPrint");
        sideMenus.push(printA[0]);
      }
    }

    if (sideMenus && sideMenus.length === 1 && !this._appStore.configStore.hasAdobeMenuActions()) {
      topBarMenus = [...topBarMenus, ...sideMenus];
      sideMenus = [];
    }

    const setRef = ref => {
      this._headerRef = ref;

      this._uiHandler.initialiseHeaderRef(ref);
    };

    if (this.shouldHideAnnotationTools()) {
      if (topBarMenus) {
        topBarMenus = topBarMenus.filter(val => _ConfigStoreConstants.ANNOTATION_TOOL_IDS.indexOf(val.id) === -1);
      }

      if (sideMenus) {
        sideMenus = sideMenus.filter(val => _ConfigStoreConstants.ANNOTATION_TOOL_IDS.indexOf(val.id) === -1);
      }
    }

    if (this._appStore.getActionConfig("preview").enableSearchAPIs) {
      if (topBarMenus) {
        topBarMenus = topBarMenus.filter(val => val.id !== "documentSearch");
      }

      if (sideMenus) {
        sideMenus = sideMenus.filter(val => val.id !== "documentSearch");
      }
    }

    const makeToolsInactive = this._appStore.isIntegration && this._appStore.isToolsInactive;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _ComponentRegistry.default.getComponent("HeaderView", _objectSpread({
      topBarActions: topBarMenus || [],
      sideMenuActions: sideMenus || [],
      inFullScreen: this._appStore.inFullScreen,
      showFullScreen: this._appStore.configStore.showFullScreen,
      exitPDFViewerType: this._appStore.configStore.exitPDFViewerType,
      setRef,
      viewMode: this._appStore.currentViewMode,
      searchOpen: this._appStore.searchOpen,
      previewRef: this._appStore.previewRef,
      fileStatus: this._appStore.fileStatus,
      makeToolsInactive
    }, this.getProps())));
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "setNavConfig", [_mobx.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNavConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNumOfTopBarAction", [_mobx.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNumOfTopBarAction"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "numOfTopBarAction", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return NUMBER_OF_TOP_BAR_ACTIONS.HIGH_RESOLUTION;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "navConfig", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
})), _class2)) || _class;

var _default = HeaderContainer;
exports.default = _default;