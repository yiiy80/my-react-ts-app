import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { UserForm } from "../components/UserProfileEditor";
import type { RegistrationForm } from "../components/UserRegistration";

// 默认用户数据
const defaultUserData: UserForm = {
  name: "张三",
  email: "zhangsan@example.com",
  phone: "+86 138 0000 0000",
  bio: "热爱前端开发，专注于 React 和 TypeScript。拥有丰富的全栈项目经验，致力于构建高性能的用户体验。",
  preferences: {
    newsletter: true,
    notifications: false,
  },
};

// 应用状态类型
export interface AppState {
  currentView: "view" | "edit" | "register";
  userData: UserForm;
}

// 动作类型
export type AppAction =
  | { type: "SET_VIEW"; payload: AppState["currentView"] }
  | { type: "UPDATE_USER_DATA"; payload: UserForm }
  | { type: "REGISTER_USER"; payload: RegistrationForm };

// Reducer 函数
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_VIEW":
      return {
        ...state,
        currentView: action.payload,
      };

    case "UPDATE_USER_DATA":
      console.log("保存的数据:", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
        currentView: "view",
      };

    case "REGISTER_USER":
      const newUserData: UserForm = {
        name: action.payload.username,
        email:
          action.payload.contactType === "email" ? action.payload.contact : "",
        phone:
          action.payload.contactType === "phone" ? action.payload.contact : "",
        bio: action.payload.bio,
        preferences: {
          newsletter: true,
          notifications: true,
        },
      };
      console.log("注册成功:", JSON.stringify(action.payload));
      return {
        ...state,
        userData: newUserData,
        currentView: "view",
      };

    default:
      return state;
  }
};

// Context 类型
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // 便捷方法
  handleEdit: () => void;
  handleSave: (data: UserForm) => void;
  handleCancel: () => void;
  handleRegister: (data: RegistrationForm) => void;
  handleGoToRegister: () => void;
}

// 创建 Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider 组件
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, {
    currentView: "view",
    userData: defaultUserData,
  });

  // 便捷方法
  const handleEdit = () => {
    dispatch({ type: "SET_VIEW", payload: "edit" });
  };

  const handleSave = (data: UserForm) => {
    dispatch({ type: "UPDATE_USER_DATA", payload: data });
  };

  const handleCancel = () => {
    dispatch({ type: "SET_VIEW", payload: "view" });
  };

  const handleRegister = (data: RegistrationForm) => {
    dispatch({ type: "REGISTER_USER", payload: data });
  };

  const handleGoToRegister = () => {
    dispatch({ type: "SET_VIEW", payload: "register" });
  };

  const value: AppContextType = {
    state,
    dispatch,
    handleEdit,
    handleSave,
    handleCancel,
    handleRegister,
    handleGoToRegister,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 使用 Context 的 Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
