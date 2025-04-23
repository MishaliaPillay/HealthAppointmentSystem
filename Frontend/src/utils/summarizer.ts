const HF_API_TOKEN = "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";
const SUMMARY_MODEL = "facebook/bart-large-cnn";

export const callSummarizationAPI = async (text: string): Promise<string> => {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${SUMMARY_MODEL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HF_API_TOKEN}`,
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          max_length: 150,
          min_length: 30,
          do_sample: false,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  return result[0].summary_text;
};
