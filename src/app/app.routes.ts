import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CardComponent } from './card/card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotfondcomponentComponent } from './notfondcomponent/notfondcomponent.component';
import { IndexPageComponent } from './index-page/index-page.component';

export const routes: Routes = [
    {
        path:'',
        component: IndexPageComponent


    },
    {
        path: 'products',
        component: MainPageComponent
    }
    
    ,
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'card',
        component: CardComponent
    },
    {
        path: 'product-details/:id',
        component: ProductDetailsComponent
    },
    {
        path:'**',
        component :NotfondcomponentComponent
    }


];