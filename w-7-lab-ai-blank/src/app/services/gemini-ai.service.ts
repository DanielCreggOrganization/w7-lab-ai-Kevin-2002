import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiAiService {
  private readonly MODEL_NAME = 'gemini-1.5-flash';
  prompt = '';
  output = '';
  

  // Deal with the image declaration
  availableImages = [
    { url: 'assets/images/baked_goods_1.jpg', label: 'Baked Good 1' },
    { url: 'assets/images/baked_goods_2.jpg', label: 'Baked Good 2' },
    { url: 'assets/images/baked_goods_3.jpg', label: 'Baked Good 3' }
  ];
  selectedImage = this.availableImages[0].url;

  constructor() { }

  async getImageAsBase64(imageUrl: string): Promise<string> {
    // TODO: Move image conversion code here
    // HINT: Copy the code from your component that:
    try {
      // 1. Fetches the image
      const response = await fetch(this.selectedImage);

      // 2. Converts to blob
      const blob = await response.blob();

      // 3. Converts to base64
      const base64data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      // 4. Returns the base64 string
      const base64String = base64data.split(',')[1];
      return base64String;
  }
  catch (error) {
    throw new Error('Failed to generate recipe');
  }
}


  async generateRecipe(imageBase64: string, prompt: string): Promise<string> {
    try {
      // TODO: Move AI generation code here
      // HINT: Copy the code that:
      // 1. Create the AI client
      const genAI = new GoogleGenerativeAI(environment.apiKey);
      
      // 2. Get the model
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash'});
      
      // 3. Call generateContent
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [
            { 
              inlineData: { 
                mimeType: 'image/jpeg', 
                data: imageBase64
              } 
            },
            { text: prompt }
          ]
        }]
      });

      // 4. Update this.output
      this.output = result.response.text();
      return this.output;

    } catch (error) {
      throw new Error('Failed to generate recipe');
    }
  }  
}
