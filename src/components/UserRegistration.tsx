import { useState } from "react";

// 注册表单接口
export interface RegistrationForm {
  username: string;
  password: string;
  confirmPassword: string;
  contact: string; // 邮箱或手机号
  contactType: "email" | "phone";
  bio: string; // 个人简介
}

// 注册步骤
type RegistrationStep =
  | "input"
  | "verifying"
  | "waiting_code"
  | "creating_account";

interface Props {
  onRegister?: (data: RegistrationForm) => void;
  onCancel?: () => void;
}

export default function UserRegistration({ onRegister, onCancel }: Props) {
  const [step, setStep] = useState<RegistrationStep>("input");
  const [formData, setFormData] = useState<RegistrationForm>({
    username: "",
    password: "",
    confirmPassword: "",
    contact: "",
    contactType: "email",
    bio: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
    contact?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // 清除对应字段的错误
    if (name in fieldErrors) {
      setFieldErrors({
        ...fieldErrors,
        [name]: undefined,
      });
    }
    // 如果改变了联系方式类型，也清除contact的错误
    if (name === "contactType" && fieldErrors.contact) {
      setFieldErrors({
        ...fieldErrors,
        contact: undefined,
      });
    }
  };

  const validateForm = () => {
    const newFieldErrors: typeof fieldErrors = {};

    if (!formData.username.trim()) {
      newFieldErrors.username = "请输入用户名";
    }
    if (formData.password.length < 6) {
      newFieldErrors.password = "密码至少需要6个字符";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      newFieldErrors.password = "密码必须包含数字、大写字母和小写字母";
    }
    if (formData.password !== formData.confirmPassword) {
      newFieldErrors.confirmPassword = "两次输入的密码不一致";
    }
    if (!formData.contact.trim()) {
      newFieldErrors.contact = "请输入邮箱或手机号";
    } else {
      if (
        formData.contactType === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact)
      ) {
        newFieldErrors.contact = "请输入有效的邮箱地址";
      } else if (
        formData.contactType === "phone" &&
        !/^1[3-9]\d{9}$/.test(formData.contact)
      ) {
        newFieldErrors.contact = "请输入有效的手机号码";
      }
    }

    setFieldErrors(newFieldErrors);
    return Object.keys(newFieldErrors).length === 0;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStep("verifying");
    setIsLoading(true);

    // 模拟发送验证码
    setTimeout(() => {
      setIsLoading(false);
      setStep("waiting_code");
    }, 1000);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      // 这里可以添加验证码错误的处理，但暂时简单处理
      return;
    }

    setStep("creating_account");
    setIsLoading(true);

    // 模拟创建账户
    setTimeout(() => {
      setIsLoading(false);
      onRegister?.(formData);
    }, 1000);
  };

  const handleResendCode = () => {
    setIsLoading(true);
    // 模拟重发验证码
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const renderInputStep = () => (
    <form onSubmit={handleSubmitForm} className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          用户名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className={`block w-full px-4 py-2 border rounded-lg transition-colors ${
            fieldErrors.username
              ? "border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="请输入用户名"
          required
        />
        {fieldErrors.username && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.username}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          密码 <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={`block w-full px-4 py-2 border rounded-lg transition-colors ${
            fieldErrors.password
              ? "border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="请输入密码（至少6位，包含数字、大小写字母）"
          required
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          确认密码 <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={`block w-full px-4 py-2 border rounded-lg transition-colors ${
            fieldErrors.confirmPassword
              ? "border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="请再次输入密码"
          required
        />
        {fieldErrors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {fieldErrors.confirmPassword}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contactType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          联系方式类型
        </label>
        <select
          id="contactType"
          name="contactType"
          value={formData.contactType}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="email">邮箱</option>
          <option value="phone">手机</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {formData.contactType === "email" ? "邮箱地址" : "手机号码"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type={formData.contactType === "email" ? "email" : "tel"}
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          className={`block w-full px-4 py-2 border rounded-lg transition-colors ${
            fieldErrors.contact
              ? "border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder={
            formData.contactType === "email"
              ? "请输入邮箱地址"
              : "请输入手机号码"
          }
          required
        />
        {fieldErrors.contact && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.contact}</p>
        )}
      </div>

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
          onChange={handleInputChange}
          rows={4}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          placeholder="介绍一下你自己..."
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? "验证中..." : "发送验证码"}
        </button>
      </div>
    </form>
  );

  const renderCodeStep = () => (
    <form onSubmit={handleVerifyCode} className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          已向您的{formData.contactType === "email" ? "邮箱" : "手机"}{" "}
          {formData.contact} 发送验证码
        </p>
        <div className="flex items-center justify-center space-x-4">
          <label
            htmlFor="verificationCode"
            className="text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            验证码 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-40 px-4 py-2 border border-gray-300 rounded-lg text-center text-lg font-mono
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                     placeholder:text-sm"
            placeholder="请输入6位验证码"
            maxLength={6}
            required
          />
        </div>
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          {isLoading ? "发送中..." : "重新发送验证码"}
        </button>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? "创建账户中..." : "完成注册"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="w-200 min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              用户注册
            </h1>
            <p className="text-center text-gray-500 mt-1">
              {step === "input" && "填写注册信息"}
              {step === "verifying" && "验证信息中..."}
              {step === "waiting_code" && "请输入验证码"}
              {step === "creating_account" && "创建账户中..."}
            </p>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-1 bg-gray-100 text-blue-400 outline-none ring-2 ring-gray-300 text-sm font-bold rounded-lg
                       hover:bg-gray-50 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              返回
            </button>
          )}
        </div>
      </div>

      <div className="relative py-4 sm:max-w-3xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-8 p-4">
          {step === "input" && renderInputStep()}
          {(step === "verifying" ||
            step === "waiting_code" ||
            step === "creating_account") &&
            renderCodeStep()}
        </div>
      </div>
    </div>
  );
}
