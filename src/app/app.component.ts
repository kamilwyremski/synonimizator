import { Component, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private cookieService: CookieService ) { }

  title_input = '';
  keywords_input = '';
  description_input = '';
  description_input_div = '';
  ngOnInit(): void {
    this.title_input = this.cookieService.get('title_input');
    this.keywords_input = this.cookieService.get('keywords_input');
    this.description_input = this.cookieService.get('description_input');
    this.description_input_div = this.cookieService.get('description_input_div');
  }

  alertCopyToClipboard = false;
  copyToClipboard(val: string){
    this.alertCopyToClipboard = true;
    setTimeout(() => this.alertCopyToClipboard=false, 1500);
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  title_output = '';
  generateTitle() {
    let title_array = this.title_input.split('\n').filter(Boolean);
    this.title_output = title_array[Math.floor(Math.random()*title_array.length)];
    this.cookieService.set('title_input', this.title_input);
  }
  copyTitleToClipboard(){
    this.copyToClipboard(this.title_output);
  }
  keywords_output = '';
  generateKeywords(){
    let keywords_array = this.keywords_input.split(',').map(s => s.trim());
    for (let i = keywords_array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [keywords_array[i], keywords_array[j]] = [keywords_array[j], keywords_array[i]];
    }
    this.keywords_output = keywords_array.join(', ');
    this.cookieService.set('keywords_input', this.keywords_input);
  }
  copyKeywordsToClipboard(){
    this.copyToClipboard(this.keywords_output);
  }
  description_output = '';
  descriptionIsEdited = false;
  descriptionInputHeight = 200;
  generateDescription(){
    this.description_output = '';
    let description = this.description_input.replace(/<span class="text-primary">{/g, "{").replace(/}<\/span>/g, "}");
		let char = 0;
		do{
			char = description.indexOf('{');
			this.description_output += description.substring(0, char);
			let char2 = description.indexOf('}');
			let synonim_array = description.substring(char+1,char2).split('|');
			this.description_output += synonim_array[Math.floor(Math.random()*synonim_array.length)];
			description = description.substring(char2+1, description.length);
		}while(description.indexOf('{')!=-1)
    this.description_output += description;
    this.cookieService.set('description_input', this.description_input);
  }
  @ViewChild('descriptionInput',{static: false}) descriptionInput: ElementRef; 
  blurDescription(){
    this.descriptionIsEdited = false;
    this.description_input_div = this.description_input.replace(/{/g, "<span class='text-primary'>{").replace(/}/g, "}</span>");
    this.descriptionInputHeight = this.descriptionInput.nativeElement.offsetHeight;
    this.cookieService.set('description_input_div', this.description_input_div);
  }
  editDescription(){
    this.descriptionIsEdited = true;
    setTimeout(() => this.descriptionInput.nativeElement.focus(), 50);
  }
  copyDescriptionToClipboard(){
    this.copyToClipboard(this.description_output);
  }
  generateAll(){
    this.generateTitle();
    this.generateKeywords();
    this.generateDescription();
  }
}
