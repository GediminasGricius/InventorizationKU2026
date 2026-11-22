import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemNew } from './item-new';

describe('ItemNew', () => {
  let component: ItemNew;
  let fixture: ComponentFixture<ItemNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemNew],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
