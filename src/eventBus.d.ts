import Vue from "vue";

declare module "@/eventBus" {
	export const eventBus: Vue;
}
