import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import OpenAI from 'openai';
import { environment } from '../../environments/environment';

export const openai = new OpenAI({
  apiKey: environment.openAiKey,
  dangerouslyAllowBrowser: true,
});

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, FormsModule],
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {
  isLoading = false;
  error: string | null = null;
  images: string[] = [];
  promptText = 'Happy programmer';
  ngOnInit(): void {
    this.generateImage(this.promptText);
  }

  formSubmit($event: Event) {
    $event.preventDefault();
    this.generateImage(this.promptText);
  }

  async generateImage(prompt: string) {
    this.isLoading = true;
    try {
      const response = await openai.images
        .generate({
          prompt,
          n: 4,
          size: '256x256',
        })
        .withResponse();
      const images = response.data.data;
      if (!images.length) {
        throw new Error('No images');
      }
      this.images = images.map((image) => image.url!);
    } catch (err) {
      this.error = (err as Error).message;
    } finally {
      this.isLoading = false;
    }
  }
}
