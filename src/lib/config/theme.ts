import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    // ========== Color Tokens ==========
    colorPrimary: 'var(--color-primary)',
    colorSuccess: 'var(--color-success)',
    colorWarning: 'var(--color-warning)',
    colorError: 'var(--color-error)',
    colorInfo: 'var(--color-info)',
    colorWhite: 'var(--color-primary)',

    colorPrimaryBg: 'var(--color-primary-bg)',
    colorPrimaryBgHover: 'var(--color-primary-bg-hover)',
    colorPrimaryBorder: 'var(--color-primary-border)',
    colorPrimaryBorderHover: 'var(--color-primary-border-hover)',
    colorPrimaryHover: 'var(--color-primary-hover)',
    colorPrimaryActive: 'var(--color-primary-active)',

    // Text colors
    colorText: 'var(--color-text-primary)',
    colorTextSecondary: 'var(--color-text-secondary)',
    colorTextTertiary: 'var(--color-text-tertiary)',
    colorTextQuaternary: 'var(--color-text-quaternary)',
    colorTextDisabled: 'var(--color-text-disabled)',
    colorTextHeading: 'var(--color-text-heading)',
    colorTextLabel: 'var(--color-text-label)',
    colorTextDescription: 'var(--color-text-description)',
    colorTextPlaceholder: 'var(--color-text-placeholder)',

    // INFO: Badge color
    colorTextLightSolid: 'white',

    // Background colors
    colorBgBase: 'var(--color-bg-base)',
    colorBgContainer: 'var(--color-bg-container)',
    colorBgElevated: 'var(--color-bg-elevated)',
    colorBgLayout: 'var(--color-bg-layout)',
    colorBgSpotlight: 'var(--color-bg-spotlight)',
    colorBgMask: 'var(--color-bg-mask)',

    // Border
    colorBorder: 'var(--color-border)',
    colorBorderSecondary: 'var(--color-border-secondary)',
    colorSplit: 'var(--color-split)',

    fontFamily: 'var(--font-family)',

    // Box Shadow
    boxShadow: 'var(--box-shadow-base)',
    boxShadowSecondary: 'var(--box-shadow-card)',

    // Animation
    motionDurationFast: 'var(--motion-duration-fast)',
    motionDurationMid: 'var(--motion-duration-mid)',
    motionDurationSlow: 'var(--motion-duration-slow)',
  },

  components: {
    // ========== Table Component ==========
    Table: {
      headerBg: 'var(--table-header-bg)',
      headerColor: 'var(--table-header-color)',
      headerSortActiveBg: 'var(--table-header-sort-active-bg)',
      headerSortHoverBg: 'var(--table-header-sort-bg)',
      headerFilterHoverBg: 'var(--table-header-filter-active-bg)',
      rowHoverBg: 'var(--table-row-hover-bg)',
      rowSelectedBg: 'var(--table-row-selected-bg)',
      rowSelectedHoverBg: 'var(--table-row-selected-hover-bg)',
      footerBg: 'var(--table-footer-bg)',
      footerColor: 'var(--table-footer-color)',
      borderColor: 'var(--table-border-color)',
      headerSplitColor: 'var(--table-header-cell-split-color)',
      fixedHeaderSortActiveBg: 'var(--table-fixed-header-sort-active-bg)',
      expandIconBg: 'var(--table-expand-icon-bg)',
      selectionColumnWidth: 60,
      stickyScrollBarBg: 'var(--table-sticky-scroll-bar-bg)',
      cellPaddingBlock: 16,
      cellPaddingInline: 16,
      cellPaddingBlockSM: 8,
      cellPaddingInlineSM: 8,
      headerBorderRadius: 0,
    },

    // ========== Text Component ==========
    Typography: {
      fontSize: 14,
      fontSizeSM: 12,
      fontSizeLG: 18,
      fontSizeXL: 24,
      titleMarginBottom: 0,
    },

    // ========== Button Component ==========
    Button: {
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,

      paddingContentHorizontal: 16,

      colorPrimaryHover: 'var(--color-primary-hover)',
      colorPrimaryActive: 'var(--color-primary-active)',

      primaryShadow: 'var(--button-primary-shadow)',
      dangerShadow: 'var(--button-danger-shadow)',
    },

    // ========== Input Component ==========
    Input: {
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
      paddingBlock: 4,
      paddingInline: 11,
      activeShadow: '0 0 0 2px var(--color-primary-bg)',
    },

    // ========== Select Component ==========
    Select: {
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
      optionSelectedBg: 'var(--select-item-selected-bg)',
      optionActiveBg: 'var(--select-item-active-bg)',
      selectorBg: 'var(--color-bg-container)',
    },

    // ========== Card Component ==========
    Card: {
      bodyPadding: 16,
      bodyPaddingSM: 12,

      borderRadius: 12,
      headerFontSize: 16,
      headerHeight: 56,
      headerBg: 'var(--card-head-bg)',
      actionsBg: 'var(--color-bg-container)',
      boxShadow: 'var(--card-shadow)',
    },

    // ========== Modal Component ==========
    Modal: {
      headerBg: 'var(--modal-header-bg)',
      contentBg: 'var(--modal-content-bg)',
      footerBg: 'var(--modal-footer-bg)',
      titleFontSize: 16,
      titleColor: 'var(--color-text-heading)',
    },

    // ========== Form Component ==========
    Form: {
      labelColor: 'var(--form-label-color)',
      labelRequiredMarkColor: 'var(--form-label-required-color)',
      itemMarginBottom: 24,
      verticalLabelPadding: '0 0 8px',
    },

    // ========== Menu Component ==========
    Menu: {
      itemColor: 'var(--menu-item-color)',
      itemHoverBg: 'var(--menu-item-hover-bg)',
      itemSelectedBg: 'var(--menu-item-selected-bg)',
      itemSelectedColor: 'var(--menu-item-selected-color)',
      itemActiveBg: 'var(--menu-item-active-bg)',
      horizontalItemSelectedColor: 'var(--color-primary)',
      darkItemBg: 'var(--menu-dark-bg)',
      darkItemColor: 'var(--menu-dark-item-color)',
      darkItemHoverBg: 'var(--menu-dark-item-hover-bg)',
      darkItemSelectedBg: 'var(--menu-dark-item-selected-bg)',
    },

    // ========== Pagination Component ==========
    Pagination: {
      itemBg: 'var(--pagination-item-bg)',
      itemActiveBg: 'var(--table-header-bg)',
      itemLinkBg: 'var(--pagination-item-link-bg)',
      itemActiveBgDisabled: 'var(--color-bg-disabled)',
    },

    // ========== Tabs Component ==========
    Tabs: {
      itemColor: 'var(--color-text-secondary)',
      itemSelectedColor: 'var(--color-primary)',
      itemHoverColor: 'var(--color-primary-hover)',
      itemActiveColor: 'var(--color-primary-active)',
      cardBg: 'var(--color-bg-container)',
    },

    // ========== Badge Component ==========
    Badge: {
      fontSize: 18,
      indicatorHeight: 28,
    },

    // ========== Tag Component ==========
    Tag: {
      defaultBg: 'var(--tag-default-bg)',
      defaultColor: 'var(--tag-default-color)',
    },

    // ========== Drawer Component ==========
    Drawer: {
      colorBgElevated: 'var(--color-bg-elevated)',
      colorSplit: 'var(--color-split)',
    },

    // ========== Dropdown Component ==========
    Dropdown: {
      controlItemBgActive: 'var(--select-item-active-bg)',
      controlItemBgHover: 'var(--select-item-active-bg)',
    },

    // ========== Steps Component ==========
    Steps: {
      navContentMaxWidth: 'auto',
    },

    // ========== Divider Component ==========
    Divider: {
      colorSplit: 'var(--color-split)',
      lineWidth: 1,
    },

    // ========== Notification Component ==========
    Notification: {
      width: 384,
    },

    // ========== Message Component ==========
    Message: {
      contentBg: 'var(--color-bg-elevated)',
    },
  },
};
