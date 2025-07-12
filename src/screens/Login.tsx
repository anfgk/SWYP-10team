import { useState } from "react";

export default function Login() {
  const [autoLogin, setAutoLogin] = useState(false);

  return (
    <div className="flex h-[800px] items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-20">로그인</h2>
        <button className="w-[500px] py-3 mb-4 bg-gray-300 rounded text-lg font-medium">
          카카오
        </button>
        <button className="w-[500px] py-3 mb-4 bg-gray-300 rounded text-lg font-medium">
          네이버
        </button>
        <button className="w-[500px] py-3 mb-8 bg-gray-300 rounded text-lg font-medium">
          구글
        </button>
        <div className="flex">
          <input
            id="auto-login"
            type="checkbox"
            checked={autoLogin}
            onChange={() => setAutoLogin(!autoLogin)}
            className="mr-2 w-5 h-5 rounded-full border-2 border-gray-300 appearance-none checked:bg-gray-400 checked:border-gray-400 transition-colors duration-200 focus:outline-none"
          />
          <label htmlFor="auto-login" className="text-lg">
            자동로그인
          </label>
        </div>
      </div>
    </div>
  );
}
