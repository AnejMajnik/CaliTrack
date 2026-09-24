import { ref } from "vue";
import axios from "axios";

const isAuthenticated = ref(false);
const isLoading = ref(true);

async function checkAuth() {
    const url = `${import.meta.env.VITE_API_URL}`;

    try {
        const response = await axios.get('/api/auth/verify', { withCredentials: true });
        isAuthenticated.value = true;
    } catch (error) {
        isAuthenticated.value = false;
    } finally {
        isLoading.value = false;
    }
}

export function useAuth() {
    return { isAuthenticated, isLoading, checkAuth }
}