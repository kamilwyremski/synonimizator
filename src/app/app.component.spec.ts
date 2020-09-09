import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from "@angular/platform-browser";
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => { 
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => { //6
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Synonimizator online');
  });

  it('should generate random title', () => {
    component.title_input = 'Tytuł 1\nTytuł 2\nTytuł 3';
    component.generateTitle();
    expect(
      ["Tytuł 1","Tytuł 2","Tytuł 3"].includes(component.title_output)
    ).toBe(true);
  });

  it('should generate random keywords', () => {
    let keywords_array = ['Słowo 3', 'Słowo 2', 'Słowo 1'];
    component.keywords_input = keywords_array.join(',');
    component.generateKeywords();
    let keywords_output = component.keywords_output.split(',').map(Function.prototype.call, String.prototype.trim).sort().join(',')
    let keywords_string = keywords_array.sort().join(',')
    expect(
      keywords_string.includes(keywords_output)
    ).toBe(true);
  });

  it('should generate random description', async() => {
    component.description_input = 'Ala ma {kota|kotka|zwierzątko}';
    component.generateDescription();
    expect(
      ["Ala ma kota","Ala ma kotka","Ala ma zwierzątko"].includes(component.description_output)
    ).toBe(true);
  });
});