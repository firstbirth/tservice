import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

import { isAuthenticated } from "@/services/AuthService";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/dashboard/",
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/dashboard/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/dashboard/index.vue"),
			},
			{
				path: "balance",
				component: () => import("@/views/dashboard/balance/index.vue"),
			},
		],
		meta: {
			requiresAuth: true
		}
	},

	{
		path: "/tasks/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/tasks/index.vue"),
			},
			{
				path: "add",
				component: () => import("@/views/tasks/add/index.vue"),
			},
			{
				path: "edit/:id",
				component: () => import("@/views/tasks/edit/index.vue"),
			},
			{
				path: "responsibles/:id",
				component: () => import("@/views/tasks/edit/responsibles/index.vue"),
			},

			{
				path: "comments/:id",
				component: () => import("@/views/tasks/edit/comments/index.vue"),
			},

			{
				path: ":id",
				component: () => import("@/views/tasks/view/index.vue"),
			},
		],
		meta: {
			requiresAuth: true
		}
	},

	{
		path: "/users/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/users/index.vue"),
			},

			{
				path: ":id",
				component: () => import("@/views/users/view/index.vue"),
			},
		],
		meta: {
			requiresAuth: true
		}
	},

	{
		path: "/posts/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/posts/index.vue"),
			},
		],
		meta: {
			requiresAuth: true
		}
	},

	{
		path: "/orders/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/orders/index.vue"),
			},
			{
				path: "all",
				component: () => import("@/views/orders/all/index.vue"),
			},
			{
				path: "my",
				component: () => import("@/views/orders/my/index.vue"),
			},
			{
				path: ":clientorderid/:userid/details",
				component: () => import("@/views/orders/details/index.vue"),
			},
			{
				path: ":clientorderid/:userid/products",
				component: () => import("@/views/orders/products/index.vue"),
			},
		],
		meta: {
			requiresAuth: true
		}
	},

	{
		path: "/misc/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/misc/index.vue"),
			},
		],
		meta: {
			requiresAuth: true
		}
	},

	{
		path: "/login/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/login/index.vue"),
			},
		],
		meta: {
			requiresAuth: false
		}
	},

	{
		path: "/notifications/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/notifications/index.vue"),
			},
		],
		meta: {
			requiresAuth: true
		}
	},

	{
		path: "/settings/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/settings/index.vue"),
			},
		],
		meta: {
			requiresAuth: false
		}
	},
	{
		path: "/search/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/search/index.vue"),
			},
			{
				path: ":vendorcode",
				component: () => import("@/views/search/view/index.vue"),
			},
		],
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/workorders/",
		component: Tabs,
		children: [
			{
				path: "",
				component: () => import("@/views/workOrders/index.vue"),
			},
			{
				path: ":workorderid/details",
				component: () => import("@/views/workOrders/details/index.vue"),
			},
			{
				path: ":workorderid/products",
				component: () => import("@/views/workOrders/products/index.vue"),
			},
			{
				path: ":workorderid/services",
				component: () => import("@/views/workOrders/services/index.vue"),
			},
		],
		meta: {
			requiresAuth: true
		}
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {

	// let check = checkServer();
	// console.log(check);
	
	// Check if the route requires authentication
	if (to.meta.requiresAuth && !isAuthenticated()) {
		// Redirect to the login screen
		next("/login");
	} else {
		// Continue to the next route
		next();
	}
});

export default router;
