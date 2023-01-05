import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("descriptionInputEl", { static: false })
  descriptionInputEl: ElementRef;

  constructor(private cookieService: CookieService) {}

  titleInput = "";
  keywordsInput = "";
  descriptionInput = "";
  descriptionInputDiv = "";
  alertCopyToClipboard = false;
  alertCopyToClipboardTimeout;
  titleOutput = "";
  keywordsOutput = "";
  descriptionOutput = "";
  descriptionIsEdited = false;
  descriptionInputHeight = 200;

  ngOnInit() {
    this.titleInput = this.cookieService.get("title_input");
    this.keywordsInput = this.cookieService.get("keywords_input");
    this.descriptionInput = this.cookieService.get("description_input");
    this.descriptionInputDiv = this.cookieService.get("description_input_div");
    if (this.titleInput) {
      this.generateTitle();
    }
    if (this.keywordsInput) {
      this.generateKeywords();
    }
    if (this.descriptionInput || this.descriptionInputDiv) {
      this.generateDescription();
    }
  }

  copyToClipboard(val: string) {
    this.alertCopyToClipboard = true;
    if (this.alertCopyToClipboardTimeout) {
      clearTimeout(this.alertCopyToClipboardTimeout);
    }
    this.alertCopyToClipboardTimeout = setTimeout(
      () => (this.alertCopyToClipboard = false),
      1500
    );
    navigator.clipboard.writeText(val);
  }

  generateTitle() {
    const titleArray = this.titleInput.split("\n").filter(Boolean);
    this.titleOutput =
      titleArray[Math.floor(Math.random() * titleArray.length)];
    this.cookieService.set("title_input", this.titleInput);
  }

  copyTitleToClipboard() {
    this.copyToClipboard(this.titleOutput);
  }

  generateKeywords() {
    const keywordsArray = this.keywordsInput.split(",").map((s) => s.trim());
    for (let i = keywordsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [keywordsArray[i], keywordsArray[j]] = [
        keywordsArray[j],
        keywordsArray[i],
      ];
    }
    this.keywordsOutput = keywordsArray.join(", ");
    this.cookieService.set("keywords_input", this.keywordsInput);
  }

  copyKeywordsToClipboard() {
    this.copyToClipboard(this.keywordsOutput);
  }

  generateDescription() {
    this.descriptionOutput = "";
    let description = this.descriptionInput
      .replace(/<span class="text-success">{/g, "{")
      .replace(/}<\/span>/g, "}");
    let char = 0;
    do {
      char = description.indexOf("{");
      this.descriptionOutput += description.substring(0, char);
      const char2 = description.indexOf("}");
      const synonimArray = description.substring(char + 1, char2).split("|");
      this.descriptionOutput +=
        synonimArray[Math.floor(Math.random() * synonimArray.length)];
      description = description.substring(char2 + 1, description.length);
    } while (description.indexOf("{") !== -1);
    this.descriptionOutput += description;
    this.cookieService.set("description_input", this.descriptionInput);
  }

  blurDescription() {
    this.descriptionIsEdited = false;
    this.descriptionInputDiv = this.descriptionInput
      .replace(/{/g, '<span class="text-success">{')
      .replace(/}/g, "}</span>")
      .replace(/(?:\r\n|\r|\n)/g, "<br>");
    this.descriptionInputHeight =
      this.descriptionInputEl.nativeElement.offsetHeight;
    this.cookieService.set("description_input_div", this.descriptionInputDiv);
  }

  editDescription() {
    this.descriptionIsEdited = true;
    setTimeout(() => this.descriptionInputEl.nativeElement.focus(), 50);
  }

  copyDescriptionToClipboard() {
    this.copyToClipboard(this.descriptionOutput);
  }

  generateAll() {
    this.generateTitle();
    this.generateKeywords();
    this.generateDescription();
  }
}
