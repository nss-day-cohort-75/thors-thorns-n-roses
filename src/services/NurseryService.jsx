export const getNurseries = async () => {
    try {
        const response = await fetch("http://localhost:8088/nurseries")
        if (!response.ok) throw new Error("Failed to fetch nurseries");
        return await response.json();
    } catch (error) { 
        console.error("Error fetching nurseries", error);
        return [];
    }
}
