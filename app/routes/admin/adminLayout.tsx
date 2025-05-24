import { Outlet } from 'react-router-dom';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations/src/sidebar/sidebar.component';
import { NavItems } from '../../../components/Index';
import { MobileSidebar } from '../../../components/Index';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>

      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
