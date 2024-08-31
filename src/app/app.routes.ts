import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CardComponent } from './card/card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotfondcomponentComponent } from './notfondcomponent/notfondcomponent.component';
import { IndexPageComponent } from './index-page/index-page.component';
<<<<<<< HEAD
import { ProductsCategoryComponent } from './products-category/products-category.component';
import { FavoritesComponent } from './favorites/favorites.component';
=======
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from '../../auth.guard';


import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { EditComponent } from './edit/edit.component';
>>>>>>> 3ffbc7ac9856f6e107377b441fabb15686c27ea0
export const routes: Routes = [
    {
        path: '',
        component: IndexPageComponent
    },
    {
        path: 'products',
        component: MainPageComponent
<<<<<<< HEAD
    }

    ,
=======
    },
>>>>>>> 3ffbc7ac9856f6e107377b441fabb15686c27ea0
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin-login',
        component: AdminLoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    { path: 'editProduct/:id', component: EditComponent },

    
    {
        path: 'card',
        component: CardComponent
    },
    // start: nested routes
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard], // حماية مسار الإدارة والفرعيات
        children: [
            { path: 'allproducts', component: AllProductsComponent },
            { path: 'addProduct', component: AddProductComponent }
            // تعديل المنتج


        ]
    },
    // end: nested routes
    {
        path: 'product-details/:id',
        component: ProductDetailsComponent
    },
<<<<<<< HEAD




    {
        path: 'category-products/:category',
        component: ProductsCategoryComponent
    },

    {
        path: 'favorites',
        component: FavoritesComponent
    },

    {
=======
    {
>>>>>>> 3ffbc7ac9856f6e107377b441fabb15686c27ea0
        path: '**',
        component: NotfondcomponentComponent
    }
];
