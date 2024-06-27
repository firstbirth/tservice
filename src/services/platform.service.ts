// platform.service.ts
import { Capacitor } from "@capacitor/core";

export class PlatformService {
	// Функция для определения платформы
	static getPlatform(): string {
		return Capacitor.getPlatform();
	}

	// Проверка на iOS
	static isIOS(): boolean {
		return this.getPlatform() === "ios";
	}

	// Проверка на Android
	static isAndroid(): boolean {
		return this.getPlatform() === "android";
	}

	// Проверка на веб-платформу
	static isWeb(): boolean {
		return this.getPlatform() === "web";
	}
}


/* usage */

/*

import PlatformService from './platform.service.js';

// Использование сервиса для определения платформы
if (PlatformService.isIOS()) {
  // Ваш код для iOS
} else if (PlatformService.isAndroid()) {
  // Ваш код для Android
} else if (PlatformService.isWeb()) {
  // Ваш код для веб-платформы
} else {
  // Другая платформа
}

*/