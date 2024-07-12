const token = "hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Ye aapka secret key hai.

const inputTxt = document.getElementById("input"); // Yeh input box hai jahan aap type karte ho.
const image = document.getElementById("image"); // Yeh image hai jahan photo dikhayenge.
const btn = document.getElementById("btn"); // Yeh button hai jo click karne par kaam karega.

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
        {
            headers: {
                Authorization: `Bearer ${token}`, // Aapka token yahan lag raha hai.
                "Content-Type": "application/json",
            },
            method: "POST", // Yeh batata hai ki hum data bhej rahe hain.
            body: JSON.stringify(data), // Data ko string mein badal rahe hain.
        }
    );

    if (!response.ok) { // Agar kuch galat ho gaya to...
        const errorDetails = await response.json();
        console.error("Error:", errorDetails); // Galti ka message dikhate hain.
        throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.blob(); // Result ko image format mein badal rahe hain.
    return result; // Image ko wapas bhejte hain.
}

btn.addEventListener("click", async function () {
    const inputValue = inputTxt.value; // Jo aapne input diya, wo lete hain.
    if (!inputValue) {
        alert("Please enter a prompt"); // Agar kuch nahi diya to alert dikhaate hain.
        return;
    }

    try {
        const response = await query({ "inputs": inputValue }); // API se image lene ki koshish karte hain.
        const objectURL = URL.createObjectURL(response); // Image ko browser mein dikhane ka URL banate hain.
        image.src = objectURL; // Image ko dikhate hain.
    } catch (error) {
        console.error("Request failed", error); // Agar galti ho gayi to console mein dikhate hain.
    }
});
