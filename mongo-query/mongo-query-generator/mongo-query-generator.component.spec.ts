import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongoQueryGeneratorComponent } from './mongo-query-generator.component';

describe('MongoQueryGeneratorComponent', () => {
  let component: MongoQueryGeneratorComponent;
  let fixture: ComponentFixture<MongoQueryGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MongoQueryGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongoQueryGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
