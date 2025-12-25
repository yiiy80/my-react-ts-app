import { useState } from "react";

// --- 1. 类型定义 (TypeScript) ---
export interface UserForm {
  name: string;
  email: string;
  phone: string;
  bio: string;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
}

// --- 3. 主组件接口 ---
interface Props {
  data: UserForm;
  onSave?: (data: UserForm) => void;
  onCancel?: () => void;
}

// --- 4. 主组件 ---
export default function UserProfileEditor({ data, onSave, onCancel }: Props) {
  // 使用泛型指定 state 类型，优先使用传入的 initialData，否则使用默认数据
  const [formData, setFormData] = useState<UserForm>(data);
  const [isSaving, setIsSaving] = useState(false);

  // --- 4. 事件处理函数 ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // 处理嵌套对象 (如 preferences.newsletter)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof UserForm] as Record<string, any>),
          [child]:
            type === "checkbox"
              ? (e.target as HTMLInputElement).checked
              : value,
        },
      });
    } else {
      // 处理普通字段
      setFormData({
        ...formData,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // 模拟 API 调用
    setTimeout(() => {
      console.log("保存数据:", JSON.stringify(formData));
      setIsSaving(false);
      onSave?.(formData);
    }, 1000);
  };

  // --- 5. JSX 结构 (Tailwind CSS 样式) ---
  return (
    <div className="w-200 min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      {/* 页面标题栏 */}
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              编辑用户资料
            </h1>
            <p className="text-center text-gray-500 mt-1">
              更新你的个人信息和偏好设置
            </p>
          </div>
          {/* 返回/编辑按钮 (示例) */}
          <button
            onClick={onCancel}
            className="px-4 py-1 bg-gray-100 text-blue-400 outline-none ring-2 ring-gray-300 text-sm font-bold rounded-lg
                     hover:bg-gray-50 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            返回
          </button>
        </div>
      </div>

      {/* 主体卡片 */}
      <div className="relative py-4 sm:max-w-3xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-8 p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本信息行 */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 姓名 */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* 邮箱 */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  邮箱地址
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* 联系方式 */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                手机号码
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* 简介 - 多行文本 */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                个人简介
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="介绍一下你自己..."
              />
            </div>

            {/* 偏好设置 - 复选框组 */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                通知偏好
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      name="preferences.newsletter"
                      type="checkbox"
                      checked={formData.preferences.newsletter}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="newsletter"
                      className="font-medium text-gray-700"
                    >
                      订阅新闻通讯
                    </label>
                    <p className="text-gray-500">
                      接收我们的每周产品更新和提示。
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notifications"
                      name="preferences.notifications"
                      type="checkbox"
                      checked={formData.preferences.notifications}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="notifications"
                      className="font-medium text-gray-700"
                    >
                      推送站内通知
                    </label>
                    <p className="text-gray-500">当有新评论或点赞时通知我。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 提交按钮 */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg 
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                         transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSaving ? "保存中..." : "保存更改"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
