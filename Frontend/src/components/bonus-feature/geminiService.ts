import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your API key
const apiKey = "AIzaSyCoXN7igeh_bDJ5k6B-Hw0JvzU5yTRjTHI";
const genAI = new GoogleGenerativeAI(apiKey || "");

// Get image as base64 data

export const getImageData = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Extract base64 data part from the data URL
      const dataUrl = reader.result as string;
      const base64Data = dataUrl.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Analyze image using Gemini API
export const analyzeHealthImage = async (
  imageFile: File,
  contextPrompt: string
): Promise<string> => {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageData = await getImageData(imageFile);

    // Creating the image part
    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType: imageFile.type,
      },
    };

    // Creating the text prompt
    const promptText = `
      Analyze this image of a person and provide insights about their apparent health status.
      Focus on visible indicators only. Additional context: ${contextPrompt}
      
      Important notes:
      - Only comment on clearly visible features
      - Avoid making specific medical diagnoses
      - Highlight areas that might benefit from professional medical attention
      - Consider general appearance, posture, and visible physical characteristics
      - Recooment if the person should see the medical professional or not and which one
    `;

    // Generate content based on the image and the propmt
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: promptText }, imagePart],
        },
      ],
    });
    return result.response.text();
  } catch (error: unknown) {
    console.error("Error analyzing image:", error);

    //  handling unknown error type
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to analyze image: ${errorMessage}`);
  }
};
