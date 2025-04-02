import React, { useState, useEffect, useCallback } from 'react';
import { widget } from '@wix/editor';
import { SidePanel, WixDesignSystemProvider, Input, FormField, SectionHelper, } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
const SITE_WIDGETS_DOCS = 'https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/site-extensions/site-widgets/site-widget-extension-files-and-code';
const Panel = () => {
    const [displayName, setDisplayName] = useState('');
    useEffect(() => {
        widget.getProp('display-name')
            .then(displayName => setDisplayName(displayName || `Your Widget's Title`))
            .catch(error => console.error('Failed to fetch display-name:', error));
    }, [setDisplayName]);
    const handleDisplayNameChange = useCallback((event) => {
        const newDisplayName = event.target.value;
        setDisplayName(newDisplayName);
        widget.setProp('display-name', newDisplayName);
    }, [setDisplayName]);
    return (React.createElement(WixDesignSystemProvider, null,
        React.createElement(SidePanel, { width: "300", height: "100vh" },
            React.createElement(SidePanel.Content, { noPadding: true, stretchVertically: true },
                React.createElement(SidePanel.Field, null,
                    React.createElement(FormField, { label: "Display Name" },
                        React.createElement(Input, { type: "text", value: displayName, onChange: handleDisplayNameChange, "aria-label": "Display Name" })))),
            React.createElement(SidePanel.Footer, { noPadding: true },
                React.createElement(SectionHelper, { fullWidth: true, appearance: "success", border: "topBottom" },
                    "Learn more about ",
                    React.createElement("a", { href: SITE_WIDGETS_DOCS, target: "_blank", rel: "noopener noreferrer", title: "Site Widget docs" }, "Site Widgets"))))));
};
export default Panel;
