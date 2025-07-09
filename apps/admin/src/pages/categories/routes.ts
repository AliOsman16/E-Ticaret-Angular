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
        path: "edit/:id",
        loadComponent: () => import("./create/category-create")
    }
];

export default routes;
