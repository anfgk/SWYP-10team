import TestAuthComponent from "@/components/TestAuthComponent";

const TestPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">토큰 재발급 테스트 페이지</h1>
      <p className="text-gray-600 mb-6">
        이 페이지에서는 testStore를 사용하여 토큰 재발급 기능을 테스트할 수
        있습니다. 기존 authStore는 건드리지 않고 별도로 테스트합니다.
      </p>

      <TestAuthComponent />

      <div className="mt-8 p-4 border rounded-lg bg-blue-50">
        <h3 className="text-lg font-semibold mb-2">사용 방법:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>"테스트 로그인" 버튼을 클릭하여 가짜 토큰을 생성합니다.</li>
          <li>"토큰 확인" 버튼으로 localStorage와 store 상태를 확인합니다.</li>
          <li>"API 테스트" 버튼으로 토큰 재발급 기능을 테스트합니다.</li>
          <li>"로그아웃" 버튼으로 토큰을 제거합니다.</li>
        </ol>
      </div>
    </div>
  );
};

export default TestPage;
