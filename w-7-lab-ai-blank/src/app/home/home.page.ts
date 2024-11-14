import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCol, IonGrid, IonRow, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonButton, IonIcon, IonProgressBar, IonText, IonRadioGroup, IonRadio, IonImg, IonTextarea, IonRippleEffect } from '@ionic/angular/standalone';
import { GeminiAiService } from '../services/gemini-ai.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonCard, 
    IonCardContent, IonCardHeader, IonCardTitle, IonItem,  IonLabel, IonButton, IonIcon, IonProgressBar, IonText,
    IonRadioGroup, IonRadio, IonImg, IonTextarea, IonRippleEffect
  ],
})
export class HomePage {
  // TODO: Add default prompt
  // HINT: Something like "Provide a recipe for these baked goods"
  prompt = ''; 
  output = '';
  isLoading = false;

  constructor(private geminiAiService:GeminiAiService) { }

  async onSubmit() {
    if (this.isLoading) return;
      this.isLoading = true;
      

    const base64String = await this.geminiAiService.getImageAsBase64(this.selectedImage);

    this.geminiAiService.generateRecipe(base64String, this.prompt).then((output) => {
      this.output = output;
      console.log(this.prompt);
    });


    this.isLoading = false;
  }


  availableImages = [
    { url: 'assets/images/baked_goods_1.jpg', label: 'Baked Good 1' },
    { url: 'assets/images/baked_goods_2.jpg', label: 'Baked Good 2' },
    { url: 'assets/images/baked_goods_3.jpg', label: 'Baked Good 3' }
  ];

  selectedImage = this.availableImages[0].url;

  get formattedOutput() {
    return this.output.replace(/\n/g, '<br>');
  }

  selectImage(url: string) {
    // TODO: Set the selectedImage property
    // HINT: this.selectedImage = url;
  }

}
