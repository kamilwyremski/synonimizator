import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
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

  it('should render title in a h1 tag', () => {
    const fixture2 = TestBed.createComponent(AppComponent);
    fixture2.detectChanges();
    const compiled = fixture2.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Synonimizator online');
  });

  it('should generate random title', () => {
    component.titleInput = 'Tytuł 1\nTytuł 2\nTytuł 3';
    component.generateTitle();
    expect(
      ['Tytuł 1','Tytuł 2','Tytuł 3'].includes(component.titleOutput)
    ).toBe(true);
  });

  it('should generate random keywords', () => {
    const keywordsArray = ['Słowo 3', 'Słowo 2', 'Słowo 1'];
    component.keywordsInput = keywordsArray.join(',');
    component.generateKeywords();
    const keywordsOutput = component.keywordsOutput.split(',').map(Function.prototype.call, String.prototype.trim).sort().join(',')
    const keywordsString = keywordsArray.sort().join(',')
    expect(
      keywordsString.includes(keywordsOutput)
    ).toBe(true);
  });

  it('should generate random description', async() => {
    component.descriptionInput = 'Ala ma {kota|kotka|zwierzątko}';
    component.generateDescription();
    expect(
      ['Ala ma kota','Ala ma kotka','Ala ma zwierzątko'].includes(component.descriptionOutput)
    ).toBe(true);
  });
});