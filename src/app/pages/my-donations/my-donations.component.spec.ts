/**
 * @file Asegura que MyDonationsComponent renderiza la lista correctamente.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDonationsComponent } from './my-donations.component';
import { DonationService, Donation } from '../../core/donation.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('MyDonationsComponent', () => {
  let fixture: ComponentFixture<MyDonationsComponent>;
  const mockList: Donation[] = [
    { id: 'a', amount: 1000, date: Date.now(), uid: 'x' },
    { id: 'b', amount: 2000, date: Date.now(), uid: 'x' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDonationsComponent],
      providers: [
        { provide: DonationService, useValue: { list$: () => of(mockList) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyDonationsComponent);
    fixture.detectChanges(); // ngOnInit
  });

  it('renderiza tantas filas como donaciones', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockList.length);
  });
});
