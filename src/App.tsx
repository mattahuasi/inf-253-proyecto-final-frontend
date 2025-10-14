import { Route, Routes } from "react-router";
import { Slide, ToastContainer } from "react-toastify";
import { ProtectedRoutes } from "./components/guards/ProtextedRoutes";
import { PublicRoutes } from "./components/guards/PublicRoutes";
import { RootRedirect } from "./components/guards/RootRedirect";
import { AdminLayout } from "./layouts/AdminLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CategoryAdd from "./pages/categories/Add";
import CategoryEdit from "./pages/categories/Edit";
import CategoriesList from "./pages/categories/List";
import CustomerAdd from "./pages/customers/Add";
import CustomerEdit from "./pages/customers/Edit";
import CustomersList from "./pages/customers/List";
import EmployeeAdd from "./pages/employees/Add";
import EmployeeEdit from "./pages/employees/Edit";
import EmployeesList from "./pages/employees/List";
import ChangePassword from "./pages/home/ChangePassword";
import Dashboard from "./pages/home/Dashboard";
import Profile from "./pages/home/Profile";
import MenuAdd from "./pages/menus/Add";
import MenuEdit from "./pages/menus/Edit";
import MenusList from "./pages/menus/List";
import OrderAdd from "./pages/orders/Add";
import OrdersList from "./pages/orders/List";
import PermissionsList from "./pages/permissions/List";
import RoleAdd from "./pages/roles/Add";
import RoleEdit from "./pages/roles/Edit";
import RolesList from "./pages/roles/List";
import StateAdd from "./pages/states/Add";
import StateEdit from "./pages/states/Edit";
import StatesList from "./pages/states/List";
import TableAdd from "./pages/tables/Add";
import TableEdit from "./pages/tables/Edit";
import TablesList from "./pages/tables/List";
import UserAdd from "./pages/users/Add";
import UserEdit from "./pages/users/Edit";
import UsersList from "./pages/users/List";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />

      <Routes>
        <Route path="/" element={<RootRedirect />} />

        <Route path="auth" element={<AuthLayout />}>
          <Route
            index
            path="login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
        </Route>

        <Route path="home" element={<AdminLayout />}>
          <Route
            index
            path="dashboard"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="change-password"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <ChangePassword />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="orders" element={<AdminLayout />}>
          <Route
            index
            path="list"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <OrdersList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <OrderAdd />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="states" element={<AdminLayout />}>
          <Route
            index
            path="list"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <StatesList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <StateAdd />
              </ProtectedRoutes>
            }
          />

          <Route
            path="edit/:id"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <StateEdit />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="customers" element={<AdminLayout />}>
          <Route
            path="list"
            index
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <CustomersList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <CustomerAdd />
              </ProtectedRoutes>
            }
          />

          <Route
            path="edit/:id"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <CustomerEdit />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="categories" element={<AdminLayout />}>
          <Route
            index
            path="list"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <CategoriesList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <CategoryAdd />
              </ProtectedRoutes>
            }
          />

          <Route
            path="edit/:id"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <CategoryEdit />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="menus" element={<AdminLayout />}>
          <Route
            index
            path="list"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <MenusList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <MenuAdd />
              </ProtectedRoutes>
            }
          />

          <Route
            path="edit/:id"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <MenuEdit />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="tables" element={<AdminLayout />}>
          <Route
            index
            path="list"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <TablesList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <TableAdd />
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit/:id"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <TableEdit />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="employees" element={<AdminLayout />}>
          <Route
            index
            path="list"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <EmployeesList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <EmployeeAdd />
              </ProtectedRoutes>
            }
          />

          <Route
            path="edit/:id"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <EmployeeEdit />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="permissions" element={<AdminLayout />}>
          <Route
            index
            path="list"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <PermissionsList />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="roles" element={<AdminLayout />}>
          <Route
            index
            path="list"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <RolesList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <RoleAdd />
              </ProtectedRoutes>
            }
          />

          <Route
            path="edit/:id"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <RoleEdit />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="users" element={<AdminLayout />}>
          <Route
            index
            path="list"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <UsersList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <UserAdd />
              </ProtectedRoutes>
            }
          />

          <Route
            path="edit/:id"
            element={
              <ProtectedRoutes allowedRoles={["Super admin"]}>
                <UserEdit />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
