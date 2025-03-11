export const getFlowers = async () => {
    try {
        const response = await fetch("http://localhost:8088/flowers")
        if (!response.ok) throw new Error("Failed to fetch flowers");
        return await response.json();
    } catch (error) { 
        console.error("Error fetching flowers", error);
        return [];
    }
}
export const getNurseryFlowers = async  () => {
    try{
        const response = await fetch("http://localhost:8088/nursery_flower")
        if (!response.ok) throw new Error("Failed to fetch nursery flowers");
        return await response.json();
    } catch (error) { 
        console.error("Error fetching nursery flowers", error);
        return [];
    }
} 

