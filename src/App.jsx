import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import MainContent from './layout/MainContent';
import Footer from './layout/Footer';
import Login from './pages/auth/login';
import Welcome from './components/welcome/Welcome';
import Usuarios from './components/usuarios/UserList';
import Supplier from './components/proveedores/SupplierList';
import Inputs from './components/insumos/InputsList';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    <Route element={
                        <PrivateRoute>
                            <div className="app-container">
                                <Sidebar />
                                <div className="main-content-wrapper">
                                    <Header />
                                    <MainContent>
                                        <Outlet />
                                    </MainContent>
                                    <Footer/>
                                </div>
                            </div>
                        </PrivateRoute>
                    }>
                        <Route index element={<Navigate to="/welcome" replace />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path='/usuarios' element={<Usuarios/>}/>
                        <Route path='/proveedores' element={<Supplier/>}/>
                        <Route path='/insumos' element={<Inputs/>}/>
                        {/* Otras rutas protegidas */}
                    </Route>
                    
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;