import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordModificationComponent } from './password-modification.component';

describe('PasswordModificationComponent', () => {
    let component: PasswordModificationComponent;
    let fixture: ComponentFixture<PasswordModificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PasswordModificationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PasswordModificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
