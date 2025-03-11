export const getDistributors = async () => {
    try {
        const response = await fetch("http://localhost:8088/distributors")
        if (!response.ok) throw new Error("Failed to fetch distributors");
        return await response.json();
    } catch (error) { 
        console.error("Error fetching distributors", error);
        return [];
    }
}

export const getNurseryDistributors = async () => {
    try {
        const response = await fetch("http://localhost:8088/distributor_nursery");
        if (!response.ok) throw new Error("Failed to fetch nursery-distributor relationships");
        return await response.json();
    } catch (error) { 
        console.error("Error fetching nursery-distributor relationships", error);
        return [];
    }
};
