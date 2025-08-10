import ProtectedRoute from "./ProtectedRoute";
import MypageLayout from "../layouts/MypageLayout";
const ProtectedLayout = (
  <ProtectedRoute>
    <MypageLayout />
  </ProtectedRoute>
);

export default ProtectedLayout;
