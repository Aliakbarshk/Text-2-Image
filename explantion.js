const token = "hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // This is your secret key.

const inputTxt = document.getElementById("input"); // This is the input box where you type.
const image = document.getElementById("image"); // This is the image where the photo will be displayed.
const btn = document.getElementById("btn"); // This is the button that will trigger the action on click.

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
        {
            headers: {
                Authorization: `Bearer ${token}`, // Your token is being used here.
                "Content-Type": "application/json",
            },
            method: "POST", // This indicates that we are sending data.
            body: JSON.stringify(data), // Converting data to a string format.
        }
    );

    if (!response.ok) { // If something went wrong...
        const errorDetails = await response.json();
        console.error("Error:", errorDetails); // Displaying the error message.
        throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.blob(); // Converting the result to image format.
    return result; // Returning the image.
}

btn.addEventListener("click", async function () {
    const inputValue = inputTxt.value; // Getting the input value provided by the user.
    if (!inputValue) {
        alert("Please enter a prompt"); // Showing alert if no input is provided.
        return;
    }

    try {
        const response = await query({ "inputs": inputValue }); // Trying to get the image from the API.
        const objectURL = URL.createObjectURL(response); // Creating a URL to display the image in the browser.
        image.src = objectURL; // Displaying the image.
    } catch (error) {
        console.error("Request failed", error); // Displaying error in the console if it fails.
    }
});
