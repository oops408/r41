"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Heading = _interopRequireDefault(require("@react/react-spectrum/Heading"));

var _reactIntl = require("react-intl");

var _Branding = _interopRequireDefault(require("../../header/presentation/branding/Branding"));

var _ServiceRegistry = _interopRequireDefault(require("../../../../util/ServiceRegistry"));

require("!style-loader!css-loader!./HidingBranding.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2021 Adobe
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
**************************************************************************/
const BRANDING_LABEL_KEY = "POWERED_BY";
/**
 * Layout for hiding branding
 */

class HidingBrandingView extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "sdk-HidingBranding-branding",
      ref: ref => this.props.setRef(ref)
    }, /*#__PURE__*/_react.default.createElement(_Branding.default, null), /*#__PURE__*/_react.default.createElement(_Heading.default, {
      size: 2,
      className: "sdk-HidingBranding-label",
      "aria-hidden": true
    }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedHTMLMessage, {
      id: BRANDING_LABEL_KEY,
      values: {
        brandingTitle: _ServiceRegistry.default.getService("AppStore").intl.formatMessage({
          id: "ADOBE_ACROBAT"
        })
      }
    })));
  }

}

exports.default = HidingBrandingView;
HidingBrandingView.propTypes = {
  setRef: _propTypes.default.func.isRequired
};