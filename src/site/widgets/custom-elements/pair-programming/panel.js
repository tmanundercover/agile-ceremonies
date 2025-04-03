"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var editor_1 = require("@wix/editor");
var design_system_1 = require("@wix/design-system");
require("@wix/design-system/styles.global.css");
var SITE_WIDGETS_DOCS = 'https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/site-extensions/site-widgets/site-widget-extension-files-and-code';
var Panel = function () {
    var _a = (0, react_1.useState)(''), displayName = _a[0], setDisplayName = _a[1];
    (0, react_1.useEffect)(function () {
        editor_1.widget.getProp('display-name')
            .then(function (displayName) { return setDisplayName(displayName || "Your Widget's Title"); })
            .catch(function (error) { return console.error('Failed to fetch display-name:', error); });
    }, [setDisplayName]);
    var handleDisplayNameChange = (0, react_1.useCallback)(function (event) {
        var newDisplayName = event.target.value;
        setDisplayName(newDisplayName);
        editor_1.widget.setProp('display-name', newDisplayName);
    }, [setDisplayName]);
    return (<design_system_1.WixDesignSystemProvider>
      <design_system_1.SidePanel width="300" height="100vh">
        <design_system_1.SidePanel.Content noPadding stretchVertically>
          <design_system_1.SidePanel.Field>
            <design_system_1.FormField label="Display Name">
              <design_system_1.Input type="text" value={displayName} onChange={handleDisplayNameChange} aria-label="Display Name"/>
            </design_system_1.FormField>
          </design_system_1.SidePanel.Field>
        </design_system_1.SidePanel.Content>
        <design_system_1.SidePanel.Footer noPadding>
          <design_system_1.SectionHelper fullWidth appearance="success" border="topBottom">
            Learn more about <a href={SITE_WIDGETS_DOCS} target="_blank" rel="noopener noreferrer" title="Site Widget docs">Site Widgets</a>
          </design_system_1.SectionHelper>
        </design_system_1.SidePanel.Footer>
      </design_system_1.SidePanel>
    </design_system_1.WixDesignSystemProvider>);
};
exports.default = Panel;
