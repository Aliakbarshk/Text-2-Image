const token = "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"; // Replace with your new token

const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const btn = document.getElementById("btn");

async function query(data) {
  image.src =
  "https://cdn.dribbble.com/users/121337/screenshots/1024835/media/0052359530771cae3d310ffcc7e9b348.gif";
  
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Error:", errorDetails);
    throw new Error(`Request failed with status ${response.status}`);
  }

  const result = await response.blob();
  return result;
}

btn.addEventListener("click", async function () {
  const inputValue = inputTxt.value;
  if (!inputValue) {
    alert("Please enter a prompt");
    return;
  }

  try {
    const response = await query({ inputs: inputValue });
    const objectURL = URL.createObjectURL(response);
    image.src = objectURL;
  } catch (error) {
    console.error("Request failed", error);
  }
});

console.log(query);
