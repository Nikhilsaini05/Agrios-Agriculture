import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeMain from './Views/home/home_main'
import AboutMain from './Views/About/about_main'
import ServicesMain from './Views/service/services_main'
import ProjectMain from './Views/Project/project_main'
import { AdminRoute, PublicRoute, RouteServices } from './Services/routes_services'
import HealthFoodMain from './Views/health-food/health_food_main'
import NewsMain from './Views/News/news_main'
import ContactMain from './Views/Contact/contact_main'
import ShopMain from './Views/Shop/shop_main'
import PublicLayout from './Views/layout'
import LoginPage from './Views/Admin/login_page'
import AdminMain from './Views/Admin/admin_main'
import AdminDashboard from './Views/Admin/admin_dashboard'
import Settings from './Views/Admin/Settings/Settings'
import AdminLayout from './Views/Admin/admin_layout'
import Add_products from './Views/Admin/Services/add_products'
import AddShopProducts from './Views/Admin/Shop/addShopProducts'
import AdminContact from './Views/Admin/Contacts/adminContact'
import Order from './Views/Admin/Order/order'
import CartMain from './Views/Cart/cartMain'



function App() {

  return (
    <>
      <Routes>
        <Route path={RouteServices.home} element={
          <PublicRoute>
            <PublicLayout />
          </PublicRoute>
        }>

        {/* Public Routes */}
          <Route index element={<HomeMain />}></Route>
          <Route path={RouteServices.about} element={<AboutMain />}></Route>
          <Route path={RouteServices.service} element={<ServicesMain />}></Route>
          <Route path={RouteServices.project} element={<ProjectMain />}>
          </Route>
          <Route path={`${RouteServices.projectDetails}/:id`} element={<HealthFoodMain />}></Route>
          <Route path={RouteServices.news} element={<NewsMain />}></Route>
          <Route path={RouteServices.shop} element={<ShopMain />}></Route>
          <Route path={RouteServices.contact} element={<ContactMain />}></Route>
          <Route path={RouteServices.cartItem} element={<CartMain/>}></Route>

        {/* Admin Routes */}
        </Route>
        <Route path={RouteServices.admin} element={<AdminMain />}></Route>
        <Route path={RouteServices.adminDashboard} element={<AdminRoute>
          <AdminLayout/>
        </AdminRoute>}>

        
        
        {/* admin layouts */}
        <Route index path={RouteServices.adminDashboard} element={<AdminDashboard />}></Route>
        <Route path={RouteServices.settings} element={<Settings />}></Route>
        <Route path={RouteServices.adminServies} element={<Add_products />}></Route>
        <Route path={RouteServices.adminShop} element={<AddShopProducts/>} ></Route>
        <Route path={RouteServices.order} element={<Order/> } ></Route>
        <Route path={RouteServices.adminContact} element={<AdminContact/> } ></Route>

        </Route>
        
      </Routes>
    </>
  )
}


export default App
