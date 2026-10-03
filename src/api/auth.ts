import type { AuthData } from '../types';
import { getApiUrl } from '../utils/helpers';

export async function checkInstanceStatus(auth: AuthData): Promise<boolean> {
    const apiUrl = getApiUrl(auth.idInstance);
    const url = `${apiUrl}/waInstance${auth.idInstance}/getStateInstance/${auth.apiTokenInstance}`;

    try {
        const response = await fetch(url);
        if (!response.ok) return false;

        const data = await response.json();
        return data.stateInstance === 'authorized';
    } catch (error) {
        console.error(error);
        return false;
    }
}
