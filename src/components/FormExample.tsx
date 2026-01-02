import { useState } from "react";

// 模拟的初始数据
const initialFormData = {
  username: "初始用户",
  email: "initial@example.com",
};

// 模拟的重置后的新数据
const resetFormData = {
  username: "已重置的用户",
  email: "reset@example.com",
};

const FormExample = () => {
  // 1. 这个状态用于存储表单数据（用于提交或显示）
  const [formData, setFormData] = useState(initialFormData);

  // 2. 这个状态用于控制输入框的“key”，用于强制重置
  const [formKey, setFormKey] = useState(0);

  // --- 处理逻辑 ---

  // 提交表单（展示当前状态）
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("提交的数据:", formData);
    alert("数据已打印在控制台");
  };

  // 方案 A：普通的重置（只会重置 React 的 state，不会重置 DOM 的显示）
  const handleNormalReset = () => {
    setFormData(initialFormData);
    // 注意：这里没有改变 key，所以输入框里的文字不会变！
    console.log("React state 已重置，但输入框未更新");
  };

  // 方案 B：强制重置（通过改变 key 强制组件重建）
  const handleHardReset = () => {
    setFormData(resetFormData); // 先更新数据源
    setFormKey((prev) => prev + 1); // 改变 key，强制 <input> 重新挂载
    console.log("强制重置：key 已更新");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>非受控表单示例 (defaultValue + onBlur)</h2>
      <p>
        <small>注意观察输入时控制台没有打印，只有失焦时才有。</small>
      </p>

      {/* 使用 formKey 作为 key，当 key 变化时，整个 form 及其子元素会重新创建 */}
      <form key={formKey} onSubmit={handleSubmit}>
        {/* 输入框 1: 用户名 */}
        <div style={{ marginBottom: 15 }}>
          <label>用户名：</label>
          <input
            type="text"
            // defaultValue 只在组件第一次渲染时生效
            defaultValue={formData.username}
            // 只有失去焦点时，才把 DOM 的值同步回 React state
            onBlur={(e) => {
              setFormData((prev) => ({ ...prev, username: e.target.value }));
              console.log("用户名已更新:", e.target.value);
            }}
            style={{ marginLeft: 10, padding: 5 }}
          />
        </div>

        {/* 输入框 2: 邮箱 */}
        <div style={{ marginBottom: 15 }}>
          <label>邮箱：</label>
          <input
            type="email"
            defaultValue={formData.email}
            onBlur={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
            }}
            style={{ marginLeft: 10, padding: 5 }}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleNormalReset}
            style={{ marginRight: 10 }}
          >
            普通重置 (无效)
          </button>
          <button
            type="button"
            onClick={handleHardReset}
            style={{ marginRight: 10, backgroundColor: "#28a745" }}
          >
            强制重置 (有效)
          </button>
          <button type="submit">提交</button>
        </div>
      </form>

      <hr />
      <h3>当前 React 状态 (State):</h3>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default FormExample;
