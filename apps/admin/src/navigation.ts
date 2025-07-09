export interface NavigationModel {
    title: string;
    url: string;
    icon: string;
}

export const navigations: NavigationModel[] = [
    {
        title: "Ana Sayfa",
        url: "/",
        icon: "home"
    },
    {
        title: "Ürünler",
        url: "/products",
        icon: "inventory_2"
    },
    {
        title: "Kategoriler",
        url: "/categories",
        icon: "category"
    }
];