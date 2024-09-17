import { Routes } from '@angular/router';
import { ExtensionComponent } from '../extension/extension.component';
import { TestComponent } from '../extension/test/test.component';

export const routes: Routes = [
    { path: '', component: ExtensionComponent },
    { path: 'test', component: TestComponent },
];
