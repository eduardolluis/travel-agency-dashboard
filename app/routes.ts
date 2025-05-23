import { type RouteConfig } from '@react-router/dev/routes';

export default [
  {
    path: 'admin',
    file: './routes/admin/adminLayout.tsx',

    children: [
      {
        path: 'dashboard',
        file: './routes/admin/dashboard.tsx',
      },
      {
        path: 'allUsers',
        file: './routes/admin/allUsers.tsx',
      },
    ],
  },
] satisfies RouteConfig;
