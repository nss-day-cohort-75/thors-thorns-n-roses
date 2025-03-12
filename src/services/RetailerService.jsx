export const getRetailers = async () => {
    try {
        const response = await fetch("http://localhost:8088/retailers")
        if (!response.ok) throw new Error("Failed to fetch retailers");
        return await response.json();
    } catch (error) { 
        console.error("Error fetching retailers", error);
        return [];
    }
}