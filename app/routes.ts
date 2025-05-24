import { type RouteConfig, layout, route } from '@react-router/dev/routes';

export default [
  route('sign-in', 'routes/root/sign-in.tsx'),
  layout('routes/admin/adminLayout.tsx', [
    route('Dashboard', 'routes/admin/dashboard.tsx'),
    route('all-users', 'routes/admin/all-users.tsx'),
  ]),
] satisfies RouteConfig;
