import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./categories")
    },
    {
        path: "create",
        loadComponent: () => import("./create/category-create")
    },
    {
        path: "create/:id",
        loadComponent: () => import("./create/category-create")
    }
]