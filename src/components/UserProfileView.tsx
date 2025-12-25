import type { UserForm } from "./UserProfileEditor"; // 假设类型定义在编辑组件中导出

interface Props {
  data: UserForm;
  onEdit?: () => void;
  onRegister?: () => void;
}

export default function UserProfileView({ data, onEdit, onRegister }: Props) {
  return (
    <div className="w-200 min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      {/* 页面标题栏 */}
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">用户资料详情</h1>
            <p className="text-gray-500 mt-1">查看当前用户的配置信息</p>
          </div>
          {/* 按钮组 */}
          <div className="flex space-x-2">
            {onRegister && (
              <button
                onClick={onRegister}
                className="px-4 py-1 bg-blue-100 text-blue-600 outline-none ring-2 ring-blue-300 text-sm font-bold rounded-lg
                         hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                用户注册
              </button>
            )}
            <button
              onClick={onEdit}
              className="px-4 py-1 bg-gray-100 text-green-400 outline-none ring-2 ring-gray-300 text-sm font-bold rounded-lg
                       hover:bg-gray-50 hover:text-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              编辑资料
            </button>
          </div>
        </div>
      </div>

      {/* 主体卡片 */}
      <div className="relative py-4 sm:max-w-3xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="absolute inset-0 bg-linear-to-r from-green-500 to-emerald-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-8 p-4">
          {/* 基础信息网格 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                全名
              </label>
              <div className="mt-1 text-gray-900 font-semibold text-lg">
                {data.name}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                邮箱地址
              </label>
              <div className="mt-1 text-gray-900">{data.email}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                联系电话
              </label>
              <div className="mt-1 text-gray-900">{data.phone}</div>
            </div>
          </div>

          {/* 个人简介区块 */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-500 mb-2">
              个人简介
            </label>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.bio}
            </p>
          </div>

          {/* 偏好设置区块 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">通知偏好</h3>

            <div className="space-y-4">
              {/* 订阅新闻通讯 */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">订阅新闻通讯</p>
                  <p className="text-sm text-gray-500">
                    接收我们的每周产品更新和提示。
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    data.preferences.newsletter
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.preferences.newsletter ? "已开启" : "已关闭"}
                </span>
              </div>

              {/* 推送站内通知 */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">推送站内通知</p>
                  <p className="text-sm text-gray-500">
                    当有新评论或点赞时通知我。
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    data.preferences.notifications
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.preferences.notifications ? "已开启" : "已关闭"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
