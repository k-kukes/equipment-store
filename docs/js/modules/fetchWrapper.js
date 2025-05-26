export async function fetchData(resourceUri) {
    try {
            const response = await fetch(resourceUri);
            if (!response.ok) {
                throw new Error(`The request was no bueno! ${response.status}`);
            }
            const data = await response.json();
            return data;
    
    } catch (error) {
        console.log(error.message);
    }
}