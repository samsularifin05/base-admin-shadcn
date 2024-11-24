import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  handleSetPageSidebar: boolean;
  handleSetPageHeader: boolean;
  handleSetContent: boolean;
  handleSetFooter: boolean;
  appSidebarEndMobileToggled: boolean;
  appSidebarMinify: boolean;
  getIsLogin: boolean;
  themeColor: string;
}

const initialState: ThemeState = {
  handleSetPageSidebar: true,
  handleSetPageHeader: true,
  handleSetContent: true,
  handleSetFooter: true,
  appSidebarEndMobileToggled: false,
  appSidebarMinify: false,
  getIsLogin: false,
  themeColor: 'zinc'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setSidebar(state, action: PayloadAction<boolean>) {
      state.handleSetPageSidebar = action.payload;
    },
    setHeader(state, action: PayloadAction<boolean>) {
      state.handleSetPageHeader = action.payload;
    },
    setContent(state, action: PayloadAction<boolean>) {
      state.handleSetContent = action.payload;
    },
    setFooter(state, action: PayloadAction<boolean>) {
      state.handleSetFooter = action.payload;
    },
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.appSidebarEndMobileToggled = action.payload;
    },
    minifySidebar(state, action: PayloadAction<boolean>) {
      state.appSidebarMinify = action.payload;
    },
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.getIsLogin = action.payload;
    },
    setThemeColor(state, action: PayloadAction<string>) {
      state.themeColor = action.payload;
    }
  }
});

const {
  setSidebar,
  setHeader,
  setContent,
  setFooter,
  toggleSidebar,
  minifySidebar,
  setIsLogin,
  setThemeColor
} = themeSlice.actions;

export const themesActions = {
  setSidebar,
  setHeader,
  setContent,
  setFooter,
  toggleSidebar,
  minifySidebar,
  setIsLogin,
  setThemeColor
};

export default themeSlice.reducer;
